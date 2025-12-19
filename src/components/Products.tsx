import { motion } from 'framer-motion';
import { Rocket, ExternalLink, Sparkles, Languages } from 'lucide-react';

// CSS-based Saya Logo component (matching the Flutter implementation)
const SayaLogo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  };

  return (
    <div className="relative inline-block">
      {/* Shadow layer with gradient */}
      <span
        className={`absolute font-bold ${sizeClasses[size]} text-gradient`}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          transform: 'translate(2px, 2px)',
          opacity: 0.8
        }}
      >
        Saya
      </span>
      {/* Main text layer */}
      <span
        className={`relative font-bold ${sizeClasses[size]} text-white`}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        Saya
      </span>
      {/* Accent dot */}
      <span
        className="absolute -top-1 -right-2 w-2 h-2 bg-electric-violet rounded-full"
      ></span>
    </div>
  );
};

const Products = () => {
  const products = [
    {
      name: 'ContentSage',
      tagline: 'AI-Powered SEO Content Engine',
      description: 'Our flagship content platform that combines AI analysis with SEO best practices. ContentSage analyzes top-ranking content and generates optimized articles that dominate search rankings.',
      features: ['Keyword Gap Analysis', 'AI Content Generation', 'Competitor Intelligence', 'Performance Tracking'],
      gradient: 'from-blue-500 to-cyan-500',
      logo: '/assets/contentsage-logo.png',
      useLogo: true,
      icon: Sparkles,
    },
    {
      name: 'Saya',
      tagline: 'Breaking Language Barriers',
      description: 'Real-time AI translation platform built for global teams. Saya enables seamless multilingual communication with context-aware accuracy across 100+ languages.',
      features: ['Real-time Translation', '100+ Languages', 'Context Preservation', 'API Integration'],
      gradient: 'from-electric-violet to-tech-cyan',
      useLogo: false, // Use CSS logo
      icon: Languages,
    },
  ];

  return (
    <section id="products" className="py-24 bg-charcoal relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-electric-violet/10 rounded-full blur-[128px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Rocket className="h-4 w-4 text-electric-violet" />
            <span className="text-gray-300 text-xs font-semibold tracking-wide uppercase">
              Innovation Lab
            </span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4">
            Products We've Built
          </h2>
          <p className="text-gray-400 text-lg">
            Beyond consulting, we create our own products. These platforms showcase our
            engineering capabilities and solve real problems at scale.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="space-y-12">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  {product.useLogo ? (
                    <img
                      src={product.logo}
                      alt={product.name}
                      className="h-12 w-auto"
                    />
                  ) : (
                    <SayaLogo size="md" />
                  )}
                </div>

                <p className="text-tech-cyan text-sm font-medium uppercase tracking-wider mb-2">
                  {product.tagline}
                </p>

                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  {product.description}
                </p>

                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient}`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-white font-medium hover:text-tech-cyan transition-colors"
                >
                  Learn more about {product.name}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              {/* Visual Card */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative">
                  {/* Background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} rounded-3xl blur-xl opacity-20`}></div>

                  {/* Card */}
                  <div className="relative bg-charcoal-light border border-white/10 rounded-3xl p-8 md:p-12">
                    <div className="flex items-center justify-center h-48">
                      {product.useLogo ? (
                        <img
                          src={product.logo}
                          alt={product.name}
                          className="max-h-32 w-auto"
                        />
                      ) : (
                        <SayaLogo size="lg" />
                      )}
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 border border-white/5 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
