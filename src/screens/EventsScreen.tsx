import { Tv, Users, Trophy, PartyPopper, Check, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { GymEvent } from '../data/mockData';
import { ScreenLayout } from '../components/ScreenLayout';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-PK', { weekday: 'short', day: 'numeric', month: 'short' });
}

const categoryConfig = {
  screening: { icon: Tv, label: 'Live Screening', color: 'text-forza-red/75', bg: 'bg-forza-red/10', border: 'border-forza-red/20' },
  class: { icon: Users, label: 'Class', color: 'text-forza-red', bg: 'bg-forza-red/10', border: 'border-forza-red/20' },
  challenge: { icon: Trophy, label: 'Challenge', color: 'text-forza-red/75', bg: 'bg-forza-red/10', border: 'border-forza-red/20' },
  social: { icon: PartyPopper, label: 'Social', color: 'text-forza-red', bg: 'bg-forza-red/10', border: 'border-forza-red/20' },
};

export function EventsScreen() {
  const { events, toggleEventRegistration } = useApp();
  const registered = events.filter((e) => e.registered);
  const upcoming = events.filter((e) => !e.registered);

  return (
    <ScreenLayout>
      <div className="px-5 pb-6">
      <header className="pt-4 pb-5">
        <h1 className="screen-header">Events</h1>
        <p className="screen-subtitle">Screenings, classes & community at La Forza</p>
      </header>

      {/* Featured */}
      <section className="relative rounded-2xl overflow-hidden mb-6 card-glow">
        <div className="absolute inset-0 bg-gradient-to-r from-forza-red/25 via-forza-white to-forza-red/10" />
        <div className="relative p-5 border border-forza-red/20 rounded-2xl">
          <span className="text-forza-red text-[10px] uppercase tracking-[0.2em] font-bold">Featured</span>
          <p className="font-display text-xl font-bold text-forza-red mt-2">FIFA World Cup Screening</p>
          <p className="text-forza-red/60 text-xs mt-1.5 leading-relaxed">Semi-finals on our 85" screen · Snacks included</p>
          <div className="flex items-center gap-2 mt-4">
            <Calendar size={14} className="text-forza-red" />
            <span className="text-forza-red text-xs font-semibold">Jul 15 · 8:00 PM</span>
          </div>
        </div>
      </section>

      {registered.length > 0 && (
        <section className="mb-6">
          <h2 className="section-title">You're Going</h2>
          <div className="space-y-3">
            {registered.map((ev) => (
              <EventCard key={ev.id} ev={ev} onToggle={toggleEventRegistration} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="section-title">Upcoming</h2>
        <div className="space-y-3">
          {upcoming.map((ev) => (
            <EventCard key={ev.id} ev={ev} onToggle={toggleEventRegistration} />
          ))}
        </div>
      </section>
      </div>
    </ScreenLayout>
  );
}

function EventCard({ ev, onToggle }: { ev: GymEvent; onToggle: (id: string) => void }) {
  const cfg = categoryConfig[ev.category];
  const Icon = cfg.icon;

  return (
    <div className={`info-card ${ev.registered ? 'border-forza-red/30' : ''}`}>
      <div className="flex gap-3">
        <div className={`w-12 h-12 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center shrink-0`}>
          <Icon size={22} className={cfg.color} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider ${cfg.color}`}>{cfg.label}</span>
            {ev.spots && <span className="text-forza-red/50 text-[10px]">{ev.spots} spots</span>}
          </div>
          <p className="text-forza-red font-semibold text-sm mt-1">{ev.title}</p>
          <p className="text-forza-red/50 text-[11px] mt-1 leading-relaxed">{ev.description}</p>
          <p className="text-forza-red text-xs font-medium mt-2">{formatDate(ev.date)} · {ev.time}</p>
        </div>
      </div>
      <button
        onClick={() => onToggle(ev.id)}
        className={`w-full mt-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
          ev.registered
            ? 'bg-forza-red/10 border border-forza-red/25 text-forza-red'
            : 'btn-primary'
        }`}
      >
        {ev.registered ? (
          <><Check size={16} /> Registered · Cancel</>
        ) : (
          'Register Now'
        )}
      </button>
    </div>
  );
}
