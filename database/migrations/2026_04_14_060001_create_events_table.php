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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sekolah_id')->constrained()->cascadeOnDelete();
            $table->foreignId('meet_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->enum('category', ['7-9', '10-12', '13-15', '16+', 'all']);
            $table->enum('gender', ['male', 'female', 'mixed']);
            $table->enum('type', ['individual', 'relay']);
            $table->integer('max_participants')->default(1);
            $table->time('scheduled_time')->nullable();
            $table->date('scheduled_date')->nullable();
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
        Schema::dropIfExists('events');
    }
};
