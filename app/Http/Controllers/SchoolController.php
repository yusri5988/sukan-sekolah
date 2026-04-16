<?php

namespace App\Http\Controllers;

use App\Models\SchoolReference;
use App\Models\Sekolah;
use App\Services\SchoolService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
        $references = SchoolReference::query()
            ->where('is_used', false)
            ->orderBy('negeri')
            ->orderBy('nama')
            ->get(['id', 'negeri', 'nama']);

        return Inertia::render('SuperAdmin/Sekolahs/Create', [
            'referencesByState' => $references
                ->groupBy('negeri')
                ->map(fn ($items) => $items->values())
                ->sortKeys()
                ->toArray(),
        ]);
    }

    /**
     * Store new sekolah and auto-create admin sekolah
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:255'],
            'school_reference_id' => [
                'required',
                'integer',
                Rule::exists('school_references', 'id')->where(fn ($query) => $query->where('is_used', false)),
            ],
            'telefon' => ['required', 'string', 'max:20'],
        ]);

        $telefon = $this->formatPhoneNumber($validated['telefon']);

        $result = $this->schoolService->createSekolahFromReference(
            (int) $validated['school_reference_id'],
            $validated['nama'],
            $telefon
        );

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

    private function formatPhoneNumber(string $phone): string
    {
        $digits = preg_replace('/[^0-9]/', '', $phone);

        if (str_starts_with($digits, '0')) {
            $digits = '6'.$digits;
        }

        return $digits;
    }
}
