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
    <div className="pb-28 px-5 pt-6">
      {/* User Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 mb-5 text-center"
        style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
        <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e' }}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-lg font-bold mb-1" style={{ color: '#e0e0e5' }}>{user.name}</h2>
        <p className="text-sm mb-3" style={{ color: '#8888a0' }}>{user.email}</p>
        {(isAdmin || isSuperAdmin) && (
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(212, 175, 55, 0.2)', color: '#D4AF37' }}>
            {isSuperAdmin ? 'مدير عام' : 'مدير سيارات'}
          </span>
        )}
      </motion.div>

      {/* Settings */}
      <div className="space-y-4">
        {/* Language */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5" style={{ color: '#D4AF37' }} />
            <span className="text-sm font-semibold" style={{ color: '#e0e0e5' }}>{t('profile.language')}</span>
          </div>
          <div className="flex gap-3">
            {languages.map(lang => (
              <button key={lang.code} onClick={() => setLanguage(lang.code)}
                className="flex-1 py-3 rounded-xl text-xs font-semibold transition-all"
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
        <div className="rounded-2xl p-5" style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isDark ? <Moon className="w-5 h-5" style={{ color: '#D4AF37' }} /> : <Sun className="w-5 h-5" style={{ color: '#D4AF37' }} />}
              <span className="text-sm font-semibold" style={{ color: '#e0e0e5' }}>{t('profile.theme')}</span>
            </div>
            <button onClick={toggleTheme}
              className="w-14 h-7 rounded-full relative transition-all"
              style={{ background: isDark ? 'linear-gradient(135deg, #D4AF37, #B08D2A)' : 'rgba(42, 42, 48, 0.8)' }}>
              <span className="absolute top-1 w-5 h-5 rounded-full bg-white transition-all"
                style={{ [document.documentElement.dir === 'rtl' ? 'right' : 'left']: isDark ? '30px' : '4px' }} />
            </button>
          </div>
        </div>

        {/* Admin Links */}
        {isAdmin && (
          <button onClick={() => navigate('/admin/cars')}
            className="w-full rounded-2xl p-5 flex items-center gap-4"
            style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <Shield className="w-5 h-5" style={{ color: '#D4AF37' }} />
            <span className="text-sm font-semibold flex-1 text-start" style={{ color: '#e0e0e5' }}>{t('profile.adminPanel')}</span>
            <ChevronLeft className="w-5 h-5" style={{ color: '#8888a0' }} />
          </button>
        )}

        {isSuperAdmin && (
          <button onClick={() => navigate('/admin/users')}
            className="w-full rounded-2xl p-5 flex items-center gap-4"
            style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <Users className="w-5 h-5" style={{ color: '#D4AF37' }} />
            <span className="text-sm font-semibold flex-1 text-start" style={{ color: '#e0e0e5' }}>{t('profile.superAdminPanel')}</span>
            <ChevronLeft className="w-5 h-5" style={{ color: '#8888a0' }} />
          </button>
        )}

        {/* Chat */}
        <button onClick={() => navigate('/chat')}
          className="w-full rounded-2xl p-5 flex items-center gap-4"
          style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
          <MessageCircle className="w-5 h-5" style={{ color: '#D4AF37' }} />
          <span className="text-sm font-semibold flex-1 text-start" style={{ color: '#e0e0e5' }}>{t('profile.messages')}</span>
          <ChevronLeft className="w-5 h-5" style={{ color: '#8888a0' }} />
        </button>

        {/* Logout */}
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => { logout(); navigate('/'); }}
          className="w-full rounded-2xl p-5 flex items-center justify-center gap-3"
          style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <LogOut className="w-5 h-5" style={{ color: '#ef4444' }} />
          <span className="text-sm font-semibold" style={{ color: '#ef4444' }}>{t('auth.logout')}</span>
        </motion.button>
      </div>
    </div>
  );
}
