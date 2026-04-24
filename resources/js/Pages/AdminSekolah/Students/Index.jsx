import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function StudentsIndex({ students, houses, selectedHouseId, sekolah }) {
    const { flash } = usePage().props;

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Official Roster</span>
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Senarai <span className="text-orange-600">Pelajar</span>
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={route('admin-sekolah.students.import')}
                            className="px-6 py-3.5 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest italic rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                        >
                            Import CSV
                        </Link>
                        <Link
                            href={route('admin-sekolah.students.create')}
                            className="px-6 py-3.5 bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] italic rounded-2xl border-b-[5px] border-slate-950 shadow-lg active:translate-y-1 active:border-b-[1px] active:shadow-none transition-all text-center flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                            Daftar Pelajar
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Senarai Pelajar" />

            <div className="space-y-8 md:space-y-12 pb-20">
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

                {/* Filter Tabs - Modern Pill Style */}
                <div className="flex flex-wrap gap-2 p-2 bg-slate-100/50 rounded-[2rem] border border-slate-100 w-fit">
                    <Link
                        href={route('admin-sekolah.students.index')}
                        className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                            !selectedHouseId
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'bg-transparent text-slate-400 hover:text-slate-900'
                        }`}
                    >
                        Semua
                    </Link>
                    {houses.map((house) => (
                        <Link
                            key={house.id}
                            href={route('admin-sekolah.students.index', { house_id: house.id })}
                            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                selectedHouseId == house.id
                                    ? 'bg-orange-600 text-white shadow-lg'
                                    : 'bg-transparent text-slate-400 hover:text-slate-900'
                            }`}
                        >
                            {house.name}
                            <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-black ${selectedHouseId == house.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                {house.students_count}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                    {students.length === 0 ? (
                        <div className="py-20 md:py-32 text-center flex flex-col items-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-100">
                                <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <p className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-slate-400 leading-tight">Tiada Rekod Pelajar Dijumpai</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Bil</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Maklumat Pelajar</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 italic text-right">Rumah Sukan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {students.map((student, index) => (
                                        <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6 text-sm font-black italic text-slate-300 group-hover:text-slate-900 tabular-nums">
                                                {(index + 1).toString().padStart(2, '0')}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-base font-black italic uppercase tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                                                        {student.name}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                                        Kelas: {student.class}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                {student.house ? (
                                                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 italic">{student.house.name}</span>
                                                        <div className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: student.house.color }} />
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-red-400 italic">TIADA RUMAH</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
