import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Check,
  ChevronLeft,
  ChevronRight,
  Scissors,
  Printer,
  Thermometer,
  PenTool,
  Palette,
  Shirt,
  Layers,
  Wind,
  HardHat,
  Camera,
  Building2,
  Phone,
  Globe,
  User,
  MapPin,
  Award,
  Clock,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  // Step 1 - Company
  companyName: string;
  email: string;
  password: string;
  contactName: string;
  phone: string;
  website: string;
  // Step 2 - Equipment
  equipment: string[];
  yearsInBusiness: string;
  facilitySize: string;
  // Step 3 - Services
  serviceType: string;
  specializations: string[];
  additionalServices: string[];
  // Step 4 - Capacity
  moqMin: string;
  moqMax: string;
  dailyCapacity: number;
  utilization: number;
  leadTime: string;
  // Step 5 - Profile
  city: string;
  state: string;
  certifications: string[];
  companyDescription: string;
}

const INITIAL_DATA: FormData = {
  companyName: '',
  email: '',
  password: '',
  contactName: '',
  phone: '',
  website: '',
  equipment: [],
  yearsInBusiness: '',
  facilitySize: '',
  serviceType: '',
  specializations: [],
  additionalServices: [],
  moqMin: '',
  moqMax: '',
  dailyCapacity: 100,
  utilization: 60,
  leadTime: '',
  city: '',
  state: '',
  certifications: [],
  companyDescription: '',
};

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STEPS = ['Company', 'Equipment', 'Services', 'Capacity', 'Profile'];

const EQUIPMENT_ITEMS = [
  { key: 'Single Needle Lockstitch', icon: Scissors },
  { key: 'Overlock/Serger', icon: Layers },
  { key: 'Coverstitch', icon: Shirt },
  { key: 'Flatlock', icon: Wind },
  { key: 'Bartack', icon: HardHat },
  { key: 'Buttonhole', icon: PenTool },
  { key: 'Barudan Embroidery', icon: Palette },
  { key: 'Screen Printing', icon: Printer },
  { key: 'Heat Press', icon: Thermometer },
  { key: 'CNC Cutting', icon: Scissors },
  { key: 'Laser Cutting', icon: PenTool },
];

const SPECIALIZATIONS = [
  'Cut & Sew',
  'Knits',
  'Wovens',
  'Denim',
  'Activewear',
  'Outerwear',
  'Childrenswear',
  'Accessories',
  'Technical Garments',
];

const ADDITIONAL_SERVICES = [
  'Pattern Making',
  'Grading',
  'Sampling',
  'Dyeing',
  'Printing',
  'Embroidery',
];

const LEAD_TIME_OPTIONS = [
  { key: '1-2 weeks', label: '1-2 weeks' },
  { key: '2-4 weeks', label: '2-4 weeks' },
  { key: '4-6 weeks', label: '4-6 weeks' },
  { key: '6-8 weeks', label: '6-8 weeks' },
  { key: '8+ weeks', label: '8+ weeks' },
];

const CERTIFICATIONS = ['GOTS', 'OEKO-TEX', 'WRAP', 'BSCI', 'ISO 9001', 'SA8000'];

/* ------------------------------------------------------------------ */
/*  Validation                                                         */
/* ------------------------------------------------------------------ */

