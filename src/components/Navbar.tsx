
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getNavLinkUrl = (path: string) => {
    if (path.startsWith('#') && !isHomePage) {
      return `/${path}`;
    }
    return path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm shadow-md py-2 mt-0'
          : 'bg-transparent py-4 mt-7'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/0e4a3a7e-df4f-440f-8443-77e8984f4f00.png" 
              alt="Anne Marie Home Décoration" 
              className="h-12 md:h-16" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-design-gold transition-colors font-medium">
              Accueil
            </Link>
            <Link to={getNavLinkUrl('#about')} className="text-foreground hover:text-design-gold transition-colors font-medium">
              À propos
            </Link>
            <Link to="/prestations" className="text-foreground hover:text-design-gold transition-colors font-medium">
              Prestations
            </Link>
            <Link to={getNavLinkUrl('#projects')} className="text-foreground hover:text-design-gold transition-colors font-medium">
              Réalisations
            </Link>
            <Link to={getNavLinkUrl('#contact')} className="text-foreground hover:text-design-gold transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <Button
            variant="ghost"
            className="inline-flex md:hidden"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } md:hidden`}
      >
        <Link
          to="/"
          className="text-2xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          Accueil
        </Link>
        <Link
          to={getNavLinkUrl('#about')}
          className="text-2xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          À propos
        </Link>
        <Link
          to="/prestations"
          className="text-2xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          Prestations
        </Link>
        <Link
          to={getNavLinkUrl('#projects')}
          className="text-2xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          Réalisations
        </Link>
        <Link
          to={getNavLinkUrl('#contact')}
          className="text-2xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
