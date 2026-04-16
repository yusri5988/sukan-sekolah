import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

function AssignmentRow({ teacher, houses, onSuccess }) {
    const [houseId, setHouseId] = useState(teacher.house ? teacher.house.id : null);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const response = await fetch(route('admin-sekolah.teachers.assignment.update', teacher.id), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({ house_id: houseId }),
            });

            if (response.ok) {
                onSuccess?.('Lantikan berjaya!');
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
        <div className="p-5 md:p-6 bg-white hover:bg-slate-50 transition-colors group flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            
            <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black italic text-2xl shadow-md shrink-0">
                    {teacher.name.charAt(0)}
                </div>
                <div>
                    <div className="text-lg md:text-xl font-black italic text-slate-900 uppercase tracking-tighter leading-tight drop-shadow-sm">
                        {teacher.name}
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">{teacher.email}</div>
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1 justify-between md:justify-end w-full border-t-2 border-slate-100 md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                <div className="flex-1 md:w-48 shrink-0 flex flex-col justify-center">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block md:hidden mb-2 italic">Rumah Semasa</span>
                     <div>
                     {teacher.house ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black uppercase border-2 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]" style={{ borderColor: '#0f172a', backgroundColor: teacher.house.color ?? '#f1f5f9', color: '#0f172a' }}>
                            {teacher.house.name}
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black uppercase border-2 border-slate-200 text-slate-400 bg-slate-50 border-dashed">
                            Belum Dilantik
                        </span>
                    )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 mt-2 md:mt-0">
                    <select
                        className="w-full sm:w-[180px] px-4 py-3.5 bg-white border-2 border-slate-900 rounded-xl text-xs font-black uppercase tracking-widest italic text-slate-900 focus:border-orange-600 focus:ring-orange-600 focus:ring-2 transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5"
                        value={houseId ?? ''}
                        onChange={e => setHouseId(e.target.value ? Number(e.target.value) : null)}
                    >
                        <option value="" className="font-black uppercase text-slate-500">-- Pilih --</option>
                        {houses.map(h => (
                            <option key={h.id} value={h.id} className="font-black uppercase">{h.name}</option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:shadow-none active:translate-y-[4px] disabled:active:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] disabled:active:translate-y-0"
                    >
                        {saving ? 'Sabar...' : 'Simpan'}
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[9px] font-black uppercase tracking-[0.3em]">SDM</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Lantikan <span className="text-orange-600">Guru</span>
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title="Lantikan Guru" />

            {message && !isError && (
                <div className="mt-6 p-4 bg-emerald-50 border-l-[8px] border-emerald-500 rounded-xl shadow-sm animate-in fade-in slide-in-from-top-4">
                    <div className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Berjaya</div>
                    <div className="text-xs font-bold text-emerald-900 italic">{message}</div>
                </div>
            )}

            {message && isError && (
                <div className="mt-6 p-4 bg-red-50 border-l-[8px] border-red-500 rounded-xl shadow-sm animate-in fade-in slide-in-from-top-4">
                    <div className="text-[9px] font-black uppercase tracking-widest text-red-600 mb-0.5">Ralat</div>
                    <div className="text-xs font-bold text-red-900 italic">{message}</div>
                </div>
            )}

            <div className="bg-white border-2 lg:border-4 border-slate-900 rounded-[1.5rem] lg:rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-hidden mt-6">
                <div className="hidden md:flex items-center justify-between p-3 bg-slate-900 text-white font-black italic uppercase tracking-widest text-[9px]">
                    <div className="flex-1 pl-16">Maklumat Guru</div>
                    <div className="w-40">Status</div>
                    <div className="w-[210px] text-right pr-4">Tindakan</div>
                </div>
                
                <div className="divide-y-2 divide-slate-100">
                    {teachers.length === 0 ? (
                        <div className="p-10 text-center">
                            <div className="text-slate-200 mb-2 text-3xl font-black italic uppercase">Kosong</div>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Tiada guru didaftarkan</p>
                        </div>
                    ) : (
                        teachers.map(t => (
                            <AssignmentRow key={t.id} teacher={t} houses={houses} onSuccess={handleSuccess} />
                        ))
                    )}
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
