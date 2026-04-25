import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import ColorPicker from '@/Components/ColorPicker';
import FormActions from '@/Components/FormActions';
import { HOUSE_COLORS } from '@/constants/colors';
import { Head, Link, useForm } from '@inertiajs/react';

function getFinalName(color, customName) {
    const option = HOUSE_COLORS.find(o => o.value === color);
    const label = option ? option.label : 'Rumah';
    return customName ? `${label} (${customName})` : label;
}

export default function HousesCreate({ usedColors = [] }) {
    const { data, setData, post, processing, errors, transform } = useForm({
        name: '',
        color: '',
        custom_name: '',
    });

    const isColorUsed = usedColors.includes(data.color);

    const handleSubmit = (e) => {
        e.preventDefault();

        const finalName = getFinalName(data.color, data.custom_name);

        transform((data) => ({
            ...data,
            name: finalName,
        }));

        post(route('admin-sekolah.houses.store'));
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col items-center justify-center text-center gap-4">
                    <div>
                        <div className="inline-flex items-center justify-center gap-2 mb-1 sm:mb-2 w-full">
                            <div className="w-6 sm:w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Pengurusan Rumah</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                            Tambah <span className="text-orange-600">Rumah Baru</span>
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.houses.index')}
                        className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
                    >
                        Kembali ke Senarai
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Rumah Sukan" />

            <div className="pt-0 pb-4 sm:pb-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border-2 sm:border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] rounded-2xl sm:rounded-[2.5rem] overflow-hidden">
                        <div className="p-6 sm:p-10">
                            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">
                                <div className="space-y-6 sm:space-y-8">
                                    <ColorPicker
                                        value={data.color}
                                        onChange={(val) => setData('color', val)}
                                        error={errors.color}
                                    />

                                    {isColorUsed && (
                                        <div className="bg-orange-50 border-2 border-orange-200 p-4 rounded-xl flex items-start gap-3 animate-pulse">
                                            <svg className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-orange-700 leading-relaxed">
                                                Amaran: Warna ini telah dipilih oleh rumah sukan lain dalam sekolah anda.
                                            </p>
                                        </div>
                                    )}

                                    <div className="space-y-2 sm:space-y-3">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 italic block">
                                            Nama Tersuai Rumah (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.custom_name}
                                            onChange={(e) => setData('custom_name', e.target.value)}
                                            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-base sm:text-xl font-black italic uppercase tracking-tighter text-slate-900 focus:ring-0 focus:border-orange-600 transition-colors placeholder:text-slate-300"
                                            placeholder="CONTOH: GAMMA (Nama penuh: MERAH (GAMMA))"
                                        />
                                    </div>

                                    {data.color && (
                                        <div className="bg-slate-50 border-2 border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                            <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400 italic mb-2 sm:mb-3">Preview Nama Rumah</div>
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg shrink-0 border-2 border-slate-200" style={{ backgroundColor: data.color }} />
                                                <span className="text-lg sm:text-2xl font-black italic uppercase tracking-tighter text-slate-900">
                                                    {getFinalName(data.color, data.custom_name)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <FormActions
                                    processing={processing}
                                    submitLabel="CIPTA RUMAH →"
                                    processingLabel="MEMPROSES..."
                                    cancelRoute={route('admin-sekolah.houses.index')}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
