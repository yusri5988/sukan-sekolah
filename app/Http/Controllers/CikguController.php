<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\Meet;
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

        return Inertia::render('Cikgu/Dashboard', [
            'stats' => $stats,
            'houses' => $houses,
            'sekolah' => $sekolah,
            'myHouse' => $house,
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

        $filterYear = $request->query('year');
        $filterClass = $request->query('class');

        $query = $sekolah->students()->whereNull('house_id');

        if ($filterYear) {
            $query->where('year', $filterYear);
        }

        if ($filterClass) {
            $query->where('class', $filterClass);
        }

        $unassignedStudents = $query->orderBy('year', 'asc')
            ->orderBy('class', 'asc')
            ->orderBy('name', 'asc')
            ->get();

        $years = $sekolah->students()->whereNull('house_id')->distinct()->pluck('year')->sort()->values();
        $classes = $sekolah->students()->whereNull('house_id')->distinct()->pluck('class')->sort()->values();

        return Inertia::render('Cikgu/Students/Create', [
            'sekolah' => $sekolah,
            'myHouse' => $user->house,
            'unassignedStudents' => $unassignedStudents,
            'years' => $years,
            'classes' => $classes,
            'filterYear' => $filterYear,
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
     * List participants for an event.
     * Cikgu hanya melihat pelajar yang layak dari rumahnya sendiri.
     */
    public function participantIndex($meetId, $eventId)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            abort(403, 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        if (! $user->house_id || ! $user->house || $user->house->sekolah_id !== $sekolah->id) {
            return redirect()->route('cikgu.dashboard')->with('error', 'Anda belum dilantik kepada rumah sukan atau rumah anda telah dipadam. Sila hubungi pentadbir sekolah.');
        }

        $meet = Meet::where('id', $meetId)->where('sekolah_id', $sekolah->id)->firstOrFail();
        $event = $meet->events()->where('id', $eventId)->firstOrFail();

        // Gunakan service yang telah ditapis untuk cikgu
        $participants = $this->participantService->getParticipants($event, $user);
        $eligibleStudents = $this->participantService->getEligibleStudents($event, $user);

        return Inertia::render('Cikgu/Events/Participants/Index', [
            'event' => $event->load('meet'),
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
    public function participantStore(Request $request, $meetId, $eventId)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            abort(403, 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        if (! $user->house_id || ! $user->house || $user->house->sekolah_id !== $sekolah->id) {
            return redirect()->route('cikgu.dashboard')->with('error', 'Anda belum dilantik kepada rumah sukan atau rumah anda telah dipadam. Sila hubungi pentadbir sekolah.');
        }

        $meet = Meet::where('id', $meetId)->where('sekolah_id', $sekolah->id)->firstOrFail();
        $event = $meet->events()->where('id', $eventId)->firstOrFail();

        $validated = $request->validate([
            'student_ids' => 'required|array|min:1',
            'student_ids.*' => 'integer|exists:students,id',
        ]);

        // Gunakan service dengan semakan rumah
        $result = $this->participantService->bulkRegister($event, $user, $validated['student_ids']);

        return redirect()
            ->route('cikgu.events.participants.index', [$meetId, $eventId])
            ->with('success', "{$result['created']} peserta berjaya didaftarkan.")
            ->with('registration_errors', $result['errors']);
    }
}
