import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ScoringIndex({ categories }) {
    const form = useForm({
        rules: {},
    });

    const handleSubmit = (category) => {
        form.post(route('admin-sekolah.scoring.update', category.id), {
            preserveScroll: true,
        });
    };

    const updateRule = (categoryId, position, field, value) => {
        const currentRules = form.data.rules[categoryId] || [];
        const ruleIndex = currentRules.findIndex(r => r.position === position);
        
        const newRules = [...currentRules];
        if (ruleIndex !== -1) {
            newRules[ruleIndex] = { ...newRules[ruleIndex], [field]: value };
        } else {
            newRules.push({ position, [field]: value });
        }
        
        form.setData('rules', { ...form.data.rules, [categoryId]: newRules });
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="w-6 h-1 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Scoring Rules</span>
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Sistem <span className="text-orange-600">Pemarkahan</span>
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.dashboard')}
                        className="px-6 py-3.5 bg-white border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest italic rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Dashboard
                    </Link>
                </div>
            }
        >
            <Head title="Konfigurasi Pemarkahan" />

            <div className="space-y-8 md:space-y-12 pb-24">
                <div className="bg-white border border-slate-100 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-sm relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 text-center md:text-left">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-orange-50 text-orange-600 flex items-center justify-center mx-auto md:mx-0 shadow-inner border border-orange-100">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-slate-900 mb-1">Konfigurasi Markah Rumah</h3>
                                <p className="text-slate-400 font-bold italic text-sm">
                                    Tetapkan sistem pemarkahan berpusat mengikut kategori acara sekolah anda.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-10 md:space-y-14">
                            {categories.map((category) => (
                                <div key={category.id} className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-1.5 h-6 bg-slate-900 rounded-full" style={{ backgroundColor: category.color }} />
                                        <h4 className="text-sm md:text-base font-black italic uppercase tracking-widest text-slate-900">{category.name}</h4>
                                        <div className="h-px bg-slate-100 flex-1" />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {category.scoring_rules.map((rule) => (
                                            <div key={rule.id} className="bg-slate-50/50 border border-slate-100 rounded-3xl p-6 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 group/rule">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <div 
                                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black italic text-base shadow-lg"
                                                        style={{ backgroundColor: category.color }}
                                                    >
                                                        {rule.position}
                                                    </div>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">Kedudukan</span>
                                                </div>
                                                
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 italic">
                                                            Markah Kolektif
                                                        </label>
                                                        <input
                                                            type="number"
                                                            defaultValue={rule.points}
                                                            onChange={(e) => updateRule(category.id, rule.position, 'points', parseInt(e.target.value) || 0)}
                                                            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-black italic focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-xl tabular-nums"
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 italic">
                                                            Penerangan
                                                        </label>
                                                        <input
                                                            type="text"
                                                            defaultValue={rule.description || ''}
                                                            onChange={(e) => updateRule(category.id, rule.position, 'description', e.target.value)}
                                                            className="w-full px-5 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-bold italic focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                                            placeholder="Cth: Juara"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleSubmit(category)}
                                            disabled={form.processing}
                                            className="px-10 py-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest italic rounded-2xl border-b-[5px] border-slate-950 shadow-lg active:translate-y-1 active:border-b-[1px] active:shadow-none transition-all disabled:opacity-50"
                                        >
                                            {form.processing ? 'Menyimpan...' : 'Kemas Kini Markah'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-6 md:p-8 bg-blue-50/50 border border-blue-100 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1 italic">Nota Pemarkahan</h4>
                                <p className="text-xs md:text-sm font-bold text-blue-900 italic leading-relaxed">
                                    Perubahan markah akan memberi kesan kepada semua acara berdaftar di bawah kategori tersebut. 
                                    Kedudukan markah rumah sukan akan dikira secara automatik.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
