<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\House;
use App\Models\Student;
use App\Services\CikguEventParticipantService;
use App\Services\StudentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CikguController extends Controller
{
    public function __construct(
        private StudentService $studentService,
        private CikguEventParticipantService $participantService
    ) {}

    /**
     * Display the cikgu dashboard.
     */
    public function dashboard()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $house = $user->house;
        $houseId = $user->house_id;

        $stats = [
            'total_students' => $houseId
                ? $sekolah->students()->where('house_id', $houseId)->count()
                : 0,
            'total_houses' => $sekolah->houses()->count(),
            'students_without_house' => $sekolah->students()->whereNull('house_id')->count(),
        ];

        $houses = $sekolah->houses()
            ->withCount('students')
            ->orderBy('points', 'desc')
            ->get();

        $events = $sekolah->events()
            ->where('is_active', true)
            ->with('eventCategory')
            ->orderBy('order')
            ->orderBy('name')
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'name' => $event->name,
                    'category_label' => $event->category_label,
                    'gender_label' => $event->gender_label,
                    'type_label' => $event->type_label,
                    'participants_count' => $event->participants()->count(),
                    'max_participants' => $event->max_participants,
                ];
            });

        return Inertia::render('Cikgu/Dashboard', [
            'stats' => $stats,
            'houses' => $houses,
            'sekolah' => $sekolah->load('meet'),
            'myHouse' => $house,
            'events' => $events,
        ]);
    }

    /**
     * List students (filtered by cikgu's house).
     */
    public function studentIndex()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $houseId = $user->house_id;

        if (! $houseId) {
            return redirect()->route('cikgu.dashboard')->with('error', 'Tiada rumah sukan dihubungkan dengan akaun anda.');
        }

        $students = $this->studentService->getStudents($sekolah, $houseId);

        return Inertia::render('Cikgu/Students/Index', [
            'students' => $students,
            'sekolah' => $sekolah,
            'myHouse' => $user->house,
        ]);
    }

    /**
     * Show student assignment form.
     */
    public function studentCreate(Request $request)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('cikgu.dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        if (! $user->house_id) {
            return redirect()->route('cikgu.dashboard')->with('error', 'Tiada rumah sukan dihubungkan dengan akaun anda. Sila hubungi pentadbir.');
        }

        $filterClass = $request->query('class');

        $query = $sekolah->students()->whereNull('house_id');

        if ($filterClass) {
            $query->where('class', $filterClass);
        }

        $unassignedStudents = $query->orderBy('year', 'asc')
            ->orderBy('class', 'asc')
            ->orderBy('name', 'asc')
            ->get();

        $classes = $sekolah->students()->whereNull('house_id')->distinct()->pluck('class')->sort()->values();

        return Inertia::render('Cikgu/Students/Create', [
            'sekolah' => $sekolah,
            'myHouse' => $user->house,
            'unassignedStudents' => $unassignedStudents,
            'classes' => $classes,
            'filterClass' => $filterClass,
        ]);
    }

    /**
     * Assign students to house.
     */
    public function studentStore(Request $request)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->back()->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        if (! $user->house_id || ! $user->house || $user->house->sekolah_id !== $sekolah->id) {
            return redirect()->route('cikgu.dashboard')->with('error', 'Anda belum dilantik kepada rumah sukan atau rumah anda telah dipadam. Sila hubungi pentadbir sekolah.');
        }

        $validated = $request->validate([
            'student_ids' => 'required|array|min:1',
            'student_ids.*' => 'required|exists:students,id',
        ]);

        $count = Student::whereIn('id', $validated['student_ids'])
            ->where('sekolah_id', $sekolah->id)
            ->whereNull('house_id')
            ->update(['house_id' => $user->house_id]);

        return redirect()
            ->route('cikgu.students.index')
            ->with('success', $count.' pelajar berjaya diperuntukkan kepada Rumah '.$user->house->name.'.');
    }

    /**
     * List all events for event registration.
     */
    public function eventIndex(Request $request)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $filterCategory = $request->query('category');
        $filterGender = $request->query('gender');
        $search = $request->query('search');

        $query = $sekolah->events()
            ->where('is_active', true)
            ->with('eventCategory')
            ->withCount('participants');

        if ($filterCategory) {
            $query->where('category', $filterCategory);
        }

        if ($filterGender) {
            $query->where('gender', $filterGender);
        }

        if ($search) {
            $query->where('name', 'like', '%'.$search.'%');
        }

        $events = $query->orderBy('order')
            ->orderBy('name')
            ->get()
            ->map(function ($event) use ($user) {
                $houseParticipants = $event->participants()
                    ->where('house_id', $user->house_id)
                    ->count();

                return [
                    'id' => $event->id,
                    'name' => $event->name,
                    'category_label' => $event->category_label,
                    'gender_label' => $event->gender_label,
                    'type_label' => $event->type_label,
                    'category' => $event->category,
                    'gender' => $event->gender,
                    'type' => $event->type,
                    'total_participants' => $event->participants_count,
                    'my_house_participants' => $houseParticipants,
                    'max_participants' => $event->max_participants,
                ];
            });

        $categories = $sekolah->events()
            ->where('is_active', true)
            ->distinct()
            ->pluck('category')
            ->sort()
            ->values();

        $genders = $sekolah->events()
            ->where('is_active', true)
            ->distinct()
            ->pluck('gender')
            ->sort()
            ->values();

        return Inertia::render('Cikgu/Events/Index', [
            'events' => $events,
            'categories' => $categories,
            'genders' => $genders,
            'myHouse' => $user->house,
            'filters' => [
                'category' => $filterCategory,
                'gender' => $filterGender,
                'search' => $search,
            ],
        ]);
    }

    /**
     * List participants for an event.
     * Cikgu hanya melihat pelajar yang layak dari rumahnya sendiri.
     */
    public function participantIndex(Event $event)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            abort(403, 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        if (! $user->house_id || ! $user->house || $user->house->sekolah_id !== $sekolah->id) {
            return redirect()->route('cikgu.dashboard')->with('error', 'Anda belum dilantik kepada rumah sukan atau rumah anda telah dipadam. Sila hubungi pentadbir sekolah.');
        }

        if ($event->sekolah_id !== $sekolah->id) {
            abort(403, 'Anda tidak mempunyai akses ke acara ini.');
        }

        // Gunakan service yang telah ditapis untuk cikgu
        $participants = $this->participantService->getParticipants($event, $user);
        $eligibleStudents = $this->participantService->getEligibleStudents($event, $user);

        return Inertia::render('Cikgu/Events/Participants/Index', [
            'event' => $event,
            'participants' => $participants,
            'eligibleStudents' => $eligibleStudents,
            'myHouse' => $user->house,
        ]);
    }

    /**
     * Register participants for an event.
     * Cikgu hanya boleh daftarkan pelajar dari rumahnya sendiri.
     * Semakan backend memastikan setiap pelajar dari rumah cikgu.
     */
    public function participantStore(Request $request, Event $event)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            abort(403, 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        if (! $user->house_id || ! $user->house || $user->house->sekolah_id !== $sekolah->id) {
            return redirect()->route('cikgu.dashboard')->with('error', 'Anda belum dilantik kepada rumah sukan atau rumah anda telah dipadam. Sila hubungi pentadbir sekolah.');
        }

        if ($event->sekolah_id !== $sekolah->id) {
            abort(403, 'Anda tidak mempunyai akses ke acara ini.');
        }

        $validated = $request->validate([
            'student_ids' => 'required|array|min:1',
            'student_ids.*' => 'integer|exists:students,id',
        ]);

        // Gunakan service dengan semakan rumah
        $result = $this->participantService->bulkRegister($event, $user, $validated['student_ids']);

        return redirect()
            ->route('cikgu.events.participants.index', $event->id)
            ->with('success', "{$result['created']} peserta berjaya didaftarkan.")
            ->with('registration_errors', $result['errors']);
    }
}
