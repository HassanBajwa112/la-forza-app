import { useState } from 'react';
import { GYM_INFO } from '../data/mockData';

type LaForzaLogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showRing?: boolean;
};

const sizes = {
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-28 h-28',
};

export function LaForzaLogo({ size = 'md', className = '', showRing = true }: LaForzaLogoProps) {
  const [src, setSrc] = useState(GYM_INFO.logoUrl);

  const ring = showRing
    ? 'rounded-2xl border-2 border-forza-red/45 bg-forza-card card-glow'
    : 'rounded-full';

  return (
    <img
      src={src}
      alt={`${GYM_INFO.name} logo`}
      referrerPolicy="no-referrer"
      onError={() => {
        if (src !== GYM_INFO.logoFallback) setSrc(GYM_INFO.logoFallback);
      }}
      className={`${sizes[size]} ${ring} object-cover ${className}`}
    />
  );
}
