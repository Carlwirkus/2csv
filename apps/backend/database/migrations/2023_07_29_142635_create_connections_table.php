<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("connections", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("clerk_id")->unique();
            $table->boolean("xero");
            $table->boolean("quick_books");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("connections");
    }
};
