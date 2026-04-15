import AdminSekolahLayout from '@/Layouts/AdminSekolahLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function EventsCreate({ meet, templates }) {
    router.visit(route('admin-sekolah.events.select-templates', meet.id));

    return (
        <AdminSekolahLayout
            header={
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-[2px] bg-orange-600" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">Tambah Acara</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                            {meet.name}
                        </h2>
                    </div>
                    <Link
                        href={route('admin-sekolah.events.index', meet.id)}
                        className="px-6 py-3 bg-white border-4 border-slate-900 text-slate-900 text-xs font-black uppercase tracking-widest italic rounded-xl hover:bg-slate-50 transition-all inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </Link>
                </div>
            }
        >
            <Head title={`Tambah Acara - ${meet.name}`} />
            <div className="text-center py-20">
                <p className="text-slate-500 font-bold italic">Mengahihkan...</p>
            </div>
        </AdminSekolahLayout>
    );
}
