import Link from "next/link";
import { notFound } from "next/navigation";
import { X, Tag, ExternalLink } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductSortSelect from "@/components/ProductSortSelect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const revalidate = 60;

interface SanityImage {
  asset: { _ref: string };
}

interface SanityCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  image?: SanityImage;
}

interface SanitySubcategory {
  _id: string;
  title: string;
  slug: { current: string };
}

interface SanityProduct {
  _id: string;
  title: string;
  slug: { current: string };
  image?: SanityImage;
  cashPrice?: number;
  installmentPrice?: number;
  maxInstallments?: number;
  available?: boolean;
  externalLink?: string;
  brand?: string;
  subcategory?: { title: string; slug: { current: string } };
}

const PAGE_SIZE = 9;

async function getCategory(slug: string): Promise<SanityCategory | null> {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{ _id, title, slug, description, image }`,
    { slug }
  );
}

async function getAllCategories(): Promise<SanityCategory[]> {
  return client.fetch(`*[_type == "category"] | order(title asc){ _id, title, slug }`);
}

async function getSubcategories(categorySlug: string): Promise<SanitySubcategory[]> {
  return client.fetch(
    `*[_type == "subcategory" && category->slug.current == $slug] | order(title asc){ _id, title, slug }`,
    { slug: categorySlug }
  );
}

async function getProducts(categorySlug: string, subcategorySlug?: string): Promise<SanityProduct[]> {
  const filter = subcategorySlug
    ? `category->slug.current == $slug && subcategory->slug.current == $subSlug`
    : `category->slug.current == $slug`;
  return client.fetch(
    `*[_type == "product" && ${filter}] | order(title asc){
      _id, title, slug, image, cashPrice, installmentPrice, maxInstallments, available, externalLink, brand,
      "subcategory": subcategory->{ title, slug }
    }`,
    subcategorySlug ? { slug: categorySlug, subSlug: subcategorySlug } : { slug: categorySlug }
  );
}

function formatCurrency(value?: number) {
  if (value === undefined || value === null) return null;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function ProdutosPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ subcategoria?: string; pagina?: string; ordenar?: string }>;
}) {
  const { slug } = await params;
  const { subcategoria, pagina, ordenar } = await searchParams;

  const [category, allCategories, subcategories, rawProducts] = await Promise.all([
    getCategory(slug),
    getAllCategories(),
    getSubcategories(slug),
    getProducts(slug, subcategoria),
  ]);

  if (!category) {
    notFound();
  }

  const products = [...rawProducts];
  if (ordenar === "menor-preco") {
    products.sort((a, b) => (a.cashPrice ?? Infinity) - (b.cashPrice ?? Infinity));
  } else if (ordenar === "maior-preco") {
    products.sort((a, b) => (b.cashPrice ?? -Infinity) - (a.cashPrice ?? -Infinity));
  } else if (ordenar === "nome") {
    products.sort((a, b) => a.title.localeCompare(b.title));
  }

  const currentPage = Math.max(1, Number(pagina) || 1);
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageProducts = products.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const basePath = `/produtos/${slug}`;

  const buildPageHref = (page: number) => {
    const qs = new URLSearchParams();
    if (subcategoria) qs.set("subcategoria", subcategoria);
    if (ordenar) qs.set("ordenar", ordenar);
    if (page > 1) qs.set("pagina", String(page));
    const query = qs.toString();
    return `${basePath}${query ? `?${query}` : ""}`;
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, safePage - 3),
    Math.max(0, safePage - 3) + 5
  );

  return (
    <main className="bg-gray-50 min-h-screen pt-28 pb-10 ">
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-6 h-fit">
          <Card className="shadow-sm border-gray-100 py-0 gap-0 overflow-hidden">
            <Accordion type="single" collapsible defaultValue="subcategorias">
              <AccordionItem value="subcategorias" className="border-b-0">
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <h2 className="text-lg font-normal" style={{ color: "var(--silva-blue-dark)" }}>
                    {category.title}
                  </h2>
                </AccordionTrigger>
                {subcategories.length > 0 && (
                  <AccordionContent className="px-5">
                    <ul className="space-y-1 border-t border-gray-100 pt-3">
                      {subcategories.map((sub) => {
                        const isActive = subcategoria === sub.slug.current;
                        return (
                          <li key={sub._id}>
                            <Link
                              href={isActive ? basePath : `${basePath}?subcategoria=${sub.slug.current}`}
                              className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                                isActive
                                  ? "font-medium bg-gray-100"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                              style={isActive ? { color: "var(--silva-blue-medium)" } : undefined}
                            >
                              {sub.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                )}
              </AccordionItem>
            </Accordion>
          </Card>

          <Card className="shadow-sm border-gray-100 py-0 gap-0 divide-y divide-gray-100 overflow-hidden">
            {allCategories
              .filter((c) => c.slug.current !== slug)
              .map((c) => (
                <Link
                  key={c._id}
                  href={`/produtos/${c.slug.current}`}
                  className="block px-5 py-4 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {c.title}
                </Link>
              ))}
          </Card>
        </aside>

        {/* Content */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <ProductSortSelect basePath={basePath} />

            {totalPages > 1 && (
              <Pagination className="mx-0 w-auto justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={buildPageHref(Math.max(1, safePage - 1))}
                      className={safePage === 1 ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                  {pageNumbers.map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink href={buildPageHref(page)} isActive={page === safePage}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href={buildPageHref(Math.min(totalPages, safePage + 1))}
                      className={safePage === totalPages ? "pointer-events-none opacity-50" : undefined}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl mb-3" style={{ color: "var(--silva-blue-dark)" }}>
            {category.title}
          </h1>
          {category.description && (
            <p className="text-gray-600 max-w-3xl mb-4">{category.description}</p>
          )}

          {subcategoria && (
            <div className="mb-6">
              <Badge variant="secondary" className="gap-1.5 pl-3 pr-1.5 py-1.5 text-sm">
                {subcategories.find((s) => s.slug.current === subcategoria)?.title ?? subcategoria}
                <Link
                  href={basePath}
                  className="rounded-full p-0.5 hover:bg-gray-300/50 transition-colors"
                  aria-label="Remover filtro"
                >
                  <X size={12} />
                </Link>
              </Badge>
            </div>
          )}

          {pageProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500">
              Nenhum produto encontrado nesta categoria no momento.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {pageProducts.map((product) => {
                const cashPrice = formatCurrency(product.cashPrice);
                const installmentPrice = formatCurrency(product.installmentPrice ?? product.cashPrice);
                return (
                  <Link
                    key={product._id}
                    href={`/produto/${product.slug.current}`}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    <div className="relative h-56 bg-white flex items-center justify-center p-6 border-b border-gray-50">
                      {product.image ? (
                        <img
                          src={urlFor(product.image).width(400).height(400).url()}
                          alt={product.title}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
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

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-base mb-2 flex-1" style={{ color: "var(--silva-blue-dark)" }}>
                        {product.title}
                      </h3>

                      {product.available === false ? (
                        <p className="text-gray-500 text-sm mb-2">Indisponível no momento</p>
                      ) : (
                        <>
                          {installmentPrice && (
                            <p className="text-2xl font-semibold" style={{ color: "var(--silva-yellow)" }}>
                              {installmentPrice}
                            </p>
                          )}
                          {cashPrice && (
                            <p className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                              <Tag size={14} />
                              {cashPrice} à vista
                            </p>
                          )}
                        </>
                      )}

                      <span className="inline-flex items-center gap-1 text-sm mt-4" style={{ color: "var(--silva-blue-medium)" }}>
                        Ver produto <ExternalLink size={14} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
