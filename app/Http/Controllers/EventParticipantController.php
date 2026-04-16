<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventParticipant;
use App\Services\EventParticipantService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventParticipantController extends Controller
{
    public function __construct(
        private EventParticipantService $participantService
    ) {}

    /**
     * List participants for an event
     */
    public function index(Request $request, Event $event)
    {
        $this->authorizeEvent($event);

        $participants = $this->participantService->getParticipants($event);
        $eligibleStudents = $this->participantService->getEligibleStudents($event);

        return Inertia::render('AdminSekolah/Events/Participants/Index', [
            'event' => $event,
            'participants' => $participants,
            'eligibleStudents' => $eligibleStudents,
        ]);
    }

    /**
     * Show registration form
     */
    public function create(Event $event)
    {
        $this->authorizeEvent($event);

        $eligibleStudents = $this->participantService->getEligibleStudents($event);

        return Inertia::render('AdminSekolah/Events/Participants/Create', [
            'event' => $event,
            'eligibleStudents' => $eligibleStudents,
        ]);
    }

    /**
     * Register selected students
     */
    public function store(Request $request, Event $event)
    {
        $this->authorizeEvent($event);

        $validated = $request->validate([
            'student_ids' => 'required|array|min:1',
            'student_ids.*' => 'integer|exists:students,id',
        ]);

        $result = $this->participantService->bulkRegister($event, $validated['student_ids']);

        return redirect()
            ->route('admin-sekolah.events.participants.index', $event->id)
            ->with('success', "{$result['created']} pelajar berjaya didaftarkan.")
            ->with('registration_errors', $result['errors']);
    }

    /**
     * Assign lane
     */
    public function assignLane(Request $request, Event $event, EventParticipant $participant)
    {
        $this->authorizeEvent($event);

        $validated = $request->validate([
            'lane_number' => 'required|integer|min:1',
            'heat' => 'nullable|integer|min:1',
        ]);

        $this->authorizeParticipant($participant, $event);

        $this->participantService->assignLane($participant, $validated['lane_number'], $validated['heat'] ?? null);

        return back()->with('success', 'Lane berjaya dikemaskini.');
    }

    /**
     * Remove participant
     */
    public function destroy(Event $event, EventParticipant $participant)
    {
        $this->authorizeEvent($event);
        $this->authorizeParticipant($participant, $event);

        $this->participantService->removeParticipant($participant);

        return back()->with('success', 'Peserta berjaya dibuang.');
    }

    private function authorizeEvent(Event $event): void
    {
        $user = auth()->user();

        if (! $user || $event->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke acara ini.');
        }
    }

    private function authorizeParticipant(EventParticipant $participant, Event $event): void
    {
        if ($participant->event_id !== $event->id) {
            abort(403, 'Anda tidak mempunyai akses ke peserta ini.');
        }
    }
}
