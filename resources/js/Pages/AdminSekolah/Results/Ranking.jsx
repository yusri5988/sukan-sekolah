import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function ResultsRanking({ event, ranking }) {
    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Link 
                            href={route('admin-sekolah.results.index', event.id)}
                            className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm hover:bg-slate-50 transition-all active:scale-90"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div>
                            <div className="inline-flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                                <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Official Standings</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                                Kedudukan {event.name}
                            </h2>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Ranking" />

            <div className="space-y-8 md:space-y-12 pb-24 max-w-4xl mx-auto">
                <div className="bg-white border border-slate-100 rounded-[3rem] p-6 md:p-8 shadow-sm space-y-4">
                    {ranking.map((house, index) => (
                        <div key={house.id} className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] group hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black italic text-xl tabular-nums shadow-lg ${
                                    index === 0 ? 'bg-yellow-400 text-yellow-900' :
                                    index === 1 ? 'bg-slate-300 text-slate-700' :
                                    index === 2 ? 'bg-orange-400 text-orange-900' :
                                    'bg-white text-slate-400 border border-slate-100'
                                }`}>
                                    {index + 1}
                                </div>
                                <div>
                                    <div className="text-lg md:text-xl font-black italic text-slate-900 uppercase tracking-tight group-hover:text-orange-600 transition-colors leading-none mb-1.5">{house.name}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{house.students_count} Atlet Beraksi</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-black italic text-slate-900 group-hover:text-orange-600 transition-colors tabular-nums tracking-tighter">{house.points}</div>
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic leading-none">Mata Terkumpul</div>
                            </div>
                        </div>
                    ))}

                    {ranking.length === 0 && (
                        <div className="py-20 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100 text-slate-200">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <p className="text-sm font-black italic text-slate-300 uppercase tracking-[0.2em]">Tiada Data Ranking Tersedia</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                     <Link 
                        href={route('admin-sekolah.results.index', event.id)}
                        className="px-10 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest italic rounded-2xl border-b-[5px] border-slate-950 shadow-lg active:translate-y-1 active:border-b-[1px] transition-all"
                    >
                        Tutup Ranking
                    </Link>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
