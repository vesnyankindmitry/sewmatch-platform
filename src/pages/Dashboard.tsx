import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  X,
  MapPin,
  CheckCircle,
  MessageCircle,
  TrendingUp,
  Eye,
  Clock,
  Star,
  Building2,
  Shirt,
  AlertTriangle,
  Search,
  Zap,
  Filter,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type View = 'brand' | 'manufacturer';

interface Factory {
  id: number;
  name: string;
  location: string;
  verified: boolean;
  specializations: string[];
  moqMin: number;
  moqMax: number;
  matchScore: number;
  leadTime: string;
  gradient: string;
}

interface BrandNotification {
  id: number;
  name: string;
  initial: string;
  product: string;
  quantity: number;
  matchScore: number;
  color: string;
}

interface BrandRow {
  id: number;
  name: string;
  product: string;
  qty: number;
  timeline: string;
  matchScore: number;
  status: 'New' | 'Contacted' | 'In Progress';
}

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const FACTORIES: Factory[] = [
  {
    id: 1,
    name: 'Pacific Cut & Sew',
    location: 'Los Angeles, CA',
    verified: true,
    specializations: ['Knits', 'Activewear', 'T-Shirts'],
    moqMin: 100,
    moqMax: 5000,
    matchScore: 94,
    leadTime: '4-6 weeks',
    gradient: 'from-teal-400 to-emerald-400',
  },
  {
    id: 2,
    name: 'Metro Apparel Solutions',
    location: 'New York, NY',
    verified: true,
    specializations: ['Wovens', 'Outerwear', 'Denim'],
    moqMin: 200,
    moqMax: 10000,
    matchScore: 88,
    leadTime: '6-8 weeks',
    gradient: 'from-coral to-orange-400',
  },
  {
    id: 3,
    name: 'Denim Craft USA',
    location: 'Austin, TX',
    verified: true,
    specializations: ['Denim', 'Jeans', 'Washes'],
    moqMin: 150,
    moqMax: 3000,
    matchScore: 91,
    leadTime: '3-5 weeks',
    gradient: 'from-blue-400 to-indigo-400',
  },
  {
    id: 4,
    name: 'Carolina Stitch Works',
    location: 'Charlotte, NC',
    verified: false,
    specializations: ['Knitwear', 'Sweaters', 'Layers'],
    moqMin: 75,
    moqMax: 2500,
    matchScore: 82,
    leadTime: '5-7 weeks',
    gradient: 'from-amber-400 to-yellow-400',
  },
  {
    id: 5,
    name: 'Southeast Sewing Co.',
    location: 'Atlanta, GA',
    verified: true,
    specializations: ['Full Package', 'Sportswear', 'Uniforms'],
    moqMin: 300,
    moqMax: 15000,
    matchScore: 86,
    leadTime: '4-8 weeks',
    gradient: 'from-violet-400 to-purple-400',
  },
  {
    id: 6,
    name: 'LA Pattern & Stitch',
    location: 'Commerce, CA',
    verified: true,
    specializations: ['Pattern Making', 'Sampling', 'Luxury'],
    moqMin: 50,
    moqMax: 1000,
    matchScore: 79,
    leadTime: '2-4 weeks',
    gradient: 'from-rose-400 to-pink-400',
  },
];

const BRAND_NOTIFICATIONS: BrandNotification[] = [
  {
    id: 1,
    name: 'Nouvella Apparel',
    initial: 'N',
    product: 'Organic Cotton Tees',
    quantity: 1200,
    matchScore: 96,
    color: 'bg-coral',
  },
  {
    id: 2,
    name: 'Stride Athletics',
    initial: 'S',
    product: 'Performance Leggings',
    quantity: 800,
    matchScore: 92,
    color: 'bg-teal',
  },
  {
    id: 3,
    name: 'Haven & Co.',
    initial: 'H',
    product: 'Linen Dresses',
    quantity: 500,
    matchScore: 87,
    color: 'bg-navy',
  },
  {
    id: 4,
    name: 'Iron Fit Gear',
    initial: 'I',
    product: 'Compression Wear',
    quantity: 2000,
    matchScore: 84,
    color: 'bg-slate',
  },
];

const BRANDS_TABLE: BrandRow[] = [
  {
    id: 1,
    name: 'Nouvella Apparel',
    product: 'Organic Cotton Tees',
    qty: 1200,
    timeline: '4-6 weeks',
    matchScore: 96,
    status: 'New',
  },
  {
    id: 2,
    name: 'Stride Athletics',
    product: 'Performance Leggings',
    qty: 800,
    timeline: '6-8 weeks',
    matchScore: 92,
    status: 'Contacted',
  },
  {
    id: 3,
    name: 'Haven & Co.',
    product: 'Linen Dresses',
    qty: 500,
    timeline: '3-5 weeks',
    matchScore: 87,
    status: 'In Progress',
  },
  {
    id: 4,
    name: 'Iron Fit Gear',
    product: 'Compression Wear',
    qty: 2000,
    timeline: '4-6 weeks',
    matchScore: 84,
    status: 'New',
  },
  {
    id: 5,
    name: 'Urban Thread',
    product: 'Denim Jackets',
    qty: 600,
    timeline: '8+ weeks',
    matchScore: 78,
    status: 'New',
  },
];

