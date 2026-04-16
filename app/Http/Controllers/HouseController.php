<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Services\HouseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class HouseController extends Controller
{
    public function __construct(
        private HouseService $houseService
    ) {}

    /**
     * Display list of houses for admin sekolah's sekolah
     */
    public function index()
    {
        $sekolah = Auth::user()->sekolah;

        $houses = $this->houseService->getHousesWithCounts($sekolah);

        return Inertia::render('AdminSekolah/Houses/Index', [
            'houses' => $houses,
        ]);
    }

    /**
     * Show form to create new house
     */
    public function create()
    {
        return Inertia::render('AdminSekolah/Houses/Create');
    }

    /**
     * Store new house
     */
    public function store(Request $request)
    {
        $sekolah = Auth::user()->sekolah;

        $validated = $request->validate([
            'color' => ['required', Rule::in(['#ef4444', '#3b82f6', '#22c55e', '#eab308'])],
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('houses', 'name')->where(fn ($query) => $query->where('sekolah_id', $sekolah->id)),
            ],
        ]);

        $this->houseService->createHouse($validated, $sekolah);

        return redirect()
            ->route('admin-sekolah.houses.index')
            ->with('success', 'Rumah sukan berjaya ditambah.');
    }

    /**
     * Show single house details
     * Paparkan pelajar dan cikgu-cikgu yang menjaga rumah ini
     */
    public function show(House $house)
    {
        $user = Auth::user();

        if ($house->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke rumah sukan ini.');
        }

        $house->load(['teachers']);

        $students = $house->students()
            ->select('id', 'name', 'class', 'gender')
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('AdminSekolah/Houses/Show', [
            'house' => $house,
            'students' => $students,
        ]);
    }

    /**
     * Delete house
     */
    public function destroy(House $house)
    {
        $user = Auth::user();

        if ($house->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke rumah sukan ini.');
        }

        if (! $this->houseService->deleteHouse($house)) {
            return redirect()
                ->route('admin-sekolah.houses.index')
                ->with('error', 'Rumah sukan ini masih mempunyai pelajar. Sila kosongkan pelajar dahulu.');
        }

        return redirect()
            ->route('admin-sekolah.houses.index')
            ->with('success', 'Rumah sukan berjaya dipadam.');
    }

    /**
     * Auto-assign students to houses
     */
    public function autoAssign(Request $request)
    {
        $sekolah = Auth::user()->sekolah;

        $result = $this->houseService->autoAssignStudentsToHouses($sekolah);

        if ($result['success']) {
            return redirect()
                ->route('admin-sekolah.houses.index')
                ->with('success', $result['message']);
        } else {
            return redirect()
                ->route('admin-sekolah.houses.index')
                ->with('error', $result['message']);
        }
    }
}
