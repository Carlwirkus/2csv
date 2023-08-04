<?php

namespace App\Receipts\Data;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

class ReceiptData extends Data
{
    public function __construct(
        public string|null $paid_to,
        public string|null $reference,
        public string|null $paid_at,
        public float $amount_total,
        public float $amount_tax,
        public float $amount_subtotal,
        #[
            DataCollectionOf(ReceiptLineItemData::class)
        ]
        public DataCollection $line_items
    ) {
    }
}
