<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AdminSekolahController extends Controller
{
    /**
     * Display Admin Sekolah Dashboard
     */
    public function dashboard()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $stats = [
            'total_students' => $sekolah->students()->count(),
            'total_houses' => $sekolah->houses()->count(),
            'students_without_house' => $sekolah->students()->whereNull('house_id')->count(),
        ];

        $houses = $sekolah->houses()
            ->withCount('students')
            ->orderBy('points', 'desc')
            ->get();

        return Inertia::render('AdminSekolah/Dashboard', [
            'stats' => $stats,
            'houses' => $houses,
            'sekolah' => $sekolah,
        ]);
    }
}
