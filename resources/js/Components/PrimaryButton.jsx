export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-6 py-3 bg-slate-900 border-4 border-slate-900 rounded-xl font-black uppercase tracking-[0.2em] italic text-xs text-white transition-all duration-200 hover:bg-orange-600 hover:border-orange-600 focus:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-600/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-slate-200 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
