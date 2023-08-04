<?php

namespace App\Integrations\Xero\Account\GraphQL\Mutations;

use App\Integrations\Xero\Account\Services\XeroOAuthService;
use App\Integrations\Xero\Account\XeroAccount;
use App\Integrations\Xero\Errors\Exceptions\XeroPublicApiException;
use XeroAPI\XeroPHP\ApiException;

class RemoveXeroConnectionMutation
{
  public function __construct(protected XeroOAuthService $xeroOAuthService)
  {
  }

  public function __invoke(): XeroAccount
  {
    try {
      return $this->xeroOAuthService->removeConnection();
    } catch (ApiException $e) {
      throw new XeroPublicApiException($e);
    }
  }
}
