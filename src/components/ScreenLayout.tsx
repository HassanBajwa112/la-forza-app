import type { ReactNode } from 'react';

export function ScreenLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full min-h-0 flex flex-col bg-gray-50">
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scroll-area overscroll-contain touch-pan-y pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))]">
        {children}
      </div>
    </div>
  );
}
