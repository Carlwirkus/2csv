<?php

namespace App\Connections\Xero\Account\Client;

use GuzzleHttp\Client;
use XeroAPI\XeroPHP\Api\IdentityApi;
use XeroAPI\XeroPHP\Configuration;

class XeroIdentityClient
{
  protected IdentityApi $api;
  public function __construct(protected Client $client)
  {
  }

  public function getApi(string $accessToken): IdentityApi
  {
    $config = Configuration::getDefaultConfiguration();
    $config->setAccessToken($accessToken);

    return new IdentityApi($this->client, $config);
  }
}
