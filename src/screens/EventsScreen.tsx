import { Tv, Users, Trophy, PartyPopper, Check, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { GymEvent } from '../data/mockData';
import { formatDate } from '../data/workzishMockData';
import { ScreenLayout } from '../components/ScreenLayout';

const categoryConfig = {
  screening: { icon: Tv, label: 'Live Screening', color: 'text-gray-700' },
  class: { icon: Users, label: 'Class', color: 'text-brand-600' },
  challenge: { icon: Trophy, label: 'Challenge', color: 'text-gray-700' },
  social: { icon: PartyPopper, label: 'Social', color: 'text-brand-600' },
};

export function EventsScreen() {
  const { events, toggleEventRegistration } = useApp();
  const registered = events.filter((e) => e.registered);
  const upcoming = events.filter((e) => !e.registered);

  return (
    <ScreenLayout>
      <div className="px-4 py-5 space-y-5">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-sm text-gray-500 mt-1">Screenings, classes & community at La Forza</p>
        </header>

        <section className="wz-card !p-5 border-brand-200 bg-brand-50/50">
          <p className="text-xs font-semibold text-brand-600 uppercase">Featured Event</p>
          <p className="text-xl font-bold text-gray-900 mt-2">FIFA World Cup Screening</p>
          <p className="text-xs text-gray-500 mt-1">Semi-finals on our 85&quot; screen · Snacks included</p>
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-brand-200/50">
            <Calendar size={14} className="text-brand-500" />
            <span className="text-xs font-semibold text-gray-700">Jul 15 · 8:00 PM</span>
          </div>
        </section>

        {registered.length > 0 && (
          <section>
            <h2 className="wz-section-title">You&apos;re Going</h2>
            <div className="space-y-3">
              {registered.map((ev) => (
                <EventCard key={ev.id} ev={ev} onToggle={toggleEventRegistration} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="wz-section-title">Upcoming</h2>
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
    <div className={`wz-card !p-4 ${ev.registered ? 'border-brand-300' : ''}`}>
      <div className="flex gap-3">
        <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
          <Icon size={20} className="text-brand-500" />
        </div>
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-bold uppercase tracking-wide ${cfg.color}`}>{cfg.label}</span>
          <p className="text-sm font-semibold text-gray-900 mt-0.5">{ev.title}</p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ev.description}</p>
          <p className="text-xs text-brand-600 font-medium mt-2">{formatDate(ev.date)} · {ev.time}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onToggle(ev.id)}
        className={`w-full mt-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 ${
          ev.registered ? 'bg-brand-50 border border-brand-200 text-brand-600' : 'wz-btn-primary'
        }`}
      >
        {ev.registered ? <><Check size={16} /> Registered · Cancel</> : 'Register Now'}
      </button>
    </div>
  );
}
