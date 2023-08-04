<?php

namespace App\System\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public array $webRoutes = [
        "Connections/Xero/Account/Http/xero-web-routes.php",
        "System/Http/routes/web.php",
    ];

    public array $apiRoutes = [];

    public function boot(): void
    {
        RateLimiter::for("api", function (Request $request) {
            return Limit::perMinute(60)->by(
                $request->user()?->id ?: $request->ip()
            );
        });

        $this->routes(function () {
            //            Route::middleware("api")
            //                ->prefix("api")
            //                ->group(base_path("routes/api.php"));

            foreach ($this->webRoutes as $webRoute) {
                Route::middleware("web")->group(app_path($webRoute));
            }
        });
    }
}
