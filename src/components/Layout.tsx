
import React from 'react';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

const Layout = ({ children, noPadding = false }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="flex min-h-screen flex-col bg-design-beige">
      <TopBanner />
      <Navbar />
      <main className={`flex-1 ${!noPadding && !isHomePage ? 'pt-24 md:pt-32' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
