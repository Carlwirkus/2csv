<?php

namespace App\Connections\Xero\Account\Providers;

use App\Connections\Xero\Account\Observers\XeroAccountObserver;
use App\Connections\Xero\Account\XeroAccount;
use Illuminate\Support\ServiceProvider;

class XeroAccountServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        XeroAccount::observe(XeroAccountObserver::class);
    }
}
