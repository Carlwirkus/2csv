<?php

namespace App\Integrations\Xero\Account\GraphQL\Queries;

use App\Integrations\Xero\Account\XeroAccount;

class XeroAccountQuery
{
  public function __invoke(): XeroAccount|null
  {
    return XeroAccount::getForCurrentSilo();
  }
}
