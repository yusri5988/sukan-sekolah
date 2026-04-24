import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function MeetsIndex({ meets, sekolah }) {
    const { flash } = usePage().props;

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Official Tournament</span>
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Senarai <span className="text-orange-600">Kejohanan</span>
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.meets.create')}
                        className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] italic rounded-2xl border-b-[5px] border-slate-950 shadow-lg active:translate-y-1 active:border-b-[1px] active:shadow-none transition-all text-center flex items-center justify-center gap-3"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                        Cipta Kejohanan
                    </Link>
                </div>
            }
        >
            <Head title="Kejohanan Sukan" />

            <div className="space-y-8 md:space-y-12 pb-20">
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

                {meets.length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-[3rem] py-16 md:py-32 flex flex-col items-center justify-center text-center px-8 shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100">
                             <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-slate-400 mb-8 max-w-xs mx-auto leading-tight">Belum Ada Kejohanan Terdaftar</p>
                        <Link
                            href={route('admin-sekolah.meets.create')}
                            className="px-10 py-6 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] italic rounded-3xl border-b-[6px] border-slate-950 shadow-xl active:translate-y-1 active:border-b-[2px] transition-all"
                        >
                            Cipta Kejohanan Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:gap-8">
                        {meets.map((meet) => (
                            <div key={meet.id} className="bg-white border border-slate-100 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                    <div className="flex items-center gap-6 md:gap-10">
                                        <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] flex flex-col items-center justify-center text-white shrink-0 group-hover:bg-orange-600 transition-colors shadow-xl">
                                            <div className="text-2xl md:text-4xl font-black italic uppercase leading-none tabular-nums">
                                                {new Date(meet.date).getDate()}
                                            </div>
                                            <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] opacity-50 mt-1">
                                                {new Date(meet.date).toLocaleDateString('ms-MY', { month: 'short' })}
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:space-y-4">
                                            <h3 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none group-hover:text-orange-600 transition-colors">
                                                {meet.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 md:gap-6 items-center">
                                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                                                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                                                        {new Date(meet.date).toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                                                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{meet.events_count} Acara</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-4 shrink-0">
                                        <div className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2 border ${
                                            meet.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm' :
                                            meet.status === 'completed' ? 'bg-slate-50 text-slate-400 border-slate-100' :
                                            'bg-orange-50 text-orange-600 border-orange-100 shadow-sm'
                                        }`}>
                                            <div className={`w-2 h-2 rounded-full ${meet.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-current'}`} />
                                            {meet.status === 'active' ? 'Aktif' : meet.status === 'completed' ? 'Selesai' : 'Draf'}
                                        </div>
                                        <Link
                                            href={route('admin-sekolah.meets.show')}
                                            className="px-8 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] italic rounded-2xl hover:bg-orange-600 active:scale-95 transition-all shadow-xl shadow-slate-900/10 text-center"
                                        >
                                            Urus Kejohanan →
                                        </Link>
                                    </div>
                                </div>
                                {meet.description && (
                                    <div className="mt-8 md:mt-10 pt-8 border-t border-slate-50 relative z-10">
                                        <p className="text-slate-400 font-bold italic leading-relaxed text-sm md:text-base">{meet.description}</p>
                                    </div>
                                )}
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminSekolahLayout>
    );
}
