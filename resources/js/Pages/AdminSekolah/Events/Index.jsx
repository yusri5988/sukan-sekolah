import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function EventsIndex({ meet, events }) {
    const { flash } = usePage().props;

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1 w-8 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-xs font-extrabold uppercase tracking-[0.2em]">Pengurusan Acara</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {meet.name}
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.meets.show')}
                        className="group flex items-center gap-2 px-5 py-2.5 text-slate-500 hover:text-orange-600 font-bold transition-all"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm uppercase tracking-wider">Kembali</span>
                    </Link>
                </div>
            }
        >
            <Head title={`Acara - ${meet.name}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-0 space-y-4 pb-10 mt-6 md:mt-10">
                {/* Stats & Actions Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200">
                            <svg className="h-6 w-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Ringkasan</p>
                            <h3 className="text-lg font-black text-slate-900 uppercase italic leading-none">
                                <span className="text-orange-600">{events.length}</span> Acara Dicipta
                            </h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:flex items-center gap-3">
                        <Link
                            href={route('admin-sekolah.events.select-templates')}
                            className="px-4 sm:px-8 py-3.5 bg-orange-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 hover:-translate-y-1 transition-all active:scale-95 shadow-lg shadow-orange-100 flex items-center justify-center gap-2 sm:gap-3"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Pilih Acara
                        </Link>
                    </div>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-100 shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-emerald-800 text-sm font-bold italic">{flash.success}</p>
                    </div>
                )}

                {events.length === 0 ? (
                    <div className="relative group overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] py-24 flex flex-col items-center justify-center text-center px-6">
                        <h4 className="text-2xl font-black text-slate-900 uppercase italic mb-2">Tiada Acara Dijumpai</h4>
                        <p className="text-slate-500 font-bold italic mb-10 max-w-sm">Mula bina kejohanan anda dengan menambah beberapa acara sukan sekarang.</p>
                        <Link
                            href={route('admin-sekolah.events.select-templates')}
                            className="px-10 py-5 bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em] italic rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all shadow-2xl shadow-slate-200"
                        >
                            Tambah Acara Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="overflow-x-auto text-[13px]">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-50 bg-slate-50/50">
                                        <th className="pl-8 pr-4 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Bil</th>
                                        <th className="px-4 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Nama Acara</th>
                                        <th className="px-4 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hidden sm:table-cell">Kategori</th>
                                        <th className="px-4 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hidden md:table-cell">Jantina</th>
                                        <th className="pl-4 pr-8 py-4 text-right text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {events.map((event, index) => (
                                        <tr key={event.id} className="group hover:bg-slate-50/70 transition-all duration-200">
                                            <td className="pl-8 pr-4 py-4 sm:py-5">
                                                <span className="text-base font-black italic text-slate-200 group-hover:text-orange-200 transition-colors">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 sm:py-5">
                                                <h4 className="text-base font-black text-slate-900 uppercase italic leading-tight mb-0.5 group-hover:text-orange-600 transition-colors">
                                                    {event.name}
                                                </h4>
                                                <div className="flex flex-wrap gap-1.5 md:hidden mt-1.5">
                                                    <span className="px-2 py-0.5 bg-slate-100 text-[8px] font-black uppercase rounded text-slate-500 italic">
                                                        {event.category.replace('tahun_', 'T')}
                                                    </span>
                                                    <span className="px-2 py-0.5 bg-slate-100 text-[8px] font-black uppercase rounded text-slate-500 italic">
                                                        {event.gender === 'male' ? 'Lelaki' : 'Perempuan'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 sm:py-5 hidden sm:table-cell">
                                                <span className="font-black text-slate-700 italic uppercase">
                                                    {event.category.replace('tahun_', 'Tahun ')}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 sm:py-5 hidden md:table-cell">
                                                <span className="font-black text-slate-700 italic uppercase">
                                                    {event.gender === 'male' ? 'Lelaki' : event.gender === 'female' ? 'Perempuan' : 'Campuran'}
                                                </span>
                                            </td>
                                            <td className="pl-4 pr-8 py-4 sm:py-5 text-right">
                                                <Link
                                                    href={route('admin-sekolah.events.show', event.id)}
                                                    className="inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:px-5 sm:py-2.5 bg-white border-2 border-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                                                >
                                                    <span className="hidden sm:inline">Urus</span>
                                                    <svg className="w-4 h-4 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AdminSekolahLayout>
    );
}
