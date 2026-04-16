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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Pengurusan Pasukan</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Rumah <span className="text-orange-600">Sukan</span>
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.houses.create')}
                        className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200 text-center"
                    >
                        + Tambah Rumah
                    </Link>
                </div>
            }
        >
            <Head title="Senarai Rumah Sukan" />

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
                    <div className="bg-slate-50 border-4 border-dashed border-slate-200 p-20 rounded-[3rem] text-center">
                        <div className="text-slate-300 mb-6">
                            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <p className="text-2xl font-black italic uppercase tracking-tighter text-slate-400 mb-8">Belum Ada Rumah Sukan Terdaftar</p>
                        <Link
                            href={route('admin-sekolah.houses.create')}
                            className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-slate-200"
                        >
                            Tambah Rumah Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {houses.map((house) => (
                            <div key={house.id} className="bg-white border-2 border-slate-900 rounded-3xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform">
                                <div 
                                    className="h-24 p-6 flex items-end justify-between relative overflow-hidden"
                                    style={house.color ? { backgroundColor: house.color } : { backgroundColor: '#0f172a' }}
                                >
                                    {/* Texture Overlay */}
                                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                                    <div className="absolute top-2 right-4 text-white/20 font-black italic text-4xl select-none leading-none">
                                        #{house.id}
                                    </div>
                                    
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white relative z-10 drop-shadow-lg">
                                        {house.name}
                                    </h3>
                                </div>
                                
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="grid grid-cols-2 gap-3 mb-6">
                                        <div className="bg-slate-50 p-3 rounded-xl border-2 border-slate-100 group-hover:border-slate-900 transition-colors">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Mata</div>
                                            <div className="text-2xl font-black italic text-slate-900 tabular-nums">{house.points}</div>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-xl border-2 border-slate-100 group-hover:border-slate-900 transition-colors">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pelajar</div>
                                            <div className="text-2xl font-black italic text-slate-900 tabular-nums">{house.students_count}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3 mt-auto">
                                        <Link
                                            href={route('admin-sekolah.houses.show', house.id)}
                                            className="flex-1 px-4 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all text-center"
                                        >
                                            Lihat Info
                                        </Link>
                                        <form
                                            action={route('admin-sekolah.houses.destroy', house.id)}
                                            method="POST"
                                            className="flex-1"
                                            onSubmit={(e) => {
                                                if (!confirm('Adakah anda pasti ingin menghapuskan rumah sukan ini?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <input type="hidden" name="_method" value="DELETE" />
                                            <button
                                                type="submit"
                                                className="w-full px-4 py-3 bg-white border-2 border-red-600 text-red-600 text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-red-600 hover:text-white transition-all text-center"
                                            >
                                                Hapus
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
