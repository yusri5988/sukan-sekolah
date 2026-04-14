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
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Pengurusan Atlet</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Senarai <span className="text-orange-600">Pelajar</span>
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={route('admin-sekolah.students.import')}
                            className="px-6 py-3 bg-white border-4 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-lg shadow-slate-100"
                        >
                            Import CSV
                        </Link>
                        <Link
                            href={route('admin-sekolah.students.create')}
                            className="px-6 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
                        >
                            + Tambah Pelajar
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Senarai Pelajar" />

            <div className="space-y-8">
                {flash?.success && (
                    <div className="p-6 bg-emerald-50 border-l-8 border-emerald-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Berjaya</div>
                        <div className="text-sm font-bold text-emerald-900 italic">{flash.success}</div>
                    </div>
                )}

                {flash?.error && (
                    <div className="p-6 bg-red-50 border-l-8 border-red-500 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-1">Ralat</div>
                        <div className="text-sm font-bold text-red-900 italic">{flash.error}</div>
                    </div>
                )}

                {flash?.import_errors && flash.import_errors.length > 0 && (
                    <div className="p-6 bg-red-50 border-4 border-red-200 rounded-2xl shadow-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-3">Ralat Import ({flash.import_errors.length} baris)</div>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {flash.import_errors.map((err, i) => (
                                <div key={i} className="text-xs font-mono bg-white border border-red-100 rounded px-3 py-2 text-red-800">
                                    <span className="font-black">Baris {err.row || i + 1}:</span> {err.message}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 p-2 bg-slate-100 rounded-2xl">
                    <Link
                        href={route('admin-sekolah.students.index')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            !selectedHouseId
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'bg-transparent text-slate-500 hover:text-slate-900'
                        }`}
                    >
                        Semua ({students.length})
                    </Link>
                    {houses.map((house) => (
                        <Link
                            key={house.id}
                            href={route('admin-sekolah.students.index', { house_id: house.id })}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                selectedHouseId == house.id
                                    ? 'bg-orange-600 text-white shadow-lg'
                                    : 'bg-transparent text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            {house.name} ({house.students_count})
                        </Link>
                    ))}
                </div>

                <div className="bg-white border-4 border-slate-900 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
                    {students.length === 0 ? (
                        <div className="p-20 text-center">
                            <div className="text-slate-200 mb-6">
                                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <p className="text-2xl font-black italic uppercase tracking-tighter text-slate-400 mb-8">Tiada Rekod Pelajar Dijumpai</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    href={route('admin-sekolah.students.create')}
                                    className="px-8 py-4 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all shadow-xl shadow-slate-200"
                                >
                                    Tambah Manual
                                </Link>
                                <Link
                                    href={route('admin-sekolah.students.import')}
                                    className="px-8 py-4 bg-white border-4 border-slate-900 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all"
                                >
                                    Import CSV
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-900 text-white">
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest italic">Bil</th>
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest italic">Info Atlet</th>
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest italic">Pengenalan</th>
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest italic">Kategori</th>
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest italic">Pasukan</th>
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest italic text-right">Tindakan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-4 divide-slate-900">
                                    {students.map((student, index) => (
                                        <tr key={student.id} className="hover:bg-orange-50 transition-colors group">
                                            <td className="px-6 py-5 text-sm font-black italic text-slate-400 group-hover:text-slate-900 tabular-nums">
                                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="text-lg font-black italic uppercase tracking-tighter text-slate-900 group-hover:text-orange-600 transition-colors">
                                                    {student.name}
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    Kelas: {student.class}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-bold text-slate-600 tabular-nums">
                                                {student.ic_number}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 bg-slate-100 px-2 py-1 rounded w-fit">
                                                        {student.gender === 'L' ? 'Lelaki' : 'Perempuan'}
                                                    </span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 italic">
                                                        {student.year} Tahun
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                {student.house ? (
                                                    <div className="flex items-center gap-3">
                                                        <div 
                                                            className="w-4 h-4 rounded-full border-2 border-slate-900 shadow-sm"
                                                            style={{ backgroundColor: student.house.color || '#6b7280' }}
                                                        />
                                                        <span className="text-sm font-black italic uppercase tracking-tighter text-slate-900">
                                                            {student.house.name}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100">
                                                        Belum Assign
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <Link
                                                    href={route('admin-sekolah.students.show', student.id)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest italic rounded-lg hover:bg-orange-600 transition-all active:scale-95"
                                                >
                                                    Detail
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                                                </Link>
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
