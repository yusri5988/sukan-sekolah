import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

export default function EventParticipantsIndex({ event, participants, eligibleStudents, heats }) {
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

    const hasHeats = heats && heats.length > 0;
    const laneCount = event.settings?.lane_count || 8;

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4 sm:px-0">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-1 w-6 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[9px] font-black uppercase tracking-[0.3em]">Pengurusan Peserta</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {event.name}
                        </h2>
                        <p className="text-slate-400 font-bold italic text-xs mt-2 uppercase tracking-tight">Kat: {event.category.replace('_', ' ')} · {event.gender === 'male' ? 'Lelaki' : 'Perempuan'}</p>
                    </div>
                    <Link
                        href={route('admin-sekolah.events.show', event.id)}
                        className="group transition-all active:scale-95"
                    >
                        <div className="w-10 h-10 rounded-2xl bg-white border-2 border-slate-900 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] transition-all">
                            <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                    </Link>
                </div>
            }
        >
            <Head title={`Peserta - ${event.name}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-0 space-y-6 pb-20 mt-6">
                {flash?.success && (
                    <div className="flex items-center gap-4 p-4 bg-emerald-900 border-l-[10px] border-emerald-500 rounded-2xl text-white shadow-xl shadow-emerald-500/20 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[9px] font-black uppercase tracking-widest opacity-60">Berjaya</div>
                            <div className="text-base font-black italic leading-none">{flash.success}</div>
                        </div>
                    </div>
                )}

                <div className="bg-slate-900 rounded-[2rem] p-5 md:p-8 text-white relative overflow-hidden shadow-xl shadow-slate-200">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-600/10 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white leading-none">Kapasiti & Saringan</h3>
                                <p className="text-slate-400 font-bold italic text-[10px] mt-1 uppercase tracking-widest leading-none">
                                    {laneCount} Lorong · {participants.length}/{event.max_participants} Peserta
                                </p>
                            </div>
                        </div>
                        <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                             <p className="text-xs font-bold italic text-slate-300 uppercase leading-snug">Peserta &gt; {laneCount} diagihkan automatik.</p>
                        </div>
                    </div>
                </div>

                {hasHeats && (
                    <div className="space-y-4">
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Agihan Saringan</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {heats.map((heat) => (
                                <div key={heat.heat_number} className="bg-white border-2 border-slate-900 rounded-[1.5rem] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] overflow-hidden group hover:-translate-y-0.5 transition-all">
                                    <div className="bg-slate-900 p-3 flex items-center justify-between">
                                        <h4 className="font-black italic text-white uppercase tracking-tighter text-base">Saringan {heat.heat_number}</h4>
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${heat.is_full ? 'bg-red-500' : 'bg-emerald-500'} text-white shadow-lg`}>
                                            {heat.participants.length}/{laneCount}
                                        </span>
                                    </div>
                                    <div className="p-3 space-y-1.5">
                                        {heat.participants.map((p) => (
                                            <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-orange-50 transition-colors">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">L{p.lane_number}</span>
                                                    <span className="text-xs font-black italic text-slate-900 uppercase leading-none">{p.student?.name}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-slate-400 rounded-full" />
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Daftar Pelajar Baru</h3>
                        </div>
                        
                        <div className="bg-white border-4 border-slate-900 rounded-[2rem] p-5 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                            {eligibleStudents.length === 0 ? (
                                <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-[1.5rem]">
                                    <p className="text-slate-400 font-bold italic text-[10px] uppercase tracking-widest">Tiada rekod</p>
                                </div>
                            ) : (
                                <form onSubmit={handleRegister} className="space-y-5">
                                    <div className="max-h-[350px] space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                                        {eligibleStudents.map((student) => (
                                            <label key={student.id} className="group flex cursor-pointer items-center p-2.5 rounded-xl border-2 border-slate-50 bg-slate-50/50 hover:bg-orange-50 hover:border-orange-200 transition-all">
                                                <input
                                                    type="checkbox"
                                                    checked={data.student_ids.includes(student.id)}
                                                    onChange={() => toggleStudent(student.id)}
                                                    className="h-4 w-4 rounded border-2 border-slate-300 text-orange-600 focus:ring-orange-500 transition-all cursor-pointer"
                                                />
                                                <div className="ms-3 flex-1">
                                                    <div className="text-sm font-black italic text-slate-900 uppercase tracking-tight group-hover:text-orange-600 leading-none mb-0.5">{student.name}</div>
                                                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">{student.class} · {student.house?.name || '-'}</div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 italic">{data.student_ids.length} dipilih</span>
                                        <button
                                            type="submit"
                                            disabled={processing || data.student_ids.length === 0}
                                            className="px-6 py-3 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-[0.2em] italic rounded-xl hover:bg-slate-900 transition-all active:scale-95 shadow-lg disabled:opacity-30"
                                        >
                                            Daftar ({data.student_ids.length})
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Senarai Berdaftar ({participants.length})</h3>
                        </div>

                        <div className="space-y-2">
                            {participants.length === 0 ? (
                                <div className="bg-white border-4 border-dashed border-slate-100 rounded-[2rem] py-10 text-center text-slate-400 text-[10px] font-bold italic uppercase tracking-widest">Tiada rekod</div>
                            ) : (
                                participants.map((participant, index) => (
                                    <div key={participant.id} className="bg-white border-2 border-slate-900 rounded-[1.2rem] p-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] group">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black italic text-xs shadow-md">{index + 1}</div>
                                                <div>
                                                    <div className="text-sm font-black italic text-slate-900 uppercase tracking-tight group-hover:text-orange-600 leading-none mb-0.5">{participant.student.name}</div>
                                                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic">{participant.student.class} · {participant.house?.name || '-'}</div>
                                                </div>
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
                                                className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100"
                                            >
                                                <input name="lane_number" type="number" defaultValue={participant.lane_number || ''} placeholder="L" className="w-10 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-black italic text-slate-900 focus:ring-0" />
                                                <input name="heat" type="number" defaultValue={participant.heat || ''} placeholder="H" className="w-10 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-black italic text-slate-900 focus:ring-0" />
                                                <button type="submit" className="px-2 py-1 bg-slate-900 text-white rounded-lg font-black uppercase text-[8px] italic hover:bg-orange-600 transition-all">Ok</button>
                                            </form>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
