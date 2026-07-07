import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Check,
  ChevronLeft,
  ChevronRight,
  Shirt,
  ShoppingBag,
  Dumbbell,
  Scissors,
  Wind,
  Layers,
  Umbrella,
  MapPin,
  Clock,
  Award,
  Star,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  // Step 1 - Account
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  marketplace: string;
  // Step 2 - Product
  category: string;
  styleType: string;
  // Step 3 - Fabric
  fabricType: string;
  gsm: number;
  pantone: string;
  // Step 4 - Quantity
  quantity: number;
  sizes: string[];
  timeline: string;
  // Step 5 - Quality
  qualityLevel: string;
  certifications: string[];
  specialRequirements: string;
  // Step 6 - Preferences
  location: string;
  budget: number;
  additionalNotes: string;
}

const INITIAL_DATA: FormData = {
  fullName: '',
  email: '',
  password: '',
  companyName: '',
  marketplace: '',
  category: '',
  styleType: '',
  fabricType: '',
  gsm: 200,
  pantone: '',
  quantity: 500,
  sizes: [],
  timeline: '',
  qualityLevel: '',
  certifications: [],
  specialRequirements: '',
  location: '',
  budget: 15,
  additionalNotes: '',
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STEPS = [
  'Account',
  'Product',
  'Fabric',
  'Quantity',
  'Quality',
  'Preferences',
];

const CATEGORIES = [
  { key: 'T-Shirts', icon: Shirt },
  { key: 'Hoodies', icon: ShoppingBag },
  { key: 'Activewear', icon: Dumbbell },
  { key: 'Jeans', icon: Scissors },
  { key: 'Dresses', icon: Star },
  { key: 'Outerwear', icon: Wind },
  { key: 'Knitwear', icon: Layers },
  { key: 'Swimwear', icon: Umbrella },
];

const FABRICS = [
  'Cotton Jersey',
  'French Terry',
  'Fleece',
  'Denim',
  'Twill',
  'Poplin',
  'Linen',
  'Polyester Blend',
  'Technical/Synthetic',
  'Organic/Sustainable',
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const LOCATIONS = [
  { key: 'LA', label: 'Los Angeles, CA' },
  { key: 'NYC', label: 'New York, NY' },
  { key: 'Texas', label: 'Texas' },
  { key: 'NC', label: 'North Carolina' },
  { key: 'Southeast', label: 'Southeast US' },
  { key: 'No Preference', label: 'No Preference' },
];

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

function isStepValid(step: number, data: FormData): boolean {
  switch (step) {
    case 0:
      return !!(
        data.fullName &&
        data.email &&
        data.password &&
        data.companyName &&
        data.marketplace
      );
    case 1:
      return !!(data.category && data.styleType);
    case 2:
      return !!(data.fabricType && data.pantone);
    case 3:
      return data.sizes.length > 0 && !!data.timeline;
    case 4:
      return !!data.qualityLevel;
    case 5:
      return !!data.location;
    default:
      return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Step direction for AnimatePresence                                 */
/* ------------------------------------------------------------------ */

interface Direction {
  direction: number;
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function BrandRegister() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_DATA);
  const [showPassword, setShowPassword] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [{ direction }, setDirection] = useState<Direction>({ direction: 0 });

  const update = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const toggleArray = useCallback(
    (field: 'sizes' | 'certifications', value: string) => {
      setForm((prev) => {
        const arr = prev[field];
        const exists = arr.includes(value);
        return {
          ...prev,
          [field]: exists ? arr.filter((v) => v !== value) : [...arr, value],
        };
      });
    },
    []
  );

  const goNext = () => {
    if (step < STEPS.length - 1) {
      setDirection({ direction: 1 });
      setStep((s) => s + 1);
    } else {
      setCompleted(true);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection({ direction: -1 });
      setStep((s) => s - 1);
    }
  };

  /* ---------- variants ---------- */
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  /* ==================== COMPLETED STATE ==================== */
  if (completed) {
    return (
      <div className="min-h-screen bg-warm-sand flex items-center justify-center px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-teal flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <motion.svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </motion.svg>
          </motion.div>
          <h2 className="text-3xl font-playfair font-bold text-navy mb-2">
            Tech Spec Created!
          </h2>
          <p className="text-slate mb-8 max-w-md mx-auto">
            Your tech pack is ready. We'll match you with the best manufacturers
            based on your specifications.
          </p>
          <motion.button
            className="bg-teal text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log('Go to Dashboard')}
          >
            Go to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  /* ==================== MAIN FORM ==================== */
  return (
    <div className="min-h-screen bg-warm-sand">
      <div className="max-w-4xl mx-auto py-24 px-4">
        {/* ---- Progress Bar ---- */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {i > 0 && (
                    <div
                      className={`flex-1 h-1 ${
                        i <= step ? 'bg-teal' : 'bg-mist'
                      }`}
                    />
                  )}
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                      i < step
                        ? 'bg-teal border-teal text-white'
                        : i === step
                        ? 'bg-white border-teal text-teal'
                        : 'bg-white border-mist text-slate'
                    }`}
                    animate={
                      i === step ? { scale: [1, 1.1, 1] } : {}
                    }
                    transition={{ duration: 0.3 }}
                  >
                    {i < step ? <Check size={18} /> : i + 1}
                  </motion.div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 ${
                        i < step ? 'bg-teal' : 'bg-mist'
                      }`}
                    />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium ${
                    i <= step ? 'text-teal' : 'text-slate'
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Step Title ---- */}
        <h1 className="text-3xl font-playfair font-bold text-navy text-center mb-8">
          {step === STEPS.length ? 'Review' : `Step ${step + 1}: ${STEPS[step]}`}
        </h1>

        {/* ---- Step Content ---- */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
          >
            {/* ====== STEP 0: ACCOUNT ====== */}
            {step === 0 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => update('fullName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => update('password', e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                      placeholder="Min 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate hover:text-navy"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => update('companyName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                      placeholder="Your Brand Co."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Marketplace *
                    </label>
                    <select
                      value={form.marketplace}
                      onChange={(e) => update('marketplace', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition bg-white"
                    >
                      <option value="">Select marketplace</option>
                      <option>Amazon FBA</option>
                      <option>Shopify</option>
                      <option>Etsy</option>
                      <option>WooCommerce</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ====== STEP 1: PRODUCT ====== */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Select Product Category *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {CATEGORIES.map(({ key, icon: Icon }) => (
                      <motion.button
                        key={key}
                        type="button"
                        onClick={() => update('category', key)}
                        className={`p-4 rounded-xl border-2 text-center transition ${
                          form.category === key
                            ? 'border-teal bg-teal/5 text-teal'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon
                          size={28}
                          className="mx-auto mb-2"
                          strokeWidth={1.5}
                        />
                        <span className="text-sm font-medium">{key}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Style Type *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Basic', 'Fashion', 'Technical', 'Luxury'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => update('styleType', s)}
                        className={`px-4 py-3 rounded-xl border-2 font-medium transition ${
                          form.styleType === s
                            ? 'border-teal bg-teal text-white'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ====== STEP 2: FABRIC ====== */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Fabric Type *
                  </label>
                  <select
                    value={form.fabricType}
                    onChange={(e) => update('fabricType', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition bg-white"
                  >
                    <option value="">Select fabric</option>
                    {FABRICS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    GSM (Fabric Weight):{' '}
                    <span className="text-teal font-bold">{form.gsm}g</span>
                  </label>
                  <input
                    type="range"
                    min={100}
                    max={500}
                    step={10}
                    value={form.gsm}
                    onChange={(e) => update('gsm', Number(e.target.value))}
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-xs text-slate mt-1">
                    <span>100g (Light)</span>
                    <span>500g (Heavy)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Pantone / Color Reference *
                  </label>
                  <input
                    type="text"
                    value={form.pantone}
                    onChange={(e) => update('pantone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                    placeholder="e.g. Pantone 186 C, Black, Heather Grey"
                  />
                </div>
              </div>
            )}

            {/* ====== STEP 3: QUANTITY ====== */}
            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Order Quantity:{' '}
                    <span className="text-teal font-bold">
                      {form.quantity.toLocaleString()} units
                    </span>
                  </label>
                  <input
                    type="range"
                    min={50}
                    max={5000}
                    step={50}
                    value={form.quantity}
                    onChange={(e) => update('quantity', Number(e.target.value))}
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-xs text-slate mt-1">
                    <span>50 units</span>
                    <span>5,000 units</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Sizes Needed *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleArray('sizes', size)}
                        className={`w-14 h-14 rounded-xl border-2 font-bold transition ${
                          form.sizes.includes(size)
                            ? 'border-teal bg-teal text-white'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Production Timeline *
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      {
                        key: 'Rush <4 weeks',
                        label: 'Rush',
                        sub: '< 4 weeks',
                      },
                      {
                        key: 'Standard 4-8 weeks',
                        label: 'Standard',
                        sub: '4-8 weeks',
                      },
                      {
                        key: 'Flexible 8+ weeks',
                        label: 'Flexible',
                        sub: '8+ weeks',
                      },
                    ].map(({ key, label, sub }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => update('timeline', key)}
                        className={`p-4 rounded-xl border-2 text-center transition ${
                          form.timeline === key
                            ? 'border-teal bg-teal text-white'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                      >
                        <Clock size={22} className="mx-auto mb-1" />
                        <div className="font-bold">{label}</div>
                        <div
                          className={`text-xs ${
                            form.timeline === key ? 'text-white/80' : 'text-slate'
                          }`}
                        >
                          {sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ====== STEP 4: QUALITY ====== */}
            {step === 4 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Quality Level *
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      {
                        key: 'Standard AQL 2.5',
                        label: 'Standard',
                        sub: 'AQL 2.5',
                      },
                      {
                        key: 'Premium AQL 1.5',
                        label: 'Premium',
                        sub: 'AQL 1.5',
                      },
                      { key: 'Zero Defect', label: 'Zero Defect', sub: '100%' },
                    ].map(({ key, label, sub }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => update('qualityLevel', key)}
                        className={`p-4 rounded-xl border-2 text-center transition ${
                          form.qualityLevel === key
                            ? 'border-teal bg-teal text-white'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                      >
                        <Award size={22} className="mx-auto mb-1" />
                        <div className="font-bold">{label}</div>
                        <div
                          className={`text-xs ${
                            form.qualityLevel === key
                              ? 'text-white/80'
                              : 'text-slate'
                          }`}
                        >
                          {sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Certifications Required
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['GOTS', 'OEKO-TEX', 'WRAP', 'BSCI'].map((cert) => (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => toggleArray('certifications', cert)}
                        className={`px-4 py-3 rounded-xl border-2 font-medium transition ${
                          form.certifications.includes(cert)
                            ? 'border-teal bg-teal/10 text-teal'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                      >
                        {form.certifications.includes(cert) && (
                          <Check size={14} className="inline mr-1" />
                        )}
                        {cert}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Special Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={form.specialRequirements}
                    onChange={(e) =>
                      update('specialRequirements', e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition resize-none"
                    placeholder="Any special quality requirements, testing needs, etc."
                  />
                </div>
              </div>
            )}

            {/* ====== STEP 5: PREFERENCES ====== */}
            {step === 5 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Preferred Manufacturer Location *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {LOCATIONS.map(({ key, label }) => (
                      <motion.button
                        key={key}
                        type="button"
                        onClick={() => update('location', key)}
                        className={`p-4 rounded-xl border-2 text-center transition ${
                          form.location === key
                            ? 'border-teal bg-teal/5 text-teal'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MapPin size={22} className="mx-auto mb-1" />
                        <span className="text-sm font-medium">{label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Target Budget per Unit:{' '}
                    <span className="text-teal font-bold">
                      ${form.budget}/unit
                    </span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={1}
                    value={form.budget}
                    onChange={(e) => update('budget', Number(e.target.value))}
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-xs text-slate mt-1">
                    <span>$5/unit</span>
                    <span>$50/unit</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    rows={4}
                    value={form.additionalNotes}
                    onChange={(e) => update('additionalNotes', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition resize-none"
                    placeholder="Anything else manufacturers should know..."
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ---- Navigation Buttons ---- */}
        <div className="flex justify-between mt-8">
          <motion.button
            onClick={goBack}
            disabled={step === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${
              step === 0
                ? 'bg-mist text-slate cursor-not-allowed'
                : 'bg-white text-navy hover:bg-gray-50 shadow'
            }`}
            whileHover={step === 0 ? {} : { scale: 1.03 }}
            whileTap={step === 0 ? {} : { scale: 0.98 }}
          >
            <ChevronLeft size={18} />
            Back
          </motion.button>

          <motion.button
            onClick={goNext}
            disabled={!isStepValid(step, form)}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition ${
              isStepValid(step, form)
                ? 'bg-teal text-white hover:opacity-90'
                : 'bg-mist text-slate cursor-not-allowed'
            }`}
            whileHover={isStepValid(step, form) ? { scale: 1.03 } : {}}
            whileTap={isStepValid(step, form) ? { scale: 0.98 } : {}}
          >
            {step === STEPS.length - 1 ? 'Create Tech Spec' : 'Continue'}
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
