import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function HousesShow({ house, students }) {
    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Team Details</span>
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {house.name}
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.houses.index')}
                        className="px-6 py-3.5 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest italic rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Senarai Rumah
                    </Link>
                </div>
            }
        >
            <Head title={house.name} />

            <div className="space-y-8 md:space-y-12 pb-24">
                <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2">
                    <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 opacity-50 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                        <div className="relative z-10">
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Mata Terkumpul</div>
                            <div className="text-5xl md:text-6xl font-black italic text-slate-900 tabular-nums tracking-tighter">{house.points}</div>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 opacity-50 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                        <div className="relative z-10">
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Jumlah Atlet</div>
                            <div className="text-5xl md:text-6xl font-black italic text-slate-900 tabular-nums tracking-tighter">{house.students_count}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                        <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-slate-900">Guru Penjaga</h3>
                    </div>
                    
                    {house.teachers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {house.teachers.map((teacher) => (
                                <div key={teacher.id} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                                    <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white text-lg font-black italic shadow-lg">
                                        {teacher.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black italic uppercase tracking-tight text-slate-900">{teacher.name}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{teacher.email}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                            <p className="text-sm font-bold italic text-slate-400">Tiada guru dilantik untuk rumah sukan ini.</p>
                        </div>
                    )}
                </div>

                <div className="bg-white border border-slate-100 rounded-[2.5rem] md:rounded-[3rem] shadow-sm overflow-hidden">
                    <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
                            <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-slate-900">Senarai Pelajar</h3>
                        </div>
                        <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            {students.total} Rekod Ditemui
                        </div>
                    </div>

                    {students.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Bil</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Nama Pelajar</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Kelas</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 italic text-right">Jantina</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {students.data.map((student, index) => (
                                        <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6 text-sm font-black italic text-slate-300 group-hover:text-slate-900 tabular-nums">
                                                {((students.current_page - 1) * students.per_page + index + 1).toString().padStart(2, '0')}
                                            </td>
                                            <td className="px-8 py-6 text-base font-black italic uppercase tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                                                {student.name}
                                            </td>
                                            <td className="px-8 py-6 text-sm font-bold text-slate-500 uppercase tracking-widest italic">{student.class}</td>
                                            <td className="px-8 py-6 text-right">
                                                <span className="px-3 py-1.5 bg-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500 italic">
                                                    {student.gender === 'male' ? 'Lelaki' : 'Perempuan'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-sm font-bold italic text-slate-400">Tiada pelajar dalam rumah sukan ini.</p>
                        </div>
                    )}

                    {students.last_page > 1 && (
                        <div className="p-8 md:p-10 bg-slate-50/50 border-t border-slate-50 flex flex-wrap gap-2 justify-center">
                            {students.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || ''}
                                    preserveScroll
                                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all ${
                                        link.active
                                            ? 'bg-slate-900 text-white shadow-lg'
                                            : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900'
                                    } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
