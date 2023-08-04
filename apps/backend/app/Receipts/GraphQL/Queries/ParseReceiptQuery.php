<?php

namespace App\Receipts\GraphQL\Queries;

use App\Receipts\Services\ReceiptService;
use Illuminate\Support\Arr;

class ParseReceiptQuery
{
    public function __construct(protected ReceiptService $receiptService)
    {
    }

    public function __invoke(mixed $root, array $args): array
    {
        $url = Arr::get($args, "url", "");

        return $this->receiptService->analyzeExpense($url);
    }
}
