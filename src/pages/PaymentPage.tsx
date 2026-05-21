import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../store/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Copy, Check, CreditCard, Home } from 'lucide-react';

export default function PaymentPage() {
  const { t } = useTranslation();
  const { createOrder } = useApp();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [paid, setPaid] = useState(false);

  const accountNumber = '48907084';

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaid = () => {
    createOrder();
    setPaid(true);
  };

  if (paid) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring' }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ background: 'rgba(34, 197, 94, 0.2)' }}
        >
          <Check className="w-10 h-10" style={{ color: '#22c55e' }} />
        </motion.div>
        <h2 className="text-xl font-bold mb-2" style={{ color: '#e0e0e5' }}>{t('payment.success')}</h2>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          className="mt-6 px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e' }}
        >
          <Home className="w-4 h-4" />
          {t('payment.backToHome')}
        </motion.button>
      </div>
    );
  }

  return (
    <div className="pb-24 px-4 pt-4">
      <h1 className="text-xl font-bold mb-2" style={{ color: '#D4AF37' }}>{t('payment.title')}</h1>
      <p className="text-sm mb-6" style={{ color: '#8888a0' }}>{t('payment.subtitle')}</p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 text-center"
        style={{
          background: 'rgba(20, 20, 24, 0.9)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 60px rgba(212, 175, 55, 0.05)',
        }}
      >
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)' }}>
          <CreditCard className="w-8 h-8" style={{ color: '#0c0c0e' }} />
        </div>

        <p className="text-sm mb-2" style={{ color: '#8888a0' }}>{t('payment.accountNumber')}</p>

        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-3xl font-bold tracking-widest" dir="ltr" style={{ color: '#D4AF37' }}>{accountNumber}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className="p-2 rounded-lg"
            style={{ background: copied ? 'rgba(34, 197, 94, 0.2)' : 'rgba(212, 175, 55, 0.15)' }}
          >
            {copied ? <Check className="w-5 h-5" style={{ color: '#22c55e' }} /> : <Copy className="w-5 h-5" style={{ color: '#D4AF37' }} />}
          </motion.button>
        </div>

        {copied && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs mb-4"
            style={{ color: '#22c55e' }}
          >
            {t('payment.copied')}
          </motion.p>
        )}

        <div className="p-4 rounded-xl mb-6" style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px dashed rgba(212, 175, 55, 0.3)' }}>
          <p className="text-sm" style={{ color: '#8888a0' }}>{t('payment.confirmText')}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handlePaid}
          className="w-full py-4 rounded-xl text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e', boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)' }}
        >
          {t('payment.confirmBtn')}
        </motion.button>
      </motion.div>
    </div>
  );
}
