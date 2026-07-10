import { useState } from 'react';
import { BOOKINGS, formatCurrency, formatDate } from '../data/workzishMockData';
import type { BookingStatus } from '../data/workzishMockData';
import { ScreenLayout } from '../components/ScreenLayout';
import { StatusPill } from '../components/workzish/MemberShell';

const filters: { id: 'all' | BookingStatus; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const statusLabel: Record<BookingStatus, string> = {
  pending: 'Pending',
  upcoming: 'Upcoming',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function MyBookingsScreen() {
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');
  const items = filter === 'all' ? BOOKINGS : BOOKINGS.filter((b) => b.status === filter);

  return (
    <ScreenLayout>
      <div className="px-4 py-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Bookings</h1>

        <div className="flex gap-2 overflow-x-auto scroll-area pb-1 mb-5 -mx-1 px-1">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold border transition-colors ${
                filter === f.id
                  ? 'bg-brand-500 border-brand-500 text-white'
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="wz-card text-center py-10">
            <p className="text-sm font-semibold text-gray-900">No bookings found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((b) => (
              <div key={b.id} className="wz-card !p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{b.space}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{formatDate(b.date)} · {b.time}</p>
                  </div>
                  <StatusPill status={statusLabel[b.status]} />
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-gray-100">
                  <span className="text-gray-500">Paid: <span className="font-semibold text-gray-900">{formatCurrency(b.paid)}</span></span>
                  {b.remaining > 0 && (
                    <span className="text-brand-600 font-semibold">Remaining: {formatCurrency(b.remaining)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScreenLayout>
  );
}
