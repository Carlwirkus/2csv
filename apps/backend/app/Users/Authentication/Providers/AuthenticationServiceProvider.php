<?php

namespace App\Users\Authentication\Providers;

use App\Users\Authentication\Services\ClerkService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AuthenticationServiceProvider extends ServiceProvider
{
    public function boot(): void
    {

    }
}
