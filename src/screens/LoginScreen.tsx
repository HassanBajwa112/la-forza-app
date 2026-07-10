import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { GYM } from '../data/workzishMockData';

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(onLogin, 700);
  };

  return (
    <div className="h-full min-h-0 flex flex-col bg-gray-50 px-6 py-8">
      <div className="flex flex-col items-center pt-8 pb-8">
        <img src={GYM.logoUrl} alt={GYM.name} className="h-20 w-20 rounded-full object-cover shadow-card mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">{GYM.name}</h1>
        <p className="text-sm text-gray-500 mt-1">Member Portal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        <div>
          <label className="wz-label block mb-1.5">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+92 3XX XXXXXXX"
            className="wz-input"
          />
        </div>
        <div>
          <label className="wz-label block mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="wz-input pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="wz-btn-primary w-full py-3.5 mt-2 disabled:opacity-70">
          {loading ? (
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            'Login'
          )}
        </button>
      </form>

      <p className="text-center text-xs text-gray-400 pb-4">
        Powered by Workzish · {GYM.location}
      </p>
    </div>
  );
}
