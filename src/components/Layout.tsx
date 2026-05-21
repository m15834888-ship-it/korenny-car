import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../store/AppContext';
import { motion } from 'framer-motion';
import { Home, ShoppingCart, Heart, User } from 'lucide-react';

export default function Layout() {
  const { t } = useTranslation();
  const { cart } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/cart', icon: ShoppingCart, label: t('nav.cart'), badge: cart.length },
    { path: '/wishlist', icon: Heart, label: t('nav.wishlist') },
    { path: '/profile', icon: User, label: t('nav.profile') },
  ];

  const hideNav = location.pathname === '/auth' || location.pathname.startsWith('/admin') || location.pathname === '/chat';

  return (
    <div className="min-h-screen" style={{ background: '#0c0c0e' }}>
      <Outlet />
      {!hideNav && (
        <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto" style={{ maxWidth: '480px' }}>
          <div className="flex items-center justify-around px-3 py-3"
            style={{ background: 'rgba(20, 20, 24, 0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}>
            {navItems.map(item => {
              const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <button key={item.path} onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all">
                  {isActive && (
                    <motion.div layoutId="nav-indicator"
                      className="absolute -top-1.5 w-10 h-1 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #D4AF37, #B08D2A)' }} />
                  )}
                  <div className="relative">
                    <Icon className="w-5 h-5" style={{ color: isActive ? '#D4AF37' : '#8888a0' }} />
                    {item.badge ? (
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center"
                        style={{ background: '#D4AF37', color: '#0c0c0e' }}>
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <span className="text-[10px] font-medium" style={{ color: isActive ? '#D4AF37' : '#8888a0' }}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
