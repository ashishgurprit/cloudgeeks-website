import { ArrowRight } from 'lucide-react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-black overflow-hidden">

      {/* Background: Subtle White Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-white rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          <span className="text-gray-300 text-xs font-bold tracking-widest uppercase">
            Ganda Tech Services Engineering
          </span>
        </motion.div>

        {/* Headline - Mostly White, One Gradient Word */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-heading font-extrabold text-6xl md:text-8xl leading-tight text-white mb-8"
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
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          We build intelligent ecosystems using
          <span className="text-white font-semibold"> Data Science, NLP, and Cloud Infrastructure</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Primary Button: White (CloudGeeks Style) */}
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-2"
          >
            Start Transformation <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Secondary Button: Outline */}
          <Link
            to="products"
            smooth={true}
            duration={500}
            className="px-8 py-4 rounded-full text-white border border-white/20 hover:bg-white/10 transition-colors cursor-pointer font-medium"
          >
            View Innovation Lab
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
