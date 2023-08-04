<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create("xero_accounts", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("clerk_id")->unique();
            $table->string("xero_tenant_id");
            $table->jsonb("access_token");
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::drop("xero_accounts");
    }
};
