<?php

namespace App\Connections\Connections\GraphQL\Queries;

use App\Connections\Connections\Connections;

class ConnectionsQuery
{
    public function __invoke(): Connections
    {
        return Connections::getForUser();
    }
}
