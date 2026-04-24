import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Launch({ meet }) {
    const { data, setData, post, processing, errors } = useForm({
        date: meet.date || '',
        closing_date: meet.closing_date || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin-sekolah.launch.process'));
    };

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center justify-center gap-2 mb-2">
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                        <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em]">Tournament Setup</span>
                        <span className="w-6 h-1 bg-orange-600 rounded-full" />
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        Pelancaran Kejohanan
                    </h2>
                </div>
            }
        >
            <Head title="Launch Kejohanan" />

            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                <div className="w-full max-w-2xl">
                    <form onSubmit={submit} className="space-y-12">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-sm">
                            <div className="space-y-2">
                                <InputLabel htmlFor="date" value="Tarikh Kejohanan" className="text-sm font-bold uppercase tracking-wider text-slate-500" />
                                <TextInput
                                    id="date"
                                    type="date"
                                    name="date"
                                    value={data.date}
                                    className="block w-full mt-1 border-slate-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl"
                                    onChange={(e) => setData('date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.date} className="mt-2" />
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="closing_date" value="Tutup Pendaftaran" className="text-sm font-bold uppercase tracking-wider text-slate-500" />
                                <TextInput
                                    id="closing_date"
                                    type="date"
                                    name="closing_date"
                                    value={data.closing_date}
                                    className="block w-full mt-1 border-slate-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl"
                                    onChange={(e) => setData('closing_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.closing_date} className="mt-2" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center space-y-6 pb-24 md:pb-0">
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative inline-flex items-center justify-center w-full md:w-auto px-8 md:px-24 py-8 md:py-12 overflow-hidden font-black text-white transition-all duration-300 bg-orange-600 rounded-3xl hover:bg-orange-500 active:scale-95 shadow-[0_10px_0_0_rgba(154,52,18,1)] hover:shadow-[0_5px_0_0_rgba(154,52,18,1)] active:shadow-none transform active:translate-y-[10px]"
                            >
                                <span className="text-5xl md:text-9xl italic uppercase tracking-tighter leading-none">
                                    LAUNCH
                                </span>
                                
                                {processing && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-orange-600/50 backdrop-blur-sm">
                                        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </button>
                            
                            <p className="text-slate-400 font-bold uppercase tracking-[0.1em] text-[9px] md:text-[10px] animate-pulse text-center max-w-[200px] md:max-w-none">
                                Sila pastikan tarikh adalah tepat sebelum melancarkan
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </AdminSekolahLayout>
    );
}
