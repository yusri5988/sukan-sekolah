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
                `relative inline-flex items-center justify-center px-8 py-4 bg-slate-900 border border-transparent rounded-2xl font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/10 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none group ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
    );
}
