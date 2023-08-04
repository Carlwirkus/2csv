<?php

namespace App\Connections\Xero\Accounting;

use App\Connections\Xero\Account\XeroAccount;
use App\Users\Authentication\Data\ClerkUser;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use XeroAPI\XeroPHP\Api\AccountingApi;
use XeroAPI\XeroPHP\Configuration;

class XeroAccountingClient
{
    public function __construct(protected Client $client)
    {
    }

    public function getAccount(): XeroAccount
    {
        /** @var ClerkUser $clerkUser */
        $clerkUser = Auth::user();
        /** @var XeroAccount $account */
        $account = XeroAccount::query()
            ->where("clerk_id", $clerkUser->id)
            ->first();

        return $account;
    }

    public function getApi(): AccountingApi
    {
        $account = $this->getAccount();

        $accessToken = $account->getToken();

        $config = Configuration::getDefaultConfiguration();
        $config->setAccessToken($accessToken);

        return new AccountingApi($this->client, $config);
    }
}
