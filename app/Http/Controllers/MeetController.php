<?php

namespace App\Http\Controllers;

use App\Models\Meet;
use App\Services\MeetService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeetController extends Controller
{
    public function __construct(
        private MeetService $meetService
    ) {}

    /**
     * Display list of meets
     */
    public function index()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $meets = $this->meetService->getMeets($sekolah);

        return Inertia::render('AdminSekolah/Meets/Index', [
            'meets' => $meets,
            'sekolah' => $sekolah,
        ]);
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
            'description' => 'nullable|string',
            'point_config' => 'nullable|array',
            'point_config.*' => 'integer|min:0',
        ]);

        $meet = $this->meetService->createMeet($validated, $sekolah);

        return redirect()
            ->route('admin-sekolah.meets.index')
            ->with('success', 'Meet berjaya dicipta!');
    }

    /**
     * Show single meet details with events
     */
    public function show(Meet $meet)
    {
        $user = auth()->user();

        if ($meet->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke meet ini.');
        }

        $meet->load('events');

        return Inertia::render('AdminSekolah/Meets/Show', [
            'meet' => $meet,
        ]);
    }

    /**
     * Edit meet
     */
    public function edit(Meet $meet)
    {
        $user = auth()->user();

        if ($meet->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke meet ini.');
        }

        return Inertia::render('AdminSekolah/Meets/Edit', [
            'meet' => $meet,
        ]);
    }

    /**
     * Update meet
     */
    public function update(Request $request, Meet $meet)
    {
        $user = auth()->user();

        if ($meet->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke meet ini.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'description' => 'nullable|string',
            'point_config' => 'nullable|array',
            'point_config.*' => 'integer|min:0',
        ]);

        $this->meetService->updateMeet($meet, $validated);

        return redirect()
            ->route('admin-sekolah.meets.show', $meet->id)
            ->with('success', 'Meet berjaya dikemaskini!');
    }

    /**
     * Activate meet
     */
    public function activate(Meet $meet)
    {
        $user = auth()->user();

        if ($meet->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke meet ini.');
        }

        $this->meetService->activateMeet($meet);

        return redirect()
            ->route('admin-sekolah.meets.show', $meet->id)
            ->with('success', 'Meet diaktifkan!');
    }

    /**
     * Complete meet
     */
    public function complete(Meet $meet)
    {
        $user = auth()->user();

        if ($meet->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke meet ini.');
        }

        $this->meetService->completeMeet($meet);

        return redirect()
            ->route('admin-sekolah.meets.show', $meet->id)
            ->with('success', 'Meet ditandakan sebagai selesai!');
    }

    /**
     * Toggle public visibility
     */
    public function togglePublic(Meet $meet)
    {
        $user = auth()->user();

        if ($meet->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke meet ini.');
        }

        $this->meetService->togglePublic($meet);

        return redirect()
            ->route('admin-sekolah.meets.show', $meet->id)
            ->with('success', $meet->is_public ? 'Paparan awam disembunyikan.' : 'Paparan awam diaktifkan.');
    }

    /**
     * Delete meet
     */
    public function destroy(Meet $meet)
    {
        $user = auth()->user();

        if ($meet->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke meet ini.');
        }

        $this->meetService->deleteMeet($meet);

        return redirect()
            ->route('admin-sekolah.meets.index')
            ->with('success', 'Meet berjaya dihapus!');
    }
}
