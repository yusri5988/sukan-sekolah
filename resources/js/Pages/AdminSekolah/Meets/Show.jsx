import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import Countdown from '@/Components/Countdown';
import CountdownHero from '@/Components/CountdownHero';

export default function MeetsShow({ meet }) {
    const { flash } = usePage().props;
    const { data, setData, patch, processing, errors } = useForm({
        date: meet.date || '',
        closing_date: meet.closing_date || '',
    });

    const handleDateSubmit = (e) => {
        e.preventDefault();
        patch(route('admin-sekolah.meets.update-dates'));
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <Link
                                href={route('admin-sekolah.meets.index')}
                                className="text-orange-600 hover:text-slate-900 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7 7-7" /></svg>
                            </Link>
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Tarikh Kejohanan</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {meet.name}
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Tarikh Kejohanan" />

            <div className="space-y-8">
                {flash?.success && (
                    <div className="p-6 bg-emerald-50 border-l-8 border-emerald-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Berjaya</div>
                        <div className="text-sm font-bold text-emerald-900 italic">{flash.success}</div>
                    </div>
                )}

                <CountdownHero meet={meet} />

                <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Tarikh Kejohanan</h3>
                                <p className="text-slate-500 font-bold italic">
                                    Set tarikh kejohanan dan tarikh tutup pendaftaran.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleDateSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-3">
                                        Tarikh Kejohanan
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
                                    <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-3">
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
                                    {processing ? 'Menyimpan...' : 'Simpan Tarikh'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full -z-10" />
                </div>
            </div>
        </AdminSekolahLayout>
    );
}