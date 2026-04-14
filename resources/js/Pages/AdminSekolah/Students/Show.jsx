import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function StudentsShow({ student }) {
    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Profil Atlet</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            {student.name}
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.students.index')}
                        className="px-6 py-3 bg-white border-4 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title={student.name} />

            <div className="space-y-8">
                <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
                    <div className="absolute top-6 right-6">
                        {student.house ? (
                            <div className="flex items-center gap-3 px-4 py-2 rounded-xl border-4 border-slate-900" style={{ backgroundColor: student.house.color || '#6b7280' }}>
                                <div className="w-3 h-3 rounded-full bg-white/30" />
                                <span className="text-white text-xs font-black uppercase tracking-widest">{student.house.name}</span>
                            </div>
                        ) : (
                            <div className="px-4 py-2 rounded-xl border-4 border-red-200 bg-red-50">
                                <span className="text-red-500 text-xs font-black uppercase tracking-widest">Belum Assign Rumah</span>
                            </div>
                        )}
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-20 h-20 rounded-2xl bg-orange-600 flex items-center justify-center">
                                <span className="text-4xl font-black text-white">{student.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-full">
                                        {student.gender === 'L' ? 'Lelaki' : 'Perempuan'}
                                    </span>
                                    <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-widest rounded-full">
                                        Tahun {student.year}
                                    </span>
                                </div>
                                <p className="text-slate-500 font-bold italic">{student.class}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="p-6 bg-slate-50 rounded-2xl border-4 border-slate-900">
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">No. Kad Pengenalan</div>
                                    <div className="text-2xl font-black text-slate-900 tabular-nums">{student.ic_number}</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-6 bg-slate-50 rounded-2xl border-4 border-slate-900">
                                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Kelas</div>
                                    <div className="text-2xl font-black text-slate-900">{student.class}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <Link
                        href={route('admin-sekolah.students.index')}
                        className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all inline-flex items-center gap-3"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Senarai
                    </Link>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
