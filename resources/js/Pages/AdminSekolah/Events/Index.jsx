import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function EventsIndex({ meet, events }) {
    const { flash } = usePage().props;

    return (
        <AdminSekolahLayout
            header={
                <div className="relative overflow-hidden pt-4 pb-2 px-4 sm:px-0">
                    <div className="absolute top-0 left-0 text-[5rem] font-black text-slate-500/5 uppercase italic tracking-tighter leading-none pointer-events-none">
                        ACARA
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <div className="h-1 w-6 bg-orange-600 rounded-full" />
                                <span className="text-orange-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em]">Pengurusan Acara</span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                                {meet.name}
                            </h2>
                        </div>
                        <Link
                            href={route('admin-sekolah.meets.show')}
                            className="bg-slate-900 text-white p-3 rounded-2xl shadow-xl active:scale-90 transition-transform"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Acara - ${meet.name}`} />

            <div className="space-y-8 pb-20 mt-6 md:mt-10">
                {/* Hero Stats Section */}
                <div className="relative group">
                    <div className="absolute -top-10 -left-10 text-[10rem] font-black text-slate-100/5 select-none pointer-events-none uppercase tracking-tighter italic leading-none z-0">
                        EVENTS
                    </div>
                    
                    <div className="bg-slate-900 border-x-4 border-t-4 border-b-[12px] border-slate-900 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden z-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-[1.5rem] bg-orange-600 flex items-center justify-center shadow-xl shadow-orange-600/30 rotate-[-3deg]">
                                    <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div className="space-y-1 text-center md:text-left">
                                    <span className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">Ringkasan Acara</span>
                                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none tracking-tighter tabular-nums text-center md:text-left">
                                        {events.length} <span className="text-orange-600 text-2xl md:text-4xl block md:inline md:ml-2">Acara Dicipta</span>
                                    </h3>
                                </div>
                            </div>
                            
                            <Link
                                href={route('admin-sekolah.events.select-templates')}
                                className="w-full md:w-auto px-10 py-5 bg-orange-600 text-white text-sm font-black uppercase tracking-widest italic rounded-2xl hover:bg-white hover:text-slate-900 transition-all active:scale-95 shadow-2xl shadow-orange-600/20 text-center"
                            >
                                + Pilih Acara
                            </Link>
                        </div>
                    </div>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-4 p-6 bg-emerald-50 border-l-8 border-emerald-500 rounded-2xl shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200 shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Sistem Berjaya</div>
                            <p className="text-emerald-900 text-sm font-bold italic">{flash.success}</p>
                        </div>
                    </div>
                )}

                {events.length === 0 ? (
                    <div className="relative group overflow-hidden bg-white border-4 border-slate-900 rounded-[3rem] py-16 md:py-32 flex flex-col items-center justify-center text-center px-8 shadow-[12px_12px_0px_0px_rgba(234,88,12,1)]">
                        {/* Decorative Background Icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-50 opacity-[0.03] text-[20rem] font-black select-none pointer-events-none italic">
                            NULL
                        </div>
                        
                        <div className="relative z-10 space-y-8">
                            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto rotate-[8deg] group-hover:rotate-[15deg] transition-transform duration-500 border-2 border-slate-100">
                                 <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            
                            <div className="space-y-4">
                                <h4 className="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                                    Tiada Acara <span className="block text-orange-600">Dijumpai</span>
                                </h4>
                                <p className="text-slate-500 font-bold italic max-w-xs mx-auto text-base md:text-lg leading-snug">
                                    Mula bina kejohanan anda dengan menambah beberapa acara sukan sekarang.
                                </p>
                            </div>

                            <Link
                                href={route('admin-sekolah.events.select-templates')}
                                className="inline-block px-10 py-6 bg-slate-900 text-white text-sm font-black uppercase tracking-[0.3em] italic rounded-2xl hover:bg-orange-600 hover:-translate-y-2 transition-all shadow-2xl active:scale-95"
                            >
                                TAMBAH ACARA PERTAMA
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-6 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Senarai Acara Rasmi</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">{events.length} Unit</span>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {events.map((event, index) => (
                                <div 
                                    key={event.id}
                                    className="bg-white border-4 border-slate-900 p-6 md:p-8 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[10px_10px_0px_0px_rgba(234,88,12,1)] hover:border-orange-600 transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -translate-y-16 translate-x-16 -z-10 group-hover:bg-orange-50 transition-colors" />
                                    
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="text-4xl md:text-5xl font-black italic text-slate-100 group-hover:text-orange-100 transition-colors tabular-nums tracking-tighter">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="text-xl md:text-3xl font-black text-slate-900 uppercase italic leading-none group-hover:text-orange-600 transition-colors tracking-tight">
                                                    {event.name}
                                                </h4>
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    <span className="px-3 py-1 bg-slate-100 text-[9px] font-black uppercase tracking-widest rounded-lg text-slate-500 italic border border-slate-200 group-hover:border-orange-200 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                                                        {event.category.replace('tahun_', 'Tahun ')}
                                                    </span>
                                                    <span className="px-3 py-1 bg-slate-900 text-[9px] font-black uppercase tracking-widest rounded-lg text-white italic shadow-lg shadow-slate-200">
                                                        {event.gender === 'male' ? 'Lelaki' : event.gender === 'female' ? 'Perempuan' : 'Campuran'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <Link
                                            href={route('admin-sekolah.events.show', event.id)}
                                            className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 text-center shadow-xl shadow-slate-200"
                                        >
                                            Urus Acara →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminSekolahLayout>
    );
}
