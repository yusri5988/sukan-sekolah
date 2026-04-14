import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';

function AssignmentRow({ teacher, houses }) {
    const { data, setData, patch, processing, errors } = useForm({
        house_id: teacher.house ? teacher.house.id : null,
    });

    const handleSave = () => {
        patch(route('admin-sekolah.teachers.assignment.update', teacher.id), {
            preserveScroll: true,
            onSuccess: () => {},
        });
    };

    return (
        <tr className="hover:bg-slate-50 transition-colors group">
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black italic text-xl group-hover:bg-orange-600 transition-colors">
                        {teacher.name.charAt(0)}
                    </div>
                    <div className="font-black italic text-slate-900 uppercase tracking-tighter">
                        {teacher.name}
                    </div>
                </div>
            </td>
            <td className="px-8 py-6 font-bold text-slate-500 italic">{teacher.email}</td>
            <td className="px-8 py-6">
                {teacher.house ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: teacher.house.color ?? '#e2e8f0' }}>
                        {teacher.house.name}
                    </span>
                ) : (
                    <span className="text-slate-400 italic">Belum Dilantik</span>
                )}
            </td>
            <td className="px-8 py-6">
                <select
                    className="border border-slate-300 rounded px-2 py-1" 
                    value={data.house_id ?? ''}
                    onChange={e => setData('house_id', e.target.value ? Number(e.target.value) : null)}
                >
                    <option value="">Belum Dilantik</option>
                    {houses.map(h => (
                        <option key={h.id} value={h.id}>{h.name}</option>
                    ))}
                </select>
            </td>
            <td className="px-8 py-6 text-right">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={processing}
                    className="px-4 py-2 bg-slate-900 text-white text-sm font-black uppercase tracking-widest rounded-lg hover:bg-orange-600 transition-all"
                >
                    Simpan
                </button>
                {errors.house_id && <div className="text-red-600 text-xs mt-1">{errors.house_id}</div>}
            </td>
        </tr>
    );
}

export default function TeacherAssignments({ teachers, houses }) {
    const { flash } = usePage().props;

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Pengurusan Sumber Manusia</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Lantikan <span className="text-orange-600">Guru ke Rumah Sukan</span>
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Lantikan Guru" />

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

            <div className="bg-white border-4 border-slate-900 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] overflow-hidden mt-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900 text-white font-black italic uppercase tracking-widest text-xs">
                                <th className="px-8 py-6">Nama Guru</th>
                                <th className="px-8 py-6">Emel</th>
                                <th className="px-8 py-6">Rumah Semasa</th>
                                <th className="px-8 py-6">Tukar Rumah</th>
                                <th className="px-8 py-6 text-right">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-4 divide-slate-50">
                            {teachers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="text-slate-300 mb-4 text-6xl font-black italic opacity-20 select-none">KOSONG</div>
                                        <p className="text-slate-400 font-bold italic">Tiada guru yang didaftarkan lagi.</p>
                                    </td>
                                </tr>
                            ) : (
                                teachers.map(t => (
                                    <AssignmentRow key={t.id} teacher={t} houses={houses} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
