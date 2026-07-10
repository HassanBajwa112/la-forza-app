import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

const classes = [
  { id: 'cl1', name: 'Boxing Conditioning', time: '7:00 PM', day: 'Mon, Wed, Fri', spots: 8 },
  { id: 'cl2', name: 'HIIT Blast', time: '6:30 AM', day: 'Tue, Thu, Sat', spots: 12 },
  { id: 'cl3', name: 'Yoga Recovery', time: '10:00 AM', day: 'Daily', spots: 15 },
  { id: 'cl4', name: 'Strength Foundations', time: '5:00 PM', day: 'Mon–Fri', spots: 10 },
];

export function ClassesScreen({ onBack }: { onBack: () => void }) {
  const { showToast } = useApp();

  return (
    <div className="h-full min-h-0 flex flex-col bg-gray-50">
      <header className="shrink-0 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button type="button" onClick={onBack} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Classes</h1>
          <p className="text-xs text-gray-500">Reserve a spot in a class</p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto scroll-area p-4 space-y-3">
        {classes.map((c) => (
          <div key={c.id} className="wz-card !p-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">{c.name}</p>
              <p className="text-xs text-gray-500 mt-0.5">{c.day} · {c.time}</p>
              <p className="text-[10px] text-gray-400 mt-1">{c.spots} spots left</p>
            </div>
            <button
              type="button"
              onClick={() => showToast(`Reserved: ${c.name}`)}
              className="wz-btn-primary text-xs !py-2 shrink-0"
            >
              Reserve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
