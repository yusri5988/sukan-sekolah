import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function EventsShow({ meet, event }) {
    return (
        <AdminSekolahLayout>
            <Head title={`${event.name} - Perincian`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-0 -mt-2 pb-10 md:py-10 space-y-6 mb-20">
                {/* Breadcrumb & Navigation */}
                <div className="flex items-center justify-between">
                    <Link 
                        href={route('admin-sekolah.events.index')}
                        className="group transition-all active:scale-95"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white border-2 border-slate-900 flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] transition-all">
                            <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route('admin-sekolah.events.edit', event.id)}
                            className="px-6 py-2 bg-white border-2 border-slate-100 text-slate-400 font-black uppercase tracking-widest text-[10px] rounded-xl hover:border-slate-900 hover:text-slate-900 transition-all shadow-sm"
                        >
                            Edit Acara
                        </Link>
                        <button
                            type="button"
                            className={`px-6 py-2 font-black uppercase tracking-widest text-[10px] rounded-xl transition-all shadow-sm ${
                                event.is_active 
                                    ? 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white' 
                                    : 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white'
                            }`}
                        >
                            {event.is_active ? 'Nyahaktif' : 'Aktifkan'}
                        </button>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-slate-200 mx-1 md:mx-0">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-600/20 to-transparent pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-slate-800 rounded-full blur-3xl opacity-50 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
                        <div className="text-center lg:text-left flex-1 w-full">
                            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                                <span className={`px-4 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transform -rotate-2 ${
                                    event.is_active ? 'bg-orange-500 text-white' : 'bg-slate-700 text-slate-400'
                                }`}>
                                    {event.is_active ? 'Aktif' : 'Tidak Aktif'}
                                </span>
                                <span className="text-slate-500 font-bold italic text-[10px] md:text-xs uppercase tracking-widest">{meet.name}</span>
                            </div>
                            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black italic uppercase tracking-tighter text-white leading-[0.8] mb-8 break-words">
                                {event.name}
                            </h1>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4">
                                <div className="px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 group hover:bg-white transition-all duration-300">
                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-500 mb-1">Kategori</div>
                                    <div className="text-lg md:text-2xl font-black italic uppercase text-white group-hover:text-slate-900 leading-none">{event.category.replace('_', ' ')}</div>
                                </div>
                                <div className="px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 group hover:bg-white transition-all duration-300">
                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-500 mb-1">Jantina</div>
                                    <div className="text-lg md:text-2xl font-black italic uppercase text-white group-hover:text-slate-900 leading-none">
                                        {event.gender === 'male' ? 'Lelaki' : event.gender === 'female' ? 'Perempuan' : 'Campuran'}
                                    </div>
                                </div>
                                <div className="px-4 md:px-6 py-3 md:py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 group hover:bg-white transition-all duration-300 col-span-2 md:col-span-1">
                                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-500 mb-1">Maksima</div>
                                    <div className="text-lg md:text-2xl font-black italic uppercase text-white group-hover:text-slate-900 leading-none">{event.max_participants} <span className="text-[10px] italic opacity-50">Atlet</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-3 md:gap-4 w-full lg:w-72">
                            <Link
                                href={route('admin-sekolah.events.participants.index', event.id)}
                                className="w-full px-8 py-5 md:py-6 bg-orange-600 text-white font-black italic uppercase tracking-[0.2em] rounded-2xl md:rounded-[2rem] hover:bg-orange-500 hover:-translate-y-1 transition-all shadow-xl shadow-orange-900/20 text-center text-xs flex items-center justify-center gap-3"
                            >
                                Urus Peserta
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </Link>
                            <Link
                                href={route('admin-sekolah.results.index', event.id)}
                                className="w-full px-8 py-5 md:py-6 bg-white text-slate-900 font-black italic uppercase tracking-[0.2em] rounded-2xl md:rounded-[2rem] hover:bg-slate-50 hover:-translate-y-1 transition-all shadow-lg text-center text-xs flex items-center justify-center gap-3"
                            >
                                Keputusan
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Secondary Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Schedule & Metadata */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-100 border border-slate-50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 pointer-events-none" />
                            
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 mb-8 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                Jadual
                            </h3>

                            <div className="space-y-8">
                                <div className="group">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-orange-600 transition-colors">Tarikh Acara</div>
                                    <div className="text-2xl font-black italic uppercase text-slate-900">{event.scheduled_date || 'N/A'}</div>
                                </div>
                                <div className="group">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-orange-600 transition-colors">Masa Mula</div>
                                    <div className="text-2xl font-black italic uppercase text-slate-900">{event.scheduled_time || 'N/A'}</div>
                                </div>
                                <div className="pt-4 border-t border-slate-50 group">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Jenis Acara</div>
                                    <div className="text-sm font-black italic uppercase text-slate-600">{event.type === 'individual' ? 'Individu' : 'Pasukan (Relay)'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Status Sections */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Peserta Section */}
                        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-100 border border-slate-50 group">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-100">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    Peserta Berkumpul
                                </h3>
                                <div className="w-12 h-1 bg-slate-100 group-hover:bg-orange-500 transition-all duration-500" />
                            </div>
                            
                            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem] group-hover:border-orange-100 transition-all">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-orange-50 transition-all">
                                    <svg className="w-8 h-8 text-slate-300 group-hover:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <p className="text-slate-400 font-bold italic text-sm">
                                    Pengurusan peserta akan dibuka sepenuhnya dalam <span className="text-slate-900 font-black italic uppercase">Fasa Pendaftaran</span>.
                                </p>
                            </div>
                        </div>

                        {/* Keputusan Section */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 group">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-900">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    Keputusan Rasmi
                                </h3>
                                <div className="text-[10px] font-black italic uppercase text-slate-500 tracking-widest">Belum Tersedia</div>
                            </div>
                            
                            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem] group-hover:border-white/10 transition-all">
                                <p className="text-slate-500 font-bold italic text-sm">
                                    Ranking dan markah rumah akan direkodkan dalam <span className="text-white font-black italic uppercase">Fasa Keputusan</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
