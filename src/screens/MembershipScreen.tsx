import { useState } from 'react';
import { Check, Snowflake, Star, Dumbbell, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIERS, TRAINERS, formatPrice } from '../data/mockData';
import { formatDate } from '../data/workzishMockData';
import { ScreenLayout } from '../components/ScreenLayout';
import { StatusPill } from '../components/workzish/MemberShell';
import { WzModal } from '../components/workzish/WzModal';

export function MembershipScreen() {
  const {
    subscription,
    addOns,
    assignedTrainer,
    freezeSubscription,
    unfreezeSubscription,
    upgradeTier,
    toggleAddOn,
    assignTrainer,
  } = useApp();

  const [showFreeze, setShowFreeze] = useState(false);
  const [showTrainer, setShowTrainer] = useState(false);
  const [freezeDays, setFreezeDays] = useState(14);

  const current = TIERS[subscription.tier];
  const other = subscription.tier === 'essentials' ? TIERS.elite : TIERS.essentials;
  const totalMonthly =
    subscription.monthlyPrice + addOns.filter((a) => a.active).reduce((s, a) => s + a.price, 0);

  const handleFreeze = () => {
    const until = new Date();
    until.setDate(until.getDate() + freezeDays);
    freezeSubscription(until.toISOString().split('T')[0]);
    setShowFreeze(false);
  };

  return (
    <div className="relative h-full min-h-0 flex flex-col">
      <ScreenLayout>
        <div className="px-4 py-5 space-y-5">
          <header>
            <h1 className="text-2xl font-bold text-gray-900">Membership</h1>
            <p className="text-sm text-gray-500 mt-1">Manage plan, add-ons & billing</p>
          </header>

          <section className="wz-card !p-5 border-brand-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Current Plan</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{current.name}</p>
                <p className="text-xs text-gray-500">{current.subtitle}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-brand-600">{formatPrice(subscription.monthlyPrice)}</p>
                <p className="text-xs text-gray-500">per month</p>
              </div>
            </div>

            {subscription.isFrozen && (
              <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                <Snowflake size={18} className="text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Membership Frozen</p>
                  <p className="text-xs text-gray-500">Until {formatDate(subscription.frozenUntil!)}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Start</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{formatDate(subscription.startDate)}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">End</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{formatDate(subscription.endDate)}</p>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              {current.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check size={14} className="text-success-600 shrink-0" /> {f}
                </li>
              ))}
              {current.excluded.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-400 line-through">
                  <Check size={14} className="shrink-0 opacity-30" /> {f}
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => (subscription.isFrozen ? unfreezeSubscription() : setShowFreeze(true))}
              className="wz-btn-secondary w-full text-sm flex items-center justify-center gap-2"
            >
              <Snowflake size={16} />
              {subscription.isFrozen ? 'Unfreeze Now' : 'Freeze Membership'}
            </button>
          </section>

          {subscription.tier !== other.id && (
            <section className="wz-card !p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase bg-brand-500 text-white px-2 py-0.5 rounded-full">Popular</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{other.name}</p>
              <p className="text-sm text-gray-500">{other.subtitle} · {formatPrice(other.price)}/mo</p>
              <button type="button" onClick={() => upgradeTier(other.id)} className="wz-btn-primary w-full mt-4 text-sm">
                Upgrade to {other.name}
              </button>
            </section>
          )}

          <section>
            <h2 className="wz-section-title">Premium Add-ons</h2>
            <div className="space-y-3">
              {addOns.map((addon) => (
                <div key={addon.id} className="wz-card !p-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                        {addon.icon === 'boxing' ? <Dumbbell size={18} className="text-brand-500" /> : <User size={18} className="text-brand-500" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{addon.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{addon.description}</p>
                        {addon.id === 'pt' && assignedTrainer && (
                          <p className="text-xs text-brand-600 font-semibold mt-1">Trainer: {assignedTrainer.name}</p>
                        )}
                      </div>
                    </div>
                    <StatusPill status={addon.active ? 'Active' : 'Pending'} />
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm font-bold text-brand-600">{formatPrice(addon.price)}<span className="text-xs font-normal text-gray-500">{addon.period}</span></p>
                    <div className="flex gap-2">
                      {addon.id === 'pt' && (
                        <button type="button" onClick={() => setShowTrainer(true)} className="wz-btn-secondary text-xs !py-1.5">
                          {assignedTrainer ? 'Change' : 'Assign'}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleAddOn(addon.id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${addon.active ? 'bg-gray-100 text-gray-600' : 'bg-brand-500 text-white'}`}
                      >
                        {addon.active ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="wz-card !p-5">
            <p className="text-sm font-semibold text-gray-900 mb-3">Monthly Total</p>
            <div className="space-y-2 text-sm mb-3">
              <div className="flex justify-between"><span className="text-gray-500">{current.name}</span><span className="font-medium">{formatPrice(subscription.monthlyPrice)}</span></div>
              {addOns.filter((a) => a.active).map((a) => (
                <div key={a.id} className="flex justify-between"><span className="text-gray-500">{a.name}</span><span className="font-medium">{formatPrice(a.price)}</span></div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-brand-600">{formatPrice(totalMonthly)}</span>
            </div>
          </section>
        </div>
      </ScreenLayout>

      <WzModal open={showFreeze} onClose={() => setShowFreeze(false)} title="Freeze Membership">
        <p className="text-sm text-gray-500 mb-4">Pause your membership. Your end date extends by the freeze period.</p>
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[7, 14, 30, 60].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setFreezeDays(d)}
              className={`py-2.5 rounded-xl text-xs font-semibold border ${freezeDays === d ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-gray-200 text-gray-600'}`}
            >
              {d}d
            </button>
          ))}
        </div>
        <button type="button" onClick={handleFreeze} className="wz-btn-primary w-full flex items-center justify-center gap-2">
          <Snowflake size={16} /> Confirm Freeze
        </button>
      </WzModal>

      <WzModal open={showTrainer} onClose={() => setShowTrainer(false)} title="Choose Trainer" tall>
        <div className="space-y-3">
          {TRAINERS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => { assignTrainer(t); setShowTrainer(false); }}
              className={`w-full text-left rounded-xl border p-4 ${assignedTrainer?.id === t.id ? 'border-brand-500 bg-brand-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">{t.avatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.specialty}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={11} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs text-gray-600">{t.rating} · {t.sessions} sessions</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-brand-600">{formatPrice(t.price)}</p>
              </div>
            </button>
          ))}
        </div>
      </WzModal>
    </div>
  );
}
