import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function EventsIndex({ meet, events }) {
    const { flash, auth } = usePage().props;

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Official Events</span>
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {meet ? meet.name : 'Kejohanan'}
                        </h2>
                    </div>
                    {meet && (
                        <div className="hidden md:flex items-center gap-4">
                            <Link
                                href={auth.user.role === 'admin_sekolah' ? route('admin-sekolah.meets.show') : route('pengurus-acara.event-selections.index')}
                                className="px-5 py-3 bg-slate-900 text-white rounded-[1.25rem] shadow-xl shadow-slate-900/10 border border-slate-800 flex items-center gap-2 text-xs font-black uppercase tracking-widest italic hover:bg-orange-600 transition-all"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                                Kembali
                            </Link>
                        </div>
                    )}
                </div>
            }
        >
            <Head title={meet ? `Acara - ${meet.name}` : 'Acara'} />

            <div className="space-y-8 md:space-y-12">
                {!meet ? (
                    <div className="bg-white border-4 border-slate-900 rounded-[3rem] py-16 md:py-32 flex flex-col items-center justify-center text-center px-8 shadow-[10px_10px_0px_0px_rgba(15,23,42,1)]">
                        <div className="w-24 h-24 bg-orange-100 rounded-[2.5rem] flex items-center justify-center mb-8 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                             <svg className="h-12 w-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        
                        <div className="space-y-4 mb-10">
                            <h4 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                                Kejohanan <span className="block text-orange-600">Belum Bermula</span>
                            </h4>
                            <p className="text-slate-500 font-bold italic max-w-sm mx-auto text-sm md:text-base">
                                {auth.user.role === 'admin_sekolah' 
                                    ? 'Sila daftar maklumat kejohanan di bahagian Launch sebelum menguruskan acara.'
                                    : 'Admin Sekolah belum mewujudkan kejohanan untuk sekolah ini. Sila hubungi Admin Sekolah anda.'}
                            </p>
                        </div>

                        {auth.user.role === 'admin_sekolah' && (
                            <Link
                                href={route('admin-sekolah.launch')}
                                className="px-10 py-6 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] italic rounded-3xl hover:bg-orange-600 transition-all shadow-xl active:scale-95"
                            >
                                Pergi ke Launch
                            </Link>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Hero Stats Section - Modern Style */}
                        <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none select-none">
                        <svg className="w-48 h-48 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-20 h-20 rounded-[2rem] bg-orange-600 flex items-center justify-center shadow-xl shadow-orange-600/30">
                                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] block mb-1">Status Kejohanan</span>
                                <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic leading-none tracking-tighter tabular-nums">
                                    {events.length} <span className="text-orange-600 text-2xl md:text-4xl">Acara Dicipta</span>
                                </h3>
                            </div>
                        </div>
                        
                        {usePage().props.auth.user.role === 'admin_sekolah' && (
                            <Link
                                href={route('admin-sekolah.events.select-templates')}
                                className="w-full md:w-auto px-10 py-5 bg-orange-600 text-white text-xs font-black uppercase tracking-[0.2em] italic rounded-2xl hover:bg-white hover:text-slate-900 transition-all active:scale-95 shadow-xl shadow-orange-600/20"
                            >
                                + Pilih Acara Baru
                            </Link>
                        )}
                    </div>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-4 p-6 bg-emerald-50 border border-emerald-100 rounded-3xl shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200 shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Berjaya</div>
                            <p className="text-emerald-900 text-sm font-bold italic">{flash.success}</p>
                        </div>
                    </div>
                )}

                {events.length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-[3rem] py-16 md:py-32 flex flex-col items-center justify-center text-center px-8 shadow-sm">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100">
                             <svg className="h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        
                        <div className="space-y-4 mb-10">
                            <h4 className="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                                Tiada Acara <span className="block text-orange-600">Ditemui</span>
                            </h4>
                            <p className="text-slate-400 font-bold italic max-w-xs mx-auto text-sm md:text-base">
                                {usePage().props.auth.user.role === 'admin_sekolah' 
                                    ? 'Mula bina kejohanan anda dengan menambah beberapa acara sukan sekarang.'
                                    : 'Admin Sekolah belum mewujudkan sebarang acara lagi.'}
                            </p>
                        </div>

                        {usePage().props.auth.user.role === 'admin_sekolah' ? (
                            <Link
                                href={route('admin-sekolah.events.select-templates')}
                                className="px-10 py-6 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] italic rounded-3xl hover:bg-orange-600 transition-all shadow-xl active:scale-95"
                            >
                                Tambah Acara Pertama
                            </Link>
                        ) : (
                            <Link
                                href={route('pengurus-acara.event-selections.index')}
                                className="px-10 py-6 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] italic rounded-3xl hover:bg-orange-600 transition-all shadow-xl active:scale-95"
                            >
                                Lihat Acara Induk
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:gap-6">
                        {events.map((event, index) => (
                            <div 
                                key={event.id}
                                className="bg-white border border-slate-100 p-6 md:p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 opacity-50 rounded-full -translate-y-16 translate-x-16 -z-10 group-hover:bg-orange-50 transition-colors" />
                                
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="text-4xl md:text-5xl font-black italic text-slate-100 group-hover:text-orange-100 transition-colors tabular-nums tracking-tighter">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xl md:text-3xl font-black text-slate-900 uppercase italic leading-none group-hover:text-orange-600 transition-colors tracking-tight">
                                                {event.name}
                                            </h4>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                <span className="px-3 py-1 bg-slate-50 text-[10px] font-black uppercase tracking-widest rounded-lg text-slate-400 italic border border-slate-100">
                                                    {event.category.replace('tahun_', 'Tahun ')}
                                                </span>
                                                <span className="px-3 py-1 bg-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg text-white italic shadow-sm">
                                                    {event.gender === 'male' ? 'Lelaki' : event.gender === 'female' ? 'Perempuan' : 'Campuran'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <Link
                                        href={route('admin-sekolah.events.show', event.id)}
                                        className="w-full md:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest italic rounded-2xl hover:bg-slate-50 transition-all active:scale-95 text-center shadow-sm"
                                    >
                                        Urus Acara →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </>
        )}
    </div>
</AdminSekolahLayout>
    );
}
