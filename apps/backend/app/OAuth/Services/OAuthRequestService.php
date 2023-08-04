<?php

namespace App\OAuth\Services;

use App\OAuth\Enums\OAuthProvider;
use App\OAuth\OAuthRequest;
use App\Silo\Silo;
use LogicException;

class OAuthRequestService
{
  public function create(
    OAuthProvider $provider,
    string $redirectUrl,
    ?string $state = null
  ): OAuthRequest {
    $silo = Silo::current();

    if (!$silo) {
      throw new LogicException("No silo is currently set");
    }

    return OAuthRequest::create([
      "provider" => $provider,
      "redirect_url" => $redirectUrl,
      "state" => $state,
      "silo_id" => $silo->id,
    ]);
  }
}
