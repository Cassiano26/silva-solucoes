import { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AIAssistantSection from "./components/AIAssistantSection";
import CategoriesSection from "./components/CategoriesSection";
import ServicesSection from "./components/ServicesSection";
import FeaturedProducts from "./components/FeaturedProducts";
import HowItWorks from "./components/HowItWorks";
import ProjectsGallery from "./components/ProjectsGallery";
import BrandsSection from "./components/BrandsSection";
import ServiceArea from "./components/ServiceArea";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import BombasMotoresPage from "./components/BombasMotoresPage";

function getRouteFromHash() {
  const hash = window.location.hash.replace("#", "");
  return hash || "/";
}

export default function App() {
  const [route, setRoute] = useState(getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route === "/bombas-e-motores") {
    return (
      <div className="min-h-screen">
        <Header />
        <BombasMotoresPage />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      {/* <AIAssistantSection /> */}
      <CategoriesSection />
      <ServicesSection />
      <FeaturedProducts />
      <HowItWorks />
      <ProjectsGallery />
      <BrandsSection />
      <ServiceArea />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}