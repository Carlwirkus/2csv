<?php

namespace App\Users\Authentication\Providers;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\UserProvider;
use LogicException;

class ClerkUserProvider implements UserProvider
{
    public function retrieveById($identifier): never
    {
        throw new LogicException("NYI");
    }

    public function retrieveByToken($identifier, $token): never
    {
        throw new LogicException("Clerk does not support retrieving by token");
    }

    public function updateRememberToken(Authenticatable $user, $token): never
    {
        throw new LogicException(
            "Clerk does not support updating remember tokens"
        );
    }

    public function retrieveByCredentials(array $credentials): never
    {
        throw new LogicException(
            "Clerk does not support password authentication"
        );
    }

    public function validateCredentials(
        Authenticatable $user,
        array $credentials
    ): never {
        throw new LogicException(
            "Clerk does not support password authentication"
        );
    }
}
