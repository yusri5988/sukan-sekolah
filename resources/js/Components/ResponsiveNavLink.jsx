import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-8 py-4 pe-4 ps-3 ${
                active
                    ? 'border-orange-600 bg-orange-50 text-orange-600'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
            } text-xs font-black italic uppercase tracking-[0.2em] transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
