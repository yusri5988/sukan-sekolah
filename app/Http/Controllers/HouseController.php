<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\Sekolah;
use App\Services\HouseService;
use Illuminate\Http\Request;
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
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $houses = $this->houseService->getHousesWithCounts($sekolah);

        return Inertia::render('AdminSekolah/Houses/Index', [
            'houses' => $houses,
            'sekolah' => $sekolah,
        ]);
    }

    /**
     * Show form to create new house
     */
    public function create()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        return Inertia::render('AdminSekolah/Houses/Create', [
            'sekolah' => $sekolah,
        ]);
    }

    /**
     * Store new house
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
            'color' => 'nullable|string|max:50',
        ]);

        $house = $this->houseService->createHouse($validated, $sekolah);

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
        $user = auth()->user();

        if ($house->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke rumah sukan ini.');
        }

        $house->load(['students', 'teachers']);

        return Inertia::render('AdminSekolah/Houses/Show', [
            'house' => $house,
        ]);
    }

    /**
     * Delete house
     */
    public function destroy(House $house)
    {
        $user = auth()->user();

        if ($house->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke rumah sukan ini.');
        }

        $this->houseService->deleteHouse($house);

        return redirect()
            ->route('admin-sekolah.houses.index')
            ->with('success', 'Rumah sukan berjaya dipadam.');
    }

    /**
     * Auto-assign students to houses
     */
    public function autoAssign(Request $request)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->back()->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

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
