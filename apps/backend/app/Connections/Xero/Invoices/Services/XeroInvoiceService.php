<?php

namespace App\Connections\Xero\Invoices\Services;

use App\Connections\Xero\Accounting\XeroAccountingClient;
use App\Receipts\Data\ReceiptData;
use XeroAPI\XeroPHP\Models\Accounting\Contact;
use XeroAPI\XeroPHP\Models\Accounting\Invoice;
use XeroAPI\XeroPHP\Models\Accounting\Invoices;
use XeroAPI\XeroPHP\Models\Accounting\LineItem;

class XeroInvoiceService
{
    public function __construct(
        protected XeroAccountingClient $accountingClient
    ) {
    }

    public function sync(ReceiptData $data): Invoice
    {
        $tenantId = $this->accountingClient->getAccount()->xero_tenant_id;
        $api = $this->accountingClient->getApi();

        $contact = new Contact();
        $contact->setName($data->paid_to);

        $xeroInvoice = new Invoice();
        $xeroInvoice->setContact($contact);
        $xeroInvoice->setType(Invoice::TYPE_ACCPAY);

        $items = collect($data->line_items->items())->map(function (
            $lineItemData
        ) {
            $lineItem = new LineItem();
            $lineItem->setDescription($lineItemData->name);
            $lineItem->setLineAmount($lineItemData->amount);

            return $lineItem;
        });

        $xeroInvoice->setLineItems($items->all());

        $invoices = new Invoices([
            "invoices" => [$xeroInvoice],
        ]);

        $res = $api->createInvoices($tenantId, $invoices);

        return $res->getInvoices()[0];
    }
}
