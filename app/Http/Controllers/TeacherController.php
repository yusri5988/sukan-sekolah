<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\TeacherService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function __construct(
        private TeacherService $teacherService
    ) {}

    /**
     * Display a listing of teachers.
     */
    public function index()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            abort(403, 'Akaun anda tidak dihubungkan dengan mana-mana sekolah.');
        }

        $teachers = $this->teacherService->listTeachers($sekolah);

        return Inertia::render('AdminSekolah/Teachers/Index', [
            'teachers' => $teachers,
        ]);
    }

    /**
     * Show the form for creating a new teacher.
     */
    public function create()
    {
        return Inertia::render('AdminSekolah/Teachers/Create');
    }

    /**
     * Store a newly created teacher in storage.
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            abort(403, 'Akaun anda tidak dihubungkan dengan mana-mana sekolah.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'telefon' => 'required|string|max:20',
        ]);

        $this->teacherService->createTeacher($sekolah, $validated);

        return redirect()->route('admin-sekolah.teachers.index')
            ->with('success', 'Guru berjaya ditambah.');
    }

    /**
     * Remove the specified teacher from storage.
     */
    public function destroy(User $teacher)
    {
        // If model binding fails (e.g. in tests with WithoutMiddleware)
        if (! $teacher->exists) {
            $teacher = User::find(request()->route('teacher'));
            if (! $teacher) {
                abort(404);
            }
        }

        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            abort(403, 'Akaun anda tidak dihubungkan dengan mana-mana sekolah.');
        }

        try {
            $this->teacherService->deleteTeacher($teacher, $sekolah);

            return redirect()->route('admin-sekolah.teachers.index')
                ->with('success', 'Guru berjaya dipadam.');
        } catch (\Exception $e) {
            return redirect()->route('admin-sekolah.teachers.index')
                ->with('error', $e->getMessage());
        }
    }
}
