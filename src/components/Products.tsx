import { Sparkles, ArrowRight } from 'lucide-react';

const Products = () => {
  return (
    <section id="products" className="py-24 bg-[#f0f4f8] overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 border border-violet-200 mb-4">
            <Sparkles className="w-4 h-4 text-violet-600" />
            <span className="text-xs font-bold text-violet-600 tracking-wide uppercase">Innovation Lab</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-slate-800 mb-4">
            Products We've Built
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            We don't just build for clients; we build for the market. Explore the platforms engineered entirely by GTS.
          </p>
        </div>

        <div className="space-y-24">

          {/* Product 1: ContentSage (Text Left, Image Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-violet-600 font-bold tracking-wider uppercase text-sm mb-2 block">Powered by ContentSage</span>
              <h3 className="text-3xl font-heading font-bold text-slate-800 mb-4">The AI-First SEO Writer</h3>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Clients pay market prices for writers but get AI-level quality. ContentSage analyzes top-ranking content and generates optimized articles that rank in days.
              </p>
              <ul className="space-y-2 mb-8 text-slate-700">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-violet-600 rounded-full"></span>Topic Authority Maps</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-violet-600 rounded-full"></span>Competitor Analysis</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-violet-600 rounded-full"></span>Automated Interlinking</li>
              </ul>
              <a href="https://write-gts.cchk.info" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-slate-800 font-semibold hover:text-violet-600 transition-colors group">
                Learn more about ContentSage <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-violet-500/10 blur-[80px] rounded-full"></div>
              <a href="https://write-gts.cchk.info" target="_blank" rel="noopener noreferrer" className="relative bg-white border border-slate-200 rounded-3xl p-12 flex items-center justify-center aspect-video hover:shadow-lg hover:border-slate-300 transition-all duration-500 group block">
                <img
                  src="/assets/contentsage-logo.png"
                  alt="ContentSage - AI-Powered SEO Content Writing Platform by GTS"
                  width={128}
                  height={128}
                  loading="lazy"
                  className="w-32 h-32 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                />
              </a>
            </div>
          </div>

          {/* Product 2: Saya (Image Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/10 blur-[80px] rounded-full"></div>
              <a href="https://translate-gts.cchk.info" target="_blank" rel="noopener noreferrer" className="relative bg-white border border-slate-200 rounded-3xl p-12 flex items-center justify-center aspect-video hover:shadow-lg hover:border-slate-300 transition-all duration-500 group block">
                {/* Saya CSS Logo */}
                <div className="text-center group-hover:scale-110 transition-transform duration-500">
                  <span className="font-heading font-extrabold text-6xl text-slate-800 tracking-tighter">
                    Saya<span className="text-cyan-600">.</span>
                  </span>
                  <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-cyan-500 mt-2 rounded-full opacity-50"></div>
                </div>
              </a>
            </div>

            <div>
              <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">Bring Your Own Translation</span>
              <h3 className="text-3xl font-heading font-bold text-slate-800 mb-4">Break Language Barriers</h3>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Real-time translation that understands cultural context. Saya allows seamless communication with contractors across 100+ languages.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="text-2xl font-bold text-slate-800 mb-1">100+</div>
                  <div className="text-xs text-slate-500 uppercase">Languages</div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                  <div className="text-2xl font-bold text-slate-800 mb-1">0.5s</div>
                  <div className="text-xs text-slate-500 uppercase">Latency</div>
                </div>
              </div>
              <a href="https://translate-gts.cchk.info" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-slate-800 font-semibold hover:text-cyan-600 transition-colors group">
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
