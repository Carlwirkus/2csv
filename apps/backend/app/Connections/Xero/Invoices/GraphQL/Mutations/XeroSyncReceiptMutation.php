<?php

namespace App\Connections\Xero\Invoices\GraphQL\Mutations;

use App\Connections\Xero\Invoices\Services\XeroInvoiceService;
use App\Receipts\Data\ReceiptData;

class XeroSyncReceiptMutation
{
    public function __construct(protected XeroInvoiceService $service)
    {
    }

    public function __invoke(mixed $root, array $args): string
    {
        $data = ReceiptData::from($args["input"]);
        $invoice = $this->service->sync($data);

        return sprintf(
            "https://go.xero.com/AccountsPayable/View.aspx?InvoiceID=%s",
            $invoice->getInvoiceId()
        );
    }
}
