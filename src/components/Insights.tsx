import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-scroll';

const Insights = () => {
  const articles = [
    {
      category: 'AI Strategy',
      title: 'Moving Beyond Chatbots: How NLP Transforms Business Data',
      snippet: 'How we use Natural Language Processing to turn unstructured customer emails into structured database entries.',
      date: 'Oct 2024'
    },
    {
      category: 'Automation',
      title: 'Silos Are Silent Killers: Integrating CRM with Marketing',
      snippet: 'A case study on connecting Sales Pipelines directly to Marketing Automations to reduce lead leakage by 40%.',
      date: 'Nov 2024'
    },
    {
      category: 'Digitization',
      title: 'From Paper to Pixel: Digitizing Legacy Workloads',
      snippet: 'How traditional industries in the Hills District can migrate offline processes to secure cloud-based web portals.',
      date: 'Dec 2024'
    }
  ];

  return (
    <section id="insights" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-slate-800 mb-4">
              Knowledge Base
            </h2>
            <p className="text-slate-600 text-lg">
              Deep dives into how we solve complex engineering problems.
            </p>
          </div>
          <a
            href="https://insights.cloudgeeks.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 border border-slate-700 rounded-full text-white font-semibold hover:bg-violet-600 hover:border-violet-600 transition-all group"
          >
            Visit Knowledge Hub
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all h-full">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold tracking-wider text-cyan-600 uppercase">{article.category}</span>
                  <span className="text-xs text-slate-500">{article.date}</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-800 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                  {article.snippet}
                </p>
              </div>

              <Link to="contact" smooth={true} duration={500} className="group inline-flex items-center text-sm font-bold text-slate-800 cursor-pointer hover:text-violet-600">
                Read Strategy
                <ArrowUpRight className="ml-2 w-4 h-4 text-violet-600 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
