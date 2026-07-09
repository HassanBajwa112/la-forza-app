import { useState } from 'react';
import { Plus, X, ChevronDown } from 'lucide-react';
import { useApp, WORKOUT_TEMPLATES } from '../context/AppContext';

export function WorkoutScreen() {
  const { weeklyPlan, addSetToDay, removeSetFromDay } = useApp();
  const [selectedDay, setSelectedDay] = useState<number | null>(0);
  const [expandedSet, setExpandedSet] = useState<string | null>(null);

  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;
  const totalSets = weeklyPlan.reduce((s, d) => s + d.sets.length, 0);
  const activeDays = weeklyPlan.filter((d) => d.sets.length > 0).length;

  return (
    <div className="scroll-area flex-1 px-5 pb-6">
      <header className="pt-4 pb-5">
        <h1 className="screen-header">Training</h1>
        <p className="screen-subtitle">Your weekly workout split</p>
      </header>

      <section className="grid grid-cols-2 gap-3 mb-6">
        <div className="info-card text-center py-5">
          <p className="font-display text-3xl font-bold text-forza-gold">{activeDays}</p>
          <p className="text-forza-subtle text-xs font-medium mt-1">Training Days</p>
        </div>
        <div className="info-card text-center py-5">
          <p className="font-display text-3xl font-bold text-forza-gold">{totalSets}</p>
          <p className="text-forza-subtle text-xs font-medium mt-1">Workout Sets</p>
        </div>
      </section>

      <section className="space-y-2 mb-6">
        {weeklyPlan.map((day, dayIndex) => {
          const isToday = dayIndex === todayIndex;
          const isOpen = selectedDay === dayIndex;

          return (
            <div key={day.day}>
              <button
                onClick={() => setSelectedDay(isOpen ? null : dayIndex)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  isToday
                    ? 'bg-forza-gold/5 border-forza-gold/30'
                    : isOpen
                    ? 'bg-forza-card border-forza-gold/20'
                    : 'bg-forza-card border-forza-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm ${
                    isToday ? 'bg-forza-gold text-forza-black' : 'bg-forza-elevated text-forza-subtle'
                  }`}>
                    {day.shortDay}
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-semibold">
                      {day.day}
                      {isToday && <span className="text-forza-gold text-[10px] ml-2 font-bold">TODAY</span>}
                    </p>
                    <p className="text-forza-subtle text-[11px] mt-0.5">
                      {day.sets.length === 0 ? 'Rest day' : day.sets.map((s) => s.name).join(' · ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {day.sets.length > 0 && (
                    <div className="flex gap-1">
                      {day.sets.map((s) => (
                        <div key={s.id} className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                      ))}
                    </div>
                  )}
                  <ChevronDown size={18} className={`text-forza-subtle transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {isOpen && (
                <div className="mt-2 ml-4 pl-4 border-l-2 border-forza-border space-y-2 animate-slide-up">
                  {day.sets.map((set) => (
                    <div key={set.id} className="bg-forza-elevated border border-forza-border rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedSet(expandedSet === set.id ? null : set.id)}
                        className="w-full flex items-center gap-3 p-3.5"
                      >
                        <div className="w-1.5 h-8 rounded-full shrink-0" style={{ background: set.color }} />
                        <div className="flex-1 text-left">
                          <p className="text-white text-sm font-semibold">{set.name}</p>
                          <p className="text-forza-subtle text-[10px]">{set.muscleGroup} · {set.exercises.length} exercises</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); removeSetFromDay(dayIndex, set.id); }}
                          className="p-1.5 text-forza-subtle hover:text-forza-red"
                        >
                          <X size={16} />
                        </button>
                      </button>
                      {expandedSet === set.id && (
                        <div className="px-4 pb-3 border-t border-forza-border">
                          <ul className="mt-2 space-y-1.5">
                            {set.exercises.map((ex, i) => (
                              <li key={ex} className="flex items-center gap-2.5 text-[11px] text-white/80">
                                <span className="w-5 h-5 rounded-md bg-forza-card flex items-center justify-center text-forza-subtle text-[10px] font-medium">
                                  {i + 1}
                                </span>
                                {ex}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}

                  <p className="text-forza-subtle text-[10px] font-medium pt-1">Add workout:</p>
                  <div className="flex flex-wrap gap-2 pb-2">
                    {WORKOUT_TEMPLATES.filter((t) => !day.sets.find((s) => s.id === t.id)).map((template) => (
                      <button
                        key={template.id}
                        onClick={() => addSetToDay(dayIndex, template)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-forza-border text-[11px] text-white/85 font-medium hover:border-forza-gold/40 active:scale-95 transition-all"
                      >
                        <Plus size={12} />
                        <span className="w-2 h-2 rounded-full" style={{ background: template.color }} />
                        {template.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <section>
        <h2 className="section-title">Templates</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {WORKOUT_TEMPLATES.map((t) => (
            <div key={t.id} className="info-card py-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-5 rounded-full" style={{ background: t.color }} />
                <p className="text-white text-xs font-semibold">{t.name}</p>
              </div>
              <p className="text-forza-subtle text-[10px]">{t.exercises.slice(0, 3).join(', ')}...</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
