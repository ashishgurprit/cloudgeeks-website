import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'Expertise', to: 'expertise' },
    { name: 'Our Products', to: 'products' },
    { name: 'Insights', to: 'insights' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-charcoal/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo Area */}
          <div className="flex items-center flex-shrink-0 cursor-pointer">
            <Link to="hero" smooth={true} duration={500} className="flex items-center gap-2">
              <img
                src="/assets/gts-logo-dark.png"
                alt="CloudGeeks"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                spy={true}
                offset={-80}
                className="text-gray-300 hover:text-tech-cyan transition-colors cursor-pointer text-sm font-medium uppercase tracking-wider"
                activeClass="text-tech-cyan"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="bg-accent-gradient text-white px-6 py-2 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-electric-violet/25"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-charcoal/95 backdrop-blur-md border-t border-gray-800 absolute w-full">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="contact"
              smooth={true}
              duration={500}
              onClick={() => setIsOpen(false)}
              className="block mt-4 bg-accent-gradient text-white px-4 py-3 rounded-full font-semibold text-center cursor-pointer"
            >
              Start Project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
