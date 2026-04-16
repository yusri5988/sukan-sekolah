import CikguLayout from '@/Layouts/CikguLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function CikguParticipantsIndex({ event, participants, eligibleStudents, myHouse }) {
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
        post(route('cikgu.events.participants.store', event.id));
    };

    return (
        <CikguLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Panel Cikgu - Rumah {myHouse?.name || 'Belum dilantik'}</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Peserta - <span className="text-orange-600">{event.name}</span>
                        </h2>
                    </div>
                    <Link
                        href={route('cikgu.dashboard')}
                        className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                    >
                        ← Dashboard
                    </Link>
                </div>
            }
        >
            <Head title={`Peserta - ${event.name}`} />

            <div className="space-y-8">
                {flash?.error && (
                    <div className="p-6 bg-red-50 border-l-8 border-red-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Ralat</div>
                        <div className="text-sm font-bold text-red-900 italic">{flash.error}</div>
                    </div>
                )}

                {flash?.success && (
                    <div className="p-6 bg-emerald-50 border-l-8 border-emerald-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Berjaya</div>
                        <div className="text-sm font-bold text-emerald-900 italic">{flash.success}</div>
                    </div>
                )}

                {flash?.registration_errors?.length > 0 && (
                    <div className="p-6 bg-amber-50 border-l-8 border-amber-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-2">Sebahagian ditolak</div>
                        <ul className="space-y-1 text-sm font-bold text-amber-900 italic list-disc list-inside">
                            {flash.registration_errors.map((message, index) => (
                                <li key={index}>{message}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Registration */}
                    <div className="bg-white border-4 border-slate-900 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                        <div className="bg-slate-900 px-8 py-6">
                            <h3 className="text-lg font-black italic uppercase tracking-widest text-white">Daftar Pelajar</h3>
                        </div>
                        <div className="p-8">
                            {eligibleStudents.length === 0 ? (
                                <p className="text-slate-400 font-bold italic">Tiada pelajar layak atau semua sudah didaftarkan.</p>
                            ) : (
                                <form onSubmit={handleRegister}>
                                    <div className="max-h-[500px] space-y-3 overflow-y-auto pr-2">
                                        {eligibleStudents.map((student) => (
                                            <label key={student.id} className="flex cursor-pointer items-center rounded-xl border-2 border-slate-200 p-3 hover:bg-slate-50 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={data.student_ids.includes(student.id)}
                                                    onChange={() => toggleStudent(student.id)}
                                                    className="h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                                                />
                                                <div className="ms-3">
                                                    <div className="text-sm font-black text-slate-900 uppercase tracking-tighter">{student.name}</div>
                                                    <div className="text-xs text-slate-500 font-bold italic">
                                                        {student.class} · {student.gender === 'male' ? 'Lelaki' : 'Perempuan'}
                                                    </div>
                                                    <div className="text-xs text-slate-400 font-bold">
                                                        {student.house ? student.house.name : 'Belum assign rumah'}
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex items-center justify-end gap-3 border-t-4 border-slate-100 pt-6">
                                        <button
                                            type="submit"
                                            disabled={processing || data.student_ids.length === 0}
                                            className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200 disabled:opacity-50"
                                        >
                                            Daftar {data.student_ids.length} Pelajar
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Registered Participants */}
                    <div className="bg-white border-4 border-slate-900 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                        <div className="bg-slate-900 px-8 py-6">
                            <h3 className="text-lg font-black italic uppercase tracking-widest text-white">
                                Peserta Berdaftar ({participants.length})
                            </h3>
                        </div>
                        <div className="p-8">
                            {participants.length === 0 ? (
                                <p className="text-slate-400 font-bold italic">Belum ada peserta berdaftar.</p>
                            ) : (
                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                    {participants.map((participant, index) => (
                                        <div key={participant.id} className="rounded-xl border-2 border-slate-200 p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <div className="text-sm font-black text-slate-900 uppercase tracking-tighter">
                                                        {index + 1}. {participant.student.name}
                                                    </div>
                                                    <div className="text-xs text-slate-500 font-bold italic">
                                                        {participant.student.class} · {participant.student.ic_number}
                                                    </div>
                                                    <div className="text-xs text-slate-400 font-bold">
                                                        Rumah: {participant.house?.name || '-'}
                                                    </div>
                                                </div>
                                                {participant.lane_number && (
                                                    <span className="px-3 py-1 bg-slate-900 text-white text-xs font-black rounded-lg">
                                                        Lane {participant.lane_number}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </CikguLayout>
    );
}
