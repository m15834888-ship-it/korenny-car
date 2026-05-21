import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp, type Car } from '../store/AppContext';
import { motion } from 'framer-motion';
import { Search, Heart, ShoppingCart, Check } from 'lucide-react';

const FILTERS = ['all', 'Sedan', 'SUV', 'Sports', 'Luxury', 'Electric'] as const;

export default function HomePage() {
  const { t } = useTranslation();
  const { cars } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return cars.filter(c => {
      const matchSearch = !search || c.name.includes(search) || c.brand.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || c.type === filter;
      return matchSearch && matchFilter;
    });
  }, [cars, search, filter]);

  const filterLabel = (f: string) => {
    if (f === 'all') return t('home.all');
    return t(`home.${f.toLowerCase()}`) || f;
  };

  return (
    <div className="pb-32">
      {/* Hero */}
      <div className="relative px-5 pt-10 pb-8 mb-4" style={{ background: 'linear-gradient(180deg, rgba(212,175,55,0.08) 0%, transparent 100%)' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#D4AF37' }}>
          {t('home.title')}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-base md:text-lg mb-8" style={{ color: '#8888a0' }}>
          {t('home.subtitle')}
        </motion.p>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="relative mb-8">
          <Search className="absolute top-4 w-6 h-6" style={{ color: '#8888a0', [document.documentElement.dir === 'rtl' ? 'right' : 'left']: '16px' }} />
          <input type="text" placeholder={t('nav.search')} value={search} onChange={e => setSearch(e.target.value)}
            className="w-full py-4 rounded-2xl text-base outline-none transition-all focus:ring-2"
            style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.2)', color: '#e0e0e5', paddingInlineStart: '52px', paddingInlineEnd: '20px', backdropFilter: 'blur(10px)' }} />
        </motion.div>

        {/* Filters — أزرار كبيرة ومريحة */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 pb-4">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-8 py-4 rounded-2xl text-base font-bold whitespace-nowrap transition-all duration-300"
              style={{
                background: filter === f ? 'linear-gradient(135deg, #D4AF37, #B08D2A)' : 'rgba(42, 42, 48, 0.6)',
                color: filter === f ? '#0c0c0e' : '#8888a0',
                border: filter === f ? '2px solid #D4AF37' : '2px solid rgba(212, 175, 55, 0.15)',
                boxShadow: filter === f ? '0 4px 15px rgba(212, 175, 55, 0.3)' : 'none',
                minWidth: '80px',
                textAlign: 'center',
              }}>
              {filterLabel(f)}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Cars Grid */}
      <div className="px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((car, i) => (
          <CarCard key={car.id} car={car} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-24">
          <p className="text-xl" style={{ color: '#8888a0' }}>لا توجد نتائج</p>
        </div>
      )}
    </div>
  );
}

function CarCard({ car, index }: { car: Car; index: number }) {
  const { t } = useTranslation();
  const { addToCart, toggleWishlist, isInWishlist, isInCart } = useApp();
  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(car.id);
  const inCart = isInCart(car.id);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden group"
      style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>

      <div className="relative aspect-[4/3] overflow-hidden">
        {!imgError ? (
          <img src={car.image_url} alt={car.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a1f, #2a2a30)' }}>
            <span className="text-5xl">🚗</span>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(12,12,14,0.8) 0%, transparent 50%)' }} />

        <span className="absolute top-3 px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: car.status === 'available' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)', color: '#fff',
            [document.documentElement.dir === 'rtl' ? 'right' : 'left']: '12px' }}>
          {car.status === 'available' ? t('home.available') : t('home.reserved')}
        </span>

        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(car.id); }}
          className="absolute top-3 w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{ background: inWishlist ? 'rgba(239, 68, 68, 0.9)' : 'rgba(0,0,0,0.5)',
            [document.documentElement.dir === 'rtl' ? 'left' : 'right']: '12px' }}>
          <Heart className="w-5 h-5" fill={inWishlist ? '#fff' : 'none'} color="#fff" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold truncate mb-1" style={{ color: '#e0e0e5' }}>{car.name}</h3>
        <p className="text-xs mb-3" style={{ color: '#8888a0' }}>{car.brand} · {car.year}</p>
        <p className="text-base font-bold mb-4" style={{ color: '#D4AF37' }}>
          {car.price.toLocaleString()} <span className="text-xs font-normal">{t('home.price')}</span>
        </p>

        <button onClick={() => addToCart(car)} disabled={inCart || car.status === 'reserved'}
          className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-40"
          style={{
            background: inCart ? 'rgba(34, 197, 94, 0.2)' : 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(176, 141, 42, 0.2))',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: inCart ? '#22c55e' : '#D4AF37',
          }}>
          {inCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
          {inCart ? t('car.addedToCart') : t('car.addToCart')}
        </button>
      </div>
    </motion.div>
  );
}
