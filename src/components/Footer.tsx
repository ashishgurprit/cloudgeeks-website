import { Linkedin, Github, Mail } from 'lucide-react';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="hero" smooth={true} duration={500} className="flex items-center gap-2 mb-4 cursor-pointer">
              <img
                src="/assets/gts-logo-dark.png"
                alt="CloudGeeks"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Ganda Tech Services. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              ABN: 123 456 789 | Sydney, Australia
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <Link to="hero" smooth={true} duration={500} className="hover:text-white transition-colors cursor-pointer">Home</Link>
            <Link to="expertise" smooth={true} duration={500} className="hover:text-white transition-colors cursor-pointer">Expertise</Link>
            <Link to="products" smooth={true} duration={500} className="hover:text-white transition-colors cursor-pointer">Products</Link>
            <Link to="insights" smooth={true} duration={500} className="hover:text-white transition-colors cursor-pointer">Insights</Link>
            <Link to="contact" smooth={true} duration={500} className="hover:text-white transition-colors cursor-pointer">Contact</Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:hello@cloudgeeks.com.au" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Mail className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
