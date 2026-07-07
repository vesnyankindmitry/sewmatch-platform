import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Heart,
  Target,
  Globe,
  Factory,
  Shirt,
  Zap,
  Shield,
  Handshake,
  Lightbulb,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-playfair font-bold text-navy">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SOLUTION_FEATURES = [
  {
    icon: Zap,
    title: 'AI-Powered Matching',
    desc: 'Our intelligent algorithm connects brands with manufacturers based on capabilities, capacity, and quality requirements.',
  },
  {
    icon: Shield,
    title: 'Verified Network',
    desc: 'Every manufacturer is thoroughly vetted with facility inspections and certification verification.',
  },
  {
    icon: Handshake,
    title: 'Seamless Collaboration',
    desc: 'In-app messaging, file sharing, and tech spec tools streamline the entire production process.',
  },
];

const VALUES = [
  {
    icon: Heart,
    title: 'Transparency',
    desc: 'We believe in open communication and honest pricing. No hidden fees, no surprises.',
  },
  {
    icon: Target,
    title: 'Precision',
    desc: 'Every match is carefully calculated to ensure the best fit for both brands and manufacturers.',
  },
  {
    icon: Globe,
    title: 'Community',
    desc: 'Building a supportive ecosystem that helps American manufacturing thrive.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'Constantly improving our platform with cutting-edge technology and user feedback.',
  },
];

const TEAM = [
  {
    initial: 'SM',
    color: 'bg-teal',
    name: 'Sarah Mitchell',
    role: 'CEO & Co-Founder',
    bio: 'Former supply chain director with 15+ years in apparel manufacturing.',
  },
  {
    initial: 'JC',
    color: 'bg-coral',
    name: 'James Chen',
    role: 'CTO & Co-Founder',
    bio: 'Tech veteran who built matching algorithms for Fortune 500 companies.',
  },
  {
    initial: 'AR',
    color: 'bg-navy',
    name: 'Ana Rodriguez',
    role: 'Head of Operations',
    bio: 'Expert in manufacturing operations with deep industry relationships.',
  },
  {
    initial: 'DK',
    color: 'bg-amber-500',
    name: 'David Kim',
    role: 'Head of Design',
    bio: 'Award-winning product designer focused on intuitive user experiences.',
  },
];

