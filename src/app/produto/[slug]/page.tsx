import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Tag, CreditCard } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetailActions from "@/components/ProductDetailActions";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const revalidate = 60;

interface SanityImage {
  asset: { _ref: string };
}

interface SanityProductDetail {
  _id: string;
  title: string;
  slug: { current: string };
  image?: SanityImage;
  description?: string;
  cashPrice?: number;
  installmentPrice?: number;
  maxInstallments?: number;
  available?: boolean;
  externalLink?: string;
  brand?: string;
  specs?: string[];
  category?: { title: string; slug: { current: string } };
  subcategory?: { title: string; slug: { current: string } };
}

interface SanityRelatedProduct {
  _id: string;
  title: string;
  slug: { current: string };
  image?: SanityImage;
  cashPrice?: number;
  installmentPrice?: number;
  available?: boolean;
  featured?: boolean;
}

async function getProduct(slug: string): Promise<SanityProductDetail | null> {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id, title, slug, image, description, cashPrice, installmentPrice, maxInstallments,
      available, externalLink, brand, specs,
      "category": category->{ title, slug },
      "subcategory": subcategory->{ title, slug }
    }`,
    { slug }
  );
}

async function getRelatedProducts(
  categorySlug: string,
  excludeId: string
): Promise<SanityRelatedProduct[]> {
  return client.fetch(
    `*[_type == "product" && category->slug.current == $categorySlug && _id != $excludeId]
      | order(featured desc, title asc)[0...12]{
      _id, title, slug, image, cashPrice, installmentPrice, available, featured
    }`,
    { categorySlug, excludeId }
  );
}


function formatCurrency(value?: number) {
  if (value === undefined || value === null) return null;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.category
    ? await getRelatedProducts(product.category.slug.current, product._id)
    : [];

  const cashPrice = formatCurrency(product.cashPrice);
  const installmentPrice = formatCurrency(product.installmentPrice ?? product.cashPrice);
  const imageUrl = product.image ? urlFor(product.image).width(800).height(800).url() : undefined;
  const productUrl = `/produto/${product.slug.current}`;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-gray-50 min-h-screen pt-28 pb-16 ">
        <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
          <nav className="flex items-center flex-wrap gap-1 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-700">
              Início
            </Link>
            {product.category && (
              <>
                <ChevronRight size={14} />
                <Link href={`/produtos/${product.category.slug.current}`} className="hover:text-gray-700">
                  {product.category.title}
                </Link>
              </>
            )}
            {product.subcategory && (
              <>
                <ChevronRight size={14} />
                <Link
                  href={`/produtos/${product.category?.slug.current}?subcategoria=${product.subcategory.slug.current}`}
                  className="hover:text-gray-700"
                >
                  {product.subcategory.title}
                </Link>
              </>
            )}
            <ChevronRight size={14} />
            <span className="text-gray-700">{product.title}</span>
          </nav>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
              <div className="relative h-72 md:h-96 bg-gray-50 rounded-xl flex items-center justify-center p-6">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-gray-300 text-sm">Sem imagem</div>
                )}
                {product.available === false && (
                  <Badge variant="secondary" className="absolute top-3 left-3 bg-gray-800/80 text-white">
                    Indisponível
                  </Badge>
                )}
              </div>

              <div>
                {product.brand && (
                  <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                )}
                <h1 className="text-2xl md:text-3xl mb-4" style={{ color: "var(--silva-blue-dark)" }}>
                  {product.title}
                </h1>

                {product.available !== false && (
                  <div className="mb-6">
                    {installmentPrice && (
                      <p className="text-3xl font-semibold" style={{ color: "var(--silva-yellow)" }}>
                        {installmentPrice}
                      </p>
                    )}
                    {product.maxInstallments && product.installmentPrice && (
                      <p className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                        <CreditCard size={14} />
                        em até {product.maxInstallments}x
                      </p>
                    )}
                    {cashPrice && (
                      <p className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Tag size={14} />
                        {cashPrice} à vista / PIX
                      </p>
                    )}
                  </div>
                )}

                <ProductDetailActions
                  id={product._id}
                  slug={product.slug.current}
                  title={product.title}
                  image={imageUrl}
                  cashPrice={product.cashPrice}
                  available={product.available}
                  externalLink={product.externalLink}
                  productUrl={productUrl}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 p-6 md:p-10 pt-6">
              {product.description && (
                <div className="mb-6">
                  <h2 className="text-lg mb-3" style={{ color: "var(--silva-blue-dark)" }}>
                    Descrição
                  </h2>
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {product.specs && product.specs.length > 0 && (
                <Accordion type="single" collapsible defaultValue="specs">
                  <AccordionItem value="specs">
                    <AccordionTrigger>
                      <h2 className="text-lg" style={{ color: "var(--silva-blue-dark)" }}>
                        Especificações Técnicas
                      </h2>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {product.specs.map((spec, index) => (
                          <li key={index}>{spec}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl mb-6" style={{ color: "var(--silva-blue-dark)" }}>
                Produtos relacionados
              </h2>
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="py-2">
                  {relatedProducts.map((related) => {
                    const relatedImageUrl = related.image
                      ? urlFor(related.image).width(400).height(400).url()
                      : undefined;
                    const relatedCashPrice = formatCurrency(related.cashPrice);
                    const relatedInstallmentPrice = formatCurrency(
                      related.installmentPrice ?? related.cashPrice
                    );

                    return (
                      <CarouselItem
                        key={related._id}
                        className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      >
                        <Link
                          href={`/produto/${related.slug.current}`}
                          className="group h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                        >
                          <div className="relative h-48 bg-white flex items-center justify-center p-6 border-b border-gray-50 rounded-t-2xl overflow-hidden">
                            {relatedImageUrl ? (
                              <img
                                src={relatedImageUrl}
                                alt={related.title}
                                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="text-gray-300 text-sm">Sem imagem</div>
                            )}
                            {related.featured && (
                              <Badge
                                className="absolute top-3 left-3 text-white border-none"
                                style={{ backgroundColor: "var(--silva-yellow)" }}
                              >
                                Destaque
                              </Badge>
                            )}
                            {related.available === false && (
                              <Badge variant="secondary" className="absolute top-3 right-3 bg-gray-800/80 text-white">
                                Indisponível
                              </Badge>
                            )}
                          </div>

                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-sm mb-2 flex-1" style={{ color: "var(--silva-blue-dark)" }}>
                              {related.title}
                            </h3>

                            {related.available === false ? (
                              <p className="text-gray-500 text-xs">Indisponível</p>
                            ) : (
                              <>
                                {relatedInstallmentPrice && (
                                  <p className="text-lg font-semibold" style={{ color: "var(--silva-yellow)" }}>
                                    {relatedInstallmentPrice}
                                  </p>
                                )}
                                {relatedCashPrice && (
                                  <p className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                                    <Tag size={12} />
                                    {relatedCashPrice} à vista
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        </Link>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
