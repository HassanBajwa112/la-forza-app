import { MapPin, Clock, AtSign, Phone, ChevronRight, LogOut } from 'lucide-react';
import { GYM_INFO, USER, TIERS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { ScreenLayout } from '../components/ScreenLayout';
import { LaForzaLogo } from '../components/LaForzaLogo';

export function ProfileScreen() {
  const { subscription, addOns, assignedTrainer } = useApp();
  const tier = TIERS[subscription.tier];
  const activeAddons = addOns.filter((a) => a.active);

  return (
    <ScreenLayout>
      <div className="px-5 pb-6">
      <header className="flex flex-col items-center pt-6 pb-5">
        <LaForzaLogo size="lg" showRing={false} className="mb-4 shadow-premium-sm" />
        <p className="label-caps">Member Profile</p>
        <h1 className="font-display text-2xl font-bold text-forza-white uppercase tracking-wide mt-1">{USER.name}</h1>
        <p className="text-forza-muted text-xs mt-1">{USER.memberId}</p>
        <div className="trust-strip mt-4">
          <span className="px-2.5 py-0.5 rounded-full bg-forza-red text-forza-white text-[10px] font-bold uppercase tracking-wide">
            {tier.name}
          </span>
          <span className="text-forza-muted text-[10px] font-medium">Since {new Date(USER.memberSince).getFullYear()}</span>
        </div>
      </header>

      <section className="grid grid-cols-3 gap-2.5 mb-6">
        {[
          { label: 'Visits', value: String(USER.visitsThisMonth) },
          { label: 'Streak', value: `${USER.streak}d` },
          { label: 'Add-ons', value: String(activeAddons.length) },
        ].map(({ label, value }) => (
          <div key={label} className="surface-card text-center py-4">
            <p className="stat-value">{value}</p>
            <p className="label-caps-muted mt-1.5">{label}</p>
          </div>
        ))}
      </section>

      <section className="surface-card mb-5 p-4">
        <h2 className="section-title">Membership</h2>
        <div className="space-y-2.5">
          <Row label="Plan" value={`${tier.name} — ${tier.subtitle}`} />
          <Row label="Status" value={subscription.isFrozen ? 'Frozen' : 'Active'} active={!subscription.isFrozen} />
          {assignedTrainer && <Row label="Trainer" value={assignedTrainer.name} />}
          {activeAddons.map((a) => <Row key={a.id} label="Add-on" value={a.name} />)}
        </div>
      </section>

      <section className="surface-card mb-5 p-4">
        <div className="flex items-center gap-3 mb-4">
          <LaForzaLogo size="sm" showRing={false} />
          <div>
            <p className="font-display text-lg font-bold text-forza-white uppercase tracking-wide">LA FORZA</p>
            <p className="text-forza-muted text-[11px]">{GYM_INFO.tagline}</p>
          </div>
        </div>
        <div className="space-y-3">
          <InfoRow icon={MapPin} title={GYM_INFO.location} sub={GYM_INFO.landmark} />
          <InfoRow icon={Clock} title={`Co-ed: ${GYM_INFO.hours.coed}`} sub={`Women-only: ${GYM_INFO.hours.womenOnly}`} />
          <InfoRow icon={AtSign} title={GYM_INFO.instagram} />
          <InfoRow icon={Phone} title={GYM_INFO.phone} />
        </div>
      </section>

      <section className="mb-5">
        <h2 className="section-title">Amenities</h2>
        <div className="flex flex-wrap gap-2">
          {GYM_INFO.amenities.map((a) => (
            <span key={a} className="px-3 py-1.5 rounded-xl bg-forza-elevated border border-forza-border text-forza-muted text-[11px]">
              {a}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-1">
        {['Visit History', 'Notifications', 'Help & Support'].map((item) => (
          <button key={item} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-forza-elevated transition-colors">
            <span className="text-forza-white text-sm">{item}</span>
            <ChevronRight size={18} className="text-forza-muted" />
          </button>
        ))}
        <button className="w-full flex items-center gap-2 p-4 rounded-xl text-forza-white/80 text-sm mt-2">
          <LogOut size={18} /> Sign Out
        </button>
      </section>
      </div>
    </ScreenLayout>
  );
}

function Row({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-forza-muted text-xs">{label}</span>
      <span className={`text-xs font-semibold ${active ? 'text-forza-red' : 'text-forza-white'}`}>{value}</span>
    </div>
  );
}

function InfoRow({ icon: Icon, title, sub }: { icon: typeof MapPin; title: string; sub?: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={15} className="text-forza-red mt-0.5 shrink-0" />
      <div>
        <p className="text-forza-white text-xs">{title}</p>
        {sub && <p className="text-forza-muted text-[10px] mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
