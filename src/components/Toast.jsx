import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[120] max-w-md bg-[#0f1118] border border-amber-500/50 rounded-xl p-4 shadow-[0_10px_35px_-5px_rgba(212,175,55,0.3)] backdrop-blur-xl text-slate-100 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-300">
      <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs leading-relaxed text-slate-200">
        <span className="font-semibold text-amber-300 block mb-0.5">Royal Concierge Update</span>
        {message}
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
