
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
    // If it's a section link (starts with #)
    if (path.startsWith('#')) {
      // If we're already on the homepage, just return the anchor
      if (location.pathname === '/') {
        return path;
      }
      // Otherwise, navigate to homepage + the anchor
      return `/${path}`;
    }
    // For regular pages, return the path as is
    return path;
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
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
          <Link to="/" className="flex items-center" onClick={scrollToTop}>
            <img 
              src="/lovable-uploads/0e4a3a7e-df4f-440f-8443-77e8984f4f00.png" 
              alt="Anne Marie Home Décoration" 
              className="h-12 md:h-16" 
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground hover:text-design-gold transition-colors font-medium"
              onClick={scrollToTop}
            >
              Accueil
            </Link>
            <Link 
              to={getNavLinkUrl('#about')} 
              className="text-foreground hover:text-design-gold transition-colors font-medium"
              onClick={(e) => {
                if (location.pathname !== '/') {
                  // Don't prevent default - let it navigate to homepage first
                } else {
                  // We're already on homepage, scroll to the section
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }
                closeMenu();
              }}
            >
              À propos
            </Link>
            <Link 
              to="/prestations" 
              className="text-foreground hover:text-design-gold transition-colors font-medium"
            >
              Prestations
            </Link>
            <Link 
              to={getNavLinkUrl('#projects')} 
              className="text-foreground hover:text-design-gold transition-colors font-medium"
              onClick={(e) => {
                if (location.pathname !== '/') {
                  // Don't prevent default - let it navigate to homepage first
                } else {
                  // We're already on homepage, scroll to the section
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }
                closeMenu();
              }}
            >
              Réalisations
            </Link>
            <Link 
              to={getNavLinkUrl('#contact')} 
              className="text-foreground hover:text-design-gold transition-colors font-medium"
              onClick={(e) => {
                if (location.pathname !== '/') {
                  // Don't prevent default - let it navigate to homepage first
                } else {
                  // We're already on homepage, scroll to the section
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }
                closeMenu();
              }}
            >
              Contact
            </Link>
          </div>

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

      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } md:hidden`}
      >
        <Link
          to="/"
          className="text-2xl font-medium"
          onClick={scrollToTop}
        >
          Accueil
        </Link>
        <Link
          to={getNavLinkUrl('#about')}
          className="text-2xl font-medium"
          onClick={(e) => {
            if (location.pathname !== '/') {
              // Don't prevent default - let it navigate to homepage first
            } else {
              // We're already on homepage, scroll to the section
              e.preventDefault();
              document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            }
            closeMenu();
          }}
        >
          À propos
        </Link>
        <Link
          to="/prestations"
          className="text-2xl font-medium"
          onClick={closeMenu}
        >
          Prestations
        </Link>
        <Link
          to={getNavLinkUrl('#projects')}
          className="text-2xl font-medium"
          onClick={(e) => {
            if (location.pathname !== '/') {
              // Don't prevent default - let it navigate to homepage first
            } else {
              // We're already on homepage, scroll to the section
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }
            closeMenu();
          }}
        >
          Réalisations
        </Link>
        <Link
          to={getNavLinkUrl('#contact')}
          className="text-2xl font-medium"
          onClick={(e) => {
            if (location.pathname !== '/') {
              // Don't prevent default - let it navigate to homepage first
            } else {
              // We're already on homepage, scroll to the section
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }
            closeMenu();
          }}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
