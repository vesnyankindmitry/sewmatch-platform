import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { motion, useInView } from 'framer-motion'
import {
  Factory,
  Shirt,
  FileText,
  Search,
  CheckCircle,
  Star,
  ChevronDown,
  ArrowRight,
  Check,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let current = 0
    const step = target / 60
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

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
            The Smart Way to Source Manufacturing
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Connect. Manufacture.<br />Scale.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            SewMatch connects Private Label brands with verified OEM textile manufacturers.
            Create tech specs, get AI-matched, and start production — all in one platform.
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

          {/* Trust bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-white/50 text-xs sm:text-sm flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>Trusted by 2,000+ brands & 500+ factories across the US</span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 8, 0] }} transition={{ delay: 0.8, repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-6 h-6 text-white/40" />
          </motion.div>
        </div>
      </section>

      {/* ========== STATISTICS ========== */}
      <section className="py-16 sm:py-20 bg-warm-sand">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 67, suffix: '%', label: 'of brands struggle to find manufacturing' },
              { value: 48, suffix: 'B', prefix: '$', label: 'US reshoring market' },
              { value: 10000, suffix: '+', label: 'US apparel factories' },
              { value: 62, suffix: '%', label: 'want domestic production' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center">
                <div className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <p className="text-slate text-xs sm:text-sm leading-relaxed">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
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
              { icon: FileText, num: '01', title: 'Fill Your Tech Spec', desc: 'Answer questions about your product, fabric, quantity, and quality requirements.' },
              { icon: Search, num: '02', title: 'AI Matching', desc: 'Our algorithm finds the best manufacturers based on your specifications.' },
              { icon: CheckCircle, num: '03', title: 'Review Factories', desc: 'Browse matched manufacturer profiles with specs, capacity, and certifications.' },
              { icon: Factory, num: '04', title: 'Start Production', desc: 'Connect via chat, finalize details, and begin manufacturing.' },
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
                  'AI-powered matching based on your tech spec',
                  'Real-time capacity visibility from factories',
                  'Verified manufacturer network with reviews',
                  'Direct chat with matched manufacturers',
                  'Free to start — premium features from $79/week',
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
                  { title: 'Smart Matching', desc: 'Algorithm analyzes 50+ parameters to find your ideal manufacturer.', icon: Search },
                  { title: 'Live Capacity', desc: 'See real-time factory availability and production slots.', icon: Factory },
                  { title: 'Verified Network', desc: 'All manufacturers are vetted and verified by our team.', icon: CheckCircle },
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
                  <div className="font-playfair text-5xl font-bold text-white mb-2">350+</div>
                  <p className="text-white/70">Verified manufacturers already on the platform</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <p className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">For Manufacturers</p>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy mb-6">
                Fill Your Production Capacity
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  'List your equipment, specializations, and capacity',
                  'Get matched with brands looking for your exact capabilities',
                  'Update capacity daily for accurate matching',
                  'Free profile listing — verification available',
                  'Communicate directly with interested brands',
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

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-16 sm:py-24 bg-warm-sand">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <p className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">Testimonials</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy">Trusted by Industry Leaders</h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Chen', role: 'Founder, Loom Studio', text: 'SewMatch helped us find the perfect cut-and-sew partner in LA. Our first production run was flawless.', stars: 5 },
              { name: 'Mike Torres', role: 'CEO, Pacific Apparel Co.', text: 'We went from 60% capacity to 95% in three months thanks to the steady stream of qualified brand leads.', stars: 5 },
              { name: 'Jessica Park', role: 'Design Director, Forma', text: 'The tech spec builder saved us weeks of back-and-forth. Matched with a factory that nailed our activewear line.', stars: 5 },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`bg-white rounded-xl p-6 shadow-card border-t-4 ${i === 1 ? 'border-teal' : 'border-coral'}`}>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold ${i === 1 ? 'bg-teal' : 'bg-coral'}`}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-navy text-sm">{t.name}</div>
                      <div className="text-slate text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PRICING PREVIEW ========== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <p className="text-teal text-xs font-semibold uppercase tracking-[0.2em] mb-3">Pricing</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-navy">Simple, Transparent Pricing</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* For Brands */}
            <FadeIn>
              <div className="bg-warm-sand rounded-xl p-8 border-l-4 border-coral">
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
              <div className="bg-warm-sand rounded-xl p-8 border-l-4 border-teal">
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
          <p className="text-white/70 mb-8">Join 2,000+ brands and 500+ manufacturers on SewMatch today.</p>
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
