import { GYM_INFO } from '../data/mockData';

type LaForzaLogoProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showRing?: boolean;
};

const sizes = {
  sm: 40,
  md: 64,
  lg: 96,
  xl: 112,
};

/** Official @laforzagyms profile photo — used as-is, no recreation or scaling. */
export function LaForzaLogo({ size = 'md', className = '', showRing = true }: LaForzaLogoProps) {
  const px = sizes[size];

  return (
    <img
      src={GYM_INFO.logoUrl}
      alt={`${GYM_INFO.name} logo`}
      className={`inline-block shrink-0 rounded-full object-cover ${
        showRing ? 'ring-2 ring-forza-red/25 shadow-lg shadow-forza-red/15' : ''
      } ${className}`}
      style={{ width: px, height: px }}
      draggable={false}
    />
  );
}
