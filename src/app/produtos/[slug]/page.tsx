import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import ProdutosPage from "@/components/ProductsPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const category = await client.fetch<{ title: string; description?: string } | null>(
    `*[_type == "category" && slug.current == $slug][0]{ title, description }`,
    { slug }
  );

  if (!category) {
    return { title: "Categoria não encontrada", robots: { index: false, follow: true } };
  }

  const description =
    category.description?.replace(/\s+/g, " ").trim().slice(0, 160) ??
    `${category.title} na Silva Aquecimento & Hidráulica, em Florianópolis e região.`;

  return {
    title: category.title,
    description,
    alternates: { canonical: `/produtos/${slug}` },
    openGraph: { type: "website", title: category.title, description },
  };
}

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
