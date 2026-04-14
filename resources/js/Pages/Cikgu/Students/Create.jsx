import CikguLayout from '@/Layouts/CikguLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CikguStudentCreate({ sekolah, myHouse }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        ic_number: '',
        class: '',
        year: '1',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cikgu.students.store'));
    };

    return (
        <CikguLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Panel Cikgu</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Tambah <span className="text-orange-600">Pelajar</span>
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Tambah Pelajar" />

            <div className="max-w-2xl mx-auto">
                <div className="mb-8 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-xl">
                    <span className="text-sm font-bold text-orange-800 italic">
                        Pelajar akan didaftarkan ke Rumah {myHouse?.name}
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white border-4 border-slate-900 p-8 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] space-y-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-900 mb-2">Nama Penuh</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full border-2 border-slate-900 rounded-xl px-4 py-3 font-bold text-slate-900 focus:border-orange-600 focus:outline-none"
                                required
                            />
                            {errors.name && <div className="text-red-600 text-xs mt-1 font-bold">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-900 mb-2">No. Kad Pengenalan</label>
                            <input
                                type="text"
                                value={data.ic_number}
                                onChange={e => setData('ic_number', e.target.value)}
                                className="w-full border-2 border-slate-900 rounded-xl px-4 py-3 font-bold text-slate-900 focus:border-orange-600 focus:outline-none"
                                required
                            />
                            {errors.ic_number && <div className="text-red-600 text-xs mt-1 font-bold">{errors.ic_number}</div>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-900 mb-2">Kelas</label>
                                <input
                                    type="text"
                                    value={data.class}
                                    onChange={e => setData('class', e.target.value)}
                                    placeholder="e.g. 1A"
                                    className="w-full border-2 border-slate-900 rounded-xl px-4 py-3 font-bold text-slate-900 focus:border-orange-600 focus:outline-none"
                                    required
                                />
                                {errors.class && <div className="text-red-600 text-xs mt-1 font-bold">{errors.class}</div>}
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-900 mb-2">Tahun</label>
                                <select
                                    value={data.year}
                                    onChange={e => setData('year', e.target.value)}
                                    className="w-full border-2 border-slate-900 rounded-xl px-4 py-3 font-bold text-slate-900 focus:border-orange-600 focus:outline-none"
                                >
                                    {[1, 2, 3, 4, 5, 6].map(y => (
                                        <option key={y} value={y}>Tahun {y}</option>
                                    ))}
                                </select>
                                {errors.year && <div className="text-red-600 text-xs mt-1 font-bold">{errors.year}</div>}
                            </div>
                        </div>

                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
                        >
                            Simpan Pelajar
                        </button>
                        <Link
                            href={route('cikgu.students.index')}
                            className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all active:scale-95"
                        >
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </CikguLayout>
    );
}