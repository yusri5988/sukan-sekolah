import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

export default function EventParticipantsIndex({ event, participants, eligibleStudents }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing } = useForm({
        student_ids: [],
    });

    const toggleStudent = (id) => {
        const exists = data.student_ids.includes(id);
        setData(
            'student_ids',
            exists ? data.student_ids.filter((item) => item !== id) : [...data.student_ids, id],
        );
    };

    const handleRegister = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.events.participants.store', event.id));
    };

    const handleLaneSubmit = (participant, form) => {
        router.post(route('admin-sekolah.events.participants.assign-lane', [event.id, participant.id]), form, {
            preserveScroll: true,
        });
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">Peserta - {event.name}</h2>
                        <p className="text-sm text-gray-500">Pendaftaran dan pengurusan lane</p>
                    </div>
                    <Link href={route('admin-sekolah.events.show', event.id)} className="text-sm text-blue-600 hover:text-blue-900">
                        ← Kembali ke Acara
                    </Link>
                </div>
            }
        >
            <Head title={`Peserta - ${event.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.success && <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700">{flash.success}</div>}

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                <h3 className="text-lg font-semibold text-gray-900">Daftar Pelajar</h3>
                                <p className="text-sm text-gray-500">Pilih pelajar yang layak untuk acara ini</p>
                            </div>
                            <div className="p-6">
                                {eligibleStudents.length === 0 ? (
                                    <p className="text-sm text-gray-500">Tiada pelajar layak atau semua sudah didaftarkan.</p>
                                ) : (
                                    <form onSubmit={handleRegister}>
                                        <div className="max-h-[500px] space-y-3 overflow-y-auto pr-2">
                                            {eligibleStudents.map((student) => (
                                                <label key={student.id} className="flex cursor-pointer items-center rounded-lg border p-3 hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.student_ids.includes(student.id)}
                                                        onChange={() => toggleStudent(student.id)}
                                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <div className="ms-3">
                                                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                        <div className="text-xs text-gray-500">
                                                            {student.class} · {student.gender === 'male' ? 'Lelaki' : 'Perempuan'} · {student.age} tahun
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {student.house ? student.house.name : 'Belum assign rumah'}
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>

                                        <div className="mt-6 flex items-center justify-end gap-3 border-t pt-6">
                                            <Link href={route('admin-sekolah.events.show', event.id)} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
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
                                )}
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                                <h3 className="text-lg font-semibold text-gray-900">Peserta Berdaftar ({participants.length})</h3>
                            </div>
                            <div className="p-6">
                                {participants.length === 0 ? (
                                    <p className="text-sm text-gray-500">Belum ada peserta berdaftar.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {participants.map((participant, index) => (
                                            <div key={participant.id} className="rounded-lg border p-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{index + 1}. {participant.student.name}</div>
                                                        <div className="text-xs text-gray-500">{participant.student.class} · {participant.student.ic_number}</div>
                                                        <div className="text-xs text-gray-500">Rumah: {participant.house?.name || '-'}</div>
                                                    </div>
                                                    <form
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            const form = new FormData(e.currentTarget);
                                                            handleLaneSubmit(participant, {
                                                                lane_number: form.get('lane_number'),
                                                                heat: form.get('heat') || null,
                                                            });
                                                        }}
                                                        className="flex gap-2"
                                                    >
                                                        <input
                                                            name="lane_number"
                                                            type="number"
                                                            defaultValue={participant.lane_number || ''}
                                                            placeholder="Lane"
                                                            className="w-20 rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                        />
                                                        <input
                                                            name="heat"
                                                            type="number"
                                                            defaultValue={participant.heat || ''}
                                                            placeholder="Heat"
                                                            className="w-20 rounded-md border-gray-300 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                        />
                                                        <button type="submit" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                                            Simpan
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
