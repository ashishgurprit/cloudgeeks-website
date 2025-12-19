import { CheckCircle2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="about" className="py-24 bg-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: The Narrative */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 w-fit">
              <MapPin className="w-4 h-4 text-tech-cyan" />
              <span className="text-xs font-bold text-gray-300 tracking-wide uppercase">Bella Vista & Norwest</span>
            </div>

            <h2 className="font-heading font-bold text-4xl text-white mb-6 leading-tight">
              Engineering Excellence from <br />
              <span className="text-gradient">Sydney's Hills District</span>
            </h2>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              CloudGeeks is the specialized engineering arm of <span className="text-white font-semibold">Ganda Tech Services (GTS)</span>.
              We are a Sydney-based consultancy located in the heart of Bella Vista / Norwest Business Park.
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              We bridge the gap between complex AI algorithms and practical business utility. As your local engineering partner, we offer direct access to architects and a laser focus on ROI.
            </p>

            <div className="space-y-4">
              {[
                "Local Sydney Engineering Team",
                "Rapid Prototyping & MVP Development",
                "Systems that grow with you for 1-2+ years"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-tech-cyan w-6 h-6 flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: The GTS Branding Card */}
          <Link to="/gts" className="relative block group">
            {/* Decorative background blur */}
            <div className="absolute inset-0 bg-gradient-to-tr from-electric-violet to-tech-cyan rounded-3xl blur-2xl opacity-20 transform rotate-3 group-hover:opacity-30 transition-opacity"></div>

            <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl flex flex-col items-center justify-center h-full min-h-[400px] group-hover:bg-white/10 transition-all">
              <p className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-8">Powered By</p>

              {/* GTS Logo Image */}
              <img
                src="/assets/gts-logo.png"
                alt="Ganda Tech Services"
                className="w-48 h-auto object-contain mb-8 group-hover:scale-105 transition-transform"
              />

              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-white/10 rounded-lg text-sm text-gray-300 font-mono">
                  est. 2024
                </span>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default About;
