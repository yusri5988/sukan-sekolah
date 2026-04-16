import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ConfigureTemplates({ meet, templatesByName }) {
    const { data, setData, post, processing, errors } = useForm({
        template_ids: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.events.store-from-templates'));
    };

    const toggleTemplate = (id) => {
        if (data.template_ids.includes(id)) {
            setData('template_ids', data.template_ids.filter(tid => tid !== id));
        } else {
            setData('template_ids', [...data.template_ids, id]);
        }
    };

    const toggleGroup = (groupTemplates) => {
        const ids = groupTemplates.map(t => t.id);
        const allSelected = ids.every(id => data.template_ids.includes(id));
        
        if (allSelected) {
            setData('template_ids', data.template_ids.filter(id => !ids.includes(id)));
        } else {
            const newIds = [...data.template_ids];
            ids.forEach(id => {
                if (!newIds.includes(id)) newIds.push(id);
            });
            setData('template_ids', newIds);
        }
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1 w-8 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-xs font-extrabold uppercase tracking-[0.2em]">Langkah 2: Konfigurasi Acara</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {meet.name}
                        </h2>
                    </div>
                </div>
            }
        >
            <Head title={`Konfigurasi Acara - ${meet.name}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-0 space-y-12 pb-32 mt-10">
                <form onSubmit={handleSubmit} className="space-y-16">
                    {Object.entries(templatesByName).map(([name, templates]) => (
                        <div key={name} className="bg-white rounded-[3rem] p-10 shadow-xl shadow-slate-100 border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 pointer-events-none" />
                            
                            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10 mb-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                                        <span className="text-2xl font-black italic uppercase">{name.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">{name}</h3>
                                        <p className="text-slate-400 font-bold italic text-sm uppercase tracking-widest mt-1">
                                            {templates.filter(t => data.template_ids.includes(t.id)).length} Sub-acara dipilih
                                        </p>
                                    </div>
                                </div>
                                
                                <button
                                    type="button"
                                    onClick={() => toggleGroup(templates)}
                                    className="px-6 py-3 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl transition-all"
                                >
                                    {templates.every(t => data.template_ids.includes(t.id)) ? 'Nyahpilih Semua' : 'Pilih Semua'}
                                </button>
                            </div>

                            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {templates.map((template) => (
                                    <div
                                        key={template.id}
                                        onClick={() => toggleTemplate(template.id)}
                                        className={`cursor-pointer group/item p-4 rounded-2xl border-2 transition-all ${
                                            data.template_ids.includes(template.id)
                                                ? 'border-orange-600 bg-orange-600 text-white shadow-lg shadow-orange-200'
                                                : 'border-slate-50 bg-slate-50/50 hover:border-slate-200 text-slate-500'
                                        }`}
                                    >
                                        <div className="text-[10px] font-black uppercase tracking-[0.15em] mb-1 opacity-60">
                                            {template.gender === 'male' ? 'Lelaki' : template.gender === 'female' ? 'Perempuan' : 'Campuran'}
                                        </div>
                                        <div className="text-lg font-black italic uppercase tracking-tighter leading-none">
                                            {template.category === 'all' ? 'Semua' : template.category.replace('tahun_', 'T')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Bottom Action Bar */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-6 z-40 md:relative md:bg-transparent md:border-none md:p-0 md:mt-20">
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-8">
                                <Link
                                    href={route('admin-sekolah.events.select-templates')}
                                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-black uppercase tracking-widest text-[10px] transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Kembali ke Induk
                                </Link>
                                <div className="hidden sm:block w-px h-8 bg-slate-200" />
                                <p className="text-slate-900 font-black italic uppercase tracking-tight text-sm">
                                    Jumlah: <span className="text-orange-600 text-lg mx-1">{data.template_ids.length}</span> <span className="text-[10px] text-slate-400">Acara sedia dicipta</span>
                                </p>
                            </div>
                            
                            <button
                                type="submit"
                                disabled={processing || data.template_ids.length === 0}
                                className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.15em] italic rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-200 flex items-center justify-center gap-3 group"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Mencipta...
                                    </>
                                ) : (
                                    <>
                                        Sahkan & Cipta Acara
                                        <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminSekolahLayout>
    );
}
