<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Services\EventService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function __construct(
        private EventService $eventService
    ) {}

    /**
     * Show events for current sekolah
     */
    public function index()
    {
        $meet = $this->getMeetForCurrentUser();
        $events = $this->eventService->getEventsForSekolah($meet->sekolah);

        return Inertia::render('AdminSekolah/Events/Index', [
            'meet' => $meet,
            'events' => $events,
        ]);
    }

    /**
     * Show form to create new event
     */
    public function create()
    {
        $meet = $this->getMeetForCurrentUser();

        $templates = $this->eventService->getTemplatesGroupedByCategory();

        return Inertia::render('AdminSekolah/Events/Create', [
            'meet' => $meet,
            'templates' => $templates,
        ]);
    }

    /**
     * Show template selection page
     */
    public function selectTemplates()
    {
        $meet = $this->getMeetForCurrentUser();

        $categories = $this->eventService->getMasterTemplatesGroupedByCategory();

        return Inertia::render('AdminSekolah/Events/SelectTemplates', [
            'meet' => $meet,
            'categories' => $categories,
        ]);
    }

    /**
     * Show template configuration page
     */
    public function configureTemplates(Request $request)
    {
        $meet = $this->getMeetForCurrentUser();
        
        $validated = $request->validate([
            'names' => 'required|array|min:1',
            'names.*' => 'string',
        ]);

        $templatesByName = $this->eventService->getTemplatesByNames($validated['names']);

        return Inertia::render('AdminSekolah/Events/ConfigureTemplates', [
            'meet' => $meet,
            'templatesByName' => $templatesByName,
        ]);
    }

    /**
     * Store multiple events from selected templates
     */
    public function storeFromTemplates(Request $request)
    {
        $meet = $this->getMeetForCurrentUser();

        $validated = $request->validate([
            'template_ids' => 'required|array|min:1',
            'template_ids.*' => 'exists:event_templates,id',
        ]);

        $events = $this->eventService->createEventsFromTemplates($validated['template_ids'], $meet->sekolah);

        return redirect()
            ->route('admin-sekolah.events.index')
            ->with('success', count($events).' acara berjaya dicipta!');
    }

    /**
     * Store new event
     */
    public function store(Request $request)
    {
        $meet = $this->getMeetForCurrentUser();

        $validated = $request->validate([
            'event_template_id' => 'required|exists:event_templates,id',
            'scheduled_time' => 'nullable|date_format:H:i',
            'scheduled_date' => 'nullable|date',
        ]);

        $event = $this->eventService->createEventFromTemplate($validated, $meet->sekolah);

        return redirect()
            ->route('admin-sekolah.events.index')
            ->with('success', 'Acara berjaya dicipta!');
    }

    /**
     * Show single event details
     */
    public function show(Event $event)
    {
        $this->authorizeEvent($event);
        $meet = $this->getMeetForCurrentUser();

        $event->load('participants.student', 'results.house');

        return Inertia::render('AdminSekolah/Events/Show', [
            'meet' => $meet,
            'event' => $event,
        ]);
    }

    /**
     * Edit event
     */
    public function edit(Event $event)
    {
        $this->authorizeEvent($event);
        $meet = $this->getMeetForCurrentUser();

        return Inertia::render('AdminSekolah/Events/Edit', [
            'meet' => $meet,
            'event' => $event,
        ]);
    }

    /**
     * Update event
     */
    public function update(Request $request, Event $event)
    {
        $this->authorizeEvent($event);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:7-9,10-12,13-15,16+,all',
            'gender' => 'required|in:male,female,mixed',
            'type' => 'required|in:individual,relay',
            'max_participants' => 'nullable|integer|min:1|max:20',
            'scheduled_time' => 'nullable|date_format:H:i',
            'scheduled_date' => 'nullable|date',
            'is_active' => 'boolean',
            'settings' => 'nullable|array',
        ]);

        $this->eventService->updateEvent($event, $validated);

        return redirect()
            ->route('admin-sekolah.events.show', $event->id)
            ->with('success', 'Acara berjaya dikemaskini!');
    }

    /**
     * Toggle event active status
     */
    public function toggleActive(Event $event)
    {
        $this->authorizeEvent($event);

        $this->eventService->toggleActive($event);

        return redirect()
            ->route('admin-sekolah.events.index')
            ->with('success', $event->is_active ? 'Acara diaktifkan.' : 'Acara dinonaktifkan.');
    }

    /**
     * Delete event
     */
    public function destroy(Event $event)
    {
        $this->authorizeEvent($event);

        $this->eventService->deleteEvent($event);

        return redirect()
            ->route('admin-sekolah.events.index')
            ->with('success', 'Acara berjaya dihapus!');
    }

    private function authorizeEvent(Event $event): void
    {
        $user = auth()->user();

        if (! $user || $event->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke acara ini.');
        }
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
            abort(422, 'Kejohanan belum diwujudkan untuk sekolah ini.');
        }

        return $meet;
    }
}
