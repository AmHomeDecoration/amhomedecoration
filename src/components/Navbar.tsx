
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/0e4a3a7e-df4f-440f-8443-77e8984f4f00.png" 
              alt="Anne Marie Home Décoration" 
              className="h-12 md:h-16" 
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-design-gold transition-colors font-medium">
              Accueil
            </a>
            <a href="#about" className="text-foreground hover:text-design-gold transition-colors font-medium">
              À propos
            </a>
            <a href="/prestations" className="text-foreground hover:text-design-gold transition-colors font-medium">
              Prestations
            </a>
            <a href="#projects" className="text-foreground hover:text-design-gold transition-colors font-medium">
              Réalisations
            </a>
            <a href="#contact" className="text-foreground hover:text-design-gold transition-colors font-medium">
              Contact
            </a>
            <Button variant="outline" className="border-design-gold text-design-gold hover:bg-design-gold hover:text-white">
              Devis gratuit
            </Button>
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
        <a
          href="/"
          className="text-2xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          Accueil
        </a>
        <a
          href="#about"
          className="text-2xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          À propos
        </a>
        <a
          href="/prestations"
          className="text-2xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          Prestations
        </a>
        <a
          href="#projects"
          className="text-2xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          Réalisations
        </a>
        <a
          href="#contact"
          className="text-2xl font-medium"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </a>
        <Button className="mt-4 w-40 bg-design-gold hover:bg-design-gold/90 text-white">
          Devis gratuit
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
