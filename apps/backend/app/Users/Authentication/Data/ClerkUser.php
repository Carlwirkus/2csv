<?php

namespace App\Users\Authentication\Data;

use Illuminate\Contracts\Auth\Authenticatable;
use LogicException;
use Spatie\LaravelData\Data;

class ClerkUser extends Data implements Authenticatable
{
    public function __construct(public string $id)
    {
    }

    public function getAuthIdentifierName(): never
    {
        throw new LogicException("This method is not implemented");
    }

    public function getAuthIdentifier(): never
    {
        throw new LogicException("This method is not implemented");
    }

    public function getAuthPassword(): never
    {
        throw new LogicException("This method is not implemented");
    }

    public function getRememberToken(): never
    {
        throw new LogicException("This method is not implemented");
    }

    public function setRememberToken($value): never
    {
        throw new LogicException("This method is not implemented");
    }

    public function getRememberTokenName(): never
    {
        throw new LogicException("This method is not implemented");
    }
}
