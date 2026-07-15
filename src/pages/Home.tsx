import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useInView } from 'framer-motion'
import {
  Factory,
  Shirt,
  FileText,
  Search,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Check,
  Layers,
  Cpu,
  Target,
  BarChart3,
  Settings,
  Sparkles,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Fade In Section                                                    */
/* ------------------------------------------------------------------ */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Home Page                                                          */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <div className="bg-warm-sand">
      {/* ========== HERO ========== */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F1B2D 0%, #0D7377 50%, #0F1B2D 100%)' }}>
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-teal text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-6">
            B2B Manufacturing Sourcing Platform
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Connect. Manufacture.<br />Scale.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            OEM Match connects Private Label brands with verified OEM textile manufacturers.
            Structured tech specs, AI-powered matching, and direct communication — all in one place.
          </motion.p>

          {/* Dual CTA Cards */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/brand-register"
              className="group bg-coral hover:bg-coral/90 text-white px-8 py-5 rounded-xl shadow-lg shadow-coral/20 transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <Shirt className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold text-sm uppercase tracking-wider">I'm a Brand</div>
                  <div className="text-white/70 text-xs mt-0.5">Create Tech Spec & Find Manufacturers</div>
                </div>
              </div>
            </Link>

            <Link to="/manufacturer-register"
              className="group bg-teal hover:bg-teal/90 text-white px-8 py-5 rounded-xl shadow-lg shadow-teal/20 transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-3">
                <Factory className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold text-sm uppercase tracking-wider">I'm a Manufacturer</div>
                  <div className="text-white/70 text-xs mt-0.5">List Factory & Get Matched with Brands</div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 8, 0] }} transition={{ delay: 0.8, repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-white/40" />
          </motion.div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <p className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">How It Works</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy">From Idea to Production in 4 Steps</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-teal via-teal/50 to-teal/20" />

            {[
              { icon: FileText, num: '01', title: 'Fill Your Tech Spec', desc: 'Describe your product, fabric, quantity, and quality requirements through a structured 6-step form.' },
              { icon: Search, num: '02', title: 'AI Matching', desc: 'Our algorithm scores compatibility across 5 dimensions and surfaces the best-fitting manufacturers.' },
              { icon: CheckCircle, num: '03', title: 'Review Factories', desc: 'Browse detailed manufacturer profiles with equipment, capacity, certifications, and specializations.' },
              { icon: Factory, num: '04', title: 'Start Production', desc: 'Connect via chat, exchange files, finalize terms, and begin manufacturing — all in-platform.' },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.15} className="relative">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-teal/10 rounded-full flex items-center justify-center relative z-10">
                    <step.icon className="w-10 h-10 text-teal" />
                  </div>
                  <span className="text-teal font-mono text-sm font-semibold">{step.num}</span>
                  <h3 className="font-playfair text-lg font-semibold text-navy mt-2 mb-2">{step.title}</h3>
                  <p className="text-slate text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TECH SPEC CONSTRUCTOR ========== */}
      <section className="py-16 sm:py-24 bg-warm-sand">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <p className="text-coral text-xs font-semibold uppercase tracking-[0.2em] mb-3">For Brands</p>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-4">
                Structured Tech Spec Constructor
              </h2>
              <p className="text-slate mb-6 leading-relaxed">
                No more scattered emails and unclear requirements. Our 6-step constructor guides you through every detail manufacturers need to quote accurately.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { label: 'Account Info', desc: 'Company, marketplace, contact details' },
                  { label: 'Product Definition', desc: 'Category, style type, construction details' },
                  { label: 'Fabric Specification', desc: 'Material, GSM, color, finishing' },
                  { label: 'Quantity & Timeline', desc: 'Order size, MOQ range, deadline' },
                  { label: 'Quality Requirements', desc: 'AQL level, certifications needed' },
                  { label: 'Preferences', desc: 'Location, budget, shipping' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-teal text-xs font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-navy text-sm">{item.label}</span>
                      <span className="text-slate text-sm"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/brand-register" className="inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all hover:scale-[1.02]">
                Create Your Tech Spec <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>

            <FadeIn delay={0.2}>
              {/* Mock Tech Spec Preview */}
              <div className="bg-white rounded-xl shadow-card border border-mist overflow-hidden">
                <div className="bg-navy px-4 py-3 flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">Tech Spec Preview</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-2 text-teal text-xs font-semibold uppercase tracking-wider mb-3">
                    <FileText className="w-4 h-4" />
                    Activewear Leggings — Tech Spec #042
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">Product Category</div>
                      <div className="font-semibold text-navy">Activewear</div>
                    </div>
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">Style Type</div>
                      <div className="font-semibold text-navy">Leggings</div>
                    </div>
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">Fabric</div>
                      <div className="font-semibold text-navy">Nylon-Spandex, 220 GSM</div>
                    </div>
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">Quantity</div>
                      <div className="font-semibold text-navy">800 units</div>
                    </div>
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">Timeline</div>
                      <div className="font-semibold text-navy">6–8 weeks</div>
                    </div>
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">AQL Level</div>
                      <div className="font-semibold text-navy">2.5 (Standard)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-mist">
                    <CheckCircle className="w-4 h-4 text-teal" />
                    <span className="text-xs text-slate">6 of 6 sections completed</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== MANUFACTURER PROFILE ========== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="order-2 lg:order-1">
              {/* Mock Manufacturer Profile Preview */}
              <div className="bg-white rounded-xl shadow-card border border-mist overflow-hidden">
                <div className="bg-gradient-to-r from-teal to-navy px-4 py-3 flex items-center justify-between">
                  <span className="text-white font-semibold text-sm">Manufacturer Profile Preview</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
                      <Factory className="w-5 h-5 text-teal" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy text-sm">Pacific Cut & Sew</div>
                      <div className="text-xs text-teal font-medium">Verified Manufacturer</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">Location</div>
                      <div className="font-semibold text-navy">Los Angeles, CA</div>
                    </div>
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">Specializations</div>
                      <div className="font-semibold text-navy">Knits, Activewear</div>
                    </div>
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">MOQ Range</div>
                      <div className="font-semibold text-navy">100–5,000 units</div>
                    </div>
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">Lead Time</div>
                      <div className="font-semibold text-navy">4–6 weeks</div>
                    </div>
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">Equipment</div>
                      <div className="font-semibold text-navy">Coverstitch, Overlock</div>
                    </div>
                    <div className="bg-warm-sand rounded-lg p-3">
                      <div className="text-slate mb-1">Certifications</div>
                      <div className="font-semibold text-navy">WRAP, ISO 9001</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-mist">
                    <Sparkles className="w-4 h-4 text-coral" />
                    <span className="text-xs text-slate">Match score: 94% with your Tech Spec</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <p className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">For Manufacturers</p>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-4">
                Detailed Manufacturer Profile
              </h2>
              <p className="text-slate mb-6 leading-relaxed">
                Showcase your factory's capabilities through a structured 5-step profile. The more details you provide, the better matches you receive.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { label: 'Company Info', desc: 'Location, years in business, team size' },
                  { label: 'Equipment & Machinery', desc: 'Sewing machines, cutting tables, finishing equipment' },
                  { label: 'Services & Specializations', desc: 'Product categories, techniques, value-added services' },
                  { label: 'Capacity & MOQ', desc: 'Daily output, current utilization, min/max order sizes' },
                  { label: 'Certifications', desc: 'WRAP, ISO, GOTS, OEKO-TEX and more' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-coral/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-coral text-xs font-bold">{i + 1}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-navy text-sm">{item.label}</span>
                      <span className="text-slate text-sm"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/manufacturer-register" className="inline-flex items-center gap-2 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all hover:scale-[1.02]">
                Create Your Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== SMART MATCHING ENGINE ========== */}
      <section className="py-16 sm:py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <p className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">Matching Engine</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
              How the Smart Match Works
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our algorithm evaluates compatibility across 5 weighted dimensions, scoring each manufacturer from 0 to 100. No guesswork — just data-driven matching.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Product Category', weight: '40%', desc: 'Does the manufacturer specialize in your product type? Exact match = full points.', color: 'coral' },
              { icon: BarChart3, title: 'MOQ Compatibility', weight: '25%', desc: 'Is your order size within their minimum and maximum order quantity range?', color: 'teal' },
              { icon: Layers, title: 'Fabric Type', weight: '15%', desc: 'Do they have experience working with your specific fabric material?', color: 'coral' },
              { icon: Cpu, title: 'Capacity Availability', weight: '10%', desc: 'How much free capacity do they currently have? Lower utilization = higher score.', color: 'teal' },
              { icon: Settings, title: 'Timeline Fit', weight: '10%', desc: 'Can they deliver within your required timeframe? Lead time alignment matters.', color: 'coral' },
            ].map((dim, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${dim.color === 'coral' ? 'bg-coral/20' : 'bg-teal/20'}`}>
                      <dim.icon className={`w-5 h-5 ${dim.color === 'coral' ? 'text-coral' : 'text-teal'}`} />
                    </div>
                    <span className={`font-mono font-bold text-lg ${dim.color === 'coral' ? 'text-coral' : 'text-teal'}`}>{dim.weight}</span>
                  </div>
                  <h4 className="font-playfair font-semibold text-white mb-2">{dim.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{dim.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Score formula */}
          <FadeIn delay={0.5} className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 rounded-full px-6 py-3 border border-white/10">
              <span className="text-white/60 text-sm">Composite Score = </span>
              <span className="text-coral font-mono font-bold text-sm">Product</span>
              <span className="text-white/30">+</span>
              <span className="text-teal font-mono font-bold text-sm">MOQ</span>
              <span className="text-white/30">+</span>
              <span className="text-coral font-mono font-bold text-sm">Fabric</span>
              <span className="text-white/30">+</span>
              <span className="text-teal font-mono font-bold text-sm">Capacity</span>
              <span className="text-white/30">+</span>
              <span className="text-coral font-mono font-bold text-sm">Timeline</span>
              <span className="text-white/30">=</span>
              <span className="text-white font-mono font-bold text-sm">100</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========== FOR BRANDS ========== */}
      <section className="py-16 sm:py-24 bg-warm-sand">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <p className="text-coral text-xs font-semibold uppercase tracking-[0.2em] mb-3">For Private Label Brands</p>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-6">
                Find Your Perfect Manufacturing Partner
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  'AI-powered matching based on your structured tech spec',
                  'Browse manufacturer profiles with full equipment & capacity details',
                  'Real-time chat with file sharing and tech spec references',
                  'Free to start — premium unlocks unlimited matching and priority',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                    <span className="text-slate text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/brand-register" className="inline-flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all hover:scale-[1.02]">
                Create Your Tech Spec <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid gap-4">
                {[
                  { title: 'Structured Tech Spec', desc: 'A complete technical specification that manufacturers can quote from instantly.', icon: FileText },
                  { title: 'Smart Matching', desc: 'Algorithm analyzes 5 dimensions to find your best-fit manufacturers.', icon: Search },
                  { title: 'Verified Profiles', desc: 'Every manufacturer profile includes equipment, capacity, and certifications.', icon: CheckCircle },
                ].map((card, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow border border-mist">
                    <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center mb-4">
                      <card.icon className="w-5 h-5 text-teal" />
                    </div>
                    <h4 className="font-playfair font-semibold text-navy mb-1">{card.title}</h4>
                    <p className="text-slate text-sm">{card.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== FOR MANUFACTURERS ========== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F1B2D, #0D7377)' }}>
                <div className="p-12 text-center">
                  <Factory className="w-16 h-16 text-teal mx-auto mb-4" />
                  <div className="font-playfair text-5xl font-bold text-white mb-2">OEM Match</div>
                  <p className="text-white/70">Connect with brands that need exactly what you make</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <p className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">For Manufacturers</p>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-6">
                Get Matched with Qualified Brand Leads
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  'List your equipment, specializations, and capacity in detail',
                  'Receive inbound leads from brands matched to your capabilities',
                  'Update capacity daily for accurate, real-time matching',
                  'Free profile listing — optional verification badge available',
                  'Communicate directly with interested brands via in-platform chat',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                    <span className="text-slate text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/manufacturer-register" className="inline-flex items-center gap-2 bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-medium text-sm transition-all hover:scale-[1.02]">
                List Your Factory <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== PRICING PREVIEW ========== */}
      <section className="py-16 sm:py-24 bg-warm-sand">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <p className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">Pricing</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy">Simple, Transparent Pricing</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* For Brands */}
            <FadeIn>
              <div className="bg-white rounded-xl p-8 border-l-4 border-coral">
                <h3 className="font-playfair text-xl font-semibold text-navy mb-4">For Brands</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Free</span>
                    <span className="font-semibold text-navy">10 views, 3 likes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Premium</span>
                    <span className="font-semibold text-navy">$79/week unlimited</span>
                  </div>
                </div>
                <Link to="/pricing" className="text-coral text-sm font-medium hover:underline">View brand pricing →</Link>
              </div>
            </FadeIn>

            {/* For Manufacturers */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-xl p-8 border-l-4 border-teal">
                <h3 className="font-playfair text-xl font-semibold text-navy mb-4">For Manufacturers</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Free</span>
                    <span className="font-semibold text-navy">Basic listing</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate">Verified</span>
                    <span className="font-semibold text-navy">$1,000 + $119/mo</span>
                  </div>
                </div>
                <Link to="/pricing" className="text-teal text-sm font-medium hover:underline">View manufacturer pricing →</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 sm:py-20" style={{ background: 'linear-gradient(135deg, #0D7377, #0F1B2D)' }}>
        <FadeIn className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Manufacturing Partner?
          </h2>
          <p className="text-white/70 mb-8">Create your profile and start matching today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/brand-register" className="bg-coral hover:bg-coral/90 text-white px-8 py-3 rounded-lg font-medium text-sm transition-all hover:scale-[1.02]">
              I'm a Brand
            </Link>
            <Link to="/manufacturer-register" className="bg-white hover:bg-white/90 text-navy px-8 py-3 rounded-lg font-medium text-sm transition-all hover:scale-[1.02]">
              I'm a Manufacturer
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
