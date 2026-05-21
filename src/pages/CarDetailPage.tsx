import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../store/AppContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, ShoppingCart, MessageCircle, Calendar, Tag, Info } from 'lucide-react';
import { useState } from 'react';

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { cars, addToCart, toggleWishlist, isInWishlist, isInCart } = useApp();
  const car = cars.find(c => c.id === id);
  const [imgError, setImgError] = useState(false);

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p style={{ color: '#8888a0' }}>السيارة غير موجودة</p>
      </div>
    );
  }

  const inWishlist = isInWishlist(car.id);
  const inCart = isInCart(car.id);

  return (
    <div className="pb-28">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {!imgError ? (
          <img src={car.image_url} alt={car.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a1f, #2a2a30)' }}>
            <span className="text-6xl">🚗</span>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,12,14,1) 0%, rgba(12,12,14,0.3) 40%, transparent 100%)' }} />

        <button onClick={() => navigate(-1)}
          className="absolute top-5 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', [document.documentElement.dir === 'rtl' ? 'right' : 'left']: '16px' }}>
          <ArrowLeft className="w-5 h-5" style={{ color: '#e0e0e5' }} />
        </button>

        <button onClick={() => toggleWishlist(car.id)}
          className="absolute top-5 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ background: inWishlist ? 'rgba(239, 68, 68, 0.9)' : 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', [document.documentElement.dir === 'rtl' ? 'left' : 'right']: '16px' }}>
          <Heart className="w-5 h-5" fill={inWishlist ? '#fff' : 'none'} color="#fff" />
        </button>

        <span className="absolute bottom-5 px-4 py-1.5 rounded-full text-xs font-bold"
          style={{ background: car.status === 'available' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)', color: '#fff', [document.documentElement.dir === 'rtl' ? 'right' : 'left']: '16px' }}>
          {car.status === 'available' ? t('home.available') : t('home.reserved')}
        </span>
      </div>

      {/* Content */}
      <div className="px-5 -mt-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 mb-4"
          style={{ background: 'rgba(20, 20, 24, 0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(212, 175, 55, 0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>

          <h1 className="text-xl font-bold mb-2" style={{ color: '#D4AF37' }}>{car.name}</h1>
          <p className="text-2xl font-bold mb-5" style={{ color: '#e0e0e5' }}>
            {car.price.toLocaleString()} <span className="text-sm font-normal" style={{ color: '#8888a0' }}>{t('home.price')}</span>
          </p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(42, 42, 48, 0.5)' }}>
              <Calendar className="w-5 h-5 shrink-0" style={{ color: '#D4AF37' }} />
              <div>
                <p className="text-[10px]" style={{ color: '#8888a0' }}>{t('car.year')}</p>
                <p className="text-sm font-semibold" style={{ color: '#e0e0e5' }}>{car.year}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'rgba(42, 42, 48, 0.5)' }}>
              <Tag className="w-5 h-5 shrink-0" style={{ color: '#D4AF37' }} />
              <div>
                <p className="text-[10px]" style={{ color: '#8888a0' }}>{t('car.brand')}</p>
                <p className="text-sm font-semibold" style={{ color: '#e0e0e5' }}>{car.brand}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4" style={{ color: '#D4AF37' }} />
              <h3 className="text-sm font-semibold" style={{ color: '#e0e0e5' }}>{t('car.description')}</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#8888a0' }}>{car.description}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => addToCart(car)} disabled={inCart || car.status === 'reserved'}
              className="flex-1 py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-40"
              style={{ background: inCart ? 'rgba(34, 197, 94, 0.2)' : 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: inCart ? '#22c55e' : '#0c0c0e', boxShadow: inCart ? 'none' : '0 4px 20px rgba(212, 175, 55, 0.3)' }}>
              <ShoppingCart className="w-5 h-5" />
              {inCart ? t('car.addedToCart') : t('car.addToCart')}
            </motion.button>

            <motion.a whileTap={{ scale: 0.95 }}
              href={`https://wa.me/22248907084?text=مرحباً، أريد حجز ${car.name} (${car.brand} ${car.year})`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              style={{ background: 'rgba(37, 211, 102, 0.15)', border: '1px solid rgba(37, 211, 102, 0.3)', color: '#22c55e' }}>
              <MessageCircle className="w-5 h-5" />
              {t('car.bookWhatsApp')}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
