import { useTranslation } from 'react-i18next';
import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { t } = useTranslation();
  const { cars, wishlist, toggleWishlist } = useApp();
  const navigate = useNavigate();
  const wishlistCars = cars.filter(c => wishlist.includes(c.id));

  if (wishlistCars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-5">
        <Heart className="w-20 h-20 mb-5" style={{ color: '#2a2a30' }} />
        <p className="text-lg font-semibold mb-2" style={{ color: '#8888a0' }}>{t('wishlist.empty')}</p>
        <button onClick={() => navigate('/')} className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e' }}>
          {t('nav.home')}
        </button>
      </div>
    );
  }

  return (
    <div className="pb-28 px-5 pt-6">
      <h1 className="text-xl font-bold mb-5" style={{ color: '#D4AF37' }}>{t('wishlist.title')}</h1>
      <div className="grid grid-cols-2 gap-4">
        {wishlistCars.map((car, i) => (
          <motion.div key={car.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl overflow-hidden" style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <div className="relative aspect-[4/3] cursor-pointer" onClick={() => navigate(`/car/${car.id}`)}>
              <img src={car.image_url} alt={car.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold truncate mb-1" style={{ color: '#e0e0e5' }}>{car.name}</h3>
              <p className="text-xs mb-3" style={{ color: '#D4AF37' }}>{car.price.toLocaleString()} {t('home.price')}</p>
              <div className="flex gap-3">
                <button onClick={() => navigate(`/car/${car.id}`)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold"
                  style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(176, 141, 42, 0.2))', color: '#D4AF37' }}>
                  عرض
                </button>
                <button onClick={() => toggleWishlist(car.id)}
                  className="p-2 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                  <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
