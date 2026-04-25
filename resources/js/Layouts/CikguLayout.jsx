import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import PwaInstallPrompt from '@/Components/PwaInstallPrompt';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CikguLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-white selection:bg-orange-600 selection:text-white font-sans pb-28 sm:pb-0">
            {/* Top Desktop Nav */}
            <nav className="hidden sm:flex fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 h-20 items-center">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-3">
                            <Link href="/">
                                <ApplicationLogo className="w-9 h-9" />
                            </Link>
                            <span className="text-2xl font-black italic tracking-tighter uppercase leading-none">
                                Cikgu<span className="text-orange-600">Panel</span>
                            </span>
                        </div>

                        <div className="flex space-x-6">
                            <NavLink
                                href={route('cikgu.dashboard')}
                                active={route().current('cikgu.dashboard')}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                href={route('cikgu.students.index')}
                                active={route().current('cikgu.students.*')}
                            >
                                Pelajar
                            </NavLink>
                            <NavLink
                                href={route('cikgu.events.index')}
                                active={route().current('cikgu.events.*')}
                            >
                                Acara
                            </NavLink>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="relative ms-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border-2 border-slate-900 rounded-xl text-xs font-black uppercase tracking-widest italic text-slate-900 bg-white hover:bg-slate-50 focus:outline-none transition ease-in-out duration-150 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-y-0.5 active:shadow-none"
                                        >
                                            {user.name}
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profil
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Keluar
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Nav */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white border-t-2 border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                <nav className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
                    <Link
                        href={route('cikgu.dashboard')}
                        className={`flex flex-col items-center justify-center flex-1 min-w-[60px] h-full transition-all duration-200 ${
                            route().current('cikgu.dashboard')
                            ? 'text-orange-600'
                            : 'text-slate-400'
                        }`}
                    >
                        <div className={`p-1.5 rounded-xl transition-all ${route().current('cikgu.dashboard') ? 'bg-orange-50' : ''}`}>
                            <svg className="w-5 h-5" fill={route().current('cikgu.dashboard') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest mt-0.5 italic">Dashboard</span>
                    </Link>

                    <Link
                        href={route('cikgu.students.index')}
                        className={`flex flex-col items-center justify-center flex-1 min-w-[60px] h-full transition-all duration-200 ${
                            route().current('cikgu.students.*')
                            ? 'text-orange-600'
                            : 'text-slate-400'
                        }`}
                    >
                        <div className={`p-1.5 rounded-xl transition-all ${route().current('cikgu.students.*') ? 'bg-orange-50' : ''}`}>
                            <svg className="w-5 h-5" fill={route().current('cikgu.students.*') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest mt-0.5 italic">Pelajar</span>
                    </Link>

                    <Link
                        href={route('cikgu.events.index')}
                        className={`flex flex-col items-center justify-center flex-1 min-w-[60px] h-full transition-all duration-200 ${
                            route().current('cikgu.events.*')
                            ? 'text-orange-600'
                            : 'text-slate-400'
                        }`}
                    >
                        <div className={`p-1.5 rounded-xl transition-all ${route().current('cikgu.events.*') ? 'bg-orange-50' : ''}`}>
                            <svg className="w-5 h-5" fill={route().current('cikgu.events.*') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest mt-0.5 italic">Acara</span>
                    </Link>

                    <button
                        onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                        className={`flex flex-col items-center justify-center flex-1 min-w-[60px] h-full transition-all duration-200 ${
                            showingNavigationDropdown
                            ? 'text-slate-900'
                            : 'text-slate-400'
                        }`}
                    >
                        <div className={`p-1.5 rounded-xl transition-all ${showingNavigationDropdown ? 'bg-slate-100' : ''}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-widest mt-0.5 italic">Menu</span>
                    </button>
                </nav>
            </div>

            {/* Mobile Drawer Overlay */}
            {showingNavigationDropdown && (
                <div className="sm:hidden fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 italic text-center">Navigasi Cikgu</h4>
                        <div className="grid grid-cols-2 gap-4 pb-8">
                            <Link href={route('cikgu.dashboard')} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2" onClick={() => setShowingNavigationDropdown(false)}>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Dashboard</span>
                            </Link>
                            <Link href={route('cikgu.students.index')} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2" onClick={() => setShowingNavigationDropdown(false)}>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Pelajar</span>
                            </Link>
                            <Link href={route('cikgu.students.create')} className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex flex-col items-center gap-2" onClick={() => setShowingNavigationDropdown(false)}>
                                <span className="text-xs font-black uppercase tracking-widest text-orange-600 italic">+ Tambah Pelajar</span>
                            </Link>
                            <Link href={route('cikgu.events.index')} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2" onClick={() => setShowingNavigationDropdown(false)}>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Acara</span>
                            </Link>
                            <Link href={route('profile.edit')} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2" onClick={() => setShowingNavigationDropdown(false)}>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Profil</span>
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="p-4 bg-red-50 rounded-2xl border border-red-100 flex flex-col items-center gap-2 w-full text-center" onClick={() => setShowingNavigationDropdown(false)}>
                                <span className="text-xs font-black uppercase tracking-widest text-red-600 italic">Log Keluar</span>
                            </Link>
                        </div>
                        <button
                            onClick={() => setShowingNavigationDropdown(false)}
                            className="w-full py-4 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest italic"
                        >
                            Tutup Menu
                        </button>
                    </div>
                </div>
            )}

            <div className="pt-0 sm:pt-20">
                {header && (
                    <header className="bg-white border-b-8 border-slate-900">
                        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:px-8">
                            {typeof header === 'string' ? (
                                <h2 className="text-4xl lg:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                                    {header}
                                </h2>
                            ) : (
                                header
                            )}
                        </div>
                    </header>
                )}

                <main className="py-8 sm:py-12 bg-white relative overflow-hidden min-h-[calc(100vh-80px)]">
                    <div className="absolute inset-0 opacity-[0.01] pointer-events-none select-none overflow-hidden uppercase font-black text-[15vw] leading-none text-slate-900 flex flex-col gap-0 items-center justify-center rotate-[-10deg] -z-10">
                        <div>Faster</div>
                        <div className="ml-40">Stronger</div>
                        <div>Higher</div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>

            <PwaInstallPrompt />
        </div>
    );
}
