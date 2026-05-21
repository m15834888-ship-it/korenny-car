import { useTranslation } from 'react-i18next';
import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, CreditCard } from 'lucide-react';

export default function CartPage() {
  const { t } = useTranslation();
  const { cart, removeFromCart } = useApp();
  const navigate = useNavigate();
  const total = cart.reduce((sum, i) => sum + i.car.price, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5">
        <ShoppingBag className="w-24 h-24 mb-6" style={{ color: '#2a2a30' }} />
        <p className="text-xl font-semibold mb-3" style={{ color: '#8888a0' }}>{t('cart.empty')}</p>
        <button onClick={() => navigate('/')} className="mt-4 px-8 py-3.5 rounded-xl text-base font-semibold"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e' }}>
          {t('nav.home')}
        </button>
      </div>
    );
  }

  return (
    <div className="pb-36 px-5 pt-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#D4AF37' }}>{t('cart.title')}</h1>

      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {cart.map(item => (
            <motion.div key={item.car.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="flex gap-4 p-5 rounded-2xl" style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
              <img src={item.car.image_url} alt={item.car.name} className="w-28 h-20 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold truncate mb-1" style={{ color: '#e0e0e5' }}>{item.car.name}</h3>
                <p className="text-sm mb-2" style={{ color: '#8888a0' }}>{item.car.brand} · {item.car.year}</p>
                <p className="text-base font-bold" style={{ color: '#D4AF37' }}>{item.car.price.toLocaleString()} {t('home.price')}</p>
              </div>
              <button onClick={() => removeFromCart(item.car.id)} className="self-center p-3 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <Trash2 className="w-5 h-5" style={{ color: '#ef4444' }} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="rounded-2xl p-6" style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="flex justify-between items-center mb-6">
          <span className="text-base" style={{ color: '#8888a0' }}>{t('cart.total')}</span>
          <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{total.toLocaleString()} {t('home.price')}</span>
        </div>
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => navigate('/payment')}
          className="w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-3"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e', boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)' }}>
          <CreditCard className="w-5 h-5" />
          {t('cart.checkout')}
        </motion.button>
      </div>
    </div>
  );
}
