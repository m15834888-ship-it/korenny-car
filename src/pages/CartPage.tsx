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
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <ShoppingBag className="w-16 h-16 mb-4" style={{ color: '#2a2a30' }} />
        <p className="text-lg font-semibold" style={{ color: '#8888a0' }}>{t('cart.empty')}</p>
      </div>
    );
  }

  return (
    <div className="pb-24 px-4 pt-4">
      <h1 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>{t('cart.title')}</h1>

      <div className="space-y-3 mb-6">
        <AnimatePresence>
          {cart.map(item => (
            <motion.div
              key={item.car.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}
            >
              <img src={item.car.image_url} alt={item.car.name} className="w-20 h-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate" style={{ color: '#e0e0e5' }}>{item.car.name}</h3>
                <p className="text-xs" style={{ color: '#8888a0' }}>{item.car.brand} · {item.car.year}</p>
                <p className="text-sm font-bold mt-1" style={{ color: '#D4AF37' }}>{item.car.price.toLocaleString()} {t('home.price')}</p>
              </div>
              <button onClick={() => removeFromCart(item.car.id)} className="self-center p-2 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Total */}
      <div className="rounded-2xl p-4 mb-4" style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm" style={{ color: '#8888a0' }}>{t('cart.total')}</span>
          <span className="text-xl font-bold" style={{ color: '#D4AF37' }}>{total.toLocaleString()} {t('home.price')}</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/payment')}
          className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e', boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)' }}
        >
          <CreditCard className="w-4 h-4" />
          {t('cart.checkout')}
        </motion.button>
      </div>
    </div>
  );
}
