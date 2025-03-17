
import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Facebook, Youtube, Instagram, Twitter } from 'lucide-react';

const TopBanner = () => {
  return (
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
              <Youtube size={14} />
            </a>
            <a href="#" className="hover:text-design-gold transition-colors">
              <Instagram size={14} />
            </a>
            <a href="#" className="hover:text-design-gold transition-colors">
              <Twitter size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
