import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Rocket, Target, Heart } from 'lucide-react';
import Footer from './Footer';

const GTSPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-gts-orange selection:text-black">

      {/* Simple Header */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-heading font-bold uppercase text-sm tracking-widest">Return to CloudGeeks</span>
          </Link>

          <img src="/assets/gts-logo-light.png" alt="Ganda Tech Services Logo" width={100} height={40} className="h-10 w-auto opacity-80" />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gts-gradient opacity-5 blur-[150px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="text-gts-orange font-bold text-xs tracking-widest uppercase">Est. 2024</span>
          </div>

          <h1 className="font-heading font-extrabold text-5xl md:text-7xl leading-tight mb-8">
            The Engine Behind <br />
            <span className="text-gts-gradient">The Transformation.</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Ganda Tech Services (GTS) is the parent entity and strategic brain behind CloudGeeks, ContentSage, and Saya.
          </p>
        </div>
      </header>

      {/* Core Pillars */}
      <main className="max-w-5xl mx-auto px-4 pb-24 space-y-24">

        {/* OUR WHY */}
        <section className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-electric-violet">
              <Heart className="w-8 h-8" />
            </div>
            <div className="h-full w-px bg-gradient-to-b from-white/10 to-transparent my-4"></div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-electric-violet uppercase tracking-widest mb-2">Our Why</h2>
            <h3 className="text-3xl font-heading font-bold text-white mb-6">Democratizing Scale</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              We are determined to realize a vision of a highly democratized, efficient, and scalable business ecosystem anchored firmly in human values.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              We believe AI and machine learning are the great equalizers. Our mandate is to target <span className="text-white font-semibold">Small and Medium-sized Businesses (SMBs)</span>, empowering them with the same technological artillery as large-cap enterprises. We don't just help you survive; we help you scale until you become the market leader.
            </p>
          </div>
        </section>

        {/* OUR VISION */}
        <section className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-tech-cyan">
              <Target className="w-8 h-8" />
            </div>
            <div className="h-full w-px bg-gradient-to-b from-white/10 to-transparent my-4"></div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-tech-cyan uppercase tracking-widest mb-2">Our Vision</h2>
            <h3 className="text-3xl font-heading font-bold text-white mb-6">The Efficiency Standard</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              To be the partner of choice for SMBs looking to scale their operation and become lean, efficient giants.
            </p>
            <blockquote className="mt-6 border-l-4 border-tech-cyan pl-6 italic text-gray-300 text-xl">
              "We aim to help our clients lead their industry in revenue per employee and resource utilization rates."
            </blockquote>
          </div>
        </section>

        {/* OUR MISSION */}
        <section className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-gts-orange">
              <Rocket className="w-8 h-8" />
            </div>
          </div>
          <div>
            <h2 className="text-sm font-bold text-gts-orange uppercase tracking-widest mb-2">Our Mission</h2>
            <h3 className="text-3xl font-heading font-bold text-white mb-6">Architecting the Backbone</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Empowering businesses to thrive in the digital age through innovative technology solutions that enhance efficiency, security, and knowledge transfer. We build the digital nervous systems that allow modern companies to grow without breaking.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default GTSPage;
