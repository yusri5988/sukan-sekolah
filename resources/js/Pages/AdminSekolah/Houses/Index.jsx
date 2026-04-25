import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import FlashMessage from '@/Components/FlashMessage';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function HousesIndex({ houses }) {
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = (houseId, houseName) => {
        if (confirm(`Adakah anda pasti ingin menghapuskan rumah sukan "${houseName}"?`)) {
            setDeletingId(houseId);
            router.delete(route('admin-sekolah.houses.destroy', houseId), {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col items-center justify-center text-center gap-6">
                    <div>
                        <div className="inline-flex items-center justify-center gap-2 mb-2 w-full">
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
                <FlashMessage />

                {houses.length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-[3rem] py-16 md:py-32 flex flex-col items-center justify-center text-center px-8 shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100">
                             <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        
                        <div className="space-y-4">
                            <h4 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                                Belum Ada <span className="block text-orange-600">Rumah Sukan</span>
                            </h4>
                            <p className="text-slate-400 font-bold italic max-w-xs mx-auto text-sm md:text-base leading-snug">
                                Daftarkan rumah-rumah sukan untuk memulakan pendaftaran atlet dan kutipan mata.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {houses.map((house) => (
                            <div key={house.id} className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden flex items-stretch">
                                <div 
                                    className="w-3 shrink-0"
                                    style={house.color ? { backgroundColor: house.color } : { backgroundColor: '#0f172a' }}
                                />
                                <div className="flex-1 p-4 md:p-6 flex items-center justify-between gap-4">
                                    <span className="text-base md:text-xl font-black italic uppercase tracking-tight text-slate-900 pr-4">
                                        {house.name}
                                    </span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <Link
                                            href={route('admin-sekolah.houses.edit', house.id)}
                                            className="px-4 py-2 bg-white border border-slate-200 text-slate-900 text-[9px] font-black uppercase tracking-[0.15em] italic rounded-lg hover:bg-slate-50 active:scale-95 transition-all shadow-sm"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(house.id, house.name)}
                                            disabled={deletingId === house.id}
                                            className="w-9 h-9 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all text-center flex items-center justify-center border border-red-100 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
                                            title="Hapus Rumah"
                                        >
                                            {deletingId === house.id ? (
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            )}
                                        </button>
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
