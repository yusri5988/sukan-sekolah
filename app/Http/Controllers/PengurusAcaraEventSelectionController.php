<?php

namespace App\Http\Controllers;

use App\Models\EventSelection;
use App\Models\EventTemplate;
use App\Services\EventService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PengurusAcaraEventSelectionController extends Controller
{
    public function __construct(
        private EventService $eventService
    ) {}

    public function index()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        $selections = EventSelection::where('sekolah_id', $sekolah->id)
            ->with(['eventCategory', 'createdBy', 'events'])
            ->orderBy('created_at', 'desc')
            ->get();

        $meet = $sekolah->meet;

        return Inertia::render('PengurusAcara/EventSelections/Index', [
            'meet' => $meet,
            'selections' => $selections,
        ]);
    }

    public function configure(EventSelection $eventSelection)
    {
        $user = auth()->user();

        if ($eventSelection->sekolah_id !== $user->sekolah_id) {
            abort(403);
        }

        $templates = EventTemplate::where('event_category_id', $eventSelection->event_category_id)
            ->where('name', $eventSelection->template_name)
            ->where('is_active', true)
            ->get();

        $availableGenders = $templates->pluck('gender')->unique()->values()->toArray();
        $availableCategories = $templates->pluck('category')->unique()->values()->toArray();

        $existingEvents = $eventSelection->events()->get();
        $existingKeys = $existingEvents->map(fn ($e) => $e->gender . '_' . $e->category)->values()->toArray();

        $meet = $user->sekolah->meet;

        return Inertia::render('PengurusAcara/EventSelections/Configure', [
            'meet' => $meet,
            'selection' => $eventSelection->load(['eventCategory', 'createdBy']),
            'availableGenders' => $availableGenders,
            'availableCategories' => $availableCategories,
            'existingKeys' => $existingKeys,
        ]);
    }

    public function update(Request $request, EventSelection $eventSelection)
    {
        $user = auth()->user();

        if ($eventSelection->sekolah_id !== $user->sekolah_id) {
            abort(403);
        }

        $validated = $request->validate([
            'combinations' => 'required|array|min:1',
            'combinations.*' => 'string',
        ]);

        $this->eventService->createEventsFromSelection(
            $eventSelection,
            $validated['combinations'],
            $user
        );

        return redirect()
            ->route('pengurus-acara.event-selections.index')
            ->with('success', 'Acara berjaya dikonfigurasi!');
    }
}
