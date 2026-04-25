import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;

    if (!flash?.success && !flash?.error) return null;

    const isSuccess = !!flash.success;
    const message = flash.success || flash.error;

    return (
        <div
            className={`flex items-center gap-4 p-6 rounded-3xl shadow-sm animate-in fade-in slide-in-from-top-4 duration-500 ${
                isSuccess
                    ? 'bg-emerald-50 border border-emerald-100'
                    : 'bg-red-50 border border-red-100'
            }`}
        >
            <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${
                    isSuccess
                        ? 'bg-emerald-500 shadow-emerald-200'
                        : 'bg-red-500 shadow-red-200'
                }`}
            >
                {isSuccess ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                )}
            </div>
            <div>
                <div
                    className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${
                        isSuccess ? 'text-emerald-600' : 'text-red-600'
                    }`}
                >
                    {isSuccess ? 'Berjaya' : 'Ralat'}
                </div>
                <p
                    className={`text-sm font-bold italic ${
                        isSuccess ? 'text-emerald-900' : 'text-red-900'
                    }`}
                >
                    {message}
                </p>
            </div>
        </div>
    );
}
