import { Linkedin, Github, Mail, ArrowUp } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#e8eef4] py-16 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: GTS Parent Company Branding */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              A Division of
            </p>

            {/* GTS Logo - Links to /gts page - Original colors on light bg */}
            <RouterLink to="/gts" className="group cursor-pointer">
              <img
                src="/assets/gts-logo-light.png"
                alt="Ganda Tech Services - Engineering Intelligence for SMBs in Sydney"
                width={160}
                height={64}
                loading="lazy"
                className="h-16 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
              />
            </RouterLink>

            <div className="flex flex-col text-sm text-slate-500">
              <span>© {new Date().getFullYear()} Ganda Tech Services.</span>
              <span>Engineering Intelligence.</span>
            </div>
          </div>

          {/* Right: Socials & Back to Top */}
          <div className="flex flex-col items-center md:items-end space-y-6">
            <div className="flex gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-slate-800/5 hover:bg-slate-800 text-slate-600 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-slate-800/5 hover:bg-slate-800 text-slate-600 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@cloudgeeks.com.au"
                className="p-3 rounded-full bg-slate-800/5 hover:bg-slate-800 text-slate-600 hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <ScrollLink
              to="hero"
              smooth={true}
              duration={1000}
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
            >
              Back to Top <ArrowUp className="w-3 h-3" />
            </ScrollLink>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
