import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function HousesCreate({ sekolah }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        color: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.houses.store'));
    };

    const colorOptions = [
        { name: 'Merah', value: '#ef4444' },
        { name: 'Biru', value: '#3b82f6' },
        { name: 'Hijau', value: '#22c55e' },
        { name: 'Kuning', value: '#eab308' },
        { name: 'Ungu', value: '#a855f7' },
        { name: 'Pink', value: '#ec4899' },
        { name: 'Oren', value: '#f97316' },
        { name: 'Sian', value: '#06b6d4' },
    ];

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-1 sm:mb-2">
                            <div className="w-6 sm:w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Pengurusan Rumah</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Tambah <span className="text-orange-600">Rumah Baru</span>
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.houses.index')}
                        className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2"
                    >
                        ← Kembali ke Senarai
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Rumah Sukan" />

            <div className="py-6 sm:py-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border-2 sm:border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] rounded-2xl sm:rounded-[2.5rem] overflow-hidden">
                        <div className="p-6 sm:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">
                                <div className="space-y-6 sm:space-y-8">
                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                            Nama Rumah Sukan <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-xl font-black italic uppercase tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300"
                                            placeholder="CONTOH: MERAH, BIRU, HIJAU"
                                        />
                                        {errors.name && (
                                            <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-3 sm:space-y-4">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                            Pilih Tema Warna
                                        </label>
                                        <div className="grid grid-cols-4 sm:grid-cols-4 gap-3 sm:gap-4">
                                            {colorOptions.map((color) => (
                                                <button
                                                    key={color.value}
                                                    type="button"
                                                    onClick={() => setData('color', color.value)}
                                                    className={`aspect-square sm:h-16 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all transform active:scale-95 flex items-center justify-center ${
                                                        data.color === color.value
                                                            ? 'border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] -translate-y-1 scale-105'
                                                            : 'border-slate-100 hover:border-slate-300 shadow-none translate-y-0 scale-100'
                                                    }`}
                                                    style={{ backgroundColor: color.value }}
                                                    title={color.name}
                                                >
                                                    {data.color === color.value && (
                                                        <div className="bg-white/30 backdrop-blur-md rounded-full p-1 sm:p-2 text-white">
                                                            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                        <input type="hidden" name="color" value={data.color} />
                                        {errors.color && (
                                            <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{errors.color}</p>
                                        )}
                                        <div className="p-4 sm:p-5 bg-slate-900 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-orange-600 mt-6">
                                            <div className="flex gap-3 sm:gap-4">
                                                <div className="flex-shrink-0 text-orange-500">
                                                    <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <p className="text-[10px] sm:text-sm font-bold text-slate-400 italic leading-snug">
                                                    Warna ini akan digunakan pada papan markah (scoreboard) dan laporan prestasi rumah.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 sm:gap-6 pt-6 sm:pt-10 border-t-2 sm:border-t-4 border-slate-50">
                                    <Link
                                        href={route('admin-sekolah.houses.index')}
                                        className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-white border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black uppercase tracking-widest italic text-slate-900 hover:bg-slate-50 transition-all active:scale-95 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-orange-600 text-white border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black uppercase tracking-widest italic hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
                                    >
                                        {processing ? 'MEMPROSES...' : 'CIPTA RUMAH →'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
