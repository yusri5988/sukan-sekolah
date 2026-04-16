import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function MeetsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        date: '',
        closing_date: '',
        description: '',
        point_config: {
            '1': 5,
            '2': 3,
            '3': 1,
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.meets.store'));
    };

    const updatePointConfig = (position, value) => {
        setData('point_config', {
            ...data.point_config,
            [position]: parseInt(value) || 0,
        });
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Tambah Kejohanan</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            Cipta <span className="text-orange-600">Kejohanan</span> Baru
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.meets.index')}
                        className="px-6 py-3 bg-white border-4 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title="Cipta Kejohanan" />

            <div className="space-y-12">
                <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Maklumat Kejohanan</h3>
                                <p className="text-slate-500 font-bold italic">
                                    Lengkapkan butiran untuk mencipta kejohanan baharu.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Nama Kejohanan <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all"
                                            placeholder="Contoh: Hari Sukan 2026"
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Tarikh <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={data.date}
                                            onChange={(e) => setData('date', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all"
                                        />
                                        {errors.date && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Tarikh Tutup Pendaftaran
                                        </label>
                                        <input
                                            type="date"
                                            value={data.closing_date}
                                            onChange={(e) => setData('closing_date', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all"
                                        />
                                        {errors.closing_date && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.closing_date}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Keterangan
                                        </label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows="5"
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all"
                                            placeholder="Sila masukkan butiran lanjut kejohanan..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 border-4 border-slate-900 p-8 rounded-2xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-black italic uppercase tracking-tighter text-slate-900">Konfigurasi Mata</h4>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((position) => (
                                        <div key={position} className="space-y-2">
                                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500">
                                                Tempat {position}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={data.point_config[position]}
                                                    onChange={(e) => updatePointConfig(position, e.target.value)}
                                                    className="w-full pl-6 pr-14 py-4 bg-white border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    min="0"
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">mata</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-4 text-xs font-bold text-slate-500 italic">
                                    Default: Johan=5 mata, Naib Johan=3 mata, Ketiga=1 mata
                                </p>
                            </div>

                            <div className="flex items-center justify-end gap-6 pt-8 border-t-4 border-slate-100">
                                <Link
                                    href={route('admin-sekolah.meets.index')}
                                    className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all active:scale-95 inline-block"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-4 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all active:scale-95 inline-block shadow-xl shadow-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Menyimpan...' : 'Cipta Kejohanan'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
