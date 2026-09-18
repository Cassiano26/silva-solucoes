import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BombasMotoresPage from "@/components/BombasMotoresPage";

export const metadata: Metadata = {
  title: "Bombas e motores",
  description:
    "Bombas para recalque, poço, piscina, drenagem e pressurização, dimensionadas, instaladas e mantidas em Florianópolis e região.",
  alternates: { canonical: "/bombas-e-motores" },
};

export default function BombasEMotoresRoute() {
  return (
    <div className="min-h-screen">
      <Header />
      <BombasMotoresPage />
      <Footer />
    </div>
  );
}
