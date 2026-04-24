import React from 'react';

function ApplicationLogo({ className = "w-10 h-10", ...props }) {
    return (
        <div className={`bg-slate-900 rounded-xl flex items-center justify-center shadow-2xl ${className}`} {...props}>
            <svg viewBox="0 0 24 24" fill="none" className="w-2/3 h-2/3 text-orange-500" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
    );
}

export default ApplicationLogo;
