import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function EventsSelectTemplates({ meet, categories }) {
    const { data, setData, processing, errors } = useForm({
        names: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get(route('admin-sekolah.events.configure-templates'), {
            names: data.names
        });
    };

    const toggleName = (name) => {
        if (data.names.includes(name)) {
            setData('names', data.names.filter(n => n !== name));
        } else {
            setData('names', [...data.names, name]);
        }
    };

    const toggleCategory = (categoryNames) => {
        const allSelected = categoryNames.every(name => data.names.includes(name));
        if (allSelected) {
            setData('names', data.names.filter(name => !categoryNames.includes(name)));
        } else {
            const newNames = [...data.names];
            categoryNames.forEach(name => {
                if (!newNames.includes(name)) {
                    newNames.push(name);
                }
            });
            setData('names', newNames);
        }
    };

    if (!categories || !Array.isArray(categories)) {
        return (
            <AdminSekolahLayout header={<div>Loading...</div>}>
                <Head title="Pilih Acara Induk" />
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
                            <span className="text-orange-600 text-xs font-extrabold uppercase tracking-[0.2em]">Langkah 1: Pilih Acara Induk</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {meet.name}
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
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">Acara Induk</h3>
                            <p className="text-slate-400 font-bold italic text-sm">
                                Pilih jenis acara utama. Selepas ini anda akan memilih jantina dan tahun.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {categories.map((category) => (
                        <div key={category.id} className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-4">
                                    <div 
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 cursor-pointer"
                                        style={{ backgroundColor: category.color || '#0F172A' }}
                                        onClick={() => toggleCategory(category.master_templates.map(t => t.name))}
                                    >
                                        {category.master_templates.every(t => data.names.includes(t.name)) ? (
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
                                            {category.master_templates.filter(t => data.names.includes(t.name)).length} / {category.master_templates.length} Acara Dipilih
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => toggleCategory(category.master_templates.map(t => t.name))}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        category.master_templates.every(t => data.names.includes(t.name))
                                            ? 'bg-slate-900 text-white'
                                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                    }`}
                                >
                                    {category.master_templates.every(t => data.names.includes(t.name)) ? 'Nyahpilih Semua' : 'Pilih Semua'}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {category.master_templates.map((master) => (
                                    <div 
                                        key={master.name}
                                        className={`relative group cursor-pointer transition-all duration-300 rounded-[2rem] p-6 border-2 ${
                                            data.names.includes(master.name)
                                                ? 'border-orange-600 bg-orange-50/30'
                                                : 'border-slate-100 bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100'
                                        }`}
                                        onClick={() => toggleName(master.name)}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div 
                                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                                    data.names.includes(master.name)
                                                        ? 'bg-orange-600 text-white rotate-6'
                                                        : 'bg-slate-50 text-slate-300 group-hover:bg-slate-100'
                                                }`}
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                                master.type === 'relay' 
                                                    ? 'bg-purple-100 text-purple-700' 
                                                    : 'bg-blue-100 text-blue-700'
                                            }`}>
                                                {master.type === 'relay' ? 'Relay' : 'Individu'}
                                            </span>
                                        </div>
                                        
                                        <h5 className={`text-xl font-black uppercase italic leading-tight mb-2 transition-colors ${
                                            data.names.includes(master.name) ? 'text-orange-900' : 'text-slate-900'
                                        }`}>
                                            {master.name}
                                        </h5>

                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            {master.available_categories.length} Kategori • {master.available_genders.length} Jantina
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {errors.names && (
                        <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-100 rounded-2xl">
                            <p className="text-red-800 font-bold italic">{errors.names}</p>
                        </div>
                    )}

                    {/* Bottom Action Bar */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-6 z-40 md:relative md:bg-transparent md:border-none md:p-0 md:mt-12">
                        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <p className="text-slate-900 font-black italic uppercase"><span className="text-orange-600">{data.names.length}</span> Acara Induk dipilih</p>
                            </div>
                            
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <Link
                                    href={route('admin-sekolah.events.index')}
                                    className="px-8 py-4 text-slate-500 font-bold uppercase tracking-widest text-xs"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={data.names.length === 0}
                                    className="px-12 py-5 bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em] italic rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group"
                                >
                                    Seterusnya: Konfigurasi
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminSekolahLayout>
    );
}
