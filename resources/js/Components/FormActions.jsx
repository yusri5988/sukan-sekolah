import { Link } from '@inertiajs/react';

export default function FormActions({ processing, submitLabel = 'HANTAR', processingLabel = 'MEMPROSES...', cancelRoute }) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 sm:gap-6 pt-6 sm:pt-10 border-t-2 sm:border-t-4 border-slate-50">
            {cancelRoute && (
                <Link
                    href={cancelRoute}
                    className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-white border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black uppercase tracking-widest italic text-slate-900 hover:bg-slate-50 transition-all active:scale-95 text-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
                >
                    Batal
                </Link>
            )}
            <button
                type="submit"
                disabled={processing}
                className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-orange-600 text-white border-2 sm:border-4 border-slate-900 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-black uppercase tracking-widest italic hover:bg-slate-900 transition-all active:scale-95 disabled:opacity-50 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
            >
                {processing ? processingLabel : submitLabel}
            </button>
        </div>
    );
}
