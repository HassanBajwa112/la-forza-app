import { useApp } from '../context/AppContext';
import { CheckCircle } from 'lucide-react';

export function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className="absolute top-3 left-4 right-4 z-[60] animate-slide-up pointer-events-none">
      <div className="flex items-center gap-2.5 surface-card px-4 py-3.5 border-forza-red/30 shadow-glow">
        <CheckCircle size={18} className="text-forza-red shrink-0" />
        <span className="text-forza-white text-sm font-medium">{toast}</span>
      </div>
    </div>
  );
}
