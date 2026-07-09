import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import FeaturedProductCard from "@/components/FeaturedProductCard";

interface SanityImage {
  asset: { _ref: string };
}

interface SanityFeaturedProduct {
  _id: string;
  title: string;
  slug: { current: string };
  image?: SanityImage;
  cashPrice?: number;
  installmentPrice?: number;
  maxInstallments?: number;
}

async function getFeaturedProducts(): Promise<SanityFeaturedProduct[]> {
  return client.fetch(
    `*[_type == "product" && featured == true] | order(title asc)[0...6]{
      _id, title, slug, image, cashPrice, installmentPrice, maxInstallments
    }`
  );
}

function formatCurrency(value?: number) {
  if (value === undefined || value === null) return null;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function FeaturedProducts() {
  const sanityProducts = await getFeaturedProducts();

  const products = sanityProducts.map((product) => {
    const installments = product.maxInstallments && product.maxInstallments > 1
      ? `${product.maxInstallments}x de ${formatCurrency(
          (product.installmentPrice ?? product.cashPrice ?? 0) / product.maxInstallments
        )}`
      : null;

    return {
      id: product._id,
      name: product.title,
      slug: product.slug.current,
      image: product.image ? urlFor(product.image).width(400).height(400).url() : undefined,
      cashPrice: product.cashPrice,
      price: formatCurrency(product.cashPrice),
      installments,
    };
  });

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-24 " style={{ backgroundColor: 'var(--silva-blue-dark)' }}>
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-white">
            Produtos em Destaque
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Produtos selecionados com as melhores marcas e garantia estendida
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <FeaturedProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
