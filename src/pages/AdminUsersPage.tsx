import { useTranslation } from 'react-i18next';
import { useApp } from '../store/AppContext';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

export default function AdminUsersPage() {
  const { t } = useTranslation();
  const { users, deleteUser } = useApp();

  return (
    <div className="pb-24 px-4 pt-4">
      <h1 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>{t('admin.usersTitle')}</h1>

      <div className="space-y-2">
        {users.map(user => (
          <motion.div
            key={user.id}
            layout
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold truncate" style={{ color: '#e0e0e5' }}>{user.name}</h3>
              <p className="text-[10px]" style={{ color: '#8888a0' }}>{user.email}</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: user.role === 'admin_users' ? 'rgba(212, 175, 55, 0.2)' : user.role === 'admin_cars' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(42, 42, 48, 0.5)',
                color: user.role === 'admin_users' ? '#D4AF37' : user.role === 'admin_cars' ? '#3b82f6' : '#8888a0',
              }}>
              {user.role === 'admin_users' ? 'مدير عام' : user.role === 'admin_cars' ? 'مدير سيارات' : 'مستخدم'}
            </span>
            {user.role === 'user' && (
              <button onClick={() => deleteUser(user.id)} className="p-1.5 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <Trash2 className="w-3.5 h-3.5" style={{ color: '#ef4444' }} />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
