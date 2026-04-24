import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function ResultsIndex({ event, results, ranking, heats, qualifiers }) {
    const { flash } = usePage().props;
    const hasHeats = heats && heats.length > 0;

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
                                <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Live Results</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                                Keputusan Acara
                            </h2>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`Keputusan - ${event.name}`} />

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

                {/* Event Context Card */}
                <div className="bg-slate-900 rounded-[3rem] p-6 md:p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-600/10 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-orange-600 flex items-center justify-center shadow-xl shadow-orange-900/20">
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">{event.name}</h3>
                                <p className="text-slate-400 font-bold italic text-[10px] uppercase tracking-widest">
                                    {results.length} Keputusan Direkodkan
                                </p>
                            </div>
                        </div>
                        <Link
                            href={route('admin-sekolah.results.create', event.id)}
                            className="w-full md:w-auto px-8 py-4 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest italic rounded-2xl border-b-[5px] border-slate-200 shadow-xl active:translate-y-1 active:border-b-[1px] transition-all text-center"
                        >
                            + Tambah Keputusan
                        </Link>
                    </div>
                </div>

                {hasHeats && (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Saringan & Saringan Akhir</h3>
                            <div className="h-px bg-slate-100 flex-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {heats.map((heat) => (
                                <div key={heat.heat_number} className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
                                    <div className="bg-slate-900 p-5 flex items-center justify-between">
                                        <h4 className="font-black italic text-white uppercase tracking-widest text-sm">Saringan {heat.heat_number}</h4>
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-orange-600 text-white shadow-lg`}>
                                            {heat.participants.length} Atlet
                                        </span>
                                    </div>
                                    <div className="p-4 space-y-2 bg-slate-50/50">
                                        {heat.participants.map((p) => (
                                            <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 group-hover:border-orange-100 transition-all">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-0.5 italic">Lorong {p.lane_number}</span>
                                                    <span className="text-xs font-black italic text-slate-900 uppercase leading-none truncate max-w-[140px]">{p.student?.name}</span>
                                                </div>
                                                <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: p.house?.color || '#cbd5e1' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {qualifiers && qualifiers.length > 0 && (
                            <div className="bg-emerald-900 rounded-[3rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none select-none">
                                    <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white mb-8 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                                            </svg>
                                        </div>
                                        Layak ke Final
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {qualifiers.map((result, index) => (
                                            <div key={result.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm group hover:bg-white/10 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-2xl font-black italic text-emerald-400 group-hover:text-emerald-300 transition-colors tabular-nums">{(index + 1).toString().padStart(2, '0')}</div>
                                                    <div>
                                                        <div className="text-xs font-black italic text-white uppercase tracking-tight truncate max-w-[120px]">{result.participant?.student?.name}</div>
                                                        <div className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest italic">{result.house?.name}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-black text-white tabular-nums">{result.time_record}</div>
                                                    <div className="text-[8px] font-black text-emerald-500 uppercase">Masa</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Results Table Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Rekod Pemenang</h3>
                            <div className="h-px bg-slate-100 flex-1" />
                        </div>

                        <div className="bg-white border border-slate-100 rounded-[3rem] shadow-sm overflow-hidden">
                            {results.length === 0 ? (
                                <div className="py-24 text-center flex flex-col items-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                                        <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                                        </svg>
                                    </div>
                                    <p className="text-xs font-black italic text-slate-300 uppercase tracking-[0.3em]">Belum Ada Keputusan</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-50">
                                    {results.map((result) => (
                                        <div key={result.id} className="p-6 md:p-8 group hover:bg-slate-50/50 transition-all">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                                <div className="flex items-center gap-5">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black italic text-2xl shadow-xl transition-all group-hover:scale-110 ${
                                                        result.position === 1 ? 'bg-yellow-400 text-yellow-900' :
                                                        result.position === 2 ? 'bg-slate-300 text-slate-700' :
                                                        result.position === 3 ? 'bg-orange-400 text-orange-900' :
                                                        'bg-slate-100 text-slate-400'
                                                    }`}>
                                                        {result.position}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-base md:text-lg font-black italic text-slate-900 uppercase tracking-tight leading-none mb-1.5 group-hover:text-orange-600 transition-colors">
                                                            {result.participant?.student?.name || result.house?.name}
                                                        </h4>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{result.house?.name}</span>
                                                            <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                                            <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest italic">{result.points} Mata</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                                    <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
                                                        <div className="text-[8px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Masa / Rekod</div>
                                                        <div className="text-sm font-black italic text-slate-900 tabular-nums">{result.time_record || 'N/A'}</div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Link 
                                                            href={route('admin-sekolah.results.edit', [event.id, result.id])}
                                                            className="flex-1 sm:flex-none p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all shadow-sm flex items-center justify-center"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                        </Link>
                                                        <form action={route('admin-sekolah.results.toggle-lock', [event.id, result.id])} method="POST" className="flex-1 sm:flex-none">
                                                            <button type="submit" className={`w-full p-3 rounded-xl transition-all shadow-sm flex items-center justify-center border ${
                                                                result.is_locked 
                                                                    ? 'bg-slate-900 text-white border-slate-900' 
                                                                    : 'bg-white text-orange-600 border-orange-200'
                                                            }`}>
                                                                {result.is_locked 
                                                                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                                                    : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                                                                }
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* House Ranking Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">Kedudukan Mata</h3>
                            <div className="h-px bg-slate-100 flex-1" />
                        </div>

                        <div className="bg-white border border-slate-100 rounded-[3rem] p-6 md:p-8 shadow-sm space-y-4">
                            {ranking.map((house, index) => (
                                <div key={house.id} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-[2rem] group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                    <div className="flex items-center gap-5">
                                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black italic text-lg tabular-nums shadow-lg ${
                                            index === 0 ? 'bg-yellow-400 text-yellow-900' :
                                            index === 1 ? 'bg-slate-300 text-slate-700' :
                                            index === 2 ? 'bg-orange-400 text-orange-900' :
                                            'bg-white text-slate-400 border border-slate-100'
                                        }`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <div className="text-base font-black italic text-slate-900 uppercase tracking-tight group-hover:text-orange-600 transition-colors">{house.name}</div>
                                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{house.students_count} Pelajar Menyumbang</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-black italic text-slate-900 group-hover:text-orange-600 transition-colors tabular-nums">{house.points}</div>
                                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Mata Terkumpul</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
