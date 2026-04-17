<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (DB::connection()->getDriverName() !== 'mysql') {
            return;
        }

        DB::statement("ALTER TABLE users MODIFY role ENUM('super_admin', 'admin_sekolah', 'cikgu', 'cikgu_sukan', 'pengurus_acara') NOT NULL DEFAULT 'cikgu'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::connection()->getDriverName() !== 'mysql') {
            return;
        }

        DB::statement("UPDATE users SET role = 'cikgu' WHERE role = 'pengurus_acara'");
        DB::statement("ALTER TABLE users MODIFY role ENUM('super_admin', 'admin_sekolah', 'cikgu', 'cikgu_sukan') NOT NULL DEFAULT 'cikgu'");
    }
};
