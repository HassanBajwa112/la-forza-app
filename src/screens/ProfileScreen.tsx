import { MapPin, Clock, AtSign, Phone, ChevronRight, LogOut } from 'lucide-react';
import { GYM_INFO, USER, TIERS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function ProfileScreen() {
  const { subscription, addOns, assignedTrainer } = useApp();
  const tier = TIERS[subscription.tier];
  const activeAddons = addOns.filter((a) => a.active);

  return (
    <div className="scroll-area flex-1 px-5 pb-6">
      <header className="flex flex-col items-center pt-6 pb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-forza-gold/30 to-forza-red/15 border-2 border-forza-gold/40 flex items-center justify-center card-glow mb-4">
          <span className="font-display text-3xl font-bold text-forza-gold">{USER.avatar}</span>
        </div>
        <h1 className="font-display text-xl font-bold text-white">{USER.name}</h1>
        <p className="text-forza-subtle text-xs mt-1">{USER.memberId}</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="px-3 py-1 rounded-full bg-forza-gold/10 border border-forza-gold/30 text-forza-gold text-xs font-semibold">
            {tier.name}
          </span>
          <span className="text-forza-subtle text-[10px]">Since {new Date(USER.memberSince).getFullYear()}</span>
        </div>
      </header>

      <section className="grid grid-cols-3 gap-2.5 mb-6">
        {[
          { label: 'Visits', value: String(USER.visitsThisMonth) },
          { label: 'Streak', value: `${USER.streak}d` },
          { label: 'Add-ons', value: String(activeAddons.length) },
        ].map(({ label, value }) => (
          <div key={label} className="info-card text-center py-4">
            <p className="font-display text-xl font-bold text-forza-gold">{value}</p>
            <p className="text-forza-subtle text-[10px] font-medium mt-1">{label}</p>
          </div>
        ))}
      </section>

      <section className="info-card mb-5">
        <h2 className="text-white text-sm font-semibold mb-3">Membership</h2>
        <div className="space-y-2.5">
          <Row label="Plan" value={`${tier.name} — ${tier.subtitle}`} />
          <Row label="Status" value={subscription.isFrozen ? 'Frozen' : 'Active'} active={!subscription.isFrozen} />
          {assignedTrainer && <Row label="Trainer" value={assignedTrainer.name} />}
          {activeAddons.map((a) => <Row key={a.id} label="Add-on" value={a.name} />)}
        </div>
      </section>

      <section className="info-card mb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-forza-gold/15 flex items-center justify-center">
            <span className="font-display text-forza-gold font-bold">LF</span>
          </div>
          <div>
            <p className="font-display text-lg font-bold text-white">LA FORZA</p>
            <p className="text-forza-subtle text-[11px]">{GYM_INFO.tagline}</p>
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
          <button key={item} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-forza-card transition-colors">
            <span className="text-white text-sm">{item}</span>
            <ChevronRight size={18} className="text-forza-subtle" />
          </button>
        ))}
        <button className="w-full flex items-center gap-2 p-4 rounded-xl text-forza-red/80 text-sm mt-2">
          <LogOut size={18} /> Sign Out
        </button>
      </section>
    </div>
  );
}

function Row({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-forza-subtle text-xs">{label}</span>
      <span className={`text-xs font-semibold ${active ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
    </div>
  );
}

function InfoRow({ icon: Icon, title, sub }: { icon: typeof MapPin; title: string; sub?: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={15} className="text-forza-gold mt-0.5 shrink-0" />
      <div>
        <p className="text-white text-xs">{title}</p>
        {sub && <p className="text-forza-subtle text-[10px] mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
