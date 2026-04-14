export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-6 py-3 bg-red-600 border-4 border-red-600 rounded-xl font-black uppercase tracking-[0.2em] italic text-xs text-white transition-all duration-200 hover:bg-red-700 hover:border-red-700 focus:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-600/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-red-100 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
