import type { ReactNode } from 'react';

/** Full-height screen shell with working vertical scroll inside the phone frame. */
export function ScreenLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`h-full min-h-0 flex flex-col ${className}`}>
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-area overscroll-contain touch-pan-y pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))]">
        {children}
      </div>
    </div>
  );
}
