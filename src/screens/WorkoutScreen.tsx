import { useState } from 'react';
import { Plus, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp, WORKOUT_TEMPLATES } from '../context/AppContext';
import { ScreenLayout } from '../components/ScreenLayout';
import { springSoft } from '../motion/presets';

export function WorkoutScreen() {
  const { weeklyPlan, addSetToDay, removeSetFromDay } = useApp();
  const [selectedDay, setSelectedDay] = useState<number | null>(0);
  const [expandedSet, setExpandedSet] = useState<string | null>(null);

  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;
  const totalSets = weeklyPlan.reduce((s, d) => s + d.sets.length, 0);
  const activeDays = weeklyPlan.filter((d) => d.sets.length > 0).length;

  return (
    <ScreenLayout>
      <div className="px-4 py-5 space-y-5">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">Training</h1>
          <p className="text-sm text-gray-500 mt-1">Your weekly workout split</p>
        </header>

        <section className="grid grid-cols-2 gap-3">
          <div className="wz-card text-center py-5">
            <p className="text-3xl font-bold text-brand-600">{activeDays}</p>
            <p className="text-xs font-semibold text-gray-500 uppercase mt-2">Training Days</p>
          </div>
          <div className="wz-card text-center py-5">
            <p className="text-3xl font-bold text-brand-600">{totalSets}</p>
            <p className="text-xs font-semibold text-gray-500 uppercase mt-2">Workout Sets</p>
          </div>
        </section>

        <section className="space-y-2">
          {weeklyPlan.map((day, dayIndex) => {
            const isToday = dayIndex === todayIndex;
            const isOpen = selectedDay === dayIndex;

            return (
              <div key={day.day}>
                <button
                  type="button"
                  onClick={() => setSelectedDay(isOpen ? null : dayIndex)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    isToday
                      ? 'bg-brand-50 border-brand-300'
                      : isOpen
                        ? 'bg-white border-brand-200 shadow-card'
                        : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isToday ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {day.shortDay}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">
                        {day.day}
                        {isToday && <span className="text-brand-600 text-[10px] ml-2 font-bold">TODAY</span>}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
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
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown size={18} className="text-gray-400" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="mt-2 ml-4 pl-4 border-l-2 border-gray-200 space-y-2 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={springSoft}
                    >
                      {day.sets.map((set) => (
                        <div key={set.id} className="wz-card !p-0 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setExpandedSet(expandedSet === set.id ? null : set.id)}
                            className="w-full flex items-center gap-3 p-3.5"
                          >
                            <div className="w-1.5 h-8 rounded-full shrink-0" style={{ background: set.color }} />
                            <div className="flex-1 text-left">
                              <p className="text-sm font-semibold text-gray-900">{set.name}</p>
                              <p className="text-[10px] text-gray-500">{set.muscleGroup} · {set.exercises.length} exercises</p>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeSetFromDay(dayIndex, set.id);
                              }}
                              className="p-1.5 text-gray-400 hover:text-brand-500"
                            >
                              <X size={16} />
                            </button>
                          </button>
                          {expandedSet === set.id && (
                            <div className="px-4 pb-3 border-t border-gray-100">
                              <ul className="mt-2 space-y-1.5">
                                {set.exercises.map((ex, i) => (
                                  <li key={ex} className="flex items-center gap-2.5 text-[11px] text-gray-700">
                                    <span className="w-5 h-5 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 text-[10px] font-medium">
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

                      <p className="text-[10px] font-medium text-gray-500 pt-1">Add workout:</p>
                      <div className="flex flex-wrap gap-2 pb-2">
                        {WORKOUT_TEMPLATES.filter((t) => !day.sets.find((s) => s.id === t.id)).map((template) => (
                          <button
                            key={template.id}
                            type="button"
                            onClick={() => addSetToDay(dayIndex, template)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-[11px] text-gray-700 font-medium hover:border-brand-300 active:scale-95 transition-all bg-white"
                          >
                            <Plus size={12} />
                            <span className="w-2 h-2 rounded-full" style={{ background: template.color }} />
                            {template.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </section>

        <section>
          <h2 className="wz-section-title">Templates</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {WORKOUT_TEMPLATES.map((t) => (
              <div key={t.id} className="wz-card !p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-5 rounded-full" style={{ background: t.color }} />
                  <p className="text-xs font-semibold text-brand-600">{t.name}</p>
                </div>
                <p className="text-[10px] text-gray-500">{t.exercises.slice(0, 3).join(', ')}...</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ScreenLayout>
  );
}
