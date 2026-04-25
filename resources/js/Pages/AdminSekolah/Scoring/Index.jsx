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
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center justify-center gap-2 mb-2 w-full">
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                        <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Scoring Rules</span>
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        Sistem <span className="text-orange-600">Pemarkahan</span>
                    </h2>
                    <Link
                        href={route('admin-sekolah.dashboard')}
                        className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2"
                    >
                        ← Kembali ke Dashboard
                    </Link>
                </div>
            }
        >
            <Head title="Konfigurasi Pemarkahan" />

            <div className="space-y-12 pb-24">
                <div className="space-y-10">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white border border-slate-100 rounded-[2.5rem] md:rounded-[3rem] shadow-sm overflow-hidden">
                            <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-50 bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-6 rounded-full" style={{ backgroundColor: category.color }} />
                                    <h4 className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-slate-900">
                                        Markah {category.name}
                                    </h4>
                                </div>
                                <button
                                    onClick={() => handleSubmit(category)}
                                    disabled={form.processing}
                                    className="px-6 py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest italic rounded-xl border-b-4 border-slate-950 hover:bg-slate-800 active:translate-y-1 active:border-b-0 transition-all disabled:opacity-50"
                                >
                                    {form.processing ? 'Menyimpan...' : 'Simpan Markah'}
                                </button>
                            </div>
                            
                            <div className="p-4 md:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                    {category.scoring_rules.map((rule) => (
                                        <div key={rule.id} className="flex items-center gap-4 bg-white border border-slate-100 rounded-[1.5rem] p-4 group transition-all hover:border-orange-600/30">
                                            <div 
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black italic text-xl shadow-lg shrink-0"
                                                style={{ backgroundColor: category.color }}
                                            >
                                                {rule.position}
                                            </div>
                                            <div className="flex-1 min-w-0 grid grid-cols-1 gap-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Markah Kolektif</span>
                                                    <div className="flex items-center bg-slate-50 rounded-lg border border-slate-100 p-0.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const currentVal = form.data.rules[category.id]?.find(r => r.position === rule.position)?.points ?? rule.points;
                                                                updateRule(category.id, rule.position, 'points', Math.max(0, currentVal - 1));
                                                            }}
                                                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-white rounded-md transition-all font-black text-lg"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={form.data.rules[category.id]?.find(r => r.position === rule.position)?.points ?? rule.points}
                                                            onChange={(e) => updateRule(category.id, rule.position, 'points', parseInt(e.target.value) || 0)}
                                                            className="w-12 px-0 py-0 bg-transparent border-0 focus:ring-0 text-slate-900 font-black italic text-center text-lg tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const currentVal = form.data.rules[category.id]?.find(r => r.position === rule.position)?.points ?? rule.points;
                                                                updateRule(category.id, rule.position, 'points', currentVal + 1);
                                                            }}
                                                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-orange-600 hover:bg-white rounded-md transition-all font-black text-lg"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <input
                                                    type="text"
                                                    defaultValue={rule.description || ''}
                                                    onChange={(e) => updateRule(category.id, rule.position, 'description', e.target.value)}
                                                    className="w-full px-0 py-0 bg-transparent border-0 focus:ring-0 text-[10px] text-slate-400 font-bold italic uppercase tracking-widest placeholder:text-slate-300"
                                                    placeholder="Cth: Juara"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-orange-600 flex items-center justify-center shrink-0 shadow-lg">
                        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-600 mb-1 italic">Nota Pemarkahan</h4>
                        <p className="text-sm md:text-base font-bold text-slate-400 italic leading-relaxed">
                            Perubahan markah akan memberi kesan kepada semua acara berdaftar di bawah kategori tersebut. 
                            Kedudukan markah rumah sukan akan dikira secara automatik.
                        </p>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
