<?php

namespace App\Users\Authentication\Middleware;

use App\Users\Authentication\Data\ClerkUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AttemptAuth
{
    public function handle(Request $request, callable $next)
    {
        dd("here");

        $user = ClerkUser::from([
            "id" => "asd",
        ]);

        Auth::login($user);

        return $next($request);
    }
}
