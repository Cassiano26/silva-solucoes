import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartPageContent from "@/components/CartPageContent";

export default function CarrinhoRoute() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-gray-50 min-h-screen pt-24 md:pt-28 pb-12 md:pb-16">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-2xl md:text-4xl mb-6 md:mb-8" style={{ color: "var(--silva-blue-dark)" }}>
            Meu Carrinho
          </h1>
          <CartPageContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
