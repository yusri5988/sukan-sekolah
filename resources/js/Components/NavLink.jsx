import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 text-xs font-black uppercase tracking-widest italic leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-b-4 border-orange-600 text-slate-900'
                    : 'border-b-4 border-transparent text-slate-400 hover:text-slate-900 hover:border-slate-200 focus:text-slate-900 focus:border-slate-200') +
                className
            }
        >
            {children}
        </Link>
    );
}
