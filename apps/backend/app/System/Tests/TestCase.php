<?php

namespace App\System\Tests;

use App\System\Tests\Concerns\HasAuthenticatedRequests;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Nuwave\Lighthouse\Testing\RefreshesSchemaCache;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use MakesGraphQLRequests;
    use RefreshesSchemaCache;
    use HasAuthenticatedRequests;
    use DatabaseMigrations;
}
