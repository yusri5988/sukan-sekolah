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
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Pengurusan Kejohanan</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Senarai <span className="text-orange-600">Kejohanan</span>
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.meets.create')}
                        className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200 text-center"
                    >
                        + Cipta Kejohanan
                    </Link>
                </div>
            }
        >
            <Head title="Kejohanan Sukan" />

            <div className="space-y-8">
                {flash?.success && (
                    <div className="p-6 bg-emerald-50 border-l-8 border-emerald-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Berjaya</div>
                        <div className="text-sm font-bold text-emerald-900 italic">{flash.success}</div>
                    </div>
                )}

                {flash?.error && (
                    <div className="p-6 bg-red-50 border-l-8 border-red-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Ralat</div>
                        <div className="text-sm font-bold text-red-900 italic">{flash.error}</div>
                    </div>
                )}

                {meets.length === 0 ? (
                    <div className="bg-slate-50 border-4 border-dashed border-slate-200 p-20 rounded-[3rem] text-center">
                        <div className="text-slate-300 mb-6">
                            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-2xl font-black italic uppercase tracking-tighter text-slate-400 mb-8">Belum Ada Kejohanan Terdaftar</p>
                        <Link
                            href={route('admin-sekolah.meets.create')}
                            className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-slate-200"
                        >
                            Cipta Kejohanan Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {meets.map((meet) => (
                            <div key={meet.id} className="bg-white border-4 border-slate-900 p-8 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group hover:-translate-y-1 transition-transform">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                                    <div className="flex items-center gap-8">
                                        <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center text-white shrink-0 group-hover:bg-orange-600 transition-colors">
                                            <div className="text-2xl font-black italic uppercase leading-none tabular-nums">
                                                {new Date(meet.date).getDate()}
                                            </div>
                                            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">
                                                {new Date(meet.date).toLocaleDateString('ms-MY', { month: 'short' })}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                                                {meet.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-4 items-center">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest italic">
                                                        {new Date(meet.date).toLocaleDateString('ms-MY', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest italic">{meet.events_count} Acara</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-sm border-2 ${
                                            meet.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            meet.status === 'completed' ? 'bg-slate-50 text-slate-400 border-slate-100' :
                                            'bg-orange-50 text-orange-600 border-orange-100'
                                        }`}>
                                            {meet.status === 'active' ? '● Aktif' :
                                             meet.status === 'completed' ? '✓ Selesai' : '✎ Draf'}
                                        </span>
                                        <Link
                                            href={route('admin-sekolah.meets.show', meet.id)}
                                            className="px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-100"
                                        >
                                            Urus Kejohanan
                                        </Link>
                                    </div>
                                </div>
                                {meet.description && (
                                    <div className="mt-8 pt-8 border-t-2 border-slate-50 relative z-10">
                                        <p className="text-slate-500 font-bold italic leading-relaxed">{meet.description}</p>
                                    </div>
                                )}
                                <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminSekolahLayout>
    );
}
