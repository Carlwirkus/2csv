<?php

namespace App\Connections\Xero\Account\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use League\OAuth2\Client\Token\AccessToken;

class XeroAccessTokenCast implements CastsAttributes
{
  public function get(
    Model $model,
    string $key,
    mixed $value,
    array $attributes
  ): AccessToken {
    return new AccessToken(json_decode($value, true, 512, JSON_THROW_ON_ERROR));
  }

  public function set(
    Model $model,
    string $key,
    mixed $value,
    array $attributes
  ) {
    if ($value instanceof AccessToken) {
      return json_encode($value->jsonSerialize(), JSON_THROW_ON_ERROR);
    }

    return $value;
  }
}
