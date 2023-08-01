<?php

namespace App\GraphQL\Queries;

use App\Receipts\Services\ReceiptService;
use Illuminate\Support\Arr;

class ParseFile
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
