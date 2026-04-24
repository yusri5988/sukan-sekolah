import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const fixedColorOptions = [
    { label: 'Merah', value: '#ef4444' },
    { label: 'Biru', value: '#3b82f6' },
    { label: 'Hijau', value: '#22c55e' },
    { label: 'Kuning', value: '#eab308' },
];

export default function HousesEdit({ house }) {
    const { data, setData, patch, processing, errors, transform } = useForm({
        name: house.name || '',
        color: house.color || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin-sekolah.houses.update', house.id));
    };

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
                            Edit <span className="text-orange-600">Rumah Sukan</span>
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
            <Head title="Edit Rumah Sukan" />

            <div className="py-6 sm:py-12">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border-2 sm:border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] rounded-2xl sm:rounded-[2.5rem] overflow-hidden">
                        <div className="p-6 sm:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">
                                <div className="space-y-6 sm:space-y-8">
                                    
                                    <div className="space-y-3 sm:space-y-4">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                            Nama Rumah <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-xl font-black italic uppercase tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300"
                                            placeholder="Nama Rumah Sukan"
                                        />
                                        {errors.name && (
                                            <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-3 sm:space-y-4">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                            Pilih Warna Rumah <span className="text-orange-600">*</span>
                                        </label>
                                        <div className="grid grid-cols-4 gap-3 sm:gap-4">
                                            {fixedColorOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => setData('color', option.value)}
                                                    className={`aspect-square sm:h-20 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all transform active:scale-95 flex flex-col items-center justify-center gap-2 ${
                                                        data.color === option.value
                                                            ? 'border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] -translate-y-1 scale-105'
                                                            : 'border-slate-200 hover:border-slate-300 shadow-none translate-y-0 scale-100'
                                                    }`}
                                                    style={{ backgroundColor: option.value }}
                                                >
                                                    <span className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-white drop-shadow-md">
                                                        {option.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                        {errors.color && (
                                            <p className="text-[10px] font-black uppercase tracking-widest text-red-500 italic">{errors.color}</p>
                                        )}
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
                                        {processing ? 'MEMPROSES...' : 'KEMASKINI →'}
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
