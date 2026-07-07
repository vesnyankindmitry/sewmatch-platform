import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Send,
  Paperclip,
  Info,
  X,
  Shirt,
  Palette,
  Package,
  Clock,
  Award,
  DollarSign,
  MessageCircle,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Conversation {
  id: number;
  name: string;
  initial: string;
  color: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

interface Message {
  id: number;
  text: string;
  sent: boolean;
  timestamp: string;
  dateSeparator?: string;
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    name: 'Pacific Cut & Sew',
    initial: 'P',
    color: 'bg-teal',
    lastMessage: 'We can definitely hit that timeline. Let me send over a quote.',
    time: '2m ago',
    unread: 2,
    online: true,
    messages: [
      { id: 1, text: 'Hey! Thanks for connecting.', sent: false, timestamp: '9:30 AM', dateSeparator: 'Today' },
      { id: 2, text: 'Hi! I saw your profile and thought you\'d be a great match for our line.', sent: true, timestamp: '9:32 AM' },
      { id: 3, text: 'We specialize in organic cotton knits. Looking at about 1,200 units for our first run.', sent: true, timestamp: '9:33 AM' },
      { id: 4, text: 'That sounds perfect. We work with organic cotton all the time. What\'s your timeline?', sent: false, timestamp: '9:45 AM' },
      { id: 5, text: 'We\'re hoping for 4-6 weeks. Is that doable?', sent: true, timestamp: '10:00 AM' },
      { id: 6, text: 'We can definitely hit that timeline. Let me send over a quote.', sent: false, timestamp: '10:15 AM' },
    ],
  },
  {
    id: 2,
    name: 'Metro Apparel Solutions',
    initial: 'M',
    color: 'bg-coral',
    lastMessage: 'Our MOQ for outerwear starts at 200 units.',
    time: '1h ago',
    unread: 1,
    online: false,
    messages: [
      { id: 1, text: 'Hello, interested in your outerwear capabilities.', sent: true, timestamp: 'Yesterday', dateSeparator: 'Yesterday' },
      { id: 2, text: 'Thanks for reaching out! What type of outerwear are you looking at?', sent: false, timestamp: 'Yesterday' },
      { id: 3, text: 'Lightweight jackets, nylon shells.', sent: true, timestamp: 'Yesterday' },
      { id: 4, text: 'Our MOQ for outerwear starts at 200 units.', sent: false, timestamp: '1h ago', dateSeparator: 'Today' },
    ],
  },
  {
    id: 3,
    name: 'Denim Craft USA',
    initial: 'D',
    color: 'bg-blue-500',
    lastMessage: 'Let me know if you want to schedule a factory visit.',
    time: '3h ago',
    unread: 0,
    online: true,
    messages: [
      { id: 1, text: 'Hi, do you offer sample development for denim?', sent: true, timestamp: 'Mon', dateSeparator: 'Monday' },
      { id: 2, text: 'Yes, we have a full sampling department. 2-week turnaround.', sent: false, timestamp: 'Mon' },
      { id: 3, text: 'Let me know if you want to schedule a factory visit.', sent: false, timestamp: '3h ago', dateSeparator: 'Today' },
    ],
  },
  {
    id: 4,
    name: 'Carolina Stitch Works',
    initial: 'C',
    color: 'bg-amber-500',
    lastMessage: 'We can work with that budget.',
    time: '5h ago',
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: 'What\'s your typical pricing for knitwear?', sent: true, timestamp: 'Tue', dateSeparator: 'Tuesday' },
      { id: 2, text: 'Depends on the gauge and yarn. What are you thinking?', sent: false, timestamp: 'Tue' },
      { id: 3, text: 'Mid-gauge, merino wool blend. Around $18/unit.', sent: true, timestamp: 'Tue' },
      { id: 4, text: 'We can work with that budget.', sent: false, timestamp: '5h ago', dateSeparator: 'Today' },
    ],
  },
  {
    id: 5,
    name: 'Southeast Sewing Co.',
    initial: 'S',
    color: 'bg-violet-500',
    lastMessage: 'Certifications are all up to date. I\'ll send them over.',
    time: '1d ago',
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: 'Are you WRAP certified?', sent: true, timestamp: 'Wed', dateSeparator: 'Wednesday' },
      { id: 2, text: 'Yes, and BSCI as well.', sent: false, timestamp: 'Wed' },
      { id: 3, text: 'Certifications are all up to date. I\'ll send them over.', sent: false, timestamp: '1d ago', dateSeparator: 'Today' },
    ],
  },
  {
    id: 6,
    name: 'LA Pattern & Stitch',
    initial: 'L',
    color: 'bg-rose-500',
    lastMessage: 'Looking forward to working together!',
    time: '2d ago',
    unread: 0,
    online: true,
    messages: [
      { id: 1, text: 'Love your luxury work. Do you take smaller runs?', sent: true, timestamp: 'Thu', dateSeparator: 'Thursday' },
      { id: 2, text: 'Thank you! Yes, our MOQ is 50 for established brands.', sent: false, timestamp: 'Thu' },
      { id: 3, text: 'Looking forward to working together!', sent: false, timestamp: '2d ago', dateSeparator: 'Today' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Tech Spec Panel Data                                               */
/* ------------------------------------------------------------------ */

function TechSpecPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="w-80 bg-white border-l border-mist flex flex-col overflow-y-auto"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="p-4 border-b border-mist flex items-center justify-between">
            <h3 className="font-bold text-navy flex items-center gap-2">
              <Package size={16} className="text-teal" />
              Tech Spec
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-gray-100 transition"
            >
              <X size={16} className="text-slate" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="bg-warm-sand rounded-xl p-4">
              <div className="flex items-center gap-2 text-teal font-medium mb-2">
                <Shirt size={16} />
                Product
              </div>
              <p className="text-sm text-navy font-medium">Organic Cotton T-Shirts</p>
              <p className="text-xs text-slate">Basic Style · 180g Cotton Jersey</p>
            </div>
            <div className="bg-warm-sand rounded-xl p-4">
              <div className="flex items-center gap-2 text-teal font-medium mb-2">
                <Palette size={16} />
                Color
              </div>
              <p className="text-sm text-navy font-medium">Heather Grey</p>
              <p className="text-xs text-slate">Pantone 16-0000</p>
            </div>
            <div className="bg-warm-sand rounded-xl p-4">
              <div className="flex items-center gap-2 text-teal font-medium mb-2">
                <Package size={16} />
                Quantity & Sizes
              </div>
              <p className="text-sm text-navy font-medium">1,200 units</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-white rounded text-xs text-slate"
                  >
                    {s}: 300
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-warm-sand rounded-xl p-4">
              <div className="flex items-center gap-2 text-teal font-medium mb-2">
                <Clock size={16} />
                Timeline
              </div>
              <p className="text-sm text-navy font-medium">Standard (4-6 weeks)</p>
            </div>
            <div className="bg-warm-sand rounded-xl p-4">
              <div className="flex items-center gap-2 text-teal font-medium mb-2">
                <Award size={16} />
                Quality
              </div>
              <p className="text-sm text-navy font-medium">Premium AQL 1.5</p>
              <p className="text-xs text-slate">OEKO-TEX, GOTS Certified</p>
            </div>
            <div className="bg-warm-sand rounded-xl p-4">
              <div className="flex items-center gap-2 text-teal font-medium mb-2">
                <DollarSign size={16} />
                Budget
              </div>
              <p className="text-sm text-navy font-medium">$12-15 / unit</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function Chat() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [inputText, setInputText] = useState('');
  const [showTechSpec, setShowTechSpec] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selected = conversations.find((c) => c.id === selectedId) || null;

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected?.messages.length]);

  const handleSend = () => {
    if (!inputText.trim() || !selectedId) return;

    const newMsg: Message = {
      id: Date.now(),
      text: inputText.trim(),
      sent: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: newMsg.text,
              time: 'now',
            }
          : c
      )
    );
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Mark as read when selected
  useEffect(() => {
    if (selectedId) {
      setConversations((prev) =>
        prev.map((c) => (c.id === selectedId ? { ...c, unread: 0 } : c))
      );
    }
  }, [selectedId]);

  /* ==================== EMPTY STATE ==================== */
  if (!selected) {
    return (
      <div className="h-[calc(100vh-64px)] flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-mist bg-white flex flex-col">
          <div className="p-4 border-b border-mist">
            <h2 className="font-bold text-navy mb-3">Conversations</h2>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate"
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition text-sm"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={`w-full flex items-start gap-3 p-4 text-left transition hover:bg-gray-50 ${
                  selectedId === conv.id
                    ? 'bg-warm-sand border-l-4 border-teal'
                    : 'border-l-4 border-transparent'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${conv.color} flex items-center justify-center text-white font-bold flex-shrink-0 relative`}
                >
                  {conv.initial}
                  {conv.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-navy text-sm truncate">
                      {conv.name}
                    </span>
                    <span className="text-xs text-slate ml-2">{conv.time}</span>
                  </div>
                  <p className="text-xs text-slate truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-teal text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {conv.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageCircle size={48} className="text-mist mx-auto mb-4" />
            <h3 className="text-lg font-medium text-navy mb-1">
              Select a conversation
            </h3>
            <p className="text-sm text-slate">
              Choose a conversation to start messaging
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ==================== CHAT INTERFACE ==================== */
  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-mist bg-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-mist">
          <h2 className="font-bold text-navy mb-3">Conversations</h2>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate"
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedId(conv.id)}
              className={`w-full flex items-start gap-3 p-4 text-left transition hover:bg-gray-50 ${
                selectedId === conv.id
                  ? 'bg-warm-sand border-l-4 border-teal'
                  : 'border-l-4 border-transparent'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full ${conv.color} flex items-center justify-center text-white font-bold flex-shrink-0 relative`}
              >
                {conv.initial}
                {conv.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy text-sm truncate">
                    {conv.name}
                  </span>
                  <span className="text-xs text-slate ml-2">{conv.time}</span>
                </div>
                <p className="text-xs text-slate truncate mt-0.5">
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-teal text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                  {conv.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-mist px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full ${selected.color} flex items-center justify-center text-white font-bold relative`}
            >
              {selected.initial}
              {selected.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <div className="font-semibold text-navy">{selected.name}</div>
              <div className="text-xs text-slate flex items-center gap-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    selected.online ? 'bg-emerald-400' : 'bg-slate'
                  }`}
                />
                {selected.online ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowTechSpec(!showTechSpec)}
            className={`p-2 rounded-xl transition ${
              showTechSpec
                ? 'bg-teal text-white'
                : 'hover:bg-gray-100 text-slate'
            }`}
          >
            <Info size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-1">
            {selected.messages.map((msg, idx) => {
              const showDate =
                msg.dateSeparator &&
                (idx === 0 ||
                  selected.messages[idx - 1].dateSeparator !==
                    msg.dateSeparator);

              return (
                <div key={msg.id}>
                  {showDate && msg.dateSeparator && (
                    <div className="flex justify-center my-4">
                      <span className="text-xs text-slate bg-mist px-3 py-1 rounded-full">
                        {msg.dateSeparator}
                      </span>
                    </div>
                  )}
                  <motion.div
                    className={`flex ${msg.sent ? 'justify-end' : 'justify-start'} mb-2`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-3 ${
                        msg.sent
                          ? 'bg-teal text-white rounded-2xl rounded-tr-sm'
                          : 'bg-white text-slate border border-mist rounded-2xl rounded-tl-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p
                        className={`text-[10px] mt-1 ${
                          msg.sent ? 'text-white/70' : 'text-slate'
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-mist px-6 py-3">
          <div className="flex items-end gap-3">
            <button className="p-3 rounded-xl hover:bg-gray-100 transition text-slate flex-shrink-0">
              <Paperclip size={18} />
            </button>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition resize-none text-sm"
            />
            <motion.button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`p-3 rounded-full flex-shrink-0 transition ${
                inputText.trim()
                  ? 'bg-teal text-white hover:opacity-90'
                  : 'bg-mist text-slate cursor-not-allowed'
              }`}
              whileHover={inputText.trim() ? { scale: 1.05 } : {}}
              whileTap={inputText.trim() ? { scale: 0.95 } : {}}
            >
              <Send size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Tech Spec Panel */}
      <TechSpecPanel isOpen={showTechSpec} onClose={() => setShowTechSpec(false)} />
    </div>
  );
}
