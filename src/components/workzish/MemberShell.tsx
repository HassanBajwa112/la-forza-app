import type { ReactNode } from 'react';
import { MEMBER } from '../../data/workzishMockData';

export type MemberTab = 'dashboard' | 'bookings' | 'classes' | 'packs' | 'profile';

export type OverlayScreen = 'book-now' | 'class-reserve' | 'contact' | 'change-password' | null;

const tabs: { id: MemberTab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'bookings', label: 'My Bookings', icon: 'bookings' },
  { id: 'classes', label: 'My Classes', icon: 'classes' },
  { id: 'packs', label: 'My Class Packs', icon: 'packs' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
];

function TabIcon({ type, active }: { type: string; active: boolean }) {
  const color = active ? 'text-brand-500' : 'text-gray-400';
  const props = { className: `w-5 h-5 ${color}`, fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.75 };

  if (type === 'dashboard') {
    return (
      <svg {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
      </svg>
    );
  }
  if (type === 'bookings') {
    return (
      <svg {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    );
  }
  if (type === 'classes') {
    return (
      <svg {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    );
  }
  if (type === 'packs') {
    return (
      <svg {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-17.5 0V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 0113.048 0c1.131.094 1.976 1.057 1.976 2.192V13.5" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

export function MemberBottomNav({ active, onChange }: { active: MemberTab; onChange: (t: MemberTab) => void }) {
  return (
    <nav className="shrink-0 z-50 border-t border-gray-200 bg-white">
      <div className="flex items-end justify-between px-1 pt-1.5 pb-1">
        {tabs.map(({ id, label, icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-1 flex-col items-center gap-0.5 py-1 min-w-0 ${isActive ? 'text-brand-500' : 'text-gray-500'}`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${isActive ? 'bg-brand-50' : ''}`}>
                <TabIcon type={icon} active={isActive} />
              </div>
              <span className="text-[8px] font-semibold truncate max-w-full px-0.5 leading-tight text-center">{label}</span>
            </button>
          );
        })}
      </div>
      <div className="flex justify-center pb-[max(6px,env(safe-area-inset-bottom))] pt-0.5">
        <div className="h-1 w-[100px] rounded-full bg-gray-200" />
      </div>
    </nav>
  );
}

export function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: 'bg-success-50 text-success-700 border-success-500/20',
    Confirmed: 'bg-success-50 text-success-700 border-success-500/20',
    Pending: 'bg-amber-50 text-amber-700 border-amber-500/20',
    Upcoming: 'bg-brand-50 text-brand-600 border-brand-500/20',
    Completed: 'bg-gray-100 text-gray-600 border-gray-200',
    Cancelled: 'bg-error-50 text-error-600 border-error-500/20',
    Expired: 'bg-gray-100 text-gray-500 border-gray-200',
    Rejected: 'bg-error-50 text-error-600 border-error-500/20',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles[status] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  );
}

export function WorkzishTopBar({
  onOpenHomePicker,
  onOpenProfile,
}: {
  onOpenHomePicker: () => void;
  onOpenProfile: () => void;
  children?: ReactNode;
}) {
  return (
    <header className="shrink-0 z-40 border-b border-gray-200 bg-white px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onOpenHomePicker} className="flex items-center gap-2 min-w-0 text-left">
          <img src="/la-forza-logo.png" alt="La Forza" className="h-8 w-8 rounded-full object-cover shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">La Forza</p>
            <p className="text-[10px] text-gray-500 truncate">Member Portal</p>
          </div>
        </button>
        <button
          type="button"
          onClick={onOpenProfile}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-600 text-sm font-bold shrink-0"
        >
          {MEMBER.avatarInitial}
        </button>
      </div>
    </header>
  );
}
