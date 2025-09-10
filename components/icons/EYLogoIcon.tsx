import React from 'react';

export const EYLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Sol süslü parantez { */}
    <path d="M8 4 
             C6 6, 6 8, 8 10 
             L8 14
             C6 16, 6 18, 8 20" />
    {/* Sağ süslü parantez } */}
    <path d="M16 4 
             C18 6, 18 8, 16 10 
             L16 14
             C18 16, 18 18, 16 20" />
  </svg>
);
