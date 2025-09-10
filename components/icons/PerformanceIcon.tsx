import React from 'react';

export const PerformanceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="m12 14 4-4"/>
        <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
        <path d="M12 22v-6"/>
    </svg>
);
