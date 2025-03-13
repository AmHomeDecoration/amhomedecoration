
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-sm shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="text-lg md:text-xl font-serif font-medium">
            <span className="text-design-charcoal">Refined</span>
            <span className="text-design-taupe">Interior</span>
            <span className="text-design-charcoal">Vision</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-design-taupe transition-colors">
              Accueil
            </a>
            <a href="#about" className="text-foreground hover:text-design-taupe transition-colors">
              À propos
            </a>
            <a href="/prestations" className="text-foreground hover:text-design-taupe transition-colors">
              Prestations
            </a>
            <a href="#projects" className="text-foreground hover:text-design-taupe transition-colors">
              Réalisations
            </a>
            <a href="#contact" className="text-foreground hover:text-design-taupe transition-colors">
              Contact
            </a>
            <Button variant="outline" className="border-design-taupe text-design-charcoal hover:bg-design-taupe hover:text-white">
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
        <Button className="mt-4 w-40">Devis gratuit</Button>
      </div>
    </nav>
  );
};

export default Navbar;
