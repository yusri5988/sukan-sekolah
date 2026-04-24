import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function StudentsShow({ student }) {
    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Link 
                            href={route('admin-sekolah.students.index')}
                            className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm hover:bg-slate-50 transition-all active:scale-90"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div>
                            <div className="inline-flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                                <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Athlete Identification</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                                Profil Atlet
                            </h2>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={student.name} />

            <div className="space-y-8 md:space-y-12 pb-24">
                <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-600/5 to-transparent pointer-events-none" />
                    
                    <div className="absolute top-8 right-8">
                        {student.house ? (
                            <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-900/10 border-b-[5px] border-slate-950">
                                <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ backgroundColor: student.house.color || '#ea580c' }} />
                                <span className="text-xs font-black uppercase tracking-widest italic">{student.house.name}</span>
                            </div>
                        ) : (
                            <div className="px-6 py-3 rounded-2xl bg-red-50 text-red-600 border border-red-100 italic font-black uppercase text-[10px] tracking-widest">
                                Belum Haluan Rumah
                            </div>
                        )}
                    </div>

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 text-center md:text-left">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-orange-50 text-orange-600 flex items-center justify-center font-black italic text-4xl md:text-5xl shadow-inner border border-orange-100 group-hover:scale-105 transition-transform duration-500">
                                {student.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85] mb-4">
                                    {student.name}
                                </h1>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                    <span className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg italic shadow-lg">
                                        {student.gender === 'male' ? 'Lelaki' : 'Perempuan'}
                                    </span>
                                    <span className="px-4 py-1.5 bg-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-widest rounded-lg italic border border-orange-200">
                                        Tahun {student.year}
                                    </span>
                                    <span className="px-4 py-1.5 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg italic border border-slate-100">
                                        Kelas {student.class}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 bg-slate-50/50 border border-slate-100 rounded-3xl group/card hover:bg-white hover:shadow-xl transition-all">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 italic">Nombor Kad Pengenalan</div>
                                <div className="text-2xl md:text-3xl font-black text-slate-900 tabular-nums italic tracking-tight">{student.ic_number}</div>
                            </div>
                            <div className="p-8 bg-slate-50/50 border border-slate-100 rounded-3xl group/card hover:bg-white hover:shadow-xl transition-all">
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 italic">Unit Beruniform / Kelas</div>
                                <div className="text-2xl md:text-3xl font-black text-slate-900 italic tracking-tight">{student.class}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center md:justify-start">
                    <Link
                        href={route('admin-sekolah.students.index')}
                        className="px-10 py-5 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] italic rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm flex items-center gap-4"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Senarai Atlet
                    </Link>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
