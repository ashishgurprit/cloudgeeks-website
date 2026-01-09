import { ArrowRight } from 'lucide-react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-[#f0f4f8] overflow-hidden">

      {/* Background: Subtle accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-5 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-violet-500 rounded-full blur-[120px]"></div>
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-cyan-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-600/20 bg-cyan-600/5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse"></span>
          <span className="text-slate-600 text-xs font-bold tracking-widest uppercase">
            Ganda Tech Services Engineering
          </span>
        </motion.div>

        {/* Headline - Dark text, One Gradient Word */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-heading font-extrabold text-6xl md:text-8xl leading-tight text-slate-800 mb-8"
        >
          Engineering the <br />
          {/* The GTS Blend: Only this text gets the color */}
          <span className="text-gts-gradient">
            Future.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          We build intelligent ecosystems using
          <span className="text-slate-800 font-semibold"> Data Science, NLP, and Cloud Infrastructure</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Primary Button: Dark (CloudGeeks Style) */}
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="px-8 py-4 bg-slate-800 text-white rounded-full font-bold text-lg hover:bg-violet-600 transition-colors cursor-pointer flex items-center gap-2"
          >
            Start Transformation <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Secondary Button: Outline */}
          <Link
            to="products"
            smooth={true}
            duration={500}
            className="px-8 py-4 rounded-full text-slate-800 border border-slate-800/20 hover:bg-slate-800/5 transition-colors cursor-pointer font-medium"
          >
            View Innovation Lab
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
