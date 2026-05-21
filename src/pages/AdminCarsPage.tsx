import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp, type Car } from '../store/AppContext';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, X, Check, Clock, User } from 'lucide-react';

export default function AdminCarsPage() {
  const { t } = useTranslation();
  const { cars, orders, addCar, updateCar, deleteCar, confirmOrder } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', brand: '', type: 'Sedan' as Car['type'], price: '', year: '', description: '', image_url: '' });

  const resetForm = () => { setForm({ name: '', brand: '', type: 'Sedan', price: '', year: '', description: '', image_url: '' }); setEditId(null); setShowAdd(false); };

  const handleSave = () => {
    if (!form.name || !form.brand || !form.price) return;
    const carData = { name: form.name, brand: form.brand, type: form.type, price: Number(form.price), year: Number(form.year) || 2024, description: form.description, image_url: form.image_url || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop', status: 'available' as const };
    if (editId) { updateCar(editId, carData); } else { addCar(carData); }
    resetForm();
  };

  const startEdit = (car: Car) => { setForm({ name: car.name, brand: car.brand, type: car.type, price: String(car.price), year: String(car.year), description: car.description, image_url: car.image_url }); setEditId(car.id); setShowAdd(true); };
  const pendingOrders = orders.filter(o => o.status === 'pending');

  return (
    <div className="pb-28 px-5 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold" style={{ color: '#D4AF37' }}>{t('admin.carsTitle')}</h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowAdd(!showAdd)}
          className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)' }}>
          {showAdd ? <X className="w-5 h-5" style={{ color: '#0c0c0e' }} /> : <Plus className="w-5 h-5" style={{ color: '#0c0c0e' }} />}
        </motion.button>
      </div>

      {showAdd && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="rounded-2xl p-5 mb-5 space-y-4" style={{ background: 'rgba(20, 20, 24, 0.9)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <input placeholder={t('admin.carName')} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full py-3 px-4 rounded-xl text-sm outline-none" style={{ background: 'rgba(42, 42, 48, 0.6)', border: '1px solid rgba(212, 175, 55, 0.15)', color: '#e0e0e5' }} />
          <div className="grid grid-cols-2 gap-4">
            <input placeholder={t('admin.carBrand')} value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
              className="py-3 px-4 rounded-xl text-sm outline-none" style={{ background: 'rgba(42, 42, 48, 0.6)', border: '1px solid rgba(212, 175, 55, 0.15)', color: '#e0e0e5' }} />
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as Car['type'] }))}
              className="py-3 px-4 rounded-xl text-sm outline-none" style={{ background: 'rgba(42, 42, 48, 0.6)', border: '1px solid rgba(212, 175, 55, 0.15)', color: '#e0e0e5' }}>
              <option value="Sedan">Sedan</option><option value="SUV">SUV</option><option value="Sports">Sports</option><option value="Luxury">Luxury</option><option value="Electric">Electric</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder={t('admin.carPrice')} type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              className="py-3 px-4 rounded-xl text-sm outline-none" style={{ background: 'rgba(42, 42, 48, 0.6)', border: '1px solid rgba(212, 175, 55, 0.15)', color: '#e0e0e5' }} />
            <input placeholder={t('admin.carYear')} type="number" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
              className="py-3 px-4 rounded-xl text-sm outline-none" style={{ background: 'rgba(42, 42, 48, 0.6)', border: '1px solid rgba(212, 175, 55, 0.15)', color: '#e0e0e5' }} />
          </div>
          <input placeholder={t('admin.carImage')} value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
            className="w-full py-3 px-4 rounded-xl text-sm outline-none" style={{ background: 'rgba(42, 42, 48, 0.6)', border: '1px solid rgba(212, 175, 55, 0.15)', color: '#e0e0e5' }} />
          <textarea placeholder={t('admin.carDesc')} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full py-3 px-4 rounded-xl text-sm outline-none resize-none h-24" style={{ background: 'rgba(42, 42, 48, 0.6)', border: '1px solid rgba(212, 175, 55, 0.15)', color: '#e0e0e5' }} />
          <div className="flex gap-3">
            <button onClick={handleSave} className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e' }}>
              <Check className="w-4 h-4" /> {t('admin.save')}
            </button>
            <button onClick={resetForm} className="px-5 py-3 rounded-xl text-sm" style={{ background: 'rgba(42, 42, 48, 0.6)', color: '#8888a0' }}>
              {t('admin.cancel')}
            </button>
          </div>
        </motion.div>
      )}

      {pendingOrders.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#D4AF37' }}>
            <Clock className="w-4 h-4" /> {t('admin.pendingOrders')} ({pendingOrders.length})
          </h2>
          {pendingOrders.map(order => (
            <div key={order.id} className="rounded-xl p-4 mb-3" style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4" style={{ color: '#8888a0' }} />
                <span className="text-xs" style={{ color: '#e0e0e5' }}>{order.user_name}</span>
                <span className="text-xs" style={{ color: '#8888a0' }}>{order.user_email}</span>
              </div>
              <p className="text-xs mb-3" style={{ color: '#8888a0' }}>
                {order.items.map(i => i.car.name).join(' + ')} — <span style={{ color: '#D4AF37' }}>{order.total.toLocaleString()} MRU</span>
              </p>
              <button onClick={() => confirmOrder(order.id)} className="px-4 py-2 rounded-xl text-xs font-bold"
                style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
                {t('admin.confirmOrder')}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {cars.map(car => (
          <div key={car.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'rgba(20, 20, 24, 0.8)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
            <img src={car.image_url} alt={car.name} className="w-16 h-12 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold truncate" style={{ color: '#e0e0e5' }}>{car.name}</h3>
              <p className="text-[10px]" style={{ color: '#D4AF37' }}>{car.price.toLocaleString()} MRU</p>
            </div>
            <select value={car.status} onChange={e => updateCar(car.id, { status: e.target.value as Car['status'] })}
              className="py-1.5 px-3 rounded-lg text-[10px] outline-none"
              style={{ background: 'rgba(42, 42, 48, 0.6)', color: car.status === 'available' ? '#22c55e' : '#ef4444', border: 'none' }}>
              <option value="available">{t('home.available')}</option>
              <option value="reserved">{t('home.reserved')}</option>
            </select>
            <button onClick={() => startEdit(car)} className="p-2 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.1)' }}>
              <Edit className="w-4 h-4" style={{ color: '#D4AF37' }} />
            </button>
            <button onClick={() => deleteCar(car.id)} className="p-2 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
              <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
