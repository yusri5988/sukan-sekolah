<?php

namespace App\Http\Controllers;

use App\Services\MeetService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeetController extends Controller
{
    public function __construct(
        private MeetService $meetService
    ) {}

    /**
     * Display or create the single kejohanan for this sekolah
     */
    public function index()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $meet = $sekolah->meets()->first();

        if (! $meet) {
            $meet = $this->meetService->createMeet([
                'name' => 'Hari Sukan '.date('Y'),
                'date' => date('Y-m-d'),
                'description' => null,
            ], $sekolah);
        }

        return redirect()->route('admin-sekolah.meets.show');
    }

    /**
     * Show form to create new meet
     */
    public function create()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        return Inertia::render('AdminSekolah/Meets/Create', [
            'sekolah' => $sekolah,
        ]);
    }

    /**
     * Store new meet
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->back()->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'closing_date' => 'nullable|date|before_or_equal:date',
            'description' => 'nullable|string',
            'point_config' => 'nullable|array',
            'point_config.*' => 'integer|min:0',
        ]);

        $meet = $this->meetService->createMeet($validated, $sekolah);

        return redirect()
            ->route('admin-sekolah.meets.show')
            ->with('success', 'Kejohanan berjaya dicipta!');
    }

    /**
     * Show single meet details with events
     */
    public function show()
    {
        $meet = $this->getMeetForCurrentUser();

        $meet->load('events');

        return Inertia::render('AdminSekolah/Meets/Show', [
            'meet' => [
                'id' => $meet->id,
                'name' => $meet->name,
                'date' => $meet->date ? $meet->date->format('Y-m-d') : null,
                'closing_date' => $meet->closing_date ? $meet->closing_date->format('Y-m-d') : null,
                'description' => $meet->description,
                'status' => $meet->status,
                'point_config' => $meet->point_config,
                'is_public' => $meet->is_public,
            ],
        ]);
    }

    /**
     * Edit meet
     */
    public function edit()
    {
        $meet = $this->getMeetForCurrentUser();

        return Inertia::render('AdminSekolah/Meets/Edit', [
            'meet' => $meet,
        ]);
    }

    /**
     * Update meet
     */
    public function update(Request $request)
    {
        $meet = $this->getMeetForCurrentUser();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'closing_date' => 'nullable|date|before_or_equal:date',
            'description' => 'nullable|string',
            'point_config' => 'nullable|array',
            'point_config.*' => 'integer|min:0',
        ]);

        $this->meetService->updateMeet($meet, $validated);

        return redirect()
            ->route('admin-sekolah.meets.show')
            ->with('success', 'Kejohanan berjaya dikemaskini!');
    }

    /**
     * Update meet dates only
     */
    public function updateDates(Request $request)
    {
        $meet = $this->getMeetForCurrentUser();

        $validated = $request->validate([
            'date' => 'required|date',
            'closing_date' => 'nullable|date|before_or_equal:date',
        ]);

        $this->meetService->updateMeet($meet, $validated);

        return redirect()
            ->route('admin-sekolah.meets.show')
            ->with('success', 'Tarikh kejohanan berjaya dikemaskini!');
    }

    /**
     * Activate meet
     */
    public function activate()
    {
        $meet = $this->getMeetForCurrentUser();

        $this->meetService->activateMeet($meet);

        return redirect()
            ->route('admin-sekolah.meets.show')
            ->with('success', 'Kejohanan diaktifkan!');
    }

    /**
     * Complete meet
     */
    public function complete()
    {
        $meet = $this->getMeetForCurrentUser();

        $this->meetService->completeMeet($meet);

        return redirect()
            ->route('admin-sekolah.meets.show')
            ->with('success', 'Kejohanan ditandakan sebagai selesai!');
    }

    /**
     * Toggle public visibility
     */
    public function togglePublic()
    {
        $meet = $this->getMeetForCurrentUser();

        $updatedMeet = $this->meetService->togglePublic($meet);

        return redirect()
            ->route('admin-sekolah.meets.show')
            ->with('success', $updatedMeet->is_public ? 'Paparan awam diaktifkan.' : 'Paparan awam disembunyikan.');
    }

    /**
     * Delete meet
     */
    public function destroy()
    {
        $meet = $this->getMeetForCurrentUser();

        $this->meetService->deleteMeet($meet);

        return redirect()
            ->route('admin-sekolah.meets.index')
            ->with('success', 'Kejohanan berjaya dihapus!');
    }

    private function getMeetForCurrentUser()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            abort(403, 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $meet = $sekolah->meet()->first();

        if (! $meet) {
            $meet = $this->meetService->createMeet([
                'name' => 'Hari Sukan '.date('Y'),
                'date' => date('Y-m-d'),
                'description' => null,
            ], $sekolah);
        }

        return $meet;
    }
}
