import type { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-0 sm:p-6 lg:p-10">
      <div className="hidden lg:flex fixed top-8 left-8 right-8 items-center justify-between z-50 pointer-events-none">
        <div className="flex items-center gap-3">
          <img src="/la-forza-logo.png" alt="La Forza" className="h-10 w-10 rounded-full object-cover" />
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Workzish Member</p>
            <p className="text-gray-900 text-lg font-bold mt-0.5">La Forza Gyms</p>
          </div>
        </div>
        <span className="text-gray-500 text-xs font-medium">laforza.workzish.com</span>
      </div>

      <div className="relative w-full max-w-[390px] h-[100dvh] sm:h-[844px] sm:rounded-[2.75rem] sm:border-2 sm:border-gray-200 bg-white overflow-hidden shadow-card-hover flex flex-col">
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-7 bg-white rounded-b-2xl z-50 border-b border-gray-200" />

        <div className="absolute top-0 left-0 right-0 h-11 z-40 flex items-end justify-between px-7 pb-1 pointer-events-none">
          <span className="text-gray-900 text-xs font-semibold">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-[2px]">
              {[3, 3, 2, 1].map((h, i) => (
                <div key={i} className="w-[3px] bg-gray-900 rounded-sm" style={{ height: h * 3 }} />
              ))}
            </div>
            <div className="w-6 h-3 border border-gray-900/70 rounded-[3px] relative ml-1">
              <div className="absolute inset-[2px] right-[3px] bg-gray-900/90 rounded-[1px]" />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex-1 min-h-0 flex flex-col pt-11">
          {children}
        </div>
      </div>
    </div>
  );
}
