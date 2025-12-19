import { Brain, Zap, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-scroll';

const Expertise = () => {
  const services = [
    {
      icon: Brain,
      title: 'Custom AI & App Engineering',
      desc: 'From concept to deployment, we build native mobile and responsive web applications powered by Generative AI.',
      features: ['Custom LLM & NLP Integration', 'Predictive Analytics', 'React Native & Web Portals'],
      color: 'text-electric-violet'
    },
    {
      icon: Zap,
      title: 'Digital Transformation',
      desc: 'Stop drowning in manual tasks. We digitize your workload and integrate your disparate systems into one machine.',
      features: ['CRM Integrations (HubSpot/Zoho)', 'Automated Ticket Management', 'Marketing Workflows'],
      color: 'text-tech-cyan'
    },
    {
      icon: Globe,
      title: 'Ecosystem & Infrastructure',
      desc: 'A strong business needs a strong backbone. We handle the end-to-end setup of your digital workspace.',
      features: ['Google Workspace Setup', 'Unified Comms (VoIP/Chat)', 'Cloud Security Best Practices'],
      color: 'text-blue-400'
    }
  ];

  return (
    <section id="expertise" className="py-24 bg-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4">
            Our Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Grouped into three logical pillars to avoid overwhelming your users, but deep enough to solve complex problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300">
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-black/40">
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>

              <h3 className="text-xl font-heading font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.desc}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-300">
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${service.color.replace('text-', 'bg-')}`}></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to="contact" smooth={true} duration={500} className="inline-flex items-center text-white font-medium cursor-pointer group-hover:underline decoration-tech-cyan underline-offset-4">
                Discuss Strategy <ArrowRight className="ml-2 w-4 h-4 text-tech-cyan" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
