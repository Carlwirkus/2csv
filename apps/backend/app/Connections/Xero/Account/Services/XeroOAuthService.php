<?php

namespace App\Connections\Xero\Account\Services;

use App\Connections\Xero\Account\Client\XeroIdentityClient;
use App\Connections\Xero\Account\XeroAccount;
use App\OAuth\Enums\OAuthProvider;
use App\OAuth\OAuthRequest;
use Illuminate\Support\Facades\Auth;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use League\OAuth2\Client\Provider\GenericProvider;
use XeroAPI\XeroPHP\Api\IdentityApi;
use XeroAPI\XeroPHP\ApiException;

class XeroOAuthService
{
    public function __construct(protected XeroIdentityClient $identityClient)
    {
    }

    public function getProvider(): GenericProvider
    {
        return new GenericProvider(config("xero.credentials"));
    }

    public function createAuthorizationUrl(string $redirectUrl): string
    {
        $provider = $this->getProvider();

        $options = [
            "scope" => [
                "openid email profile offline_access assets projects accounting.settings accounting.transactions accounting.contacts accounting.journals.read accounting.reports.read accounting.attachments",
            ],
        ];

        $url = $provider->getAuthorizationUrl($options);

        OAuthRequest::create([
            "clerk_id" => Auth::user()->id,
            "state" => $provider->getState(),
            "provider" => OAuthProvider::Xero,
            "redirect_url" => $redirectUrl,
        ]);

        return $url;
    }

    /**
     * @throws ApiException
     * @throws IdentityProviderException
     */
    public function createAccount(string $code, string $state): array
    {
        $request = OAuthRequest::where("state", "=", $state)->first();

        $accessToken = $this->getProvider()->getAccessToken(
            "authorization_code",
            [
                "code" => $code,
            ]
        );

        $connection = $this->identityClient
            ->getApi((string) $accessToken->getToken())
            ->getConnections()[0];

        $account = XeroAccount::updateOrCreate(
            ["clerk_id" => $request->clerk_id],
            [
                "clerk_id" => $request->clerk_id,
                "access_token" => $accessToken,
                "xero_tenant_id" => $connection->getTenantId(),
            ]
        );

        $request->delete();

        return [$account, $request];
    }

    /**
     * @throws IdentityProviderException
     */
    public function refreshAccessToken(
        XeroAccount $xeroAccount,
        ?string $grantType = null
    ): XeroAccount {
        $accessToken = $xeroAccount->access_token;

        $body = [
            "refresh_token" => $accessToken->getRefreshToken(),
        ];

        if (isset($grantType) && trim($grantType) !== "") {
            $body["grant_type"] = $grantType;
        }

        $refreshedToken = $this->getProvider()->getAccessToken(
            "refresh_token",
            $body
        );

        $xeroAccount->access_token = $refreshedToken;
        $xeroAccount->save();

        return $xeroAccount;
    }

    /**
     * @throws ApiException
     */
    public function removeConnection(): XeroAccount
    {
        $account = XeroAccount::getForCurrentSilo();

        $api = $this->getApi($account);

        $connections = $api->getConnections();

        if (count($connections) > 0) {
            $api->deleteConnection($connections[0]->getId());
        }

        $account->delete();

        return $account;
    }

    public function getApi(XeroAccount $account): IdentityApi
    {
        if ($account->access_token->hasExpired()) {
            $account = $this->refreshAccessToken($account);
        }

        return $this->identityClient->getApi(
            (string) $account->access_token->getToken()
        );
    }
}
