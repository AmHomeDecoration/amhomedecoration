
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Menu, ShieldCheck, Database, MapPin, Mail, Phone } from 'lucide-react';
import { Facebook, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top banner with contact info */}
      <div className="w-full bg-design-charcoal text-white py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-xs md:text-sm">
          <div className="flex items-center space-x-6 mb-2 md:mb-0">
            <a href="https://maps.app.goo.gl/TBsNrz9Yzm3G7NWB7" className="flex items-center hover:text-design-gold transition-colors" target="_blank" rel="noopener noreferrer">
              <MapPin size={14} className="mr-1" />
              <span>9 b, route nationale, Argelès sur mer</span>
            </a>
            <a href="mailto:contact@amhomedecoration.com" className="flex items-center hover:text-design-gold transition-colors">
              <Mail size={14} className="mr-1" />
              <span>Contact@amhomedecoration.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+33674984842" className="flex items-center hover:text-design-gold transition-colors">
              <Phone size={14} className="mr-1" />
              <span>(33) 06 74 98 48 42</span>
            </a>
            <div className="flex items-center space-x-3 ml-4">
              <a href="#" className="hover:text-design-gold transition-colors">
                <Facebook size={14} />
              </a>
              <a href="#" className="hover:text-design-gold transition-colors">
                <Instagram size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container flex h-20 items-center bg-background border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center">
          <Link to="/" className="flex items-center justify-center">
            <img 
              src="/lovable-uploads/048b101c-3e2d-44ee-80fc-412db05f1dd6.png" 
              alt="Anne Marie HOME DÉCORATION" 
              className="h-16 w-16 mr-2"
            />
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-primary transition-colors duration-200">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/a-propos" className="hover:text-primary transition-colors duration-200">
                À Propos
              </Link>
            </li>
            <li>
              <Link to="/projets" className="hover:text-primary transition-colors duration-200">
                Réalisations
              </Link>
            </li>
            <li>
              <Link to="/prestations" className="hover:text-primary transition-colors duration-200">
                Prestations
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center mr-2 lg:mr-0">
          <UserMenu />
          
          {isAuthenticated && (
            <div className="ml-4 hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/admin">Administration</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/table-admin">Gestion Tables</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          )}
          
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="mb-4">
                <SheetTitle>Anne Marie HOME DÉCORATION</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors duration-200 flex items-center py-2">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/a-propos" className="hover:text-primary transition-colors duration-200 flex items-center py-2">
                    À Propos
                  </Link>
                </li>
                <li>
                  <Link to="/projets" className="hover:text-primary transition-colors duration-200 flex items-center py-2">
                    Réalisations
                  </Link>
                </li>
                <li>
                  <Link to="/prestations" className="hover:text-primary transition-colors duration-200 flex items-center py-2">
                    Prestations
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-colors duration-200 flex items-center py-2">
                    Contact
                  </Link>
                </li>
                
                {isAuthenticated && (
                  <>
                    <Link to="/admin" className="flex items-center py-2">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Administration
                    </Link>
                    <Link to="/table-admin" className="flex items-center py-2">
                      <Database className="mr-2 h-4 w-4" />
                      Gestion Tables
                    </Link>
                    <Button variant="outline" className="w-full" onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

const UserMenu = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <div className="hidden md:flex items-center">
        <span className="text-sm font-medium mr-2">{user.email}</span>
      </div>
    );
  }

  return null;
};

export default Navbar;
