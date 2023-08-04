<?php

namespace App\Users\Users;

use Illuminate\Notifications\Notifiable;

class User
{
    use Notifiable;

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected array $hidden = ["password", "remember_token"];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected array $casts = [
        "email_verified_at" => "datetime",
        "password" => "hashed",
    ];
}
