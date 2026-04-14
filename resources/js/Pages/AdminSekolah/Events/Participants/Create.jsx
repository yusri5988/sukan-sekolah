import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EventParticipantsCreate({ event, eligibleStudents }) {
    const { data, setData, post, processing, errors } = useForm({
        student_ids: [],
    });

    const toggleStudent = (id) => {
        const exists = data.student_ids.includes(id);
        setData(
            'student_ids',
            exists ? data.student_ids.filter((item) => item !== id) : [...data.student_ids, id],
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.events.participants.store', [event.meet_id, event.id]));
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">Daftar Peserta - {event.name}</h2>
                        <p className="text-sm text-gray-500">Pilih pelajar untuk didaftarkan ke event</p>
                    </div>
                    <Link href={route('admin-sekolah.events.participants.index', [event.meet_id, event.id])} className="text-sm text-blue-600 hover:text-blue-900">
                        ← Kembali
                    </Link>
                </div>
            }
        >
            <Head title={`Daftar Peserta - ${event.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    {eligibleStudents.length === 0 ? (
                                        <p className="text-sm text-gray-500">Tiada pelajar layak.</p>
                                    ) : (
                                        eligibleStudents.map((student) => (
                                            <label key={student.id} className="flex cursor-pointer items-center rounded-lg border p-3 hover:bg-gray-50">
                                                <input
                                                    type="checkbox"
                                                    checked={data.student_ids.includes(student.id)}
                                                    onChange={() => toggleStudent(student.id)}
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <div className="ms-3">
                                                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                    <div className="text-xs text-gray-500">{student.class} · {student.gender === 'male' ? 'Lelaki' : 'Perempuan'} · {student.age} tahun</div>
                                                </div>
                                            </label>
                                        ))
                                    )}
                                </div>

                                {errors.student_ids && <p className="mt-2 text-sm text-red-600">{errors.student_ids}</p>}

                                <div className="mt-6 flex items-center justify-end gap-3 border-t pt-6">
                                    <Link href={route('admin-sekolah.events.participants.index', [event.meet_id, event.id])} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing || data.student_ids.length === 0}
                                        className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                                    >
                                        Daftar {data.student_ids.length} Pelajar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
