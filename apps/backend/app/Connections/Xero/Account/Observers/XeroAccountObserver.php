<?php

namespace App\Connections\Xero\Account\Observers;

use App\Connections\Connections\Connections;
use App\Connections\Xero\Account\XeroAccount;

class XeroAccountObserver
{
    public function created(XeroAccount $account): void
    {
        $connection = Connections::getForUser($account->clerk_id);

        $connection->xero = true;
        $connection->save();
    }

    public function deleted(XeroAccount $account): void
    {
        $connection = Connections::getForUser();

        $connection->xero = false;
        $connection->save();
    }
}
