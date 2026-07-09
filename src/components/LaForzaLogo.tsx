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

/** HD vector logo — white circle + red La Forza mark (matches @laforzagyms branding). */
export function LaForzaLogo({ size = 'md', className = '', showRing = true }: LaForzaLogoProps) {
  const px = sizes[size];

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ${
        showRing ? 'ring-2 ring-forza-red/30 shadow-lg shadow-black/40' : ''
      } ${className}`}
      style={{ width: px, height: px }}
      role="img"
      aria-label={`${GYM_INFO.name} logo`}
    >
      <img
        src={GYM_INFO.logoFallback}
        alt=""
        className="h-[88%] w-[88%] object-contain"
        draggable={false}
      />
    </div>
  );
}
