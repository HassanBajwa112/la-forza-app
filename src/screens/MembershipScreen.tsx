import { useState, type ReactNode } from 'react';
import { Check, Snowflake, Flame, Dumbbell, User, X, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIERS, TRAINERS } from '../data/mockData';
import { ScreenLayout } from '../components/ScreenLayout';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatPrice(n: number) {
  return `PKR ${n.toLocaleString()}`;
}

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

  const [showFreezeModal, setShowFreezeModal] = useState(false);
  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const [freezeDays, setFreezeDays] = useState(14);

  const currentTier = TIERS[subscription.tier];
  const otherTier = subscription.tier === 'essentials' ? TIERS.elite : TIERS.essentials;

  const handleFreeze = () => {
    const until = new Date();
    until.setDate(until.getDate() + freezeDays);
    freezeSubscription(until.toISOString().split('T')[0]);
    setShowFreezeModal(false);
  };

  const totalMonthly =
    subscription.monthlyPrice + addOns.filter((a) => a.active).reduce((s, a) => s + a.price, 0);

  return (
    <div className="h-full min-h-0 flex flex-col relative">
      <ScreenLayout>
        <div className="px-5 pb-6 relative">
      <header className="pt-4 pb-5">
        <h1 className="screen-header">Membership</h1>
        <p className="screen-subtitle">Manage plan, add-ons & billing</p>
      </header>

      {/* Current plan */}
      <section className="bg-forza-white border border-forza-red/25 rounded-2xl p-5 mb-5 card-glow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-forza-red text-[10px] uppercase tracking-[0.2em] font-bold">Current Plan</p>
            <p className="font-display text-2xl font-bold text-forza-red mt-1">{currentTier.name}</p>
            <p className="text-forza-red/50 text-xs">{currentTier.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-forza-red text-2xl font-bold">{formatPrice(subscription.monthlyPrice)}</p>
            <p className="text-forza-red/50 text-[10px]">per month</p>
          </div>
        </div>

        {subscription.isFrozen && (
          <div className="flex items-center gap-3 bg-forza-red/10 border border-forza-red/20 rounded-xl p-3.5 mb-4">
            <Snowflake size={18} className="text-forza-red/75 shrink-0" />
            <div>
              <p className="text-forza-red/75 text-sm font-semibold">Membership Frozen</p>
              <p className="text-forza-red/50 text-[11px]">Until {formatDate(subscription.frozenUntil!)}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-forza-red/5 rounded-xl p-3.5">
            <p className="text-forza-red/50 text-[10px] uppercase tracking-wider">Start</p>
            <p className="text-forza-red text-sm font-semibold mt-1">{formatDate(subscription.startDate)}</p>
          </div>
          <div className="bg-forza-red/5 rounded-xl p-3.5">
            <p className="text-forza-red/50 text-[10px] uppercase tracking-wider">End</p>
            <p className="text-forza-red text-sm font-semibold mt-1">{formatDate(subscription.endDate)}</p>
          </div>
        </div>

        <ul className="space-y-2 mb-5">
          {currentTier.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-xs text-forza-red/85">
              <Check size={14} className="text-forza-red shrink-0" /> {f}
            </li>
          ))}
          {currentTier.excluded.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-xs text-forza-red/50 line-through">
              <X size={14} className="shrink-0" /> {f}
            </li>
          ))}
        </ul>

        {!subscription.isFrozen ? (
          <button
            onClick={() => setShowFreezeModal(true)}
            className="w-full btn-ghost rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2"
          >
            <Snowflake size={16} className="text-forza-red/75" /> Freeze Membership
          </button>
        ) : (
          <button
            onClick={unfreezeSubscription}
            className="w-full py-3 rounded-xl bg-forza-red/15 border border-forza-red/25 text-forza-red/75 text-sm font-semibold"
          >
            Unfreeze Now
          </button>
        )}
      </section>

      {/* Upgrade */}
      <section className="mb-5">
        <h2 className="section-title">
          {subscription.tier === 'essentials' ? 'Upgrade Plan' : 'Switch Plan'}
        </h2>
        <div className="info-card">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-display text-lg font-bold text-forza-red">{otherTier.name}</p>
                {otherTier.id === 'elite' && (
                  <span className="px-2 py-0.5 rounded-full bg-forza-red/20 text-forza-red text-[10px] font-bold">POPULAR</span>
                )}
              </div>
              <p className="text-forza-red/50 text-xs mt-0.5">{otherTier.subtitle}</p>
            </div>
            <p className="text-forza-red font-bold text-lg">{formatPrice(otherTier.price)}<span className="text-forza-red/50 text-[10px] font-normal">/mo</span></p>
          </div>

          {otherTier.id === 'elite' && (
            <div className="flex items-center gap-2.5 bg-forza-red/5 border border-forza-red/15 rounded-xl p-3 mb-4">
              <Flame size={18} className="text-forza-red shrink-0" />
              <p className="text-xs text-forza-red/80">Unlock sauna, steam room & exclusive member events</p>
            </div>
          )}

          <ul className="space-y-1.5 mb-4">
            {otherTier.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-forza-red/75">
                <Check size={12} className="text-forza-red" /> {f}
              </li>
            ))}
          </ul>

          <button onClick={() => upgradeTier(otherTier.id)} className="w-full btn-primary rounded-xl py-3.5 text-sm">
            {subscription.tier === 'essentials' ? `Upgrade to ${otherTier.name}` : `Switch to ${otherTier.name}`}
          </button>
        </div>
      </section>

      {/* Add-ons */}
      <section className="mb-5">
        <h2 className="section-title">Premium Add-ons</h2>
        <div className="space-y-3">
          {addOns.map((addon) => (
            <div
              key={addon.id}
              className={`info-card transition-colors ${addon.active ? 'border-forza-red/35' : ''}`}
            >
              <div className="flex gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${addon.active ? 'bg-forza-red/20' : 'bg-forza-red/5'}`}>
                  {addon.icon === 'boxing' ? (
                    <Dumbbell size={20} className={addon.active ? 'text-forza-red' : 'text-forza-red/50'} />
                  ) : (
                    <User size={20} className={addon.active ? 'text-forza-red' : 'text-forza-red/50'} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-forza-red font-semibold text-sm">{addon.name}</p>
                    <p className="text-forza-red text-sm font-bold">{formatPrice(addon.price)}<span className="text-forza-red/50 text-[10px]">/mo</span></p>
                  </div>
                  <p className="text-forza-red/50 text-[11px] mt-1 leading-relaxed">{addon.description}</p>

                  {addon.id === 'pt' && assignedTrainer && addon.active && (
                    <div className="mt-3 flex items-center gap-2.5 bg-forza-red/5 rounded-xl p-2.5">
                      <div className="w-8 h-8 rounded-full bg-forza-red/20 flex items-center justify-center text-forza-red text-xs font-bold">
                        {assignedTrainer.avatar}
                      </div>
                      <div>
                        <p className="text-forza-red text-xs font-medium">{assignedTrainer.name}</p>
                        <p className="text-forza-red/50 text-[10px]">{assignedTrainer.specialty}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => toggleAddOn(addon.id)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold ${
                        addon.active ? 'btn-ghost' : 'btn-primary'
                      }`}
                    >
                      {addon.active ? 'Remove' : 'Add to Plan'}
                    </button>
                    {addon.id === 'pt' && (
                      <button
                        onClick={() => setShowTrainerModal(true)}
                        className="px-4 py-2.5 rounded-xl border border-forza-red/30 text-forza-red text-xs font-semibold"
                      >
                        {assignedTrainer ? 'Change' : 'Assign'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Billing */}
      <section className="bg-forza-red/5 border border-forza-red/15 rounded-2xl p-5">
        <h2 className="text-forza-red/50 text-xs uppercase tracking-wider mb-3">Monthly Total</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-forza-red/60">{currentTier.name} Plan</span>
            <span className="text-forza-red font-medium">{formatPrice(subscription.monthlyPrice)}</span>
          </div>
          {addOns.filter((a) => a.active).map((a) => (
            <div key={a.id} className="flex justify-between text-sm">
              <span className="text-forza-red/60">{a.name}</span>
              <span className="text-forza-red font-medium">{formatPrice(a.price)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-forza-red/15 pt-3 flex justify-between items-center">
          <span className="text-forza-red font-semibold">Total</span>
          <span className="text-forza-red text-2xl font-bold">{formatPrice(totalMonthly)}</span>
        </div>
      </section>
        </div>
      </ScreenLayout>

      {/* Modals */}
      {showFreezeModal && (
        <Modal title="Freeze Membership" onClose={() => setShowFreezeModal(false)}>
          <p className="text-forza-red/50 text-sm leading-relaxed mb-5">
            Pause your membership for travel, injury, or personal reasons. Your end date extends by the freeze period.
          </p>
          <p className="text-forza-red text-xs font-semibold mb-2">Duration</p>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {[7, 14, 30, 60].map((d) => (
              <button
                key={d}
                onClick={() => setFreezeDays(d)}
                className={`py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                  freezeDays === d ? 'border-forza-red bg-forza-red/10 text-forza-red' : 'border-forza-red/15 text-forza-red/50'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
          <button
            onClick={handleFreeze}
            className="w-full py-3.5 rounded-xl bg-forza-red/15 border border-forza-red/25 text-forza-red/75 font-semibold text-sm flex items-center justify-center gap-2"
          >
            <Snowflake size={16} /> Confirm Freeze
          </button>
        </Modal>
      )}

      {showTrainerModal && (
        <Modal title="Choose Trainer" onClose={() => setShowTrainerModal(false)} tall>
          <div className="space-y-3">
            {TRAINERS.map((t) => (
              <button
                key={t.id}
                onClick={() => { assignTrainer(t); setShowTrainerModal(false); }}
                className={`w-full text-left bg-forza-red/5 border rounded-2xl p-4 transition-colors ${
                  assignedTrainer?.id === t.id ? 'border-forza-red' : 'border-forza-red/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-forza-red/20 flex items-center justify-center text-forza-red font-bold">
                    {t.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-forza-red font-semibold">{t.name}</p>
                    <p className="text-forza-red/50 text-xs">{t.specialty}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Star size={11} className="text-forza-red fill-forza-red" />
                      <span className="text-forza-red text-[11px] font-medium">{t.rating}</span>
                      <span className="text-forza-red/50 text-[10px]">· {t.sessions} sessions</span>
                    </div>
                  </div>
                  <p className="text-forza-red text-sm font-bold">{formatPrice(t.price)}</p>
                </div>
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children, tall }: { title: string; onClose: () => void; children: ReactNode; tall?: boolean }) {
  return (
    <div className="fixed inset-0 bg-forza-red/20 z-[60] flex items-end">
      <div className={`w-full bg-forza-white rounded-t-3xl p-5 border-t border-forza-red/15 animate-slide-up ${tall ? 'max-h-[75%] overflow-y-auto scroll-area' : ''}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-forza-red">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-forza-red/5 flex items-center justify-center text-forza-red/50">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
