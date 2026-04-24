import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 selection:bg-orange-500 selection:text-white relative overflow-hidden font-sans">
            {/* Thematic Background Image */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1560272564-c83d66b1ad12?auto=format&fit=crop&w=1920&q=80" 
                    className="w-full h-full object-cover opacity-[0.08] grayscale" 
                    alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-transparent to-slate-50/90" />
            </div>

            {/* Soft Ambient Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/30 blur-[120px] rounded-full" />

            <div className="relative z-10 w-full max-w-[420px]">
                <div className="flex flex-col items-center mb-6">
                    <Link href="/" className="group transition-all duration-500 hover:scale-105">
                        <div className="relative">
                            <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                            <ApplicationLogo className="w-14 h-14 relative z-10 drop-shadow-sm" />
                        </div>
                    </Link>
                    
                    <div className="mt-4 text-center">
                        <h2 className="text-xl font-bold tracking-tight text-slate-900">
                            Hari<span className="text-orange-600">Sukan</span>
                        </h2>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium tracking-wide uppercase">
                            Platform Sukan Digital
                        </p>
                    </div>
                </div>

                <div className="w-full bg-white/80 backdrop-blur-xl border border-slate-100 p-8 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]">
                    {children}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[11px] font-medium text-slate-400 tracking-wider">
                        &copy; 2026 Hari Sukan Sekolah. Built for champions.
                    </p>
                </div>
            </div>
        </div>
    );
}
