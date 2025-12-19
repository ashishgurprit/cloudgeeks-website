import { ArrowRight, Cpu, Database, Cloud } from 'lucide-react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden">

      {/* Background Abstract Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-electric-violet rounded-full blur-[128px]"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-tech-cyan rounded-full blur-[96px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="text-center max-w-4xl mx-auto">

          {/* Small Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-gray-300 text-xs font-semibold tracking-wide uppercase">
              The Engineering Team Behind ContentSage
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading font-extrabold text-5xl md:text-7xl leading-tight text-white mb-6"
          >
            Engineering the <br />
            <span className="text-gradient">Future of Your Business</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            We don't just write code. We build intelligent ecosystems using
            <span className="text-white font-semibold"> Data Science, NLP, and Cloud Infrastructure</span>
            {' '}to digitize your workload and scale your growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="group relative px-8 py-4 bg-accent-gradient rounded-full text-white font-semibold text-lg shadow-lg shadow-electric-violet/25 hover:shadow-electric-violet/50 transition-all cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Transformation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              to="products"
              smooth={true}
              duration={500}
              className="px-8 py-4 rounded-full text-white border border-gray-700 hover:bg-white/5 transition-colors cursor-pointer font-medium"
            >
              View Innovation Lab
            </Link>
          </motion.div>
        </div>

        {/* Floating Icons - Service Pillars */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Cpu, label: "Custom AI Engineering", color: "text-electric-violet" },
            { icon: Database, label: "Data Science & Scale", color: "text-tech-cyan" },
            { icon: Cloud, label: "Cloud Architecture", color: "text-blue-400" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <item.icon className={`w-8 h-8 ${item.color}`} />
              <span className="text-gray-200 font-semibold">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
