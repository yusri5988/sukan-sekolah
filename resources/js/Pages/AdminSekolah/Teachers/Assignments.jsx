import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

const ROLE_LABELS = {
    cikgu: 'Cikgu',
    cikgu_sukan: 'Cikgu Rumah Sukan',
    pengurus_acara: 'Pengurus Acara',
    pengurusan_keputusan: 'Pengurusan Keputusan',
};

function AssignmentRow({ teacher, houses, onSuccess }) {
    const [role, setRole] = useState(teacher.role === 'cikgu' ? '' : teacher.role);
    const [houseId, setHouseId] = useState(teacher.house ? teacher.house.id : null);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!role) {
            onSuccess?.('Sila pilih peranan terlebih dahulu.', true);
            return;
        }
        setSaving(true);
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const response = await fetch(route('admin-sekolah.teachers.appoint', teacher.id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    role: role,
                    house_id: role === 'cikgu_sukan' ? houseId : null,
                }),
            });

            if (response.ok) {
                onSuccess?.('Pelantikan berjaya!');
            } else {
                onSuccess?.('Ralat penyimpanan.', true);
            }
        } catch (error) {
            onSuccess?.('Ralat sistem.', true);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6 md:p-8 bg-white hover:bg-slate-50 transition-all group flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-black italic text-2xl shadow-inner border border-orange-100 shrink-0 group-hover:scale-105 transition-transform">
                    {teacher.name.charAt(0)}
                </div>
                <div className="min-w-0">
                    <div className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-slate-900 leading-none group-hover:text-orange-600 transition-colors truncate">
                        {teacher.name}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{teacher.email}</div>
                    <div className="mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest italic bg-slate-100 text-slate-600 border border-slate-200">
                            {ROLE_LABELS[teacher.role] || teacher.role}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 flex-1 justify-between lg:justify-end w-full border-t border-slate-100 lg:border-t-0 pt-6 lg:pt-0">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
                    <select
                        className="w-full sm:w-[200px] px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest italic text-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer shadow-sm"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    >
                        <option value="" className="text-slate-400 font-black italic">-- PILIH PERANAN --</option>
                        <option value="cikgu_sukan" className="font-black uppercase">Cikgu Rumah Sukan</option>
                        <option value="pengurus_acara" className="font-black uppercase">Pengurus Acara</option>
                        <option value="pengurusan_keputusan" className="font-black uppercase">Pengurusan Keputusan</option>
                    </select>
                    
                    {role === 'cikgu_sukan' && (
                        <select
                            className="w-full sm:w-[200px] px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest italic text-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer shadow-sm"
                            value={houseId ?? ''}
                            onChange={e => setHouseId(e.target.value ? Number(e.target.value) : null)}
                        >
                            <option value="" className="font-black uppercase text-slate-400 italic">-- Pilih Rumah --</option>
                            {houses.map(h => (
                                <option key={h.id} value={h.id} className="font-black uppercase">{h.name}</option>
                            ))}
                        </select>
                    )}
                    
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest italic rounded-2xl border-b-[5px] border-orange-800 shadow-lg active:translate-y-1 active:border-b-[1px] active:shadow-none transition-all disabled:opacity-50"
                    >
                        {saving ? 'Proses...' : 'Lantik'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function TeacherAssignments({ teachers, houses }) {
    const { flash } = usePage().props;
    const [message, setMessage] = useState(flash?.success || null);
    const [isError, setIsError] = useState(false);

    const handleSuccess = (msg, error = false) => {
        setMessage(msg);
        setIsError(error);
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center justify-center gap-2 mb-2 w-full">
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                        <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Staff Assignments</span>
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        Lantikan <span className="text-orange-600">Guru</span>
                    </h2>
                </div>
            }
        >
            <Head title="Lantikan Guru" />

            <div className="space-y-8 md:space-y-12 pb-24">
                {message && (
                    <div className={`flex items-center gap-4 p-6 border rounded-3xl shadow-sm animate-in fade-in slide-in-from-top-4 duration-500 ${
                        !isError ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'
                    }`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${
                            !isError ? 'bg-emerald-500' : 'bg-red-500'
                        }`}>
                            {!isError ? (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                            ) : (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                            )}
                        </div>
                        <div>
                            <div className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${!isError ? 'text-emerald-600' : 'text-red-600'}`}>Berjaya</div>
                            <p className={`text-sm font-bold italic ${!isError ? 'text-emerald-900' : 'text-red-900'}`}>{message}</p>
                        </div>
                    </div>
                )}

                <div className="bg-white border border-slate-100 rounded-[2.5rem] md:rounded-[3rem] shadow-sm overflow-hidden">
                    <div className="hidden md:flex items-center justify-between p-6 bg-slate-50/50 border-b border-slate-100 font-black italic uppercase tracking-widest text-[10px] text-slate-400">
                        <div className="flex-1 pl-20">Maklumat Guru</div>
                        <div className="flex-1 text-right pr-6">Pilihan Peranan & Lantik</div>
                    </div>
                    
                    <div className="divide-y divide-slate-50">
                        {teachers.length === 0 ? (
                            <div className="py-20 text-center flex flex-col items-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-100">
                                    <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <p className="text-xl font-black italic uppercase tracking-tighter text-slate-400 leading-tight">Tiada Guru Berdaftar</p>
                            </div>
                        ) : (
                            teachers.map(t => (
                                <AssignmentRow key={t.id} teacher={t} houses={houses} onSuccess={handleSuccess} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
