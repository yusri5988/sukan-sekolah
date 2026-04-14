import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 sm:p-6 selection:bg-orange-600 selection:text-white overflow-hidden relative">
            {/* Dynamic Sports Background Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none overflow-hidden uppercase font-black text-[15vw] leading-none text-slate-900 flex flex-col gap-0 items-center justify-center rotate-[-10deg]">
                <div>Faster</div>
                <div className="ml-40">Stronger</div>
                <div>Higher</div>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-600/10 blur-[100px] -z-10 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 blur-[100px] -z-10 rounded-full" />

            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col items-center mb-12">
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 mb-6 transform hover:rotate-12 transition-transform duration-300 shadow-2xl" />
                    </Link>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                        Hari<span className="text-orange-600">Sukan</span>
                    </h2>
                    <div className="h-1.5 w-12 bg-orange-600 mt-2 rounded-full" />
                </div>

                <div className="w-full bg-white border-8 border-slate-900 p-8 sm:p-10 rounded-[2.5rem] shadow-[15px_15px_0px_0px_rgba(15,23,42,1)] relative">
                    {/* Decorative Corner */}
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-8 border-l-8 border-orange-600 rounded-tl-xl" />
                    
                    {children}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                        Sistem Hari Sukan Sekolah • 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
