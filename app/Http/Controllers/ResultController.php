<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\House;
use App\Models\Result;
use App\Services\EventParticipantService;
use App\Services\ResultService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function __construct(
        private ResultService $resultService
    ) {}

    public function index(Event $event)
    {
        $this->authorizeEvent($event);

        $heats = collect();
        $qualifiers = collect();

        if ($event->hasHeats()) {
            $participantService = app(EventParticipantService::class);
            $heats = $participantService->getHeats($event);
            $qualifiers = $this->resultService->getQualifiersForFinal($event);
        }

        return Inertia::render('AdminSekolah/Results/Index', [
            'event' => $event,
            'results' => $this->resultService->getResults($event),
            'ranking' => $this->resultService->getRanking($event->sekolah),
            'heats' => $heats,
            'qualifiers' => $qualifiers,
        ]);
    }

    public function create(Event $event)
    {
        $this->authorizeEvent($event);

        return Inertia::render('AdminSekolah/Results/Create', [
            'event' => $event,
            'participants' => $event->participants()->with('student.house')->get(),
            'houses' => House::where('sekolah_id', $event->sekolah_id)->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request, Event $event)
    {
        $this->authorizeEvent($event);

        $validated = $request->validate([
            'event_participant_id' => [
                'nullable',
                Rule::exists('event_participants', 'id')->where(
                    fn ($query) => $query->where('event_id', $event->id)
                ),
            ],
            'house_id' => [
                'nullable',
                Rule::requiredIf(fn () => ! $request->filled('event_participant_id')),
                Rule::exists('houses', 'id')->where(
                    fn ($query) => $query->where('sekolah_id', $event->sekolah_id)
                ),
            ],
            'position' => 'required|integer|min:1|max:10',
            'time_record' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
            'is_verified' => 'boolean',
            'is_locked' => 'boolean',
        ]);

        $this->resultService->saveResult($event, $validated);

        return redirect()
            ->route('admin-sekolah.results.index', $event->id)
            ->with('success', 'Keputusan berjaya disimpan.');
    }

    public function edit(Event $event, Result $result)
    {
        $this->authorizeEvent($event);
        $this->authorizeResult($result, $event);

        return Inertia::render('AdminSekolah/Results/Edit', [
            'event' => $event,
            'result' => $result->load(['house', 'participant.student']),
            'participants' => $event->participants()->with('student.house')->get(),
            'houses' => House::where('sekolah_id', $event->sekolah_id)->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Event $event, Result $result)
    {
        $this->authorizeEvent($event);
        $this->authorizeResult($result, $event);

        $validated = $request->validate([
            'event_participant_id' => [
                'nullable',
                Rule::exists('event_participants', 'id')->where(
                    fn ($query) => $query->where('event_id', $event->id)
                ),
            ],
            'house_id' => [
                'nullable',
                Rule::requiredIf(fn () => ! $request->filled('event_participant_id')),
                Rule::exists('houses', 'id')->where(
                    fn ($query) => $query->where('sekolah_id', $event->sekolah_id)
                ),
            ],
            'position' => 'required|integer|min:1|max:10',
            'time_record' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
            'is_verified' => 'boolean',
            'is_locked' => 'boolean',
        ]);

        $this->resultService->saveResult($event, $validated);

        return redirect()
            ->route('admin-sekolah.results.index', $event->id)
            ->with('success', 'Keputusan berjaya dikemaskini.');
    }

    public function destroy(Event $event, Result $result)
    {
        $this->authorizeEvent($event);
        $this->authorizeResult($result, $event);

        $this->resultService->deleteResult($result);

        return back()->with('success', 'Keputusan berjaya dipadam.');
    }

    public function toggleLock(Event $event, Result $result)
    {
        $this->authorizeEvent($event);
        $this->authorizeResult($result, $event);

        $this->resultService->toggleLock($result);

        return back()->with('success', 'Status lock keputusan dikemaskini.');
    }

    public function ranking(Event $event)
    {
        $this->authorizeEvent($event);

        return Inertia::render('AdminSekolah/Results/Ranking', [
            'event' => $event,
            'ranking' => $this->resultService->getRanking($event->sekolah),
        ]);
    }

    public function processQualification(Event $event)
    {
        $this->authorizeEvent($event);

        if (! $event->hasHeats()) {
            return back()->with('error', 'Acara ini tidak mempunyai saringan.');
        }

        $qualifiers = $this->resultService->getQualifiersForFinal($event);

        if ($qualifiers->isEmpty()) {
            return back()->with('error', 'Tiada keputusan saringan untuk diproses.');
        }

        return back()->with('success', "{$qualifiers->count()} peserta layak ke final (masa terpantas).");
    }

    private function authorizeEvent(Event $event): void
    {
        $user = auth()->user();

        if (! $user || $event->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke acara ini.');
        }
    }

    private function authorizeResult(Result $result, Event $event): void
    {
        if ($result->event_id !== $event->id) {
            abort(403, 'Anda tidak mempunyai akses ke keputusan ini.');
        }
    }
}
