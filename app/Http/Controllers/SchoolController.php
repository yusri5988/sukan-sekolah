<?php

namespace App\Http\Controllers;

use App\Models\Sekolah;
use App\Services\SchoolService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function __construct(
        private SchoolService $schoolService
    ) {}

    /**
     * Display list of all sekolahs (for super admin)
     */
    public function index()
    {
        $sekolahs = Sekolah::with('adminSekolah')
            ->latest()
            ->paginate(10);

        return Inertia::render('SuperAdmin/Sekolahs/Index', [
            'sekolahs' => $sekolahs,
        ]);
    }

    /**
     * Show form to create new sekolah
     */
    public function create()
    {
        return Inertia::render('SuperAdmin/Sekolahs/Create');
    }

    /**
     * Store new sekolah and auto-create admin sekolah
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kod_sekolah' => 'nullable|string|max:50|unique:sekolahs,kod_sekolah',
            'alamat' => 'nullable|string',
            'telefon' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        $result = $this->schoolService->createSekolah($validated);

        return redirect()
            ->route('super-admin.sekolahs.index')
            ->with('success', 'Sekolah berjaya ditambah!')
            ->with('new_sekolah', $result->toArray());
    }

    /**
     * Show single sekolah details
     */
    public function show(Sekolah $sekolah)
    {
        $sekolah->load('adminSekolah', 'cikgus');

        return Inertia::render('SuperAdmin/Sekolahs/Show', [
            'sekolah' => $sekolah,
        ]);
    }
}
