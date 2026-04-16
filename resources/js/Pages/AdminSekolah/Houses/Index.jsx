import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function HousesIndex({ houses }) {
    const { flash } = usePage().props;
    const { post, processing } = useForm({});

    const handleAutoAssign = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.houses.auto-assign'));
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[9px] font-black uppercase tracking-[0.3em]">Pengurusan Pasukan</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Rumah <span className="text-orange-600">Sukan</span>
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.houses.create')}
                        className="w-full md:w-auto px-6 py-3.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-[4px] active:shadow-none text-center"
                    >
                        + Tambah Rumah
                    </Link>
                </div>
            }
        >
            <Head title="Senarai Rumah Sukan" />

            <div className="space-y-6">
                {flash?.success && (
                    <div className="p-4 bg-emerald-50 border-l-[8px] border-emerald-500 rounded-xl shadow-sm">
                        <div className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Berjaya</div>
                        <div className="text-xs font-bold text-emerald-900 italic">{flash.success}</div>
                    </div>
                )}

                {flash?.error && (
                    <div className="p-4 bg-red-50 border-l-[8px] border-red-500 rounded-xl shadow-sm">
                        <div className="text-[9px] font-black uppercase tracking-widest text-red-600 mb-0.5">Ralat</div>
                        <div className="text-xs font-bold text-red-900 italic">{flash.error}</div>
                    </div>
                )}

                {/* Auto Assign Section */}
                <div className="hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Auto Assign Pelajar</h3>
                        <p className="text-slate-500 font-bold text-sm italic max-w-xl">
                            Sistem akan membahagikan semua pelajar yang belum mempunyai rumah secara adil dan seimbang mengikut jumlah ahli setiap rumah.
                        </p>
                    </div>
                    <div className="relative z-10 shrink-0 w-full md:w-auto">
                        <form onSubmit={handleAutoAssign}>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-8 py-4 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all active:scale-95 shadow-xl shadow-orange-100 disabled:opacity-50"
                            >
                                {processing ? 'MEMPROSES...' : 'Auto-Assign Sekarang'}
                            </button>
                        </form>
                    </div>
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-slate-50 rounded-full -z-10 group-hover:scale-150 transition-transform duration-700" />
                </div>

                {houses.length === 0 ? (
                    <div className="bg-slate-50 border-4 border-dashed border-slate-200 p-10 md:p-20 rounded-[2rem] md:rounded-[3rem] text-center flex flex-col items-center justify-center">
                        <div className="text-slate-300 mb-6">
                            <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <p className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-slate-400 mb-8 max-w-xs mx-auto leading-tight">Belum Ada Rumah Sukan Terdaftar</p>
                        <Link
                            href={route('admin-sekolah.houses.create')}
                            className="inline-block w-full sm:w-auto px-8 py-4 px-6 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-[4px] active:shadow-none"
                        >
                            Tambah Rumah Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {houses.map((house) => (
                            <div key={house.id} className="bg-white border-2 border-slate-900 rounded-[1.5rem] shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform">
                                <div 
                                    className="h-20 md:h-24 p-5 flex items-end justify-between relative overflow-hidden"
                                    style={house.color ? { backgroundColor: house.color } : { backgroundColor: '#0f172a' }}
                                >
                                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                                    <div className="absolute top-2 right-4 text-white/20 font-black italic text-3xl select-none leading-none">
                                        #{house.id}
                                    </div>
                                    
                                    <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white relative z-10 drop-shadow-md">
                                        {house.name}
                                    </h3>
                                </div>
                                
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between gap-3 mb-5">
                                        <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:border-slate-300 transition-colors">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Mata</div>
                                            <div className="text-xl font-black italic text-slate-900 tabular-nums leading-none">{house.points}</div>
                                        </div>
                                        <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 group-hover:border-slate-300 transition-colors">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Pelajar</div>
                                            <div className="text-xl font-black italic text-slate-900 tabular-nums leading-none">{house.students_count}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-auto">
                                        <Link
                                            href={route('admin-sekolah.houses.show', house.id)}
                                            className="flex-1 flex items-center justify-center px-3 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest italic rounded-lg hover:bg-orange-600 transition-all text-center shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-[2px] active:shadow-none"
                                        >
                                            Info Penuh
                                        </Link>
                                        <form
                                            action={route('admin-sekolah.houses.destroy', house.id)}
                                            method="POST"
                                            className="shrink-0"
                                            onSubmit={(e) => {
                                                if (!confirm('Adakah anda pasti ingin menghapuskan rumah sukan ini?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <input type="hidden" name="_method" value="DELETE" />
                                            <button
                                                type="submit"
                                                className="w-10 h-10 bg-white border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all text-center flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(220,38,38,1)] active:translate-y-[2px] active:shadow-none"
                                                title="Hapus Rumah"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminSekolahLayout>
    );
}
