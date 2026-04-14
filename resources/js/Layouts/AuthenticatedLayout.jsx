import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Get the appropriate dashboard route based on user role
    const getDashboardRoute = () => {
        if (user.role === 'super_admin') {
            return route('super-admin.dashboard');
        }
        if (user.role === 'admin_sekolah') {
            return route('admin-sekolah.dashboard');
        }
        return route('dashboard');
    };

    const getDashboardRouteName = () => {
        if (user.role === 'super_admin') {
            return 'super-admin.dashboard';
        }
        if (user.role === 'admin_sekolah') {
            return 'admin-sekolah.dashboard';
        }
        return 'dashboard';
    };

    return (
        <div className="min-h-screen bg-white selection:bg-orange-600 selection:text-white font-sans">
            <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-3">
                            <Link href="/">
                                <ApplicationLogo className="w-9 h-9" />
                            </Link>
                            <span className="hidden sm:block text-2xl font-black italic tracking-tighter uppercase leading-none">
                                Hari<span className="text-orange-600">Sukan</span>
                            </span>
                        </div>

                        <div className="hidden space-x-8 sm:flex">
                            <NavLink
                                href={getDashboardRoute()}
                                active={route().current(getDashboardRouteName())}
                            >
                                Dashboard
                            </NavLink>
                        </div>
                    </div>

                    <div className="hidden sm:ms-6 sm:flex sm:items-center">
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
                                    <Dropdown.Link
                                        href={route('profile.edit')}
                                    >
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-900 text-orange-500 hover:text-white focus:outline-none transition duration-150 ease-in-out"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden absolute top-20 left-0 w-full bg-white border-b-4 border-slate-900 z-50 shadow-2xl transition-all duration-300'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={getDashboardRoute()}
                            active={route().current(getDashboardRouteName())}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t-2 border-slate-100 pb-1 pt-4">
                        <div className="px-4 mb-4">
                            <div className="text-sm font-black italic uppercase tracking-widest text-slate-900">
                                {user.name}
                            </div>
                            <div className="text-[10px] font-bold text-slate-400">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-20">
                {header && (
                    <header className="bg-white border-b-8 border-slate-900">
                        <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
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

                <main className="py-12 bg-white relative overflow-hidden min-h-[calc(100-20)]">
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-[0.01] pointer-events-none select-none overflow-hidden uppercase font-black text-[15vw] leading-none text-slate-900 flex flex-col gap-0 items-center justify-center rotate-[-10deg] -z-10">
                        <div>Faster</div>
                        <div className="ml-40">Stronger</div>
                        <div>Higher</div>
                    </div>

                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
