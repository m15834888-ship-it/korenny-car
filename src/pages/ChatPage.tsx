import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../store/AppContext';
import { motion } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ChatPage() {
  const { t } = useTranslation();
  const { user, messages, sendMessage } = useApp();
  const [text, setText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText('');
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 72px)' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'rgba(20, 20, 24, 0.9)', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
        <button onClick={() => navigate(-1)} style={{ color: '#8888a0' }}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)', color: '#0c0c0e' }}>
          م
        </div>
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#e0e0e5' }}>{t('chat.withAdmin')}</h3>
          <p className="text-[10px]" style={{ color: '#22c55e' }}>● متصل</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <p className="text-sm" style={{ color: '#8888a0' }}>ابدأ المحادثة...</p>
          </div>
        )}
        {messages.map(msg => {
          const isMe = msg.sender_id === user?.id;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[80%] px-4 py-2.5 rounded-2xl"
                style={{
                  background: isMe ? 'linear-gradient(135deg, #D4AF37, #B08D2A)' : 'rgba(42, 42, 48, 0.8)',
                  color: isMe ? '#0c0c0e' : '#e0e0e5',
                  borderBottomRightRadius: isMe ? '4px' : '16px',
                  borderBottomLeftRadius: isMe ? '16px' : '4px',
                }}
              >
                <p className="text-sm">{msg.content}</p>
                <p className="text-[9px] mt-1 opacity-60">
                  {new Date(msg.created_at).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3" style={{ background: 'rgba(20, 20, 24, 0.9)', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={t('chat.placeholder')}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 py-3 px-4 rounded-xl text-sm outline-none"
            style={{ background: 'rgba(42, 42, 48, 0.6)', border: '1px solid rgba(212, 175, 55, 0.15)', color: '#e0e0e5' }}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #B08D2A)' }}
          >
            <Send className="w-5 h-5" style={{ color: '#0c0c0e' }} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
