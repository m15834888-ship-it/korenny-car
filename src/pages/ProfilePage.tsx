import { useTranslation } from 'react-i18next';
import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Globe, Moon, Sun, Shield, Users, MessageCircle, ChevronLeft } from 'lucide-react';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user, logout, isDark, toggleTheme, language, setLanguage } = useApp();
  const navigate = useNavigate();
  if (!user) return null;
  const isAdmin = user.role === 'admin_cars';
  const isSuperAdmin = user.role === 'admin_users';

  const languages = [
    { code: 'ar', label: 'العربية' },
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
  ];

  return (
    <div className="pb-36 px-5 pt-8">
      {/* User Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-8 mb-6 text-center"
        style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
        <div className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-3xl font-bold"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e' }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ color: '#e0e0e5' }}>{user.name}</h2>
        <p className="text-base mb-4" style={{ color: '#8888a0' }}>{user.email}</p>
        {(isAdmin || isSuperAdmin) && (
          <span className="inline-block px-5 py-1.5 rounded-full text-sm font-bold"
            style={{ background: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37' }}>
            {isSuperAdmin ? 'مدير عام' : 'مدير سيارات'}
          </span>
        )}
      </motion.div>

      {/* Settings */}
      <div className="space-y-5">
        {/* Language */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
          <div className="flex items-center gap-3 mb-5">
            <Globe className="w-6 h-6" style={{ color: '#D4AF37' }} />
            <span className="text-base font-semibold" style={{ color: '#e0e0e5' }}>{t('profile.language')}</span>
          </div>
          <div className="flex gap-4">
            {languages.map(lang => (
              <button key={lang.code} onClick={() => setLanguage(lang.code)}
                className="flex-1 py-4 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: language === lang.code ? 'linear-gradient(135deg, #D4AF37, #B08D2A)' : 'rgba(42, 42, 48, 0.5)',
                  color: language === lang.code ? '#0c0c0e' : '#8888a0',
                }}>
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className="rounded-2xl p-6" style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDark ? <Moon className="w-6 h-6" style={{ color: '#D4AF37' }} /> : <Sun className="w-6 h-6" style={{ color: '#D4AF37' }} />}
              <span className="text-base font-semibold" style={{ color: '#e0e0e5' }}>{t('profile.theme')}</span>
            </div>
            <button onClick={toggleTheme}
              className="w-16 h-8 rounded-full relative transition-all"
              style={{ background: isDark ? 'linear-gradient(135deg, #D4AF37, #B08D2A)' : 'rgba(42, 42, 48, 0.8)' }}>
              <span className="absolute top-1 w-6 h-6 rounded-full bg-white transition-all"
                style={{ [document.documentElement.dir === 'rtl' ? 'right' : 'left']: isDark ? '34px' : '4px' }} />
            </button>
          </div>
        </div>

        {/* Admin Links */}
        {isAdmin && (
          <button onClick={() => navigate('/admin/cars')}
            className="w-full rounded-2xl p-6 flex items-center gap-4"
            style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <Shield className="w-6 h-6" style={{ color: '#D4AF37' }} />
            <span className="text-base font-semibold flex-1 text-start" style={{ color: '#e0e0e5' }}>{t('profile.adminPanel')}</span>
            <ChevronLeft className="w-5 h-5" style={{ color: '#8888a0' }} />
          </button>
        )}

        {isSuperAdmin && (
          <button onClick={() => navigate('/admin/users')}
            className="w-full rounded-2xl p-6 flex items-center gap-4"
            style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <Users className="w-6 h-6" style={{ color: '#D4AF37' }} />
            <span className="text-base font-semibold flex-1 text-start" style={{ color: '#e0e0e5' }}>{t('profile.superAdminPanel')}</span>
            <ChevronLeft className="w-5 h-5" style={{ color: '#8888a0' }} />
          </button>
        )}

        {/* Chat */}
        <button onClick={() => navigate('/chat')}
          className="w-full rounded-2xl p-6 flex items-center gap-4"
          style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
          <MessageCircle className="w-6 h-6" style={{ color: '#D4AF37' }} />
          <span className="text-base font-semibold flex-1 text-start" style={{ color: '#e0e0e5' }}>{t('profile.messages')}</span>
          <ChevronLeft className="w-5 h-5" style={{ color: '#8888a0' }} />
        </button>

        {/* Logout */}
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => { logout(); navigate('/'); }}
          className="w-full rounded-2xl p-6 flex items-center justify-center gap-3"
          style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <LogOut className="w-5 h-5" style={{ color: '#ef4444' }} />
          <span className="text-base font-semibold" style={{ color: '#ef4444' }}>{t('auth.logout')}</span>
        </motion.button>
      </div>
    </div>
  );
}
