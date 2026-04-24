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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Link 
                            href={route('admin-sekolah.events.show', event.id)}
                            className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm hover:bg-slate-50 transition-all active:scale-90"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div>
                            <div className="inline-flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                                <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Athlete Entry</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                                Urus Peserta
                            </h2>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`Peserta - ${event.name}`} />

            <div className="space-y-8 md:space-y-12 pb-24">
                {flash?.success && (
                    <div className="flex items-center gap-4 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Berjaya</div>
                            <p className="text-emerald-900 text-sm font-bold italic">{flash.success}</p>
                        </div>
                    </div>
                )}

                {/* Event Summary Card */}
                <div className="bg-slate-900 rounded-[3rem] p-6 md:p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-600/10 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                                <svg className="h-8 w-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">{event.name}</h3>
                                <div className="flex flex-wrap gap-3">
                                    <span className="text-slate-400 font-bold italic text-[10px] uppercase tracking-widest">
                                        {laneCount} Lorong
                                    </span>
                                    <span className="text-white font-black italic text-[10px] uppercase tracking-widest">
                                        {participants.length} / {event.max_participants || '∞'} Peserta
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                             <p className="text-[10px] font-black italic text-orange-500 uppercase tracking-widest leading-none">Automated Seeding System</p>
                             <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Saringan dijana secara automatik mengikut lorong.</p>
                        </div>
                    </div>
                </div>

                {hasHeats && (
                    <div className="space-y-6">
                         <div className="flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Agihan Saringan</h3>
                            <div className="h-px bg-slate-100 flex-1" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {heats.map((heat) => (
                                <div key={heat.heat_number} className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
                                    <div className="bg-slate-900 p-5 flex items-center justify-between">
                                        <h4 className="font-black italic text-white uppercase tracking-widest text-sm">Saringan {heat.heat_number}</h4>
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${heat.is_full ? 'bg-red-500' : 'bg-orange-600'} text-white shadow-lg`}>
                                            {heat.participants.length}/{laneCount}
                                        </span>
                                    </div>
                                    <div className="p-4 space-y-2 bg-slate-50/50">
                                        {heat.participants.map((p) => (
                                            <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 group-hover:border-orange-100 transition-all">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Lorong {p.lane_number}</span>
                                                    <span className="text-xs font-black italic text-slate-900 uppercase leading-none truncate max-w-[150px]">{p.student?.name}</span>
                                                </div>
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.house?.color || '#cbd5e1' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Registration Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-slate-400 rounded-full" />
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Daftar Pelajar</h3>
                            <div className="h-px bg-slate-100 flex-1" />
                        </div>
                        
                        <div className="bg-white border border-slate-100 rounded-[3rem] p-6 md:p-8 shadow-sm">
                            {eligibleStudents.length === 0 ? (
                                <div className="py-20 text-center flex flex-col items-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                                        <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs font-bold italic text-slate-400 uppercase tracking-widest">Tiada pelajar yang memenuhi syarat</p>
                                </div>
                            ) : (
                                <form onSubmit={handleRegister} className="space-y-8">
                                    <div className="max-h-[450px] space-y-3 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                                        {eligibleStudents.map((student) => (
                                            <label key={student.id} className="group flex cursor-pointer items-center p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 hover:border-orange-200 transition-all">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.student_ids.includes(student.id)}
                                                        onChange={() => toggleStudent(student.id)}
                                                        className="h-6 w-6 rounded-lg border-2 border-slate-200 text-orange-600 focus:ring-orange-500/20 transition-all cursor-pointer"
                                                    />
                                                </div>
                                                <div className="ms-4 flex-1">
                                                    <div className="text-sm font-black italic text-slate-900 uppercase tracking-tight group-hover:text-orange-600 leading-none mb-1.5 transition-colors">{student.name}</div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{student.class}</span>
                                                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest italic" style={{ color: student.house?.color || '#94a3b8' }}>
                                                            {student.house?.name || 'TIADA RUMAH'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-50">
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 italic">{data.student_ids.length} Dipilih</span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase">Pelajar sedia untuk didaftar</span>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={processing || data.student_ids.length === 0}
                                            className="w-full sm:w-auto px-10 py-4 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest italic rounded-2xl border-b-[5px] border-orange-800 shadow-lg active:translate-y-1 active:border-b-[1px] active:shadow-none transition-all disabled:opacity-30"
                                        >
                                            Daftar Peserta
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Participants List Section */}
                    <div className="space-y-6">
                         <div className="flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Senarai Berdaftar</h3>
                            <div className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black tabular-nums italic">
                                {participants.length}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {participants.length === 0 ? (
                                <div className="bg-white border border-dashed border-slate-200 rounded-[3rem] py-20 text-center">
                                    <p className="text-xs font-black italic text-slate-300 uppercase tracking-[0.3em]">Belum Ada Peserta</p>
                                </div>
                            ) : (
                                participants.map((participant, index) => (
                                    <div key={participant.id} className="bg-white border border-slate-100 rounded-3xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 opacity-50 rounded-full -mr-12 -mt-12 group-hover:bg-orange-50 transition-colors" />
                                        
                                        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black italic text-sm shadow-xl group-hover:bg-orange-600 transition-colors">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black italic text-slate-900 uppercase tracking-tight group-hover:text-orange-600 transition-colors leading-none mb-1.5">{participant.student.name}</div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{participant.student.class}</span>
                                                        <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                        <span className="text-[9px] font-black uppercase tracking-widest italic" style={{ color: participant.house?.color || '#94a3b8' }}>
                                                            {participant.house?.name}
                                                        </span>
                                                    </div>
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
                                                className="flex items-center gap-2 bg-slate-100/50 p-2 rounded-2xl border border-slate-100"
                                            >
                                                <div className="flex flex-col">
                                                    <label className="text-[7px] font-black uppercase text-slate-400 ml-1 mb-0.5">Lane</label>
                                                    <input name="lane_number" type="number" defaultValue={participant.lane_number || ''} className="w-12 bg-white border border-slate-200 rounded-xl px-2 py-2 text-[11px] font-black italic text-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-center" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="text-[7px] font-black uppercase text-slate-400 ml-1 mb-0.5">Heat</label>
                                                    <input name="heat" type="number" defaultValue={participant.heat || ''} className="w-12 bg-white border border-slate-200 rounded-xl px-2 py-2 text-[11px] font-black italic text-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-center" />
                                                </div>
                                                <button type="submit" className="self-end px-4 py-2.5 bg-slate-900 text-white rounded-xl font-black uppercase text-[9px] italic hover:bg-orange-600 transition-all shadow-sm">Save</button>
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
