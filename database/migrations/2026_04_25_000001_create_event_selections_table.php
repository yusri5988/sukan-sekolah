<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_selections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sekolah_id')->constrained()->cascadeOnDelete();
            $table->foreignId('event_category_id')->constrained()->cascadeOnDelete();
            $table->string('template_name');
            $table->enum('type', ['individual', 'relay'])->default('individual');
            $table->boolean('is_relay')->default(false);
            $table->boolean('has_qualifying_round')->default(false);
            $table->boolean('has_multiple_attempts')->default(false);
            $table->integer('attempts_count')->default(1);
            $table->integer('max_participants')->default(1);
            $table->enum('status', ['pending', 'configured', 'cancelled'])->default('pending');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('configured_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_selections');
    }
};
