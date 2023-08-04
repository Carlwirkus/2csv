<?php

use App\Users\Users\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create("oauth_requests", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("clerk_id")->index();
            $table->string("state");
            $table->string("provider");
            $table->string("redirect_url");
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::drop("oauth_requests");
    }
};
