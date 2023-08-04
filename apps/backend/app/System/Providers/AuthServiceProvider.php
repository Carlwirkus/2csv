<?php

namespace App\System\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Users\Authentication\Services\ClerkService;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Auth::viaRequest("clerk", function (Request $request) {
            $token = $request->bearerToken();

            if (!$token) {
                return null;
            }

            return app()
                ->make(ClerkService::class)
                ->validateToken($token);
        });
    }
}
