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
                    <div className="flex items-center gap-4">
                        <Link 
                            href={route('admin-sekolah.meets.index')}
                            className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm hover:bg-slate-50 transition-all active:scale-90"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div>
                            <div className="inline-flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                                <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Meets Configuration</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                                Urus Tarikh
                            </h2>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Tarikh Kejohanan" />

            <div className="space-y-8 md:space-y-12 pb-24">
                {flash?.success && (
                    <div className="flex items-center gap-4 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Berjaya</div>
                            <p className="text-emerald-900 text-sm font-bold italic">{flash.success}</p>
                        </div>
                    </div>
                )}

                <CountdownHero meet={meet} />

                <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-sm relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 text-center md:text-left">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-orange-50 text-orange-600 flex items-center justify-center mx-auto md:mx-0 shadow-inner border border-orange-100">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-slate-900 mb-1">Tetapan Tarikh Kejohanan</h3>
                                <p className="text-slate-400 font-bold italic text-sm">
                                    Tentukan garis masa untuk pendaftaran atlet dan hari kejohanan rasmi.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleDateSubmit} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">
                                        Hari Kejohanan
                                    </label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-black italic text-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all tabular-nums"
                                    />
                                    {errors.date && (
                                        <p className="mt-2 text-xs font-bold text-red-600 italic">{errors.date}</p>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">
                                        Tutup Pendaftaran
                                    </label>
                                    <input
                                        type="date"
                                        value={data.closing_date}
                                        onChange={(e) => setData('closing_date', e.target.value)}
                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-black italic text-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all tabular-nums"
                                    />
                                    {errors.closing_date && (
                                        <p className="mt-2 text-xs font-bold text-red-600 italic">{errors.closing_date}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-10 border-t border-slate-50">
                                <Link
                                    href={route('admin-sekolah.meets.index')}
                                    className="w-full sm:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest italic rounded-2xl hover:bg-slate-50 transition-all active:scale-95 text-center"
                                >
                                    Batalkan
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto px-12 py-4 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest italic rounded-2xl border-b-[5px] border-orange-800 shadow-xl active:translate-y-1 active:border-b-[1px] active:shadow-none transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan Tetapan Tarikh'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
