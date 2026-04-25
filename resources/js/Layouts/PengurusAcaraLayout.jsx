import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function PengurusAcaraLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-orange-600 selection:text-white font-sans pb-32 md:pb-0">
            {/* Top Desktop Nav */}
            <nav className="hidden md:flex fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 h-20 items-center">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-3">
                            <Link href="/">
                                <ApplicationLogo className="w-9 h-9" />
                            </Link>
                            <span className="text-2xl font-black italic tracking-tighter uppercase leading-none">
                                Pengurus<span className="text-orange-600">Acara</span>
                            </span>
                        </div>

                        <div className="flex space-x-6">
                            <Link
                                href={route('pengurus-acara.event-selections.index')}
                                className={`inline-flex items-center px-1 pt-1 text-sm font-black uppercase tracking-widest transition italic ${
                                    route().current('pengurus-acara.event-selections.*')
                                        ? 'text-orange-600 border-b-2 border-orange-600'
                                        : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                Acara Induk
                            </Link>
                            <Link
                                href={route('admin-sekolah.events.index')}
                                className={`inline-flex items-center px-1 pt-1 text-sm font-black uppercase tracking-widest transition italic ${
                                    route().current('admin-sekolah.events.*')
                                        ? 'text-orange-600 border-b-2 border-orange-600'
                                        : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                Senarai Acara
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href={route('profile.edit')}
                            className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest italic text-slate-700 bg-white hover:bg-slate-50 transition shadow-sm"
                        >
                            {user.name}
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="px-4 py-2 text-red-600 text-xs font-black uppercase tracking-widest italic hover:bg-red-50 rounded-xl transition"
                        >
                            Log Keluar
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                <nav className="flex items-center justify-around h-20 px-2 max-w-md mx-auto pb-safe">
                    <Link
                        href={route('pengurus-acara.event-selections.index')}
                        className={`flex flex-col items-center justify-center flex-1 min-w-[70px] h-full transition-all duration-200 ${
                            route().current('pengurus-acara.event-selections.*')
                                ? 'text-orange-600'
                                : 'text-slate-400'
                        }`}
                    >
                        <div className={`p-2 rounded-2xl transition-all ${route().current('pengurus-acara.event-selections.*') ? 'bg-orange-50' : ''}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest mt-1 italic">Acara Induk</span>
                    </Link>

                    <Link
                        href={route('admin-sekolah.events.index')}
                        className={`flex flex-col items-center justify-center flex-1 min-w-[70px] h-full transition-all duration-200 ${
                            route().current('admin-sekolah.events.*')
                                ? 'text-orange-600'
                                : 'text-slate-400'
                        }`}
                    >
                        <div className={`p-2 rounded-2xl transition-all ${route().current('admin-sekolah.events.*') ? 'bg-orange-50' : ''}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest mt-1 italic">Senarai</span>
                    </Link>

                    <Link
                        href={route('profile.edit')}
                        className="flex flex-col items-center justify-center flex-1 min-w-[70px] h-full text-slate-400"
                    >
                        <div className="p-2 rounded-2xl">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest mt-1 italic">Profil</span>
                    </Link>
                </nav>
            </div>

            <div className="md:pt-20">
                {header && (
                    <header className="bg-white border-b border-slate-100 px-4 py-8 md:px-8">
                        <div className="max-w-7xl mx-auto">
                            {typeof header === 'string' ? (
                                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                                    {header}
                                </h2>
                            ) : (
                                header
                            )}
                        </div>
                    </header>
                )}

                <main className="py-6 md:py-12 relative min-h-[calc(100vh-80px)]">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
