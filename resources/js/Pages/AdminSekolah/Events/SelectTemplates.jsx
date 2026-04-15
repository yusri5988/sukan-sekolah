import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EventsSelectTemplates({ meet, templates }) {
    const { data, setData, post, processing, errors } = useForm({
        template_ids: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.events.store-from-templates', meet.id));
    };

    const toggleTemplate = (templateId) => {
        if (data.template_ids.includes(templateId)) {
            setData('template_ids', data.template_ids.filter(id => id !== templateId));
        } else {
            setData('template_ids', [...data.template_ids, templateId]);
        }
    };

    const toggleCategory = (categoryTemplates) => {
        const allSelected = categoryTemplates.every(t => data.template_ids.includes(t.id));
        if (allSelected) {
            setData('template_ids', data.template_ids.filter(id => !categoryTemplates.some(t => t.id === id)));
        } else {
            const newIds = [...data.template_ids];
            categoryTemplates.forEach(t => {
                if (!newIds.includes(t.id)) {
                    newIds.push(t.id);
                }
            });
            setData('template_ids', newIds);
        }
    };

    if (!templates || !Array.isArray(templates)) {
        return (
            <AdminSekolahLayout header={<div>Loading...</div>}>
                <Head title="Pilih Acara" />
                <div className="text-center py-20 px-6">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full mb-4" />
                        <div className="h-4 w-48 bg-slate-100 rounded mb-2" />
                        <div className="h-3 w-32 bg-slate-50 rounded" />
                    </div>
                </div>
            </AdminSekolahLayout>
        );
    }

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1 w-8 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-xs font-extrabold uppercase tracking-[0.2em]">Pilih Acara</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {meet.name}
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.events.index', meet.id)}
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
            <Head title={`Pilih Acara - ${meet.name}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-0 space-y-10 pb-32">
                {/* Info Bar */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-900 rounded-[2rem] p-8 shadow-2xl shadow-slate-200 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
                    <div className="relative z-10 flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-900/20">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Senarai Templat</h3>
                            <p className="text-slate-400 font-bold italic text-sm">
                                Pilih acara sedia ada untuk dimasukkan ke dalam kejohanan.
                            </p>
                        </div>
                    </div>
                    <div className="relative z-10 flex items-center gap-4 bg-white/5 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10">
                        <div className="text-right">
                            <div className="text-3xl font-black text-orange-500 leading-none">{data.template_ids.length}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Acara Dipilih</div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {templates.map((category) => (
                        <div key={category.id} className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-4">
                                    <div 
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 cursor-pointer"
                                        style={{ backgroundColor: category.color || '#0F172A' }}
                                        onClick={() => toggleCategory(category.templates)}
                                    >
                                        {category.templates.every(t => data.template_ids.includes(t.id)) ? (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <span className="text-lg font-black italic uppercase tracking-tighter">
                                                {category.name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight">
                                            {category.name}
                                        </h4>
                                        <p className="text-xs font-bold text-slate-400 italic">
                                            {category.templates.filter(t => data.template_ids.includes(t.id)).length} / {category.templates.length} Acara Dipilih
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => toggleCategory(category.templates)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        category.templates.every(t => data.template_ids.includes(t.id))
                                            ? 'bg-slate-900 text-white'
                                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}
                                >
                                    {category.templates.every(t => data.template_ids.includes(t.id)) ? 'Nyahpilih Semua' : 'Pilih Semua'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.templates.map((template) => (
                                    <div 
                                        key={template.id}
                                        className={`relative group cursor-pointer transition-all duration-300 rounded-[2rem] p-6 border-2 ${
                                            data.template_ids.includes(template.id)
                                                ? 'border-orange-600 bg-orange-50/30'
                                                : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100'
                                        }`}
                                        onClick={() => toggleTemplate(template.id)}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div 
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                                    data.template_ids.includes(template.id)
                                                        ? 'bg-orange-600 text-white rotate-6'
                                                        : 'bg-slate-50 text-slate-300 group-hover:bg-slate-100'
                                                }`}
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                                template.type === 'relay' 
                                                    ? 'bg-purple-100 text-purple-700' 
                                                    : 'bg-blue-100 text-blue-700'
                                            }`}>
                                                {template.type === 'relay' ? 'Relay' : 'Individu'}
                                            </span>
                                        </div>
                                        
                                        <h5 className={`text-lg font-black uppercase italic leading-tight mb-3 transition-colors ${
                                            data.template_ids.includes(template.id) ? 'text-orange-900' : 'text-slate-900'
                                        }`}>
                                            {template.name}
                                        </h5>

                                        <div className="flex flex-wrap items-center gap-2 mb-4">
                                            <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                template.gender === 'male' ? 'bg-blue-50 text-blue-600' :
                                                template.gender === 'female' ? 'bg-pink-50 text-pink-600' : 'bg-purple-50 text-purple-600'
                                            }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${
                                                    template.gender === 'male' ? 'bg-blue-400' :
                                                    template.gender === 'female' ? 'bg-pink-400' : 'bg-purple-400'
                                                }`} />
                                                {template.gender === 'male' ? 'Lelaki' :
                                                 template.gender === 'female' ? 'Perempuan' : 'Campuran'}
                                            </span>
                                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                                                Kat: {template.category === 'all' ? 'Semua' : template.category}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {template.has_qualifying_round && (
                                                <span className="text-[8px] font-black text-orange-600 bg-white border border-orange-100 px-2 py-1 rounded-lg uppercase tracking-widest">
                                                    Saringan
                                                </span>
                                            )}
                                            {template.has_multiple_attempts && (
                                                <span className="text-[8px] font-black text-emerald-600 bg-white border border-emerald-100 px-2 py-1 rounded-lg uppercase tracking-widest">
                                                    {template.attempts_count} Percubaan
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                {category.templates.length === 0 && (
                                    <div className="col-span-full py-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                        <p className="text-slate-400 font-bold italic text-sm">Tiada templat tersedia untuk kategori ini.</p>
                                    </div>
                                )}
                                ))}
                            </div>
                        </div>
                    ))}

                    {errors.template_ids && (
                        <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-100 rounded-2xl animate-in shake duration-500">
                            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shadow-lg shadow-red-100 shrink-0">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <p className="text-red-800 font-bold italic">{errors.template_ids}</p>
                        </div>
                    )}

                    {/* Bottom Action Bar */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-6 z-40 md:relative md:bg-transparent md:border-none md:p-0 md:mt-12">
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="hidden sm:block">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Pilihan Semasa</p>
                                <p className="text-slate-900 font-black italic uppercase"><span className="text-orange-600">{data.template_ids.length}</span> Acara Sukan</p>
                            </div>
                            
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <Link
                                    href={route('admin-sekolah.events.index', meet.id)}
                                    className="flex-1 sm:flex-none px-10 py-5 bg-white border-2 border-slate-200 text-slate-900 text-sm font-black uppercase tracking-widest italic rounded-2xl hover:border-slate-900 transition-all flex items-center justify-center"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || data.template_ids.length === 0}
                                    className="flex-[2] sm:flex-none px-12 py-5 bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em] italic rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-slate-900 shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Mencipta...
                                        </>
                                    ) : (
                                        <>
                                            Simpan & Teruskan
                                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminSekolahLayout>
    );
}
