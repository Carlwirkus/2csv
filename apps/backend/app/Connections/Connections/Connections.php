<?php

namespace App\Connections\Connections;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use LogicException;

class Connections extends Model
{
    protected $attributes = ["xero" => false, "quick_books" => false];
    public static function getForUser(?string $id = null): Builder|Model|self
    {
        $id ??= Auth::user()->id;

        if (!$id) {
            throw new LogicException(
                "Trying to get connections without a user"
            );
        }

        return self::query()->firstOrCreate([
            "clerk_id" => $id,
        ]);
    }
}
