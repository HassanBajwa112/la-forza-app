import { MEMBER_CLASSES, formatCurrency, formatDate } from '../data/workzishMockData';
import { ScreenLayout } from '../components/ScreenLayout';
import { StatusPill } from '../components/workzish/MemberShell';

const statusMap = {
  confirmed: 'Confirmed',
  pending: 'Pending',
  cancelled: 'Cancelled',
  rejected: 'Rejected',
} as const;

export function MyClassesScreen({ onReserve }: { onReserve?: () => void }) {
  return (
    <ScreenLayout>
      <div className="px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
          {onReserve && (
            <button type="button" onClick={onReserve} className="wz-btn-primary text-xs !py-2">
              Reserve Now
            </button>
          )}
        </div>

        {MEMBER_CLASSES.length === 0 ? (
          <div className="wz-card text-center py-10">
            <p className="text-sm font-semibold text-gray-900">You haven&apos;t booked any classes yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {MEMBER_CLASSES.map((c) => (
              <div key={c.id} className="wz-card !p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{c.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{formatDate(c.date)} · {c.time}</p>
                    {c.paidWithPack && (
                      <span className="inline-block mt-2 text-[10px] font-semibold uppercase text-success-600 bg-success-50 px-2 py-0.5 rounded-full">
                        Paid with pack
                      </span>
                    )}
                  </div>
                  <StatusPill status={statusMap[c.status]} />
                </div>
                {c.dueAmount != null && c.dueAmount > 0 && (
                  <p className="text-xs text-brand-600 font-semibold mt-3 pt-2 border-t border-gray-100">
                    Due: {formatCurrency(c.dueAmount)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ScreenLayout>
  );
}
