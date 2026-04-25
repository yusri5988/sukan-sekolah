import PengurusAcaraLayout from '@/Layouts/PengurusAcaraLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const GENDER_LABELS = {
    male: 'Lelaki',
    female: 'Perempuan',
    mixed: 'Campuran',
};

const CATEGORY_LABELS = {
    tahun_1: 'Tahun 1',
    tahun_2: 'Tahun 2',
    tahun_3: 'Tahun 3',
    tahun_4: 'Tahun 4',
    tahun_5: 'Tahun 5',
    tahun_6: 'Tahun 6',
};

export default function EventSelectionsConfigure({ meet, selection, availableGenders, availableCategories, existingKeys }) {
    const { data, setData, post, processing, errors } = useForm({
        combinations: [...existingKeys],
    });

    const toggleCombination = (key) => {
        if (data.combinations.includes(key)) {
            setData('combinations', data.combinations.filter(k => k !== key));
        } else {
            setData('combinations', [...data.combinations, key]);
        }
    };

    const isSelected = (gender, category) => {
        return data.combinations.includes(`${gender}_${category}`);
    };

    const description = selection?.event_category?.code === 'track'
        ? 'Pilih tahun dan jantina untuk acara balapan ini.'
        : 'Pilih tahun dan jantina untuk acara ini.';

    return (
        <PengurusAcaraLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 sm:px-0">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="h-1 w-8 bg-orange-600 rounded-full" />
                            <span className="text-orange-600 text-xs font-extrabold uppercase tracking-[0.2em]">Konfigurasi Acara</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            {selection?.template_name}
                        </h2>
                    </div>
                    <Link
                        href={route('pengurus-acara.event-selections.index')}
                        className="group flex items-center gap-2 px-5 py-2.5 text-slate-500 hover:text-orange-600 font-bold transition-all"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm uppercase tracking-wider">Kembali</span>
                    </Link>
                </div>
            }
        >
            <Head title={`Konfigurasi - ${selection?.template_name}`} />

            <div className="max-w-3xl mx-auto space-y-8 pb-32">
                {/* Info Bar */}
                <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl shadow-slate-200">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-900/20">
                            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">{selection?.template_name}</h3>
                            <p className="text-slate-400 font-bold italic text-sm">{description}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); post(route('pengurus-acara.event-selections.update', selection.id)); }} className="space-y-8">
                    {/* Gender Checkboxes */}
                    <div className="bg-white rounded-[2rem] border-2 border-slate-100 p-8 space-y-6">
                        <h4 className="text-lg font-black uppercase italic tracking-tighter text-slate-900">Jantina</h4>
                        <div className="flex flex-wrap gap-4">
                            {availableGenders.map((gender) => {
                                const hasAny = availableCategories.some(cat => isSelected(gender, cat));
                                return (
                                    <label
                                        key={gender}
                                        className={`relative flex items-center gap-4 px-6 py-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                            hasAny
                                                ? 'border-orange-600 bg-orange-50/30'
                                                : 'border-slate-100 bg-white hover:border-slate-300'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                                            checked={hasAny}
                                            onChange={() => {
                                                const newCombo = [...data.combinations];
                                                availableCategories.forEach((cat) => {
                                                    const key = `${gender}_${cat}`;
                                                    if (hasAny) {
                                                        const idx = newCombo.indexOf(key);
                                                        if (idx !== -1) newCombo.splice(idx, 1);
                                                    } else {
                                                        if (!newCombo.includes(key)) newCombo.push(key);
                                                    }
                                                });
                                                setData('combinations', newCombo);
                                            }}
                                        />
                                        <span className="font-black uppercase tracking-wider italic text-sm text-slate-900">
                                            {GENDER_LABELS[gender] || gender}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tahun Checkboxes */}
                    <div className="bg-white rounded-[2rem] border-2 border-slate-100 p-8 space-y-6">
                        <h4 className="text-lg font-black uppercase italic tracking-tighter text-slate-900">Tahun</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {availableCategories.map((category) => {
                                const hasAny = availableGenders.some(g => isSelected(g, category));
                                return (
                                    <label
                                        key={category}
                                        className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                            hasAny
                                                ? 'border-orange-600 bg-orange-50/30'
                                                : 'border-slate-100 bg-white hover:border-slate-300'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
                                            checked={hasAny}
                                            onChange={() => {
                                                const newCombo = [...data.combinations];
                                                availableGenders.forEach((g) => {
                                                    const key = `${g}_${category}`;
                                                    if (hasAny) {
                                                        const idx = newCombo.indexOf(key);
                                                        if (idx !== -1) newCombo.splice(idx, 1);
                                                    } else {
                                                        if (!newCombo.includes(key)) newCombo.push(key);
                                                    }
                                                });
                                                setData('combinations', newCombo);
                                            }}
                                        />
                                        <span className="font-black uppercase tracking-wider italic text-sm text-slate-900">
                                            {CATEGORY_LABELS[category] || category}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Individual Combination Toggles */}
                    <div className="bg-white rounded-[2rem] border-2 border-slate-100 p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg font-black uppercase italic tracking-tighter text-slate-900">Gabungan</h4>
                            <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {data.combinations.length} dipilih
                            </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {availableGenders.map((gender) =>
                                availableCategories.map((category) => {
                                    const key = `${gender}_${category}`;
                                    return (
                                        <button
                                            type="button"
                                            key={key}
                                            onClick={() => toggleCombination(key)}
                                            className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider italic transition-all border-2 ${
                                                isSelected(gender, category)
                                                    ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-200'
                                                    : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                                            }`}
                                        >
                                            {GENDER_LABELS[gender] || gender} • {CATEGORY_LABELS[category] || category}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {errors.combinations && (
                        <div className="flex items-center gap-4 p-5 bg-red-50 border border-red-100 rounded-2xl">
                            <p className="text-red-800 font-bold italic">{errors.combinations}</p>
                        </div>
                    )}

                    {/* Bottom Action */}
                    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 p-6 z-40 md:relative md:bg-transparent md:border-none md:p-0 md:mt-12">
                        <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
                            <p className="text-slate-900 font-black italic uppercase text-sm">
                                <span className="text-orange-600">{data.combinations.length}</span> acara akan dicipta
                            </p>
                            <div className="flex items-center gap-4">
                                <Link
                                    href={route('pengurus-acara.event-selections.index')}
                                    className="px-8 py-4 text-slate-500 font-bold uppercase tracking-widest text-xs"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={data.combinations.length === 0 || processing}
                                    className="px-12 py-5 bg-slate-900 text-white text-sm font-black uppercase tracking-[0.2em] italic rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group"
                                >
                                    {selection?.status === 'configured' ? 'Kemas Kini Acara' : 'Cipta Acara'}
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </PengurusAcaraLayout>
    );
}
