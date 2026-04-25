import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function EventsShow({ meet, event }) {
    const maxParticipantsPerHouse = event.settings?.max_participants_per_house ?? event.max_participants ?? 1;

    return (
        <AdminSekolahLayout>
            <Head title={`${event.name} - Perincian`} />

            <div className="space-y-8 md:space-y-12 pb-24">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Link 
                            href={route('admin-sekolah.events.index')}
                            className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm hover:bg-slate-50 transition-all active:scale-90"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div>
                            <div className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                                <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Event Intelligence</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none mt-1">
                                Butiran Acara
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href={route('admin-sekolah.events.edit', event.id)}
                            className="px-6 py-3.5 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest italic rounded-2xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            Kemas Kini
                        </Link>
                        <button
                            type="button"
                            className={`px-6 py-3.5 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-sm border italic ${
                                event.is_active 
                                    ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white' 
                                    : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white'
                            }`}
                        >
                            {event.is_active ? 'Nyahaktif' : 'Aktifkan'}
                        </button>
                    </div>
                </div>

                {/* Main Event Card - Hero Style */}
                <div className="bg-slate-900 rounded-[3rem] p-8 md:p-14 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-600/10 to-transparent pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="flex-1 w-full text-center lg:text-left">
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                                <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic shadow-lg ${
                                    event.is_active ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-500'
                                }`}>
                                    {event.is_active ? 'Live Status: Aktif' : 'Status: Tidak Aktif'}
                                </span>
                                <span className="text-slate-500 font-bold italic text-xs uppercase tracking-widest">{meet.name}</span>
                            </div>
                            
                            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter text-white leading-[0.85] mb-12">
                                {event.name}
                            </h1>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Kategori</div>
                                    <div className="text-xl font-black italic uppercase text-white group-hover:text-slate-900 transition-colors">{event.category.replace('tahun_', 'Tahun ')}</div>
                                </div>
                                <div className="p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Jantina</div>
                                    <div className="text-xl font-black italic uppercase text-white group-hover:text-slate-900 transition-colors">
                                        {event.gender === 'male' ? 'Lelaki' : event.gender === 'female' ? 'Perempuan' : 'Campuran'}
                                    </div>
                                </div>
                                <div className="p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Had Peserta</div>
                                    <div className="text-xl font-black italic uppercase text-white group-hover:text-slate-900 transition-colors">{maxParticipantsPerHouse} <span className="text-xs opacity-40">/ Rumah</span></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-4 w-full lg:w-80">
                            {usePage().props.auth.user.role === 'admin_sekolah' && (
                                <>
                                    <Link
                                        href={route('admin-sekolah.events.participants.index', event.id)}
                                        className="w-full p-6 bg-orange-600 text-white font-black italic uppercase tracking-widest rounded-3xl border-b-[6px] border-orange-800 shadow-xl active:translate-y-1 active:border-b-[1px] active:shadow-none transition-all text-center flex items-center justify-center gap-3"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        Urus Peserta
                                    </Link>
                                    <Link
                                        href={route('admin-sekolah.results.index', event.id)}
                                        className="w-full p-6 bg-white text-slate-900 font-black italic uppercase tracking-widest rounded-3xl border-b-[6px] border-slate-200 shadow-xl active:translate-y-1 active:border-b-[1px] active:shadow-none transition-all text-center flex items-center justify-center gap-3"
                                    >
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Keputusan
                                    </Link>
                                </>
                            )}
                            {usePage().props.auth.user.role === 'pengurus_acara' && (
                                <div className="p-8 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 text-center">
                                    <p className="text-white/40 font-bold italic text-xs uppercase tracking-widest leading-relaxed">
                                        Anda mempunyai akses untuk <span className="text-orange-500">tambah acara</span> dan <span className="text-orange-500">kemas kini jadual</span> sahaja.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Secondary Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Schedule Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden group">
                            <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 mb-8 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                Masa & Jadual
                            </h3>

                            <div className="space-y-8">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/50">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 italic">Tarikh Acara</div>
                                    <div className="text-2xl font-black italic uppercase text-slate-900 tabular-nums leading-none">{event.scheduled_date || 'TBD'}</div>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/50">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 italic">Masa Bermula</div>
                                    <div className="text-2xl font-black italic uppercase text-slate-900 tabular-nums leading-none">{event.scheduled_time || 'TBD'}</div>
                                </div>
                                <div className="pt-6 border-t border-slate-50">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Format Kejohanan</div>
                                    <span className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-slate-900/10">
                                        {event.type === 'individual' ? 'Individu' : 'Pasukan / Relay'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Status Sections */}
                        <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-sm group">
                            <div className="flex items-center justify-between mb-10">
                                <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-slate-900 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-inner border border-orange-100">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    Analitik Peserta
                                </h3>
                                <div className="px-4 py-1.5 bg-slate-50 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 italic">Pendaftaran</div>
                            </div>
                            
                            <div className="py-24 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem] bg-slate-50/50">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <p className="text-slate-400 font-bold italic text-sm md:text-base max-w-sm mx-auto">
                                    Data peserta secara terperinci akan dipaparkan sebaik sahaja <span className="text-slate-900 font-black">Admin Sekolah</span> membuka tempoh pendaftaran atlet.
                                </p>
                            </div>
                        </div>

                        {/* Results Insight */}
                        <div className="bg-slate-900 border border-slate-800 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none select-none">
                                <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.47 1.21 1.48 2.15 2.74 2.53L10 18h-2v2h8v-2h-2l-.13-2.53c1.26-.38 2.27-1.32 2.74-2.53C19.08 11.63 21 9.55 21 8V7c0-1.1-.9-2-2-2z"/>
                                </svg>
                            </div>
                            
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                                <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center shadow-lg shadow-white/5">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    Keputusan Rasmi
                                </h3>
                                <div className="text-[10px] font-black italic uppercase text-slate-600 tracking-widest">Status: Menunggu Saringan</div>
                            </div>
                            
                            <div className="py-24 text-center border border-dashed border-white/10 rounded-[2.5rem] bg-white/5">
                                <p className="text-slate-500 font-bold italic text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                                    Pemarkahan dan pengesahan pemenang bagi acara <span className="text-white font-black">{event.name}</span> akan dilakukan oleh Pengurus Acara yang dilantik.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
