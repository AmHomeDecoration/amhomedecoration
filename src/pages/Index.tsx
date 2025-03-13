import React from 'react';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
const Index = () => {
  return <div className="flex min-h-screen flex-col">
      <TopBanner />
      <Navbar />
      <main className="public/lovable-uploads/aa795fd3-f3ad-448c-9c1b-27d46cb7f6eb.png">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>;
};
export default Index;