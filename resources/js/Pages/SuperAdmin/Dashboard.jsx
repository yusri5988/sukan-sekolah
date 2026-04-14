import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function SuperAdminDashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header="Super Admin Dashboard"
        >
            <Head title="Super Admin Dashboard" />

            <div className="py-6 sm:py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 mb-8 sm:mb-12">
                        <div className="overflow-hidden bg-white border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-xl sm:rounded-2xl transform hover:-translate-y-1 transition-transform">
                            <div className="p-5 sm:p-8">
                                <div className="flex items-center">
                                    <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-orange-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] sm:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] shrink-0">
                                        <svg className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div className="ms-4 sm:ms-6">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Jumlah Sekolah</div>
                                        <div className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">{stats.total_sekolah || 0}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-xl sm:rounded-2xl transform hover:-translate-y-1 transition-transform">
                            <div className="p-5 sm:p-8">
                                <div className="flex items-center">
                                    <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-blue-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] sm:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] shrink-0">
                                        <svg className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div className="ms-4 sm:ms-6">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Admin Sekolah</div>
                                        <div className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">{stats.total_admin_sekolah || 0}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden bg-white border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] rounded-xl sm:rounded-2xl transform hover:-translate-y-1 transition-transform">
                            <div className="p-5 sm:p-8">
                                <div className="flex items-center">
                                    <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-lg sm:rounded-xl bg-purple-100 border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] sm:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] shrink-0">
                                        <svg className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="ms-4 sm:ms-6">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Jumlah Cikgu</div>
                                        <div className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">{stats.total_cikgu || 0}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Welcome Card */}
                    <div className="overflow-hidden bg-white border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] sm:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] rounded-2xl sm:rounded-[2rem] relative">
                        {/* Decorative Background Text - Hidden on small mobile */}
                        <div className="absolute right-0 top-0 text-6xl sm:text-[10rem] font-black italic uppercase text-slate-50 leading-none pointer-events-none select-none translate-x-1/4 -translate-y-1/4 rotate-[-15deg] hidden xs:block">
                            Admin
                        </div>

                        <div className="p-6 sm:p-12 relative z-10">
                            <h3 className="text-2xl sm:text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight mb-3 sm:mb-4">
                                Selamat Datang,<br /> 
                                <span className="text-orange-600">Super Admin!</span>
                            </h3>
                            <p className="text-sm sm:text-xl font-bold text-slate-500 italic max-w-2xl mb-8 sm:mb-12">
                                Uruskan ekosistem sukan sekolah anda dengan kuasa penuh. Tambah sekolah baharu, urus admin, dan pantau statistik dalam masa nyata.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <Link
                                    href={route('super-admin.sekolahs.index')}
                                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-4 border-slate-900 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black uppercase tracking-widest italic text-white bg-slate-900 hover:bg-slate-800 focus:outline-none transition ease-in-out duration-150 shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] sm:shadow-[6px_6px_0px_0px_rgba(234,88,12,1)] active:translate-y-0.5 active:shadow-none"
                                >
                                    Senarai Sekolah
                                </Link>
                                <Link
                                    href={route('super-admin.sekolahs.create')}
                                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-4 border-slate-900 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black uppercase tracking-widest italic text-slate-900 bg-white hover:bg-slate-50 focus:outline-none transition ease-in-out duration-150 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-y-0.5 active:shadow-none"
                                >
                                    + Tambah Sekolah Baru
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
