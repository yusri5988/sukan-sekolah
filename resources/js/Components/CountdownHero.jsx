import Countdown from '@/Components/Countdown';

export default function CountdownHero({ meet }) {
    if (!meet) return null;

    return (
        <div className="relative group">
            {/* Background Decorative Text */}
            <div className="absolute -top-6 left-0 text-[8rem] md:text-[15rem] font-black text-slate-100/50 select-none pointer-events-none uppercase tracking-tighter italic leading-none z-0 overflow-hidden w-full whitespace-nowrap">
                SPIRIT
            </div>
            
            <div className="bg-slate-900 border-x-4 border-t-4 border-b-[12px] border-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl relative overflow-hidden z-10 transition-transform hover:scale-[1.01] duration-500">
                {/* High-Impact Gradient Accent */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600" />
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 space-y-10 md:space-y-16">
                    {/* Emphasized Hero Title Block */}
                    <div className="text-center space-y-2">
                        <span className="inline-block bg-orange-600 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.5em] px-4 py-1.5 rounded-full mb-4 shadow-lg shadow-orange-600/20">
                            LIVE COUNTDOWN
                        </span>
                        <h3 className="text-4xl md:text-9xl font-black italic uppercase tracking-tighter text-white leading-[0.85] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                            <span className="text-orange-500 block text-2xl md:text-5xl mb-2 tracking-[0.1em] not-italic font-black">COUNTDOWN</span>
                            {meet.name}
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-8 md:gap-12">
                        {/* Kejohanan Hero Box */}
                        {meet.date && (
                            <div className="relative">
                                <div className="absolute -top-3 -left-2 bg-orange-600 text-white text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-sm rotate-[-2deg] z-20 shadow-md">
                                    HARI KEJOHANAN
                                </div>
                                <div className="bg-slate-800/60 backdrop-blur-md border-2 border-white/10 p-6 md:p-10 rounded-[2rem] shadow-xl relative overflow-hidden group/box">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -translate-y-16 translate-x-16 transition-transform group-hover/box:scale-150" />
                                    <Countdown targetDate={meet.date} />
                                    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
                                        <div className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5">
                                            {new Date(meet.date).toLocaleDateString('ms-MY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Akan Datang</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Pendaftaran Hero Box */}
                        {meet.closing_date && (
                            <div className="relative">
                                <div className="absolute -top-3 -left-2 bg-slate-100 text-slate-900 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-sm rotate-[-2deg] z-20 shadow-md">
                                    PENYALURAN DATA
                                </div>
                                <div className="bg-slate-800/60 backdrop-blur-md border-2 border-white/10 p-6 md:p-10 rounded-[2rem] shadow-xl relative overflow-hidden group/box">
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 translate-x-16" />
                                    <Countdown targetDate={meet.closing_date} />
                                    <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
                                        <div className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5">
                                            {new Date(meet.closing_date).toLocaleDateString('ms-MY', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-2 text-red-500">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Tutup Pendaftaran</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
