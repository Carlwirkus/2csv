<?php

use App\Receipts\Services\ReceiptService;
use Aws\Textract\TextractClient;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get("/", function () {
    /** @var TextractClient $client */
    $client = App::make("aws")->createClient("textract");

    return app()
        ->make(ReceiptService::class)
        ->analyzeExpense("tmp/00dd1539-98ea-49ac-abe1-6f1f13e64f53");
});
