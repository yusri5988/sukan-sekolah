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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Konfigurasi Pemarkahan</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            Sistem Pemarkahan
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.dashboard')}
                        className="px-6 py-3 bg-white border-4 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                        </svg>
                        Dashboard
                    </Link>
                </div>
            }
        >
            <Head title="Konfigurasi Pemarkahan" />

            <div className="space-y-12">
                <div className="bg-white border-4 border-slate-900 p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">Konfigurasi Markah Rumah Sukan</h3>
                                <p className="text-slate-500 font-bold italic">
                                    Tetapkan pemarkahan untuk setiap kategori acara mengikut keperluan sekolah.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {categories.map((category) => (
                                <div key={category.id} className="border-4 border-slate-200 rounded-2xl overflow-hidden">
                                    <div 
                                        className="px-6 py-4"
                                        style={{ backgroundColor: `${category.color}10` }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-lg font-black italic uppercase tracking-tighter text-slate-900">{category.name}</h4>
                                                <p className="text-xs font-bold text-slate-500">{category.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-slate-600">
                                                    {category.scoring_rules.length} Kedudukan
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6 bg-white">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {category.scoring_rules.map((rule) => (
                                                <div key={rule.id} className="border-4 border-slate-200 rounded-xl p-4">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div 
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm"
                                                            style={{ backgroundColor: category.color }}
                                                        >
                                                            {rule.position}
                                                        </div>
                                                        <span className="text-sm font-bold text-slate-500 uppercase">Kedudukan</span>
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                                            Markah
                                                        </label>
                                                        <input
                                                            type="number"
                                                            defaultValue={rule.points}
                                                            onChange={(e) => updateRule(category.id, rule.position, 'points', parseInt(e.target.value) || 0)}
                                                            className="w-full px-4 py-3 bg-slate-50 border-4 border-slate-900 rounded-xl text-slate-900 font-bold focus:outline-none focus:border-orange-600 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        />
                                                    </div>
                                                    
                                                    <div className="mt-3">
                                                        <label className="block text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                                                            Catatan
                                                        </label>
                                                        <input
                                                            type="text"
                                                            defaultValue={rule.description || ''}
                                                            onChange={(e) => updateRule(category.id, rule.position, 'description', e.target.value)}
                                                            className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-none focus:border-orange-600 transition-all"
                                                            placeholder="Contoh: Juara"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="mt-6 flex justify-end">
                                            <button
                                                onClick={() => handleSubmit(category)}
                                                disabled={form.processing}
                                                className="px-6 py-3 bg-slate-900 text-white text-sm font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {form.processing ? 'Menyimpan...' : 'Simpan'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-blue-50 border-4 border-blue-200 rounded-2xl">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-tighter text-blue-900 mb-1">Maklumat</h4>
                                    <p className="text-sm font-bold text-blue-700">
                                        Pemarkahan ini akan digunakan untuk mengira mata rumah sukan bagi setiap acara. 
                                        Konfigurasi adalah khusus untuk sekolah anda dan boleh diubah mengikut keperluan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
