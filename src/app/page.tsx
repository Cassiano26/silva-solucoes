import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import HowItWorks from "@/components/HowItWorks";
import ProjectsGallery from "@/components/ProjectsGallery";
import BrandsSection from "@/components/BrandsSection";
import ServiceArea from "@/components/ServiceArea";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
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