function isStepValid(step: number, data: FormData): boolean {
  switch (step) {
    case 0:
      return !!(
        data.companyName &&
        data.email &&
        data.password &&
        data.contactName &&
        data.phone
      );
    case 1:
      return data.equipment.length > 0 && !!data.yearsInBusiness && !!data.facilitySize;
    case 2:
      return !!data.serviceType && data.specializations.length > 0;
    case 3:
      return !!(data.moqMin && data.moqMax && data.leadTime);
    case 4:
      return !!(data.city && data.state && data.companyDescription);
    default:
      return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ManufacturerRegister() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_DATA);
  const [showPassword, setShowPassword] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [direction, setDirection] = useState(0);

  const update = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const toggleArray = useCallback(
    (field: 'equipment' | 'specializations' | 'additionalServices' | 'certifications', value: string) => {
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
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      setCompleted(true);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

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
            Profile Submitted!
          </h2>
          <p className="text-slate mb-8 max-w-md mx-auto">
            Your manufacturer profile is under review. You'll be notified once
            verification is complete.
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
                    animate={i === step ? { scale: [1, 1.1, 1] } : {}}
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
          Step {step + 1}: {STEPS[step]}
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
            {/* ====== STEP 0: COMPANY ====== */}
            {step === 0 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      <Building2 size={14} className="inline mr-1" />
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) => update('companyName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                      placeholder="Pacific Cut & Sew Inc."
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
                      placeholder="info@factory.com"
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
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      <User size={14} className="inline mr-1" />
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      value={form.contactName}
                      onChange={(e) => update('contactName', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      <Phone size={14} className="inline mr-1" />
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      <Globe size={14} className="inline mr-1" />
                      Website
                    </label>
                    <input
                      type="url"
                      value={form.website}
                      onChange={(e) => update('website', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                      placeholder="www.factory.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ====== STEP 1: EQUIPMENT ====== */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Equipment & Machinery *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {EQUIPMENT_ITEMS.map(({ key, icon: Icon }) => {
                      const selected = form.equipment.includes(key);
                      return (
                        <motion.button
                          key={key}
                          type="button"
                          onClick={() => toggleArray('equipment', key)}
                          className={`p-3 rounded-xl border-2 text-left flex items-center gap-3 transition ${
                            selected
                              ? 'border-teal bg-teal/5 text-teal'
                              : 'border-mist hover:border-teal/50 text-navy'
                          }`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon size={18} />
                          <span className="text-sm font-medium">{key}</span>
                          {selected && <Check size={14} className="ml-auto" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Years in Business *
                    </label>
                    <select
                      value={form.yearsInBusiness}
                      onChange={(e) => update('yearsInBusiness', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition bg-white"
                    >
                      <option value="">Select</option>
                      <option>1-3 years</option>
                      <option>3-5 years</option>
                      <option>5-10 years</option>
                      <option>10-20 years</option>
                      <option>20+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Facility Size (sq ft) *
                    </label>
                    <select
                      value={form.facilitySize}
                      onChange={(e) => update('facilitySize', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition bg-white"
                    >
                      <option value="">Select</option>
                      <option>&lt; 5,000</option>
                      <option>5,000 - 10,000</option>
                      <option>10,000 - 25,000</option>
                      <option>25,000 - 50,000</option>
                      <option>50,000+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ====== STEP 2: SERVICES ====== */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Service Type *
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {['CMT', 'Full Package', 'Both'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => update('serviceType', s)}
                        className={`p-4 rounded-xl border-2 font-medium text-center transition ${
                          form.serviceType === s
                            ? 'border-teal bg-teal text-white'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Specializations *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
                    {SPECIALIZATIONS.map((spec) => (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => toggleArray('specializations', spec)}
                        className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition ${
                          form.specializations.includes(spec)
                            ? 'border-teal bg-teal/10 text-teal'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                      >
                        {form.specializations.includes(spec) && (
                          <Check size={12} className="inline mr-1" />
                        )}
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Additional Services
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {ADDITIONAL_SERVICES.map((svc) => (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => toggleArray('additionalServices', svc)}
                        className={`px-4 py-2 rounded-full border-2 font-medium text-sm transition ${
                          form.additionalServices.includes(svc)
                            ? 'border-teal bg-teal text-white'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ====== STEP 3: CAPACITY ====== */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      MOQ Minimum *
                    </label>
                    <input
                      type="number"
                      value={form.moqMin}
                      onChange={(e) => update('moqMin', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                      placeholder="e.g. 100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      MOQ Maximum *
                    </label>
                    <input
                      type="number"
                      value={form.moqMax}
                      onChange={(e) => update('moqMax', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                      placeholder="e.g. 5000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Daily Capacity:{' '}
                    <span className="text-teal font-bold">
                      {form.dailyCapacity} units
                    </span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={500}
                    step={10}
                    value={form.dailyCapacity}
                    onChange={(e) =>
                      update('dailyCapacity', Number(e.target.value))
                    }
                    className="w-full accent-teal"
                  />
                  <div className="flex justify-between text-xs text-slate mt-1">
                    <span>0 units</span>
                    <span>500 units</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Current Utilization:{' '}
                    <span
                      className={`font-bold ${
                        form.utilization > 85
                          ? 'text-red-500'
                          : form.utilization > 60
                          ? 'text-amber-500'
                          : 'text-emerald-500'
                      }`}
                    >
                      {form.utilization}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={form.utilization}
                    onChange={(e) =>
                      update('utilization', Number(e.target.value))
                    }
                    className="w-full accent-teal"
                  />
                  <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        form.utilization > 85
                          ? 'bg-red-400'
                          : form.utilization > 60
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${form.utilization}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Standard Lead Time *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                    {LEAD_TIME_OPTIONS.map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => update('leadTime', key)}
                        className={`p-3 rounded-xl border-2 text-center font-medium text-sm transition ${
                          form.leadTime === key
                            ? 'border-teal bg-teal text-white'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                      >
                        <Clock size={16} className="mx-auto mb-1" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ====== STEP 4: PROFILE ====== */}
            {step === 4 && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      <MapPin size={14} className="inline mr-1" />
                      City *
                    </label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition"
                      placeholder="Los Angeles"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      State *
                    </label>
                    <select
                      value={form.state}
                      onChange={(e) => update('state', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition bg-white"
                    >
                      <option value="">Select state</option>
                      <option>California</option>
                      <option>New York</option>
                      <option>Texas</option>
                      <option>North Carolina</option>
                      <option>Georgia</option>
                      <option>Florida</option>
                      <option>Pennsylvania</option>
                      <option>Illinois</option>
                      <option>New Jersey</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-4">
                    Certifications
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {CERTIFICATIONS.map((cert) => (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => toggleArray('certifications', cert)}
                        className={`px-4 py-2 rounded-full border-2 font-medium text-sm transition ${
                          form.certifications.includes(cert)
                            ? 'border-teal bg-teal text-white'
                            : 'border-mist hover:border-teal/50 text-navy'
                        }`}
                      >
                        <Award size={12} className="inline mr-1" />
                        {cert}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Company Description *
                  </label>
                  <textarea
                    rows={5}
                    maxLength={500}
                    value={form.companyDescription}
                    onChange={(e) =>
                      update('companyDescription', e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-mist focus:border-teal focus:ring-2 focus:ring-teal/20 outline-none transition resize-none"
                    placeholder="Tell brands about your company, capabilities, and what makes you unique..."
                  />
                  <div className="text-right text-xs text-slate mt-1">
                    {form.companyDescription.length}/500
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Company Photos
                  </label>
                  <div className="border-2 border-dashed border-mist rounded-xl p-8 text-center hover:border-teal/50 transition cursor-pointer">
                    <Camera size={32} className="mx-auto text-slate mb-2" />
                    <p className="text-sm text-slate">
                      Upload factory photos, showroom, equipment
                    </p>
                    <p className="text-xs text-slate mt-1">
                      (Placeholder - connect to upload service)
                    </p>
                  </div>
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
            {step === STEPS.length - 1 ? 'Submit Profile' : 'Continue'}
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
