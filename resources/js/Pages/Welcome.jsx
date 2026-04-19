import { Head, Link } from '@inertiajs/react';

const Logo = ({ className = "w-10 h-10" }) => (
    <div className={`bg-slate-900 rounded-xl flex items-center justify-center shadow-2xl ${className}`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-2/3 h-2/3 text-orange-500" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    </div>
);

const FeatureBadge = ({ children, color = "orange" }) => {
    const colors = {
        orange: "bg-orange-600 text-white",
        red: "bg-red-600 text-white",
        blue: "bg-blue-700 text-white",
        slate: "bg-slate-900 text-white",
    };
    return (
        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded-md ${colors[color]}`}>
            {children}
        </span>
    );
};

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-600 selection:text-white font-sans scroll-smooth overflow-x-hidden">
            <Head title="HariSukan.pro | Semangat Membara, Keputusan Real-Time" />

            {/* Navbar - Clean & Functional */}
            <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Logo className="w-9 h-9" />
                        <span className="text-2xl font-black italic tracking-tighter uppercase leading-none">
                            Hari<span className="text-orange-600">Sukan</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-4 md:px-6 py-2 bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-lg hover:bg-orange-600 transition-all active:scale-95 shadow-xl shadow-slate-200"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-4 md:px-6 py-2.5 bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-lg hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 md:px-6 py-2.5 bg-orange-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-lg hover:bg-slate-900 transition-all active:scale-95 shadow-lg shadow-orange-100"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero - The "Burning Spirit" Vibe */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 bg-white border-b-8 border-slate-900 overflow-hidden">
                {/* Sports Background Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden uppercase font-black text-[20vw] leading-none text-slate-900 flex flex-col gap-0 items-center justify-center rotate-[-10deg]">
                    <div>Faster</div>
                    <div className="ml-40">Stronger</div>
                    <div>Higher</div>
                </div>

                <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-3 mb-8">
                                <div className="w-12 h-[2px] bg-slate-400" />
                                <span className="text-slate-400 text-sm font-black uppercase tracking-[0.3em]">Kecemerlangan Sukan Digital</span>
                            </div>
                            
                            <h1 className="text-6xl lg:text-[110px] font-black italic tracking-tighter leading-[0.85] text-slate-900 uppercase mb-8">
                                Semangat <span className="text-transparent stroke-text">Membara</span><br/>
                                Keputusan <span className="text-orange-600">Live!</span>
                            </h1>
                            
                            <p className="text-xl lg:text-2xl text-slate-700 font-bold max-w-2xl mb-10 leading-snug">
                                Urus acara, markah dan ranking rumah sukan dalam satu platform sahaja. Cikgu tak pening, ibu bapa pun happy.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <Link
                                    href={route('register')}
                                    className="px-10 py-5 bg-slate-900 text-white text-xl font-black uppercase tracking-widest italic rounded-xl hover:bg-orange-600 transition-all shadow-2xl hover:-translate-y-1 active:scale-95 text-center"
                                >
                                    Mula Sekarang
                                </Link>
                            </div>

                            <div className="flex items-center gap-8 border-t-2 border-slate-100 pt-8">
                                <div>
                                    <div className="text-3xl font-black text-slate-900">150+</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sekolah Aktif</div>
                                </div>
                                <div className="w-px h-8 bg-slate-200" />
                                <div>
                                    <div className="text-3xl font-black text-slate-900">Real-Time</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Update Keputusan</div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 relative">
                            {/* Scoreboard Mockup */}
                            <div className="relative z-20 bg-slate-900 rounded-3xl p-1 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] rotate-2 group hover:rotate-0 transition-all duration-500">
                                <div className="bg-slate-800 rounded-[22px] p-6 border border-white/10">
                                    <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-xs font-black uppercase tracking-widest text-white">Ranking Secara Langsung</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400">14 APR 2026 • 10:45 AM</span>
                                    </div>

                                    <div className="space-y-4">
                                    {[
                                        { r: 'Rumah Merah', p: '1,240', w: 'w-[95%]', c: 'bg-red-600' },
                                        { r: 'Rumah Biru', p: '1,120', w: 'w-[85%]', c: 'bg-blue-600' },
                                        { r: 'Rumah Kuning', p: '980', w: 'w-[75%]', c: 'bg-yellow-500' },
                                        { r: 'Rumah Hijau', p: '850', w: 'w-[65%]', c: 'bg-emerald-600' }
                                    ].map((house, i) => (
                                        <div key={i} className="relative">
                                            <div className="flex justify-between items-end mb-2">
                                                <span className="text-sm font-black uppercase text-white italic">{house.r}</span>
                                                <span className="text-lg font-black text-white tabular-nums">{house.p}</span>
                                            </div>
                                            <div className="h-3 bg-slate-700 rounded-full overflow-hidden p-0.5">
                                                <div className={`h-full ${house.c} rounded-full ${house.w} transition-all duration-1000 delay-300`} />
                                            </div>
                                        </div>
                                    ))}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Dikemaskini Automatik</span>
                                    </div>                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/20 blur-[80px] -z-10" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 blur-[80px] -z-10" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Marquee Style Banner */}
            <div className="bg-orange-600 py-4 overflow-hidden whitespace-nowrap border-y-4 border-slate-900">
                <div className="flex animate-marquee gap-12 items-center">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex items-center gap-12">
                            <span className="text-2xl font-black italic uppercase text-white tracking-tighter">Keputusan Real-Time</span>
                            <span className="text-2xl text-white opacity-50">•</span>
                            <span className="text-2xl font-black italic uppercase text-white tracking-tighter">Urus Atlet Mudah</span>
                            <span className="text-2xl text-white opacity-50">•</span>
                            <span className="text-2xl font-black italic uppercase text-white tracking-tighter">Ranking Automatik</span>
                            <span className="text-2xl text-white opacity-50">•</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Guru Section - High Visibility for Outdoor */}
            <section id="guru" className="py-24 lg:py-40 bg-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="aspect-[4/5] bg-slate-100 rounded-[2.5rem] overflow-hidden border-8 border-slate-900 shadow-2xl relative group">
                                <img 
                                    src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=1200" 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    alt="Teacher On Field"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                <div className="absolute bottom-10 left-10 right-10">
                                    <div className="bg-orange-600 text-white p-6 rounded-2xl shadow-xl">
                                        <div className="text-4xl font-black italic mb-1 uppercase tracking-tighter">80%</div>
                                        <div className="text-xs font-black uppercase tracking-widest opacity-90">Masa Dijimatkan Di Padang</div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative Lines */}
                            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-8 border-l-8 border-orange-600 -z-10" />
                        </div>

                        <div className="lg:pl-10">
                            <FeatureBadge color="orange">Untuk Cikgu</FeatureBadge>
                            <h2 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter text-slate-900 mt-6 mb-8 leading-[0.9]">
                                Padang Panas,<br/>
                                <span className="text-orange-600">Kerja Senang.</span>
                            </h2>
                            <p className="text-xl text-slate-600 font-bold mb-10 leading-relaxed">
                                Kami tahu kepenatan di padang. Sistem ini dibina untuk kegunaan satu tangan — masukkan skor sepantas kilat, markah terus masuk ke pangkalan data.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { t: "UI Mesra Mobile", d: "Butang besar, tulisan jelas. Mudah diguna di bawah terik matahari." },
                                    { t: "Auto-Kiraan Markah", d: "Tak perlu kalkulator. Sistem urus semua formula markah." },
                                    { t: "Offline Mode Ready", d: "Internet sangkut? Data disimpan dan di-sync bila online semula." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 p-6 rounded-2xl bg-slate-50 border-2 border-slate-100 hover:border-orange-600 transition-colors group">
                                        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-colors shrink-0">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black italic uppercase text-slate-900 mb-1 tracking-tight">{item.t}</h4>
                                            <p className="text-slate-500 font-bold text-sm">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Parents - The Emotional Connector */}
            <section id="ibubapa" className="py-24 lg:py-40 bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="lg:max-w-2xl">
                            <FeatureBadge color="blue">Untuk Ibu Bapa</FeatureBadge>
                            <h2 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter text-white mt-6 mb-8 leading-[0.9]">
                                Beri Sokongan<br/>
                                <span className="text-blue-500 underline decoration-4 underline-offset-8">Dari Mana Sahaja.</span>
                            </h2>
                            <p className="text-xl text-slate-400 font-bold mb-10 leading-relaxed">
                                Tak dapat hadir ke sekolah? Jangan risau. Ibu bapa boleh ikuti setiap kejayaan anak melalui kemaskini live terus ke telefon pintar.
                            </p>
                            
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-blue-500 font-black italic text-4xl mb-4 leading-none">01</div>
                                    <h4 className="text-white font-black uppercase tracking-widest text-lg mb-2 italic">Jadual Live</h4>
                                    <p className="text-slate-500 text-sm font-bold">Tahu bila anak anda akan bertanding.</p>
                                </div>
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="text-orange-500 font-black italic text-4xl mb-4 leading-none">02</div>
                                    <h4 className="text-white font-black uppercase tracking-widest text-lg mb-2 italic">Push Notification</h4>
                                    <p className="text-slate-500 text-sm font-bold">Dapat info kemenangan serta-merta.</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                             <div className="w-[300px] h-[600px] bg-slate-800 rounded-[3rem] border-8 border-slate-700 shadow-2xl overflow-hidden relative group">
                                <img 
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2s]"
                                    alt="Live App on Phone"
                                />
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <div className="bg-white p-4 rounded-2xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                                            </div>
                                            <span className="text-xs font-black uppercase text-slate-900">Keputusan Baru!</span>
                                        </div>
                                        <div className="text-sm font-bold text-slate-600 italic">Anak anda memenangi Emas dalam acara 100m (L1)! 🥇</div>
                                    </div>
                                </div>
                             </div>
                             {/* Floating Labels */}
                             <div className="absolute -right-8 top-20 bg-blue-600 text-white px-6 py-3 rounded-xl font-black italic uppercase text-xs shadow-xl animate-bounce">
                                Live Score
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* School Section - Professional & Reliable */}
            <section id="sekolah" className="py-24 lg:py-40 bg-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="text-center mb-20">
                        <FeatureBadge color="slate">Pihak Sekolah</FeatureBadge>
                        <h2 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter text-slate-900 mt-6 mb-6">
                            Profesionalisme <span className="text-blue-700 underline decoration-8 decoration-slate-900/10">Digital.</span>
                        </h2>
                        <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto italic">
                            Satu sekolah, satu ekosistem. Bersih, teratur dan selamat. 
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                h: "Data Terasing",
                                d: "Setiap sekolah mempunyai pengasingan data total. Selamat dan sulit.",
                                i: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            },
                            {
                                h: "Sijil Digital",
                                d: "Jana sijil pemenang secara automatik sebaik sahaja acara tamat. Jimat kos cetakan.",
                                i: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            },
                            {
                                h: "Laporan Penuh",
                                d: "Dapatkan analisis prestasi rumah sukan dan murid dengan satu klik sahaja.",
                                i: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            }
                        ].map((card, i) => (
                            <div key={i} className="bg-slate-50 border-4 border-slate-900 p-10 rounded-[2rem] hover:-translate-y-2 transition-transform shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                                <div className="w-16 h-16 bg-slate-900 text-orange-500 rounded-2xl flex items-center justify-center mb-8">
                                    {card.i}
                                </div>
                                <h3 className="text-2xl font-black italic uppercase text-slate-900 mb-4 tracking-tight">{card.h}</h3>
                                <p className="text-slate-600 font-bold leading-relaxed">{card.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA - Final Push */}
            <section className="py-24 px-4 lg:px-8 bg-white border-t-8 border-slate-900">
                <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] p-12 lg:p-32 text-center relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 to-blue-600/30 blur-3xl" />
                    
                    <div className="relative z-10">
                        <h2 className="text-5xl lg:text-[100px] font-black italic uppercase tracking-tighter text-white leading-[0.85] mb-12">
                            Masa Depan Sukan Sekolah <span className="text-orange-600">Bermula Sini.</span>
                        </h2>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                href={route('register')}
                                className="px-12 py-6 bg-white text-slate-900 text-2xl font-black italic uppercase tracking-widest rounded-2xl hover:bg-orange-600 hover:text-white transition-all shadow-2xl active:scale-95"
                            >
                                Daftar Sekarang
                            </Link>
                            <Link
                                href={route('login')}
                                className="px-12 py-6 bg-slate-800 text-white border-4 border-white/20 text-2xl font-black italic uppercase tracking-widest rounded-2xl hover:bg-slate-700 transition-all active:scale-95"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                        
                        <p className="mt-16 text-slate-500 font-black uppercase tracking-[0.5em] text-xs">
                            Trusted by 150+ Schools Nationwide
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b-4 border-slate-100 pb-16">
                        <div className="flex items-center gap-3">
                            <Logo className="w-12 h-12" />
                            <div className="flex flex-col">
                                <span className="text-3xl font-black italic tracking-tighter uppercase leading-none">
                                    Hari<span className="text-orange-600">Sukan</span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Digital Solutions</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-12 text-sm font-black uppercase tracking-widest italic text-slate-400">
                            <a href="#" className="hover:text-slate-900 transition-colors">Twitter</a>
                            <a href="#" className="hover:text-slate-900 transition-colors">Facebook</a>
                            <a href="#" className="hover:text-slate-900 transition-colors">Instagram</a>
                        </div>
                    </div>
                    
                    <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                            © 2026 Sistem Hari Sukan Sekolah. Built for speed.
                        </p>
                        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Injected CSS for custom effects */}
            <style dangerouslySetInnerHTML={{ __html: `
                .stroke-text {
                    -webkit-text-stroke: 2px #0f172a;
                    color: transparent;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                    display: flex;
                    width: fit-content;
                }
            `}} />
        </div>
    );
}
