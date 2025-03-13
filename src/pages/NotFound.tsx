
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <TopBanner />
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-design-beige">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 text-design-charcoal">404</h1>
          <p className="text-xl text-design-taupe mb-6">Oops! Page non trouvée</p>
          <a href="/" className="text-design-gold hover:text-design-gold-dark underline">
            Retour à l'accueil
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
