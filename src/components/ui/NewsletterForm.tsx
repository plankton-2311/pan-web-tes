import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setStatus('error');
      setMessage('Format email tidak valid.');
      return;
    }

    setStatus('submitting');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setMessage('Terima kasih! Anda telah terdaftar.');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div>
      <h4 className="text-white font-bold mb-6">Newsletter</h4>
      <p className="text-sm mb-4">Dapatkan update terbaru langsung di email Anda.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Anda"
            disabled={status === 'submitting'}
            className="bg-stone-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-brand outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'submitting' || !email}
            className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-brand-dark transition-colors disabled:bg-stone-600 disabled:cursor-not-allowed shrink-0"
          >
            {status === 'submitting' ? '...' : 'Daftar'}
          </button>
        </div>
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-green-500 text-xs font-bold"
            >
              {message}
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 text-xs font-bold"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
