import { useState } from 'react';
import { ShoppingBag, HeartPulse, Hammer, Film, ArrowRight, Check, X, FileText } from 'lucide-react';

const Industries = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const packages = [
    {
      id: 0,
      title: 'Financial Services & Retail',
      name: 'Intelligent Operations Suite',
      icon: ShoppingBag,
      color: 'text-tech-cyan',
      bg: 'bg-tech-cyan',
      desc: 'AI-powered predictive analytics for inventory, demand, and customer behavior.',
      features: ['Customer Service Automation', 'Predictive Inventory Analytics', 'Automated Compliance Monitoring', 'Real-time Dashboards'],
      caseStudy: {
        title: "Predictive Inventory for Multi-Outlet Retail",
        client: "Sydney Franchise Chain (50+ Locations)",
        challenge: "Client was losing $15k/month/location in spoiled stock while facing stockouts on weekends.",
        solution: "Deployed a custom demand forecasting model using historical sales data and local event APIs to auto-adjust procurement orders.",
        stats: ["35% reduction in spoilage", "18% revenue increase", "Automated procurement"]
      }
    },
    {
      id: 1,
      title: 'Healthcare & Education',
      name: 'Customer Experience Transformer',
      icon: HeartPulse,
      color: 'text-electric-violet',
      bg: 'bg-electric-violet',
      desc: 'Digitizing the patient and student journey with automated scheduling and documentation.',
      features: ['Patient/Student Journey Mapping', 'Automated Scheduling', 'Digital Forms', 'Integrated Comms'],
      caseStudy: {
        title: "Digitizing the Patient Journey",
        client: "Specialist Medical Center, Norwest",
        challenge: "Staff spent 60% of time on manual data entry, causing 45-minute patient wait times.",
        solution: "Built a secure, iPad-based intake system that writes directly to the CRM via encrypted API, triggering automated follow-ups.",
        stats: ["Zero manual data entry", "40% reduced wait time", "HIPAA/Privacy Compliant"]
      }
    },
    {
      id: 2,
      title: 'Construction & Installers',
      name: 'Service Industry Optimizer',
      icon: Hammer,
      color: 'text-gts-orange',
      bg: 'bg-gts-orange',
      desc: 'End-to-end project management and resource optimization for field teams.',
      features: ['Project Automation', 'Real-time Progress Tracking', 'Resource Optimization', 'Safety Compliance'],
      caseStudy: {
        title: "Real-Time Field Asset Tracking",
        client: "Commercial HVAC Installer",
        challenge: "No real-time visibility on field teams. Compliance docs were lost, leading to payment delays.",
        solution: "Deployed a mobile app for field teams to log progress and upload geotagged compliance photos in real-time.",
        stats: ["100% compliance rate", "20% increase in billable hours", "Instant payment verification"]
      }
    },
    {
      id: 3,
      title: 'Media & Tech Firms',
      name: 'Media Accelerator',
      icon: Film,
      color: 'text-white',
      bg: 'bg-white',
      desc: 'Automated content workflows and digital asset management for high-velocity teams.',
      features: ['Content Management', 'Automated Workflows', 'Digital Asset Management', 'Customer Engagement'],
      caseStudy: {
        title: "Automating High-Velocity Publishing",
        client: "Digital News Agency",
        challenge: "Writers spent 4 hours per article on research, capping output at 2 articles/day.",
        solution: "Integrated ContentSage architecture to pre-generate topic clusters, research briefs, and SEO drafts.",
        stats: ["3x content output", "Ranked #1 for 40+ keywords", "Automated Interlinking"]
      }
    }
  ];

  return (
    <section id="industries" className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-slate-800 mb-6">
            Industry Specific <span className="text-gts-gradient">Solutions</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            We deliver tailored solution packages designed for your specific operational challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12">

          {/* Menu */}
          <div className="flex flex-col gap-4">
            {packages.map((pkg, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 border flex items-center gap-4 group ${
                  activeTab === index
                    ? 'bg-slate-100 border-slate-300 shadow-sm'
                    : 'bg-transparent border-transparent hover:bg-slate-50'
                }`}
              >
                <pkg.icon className={`w-6 h-6 ${activeTab === index ? pkg.color : 'text-slate-400'}`} />
                <div>
                  <h3 className={`font-bold text-sm uppercase tracking-wider ${activeTab === index ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>
                    {pkg.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div className="relative">
             <div className={`absolute inset-0 blur-[100px] opacity-10 transition-colors duration-500 ${packages[activeTab].bg}`}></div>

            <div className="relative bg-slate-800 border border-slate-700 rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center shadow-xl">

              <div className="mb-8">
                <span className={`text-xs font-bold uppercase tracking-widest ${packages[activeTab].color}`}>
                  Package {activeTab + 1}
                </span>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mt-2 mb-4">
                  {packages[activeTab].name}
                </h3>
                <p className="text-xl text-slate-300 leading-relaxed">
                  {packages[activeTab].desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {packages[activeTab].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full bg-white/10 ${packages[activeTab].color}`}>
                        <Check className="w-3 h-3" />
                    </div>
                    <span className="text-slate-200 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-600 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="text-sm text-slate-400">
                    Includes: Implementation | Training | 24/7 Support
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-8 py-3 bg-white text-slate-800 font-bold rounded-full hover:bg-slate-100 transition-colors flex items-center gap-2"
                >
                    View Case Study <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CASE STUDY MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>

          <div className="relative bg-geeks-dark border border-white/10 rounded-3xl max-w-2xl w-full p-8 md:p-10 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-6">
               <FileText className={`w-6 h-6 ${packages[activeTab].color}`} />
               <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Project Report</span>
            </div>

            <h3 className="text-3xl font-heading font-bold text-white mb-2">
              {packages[activeTab].caseStudy.title}
            </h3>
            <p className={`text-sm font-semibold mb-6 ${packages[activeTab].color}`}>
              Client: {packages[activeTab].caseStudy.client}
            </p>

            <div className="space-y-6 text-gray-300 mb-8">
              <div>
                <h4 className="text-white font-bold mb-2">The Challenge</h4>
                <p className="leading-relaxed text-sm">{packages[activeTab].caseStudy.challenge}</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2">The Engineering Solution</h4>
                <p className="leading-relaxed text-sm">{packages[activeTab].caseStudy.solution}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {packages[activeTab].caseStudy.stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl text-center">
                  <span className={`block font-bold text-sm ${packages[activeTab].color}`}>{stat}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
               <button
                 onClick={() => { setShowModal(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                 className="text-white hover:underline text-sm font-medium"
               >
                 Discuss a similar project for your business
               </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Industries;
