import { ArrowLeft, AtSign, Mail, MapPin, Phone } from 'lucide-react';
import { GYM } from '../data/workzishMockData';

export function ContactScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full min-h-0 flex flex-col bg-gray-50">
      <header className="shrink-0 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button type="button" onClick={onBack} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">Contact Us</h1>
          <p className="text-xs text-gray-500">Get in touch with the team</p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto scroll-area p-4 space-y-3">
        <a href={`https://maps.google.com/?q=${encodeURIComponent(GYM.location)}`} target="_blank" rel="noreferrer" className="wz-card flex items-center gap-3 hover:border-brand-300 transition-colors">
          <div className="h-11 w-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{GYM.location}</p>
            <p className="text-xs text-gray-500">{GYM.landmark}</p>
          </div>
        </a>
        <a href={`tel:${GYM.phone.replace(/\s/g, '')}`} className="wz-card flex items-center gap-3 hover:border-brand-300 transition-colors">
          <div className="h-11 w-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
            <Phone size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{GYM.phone}</p>
            <p className="text-xs text-gray-500">Call us</p>
          </div>
        </a>
        <a href={`mailto:${GYM.email}`} className="wz-card flex items-center gap-3 hover:border-brand-300 transition-colors">
          <div className="h-11 w-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-500">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{GYM.email}</p>
            <p className="text-xs text-gray-500">Email us</p>
          </div>
        </a>
        <a href={`https://wa.me/${GYM.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="wz-card flex items-center gap-3 hover:border-brand-300 transition-colors">
          <div className="h-11 w-11 rounded-xl bg-success-50 flex items-center justify-center text-success-600 text-xs font-bold">WA</div>
          <div>
            <p className="text-sm font-semibold text-gray-900">WhatsApp</p>
            <p className="text-xs text-gray-500">{GYM.whatsapp}</p>
          </div>
        </a>
        <a href="https://www.instagram.com/laforzagyms/" target="_blank" rel="noreferrer" className="wz-card flex items-center gap-3 hover:border-brand-300 transition-colors">
          <div className="h-11 w-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700">
            <AtSign size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{GYM.instagram}</p>
            <p className="text-xs text-gray-500">Follow on Instagram</p>
          </div>
        </a>
      </div>
    </div>
  );
}
