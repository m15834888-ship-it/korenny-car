import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import i18n from '../i18n/index.tsx';

export interface Car {
  id: string;
  name: string;
  brand: string;
  type: 'Sedan' | 'SUV' | 'Sports' | 'Luxury' | 'Electric';
  price: number;
  year: number;
  description: string;
  image_url: string;
  status: 'available' | 'reserved';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin_cars' | 'admin_users';
}

export interface CartItem {
  car: Car;
  addedAt: number;
}

export interface Order {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  created_at: string;
}

interface AppState {
  user: User | null;
  users: User[];
  cars: Car[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  messages: Message[];
  isDark: boolean;
  language: string;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addToCart: (car: Car) => void;
  removeFromCart: (carId: string) => void;
  clearCart: () => void;
  toggleWishlist: (carId: string) => void;
  isInWishlist: (carId: string) => boolean;
  isInCart: (carId: string) => boolean;
  createOrder: () => void;
  confirmOrder: (orderId: string) => void;
  addCar: (car: Omit<Car, 'id'>) => void;
  updateCar: (id: string, car: Partial<Car>) => void;
  deleteCar: (id: string) => void;
  deleteUser: (id: string) => void;
  sendMessage: (content: string) => void;
  toggleTheme: () => void;
  setLanguage: (lang: string) => void;
}

const defaultCars: Car[] = [
  {
    id: '1',
    name: 'تويوتا كامري',
    brand: 'Toyota',
    type: 'Sedan',
    price: 850000,
    year: 2022,
    description: 'سيارة سيدان فاخرة بحالة ممتازة، مكيف شاشة، كاميرا خلفية، مقاعد جلد. محرك 2.5 لتر بقوة 203 حصان. استهلاك وقود ممتاز.',
    image_url: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop',
    status: 'available',
  },
  {
    id: '2',
    name: 'هيونداي توسان',
    brand: 'Hyundai',
    type: 'SUV',
    price: 1200000,
    year: 2023,
    description: 'دفع رباعي عائلية بتقنيات حديثة. شاشة لمس 10 بوصة، نظام ملاحة، 7 مقاعد. مثالية للعائلات.',
    image_url: 'https://images.unsplash.com/photo-1606611013016-969c19ba27d5?w=600&h=400&fit=crop',
    status: 'available',
  },
  {
    id: '3',
    name: 'مرسيدس C-Class',
    brand: 'Mercedes',
    type: 'Luxury',
    price: 2500000,
    year: 2023,
    description: 'سيارة فاخرة بامتياز. داخلية جلد فاخر، نظام صوت Burmester، إضاءة محيطية 64 لون. محرك تيربو 2.0 لتر.',
    image_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop',
    status: 'available',
  },
  {
    id: '4',
    name: 'بي إم دبليو M4',
    brand: 'BMW',
    type: 'Sports',
    price: 3200000,
    year: 2024,
    description: 'سيارة رياضية خارقة. محرك 6 سلندر تيربو بقوة 473 حصان. من 0 إلى 100 في 3.8 ثانية. تصميم عدواني وأداء استثنائي.',
    image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
    status: 'available',
  },
  {
    id: '5',
    name: 'تيسلا موديل 3',
    brand: 'Tesla',
    type: 'Electric',
    price: 1800000,
    year: 2024,
    description: 'سيارة كهربائية بالكامل. مدى 568 كم، شحن سريع، قيادة ذاتية مساعدة. شاشة 15 بوصة، سقف زجاجي.',
    image_url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
    status: 'available',
  },
  {
    id: '6',
    name: 'لاند روفر رينج روفر',
    brand: 'Land Rover',
    type: 'SUV',
    price: 4500000,
    year: 2024,
    description: 'أقوى SUV فاخر في العالم. محرك V8 بقوة 523 حصان. نظام دفع رباعي متقدم. داخلية جلد وورش خشبية فاخرة.',
    image_url: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=600&h=400&fit=crop',
    status: 'available',
  },
  {
    id: '7',
    name: 'هوندا سيفيك',
    brand: 'Honda',
    type: 'Sedan',
    price: 650000,
    year: 2021,
    description: 'سيارة اقتصادية وموثوقة. استهلاك وقود منخفض، صيانة رخيصة. مثالية للاستخدام اليومي. مكيف، بلوتوث.',
    image_url: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop',
    status: 'available',
  },
  {
    id: '8',
    name: 'بورش 911',
    brand: 'Porsche',
    type: 'Sports',
    price: 5500000,
    year: 2024,
    description: 'أيقونة السيارات الرياضية. محرك 6 سلندر بوكستر بقوة 443 حصان. تصميم كلاسيكي لا يتغير. أداء لا يُضاهى.',
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
    status: 'reserved',
  },
];

const defaultUsers: User[] = [
  { id: 'admin-cars', email: 'admin@korenny.com', name: 'مدير السيارات', role: 'admin_cars' },
  { id: 'admin-users', email: 'superadmin@korenny.com', name: 'المدير العام', role: 'admin_users' },
];

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('korenny-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('korenny-users');
    return saved ? JSON.parse(saved) : defaultUsers;
  });

  const [cars, setCars] = useState<Car[]>(() => {
    const saved = localStorage.getItem('korenny-cars');
    return saved ? JSON.parse(saved) : defaultCars;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('korenny-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('korenny-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('korenny-orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('korenny-messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('korenny-theme');
    return saved ? saved === 'dark' : true;
  });

  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('korenny-lang') || 'ar';
  });

  // Persist state
  useEffect(() => { localStorage.setItem('korenny-user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('korenny-users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('korenny-cars', JSON.stringify(cars)); }, [cars]);
  useEffect(() => { localStorage.setItem('korenny-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('korenny-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('korenny-orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('korenny-messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('korenny-theme', isDark ? 'dark' : 'light'); }, [isDark]);
  useEffect(() => { localStorage.setItem('korenny-lang', language); }, [language]);

  useEffect(() => {
    document.documentElement.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const login = useCallback((email: string, password: string): boolean => {
    if (password !== 'admin123') return false;
    const found = users.find(u => u.email === email);
    if (found) { setUser(found); return true; }
    const newUser: User = {
      id: 'user-' + Date.now(),
      email,
      name: email.split('@')[0],
      role: 'user',
    };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return true;
  }, [users]);

  const register = useCallback((name: string, email: string, _password: string): boolean => {
    if (users.find(u => u.email === email)) return false;
    const newUser: User = {
      id: 'user-' + Date.now(),
      email,
      name,
      role: 'user',
    };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return true;
  }, [users]);

  const logout = useCallback(() => { setUser(null); }, []);

  const addToCart = useCallback((car: Car) => {
    setCart(prev => {
      if (prev.find(i => i.car.id === car.id)) return prev;
      return [...prev, { car, addedAt: Date.now() }];
    });
  }, []);

  const removeFromCart = useCallback((carId: string) => {
    setCart(prev => prev.filter(i => i.car.id !== carId));
  }, []);

  const clearCart = useCallback(() => { setCart([]); }, []);

  const toggleWishlist = useCallback((carId: string) => {
    setWishlist(prev => prev.includes(carId) ? prev.filter(id => id !== carId) : [...prev, carId]);
  }, []);

  const isInWishlist = useCallback((carId: string) => wishlist.includes(carId), [wishlist]);
  const isInCart = useCallback((carId: string) => cart.some(i => i.car.id === carId), [cart]);

  const createOrder = useCallback(() => {
    if (!user || cart.length === 0) return;
    const order: Order = {
      id: 'order-' + Date.now(),
      user_id: user.id,
      user_name: user.name,
      user_email: user.email,
      items: [...cart],
      total: cart.reduce((sum, i) => sum + i.car.price, 0),
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    setOrders(prev => [...prev, order]);
    setCart([]);
  }, [user, cart]);

  const confirmOrder = useCallback((orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'confirmed' } : o));
  }, []);

  const addCar = useCallback((car: Omit<Car, 'id'>) => {
    setCars(prev => [...prev, { ...car, id: 'car-' + Date.now() }]);
  }, []);

  const updateCar = useCallback((id: string, updates: Partial<Car>) => {
    setCars(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCar = useCallback((id: string) => {
    setCars(prev => prev.filter(c => c.id !== id));
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!user) return;
    const msg: Message = {
      id: 'msg-' + Date.now(),
      sender_id: user.id,
      sender_name: user.name,
      content,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, msg]);
  }, [user]);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);

  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
  }, []);

  return (
    <AppContext.Provider value={{
      user, users, cars, cart, wishlist, orders, messages, isDark, language,
      login, register, logout, addToCart, removeFromCart, clearCart,
      toggleWishlist, isInWishlist, isInCart, createOrder, confirmOrder,
      addCar, updateCar, deleteCar, deleteUser, sendMessage, toggleTheme, setLanguage,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
