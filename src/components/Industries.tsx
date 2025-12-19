import { useState } from 'react';
import { ShoppingBag, HeartPulse, Hammer, Film, ArrowRight, Check } from 'lucide-react';

const Industries = () => {
  const [activeTab, setActiveTab] = useState(0);

  const packages = [
    {
      id: 0,
      title: 'Financial Services & Retail',
      name: 'Intelligent Operations Suite',
      icon: ShoppingBag,
      color: 'text-tech-cyan',
      bgColor: 'bg-tech-cyan',
      desc: 'AI-powered predictive analytics for inventory, demand, and customer behavior.',
      features: [
        'Customer Service Automation',
        'Predictive Inventory Analytics',
        'Automated Compliance Monitoring',
        'Real-time Performance Dashboards'
      ]
    },
    {
      id: 1,
      title: 'Healthcare & Education',
      name: 'Customer Experience Transformer',
      icon: HeartPulse,
      color: 'text-electric-violet',
      bgColor: 'bg-electric-violet',
      desc: 'Digitizing the patient and student journey with automated scheduling and documentation.',
      features: [
        'Patient/Student Journey Mapping',
        'Automated Scheduling Systems',
        'Digital Forms & Documentation',
        'Integrated Communication Platform'
      ]
    },
    {
      id: 2,
      title: 'Construction & Installers',
      name: 'Service Industry Optimizer',
      icon: Hammer,
      color: 'text-gts-orange',
      bgColor: 'bg-gts-orange',
      desc: 'End-to-end project management and resource optimization for field teams.',
      features: [
        'Project Management Automation',
        'Real-time Progress Tracking',
        'Resource Optimization',
        'Compliance & Safety Management'
      ]
    },
    {
      id: 3,
      title: 'Media & Tech Firms',
      name: 'Media Accelerator',
      icon: Film,
      color: 'text-white',
      bgColor: 'bg-white',
      desc: 'Automated content workflows and digital asset management for high-velocity teams.',
      features: [
        'Content Management Systems',
        'Automated Workflow Tools',
        'Digital Asset Management',
        'Customer Engagement Platforms'
      ]
    }
  ];

  return (
    <section id="industries" className="py-24 bg-geeks-dark relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-6">
            Industry Specific <span className="text-gts-gradient">Solutions</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We don't offer generic code. We deliver tailored solution packages designed for your specific operational challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-12">

          {/* Left: Menu */}
          <div className="flex flex-col gap-4">
            {packages.map((pkg, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 border flex items-center gap-4 group ${
                  activeTab === index
                    ? 'bg-white/10 border-white/20'
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <pkg.icon className={`w-6 h-6 ${activeTab === index ? pkg.color : 'text-gray-500'}`} />
                <div>
                  <h3 className={`font-bold text-sm uppercase tracking-wider ${activeTab === index ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {pkg.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Content Card */}
          <div className="relative">
             {/* Glow Effect */}
             <div className={`absolute inset-0 blur-[100px] opacity-20 transition-colors duration-500 ${packages[activeTab].bgColor}`}></div>

            <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 h-full flex flex-col justify-center">

              <div className="mb-8">
                <span className={`text-xs font-bold uppercase tracking-widest ${packages[activeTab].color}`}>
                  Package {activeTab + 1}
                </span>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mt-2 mb-4">
                  {packages[activeTab].name}
                </h3>
                <p className="text-xl text-gray-400 leading-relaxed">
                  {packages[activeTab].desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {packages[activeTab].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full bg-white/10 ${packages[activeTab].color}`}>
                        <Check className="w-3 h-3" />
                    </div>
                    <span className="text-gray-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="text-sm text-gray-500">
                    Includes: Implementation | Training | 24/7 Support
                </div>
                <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
                    View Case Study <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Industries;
