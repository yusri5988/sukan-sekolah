import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EventsCreate({ meet }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: '1',
        gender: 'male',
        type: 'individual',
        max_participants: 1,
        scheduled_time: '',
        scheduled_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.events.store', meet.id));
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Tambah Acara</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            {meet.name}
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.events.index', meet.id)}
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
            <Head title={`Tambah Acara - ${meet.name}`} />

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
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Butiran Acara</h3>
                                <p className="text-slate-500 font-bold italic">
                                    Lengkapkan maklumat acara untuk kejohanan ini.
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
                                            {[1, 2, 3, 4, 5, 6].map((year) => (
                                                <option key={year} value={year}>Tahun {year}</option>
                                            ))}
                                            <option value="all">Semua Tahun</option>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Jenis <span className="text-orange-600">*</span>
                                        </label>
                                        <select
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="individual">Individu</option>
                                            <option value="relay">Relay</option>
                                        </select>
                                        {errors.type && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.type}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Max Peserta
                                        </label>
                                        <input
                                            type="number"
                                            value={data.max_participants}
                                            onChange={(e) => setData('max_participants', parseInt(e.target.value) || 1)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            min="1"
                                            max="20"
                                        />
                                        {errors.max_participants && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.max_participants}</p>
                                        )}
                                        <p className="mt-2 text-xs font-bold text-slate-500 italic">
                                            Untuk relay, masukkan bilangan ahli Pasukan
                                        </p>
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
                            </div>

                            <div className="flex items-center justify-end gap-6 pt-8 border-t-4 border-slate-100">
                                <Link
                                    href={route('admin-sekolah.events.index', meet.id)}
                                    className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all active:scale-95 inline-block"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-4 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all active:scale-95 inline-block shadow-xl shadow-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Mencipta...' : 'Cipta Acara'}
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
