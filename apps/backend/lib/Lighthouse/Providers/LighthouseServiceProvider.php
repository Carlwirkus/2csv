<?php

namespace Lib\Lighthouse\Providers;

use Illuminate\Support\ServiceProvider;
use MLL\GraphQLScalars\MixedScalar;
use Nuwave\Lighthouse\Schema\TypeRegistry;

class LighthouseServiceProvider extends ServiceProvider
{
    public function boot(TypeRegistry $typeRegistry): void
    {
        $typeRegistry->register(new MixedScalar());
    }
}
