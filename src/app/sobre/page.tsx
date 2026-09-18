import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "Sobre a Silva",
  description:
    "Mais de 20 anos instalando e mantendo sistemas de aquecimento de água, hidráulica e piscinas em Florianópolis e região.",
  alternates: { canonical: "/sobre" },
};

export default function SobreRoute() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
