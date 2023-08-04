<?php

namespace App\Connections\Xero\Account;

use App\Connections\Xero\Account\Casts\XeroAccessTokenCast;
use App\Connections\Xero\Account\Services\XeroOAuthService;
use Illuminate\Database\Eloquent\Model;

class XeroAccount extends Model
{
    protected $casts = [
        "access_token" => XeroAccessTokenCast::class,
    ];

    public function getToken(): string
    {
        if ($this->access_token->hasExpired()) {
            $accessToken = app()
                ->make(XeroOAuthService::class)
                ->refreshAccessToken($this);

            $this->access_token = $accessToken;
            $this->save();

            return $accessToken->getToken();
        }

        return $this->access_token->getToken();
    }
}
