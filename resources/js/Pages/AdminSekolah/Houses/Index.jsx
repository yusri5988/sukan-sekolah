import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function HousesIndex({ houses }) {
    const { flash } = usePage().props;

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Official Teams</span>
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Rumah <span className="text-orange-600">Sukan</span>
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.houses.create')}
                        className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] italic rounded-2xl border-b-[5px] border-slate-950 shadow-lg active:translate-y-1 active:border-b-[1px] active:shadow-none transition-all text-center"
                    >
                        + Tambah Rumah
                    </Link>
                </div>
            }
        >
            <Head title="Senarai Rumah Sukan" />

            <div className="space-y-8 md:space-y-12">
                {flash?.success && (
                    <div className="flex items-center gap-4 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200 shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Berjaya</div>
                            <p className="text-emerald-900 text-sm font-bold italic">{flash.success}</p>
                        </div>
                    </div>
                )}

                {flash?.error && (
                    <div className="flex items-center gap-4 p-6 bg-red-50 border border-red-100 rounded-3xl shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shadow-lg shadow-red-200 shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-0.5">Ralat</div>
                            <p className="text-red-900 text-sm font-bold italic">{flash.error}</p>
                        </div>
                    </div>
                )}

                {houses.length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-[3rem] py-16 md:py-32 flex flex-col items-center justify-center text-center px-8 shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100">
                             <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        
                        <div className="space-y-4 mb-10">
                            <h4 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                                Belum Ada <span className="block text-orange-600">Rumah Sukan</span>
                            </h4>
                            <p className="text-slate-400 font-bold italic max-w-xs mx-auto text-sm md:text-base leading-snug">
                                Daftarkan rumah-rumah sukan untuk memulakan pendaftaran atlet dan kutipan mata.
                            </p>
                        </div>

                        <Link
                            href={route('admin-sekolah.houses.create')}
                            className="px-10 py-6 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] italic rounded-3xl border-b-[6px] border-slate-950 shadow-xl active:translate-y-1 active:border-b-[2px] transition-all"
                        >
                            Tambah Rumah Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {houses.map((house) => (
                            <div key={house.id} className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col">
                                <div 
                                    className="h-24 md:h-28 p-6 flex items-end justify-between relative overflow-hidden"
                                    style={house.color ? { backgroundColor: house.color } : { backgroundColor: '#0f172a' }}
                                >
                                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                                    <div className="absolute top-2 right-4 text-white/20 font-black italic text-4xl select-none leading-none tracking-tighter">
                                        #{house.id}
                                    </div>
                                    
                                    <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white relative z-10 drop-shadow-md">
                                        {house.name}
                                    </h3>
                                </div>
                                
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="mb-6">
                                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50 flex flex-col items-center justify-center">
                                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">Atlet</div>
                                            <div className="text-xl font-black italic text-slate-900 tabular-nums leading-none">{house.students_count}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-auto">
                                        <Link
                                            href={route('admin-sekolah.houses.edit', house.id)}
                                            className="flex-1 flex items-center justify-center px-4 py-3 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] italic rounded-xl hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                                        >
                                            Edit
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
                                                className="w-12 h-12 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all text-center flex items-center justify-center border border-red-100 active:scale-90"
                                                title="Hapus Rumah"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
