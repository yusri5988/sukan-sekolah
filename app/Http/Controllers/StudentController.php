<?php

namespace App\Http\Controllers;

use App\Models\Sekolah;
use App\Models\Student;
use App\Services\StudentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function __construct(
        private StudentService $studentService
    ) {}

    /**
     * Display list of students for admin sekolah's sekolah
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->route('dashboard')->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $houseId = $request->query('house_id');
        $students = $this->studentService->getStudents($sekolah, $houseId);
        $houses = $sekolah->houses()->withCount('students')->get();

        return Inertia::render('AdminSekolah/Students/Index', [
            'students' => $students,
            'houses' => $houses,
            'selectedHouseId' => $houseId,
            'sekolah' => $sekolah,
        ]);
    }

    /**
     * Show form to create new student
     */
    public function create()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;
        $houses = $sekolah ? $sekolah->houses()->orderBy('name')->get() : collect();

        return Inertia::render('AdminSekolah/Students/Create', [
            'houses' => $houses,
            'sekolah' => $sekolah,
        ]);
    }

    /**
     * Store new student
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->back()->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'ic_number' => 'required|string|max:20|unique:students,ic_number',
            'class' => 'required|string|max:50',
            'year' => 'required|integer|between:1,6',
            'gender' => 'required|in:male,female',
            'date_of_birth' => 'required|date|before:today',
            'house_id' => 'nullable|exists:houses,id',
        ]);

        $this->studentService->createStudent($validated, $sekolah);

        return redirect()
            ->route('admin-sekolah.students.index')
            ->with('success', 'Pelajar berjaya dicipta!');
    }

    /**
     * Show import page
     */
    public function import()
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;
        $houses = $sekolah ? $sekolah->houses()->orderBy('name')->get() : collect();

        return Inertia::render('AdminSekolah/Students/Import', [
            'houses' => $houses,
            'sekolah' => $sekolah,
        ]);
    }

    /**
     * Process student import
     */
    public function processImport(Request $request)
    {
        $user = auth()->user();
        $sekolah = $user->sekolah;

        if (! $sekolah) {
            return redirect()->back()->with('error', 'Tiada sekolah dihubungkan dengan akaun anda.');
        }

        $request->validate([
            'file' => 'required|file|mimes:csv,txt,xlsx|max:10240',
        ]);

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();

        if ($extension === 'csv' || $extension === 'txt') {
            $result = $this->processCsvImport($file, $sekolah);
        } elseif ($extension === 'xlsx') {
            $result = $this->processExcelImport($file, $sekolah);
        } else {
            return redirect()->back()->with('error', 'Format fail tidak disokong. Sila gunakan CSV atau Excel.');
        }

        if ($result['created'] > 0 || $result['updated'] > 0) {
            $message = "Import selesai! {$result['created']} pelajar baru dicipta, {$result['updated']} pelajar dikemaskini.";
            if (! empty($result['errors'])) {
                $message .= ' '.count($result['errors']).' baris gagal diproses.';
            }

            return redirect()
                ->route('admin-sekolah.students.index')
                ->with('success', $message)
                ->with('import_errors', $result['errors']);
        } else {
            return redirect()
                ->route('admin-sekolah.students.index')
                ->with('error', 'Tiada pelajar berjaya diimport. Sila semak format fail anda.')
                ->with('import_errors', $result['errors']);
        }
    }

    /**
     * Process CSV import
     */
    private function processCsvImport($file, $sekolah): array
    {
        $handle = fopen($file->getRealPath(), 'r');
        $headers = fgetcsv($handle);

        // Normalize headers
        $headers = array_map(function ($h) {
            return strtolower(trim(str_replace(' ', '_', $h)));
        }, $headers);

        $rows = [];
        while (($data = fgetcsv($handle)) !== false) {
            $row = array_combine($headers, $data);
            $rows[] = $row;
        }
        fclose($handle);

        return $this->studentService->importStudents($rows, $sekolah);
    }

    /**
     * Process Excel import (basic - using PhpSpreadsheet if available)
     * Note: For Excel support, install phpoffice/phpspreadsheet via composer
     */
    private function processExcelImport($file, $sekolah): array
    {
        // Basic validation - for full Excel support, install phpoffice/phpspreadsheet
        // For now, return error suggesting CSV
        return [
            'created' => 0,
            'updated' => 0,
            'errors' => ['Sila guna format CSV untuk import. Excel support boleh ditambah dengan install phpoffice/phpspreadsheet.'],
        ];
    }

    /**
     * Show single student details
     */
    public function show(Student $student)
    {
        $user = auth()->user();

        if ($student->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke pelajar ini.');
        }

        $student->load('house', 'sekolah');

        return Inertia::render('AdminSekolah/Students/Show', [
            'student' => $student,
        ]);
    }

    /**
     * Delete student
     */
    public function destroy(Student $student)
    {
        $user = auth()->user();

        if ($student->sekolah_id !== $user->sekolah_id) {
            abort(403, 'Anda tidak mempunyai akses ke pelajar ini.');
        }

        $this->studentService->deleteStudent($student);

        return redirect()
            ->route('admin-sekolah.students.index')
            ->with('success', 'Pelajar berjaya dihapus!');
    }
}
