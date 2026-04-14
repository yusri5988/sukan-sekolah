import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function StudentsCreate({ houses }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        ic_number: '',
        class: '',
        year: '',
        gender: 'male',
        date_of_birth: '',
        house_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.students.store'));
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Tambah Pelajar Baru</span>
                        </div>
                        <h2 className="text-4xl lg:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            Rekrut Atlet
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-slate-900 text-white rounded-xl shadow-xl">
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-black uppercase tracking-widest">Ready to Add</span>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Tambah Pelajar" />

            <div className="space-y-12">
                <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Maklumat Pelajar</h3>
                                <p className="text-slate-500 font-bold italic">
                                    Lengkapkan semua maklumat untuk menambah atlet baru ke dalam sistem.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Nama Penuh <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all"
                                            placeholder="Ahmad bin Ali"
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            No. Kad Pengenalan <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.ic_number}
                                            onChange={(e) => setData('ic_number', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all"
                                            placeholder="200112345678"
                                        />
                                        {errors.ic_number && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.ic_number}</p>
                                        )}
                                    </div>

<div>
                                            <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                                Kelas <span className="text-orange-600">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.class}
                                                onChange={(e) => setData('class', e.target.value)}
                                                className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all"
                                                placeholder="6Bestari"
                                            />
                                            {errors.class && (
                                                <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.class}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                                Tahun <span className="text-orange-600">*</span>
                                            </label>
                                            <select
                                                value={data.year || ''}
                                                onChange={(e) => setData('year', e.target.value)}
                                                className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all appearance-none"
                                            >
                                                <option value="">-- Pilih Tahun --</option>
                                                {[1,2,3,4,5,6].map((y) => (
                                                    <option key={y} value={y}>{`Tahun ${y}`}</option>
                                                ))}
                                            </select>
                                            {errors.year && (
                                                <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.year}</p>
                                            )}
                                        </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Jantina <span className="text-orange-600">*</span>
                                        </label>
                                        <select
                                            value={data.gender}
                                            onChange={(e) => setData('gender', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all appearance-none"
                                        >
                                            <option value="male">Lelaki</option>
                                            <option value="female">Perempuan</option>
                                        </select>
                                        {errors.gender && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.gender}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Tarikh Lahir <span className="text-orange-600">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={data.date_of_birth}
                                            onChange={(e) => setData('date_of_birth', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all"
                                        />
                                        {errors.date_of_birth && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.date_of_birth}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                            Rumah Sukan
                                        </label>
                                        <select
                                            value={data.house_id}
                                            onChange={(e) => setData('house_id', e.target.value)}
                                            className="w-full px-6 py-4 bg-slate-50 border-4 border-slate-900 rounded-2xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 focus:ring-4 focus:ring-orange-600/20 transition-all appearance-none"
                                        >
                                            <option value="">-- Pilih Rumah Sukan --</option>
                                            {houses.map((house) => (
                                                <option key={house.id} value={house.id}>
                                                    {house.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.house_id && (
                                            <p className="mt-2 text-sm font-bold text-red-600 italic">{errors.house_id}</p>
                                        )}
                                        <p className="mt-2 text-xs font-bold text-slate-500 italic">
                                            Boleh assign nanti juga
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-orange-50 border-4 border-orange-600/30 p-6 rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-orange-900 mb-1">Nota Penting</h4>
                                        <p className="text-sm font-bold text-orange-800 italic">
                                            No. Kad Pengenalan mestilah unik untuk setiap pelajar. Pastikan maklumat yang dimasukkan adalah tepat dan lengkap.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-6 pt-8 border-t-4 border-slate-100">
                                <Link
                                    href={route('admin-sekolah.students.index')}
                                    className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all active:scale-95 inline-block"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-4 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 transition-all active:scale-95 inline-block shadow-xl shadow-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Mencipta...' : 'Cipta Pelajar'}
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
