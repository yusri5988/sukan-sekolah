import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminSekolahLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

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
                                Admin<span className="text-orange-600">Sekolah</span>
                            </span>
                        </div>

                        <div className="flex space-x-6">
                            {user.role === 'admin_sekolah' && (
                                <NavLink href={route('admin-sekolah.dashboard')} active={route().current('admin-sekolah.dashboard')}>
                                    Dashboard
                                </NavLink>
                            )}

                            {user.role === 'pengurus_acara' && (
                                <NavLink href={route('pengurus-acara.event-selections.index')} active={route().current('pengurus-acara.*')}>
                                    Konfigurasi Acara
                                </NavLink>
                            )}
                            
                            {user.role === 'admin_sekolah' && (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="inline-flex items-center px-1 pt-1 text-sm font-black uppercase tracking-widest text-slate-500 hover:text-slate-700 transition italic">
                                            Pendaftaran
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('admin-sekolah.houses.index')}>Rumah Sukan</Dropdown.Link>
                                        <Dropdown.Link href={route('admin-sekolah.teachers.index')}>Guru</Dropdown.Link>
                                        <Dropdown.Link href={route('admin-sekolah.teachers.assignments.index')}>Lantikan Guru</Dropdown.Link>
                                        <Dropdown.Link href={route('admin-sekolah.students.index')}>Pelajar</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            )}

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center px-1 pt-1 text-sm font-black uppercase tracking-widest text-slate-500 hover:text-slate-700 transition italic">
                                        Pengurusan
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    {user.role === 'admin_sekolah' && (
                                        <Dropdown.Link href={route('admin-sekolah.meets.index')}>Kejohanan</Dropdown.Link>
                                    )}
                                    <Dropdown.Link href={route('admin-sekolah.events.index')}>Urus Acara</Dropdown.Link>
                                    {user.role === 'admin_sekolah' && (
                                        <Dropdown.Link href={route('admin-sekolah.scoring.index')}>Pemarkahan</Dropdown.Link>
                                    )}
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest italic text-slate-700 bg-white hover:bg-slate-50 transition shadow-sm">
                                    {user.name}
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profil</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">Log Keluar</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </nav>

            {/* Fixed Mobile Bottom Nav - Solid & Consistent */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                <nav className="flex items-center justify-around h-20 px-2 max-w-md mx-auto pb-safe">
                    {/* Home/Dashboard */}
                    <Link 
                        href={user.role === 'admin_sekolah' ? route('admin-sekolah.dashboard') : route('pengurus-acara.event-selections.index')} 
                        className={`flex flex-col items-center justify-center flex-1 min-w-[70px] h-full transition-all duration-200 ${
                            route().current('admin-sekolah.dashboard') || route().current('pengurus-acara.event-selections.index')
                            ? 'text-orange-600' 
                            : 'text-slate-400'
                        }`}
                    >
                        <div className={`p-2 rounded-2xl transition-all ${route().current('admin-sekolah.dashboard') || route().current('pengurus-acara.event-selections.index') ? 'bg-orange-50' : ''}`}>
                            <svg className="w-6 h-6" fill={route().current('admin-sekolah.dashboard') || route().current('pengurus-acara.event-selections.index') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest mt-1 italic">
                            {user.role === 'admin_sekolah' ? 'Home' : 'Acara'}
                        </span>
                    </Link>
                    
                    {/* Meets - Only for Admin Sekolah */}
                    {user.role === 'admin_sekolah' && (
                        <Link 
                            href={route('admin-sekolah.meets.index')} 
                            className={`flex flex-col items-center justify-center flex-1 min-w-[70px] h-full transition-all duration-200 ${
                                route().current('admin-sekolah.meets.*') 
                                ? 'text-orange-600' 
                                : 'text-slate-400'
                            }`}
                        >
                            <div className={`p-2 rounded-2xl transition-all ${route().current('admin-sekolah.meets.*') ? 'bg-orange-50' : ''}`}>
                                <svg className="w-6 h-6" fill={route().current('admin-sekolah.meets.*') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest mt-1 italic">Meets</span>
                        </Link>
                    )}

                    {/* Urus Acara for Pengurus Acara (Mobile replacement for Launch) */}
                    {user.role === 'pengurus_acara' && (
                        <Link 
                            href={route('admin-sekolah.events.index')} 
                            className={`flex flex-col items-center justify-center flex-1 min-w-[70px] h-full transition-all duration-200 ${
                                route().current('admin-sekolah.events.*') 
                                ? 'text-orange-600' 
                                : 'text-slate-400'
                            }`}
                        >
                            <div className={`p-2 rounded-2xl transition-all ${route().current('admin-sekolah.events.*') ? 'bg-orange-50' : ''}`}>
                                <svg className="w-6 h-6" fill={route().current('admin-sekolah.events.*') ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest mt-1 italic">Urus</span>
                        </Link>
                    )}

                    {/* Launch - Only for Admin Sekolah */}
                    {user.role === 'admin_sekolah' && (
                        <Link 
                            href={route('admin-sekolah.launch')} 
                            className={`flex flex-col items-center justify-center flex-1 min-w-[70px] h-full transition-all duration-200 ${
                                route().current('admin-sekolah.launch') 
                                ? 'text-orange-600 scale-110' 
                                : 'text-slate-400'
                            }`}
                        >
                            <div className={`p-3 rounded-full transition-all shadow-sm ${route().current('admin-sekolah.launch') ? 'bg-orange-600 text-white shadow-orange-200' : 'bg-slate-50'}`}>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest mt-1 italic ${route().current('admin-sekolah.launch') ? 'text-orange-600' : ''}`}>Launch</span>
                        </Link>
                    )}

                    {/* Menu Trigger */}
                    <button 
                        onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                        className={`flex flex-col items-center justify-center flex-1 min-w-[70px] h-full transition-all duration-200 ${
                            showingNavigationDropdown 
                            ? 'text-slate-900' 
                            : 'text-slate-400'
                        }`}
                    >
                        <div className={`p-2 rounded-2xl transition-all ${showingNavigationDropdown ? 'bg-slate-100' : ''}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest mt-1 italic">Menu</span>
                    </button>
                </nav>
            </div>

            {/* Mobile Drawer Overlay */}
            {showingNavigationDropdown && (
                <div className="md:hidden fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300">
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 italic text-center">Pengurusan Lanjut</h4>
                        <div className="grid grid-cols-2 gap-4 pb-8">
                            {user.role === 'admin_sekolah' && (
                                <>
                                    <Link href={route('admin-sekolah.houses.index')} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Rumah Sukan</span>
                                    </Link>
                                    <Link href={route('admin-sekolah.teachers.index')} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Guru</span>
                                    </Link>
                                    <Link href={route('admin-sekolah.students.index')} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Pelajar</span>
                                    </Link>
                                    <Link href={route('admin-sekolah.scoring.index')} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Pemarkahan</span>
                                    </Link>
                                </>
                            )}
                            {user.role === 'pengurus_acara' && (
                                <>
                                    <Link href={route('pengurus-acara.event-selections.index')} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Konfigurasi</span>
                                    </Link>
                                    <Link href={route('admin-sekolah.events.index')} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-2">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Urus Acara</span>
                                    </Link>
                                </>
                            )}
                            <Link href={route('profile.edit')} className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex flex-col items-center gap-2">
                                <span className="text-xs font-black uppercase tracking-widest text-orange-600 italic">Profil Saya</span>
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="p-4 bg-red-50 rounded-2xl border border-red-100 flex flex-col items-center gap-2 w-full text-center">
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
