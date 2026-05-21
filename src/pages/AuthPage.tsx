import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const { t } = useTranslation();
  const { login, register } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    if (mode === 'login') {
      const ok = login(email, password);
      if (!ok) setError('بيانات الدخول غير صحيحة');
    } else {
      if (!name.trim()) { setError('أدخل اسمك'); setLoading(false); return; }
      const ok = register(name, email, password);
      if (!ok) setError('البريد مسجل بالفعل');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background: 'linear-gradient(135deg, #0c0c0e 0%, #1a1a2e 50%, #0c0c0e 100%)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-5"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)' }}>
            <Car className="w-12 h-12 text-dark" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#D4AF37' }}>{t('app.name')}</h1>
          <p className="text-sm" style={{ color: '#8888a0' }}>{t('app.tagline')}</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-7"
          style={{ background: 'rgba(20, 20, 24, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(212, 175, 55, 0.15)', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212, 175, 55, 0.05)' }}>

          {/* Tabs */}
          <div className="flex mb-7 rounded-xl p-1" style={{ background: 'rgba(42, 42, 48, 0.6)' }}>
            <button onClick={() => setMode('login')}
              className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-300"
              style={{ background: mode === 'login' ? 'linear-gradient(135deg, #D4AF37, #B08D2A)' : 'transparent', color: mode === 'login' ? '#0c0c0e' : '#8888a0' }}>
              {t('auth.login')}
            </button>
            <button onClick={() => setMode('register')}
              className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all duration-300"
              style={{ background: mode === 'register' ? 'linear-gradient(135deg, #D4AF37, #B08D2A)' : 'transparent', color: mode === 'register' ? '#0c0c0e' : '#8888a0' }}>
              {t('auth.register')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <div className="relative">
                    <User className="absolute top-4 w-5 h-5" style={{ color: '#8888a0', [document.documentElement.dir === 'rtl' ? 'right' : 'left']: '14px' }} />
                    <input type="text" placeholder={t('auth.name')} value={name} onChange={e => setName(e.target.value)}
                      className="w-full py-3.5 rounded-xl text-sm outline-none transition-all focus:ring-2"
                      style={{ background: 'rgba(42, 42, 48, 0.6)', border: '1px solid rgba(212, 175, 55, 0.15)', color: '#e0e0e5', paddingInlineStart: '48px', paddingInlineEnd: '16px' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute top-4 w-5 h-5" style={{ color: '#8888a0', [document.documentElement.dir === 'rtl' ? 'right' : 'left']: '14px' }} />
              <input type="email" placeholder={t('auth.email')} value={email} onChange={e => setEmail(e.target.value)} required dir="ltr"
                className="w-full py-3.5 rounded-xl text-sm outline-none transition-all focus:ring-2"
                style={{ background: 'rgba(42, 42, 48, 0.6)', border: '1px solid rgba(212, 175, 55, 0.15)', color: '#e0e0e5', paddingInlineStart: '48px', paddingInlineEnd: '16px' }} />
            </div>

            <div className="relative">
              <Lock className="absolute top-4 w-5 h-5" style={{ color: '#8888a0', [document.documentElement.dir === 'rtl' ? 'right' : 'left']: '14px' }} />
              <input type={showPass ? 'text' : 'password'} placeholder={t('auth.password')} value={password} onChange={e => setPassword(e.target.value)} required dir="ltr"
                className="w-full py-3.5 rounded-xl text-sm outline-none transition-all focus:ring-2"
                style={{ background: 'rgba(42, 42, 48, 0.6)', border: '1px solid rgba(212, 175, 55, 0.15)', color: '#e0e0e5', paddingInlineStart: '48px', paddingInlineEnd: '48px' }} />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute top-4" style={{ [document.documentElement.dir === 'rtl' ? 'left' : 'right']: '14px', color: '#8888a0' }}>
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center py-3 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                {error}
              </motion.p>
            )}

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e', boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)' }}>
              {loading ? <span className="inline-flex items-center gap-2"><span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" /></span> : mode === 'login' ? t('auth.submit') : t('auth.create')}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
