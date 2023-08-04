<?php

namespace App\Connections\Xero\Account\GraphQL\Mutations;

use App\Connections\Xero\Account\Services\XeroOAuthService;
use Illuminate\Support\Arr;

class CreateXeroAccountLinkMutation
{
  public function __construct(protected XeroOAuthService $service)
  {
  }

  public function __invoke(mixed $root, array $args): string
  {
    $redirectUrl = Arr::get($args, "redirect_url");

    return $this->service->createAuthorizationUrl($redirectUrl);
  }
}
