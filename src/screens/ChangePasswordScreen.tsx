import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ChangePasswordScreen({ onBack }: { onBack: () => void }) {
  const { showToast } = useApp();
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Password changed successfully');
    onBack();
  };

  return (
    <div className="h-full min-h-0 flex flex-col bg-gray-50">
      <header className="shrink-0 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button type="button" onClick={onBack} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Change Password</h1>
      </header>
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto scroll-area p-4 space-y-4">
        <p className="text-sm text-gray-500">Enter your current password, then choose a new one.</p>
        <div>
          <label className="wz-label block mb-1.5">Current Password</label>
          <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} className="wz-input" placeholder="Enter your current password" />
        </div>
        <div>
          <label className="wz-label block mb-1.5">New Password</label>
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="wz-input" placeholder="At least 6 characters" />
        </div>
        <div>
          <label className="wz-label block mb-1.5">Confirm Password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="wz-input" placeholder="Re-enter your new password" />
        </div>
        <button type="submit" className="wz-btn-primary w-full py-3.5">Change Password</button>
      </form>
    </div>
  );
}
