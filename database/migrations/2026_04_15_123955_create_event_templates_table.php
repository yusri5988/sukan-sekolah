<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_category_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->enum('type', ['individual', 'relay']);
            $table->enum('gender', ['male', 'female', 'mixed']);
            $table->enum('category', ['7-9', '10-12', '13-15', '16+', 'all']);
            $table->integer('max_participants')->default(1);
            $table->boolean('has_qualifying_round')->default(false);
            $table->boolean('has_multiple_attempts')->default(false);
            $table->integer('attempts_count')->default(1);
            $table->boolean('is_relay')->default(false);
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_templates');
    }
};
