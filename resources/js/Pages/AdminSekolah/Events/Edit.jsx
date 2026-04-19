import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EventsEdit({ meet, event }) {
    const categoryOptions = [
        { value: 'tahun_1', label: 'Tahun 1' },
        { value: 'tahun_2', label: 'Tahun 2' },
        { value: 'tahun_3', label: 'Tahun 3' },
        { value: 'tahun_4', label: 'Tahun 4' },
        { value: 'tahun_5', label: 'Tahun 5' },
        { value: 'tahun_6', label: 'Tahun 6' },
        { value: 'all', label: 'Semua Umur' },
    ];

    const legacyCategoryLabels = {
        '7-9': '7-9 Tahun',
        '10-12': '10-12 Tahun',
        '13-15': '13-15 Tahun',
        '16+': '16+ Tahun',
    };

    const selectedCategory = event.category || 'tahun_1';
    const categorySelectOptions = categoryOptions.some((option) => option.value === selectedCategory)
        ? categoryOptions
        : [
              {
                  value: selectedCategory,
                  label: `${legacyCategoryLabels[selectedCategory] || selectedCategory} (Lama)`,
              },
              ...categoryOptions,
          ];

    const { data, setData, patch, processing, errors } = useForm({
        name: event.name || '',
        category: selectedCategory,
        gender: event.gender || 'male',
        scheduled_time: event.scheduled_time || '',
        scheduled_date: event.scheduled_date || '',
        is_active: event.is_active ?? true,
        settings: {
            lane_count: event.settings?.lane_count || 8,
            max_participants_per_house: event.settings?.max_participants_per_house || 4,
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin-sekolah.events.update', event.id));
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Kemas Kini Acara</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            Edit <span className="text-orange-600">Acara</span>
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.events.show', event.id)}
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
            <Head title={`Edit ${event.name}`} />

            <div className="space-y-12">
                <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Butiran Acara</h3>
                                <p className="text-slate-500 font-bold italic">
                                    Kemas kini maklumat acara untuk kejohanan {meet.name}.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                        Nama Acara <span className="text-orange-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all"
                                        placeholder="Contoh: 100m Perlumbaan"
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.name}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Kategori <span className="text-orange-600">*</span>
                                        </label>
                                        <select
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all appearance-none cursor-pointer"
                                        >
                                            {categorySelectOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.category}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Jantina <span className="text-orange-600">*</span>
                                        </label>
                                        <select
                                            value={data.gender}
                                            onChange={(e) => setData('gender', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="male">Lelaki</option>
                                            <option value="female">Perempuan</option>
                                            <option value="mixed">Campuran</option>
                                        </select>
                                        {errors.gender && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.gender}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                        Maksimum Pelajar / Rumah <span className="text-orange-600">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={data.settings.max_participants_per_house}
                                        onChange={e => setData('settings', { ...data.settings, max_participants_per_house: parseInt(e.target.value) || 4 })}
                                        className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        min="1"
                                        max="20"
                                    />
                                    {errors['settings.max_participants_per_house'] && (
                                        <p className="mt-2 text-sm font-bold text-red-600 italic">{errors['settings.max_participants_per_house']}</p>
                                    )}
                                </div>

                                {/* Dynamic Settings */}
                                <div className="grid grid-cols-1 gap-6 pt-6 border-t-2 border-slate-100">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Bil. Lorong</label>
                                        <input
                                            type="number"
                                            value={data.settings.lane_count}
                                            onChange={e => setData('settings', { ...data.settings, lane_count: parseInt(e.target.value) || 8 })}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:border-orange-600"
                                        />
                                    </div>
                                </div>

                                <div className="bg-slate-50 border-4 border-slate-900 p-8 rounded-2xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-lg font-black italic uppercase tracking-tighter text-slate-900">Jadual</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                                                Tarikh
                                            </label>
                                            <input
                                                type="date"
                                                value={data.scheduled_date}
                                                onChange={(e) => setData('scheduled_date', e.target.value)}
                                                className="w-full px-6 py-4 bg-white border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                                                Masa
                                            </label>
                                            <input
                                                type="time"
                                                value={data.scheduled_time}
                                                onChange={(e) => setData('scheduled_time', e.target.value)}
                                                className="w-full px-6 py-4 bg-white border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-slate-50 border-4 border-slate-900 rounded-2xl">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-6 w-6 rounded-lg border-4 border-slate-900 text-orange-600 focus:ring-orange-500 transition-all cursor-pointer"
                                    />
                                    <label htmlFor="is_active" className="text-sm font-black uppercase tracking-widest text-slate-900 cursor-pointer">
                                        Acara Aktif
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-6 pt-8 border-t-4 border-slate-100">
                                <Link
                                    href={route('admin-sekolah.events.show', event.id)}
                                    className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all active:scale-95 inline-block"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-4 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all active:scale-95 inline-block shadow-xl shadow-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
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
