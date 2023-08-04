<?php

use App\Connections\Xero\Invoices\Services\XeroInvoiceService;
use App\Receipts\Data\ReceiptData;
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
    //    \Illuminate\Support\Facades\Auth::login(
    //        ClerkUser::from([
    //            "id" => "user_2TE8oUvaODbSy4bN1CVZJ4Gr8eW",
    //        ])
    //    );

    $data = ReceiptData::from([
        "paid_to" => "Bunnings",
        "line_items" => [
            [
                "name" => "foo",
                "quantity" => 1,
                "amount" => 100,
                "unit_price" => 100,
            ],
        ],
    ]);

    app()
        ->make(XeroInvoiceService::class)
        ->sync($data);

    return redirect("https://2csv.net");
});
