<?php

namespace App\System\Http\Middleware;

use Illuminate\Http\Request;

class Authenticate
{
    public function handle(Request $request, callable $next)
    {
        //validate the token

        $user = $clerkUser->getUser();
        Auth::login($user);

        return $next($request);
    }
}