const TIMELINE = [
  {
    year: '2019',
    title: 'The Spark',
    desc: 'Sarah and James met at an apparel trade show and identified the massive gap between brands and manufacturers.',
  },
  {
    year: '2020',
    title: 'Platform Launch',
    desc: 'SewMatch beta launched with 50 manufacturers in Los Angeles and New York.',
  },
  {
    year: '2022',
    title: 'Rapid Growth',
    desc: 'Expanded to 500+ manufacturers across 15 states. AI matching algorithm introduced.',
  },
  {
    year: '2024',
    title: 'Industry Leader',
    desc: 'Became the largest domestic apparel manufacturing network in the US.',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* ========== HERO ========== */}
      <section className="py-24 px-4 text-center bg-warm-sand">
        <motion.span
          className="text-teal uppercase tracking-widest text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Us
        </motion.span>
        <motion.h1
          className="text-4xl md:text-6xl font-playfair font-bold text-navy mt-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Our Story
        </motion.h1>
        <motion.p
          className="text-slate max-w-2xl mx-auto text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          SewMatch was born from a simple observation: brilliant brands and
          world-class manufacturers were struggling to find each other. We're
          here to change that.
        </motion.p>
      </section>

      {/* ========== PROBLEM ========== */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-playfair font-bold text-navy mb-6">
                The Problem We're Solving
              </h2>
              <p className="text-slate leading-relaxed mb-4">
                The apparel manufacturing industry is fragmented. Brands spend
                months searching for the right factory, often settling for
                overseas production due to a lack of domestic connections.
              </p>
              <p className="text-slate leading-relaxed">
                Meanwhile, incredible American manufacturers operate below
                capacity, missing out on opportunities to partner with emerging
                brands. SewMatch bridges this gap with technology and trust.
              </p>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-coral">
                <div className="text-3xl font-playfair font-bold text-navy mb-1">
                  67%
                </div>
                <p className="text-sm text-slate">
                  of emerging brands struggle to find domestic manufacturers
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-teal">
                <div className="text-3xl font-playfair font-bold text-navy mb-1">
                  30 min
                </div>
                <p className="text-sm text-slate">
                  average response time on our platform
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-amber-500">
                <div className="text-3xl font-playfair font-bold text-navy mb-1">
                  90%
                </div>
                <p className="text-sm text-slate">
                  client satisfaction rate with matched manufacturers
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SOLUTION ========== */}
      <section className="py-16 px-4 bg-warm-sand">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-playfair font-bold text-navy mb-4">
              Our Solution
            </h2>
            <p className="text-slate max-w-xl mx-auto">
              A comprehensive platform that intelligently matches brands with
              verified domestic manufacturers.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {SOLUTION_FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="bg-white rounded-2xl p-8 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center mb-4">
                  <Icon size={28} className="text-teal" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{title}</h3>
                <p className="text-sm text-slate leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { target: 500, suffix: '+', label: 'Manufacturers' },
              { target: 2000, suffix: '+', label: 'Brands' },
              { target: 94, suffix: '%', label: 'Satisfaction' },
              { target: 4.8, suffix: 'B', prefix: '$', label: 'Market Connected' },
            ].map(({ target, suffix, label, prefix }, i) => (
              <motion.div
                key={label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <AnimatedCounter
                  target={target}
                  suffix={suffix}
                  prefix={prefix}
                />
                <div className="text-sm text-slate mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MISSION ========== */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              className="bg-teal rounded-2xl p-10 text-white"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-playfair font-bold mb-4">
                Our Mission
              </h2>
              <p className="text-white/90 leading-relaxed mb-6">
                To revitalize American manufacturing by creating the most
                trusted platform for apparel production. We believe in the power
                of domestic manufacturing — better quality, faster turnaround,
                and a more sustainable future.
              </p>
              <p className="text-white/90 leading-relaxed">
                Every connection we facilitate strengthens the domestic apparel
                ecosystem, creates local jobs, and helps brands build products
                they can be proud of.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-100 rounded-2xl h-80 md:h-full min-h-[300px] flex items-center justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                  <Factory size={36} className="text-teal" />
                </div>
                <p className="text-slate text-sm">Manufacturing Partner</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== VALUES ========== */}
      <section className="py-16 px-4 bg-warm-sand">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-playfair font-bold text-navy mb-4">
              Our Values
            </h2>
            <p className="text-slate max-w-xl mx-auto">
              The principles that guide every decision we make.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="bg-white rounded-xl p-6 flex items-start gap-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-teal" />
                </div>
                <div>
                  <h3 className="font-bold text-navy mb-1">{title}</h3>
                  <p className="text-sm text-slate leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TEAM ========== */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-playfair font-bold text-navy mb-4">
              Meet the Team
            </h2>
            <p className="text-slate max-w-xl mx-auto">
              The passionate people behind SewMatch.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {TEAM.map(({ initial, color, name, role, bio }, i) => (
              <motion.div
                key={name}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-mist"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className={`w-20 h-20 rounded-full ${color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4`}
                >
                  {initial}
                </div>
                <h3 className="font-bold text-navy mb-1">{name}</h3>
                <p className="text-xs text-teal font-medium mb-3">{role}</p>
                <p className="text-sm text-slate leading-relaxed">{bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section className="py-16 px-4 bg-warm-sand">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-playfair font-bold text-navy mb-4">
              Our Journey
            </h2>
            <p className="text-slate">
              Key milestones in the SewMatch story.
            </p>
          </motion.div>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-mist" />

            {TIMELINE.map(({ year, title, desc }, i) => (
              <motion.div
                key={year}
                className={`relative flex items-start gap-6 mb-10 last:mb-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-teal border-4 border-white shadow z-10" />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}
                >
                  <span className="text-teal font-bold text-sm">{year}</span>
                  <h3 className="text-lg font-bold text-navy mt-1 mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto bg-teal rounded-2xl p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-playfair font-bold text-white mb-4">
            Join the Movement
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Whether you're a brand looking for the perfect manufacturer or a
            factory ready for new partnerships, SewMatch is your platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-white text-teal px-8 py-3 rounded-xl font-medium hover:bg-white/90 transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Shirt size={16} className="inline mr-2" />
              Join as Brand
            </motion.button>
            <motion.button
              className="bg-navy text-white px-8 py-3 rounded-xl font-medium hover:opacity-90 transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Factory size={16} className="inline mr-2" />
              Join as Manufacturer
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
