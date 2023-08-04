<?php

use App\Connections\Xero\Account\Http\XeroOAuthController;
use Illuminate\Support\Facades\Route;

Route::get("xero/callback", [XeroOAuthController::class, "callback"]);
