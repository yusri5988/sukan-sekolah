<?php

namespace App\Http\Controllers;

use App\Models\Sekolah;
use App\Models\User;
use Inertia\Inertia;

class SuperAdminController extends Controller
{
    /**
     * Display Super Admin Dashboard with stats
     */
    public function dashboard()
    {
        $stats = [
            'total_sekolah' => Sekolah::count(),
            'total_admin_sekolah' => User::where('role', User::ROLE_ADMIN_SEKOLAH)->count(),
            'total_cikgu' => User::where('role', User::ROLE_CIKGU)->count(),
        ];

        return Inertia::render('SuperAdmin/Dashboard', [
            'stats' => $stats,
        ]);
    }
}
