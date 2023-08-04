<?php

namespace App\Receipts\Services;

use App\Receipts\Notifications\ReceiptNotification;
use Aws\Result;
use Aws\Textract\TextractClient;
use Exception;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Notification;
use JmesPath\Env as JmesPath;

class ReceiptService
{
    public function getClient(): TextractClient
    {
        return App::make("aws")->createClient("textract");
    }

    public function analyzeExpense(string $url): array
    {
        if (app()->isProduction()) {
            Notification::route("discord", null)->notify(
                new ReceiptNotification("New upload: $url")
            );
        }

        $client = $this->getClient();
        $res = $client->analyzeExpense([
            "Document" => [
                "S3Object" => [
                    "Bucket" => config("filesystems.disks.s3.bucket"),
                    "Name" => $url,
                ],
            ],
        ]);

        $summary = $this->getSummaryItems($res);

        return [...$summary, "line_items" => $this->getLineItems($res)];
    }

    protected function getSummaryItems(Result $result): array
    {
        return [
            "amount_total" =>
                $this->getSummaryKey($result, "TOTAL", "float") ?? 0,
            "amount_tax" => $this->getSummaryKey($result, "TAX", "float") ?? 0,
            "amount_subtotal" =>
                $this->getSummaryKey($result, "SUBTOTAL", "float") ?? 0,
            "paid_to" => $this->getSummaryKey($result, "NAME"),
            "reference" => $this->getSummaryKey($result, "INVOICE_RECEIPT_ID"),
            "paid_at" => $this->getSummaryKey(
                $result,
                "INVOICE_RECEIPT_DATE",
                "date"
            ),
        ];
    }

    protected function getLineItems(Result $result): array
    {
        $items = $result->search(
            "ExpenseDocuments[0].LineItemGroups[*].LineItems[].LineItemExpenseFields"
        );

        return collect($items)
            ->map(function (array $item) {
                $amount = $this->getLineItemKey($item, "PRICE", "float") ?? 0;
                $quantity =
                    $this->getLineItemKey($item, "QUANTITY", "float") ?? 1;

                $unitPriceVal = $this->getLineItemKey(
                    $item,
                    "UNIT_PRICE",
                    "float"
                );

                $unitPrice = $unitPriceVal ?? $amount / $quantity;

                return [
                    "quantity" => $quantity,
                    "unit_price" => $unitPrice,
                    "amount" => $amount,
                    "code" => $this->getLineItemKey($item, "PRODUCT_CODE"),
                    "name" => $this->getLineItemKey($item, "ITEM"),
                ];
            })
            ->toArray();
    }

    protected function getLineItemKey(
        array $result,
        string $key,
        string $format = "string"
    ) {
        $res = JmesPath::search(
            "[?Type.Text=='{$key}'].ValueDetection.Text | [0]",
            $result
        );

        if ($format === "float") {
            return $this->cleanFloat($res);
        }

        return $res;
    }

    protected function getSummaryKey(
        Result $result,
        string $key,
        string $format = "string"
    ) {
        $res = $result->search(
            "max_by(ExpenseDocuments[0].SummaryFields[?Type.Text=='{$key}'].ValueDetection, &Confidence).Text"
        );

        if ($format === "float") {
            return $this->cleanFloat($res);
        }

        if ($format === "date") {
            return $this->cleanDate($res);
        }

        return $res;
    }

    private function cleanFloat(string|null $float): float|null
    {
        if ($float === null) {
            return null;
        }

        return (float) preg_replace("/[^0-9.]/", "", $float);
    }

    private function cleanDate(string|null $date): string|null
    {
        if ($date === null) {
            return null;
        }

        try {
            return Carbon::parse($date)->format("Y-m-d");
        } catch (Exception $e) {
            return null;
        }
    }
}
