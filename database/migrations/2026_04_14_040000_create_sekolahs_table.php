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
        Schema::create('sekolahs', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('kod_sekolah')->unique();
            $table->string('alamat')->nullable();
            $table->string('telefon')->nullable();
            $table->string('email')->nullable();
            $table->foreignId('admin_sekolah_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        // Add sekolah_id to users table for admin sekolah relationship
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('sekolah_id')->nullable()->after('role')->constrained('sekolahs')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['sekolah_id']);
            $table->dropColumn('sekolah_id');
        });

        Schema::dropIfExists('sekolahs');
    }
};
