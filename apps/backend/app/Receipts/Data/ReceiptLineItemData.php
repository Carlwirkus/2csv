<?php

namespace App\Receipts\Data;

use Spatie\LaravelData\Data;

class ReceiptLineItemData extends Data
{
    public function __construct(
        public string|null $name,
        public float $quantity,
        public float $unit_price,
        public float $amount,
        public string|null $code
    ) {
    }
}
