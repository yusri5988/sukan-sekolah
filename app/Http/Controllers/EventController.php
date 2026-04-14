<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Meet;
use App\Services\EventService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function __construct(
        private EventService $eventService
    ) {}

    /**
     * Show events for a meet
     */
    public function index(Meet $meet)
    {
        $user = auth()->user();

        if ($meet->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke meet ini.');
        }

        $events = $this->eventService->getEventsForMeet($meet);

        return Inertia::render('AdminSekolah/Events/Index', [
            'meet' => $meet,
            'events' => $events,
        ]);
    }

    /**
     * Show form to create new event
     */
    public function create(Meet $meet)
    {
        $user = auth()->user();

        if ($meet->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke meet ini.');
        }

        return Inertia::render('AdminSekolah/Events/Create', [
            'meet' => $meet,
        ]);
    }

    /**
     * Store new event
     */
    public function store(Request $request, Meet $meet)
    {
        $user = auth()->user();

        if ($meet->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke meet ini.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:7-9,10-12,13-15,16+,all',
            'gender' => 'required|in:male,female,mixed',
            'type' => 'required|in:individual,relay',
            'max_participants' => 'nullable|integer|min:1|max:20',
            'scheduled_time' => 'nullable|date_format:H:i',
            'scheduled_date' => 'nullable|date',
        ]);

        $event = $this->eventService->createEvent($validated, $meet);

        return redirect()
            ->route('admin-sekolah.events.index', $meet->id)
            ->with('success', 'Acara berjaya dicipta!');
    }

    /**
     * Show single event details
     */
    public function show(Meet $meet, Event $event)
    {
        $user = auth()->user();

        if ($event->sekolah_id !== $user->sekolah_id || $event->meet_id !== $meet->id) {
            abort(403, 'Anda tidak mempunyai akses ke acara ini.');
        }

        $event->load('participants.student', 'results.house');

        return Inertia::render('AdminSekolah/Events/Show', [
            'meet' => $meet,
            'event' => $event,
        ]);
    }

    /**
     * Edit event
     */
    public function edit(Meet $meet, Event $event)
    {
        $user = auth()->user();

        if ($event->sekolah_id !== $user->sekolah_id || $event->meet_id !== $meet->id) {
            abort(403, 'Anda tidak mempunyai akses ke acara ini.');
        }

        return Inertia::render('AdminSekolah/Events/Edit', [
            'meet' => $meet,
            'event' => $event,
        ]);
    }

    /**
     * Update event
     */
    public function update(Request $request, Meet $meet, Event $event)
    {
        $user = auth()->user();

        if ($event->sekolah_id !== $user->sekolah_id || $event->meet_id !== $meet->id) {
            abort(403, 'Anda tidak mempunyai akses ke acara ini.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:7-9,10-12,13-15,16+,all',
            'gender' => 'required|in:male,female,mixed',
            'type' => 'required|in:individual,relay',
            'max_participants' => 'nullable|integer|min:1|max:20',
            'scheduled_time' => 'nullable|date_format:H:i',
            'scheduled_date' => 'nullable|date',
            'is_active' => 'boolean',
        ]);

        $this->eventService->updateEvent($event, $validated);

        return redirect()
            ->route('admin-sekolah.events.show', [$meet->id, $event->id])
            ->with('success', 'Acara berjaya dikemaskini!');
    }

    /**
     * Toggle event active status
     */
    public function toggleActive(Meet $meet, Event $event)
    {
        $user = auth()->user();

        if ($event->sekolah_id !== $user->sekolah_id || $event->meet_id !== $meet->id) {
            abort(403, 'Anda tidak mempunyai akses ke acara ini.');
        }

        $this->eventService->toggleActive($event);

        return redirect()
            ->route('admin-sekolah.events.index', $meet->id)
            ->with('success', $event->is_active ? 'Acara diaktifkan.' : 'Acara dinonaktifkan.');
    }

    /**
     * Delete event
     */
    public function destroy(Meet $meet, Event $event)
    {
        $user = auth()->user();

        if ($event->sekolah_id !== $user->sekolah_id || $event->meet_id !== $meet->id) {
            abort(403, 'Anda tidak mempunyai akses ke acara ini.');
        }

        $this->eventService->deleteEvent($event);

        return redirect()
            ->route('admin-sekolah.events.index', $meet->id)
            ->with('success', 'Acara berjaya dihapus!');
    }
}