/* ------------------------------------------------------------------ */
/*  Match Overlay                                                      */
/* ------------------------------------------------------------------ */

function MatchOverlay({
  factory,
  onClose,
}: {
  factory: Factory;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl p-10 max-w-md w-full mx-4 text-center shadow-2xl"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <Heart
            size={48}
            className="text-coral mx-auto mb-4"
            fill="#E8734A"
          />
        </motion.div>
        <h2 className="text-3xl font-playfair font-bold text-navy mb-2">
          It's a Match!
        </h2>
        <p className="text-slate mb-6">
          You and {factory.name} are a great fit.
        </p>

        <div className="flex justify-center items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center text-coral font-bold text-xl">
            B
          </div>
          <motion.div
            className="flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-8 h-0.5 bg-teal" />
            <div className="w-2 h-0.5 bg-teal/50" />
            <div className="w-2 h-0.5 bg-teal/50" />
          </motion.div>
          <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center text-teal font-bold text-xl">
            {factory.name.charAt(0)}
          </div>
        </div>

        <motion.button
          className="bg-teal text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition w-full"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
        >
          <MessageCircle size={18} className="inline mr-2" />
          Start Chat
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand View                                                         */
/* ------------------------------------------------------------------ */

function BrandDashboard() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [viewsUsed, setViewsUsed] = useState(3);
  const VIEWS_LIMIT = 10;

  const factory = FACTORIES[currentIdx];

  const handleLike = () => {
    setShowMatch(true);
  };

  const handleDislike = () => {
    if (currentIdx < FACTORIES.length - 1) {
      setCurrentIdx((i) => i + 1);
      setViewsUsed((v) => Math.min(v + 1, VIEWS_LIMIT));
    }
  };

  const handleNextMatch = () => {
    setShowMatch(false);
    if (currentIdx < FACTORIES.length - 1) {
      setCurrentIdx((i) => i + 1);
      setViewsUsed((v) => Math.min(v + 1, VIEWS_LIMIT));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-playfair font-bold text-navy">
          Your Matches
        </h1>
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-mist">
            <span className="text-sm text-slate">Free: </span>
            <span
              className={`font-bold ${
                viewsUsed >= VIEWS_LIMIT * 0.8 ? 'text-coral' : 'text-navy'
              }`}
            >
              {viewsUsed}/{VIEWS_LIMIT}
            </span>
            <span className="text-sm text-slate"> views</span>
          </div>
          {viewsUsed >= VIEWS_LIMIT * 0.8 && (
            <AlertTriangle size={18} className="text-coral" />
          )}
        </div>
      </div>

      <div className="w-full h-2 bg-mist rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-coral rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(viewsUsed / VIEWS_LIMIT) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex justify-center py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={factory.id}
            className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`h-48 bg-gradient-to-br ${factory.gradient} relative`}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="bg-white/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1 text-xs font-medium text-navy">
                  <MapPin size={12} />
                  {factory.location}
                </div>
                {factory.verified && (
                  <div className="bg-emerald-500 text-white rounded-full px-3 py-1 flex items-center gap-1 text-xs font-medium">
                    <CheckCircle size={12} />
                    Verified
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-navy mb-3">
                {factory.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {factory.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="bg-teal text-white text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-slate mb-4">
                <span>
                  MOQ: {factory.moqMin.toLocaleString()} -
                  {factory.moqMax.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {factory.leadTime}
                </span>
              </div>

              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-teal flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold text-teal">
                      {factory.matchScore}%
                    </div>
                    <div className="text-[10px] text-slate uppercase tracking-wider">
                      Match
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-6">
                <motion.button
                  className="w-16 h-16 rounded-full bg-slate/10 flex items-center justify-center hover:bg-slate/20 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDislike}
                >
                  <X size={28} className="text-slate" />
                </motion.button>
                <motion.button
                  className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center hover:bg-coral/20 transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                >
                  <Heart
                    size={28}
                    className="text-coral"
                    fill="#E8734A"
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2">
        {FACTORIES.map((f, i) => (
          <div
            key={f.id}
            className={`w-2 h-2 rounded-full transition ${
              i === currentIdx ? 'bg-coral w-6' : 'bg-mist'
            }`}
          />
        ))}
      </div>

      <AnimatePresence>
        {showMatch && (
          <MatchOverlay factory={factory} onClose={handleNextMatch} />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Manufacturer View                                                  */
/* ------------------------------------------------------------------ */

function ManufacturerDashboard() {
  const [capacity, setCapacity] = useState(320);
  const [utilization] = useState(68);
  const [selectedDay, setSelectedDay] = useState(2);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const utilizationColor =
    utilization > 85 ? 'bg-red-400' : utilization > 60 ? 'bg-amber-400' : 'bg-emerald-400';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Profile Views',
            value: '47',
            icon: Eye,
            color: 'text-teal',
            bg: 'bg-teal/10',
          },
          {
            label: 'Match Rate',
            value: '68%',
            icon: TrendingUp,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
          },
          {
            label: 'Conversations',
            value: '5',
            icon: MessageCircle,
            color: 'text-coral',
            bg: 'bg-coral/10',
          },
          {
            label: 'Response Time',
            value: '2.4h',
            icon: Clock,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="bg-white rounded-xl p-5 shadow-sm border border-mist"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}
              >
                <stat.icon size={20} className={stat.color} />
              </div>
            </div>
            <div className="text-2xl font-bold text-navy">{stat.value}</div>
            <div className="text-xs text-slate">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-mist">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-teal" />
            <h3 className="font-bold text-navy">Daily Capacity</h3>
          </div>
          <span className="text-2xl font-bold text-teal">
            {capacity} units
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={500}
          step={10}
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
          className="w-full accent-teal mb-4"
        />
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate">Utilization</span>
            <span
              className={`font-bold ${
                utilization > 85
                  ? 'text-red-500'
                  : utilization > 60
                  ? 'text-amber-500'
                  : 'text-emerald-500'
              }`}
            >
              {utilization}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${utilizationColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${utilization}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {[100, 200, 300, 400, 500].map((preset) => (
            <button
              key={preset}
              onClick={() => setCapacity(preset)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                capacity === preset
                  ? 'bg-teal text-white'
                  : 'bg-gray-100 text-slate hover:bg-gray-200'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${
                i === selectedDay
                  ? 'bg-teal text-white'
                  : 'bg-gray-100 text-slate hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-mist">
        <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
          <Star size={18} className="text-amber-400" fill="#fbbf24" />
          New Matches
        </h3>
        <div className="space-y-3">
          {BRAND_NOTIFICATIONS.map((brand) => (
            <motion.div
              key={brand.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-warm-sand transition cursor-pointer"
              whileHover={{ x: 4 }}
            >
              <div
                className={`w-12 h-12 rounded-full ${brand.color} flex items-center justify-center text-white font-bold`}
              >
                {brand.initial}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-navy truncate">
                  {brand.name}
                </div>
                <div className="text-sm text-slate">
                  {brand.product} · {brand.quantity.toLocaleString()} units
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-teal">
                  {brand.matchScore}%
                </div>
                <div className="text-[10px] text-slate">match</div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center hover:bg-teal hover:text-white text-teal transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageCircle size={14} />
                </motion.button>
                <motion.button
                  className="w-8 h-8 rounded-full bg-slate/10 flex items-center justify-center hover:bg-slate hover:text-white text-slate transition"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-mist overflow-hidden">
        <div className="p-4 border-b border-mist flex items-center justify-between">
          <h3 className="font-bold text-navy">Brand Inquiries</h3>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Search size={16} className="text-slate" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Filter size={16} className="text-slate" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-slate uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">Brand</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Qty</th>
                <th className="px-4 py-3 font-medium">Timeline</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mist">
              {BRANDS_TABLE.map((row) => (
                <motion.tr
                  key={row.id}
                  className="hover:bg-warm-sand/50 transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="px-4 py-3 font-medium text-navy">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate">
                    {row.product}
                  </td>
                  <td className="px-4 py-3 text-sm text-navy font-medium">
                    {row.qty.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate">
                    {row.timeline}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-teal">
                      {row.matchScore}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === 'New'
                          ? 'bg-teal/10 text-teal'
                          : row.status === 'Contacted'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Dashboard                                                     */
/* ------------------------------------------------------------------ */

export default function Dashboard() {
  const [view, setView] = useState<View>('brand');

  return (
    <div className="min-h-screen bg-warm-sand">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm border border-mist inline-flex">
            <button
              onClick={() => setView('brand')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition ${
                view === 'brand'
                  ? 'bg-coral text-white shadow'
                  : 'text-slate hover:text-navy'
              }`}
            >
              <Shirt size={16} />
              Brand
            </button>
            <button
              onClick={() => setView('manufacturer')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition ${
                view === 'manufacturer'
                  ? 'bg-teal text-white shadow'
                  : 'text-slate hover:text-navy'
              }`}
            >
              <Building2 size={16} />
              Manufacturer
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {view === 'brand' ? <BrandDashboard /> : <ManufacturerDashboard />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}