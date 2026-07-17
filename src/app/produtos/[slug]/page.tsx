import Footer from "@/components/Footer";
import ProdutosPage from "@/components/ProductsPage";

export default function ProdutosRoute(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ subcategoria?: string; pagina?: string; ordenar?: string; busca?: string; faixa?: string }>;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ProdutosPage {...props} />
      <Footer />
    </div>
  );
}
