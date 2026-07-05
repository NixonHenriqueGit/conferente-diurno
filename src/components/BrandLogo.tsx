import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'icon-only' | 'header' | 'login';
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  textColor?: string;
}

export default function BrandLogo({
  variant = 'full',
  className = '',
  iconSize = 'md',
  textColor = 'text-[#0f35a9]'
}: BrandLogoProps) {
  
  // Icon sizes
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28'
  };

  const selectedSize = sizeClasses[iconSize];

  // SVG representation of the Pau Brasil speech-bubble + tree logo
  const logoIcon = (
    <svg 
      className={`${selectedSize} shrink-0`} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pau Brasil Logo Icon"
    >
      {/* Speech Bubble / Pin Background in Solid Ambev-style Vibrant Blue */}
      <path 
        d="M60 15C84.8528 15 105 35.1472 105 60C105 84.8528 84.8528 105 60 105C55.2536 105 50.7083 104.266 46.4384 102.909C38.653 100.435 30.6358 103.5 25.5 108.5C23.2 110.75 19.5 109.5 19.5 106.25C19.5 98.5 22.5 91.5 25.2104 85.8236C21.8906 78.5083 20 70.4363 20 60C20 35.1472 40.1472 15 60 15Z" 
        fill="#1e5bf2" 
      />
      
      {/* Stylized White Tree (Pau Brasil) */}
      {/* Tree Trunk */}
      <rect x="58" y="74" width="4" height="15" rx="1" fill="white" />
      
      {/* Tree Leaves Layers (Stacked horizontal curved bars tapering to the top) */}
      <path d="M60 30L38 48C43.5 48 51.5 45 60 45C68.5 45 76.5 48 82 48L60 30Z" fill="white" />
      <path d="M60 41L41 57C46.5 57 53.5 54 60 54C66.5 54 73.5 57 79 57L60 41Z" fill="white" />
      <path d="M60 51L44 66C49 66 55 63 60 63C65 63 71 66 76 66L60 51Z" fill="white" />
      <path d="M60 60L47 74C51.5 74 56.5 71 60 71C63.5 71 68.5 74 73 74L60 60Z" fill="white" />
      <path d="M60 69L50 81C54 81 58 78 60 78C62 78 66 81 70 81L60 69Z" fill="white" />
    </svg>
  );

  if (variant === 'icon-only') {
    return logoIcon;
  }

  if (variant === 'login') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`} id="brand_logo_login">
        <div className="bg-white p-2.5 rounded-2xl shadow-lg border border-slate-100 mb-4 hover:scale-105 transition-transform duration-300">
          {logoIcon}
        </div>
        <div className="font-sans leading-none flex flex-col items-center">
          <span className="text-3xl font-light tracking-wide text-slate-800">
            PAU <span className="font-black text-[#1e5bf2]">BRASIL</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#1e5bf2]/80 mt-2 block leading-none">
            distribuidora <span className="text-amber-500 font-extrabold">ambev</span>
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'header') {
    return (
      <div className={`flex items-center space-x-3 ${className}`} id="brand_logo_header">
        <div className="bg-white/10 p-1.5 rounded-lg border border-white/10 flex items-center justify-center">
          <svg 
            className="w-7 h-7" 
            viewBox="0 0 120 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M60 15C84.8528 15 105 35.1472 105 60C105 84.8528 84.8528 105 60 105C55.2536 105 50.7083 104.266 46.4384 102.909C38.653 100.435 30.6358 103.5 25.5 108.5C23.2 110.75 19.5 109.5 19.5 106.25C19.5 98.5 22.5 91.5 25.2104 85.8236C21.8906 78.5083 20 70.4363 20 60C20 35.1472 40.1472 15 60 15Z" 
              fill="#ffffff" 
            />
            <rect x="58" y="74" width="4" height="15" rx="1" fill="#1e5bf2" />
            <path d="M60 30L38 48C43.5 48 51.5 45 60 45C68.5 45 76.5 48 82 48L60 30Z" fill="#1e5bf2" />
            <path d="M60 41L41 57C46.5 57 53.5 54 60 54C66.5 54 73.5 57 79 57L60 41Z" fill="#1e5bf2" />
            <path d="M60 51L44 66C49 66 55 63 60 63C65 63 71 66 76 66L60 51Z" fill="#1e5bf2" />
            <path d="M60 60L47 74C51.5 74 56.5 71 60 71C63.5 71 68.5 74 73 74L60 60Z" fill="#1e5bf2" />
            <path d="M60 69L50 81C54 81 58 78 60 78C62 78 66 81 70 81L60 69Z" fill="#1e5bf2" />
          </svg>
        </div>
        <div className="leading-tight">
          <span className="font-sans font-light text-sm sm:text-base tracking-wide block text-white uppercase">
            PAU <span className="font-black text-amber-400">BRASIL</span>
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-slate-300 uppercase block leading-none">
            distribuidora <span className="text-amber-400 font-extrabold">ambev</span>
          </span>
        </div>
      </div>
    );
  }

  // Default 'full' variant (horizontal logo)
  return (
    <div className={`flex items-center space-x-4 ${className}`} id="brand_logo_full">
      {logoIcon}
      <div className="leading-tight">
        <span className="font-sans font-light text-2xl tracking-wide block text-slate-800">
          PAU <span className="font-black text-[#1e5bf2]">BRASIL</span>
        </span>
        <span className="font-sans text-[10px] uppercase font-bold tracking-[0.25em] text-[#1e5bf2]/80 mt-1 block leading-none">
          distribuidora <span className="text-amber-500 font-extrabold">ambev</span>
        </span>
      </div>
    </div>
  );
}
