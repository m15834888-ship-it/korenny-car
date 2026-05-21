import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './store/AppContext';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import AdminCarsPage from './pages/AdminCarsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import ChatPage from './pages/ChatPage';
import './i18n';

function AppRoutes() {
  const { user } = useApp();

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" replace />} />
        <Route path="/car/:id" element={user ? <CarDetailPage /> : <Navigate to="/auth" replace />} />
        <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/auth" replace />} />
        <Route path="/payment" element={user ? <PaymentPage /> : <Navigate to="/auth" replace />} />
        <Route path="/wishlist" element={user ? <WishlistPage /> : <Navigate to="/auth" replace />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/auth" replace />} />
        <Route path="/chat" element={user ? <ChatPage /> : <Navigate to="/auth" replace />} />
        <Route path="/admin/cars" element={user?.role === 'admin_cars' || user?.role === 'admin_users' ? <AdminCarsPage /> : <Navigate to="/" replace />} />
        <Route path="/admin/users" element={user?.role === 'admin_users' ? <AdminUsersPage /> : <Navigate to="/" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
