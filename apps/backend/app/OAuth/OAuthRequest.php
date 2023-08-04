<?php

namespace App\OAuth;

use App\OAuth\Enums\OAuthProvider;
use Illuminate\Database\Eloquent\Model;

class OAuthRequest extends Model
{

  protected $table = "oauth_requests";

  protected $casts = [
    "provider" => OAuthProvider::class,
  ];
}
