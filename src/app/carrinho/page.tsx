import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartPageContent from "@/components/CartPageContent";

export default function CarrinhoRoute() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-gray-50 min-h-screen pt-28 pb-16 ">
        <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl md:text-4xl mb-8" style={{ color: "var(--silva-blue-dark)" }}>
            Meu Carrinho
          </h1>
          <CartPageContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
