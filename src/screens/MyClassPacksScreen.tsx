import { CLASS_PACKS, formatCurrency, formatDate } from '../data/workzishMockData';
import { useApp } from '../context/AppContext';
import { ScreenLayout } from '../components/ScreenLayout';
import { StatusPill } from '../components/workzish/MemberShell';

const statusMap = { active: 'Active', expired: 'Expired', cancelled: 'Cancelled' } as const;

export function MyClassPacksScreen() {
  const { showToast } = useApp();

  return (
    <ScreenLayout>
      <div className="px-4 py-5">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h1 className="text-2xl font-bold text-gray-900">My Class Packs</h1>
          <button type="button" onClick={() => showToast('Class pack request sent — staff will confirm shortly')} className="wz-btn-secondary text-xs !py-2 shrink-0">
            Assign New Class Pack
          </button>
        </div>

        {CLASS_PACKS.length === 0 ? (
          <div className="wz-card text-center py-10">
            <p className="text-sm font-semibold text-gray-900">You don&apos;t own any class packs yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {CLASS_PACKS.map((pack) => (
              <div key={pack.id} className="wz-card !p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{pack.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Expires {formatDate(pack.expiryDate)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StatusPill status={statusMap[pack.status]} />
                    {pack.trial && (
                      <span className="text-[10px] font-semibold uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Trial</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  {pack.credits === 'unlimited'
                    ? 'Unlimited credits'
                    : `${pack.creditsUsed} / ${pack.credits} credits used`}
                </p>
                {pack.dueAmount != null && pack.dueAmount > 0 && (
                  <p className="text-xs text-brand-600 font-semibold mt-2">Due: {formatCurrency(pack.dueAmount)}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ScreenLayout>
  );
}
