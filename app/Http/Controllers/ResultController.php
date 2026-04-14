<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventParticipant;
use App\Models\House;
use App\Models\Result;
use App\Services\ResultService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResultController extends Controller
{
    public function __construct(
        private ResultService $resultService
    ) {}

    public function index($meetId, Event $event)
    {
        $this->authorizeEvent($event, (int) $meetId);

        return Inertia::render('AdminSekolah/Results/Index', [
            'event' => $event->load('meet'),
            'results' => $this->resultService->getResults($event),
            'ranking' => $this->resultService->getRanking($event->meet),
        ]);
    }

    public function create($meetId, Event $event)
    {
        $this->authorizeEvent($event, (int) $meetId);

        return Inertia::render('AdminSekolah/Results/Create', [
            'event' => $event->load('meet'),
            'participants' => $event->participants()->with('student.house')->get(),
            'houses' => House::where('sekolah_id', $event->sekolah_id)->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request, $meetId, Event $event)
    {
        $this->authorizeEvent($event, (int) $meetId);

        $validated = $request->validate([
            'event_participant_id' => 'nullable|exists:event_participants,id',
            'house_id' => 'required|exists:houses,id',
            'position' => 'required|integer|min:1|max:10',
            'time_record' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
            'is_verified' => 'boolean',
            'is_locked' => 'boolean',
        ]);

        $this->resultService->saveResult($event, $validated);

        return redirect()
            ->route('admin-sekolah.results.index', [$meetId, $event->id])
            ->with('success', 'Keputusan berjaya disimpan.');
    }

    public function edit($meetId, Event $event, Result $result)
    {
        $this->authorizeEvent($event, (int) $meetId);
        $this->authorizeResult($result, $event);

        return Inertia::render('AdminSekolah/Results/Edit', [
            'event' => $event->load('meet'),
            'result' => $result->load(['house', 'participant.student']),
            'participants' => $event->participants()->with('student.house')->get(),
            'houses' => House::where('sekolah_id', $event->sekolah_id)->orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, $meetId, Event $event, Result $result)
    {
        $this->authorizeEvent($event, (int) $meetId);
        $this->authorizeResult($result, $event);

        $validated = $request->validate([
            'event_participant_id' => 'nullable|exists:event_participants,id',
            'house_id' => 'required|exists:houses,id',
            'position' => 'required|integer|min:1|max:10',
            'time_record' => 'nullable|string|max:50',
            'notes' => 'nullable|string',
            'is_verified' => 'boolean',
            'is_locked' => 'boolean',
        ]);

        $this->resultService->saveResult($event, $validated);

        return redirect()
            ->route('admin-sekolah.results.index', [$meetId, $event->id])
            ->with('success', 'Keputusan berjaya dikemaskini.');
    }

    public function destroy($meetId, Event $event, Result $result)
    {
        $this->authorizeEvent($event, (int) $meetId);
        $this->authorizeResult($result, $event);

        $this->resultService->deleteResult($result);

        return back()->with('success', 'Keputusan berjaya dipadam.');
    }

    public function toggleLock($meetId, Event $event, Result $result)
    {
        $this->authorizeEvent($event, (int) $meetId);
        $this->authorizeResult($result, $event);

        $this->resultService->toggleLock($result);

        return back()->with('success', 'Status lock keputusan dikemaskini.');
    }

    public function ranking($meetId, Event $event)
    {
        $this->authorizeEvent($event, (int) $meetId);

        return Inertia::render('AdminSekolah/Results/Ranking', [
            'event' => $event->load('meet'),
            'ranking' => $this->resultService->getRanking($event->meet),
        ]);
    }

    private function authorizeEvent(Event $event, int $meetId): void
    {
        $user = auth()->user();

        if (! $user || $event->sekolah_id !== $user->sekolah_id || $event->meet_id !== $meetId) {
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
