export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center px-6 py-3 bg-white border-4 border-slate-900 rounded-xl font-black uppercase tracking-[0.2em] italic text-xs text-slate-900 transition-all duration-200 hover:bg-slate-50 focus:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-slate-100 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
