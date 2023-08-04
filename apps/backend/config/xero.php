<?php

return [
    "credentials" => [
        "clientId" => env("XERO_CLIENT_ID"),
        "clientSecret" => env("XERO_CLIENT_SECRET"),
        "redirectUri" => env(
            "XERO_REDIRECT_URI",
            config("app.url") . "/xero/callback"
        ),
        "urlAuthorize" => "https://login.xero.com/identity/connect/authorize",
        "urlAccessToken" => "https://identity.xero.com/connect/token",
        "urlResourceOwnerDetails" =>
            "https://api.xero.com/api.xro/2.0/Organisation",
    ],

    "scope" => [
        "openid email profile offline_access accounting.transactions accounting.contacts",
    ],
];
