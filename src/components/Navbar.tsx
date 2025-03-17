
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Menu, ShieldCheck, Database } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center">
        <div className="flex items-center lg:ml-8">
          <Link to="/" className="flex items-center justify-center">
            <span className="font-serif font-bold text-3xl hidden lg:inline-block text-design-charcoal">
              AMPStudio
            </span>
            <span className="font-serif font-bold text-2xl inline-block lg:hidden text-design-charcoal">
              AMP
            </span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <ul className="hidden lg:flex items-center gap-6 text-sm font-medium">
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
                Projets
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition-colors duration-200">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/prestations" className="hover:text-primary transition-colors duration-200">
                Prestations
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
                <SheetTitle>AMPStudio</SheetTitle>
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
                    Projets
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-colors duration-200 flex items-center py-2">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/prestations" className="hover:text-primary transition-colors duration-200 flex items-center py-2">
                    Prestations
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
