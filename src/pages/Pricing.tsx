import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  ChevronDown,
  Shirt,
  Building2,
  Shield,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BRAND_FREE_FEATURES = [
  'Create 1 tech spec',
  'View 10 manufacturer profiles',
  'Basic matching algorithm',
  'In-app messaging',
  'Standard support',
];

const BRAND_PREMIUM_FEATURES = [
  'Unlimited tech specs',
  'Unlimited manufacturer views',
  'Priority matching (AI-powered)',
  'In-app messaging + file sharing',
  'Priority support (24h response)',
  'Sample coordination service',
  'Quality inspection reports',
  'Dedicated account manager',
];

const MFR_FREE_FEATURES = [
  'Create company profile',
  'Receive match inquiries',
  'Basic analytics',
  'In-app messaging',
  'Standard support',
];

const MFR_VERIFIED_FEATURES = [
  'Verified badge on profile',
  'Priority in search results',
  'Advanced analytics dashboard',
  'Unlimited brand connections',
  'Priority support (4h response)',
  'Featured on homepage',
  'RFQ (Request for Quote) access',
  'Dedicated account manager',
];

const COMPARISON_FEATURES = [
  { feature: 'Profile Views', free: true, premium: 'Unlimited' },
  { feature: 'Matching Algorithm', free: 'Basic', premium: 'AI-Powered' },
  { feature: 'In-App Messaging', free: true, premium: true },
  { feature: 'File Sharing', free: false, premium: true },
  { feature: 'Priority Support', free: false, premium: true },
  { feature: 'Analytics Dashboard', free: 'Basic', premium: 'Advanced' },
  { feature: 'Sample Coordination', free: false, premium: true },
  { feature: 'Account Manager', free: false, premium: true },
  { feature: 'Custom Integrations', free: false, premium: true },
];

const FAQS = [
  {
    question: 'Can I switch plans at any time?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
  },
  {
    question: 'Is there a free trial for Premium?',
    answer:
      'We offer a 7-day free trial for our Premium plan. You can explore all features risk-free before committing.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and ACH bank transfers for annual plans.',
  },
  {
    question: 'How does the matching algorithm work?',
    answer:
      'Our AI-powered algorithm analyzes your tech spec requirements and matches you with manufacturers based on capabilities, capacity, location, certifications, and past performance.',
  },
  {
    question: 'What is the verification process for manufacturers?',
    answer:
      'Manufacturers undergo a thorough verification including facility inspection, equipment audit, certification validation, and reference checks before receiving the verified badge.',
  },
  {
    question: 'Can I cancel my subscription?',
    answer:
      'Absolutely. You can cancel anytime from your account settings. You\'ll continue to have access until the end of your current billing period.',
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Item                                                           */
/* ------------------------------------------------------------------ */

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-mist last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-medium text-navy">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-slate" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-slate text-sm pb-5 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function Pricing() {
  return (
    <div className="min-h-screen bg-warm-sand">
      {/* ========== HERO ========== */}
      <section className="text-center py-16 px-4">
        <motion.span
          className="text-teal uppercase tracking-widest text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Pricing
        </motion.span>
        <motion.h1
          className="text-4xl md:text-5xl font-playfair font-bold text-navy mt-3 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p
          className="text-slate max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Choose the plan that fits your needs. No hidden fees, no surprises.
        </motion.p>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-16">
        {/* ========== FOR BRANDS ========== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6 border-l-4 border-coral pl-4">
            <Shirt size={22} className="text-coral" />
            <h2 className="text-2xl font-playfair font-bold text-navy">
              For Brands
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-mist">
              <h3 className="text-lg font-semibold text-navy mb-2">Free</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-playfair font-bold text-navy">
                  $0
                </span>
                <span className="text-slate">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {BRAND_FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-navy">
                    <Check size={16} className="text-teal flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                className="w-full py-3 rounded-xl border-2 border-navy text-navy font-medium hover:bg-navy hover:text-white transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Premium */}
            <div className="bg-white rounded-2xl p-8 shadow-lg ring-2 ring-coral relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-teal text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2 mt-2">
                Premium
              </h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-playfair font-bold text-navy">
                  $79
                </span>
                <span className="text-slate">/week</span>
              </div>
              <ul className="space-y-3 mb-8">
                {BRAND_PREMIUM_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-navy">
                    <Check size={16} className="text-teal flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                className="w-full py-3 rounded-xl bg-coral text-white font-medium hover:opacity-90 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Go Premium
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* ========== FOR MANUFACTURERS ========== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6 border-l-4 border-teal pl-4">
            <Building2 size={22} className="text-teal" />
            <h2 className="text-2xl font-playfair font-bold text-navy">
              For Manufacturers
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-mist">
              <h3 className="text-lg font-semibold text-navy mb-2">Free</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-playfair font-bold text-navy">
                  $0
                </span>
                <span className="text-slate">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {MFR_FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-navy">
                    <Check size={16} className="text-teal flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                className="w-full py-3 rounded-xl border-2 border-navy text-navy font-medium hover:bg-navy hover:text-white transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </div>

            {/* Verified */}
            <div className="bg-white rounded-2xl p-8 shadow-lg ring-2 ring-teal relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-teal text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Shield size={12} />
                  Verified Badge
                </span>
              </div>
              <h3 className="text-lg font-semibold text-navy mb-2 mt-2">
                Verified
              </h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-playfair font-bold text-navy">
                  $1,000
                </span>
              </div>
              <p className="text-sm text-slate mb-6">
                one-time verification +{' '}
                <span className="font-bold text-navy">$119/mo</span>
              </p>
              <ul className="space-y-3 mb-8">
                {MFR_VERIFIED_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-navy">
                    <Check size={16} className="text-teal flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <motion.button
                className="w-full py-3 rounded-xl bg-teal text-white font-medium hover:opacity-90 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Verified
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* ========== COMPARISON TABLE ========== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-playfair font-bold text-navy text-center mb-8">
            Feature Comparison
          </h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-mist">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-4 font-semibold text-navy">Feature</th>
                  <th className="px-6 py-4 font-semibold text-navy text-center">
                    Free
                  </th>
                  <th className="px-6 py-4 font-semibold text-navy text-center bg-teal/5">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist">
                {COMPARISON_FEATURES.map(({ feature, free, premium }) => (
                  <tr key={feature} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-sm text-navy">{feature}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof free === 'boolean' ? (
                        free ? (
                          <Check size={18} className="text-teal mx-auto" />
                        ) : (
                          <X size={18} className="text-slate/40 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm text-slate">{free}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center bg-teal/5">
                      {typeof premium === 'boolean' ? (
                        premium ? (
                          <Check size={18} className="text-teal mx-auto" />
                        ) : (
                          <X size={18} className="text-slate/40 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm font-medium text-teal">
                          {premium}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* ========== FAQ ========== */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-playfair font-bold text-navy text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-mist max-w-3xl mx-auto">
            {FAQS.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </div>
        </motion.section>

        {/* ========== CTA ========== */}
        <motion.section
          className="bg-teal rounded-2xl p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-playfair font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Join thousands of brands and manufacturers already using SewMatch
            to streamline their production process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-teal px-8 py-3 rounded-xl font-medium hover:bg-white/90 transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Shirt size={16} className="inline mr-2" />
              I'm a Brand
            </motion.button>
            <motion.button
              className="bg-navy text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Building2 size={16} className="inline mr-2" />
              I'm a Manufacturer
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
