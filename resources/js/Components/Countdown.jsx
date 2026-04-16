import { useEffect, useState } from 'react';

export default function Countdown({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        if (!targetDate) return;

        const target = new Date(targetDate).getTime();

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = target - now;

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!targetDate) return null;

    return (
        <div className="grid grid-cols-4 gap-2 md:gap-4">
            <div className="bg-slate-900 border border-white/5 p-3 md:p-6 rounded-2xl text-center shadow-inner">
                <div className="text-3xl md:text-5xl font-black text-white tabular-nums leading-none mb-1 md:mb-2">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Hari</div>
            </div>
            <div className="bg-slate-900 border border-white/5 p-3 md:p-6 rounded-2xl text-center shadow-inner">
                <div className="text-3xl md:text-5xl font-black text-white tabular-nums leading-none mb-1 md:mb-2">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Jam</div>
            </div>
            <div className="bg-slate-900 border border-white/5 p-3 md:p-4 rounded-2xl text-center shadow-inner">
                <div className="text-3xl md:text-5xl font-black text-white tabular-nums leading-none mb-1 md:mb-2">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Minit</div>
            </div>
            <div className="bg-slate-900 border border-white/5 p-3 md:p-4 rounded-2xl text-center shadow-inner">
                <div className="text-3xl md:text-5xl font-black text-orange-500 tabular-nums leading-none mb-1 md:mb-2 drop-shadow-[0_0_10px_rgba(234,88,12,0.3)]">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Saat</div>
            </div>
        </div>
    );
}
