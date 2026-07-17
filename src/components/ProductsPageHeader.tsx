"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Home, Search, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Props {
  categoryTitle: string;
  subcategoryTitle?: string;
  basePath: string;
}

export default function ProductsPageHeader({
  categoryTitle,
  subcategoryTitle,
  basePath,
}: Props) {
  const { totalItems } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("busca") ?? "");

  function submitSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("busca", value.trim());
    } else {
      params.delete("busca");
    }
    params.delete("pagina");
    const q = params.toString();
    router.push(`${basePath}${q ? `?${q}` : ""}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submitSearch(search);
  }

  function clearSearch() {
    setSearch("");
    submitSearch("");
  }

  return (
    <div
      style={{ backgroundColor: "var(--silva-blue-dark)" }}
      className="sticky top-0 z-40 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        {/* Voltar */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-sm flex-shrink-0"
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Voltar</span>
        </Link>

        <span className="text-white/30 hidden sm:block select-none">|</span>

        {/* Breadcrumb */}
        <div className="hidden sm:flex items-center gap-1.5 text-sm text-white/70 flex-shrink-0 min-w-0">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1 flex-shrink-0">
            <Home size={14} />
            <span className="hidden md:inline">Início</span>
          </Link>
          <span>/</span>
          <Link
            href={basePath}
            className="text-white font-medium hover:text-white/80 transition-colors truncate"
          >
            {categoryTitle}
          </Link>
          {subcategoryTitle && (
            <>
              <span>/</span>
              <span className="text-white/90 truncate">{subcategoryTitle}</span>
            </>
          )}
        </div>

        {/* Search */}
        <div className="flex-1 max-w-lg ml-auto">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
            />
            <input
              type="search"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-9 pr-9 py-2 rounded-lg text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                aria-label="Limpar busca"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Cart */}
        <Link
          href="/carrinho"
          className="relative flex items-center text-white flex-shrink-0"
          aria-label="Carrinho de compras"
        >
          <ShoppingCart size={22} />
          {totalItems > 0 && (
            <span
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold"
              style={{ backgroundColor: "var(--silva-yellow)", color: "#0f2744" }}
            >
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}
