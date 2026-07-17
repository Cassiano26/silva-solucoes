"use client";

import { useState } from "react";
import Link from "next/link";
import { Grid3X3, List, ShoppingCart, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export interface ProductForGrid {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  cashPrice?: number;
  installmentPrice?: number;
  maxInstallments?: number;
  available?: boolean;
  brand?: string;
  subcategoryTitle?: string;
  description?: string;
}

function formatCurrency(value?: number | null) {
  if (value === undefined || value === null) return null;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ProductCardGrid({
  product,
  onAddToCart,
}: {
  product: ProductForGrid;
  onAddToCart: () => void;
}) {
  const mainPrice = formatCurrency(product.installmentPrice ?? product.cashPrice);
  const cashPrice =
    product.cashPrice !== product.installmentPrice
      ? formatCurrency(product.cashPrice)
      : null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative overflow-hidden h-52 bg-gray-50 flex items-center justify-center p-4">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="text-gray-300 text-sm">Sem imagem</div>
          )}
          {product.available === false && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow bg-gray-700">
              Indisponível
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        {product.brand && (
          <p className="text-xs text-gray-400 mb-1">{product.brand}</p>
        )}
        <Link href={`/produto/${product.slug}`}>
          <h3
            className="text-sm font-semibold leading-snug mb-3 line-clamp-2 hover:underline"
            style={{ color: "var(--silva-blue-dark)" }}
          >
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto">
          {product.available === false ? (
            <p className="text-gray-500 text-sm">Indisponível no momento</p>
          ) : (
            <>
              {mainPrice && (
                <p
                  className="text-xl font-bold"
                  style={{ color: "var(--silva-blue-dark)" }}
                >
                  {mainPrice}
                </p>
              )}
              {cashPrice && (
                <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                  <Tag size={11} />
                  {cashPrice} à vista
                </p>
              )}
              {product.maxInstallments &&
                product.maxInstallments > 1 &&
                product.installmentPrice && (
                  <p className="text-xs text-gray-400">
                    ou {product.maxInstallments}x sem juros
                  </p>
                )}
            </>
          )}
        </div>

        <button
          onClick={onAddToCart}
          disabled={product.available === false}
          className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: "var(--silva-yellow)", color: "#0f2744" }}
        >
          <ShoppingCart size={15} />
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

function ProductCardRow({
  product,
  onAddToCart,
}: {
  product: ProductForGrid;
  onAddToCart: () => void;
}) {
  const mainPrice = formatCurrency(product.installmentPrice ?? product.cashPrice);
  const cashPrice =
    product.cashPrice !== product.installmentPrice
      ? formatCurrency(product.cashPrice)
      : null;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-200 flex gap-4 p-4 items-center">
      <Link
        href={`/produto/${product.slug}`}
        className="w-28 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center p-2"
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-gray-300 text-xs">Sem imagem</div>
        )}
      </Link>

      <div className="flex-1 min-w-0">
        {(product.brand || product.subcategoryTitle) && (
          <p className="text-xs text-gray-400">
            {[product.brand, product.subcategoryTitle].filter(Boolean).join(" • ")}
          </p>
        )}
        <Link href={`/produto/${product.slug}`}>
          <h3
            className="font-semibold text-sm leading-snug mt-0.5 hover:underline line-clamp-2"
            style={{ color: "var(--silva-blue-dark)" }}
          >
            {product.title}
          </h3>
        </Link>
        {product.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        )}
      </div>

      <div className="flex-shrink-0 text-right flex flex-col items-end gap-2 min-w-[150px]">
        {product.available === false ? (
          <p className="text-sm text-gray-500">Indisponível</p>
        ) : (
          <>
            {mainPrice && (
              <p
                className="text-xl font-bold"
                style={{ color: "var(--silva-blue-dark)" }}
              >
                {mainPrice}
              </p>
            )}
            {cashPrice && (
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Tag size={11} />
                {cashPrice} à vista
              </p>
            )}
          </>
        )}
        <button
          onClick={onAddToCart}
          disabled={product.available === false}
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: "var(--silva-yellow)", color: "#0f2744" }}
        >
          <ShoppingCart size={14} />
          Comprar
        </button>
      </div>
    </div>
  );
}

export default function ProductsGridClient({
  products,
}: {
  products: ProductForGrid[];
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { addItem } = useCart();

  function handleAddToCart(product: ProductForGrid) {
    addItem({
      id: product._id,
      slug: product.slug,
      title: product.title,
      image: product.imageUrl,
      cashPrice: product.cashPrice,
    });
    toast.success(`"${product.title}" adicionado ao carrinho!`);
  }

  return (
    <div>
      {/* View toggle */}
      <div className="flex border border-gray-200 rounded-lg overflow-hidden w-fit">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 transition-colors ${
            viewMode === "grid"
              ? "text-white"
              : "text-gray-400 hover:text-gray-600 bg-white"
          }`}
          style={
            viewMode === "grid"
              ? { backgroundColor: "var(--silva-blue-medium)" }
              : {}
          }
          aria-label="Visualização em grade"
        >
          <Grid3X3 size={16} />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 transition-colors ${
            viewMode === "list"
              ? "text-white"
              : "text-gray-400 hover:text-gray-600 bg-white"
          }`}
          style={
            viewMode === "list"
              ? { backgroundColor: "var(--silva-blue-medium)" }
              : {}
          }
          aria-label="Visualização em lista"
        >
          <List size={16} />
        </button>
      </div>

      {/* Products */}
      {viewMode === "grid" ? (
        <div className="mt-5 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((p) => (
            <ProductCardGrid
              key={p._id}
              product={p}
              onAddToCart={() => handleAddToCart(p)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {products.map((p) => (
            <ProductCardRow
              key={p._id}
              product={p}
              onAddToCart={() => handleAddToCart(p)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
