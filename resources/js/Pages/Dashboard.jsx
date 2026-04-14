import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header="Dashboard"
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-2xl">
                        <div className="p-12 text-center">
                            <h3 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 mb-4">
                                Selamat Kembali!
                            </h3>
                            <p className="text-xl font-bold text-slate-500 italic mb-8">
                                Anda telah berjaya log masuk. Sila gunakan menu untuk mula mengurus.
                            </p>
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-100 border-2 border-orange-600 rounded-xl">
                                <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                                <span className="text-xs font-black uppercase tracking-widest text-orange-600">Sistem Sedia Untuk Digunakan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
