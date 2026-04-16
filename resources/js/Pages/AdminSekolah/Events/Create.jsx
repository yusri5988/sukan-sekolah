import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EventsCreate({ meet, templates }) {
    const { data, setData, post, processing, errors } = useForm({
        event_template_id: '',
        name: '',
        category: 'all',
        gender: 'male',
        type: 'individual',
        scheduled_time: '',
    });

    // Flatten templates to show in a simple selection if needed, 
    // but here we focus on a "Pure Custom" or "From Template" toggle
    const handleSubmit = (e) => {
        e.preventDefault();
        // If user didn't pick a template, we might need a different endpoint 
        // but looking at EventController@store, it currently requires event_template_id.
        // For now, let's use the first template as a base if they just want "Custom"
        // or better, let's assume they pick one template then customize it.
        post(route('admin-sekolah.events.store'));
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1 w-8 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-xs font-extrabold uppercase tracking-[0.2em]">Tambah Acara</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Acara Baru
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.events.index')}
                        className="group flex items-center gap-2 px-5 py-2.5 text-slate-500 hover:text-orange-600 font-bold transition-all"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm uppercase tracking-wider">Batal</span>
                    </Link>
                </div>
            }
        >
            <Head title={`Tambah Acara - ${meet.name}`} />

            <div className="max-w-3xl mx-auto px-4 sm:px-0 pb-32">
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                    <div className="bg-slate-900 p-8 sm:p-10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">Maklumat Acara</h3>
                            <p className="text-slate-400 font-bold italic text-sm">Sila pilih templat asas untuk acara custom anda.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Pilih Templat Asas</label>
                            <select
                                value={data.event_template_id}
                                onChange={e => setData('event_template_id', e.target.value)}
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-700 focus:border-orange-600 focus:ring-0 transition-all"
                            >
                                <option value="">-- Pilih Templat --</option>
                                {templates.map(cat => (
                                    <optgroup key={cat.id} label={cat.name}>
                                        {cat.templates.map(t => (
                                            <option key={t.id} value={t.id}>{t.name} ({t.gender === 'male' ? 'L' : t.gender === 'female' ? 'P' : 'C'})</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                            {errors.event_template_id && <p className="mt-2 text-xs font-bold text-red-500 italic ml-1">{errors.event_template_id}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-1">Waktu Mula (Opsional)</label>
                                <input
                                    type="time"
                                    value={data.scheduled_time}
                                    onChange={e => setData('scheduled_time', e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-bold text-slate-700 focus:border-orange-600 focus:ring-0 transition-all"
                                />
                                {errors.scheduled_time && <p className="mt-2 text-xs font-bold text-red-500 italic ml-1">{errors.scheduled_time}</p>}
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-12 py-5 bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em] italic rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        Tambah Acara
                                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
