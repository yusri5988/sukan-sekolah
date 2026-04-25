import { useEffect, useState } from 'react';

export default function PwaInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShow(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setShow(false);
        }

        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setShow(false);
        setDeferredPrompt(null);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-20 sm:bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm z-[100] animate-in slide-in-from-bottom duration-300">
            <div className="bg-slate-900 border-2 border-orange-600 rounded-2xl p-4 shadow-[8px_8px_0px_0px_rgba(234,88,12,0.3)]">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                        </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-black italic text-white uppercase tracking-tight">Pasang HariSukan</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">Akses pantas dari skrin utama</p>
                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={handleInstall}
                                className="px-4 py-2 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest italic rounded-lg hover:bg-orange-700 transition-all active:scale-95"
                            >
                                Pasang
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="px-4 py-2 bg-white/10 text-slate-300 text-[10px] font-black uppercase tracking-widest italic rounded-lg hover:bg-white/20 transition-all active:scale-95"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
