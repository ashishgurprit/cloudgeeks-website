import { Sparkles, ArrowRight } from 'lucide-react';

const Products = () => {
  return (
    <section id="products" className="py-24 bg-charcoal-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-violet/10 border border-electric-violet/20 mb-4">
            <Sparkles className="w-4 h-4 text-electric-violet" />
            <span className="text-xs font-bold text-electric-violet tracking-wide uppercase">Innovation Lab</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4">
            Products We've Built
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We don't just build for clients; we build for the market. Explore the platforms engineered entirely by GTS.
          </p>
        </div>

        <div className="space-y-24">

          {/* Product 1: ContentSage (Text Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-electric-violet font-bold tracking-wider uppercase text-sm mb-2 block">Powered by ContentSage</span>
              <h3 className="text-3xl font-heading font-bold text-white mb-4">The AI-First SEO Writer</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Clients pay market prices for writers but get AI-level quality. ContentSage analyzes top-ranking content and generates optimized articles that rank in days.
              </p>
              <ul className="space-y-2 mb-8 text-gray-300">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-electric-violet rounded-full"></span>Topic Authority Maps</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-electric-violet rounded-full"></span>Competitor Analysis</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-electric-violet rounded-full"></span>Automated Interlinking</li>
              </ul>
              <a href="#contact" className="inline-flex items-center text-white font-semibold hover:text-electric-violet transition-colors group">
                Learn more about ContentSage <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-electric-violet/20 blur-[80px] rounded-full"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-12 flex items-center justify-center aspect-video hover:bg-white/10 transition-all duration-500 group">
                <img
                  src="/assets/contentsage-logo.png"
                  alt="ContentSage Logo"
                  className="w-32 h-32 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Product 2: Saya (Image Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-tech-cyan/20 blur-[80px] rounded-full"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-12 flex items-center justify-center aspect-video hover:bg-white/10 transition-all duration-500 group">
                {/* Saya CSS Logo */}
                <div className="text-center group-hover:scale-110 transition-transform duration-500">
                  <span className="font-heading font-extrabold text-6xl text-white tracking-tighter">
                    Saya<span className="text-tech-cyan">.</span>
                  </span>
                  <div className="h-1 w-full bg-gradient-to-r from-electric-violet to-tech-cyan mt-2 rounded-full opacity-50"></div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-tech-cyan font-bold tracking-wider uppercase text-sm mb-2 block">Bring Your Own Translation</span>
              <h3 className="text-3xl font-heading font-bold text-white mb-4">Break Language Barriers</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Real-time translation that understands cultural context. Saya allows seamless communication with contractors across 100+ languages.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">100+</div>
                  <div className="text-xs text-gray-500 uppercase">Languages</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">0.5s</div>
                  <div className="text-xs text-gray-500 uppercase">Latency</div>
                </div>
              </div>
              <a href="#contact" className="inline-flex items-center text-white font-semibold hover:text-tech-cyan transition-colors group">
                Learn more about Saya <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Products;
