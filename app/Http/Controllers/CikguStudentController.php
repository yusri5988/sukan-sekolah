<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Services\StudentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CikguStudentController extends Controller
{
    public function __construct(
        private StudentService $studentService
    ) {}

    /**
     * List students for the cikgu's assigned house only.
     */
    public function index()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $houseId = $user->house_id;

        if (! $houseId) {
            return redirect()
                ->route('cikgu.dashboard')
                ->with('error', 'Anda belum dilantik kepada mana-mana rumah sukan.');
        }

        $students = $sekolah->students()
            ->where('house_id', $houseId)
            ->with('house')
            ->orderBy('name')
            ->get();

        return Inertia::render('Cikgu/Students/Index', [
            'students' => $students,
            'sekolah' => $sekolah,
            'myHouse' => $user->house,
        ]);
    }

    /**
     * Show student creation form (only if house is assigned).
     */
    public function create()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        if (! $user->house_id) {
            return redirect()
                ->route('cikgu.dashboard')
                ->with('error', 'Anda belum dilantik kepada mana-mana rumah sukan.');
        }

        return Inertia::render('Cikgu/Students/Create', [
            'sekolah' => $sekolah,
            'myHouse' => $user->house,
        ]);
    }

    /**
     * Store a new student for the cikgu's assigned house.
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        if (! $user->house_id) {
            abort(403, 'Anda belum dilantik kepada mana-mana rumah sukan.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'ic_number' => 'required|string|max:20|unique:students,ic_number',
            'class' => 'required|string|max:50',
            'year' => 'required|integer|between:1,6',
        ]);

        $this->studentService->createStudentForHouse(
            data: $validated,
            sekolah: $sekolah,
            houseId: $user->house_id
        );

        return redirect()
            ->route('cikgu.students.index')
            ->with('success', 'Pelajar berjaya dicipta!');
    }
}
