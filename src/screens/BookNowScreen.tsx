import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BOOKING_SPACES, GYM } from '../data/workzishMockData';
import { useApp } from '../context/AppContext';

export function BookNowScreen({ onBack }: { onBack: () => void }) {
  const { showToast } = useApp();
  const [space, setSpace] = useState(BOOKING_SPACES[0]);
  const [date, setDate] = useState('2026-07-12');
  const [slot, setSlot] = useState('6:00 PM');

  const slots = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

  return (
    <div className="h-full min-h-0 flex flex-col bg-gray-50">
      <header className="shrink-0 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button type="button" onClick={onBack} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Book a Space</h1>
          <p className="text-xs text-gray-500">Browse available slots and reserve your spot</p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto scroll-area p-4 space-y-4">
        <div className="wz-card">
          <p className="text-sm text-gray-600">Good evening — Book your space at <span className="font-semibold text-gray-900">{GYM.name}</span></p>
        </div>
        <div>
          <label className="wz-label block mb-2">Select Space</label>
          <div className="grid grid-cols-2 gap-2">
            {BOOKING_SPACES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpace(s)}
                className={`rounded-xl border p-3 text-xs font-semibold text-left transition-colors ${
                  space === s ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="wz-label block mb-2">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="wz-input" />
        </div>
        <div>
          <label className="wz-label block mb-2">Select Time Slots</label>
          <div className="grid grid-cols-2 gap-2">
            {slots.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSlot(s)}
                className={`rounded-xl border py-2.5 text-sm font-semibold ${
                  slot === s ? 'border-brand-500 bg-brand-500 text-white' : 'border-gray-200 bg-white text-gray-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="wz-card">
          <p className="wz-section-title !mb-2">Booking Summary</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Space</span><span className="font-medium">{space}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium">{date}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-medium">{slot}</span></div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => { showToast('Booking confirmed!'); onBack(); }}
          className="wz-btn-primary w-full py-3.5"
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
}
