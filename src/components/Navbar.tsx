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
    { name: 'Products', to: 'products' },
    { name: 'Insights', to: 'insights' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* LOGO AREA - CloudGeeks */}
          <div className="flex items-center flex-shrink-0 cursor-pointer">
            <Link to="hero" smooth={true} duration={500} className="flex items-center gap-3">
              {/* Using 'cloudgeek logo.png' - inverted to white */}
              <img
                src="/assets/cloudgeek logo.png"
                alt="CloudGeeks - AI Engineering & Cloud Consultancy Bella Vista Sydney"
                width={160}
                height={56}
                className="h-14 w-auto brightness-0 invert opacity-100 hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                spy={true}
                offset={-80}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-semibold uppercase tracking-widest hover:underline decoration-white underline-offset-8"
                activeClass="text-white"
              >
                {link.name}
              </Link>
            ))}

            {/* CTA Button - White with subtle hover */}
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="group relative px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-all cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Start Project</span>
              <div className="absolute inset-0 bg-gts-gradient opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/10 absolute w-full h-screen">
          <div className="px-4 pt-8 pb-3 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block text-2xl font-bold text-white py-4 border-b border-white/10"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
