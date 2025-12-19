import { motion } from 'framer-motion';
import { Building2, Users, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Building2, value: '50+', label: 'Projects Delivered' },
    { icon: Users, value: '30+', label: 'Happy Clients' },
    { icon: Award, value: '10+', label: 'Years Combined Experience' },
  ];

  return (
    <section id="about" className="py-24 bg-charcoal-light relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-tech-cyan/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-gray-300 text-xs font-semibold tracking-wide uppercase">
                A GTS Company
              </span>
            </div>

            <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6">
              Engineering Excellence from{' '}
              <span className="text-gradient">Sydney's Hills District</span>
            </h2>

            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              CloudGeeks is the technology arm of <span className="text-white font-medium">Ganda Tech Services (GTS)</span>,
              a Sydney-based consultancy founded in the heart of Bella Vista's Norwest Business Park.
            </p>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We're not your typical dev shop. We're business-minded engineers who understand that
              technology must serve strategy. Every solution we build is designed to digitize workloads,
              automate growth, and create sustainable competitive advantages.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 text-tech-cyan mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Logo/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 border border-white/5 rounded-full"></div>
              <div className="absolute inset-8 border border-white/10 rounded-full"></div>
              <div className="absolute inset-16 border border-electric-violet/20 rounded-full"></div>

              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-charcoal p-8 rounded-3xl border border-white/10">
                  <img
                    src="/assets/gts-logo-dark.png"
                    alt="GTS CloudGeeks"
                    className="h-20 w-auto"
                  />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-8 bg-electric-violet/20 backdrop-blur-sm border border-electric-violet/30 rounded-xl px-4 py-2"
              >
                <span className="text-sm font-medium text-white">AI-Powered</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 left-8 bg-tech-cyan/20 backdrop-blur-sm border border-tech-cyan/30 rounded-xl px-4 py-2"
              >
                <span className="text-sm font-medium text-white">Cloud-Native</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
