import Link from "next/link";
import { notFound } from "next/navigation";
import { X, Search } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import ProductSortSelect from "@/components/ProductSortSelect";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductsGridClient, { type ProductForGrid } from "@/components/ProductsGridClient";
import ProductsPageHeader from "@/components/ProductsPageHeader";

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
  productCount?: number;
}

interface SanitySubcategory {
  _id: string;
  title: string;
  slug: { current: string };
  productCount?: number;
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
  description?: string;
  subcategory?: { title: string; slug: { current: string } };
}

const PRICE_RANGES = [
  { value: "ate-500", label: "Até R$ 500", min: 0, max: 500 },
  { value: "500-2000", label: "R$ 500 – R$ 2.000", min: 500, max: 2000 },
  { value: "2000-10000", label: "R$ 2.000 – R$ 10.000", min: 2000, max: 10000 },
  { value: "acima-10000", label: "Acima de R$ 10.000", min: 10000, max: Infinity },
];

const PAGE_SIZE = 9;

async function getCategory(slug: string): Promise<SanityCategory | null> {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{ _id, title, slug, description, image }`,
    { slug }
  );
}

async function getAllCategories(): Promise<SanityCategory[]> {
  return client.fetch(
    `*[_type == "category"] | order(title asc){
      _id, title, slug,
      "productCount": count(*[_type == "product" && references(^._id)])
    }`
  );
}

async function getSubcategories(categorySlug: string): Promise<SanitySubcategory[]> {
  return client.fetch(
    `*[_type == "subcategory" && category->slug.current == $slug] | order(title asc){
      _id, title, slug,
      "productCount": count(*[_type == "product" && references(^._id)])
    }`,
    { slug: categorySlug }
  );
}

async function getProducts(categorySlug: string): Promise<SanityProduct[]> {
  return client.fetch(
    `*[_type == "product" && category->slug.current == $slug] | order(title asc){
      _id, title, slug, image, cashPrice, installmentPrice, maxInstallments, available, externalLink, brand, description,
      "subcategory": subcategory->{ title, slug }
    }`,
    { slug: categorySlug }
  );
}

export default async function ProdutosPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ subcategoria?: string; pagina?: string; ordenar?: string; busca?: string; faixa?: string }>;
}) {
  const { slug } = await params;
  const { subcategoria, pagina, ordenar, busca, faixa } = await searchParams;

  const [category, allCategories, subcategories, rawProducts] = await Promise.all([
    getCategory(slug),
    getAllCategories(),
    getSubcategories(slug),
    getProducts(slug),
  ]);

  if (!category) {
    notFound();
  }

  let products = [...rawProducts];

  if (subcategoria) {
    products = products.filter((p) => p.subcategory?.slug.current === subcategoria);
  }
  if (busca?.trim()) {
    const q = busca.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q) ||
        (p.brand ?? "").toLowerCase().includes(q)
    );
  }
  const activeRange = PRICE_RANGES.find((r) => r.value === faixa);
  if (activeRange) {
    products = products.filter((p) => {
      const price = p.cashPrice ?? p.installmentPrice ?? 0;
      return price >= activeRange.min && price <= activeRange.max;
    });
  }

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

  function buildPageHref(page: number) {
    const qs = new URLSearchParams();
    if (subcategoria) qs.set("subcategoria", subcategoria);
    if (faixa) qs.set("faixa", faixa);
    if (busca) qs.set("busca", busca);
    if (ordenar) qs.set("ordenar", ordenar);
    if (page > 1) qs.set("pagina", String(page));
    const q = qs.toString();
    return `${basePath}${q ? `?${q}` : ""}`;
  }

  function subHref(subSlug: string | null) {
    const qs = new URLSearchParams();
    if (subSlug) qs.set("subcategoria", subSlug);
    if (faixa) qs.set("faixa", faixa);
    if (busca) qs.set("busca", busca);
    if (ordenar) qs.set("ordenar", ordenar);
    const q = qs.toString();
    return `${basePath}${q ? `?${q}` : ""}`;
  }

  function priceHref(priceVal: string | null) {
    const qs = new URLSearchParams();
    if (subcategoria) qs.set("subcategoria", subcategoria);
    if (priceVal) qs.set("faixa", priceVal);
    if (busca) qs.set("busca", busca);
    if (ordenar) qs.set("ordenar", ordenar);
    const q = qs.toString();
    return `${basePath}${q ? `?${q}` : ""}`;
  }

  function clearBuscaHref() {
    const qs = new URLSearchParams();
    if (subcategoria) qs.set("subcategoria", subcategoria);
    if (faixa) qs.set("faixa", faixa);
    if (ordenar) qs.set("ordenar", ordenar);
    const q = qs.toString();
    return `${basePath}${q ? `?${q}` : ""}`;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, safePage - 3),
    Math.max(0, safePage - 3) + 5
  );

  const activeSubcategory = subcategories.find((s) => s.slug.current === subcategoria);
  const hasActiveFilters = !!subcategoria || !!faixa || !!busca;

  const gridProducts: ProductForGrid[] = pageProducts.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug.current,
    imageUrl: p.image ? urlFor(p.image).width(400).height(400).url() : undefined,
    cashPrice: p.cashPrice,
    installmentPrice: p.installmentPrice,
    maxInstallments: p.maxInstallments,
    available: p.available,
    brand: p.brand,
    subcategoryTitle: p.subcategory?.title,
    description: p.description,
  }));

  return (
    <>
      <ProductsPageHeader
        categoryTitle={category.title}
        subcategoryTitle={activeSubcategory?.title}
        basePath={basePath}
      />

      <main className="min-h-screen pb-12" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">

            {/* ── Sidebar ── */}
            <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 space-y-6 h-fit">

              {/* Categorias */}
              <div>
                <h3
                  className="font-semibold mb-3 text-sm uppercase tracking-wider"
                  style={{ color: "var(--silva-blue-dark)" }}
                >
                  Categorias
                </h3>
                <div className="space-y-1">
                  {allCategories.map((cat) => {
                    const isActive = cat.slug.current === slug;
                    return (
                      <Link
                        key={cat._id}
                        href={`/produtos/${cat.slug.current}`}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                          isActive ? "text-white font-medium" : "text-gray-600 hover:bg-gray-100"
                        }`}
                        style={isActive ? { backgroundColor: "var(--silva-blue-medium)" } : {}}
                      >
                        <span className="flex-1">{cat.title}</span>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                            isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {cat.productCount ?? 0}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Subcategorias */}
              {subcategories.length > 0 && (
                <div>
                  <h3
                    className="font-semibold mb-3 text-sm uppercase tracking-wider"
                    style={{ color: "var(--silva-blue-dark)" }}
                  >
                    Subcategorias
                  </h3>
                  <div className="space-y-1">
                    <Link
                      href={subHref(null)}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        !subcategoria ? "font-medium" : "text-gray-600 hover:bg-gray-100"
                      }`}
                      style={!subcategoria ? { color: "var(--silva-blue-medium)" } : {}}
                    >
                      Todas
                    </Link>
                    {subcategories.map((sub) => {
                      const isSubActive = subcategoria === sub.slug.current;
                      return (
                        <Link
                          key={sub._id}
                          href={subHref(isSubActive ? null : sub.slug.current)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isSubActive ? "font-medium" : "text-gray-600 hover:bg-gray-100"
                          }`}
                          style={isSubActive ? { color: "var(--silva-blue-medium)" } : {}}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              isSubActive ? "bg-current" : "bg-gray-300"
                            }`}
                          />
                          {sub.title}
                          <span className="ml-auto text-xs text-gray-400">({sub.productCount ?? 0})</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Faixa de Preço */}
              <div>
                <h3
                  className="font-semibold mb-3 text-sm uppercase tracking-wider"
                  style={{ color: "var(--silva-blue-dark)" }}
                >
                  Faixa de Preço
                </h3>
                <div className="space-y-1">
                  {PRICE_RANGES.map((range) => {
                    const isActive = faixa === range.value;
                    return (
                      <Link
                        key={range.value}
                        href={priceHref(isActive ? null : range.value)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive ? "font-semibold" : "text-gray-600 hover:bg-gray-100"
                        }`}
                        style={isActive ? { color: "var(--silva-blue-medium)" } : {}}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            isActive ? "border-current" : "border-gray-300"
                          }`}
                        >
                          {isActive && <span className="w-2 h-2 rounded-full bg-current" />}
                        </span>
                        {range.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Limpar todos os filtros */}
              {hasActiveFilters && (
                <Link
                  href={basePath}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 text-sm font-semibold transition-all hover:bg-gray-50"
                  style={{ borderColor: "var(--silva-blue-medium)", color: "var(--silva-blue-medium)" }}
                >
                  <X size={14} />
                  Limpar todos os filtros
                </Link>
              )}
            </aside>

            {/* ── Main Content ── */}
            <div className="flex-1 min-w-0">
              {/* Title + Controls */}
              <div className="flex flex-wrap items-start gap-4 mb-5">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold" style={{ color: "var(--silva-blue-dark)" }}>
                    {category.title}
                    {activeSubcategory && (
                      <span className="text-lg font-normal text-gray-500">
                        {" "}/ {activeSubcategory.title}
                      </span>
                    )}
                  </h1>
                  {category.description && (
                    <p className="text-gray-500 text-sm mt-1 max-w-2xl">{category.description}</p>
                  )}
                  <p className="text-sm text-gray-400 mt-1">
                    {products.length} produto{products.length !== 1 ? "s" : ""} encontrado{products.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <ProductSortSelect basePath={basePath} />
              </div>

              {/* Active filter chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {busca && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-700">
                      <Search size={11} />
                      &quot;{busca}&quot;
                      <Link
                        href={clearBuscaHref()}
                        className="rounded-full hover:opacity-70 transition-opacity"
                        aria-label="Remover busca"
                      >
                        <X size={12} />
                      </Link>
                    </span>
                  )}
                  {subcategoria && (
                    <span
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-white"
                      style={{ backgroundColor: "var(--silva-blue-medium)" }}
                    >
                      {activeSubcategory?.title ?? subcategoria}
                      <Link
                        href={subHref(null)}
                        className="rounded-full p-0.5 hover:bg-white/20 transition-colors"
                        aria-label="Remover filtro de subcategoria"
                      >
                        <X size={12} />
                      </Link>
                    </span>
                  )}
                  {faixa && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-700">
                      {PRICE_RANGES.find((r) => r.value === faixa)?.label}
                      <Link
                        href={priceHref(null)}
                        className="rounded-full hover:opacity-70 transition-opacity"
                        aria-label="Remover faixa de preço"
                      >
                        <X size={12} />
                      </Link>
                    </span>
                  )}
                </div>
              )}

              {/* Products */}
              {pageProducts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Search size={28} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--silva-blue-dark)" }}>
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                    Tente ajustar os filtros ou buscar com outras palavras.
                  </p>
                  {hasActiveFilters && (
                    <Link
                      href={basePath}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold"
                      style={{ backgroundColor: "var(--silva-blue-medium)" }}
                    >
                      <X size={14} />
                      Limpar filtros
                    </Link>
                  )}
                </div>
              ) : (
                <ProductsGridClient products={gridProducts} />
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10">
                  <Pagination>
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
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
