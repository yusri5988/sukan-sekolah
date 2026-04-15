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
                        href={route('admin-sekolah.meets.show', meet.id)}
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

            <div className="max-w-7xl mx-auto px-4 sm:px-0 space-y-8 pb-20">
                {/* Stats & Actions Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200">
                            <svg className="h-7 w-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-0.5">Ringkasan</p>
                            <h3 className="text-xl font-black text-slate-900 uppercase italic">
                                <span className="text-orange-600">{events.length}</span> Acara <span className="text-slate-300 mx-2 text-sm not-italic">/</span> <span className="text-slate-400 text-sm italic font-bold">Berdaftar</span>
                            </h3>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href={route('admin-sekolah.events.select-templates', meet.id)}
                            className="flex-1 sm:flex-none px-8 py-4 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-2xl hover:bg-slate-900 hover:-translate-y-1 transition-all active:scale-95 shadow-xl shadow-orange-100 flex items-center justify-center gap-3"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Pilih Acara
                        </Link>
                        <Link
                            href={route('admin-sekolah.events.create', meet.id)}
                            className="flex-1 sm:flex-none px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-2xl hover:border-slate-900 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            Custom
                        </Link>
                    </div>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-4 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-100 shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-emerald-800 font-bold italic">{flash.success}</p>
                    </div>
                )}

                {events.length === 0 ? (
                    <div className="relative group overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] py-32 flex flex-col items-center justify-center text-center px-6">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-orange-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative w-24 h-24 rounded-3xl bg-white shadow-xl flex items-center justify-center">
                                <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 18.5a6.5 6.5 0 00-6.5-6.5c0-2.54 2.54-4.5 6.5-4.5s6.5 1.96 6.5 4.5a6.5 6.5 0 00-6.5 6.5z" />
                                </svg>
                            </div>
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 uppercase italic mb-2">Tiada Acara Dijumpai</h4>
                        <p className="text-slate-500 font-bold italic mb-10 max-w-sm">Mula bina kejohanan anda dengan menambah beberapa acara sukan sekarang.</p>
                        <Link
                            href={route('admin-sekolah.events.create', meet.id)}
                            className="px-10 py-5 bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em] italic rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all shadow-2xl shadow-slate-200"
                        >
                            Tambah Acara Pertama
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-50 bg-slate-50/50">
                                        <th className="pl-10 pr-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Bil</th>
                                        <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Maklumat Acara</th>
                                        <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Kategori</th>
                                        <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                        <th className="pl-6 pr-10 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {events.map((event, index) => (
                                        <tr key={event.id} className="group hover:bg-slate-50/80 transition-all duration-300">
                                            <td className="pl-10 pr-6 py-8">
                                                <span className="text-lg font-black italic text-slate-200 group-hover:text-orange-200 transition-colors">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-8">
                                                <div>
                                                    <h4 className="text-lg font-black text-slate-900 uppercase italic leading-tight mb-1 group-hover:text-orange-600 transition-colors">
                                                        {event.name}
                                                    </h4>
                                                    <div className="flex items-center gap-3 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                                        <span className="flex items-center gap-1">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            {event.scheduled_time || 'Tiada Masa'}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                        <span>{event.type === 'individual' ? 'Individu' : 'Relay'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-8">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-black text-slate-700 italic">
                                                        {event.event_category_name || event.category_label || 'Kategori Am'}
                                                    </span>
                                                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                                                        {event.gender === 'male' ? 'Lelaki' : 
                                                         event.gender === 'female' ? 'Perempuan' : 'Campuran'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-8">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${event.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                                                        event.is_active ? 'text-emerald-600' : 'text-slate-400'
                                                    }`}>
                                                        {event.is_active ? 'Aktif' : 'Tak Aktif'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="pl-6 pr-10 py-8 text-right">
                                                <Link
                                                    href={route('admin-sekolah.events.show', [meet.id, event.id])}
                                                    className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-slate-100 text-slate-900 text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-95 group/btn shadow-sm"
                                                >
                                                    Detail
                                                    <svg className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile List View */}
                        <div className="md:hidden divide-y divide-slate-100">
                            {events.map((event, index) => (
                                <Link
                                    key={event.id}
                                    href={route('admin-sekolah.events.show', [meet.id, event.id])}
                                    className="block p-6 active:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-xs font-black italic text-slate-400">
                                                {index + 1}
                                            </span>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                                event.is_active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                                {event.is_active ? 'Aktif' : 'Tak Aktif'}
                                            </span>
                                        </div>
                                        <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 uppercase italic mb-2 leading-tight">
                                        {event.name}
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Kategori</p>
                                            <p className="text-xs font-bold text-slate-600 italic">
                                                {event.event_category_name || event.category_label || 'Am'} • {event.gender === 'male' ? 'L' : event.gender === 'female' ? 'P' : 'C'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Masa</p>
                                            <p className="text-xs font-bold text-slate-600 italic">{event.scheduled_time || 'SBD'}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminSekolahLayout>
    );
}
