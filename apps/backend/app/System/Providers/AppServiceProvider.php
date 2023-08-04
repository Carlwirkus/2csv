<?php

namespace App\System\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Events\Dispatcher;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //Sensible defaults
        Model::unguard();
        JsonResource::withoutWrapping();
        Relation::requireMorphMap();
        Relation::morphMap([]);
    }
}
