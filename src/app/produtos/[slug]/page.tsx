import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProdutosPage from "@/components/ProductsPage";

export default function ProdutosRoute(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ subcategoria?: string; pagina?: string; ordenar?: string }>;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <ProdutosPage {...props} />
      <Footer />
    </div>
  );
}
