<?php

namespace App\Users\Authentication\Services;

use App\Users\Authentication\Data\ClerkUser;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ClerkService
{
    public function validateToken(string $token): ClerkUser
    {
        $publicKey = config("clerk.public_key");

        JWT::$leeway = 60; // $leeway in seconds
        $payload = JWT::decode($token, new Key($publicKey, "RS256"));

        return ClerkUser::from([
            "id" => $payload->sub,
        ]);
    }
}
