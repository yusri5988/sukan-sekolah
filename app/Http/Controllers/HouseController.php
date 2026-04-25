<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesUniqueConstraint;
use App\Http\Requests\StoreHouseRequest;
use App\Http\Requests\UpdateHouseRequest;
use App\Models\House;
use App\Services\HouseService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class HouseController extends Controller
{
    use HandlesUniqueConstraint;

    public function __construct(
        private HouseService $houseService
    ) {}

    public function index()
    {
        $sekolah = Auth::user()->sekolah;

        $houses = $this->houseService->getHousesWithCounts($sekolah);

        return Inertia::render('AdminSekolah/Houses/Index', [
            'houses' => $houses,
        ]);
    }

    public function create()
    {
        $sekolah = Auth::user()->sekolah;
        $usedColors = $sekolah->houses()->pluck('color')->toArray();

        return Inertia::render('AdminSekolah/Houses/Create', [
            'usedColors' => $usedColors,
        ]);
    }

    public function store(StoreHouseRequest $request)
    {
        $sekolah = Auth::user()->sekolah;

        try {
            $this->houseService->createHouse($request->validated(), $sekolah);
        } catch (\Illuminate\Database\QueryException $e) {
            return $this->handleUniqueConstraintError($e);
        }

        return redirect()
            ->route('admin-sekolah.houses.index')
            ->with('success', 'Rumah sukan berjaya ditambah.');
    }

    public function edit(House $house)
    {
        Gate::authorize('access', $house);

        $sekolah = Auth::user()->sekolah;
        $usedColors = $sekolah->houses()
            ->where('id', '!=', $house->id)
            ->pluck('color')
            ->toArray();

        return Inertia::render('AdminSekolah/Houses/Edit', [
            'house' => $house,
            'usedColors' => $usedColors,
        ]);
    }

    public function update(UpdateHouseRequest $request, House $house)
    {
        Gate::authorize('access', $house);

        try {
            $house->update($request->validated());
        } catch (\Illuminate\Database\QueryException $e) {
            return $this->handleUniqueConstraintError($e);
        }

        return redirect()
            ->route('admin-sekolah.houses.index')
            ->with('success', 'Rumah sukan berjaya dikemaskini.');
    }

    public function show(House $house)
    {
        Gate::authorize('access', $house);

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

    public function destroy(House $house)
    {
        Gate::authorize('access', $house);

        if (! $this->houseService->deleteHouse($house)) {
            return redirect()
                ->route('admin-sekolah.houses.index')
                ->with('error', 'Rumah sukan ini masih mempunyai pelajar. Sila kosongkan pelajar dahulu.');
        }

        return redirect()
            ->route('admin-sekolah.houses.index')
            ->with('success', 'Rumah sukan berjaya dipadam.');
    }
}
