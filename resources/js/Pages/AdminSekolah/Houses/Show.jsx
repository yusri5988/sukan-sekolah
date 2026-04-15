import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link } from '@inertiajs/react';

export default function HousesShow({ house, students }) {
    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Butiran Rumah</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {house.name}
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.houses.index')}
                        className="px-6 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200 text-center"
                    >
                        ← Kembali ke Senarai
                    </Link>
                </div>
            }
        >
            <Head title={house.name} />

            <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="bg-white border-4 border-slate-900 p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Mata</div>
                        <div className="text-5xl font-black italic text-slate-900 tabular-nums">{house.points}</div>
                    </div>
                    <div className="bg-white border-4 border-slate-900 p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pelajar</div>
                        <div className="text-5xl font-black italic text-slate-900 tabular-nums">{house.students_count}</div>
                    </div>
                </div>

                <div className="bg-white border-4 border-slate-900 p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                    <div className="mb-6">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Cikgu-Cikgu Penjaga</h3>
                    </div>
                    {house.teachers.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                            {house.teachers.map((teacher) => (
                                <div key={teacher.id} className="inline-flex items-center gap-3 px-4 py-3 bg-orange-50 border-2 border-orange-200 rounded-2xl">
                                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-black">
                                        {teacher.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-slate-900">{teacher.name}</div>
                                        <div className="text-xs text-slate-500">{teacher.email}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm font-bold italic text-slate-500">Tiada cikgu dilantik untuk rumah sukan ini.</p>
                    )}
                </div>

                <div className="bg-white border-4 border-slate-900 p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Senarai Pelajar</h3>
                        <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                            {students.total} rekod
                        </div>
                    </div>

                    {students.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2 border-slate-900">
                                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Bil</th>
                                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Nama</th>
                                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Kelas</th>
                                        <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Jantina</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.data.map((student, index) => (
                                        <tr key={student.id} className="border-b border-slate-100 last:border-b-0">
                                            <td className="px-4 py-4 text-sm font-black text-slate-500">{(students.current_page - 1) * students.per_page + index + 1}</td>
                                            <td className="px-4 py-4 text-sm font-bold text-slate-900">{student.name}</td>
                                            <td className="px-4 py-4 text-sm font-bold text-slate-500">{student.class}</td>
                                            <td className="px-4 py-4 text-sm font-bold text-slate-500">{student.gender === 'male' ? 'Lelaki' : 'Perempuan'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-sm font-bold italic text-slate-500">Tiada pelajar dalam rumah sukan ini.</p>
                    )}

                    {students.last_page > 1 && (
                        <div className="mt-8 flex flex-wrap gap-2">
                            {students.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || ''}
                                    preserveScroll
                                    className={`px-4 py-2 rounded-xl border-2 text-xs font-black uppercase tracking-widest italic transition-all ${
                                        link.active
                                            ? 'bg-slate-900 border-slate-900 text-white'
                                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900'
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
