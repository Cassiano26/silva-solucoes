"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface FeaturedProductCardProps {
  id: string;
  slug: string;
  name: string;
  image?: string;
  cashPrice?: number;
  price: string | null;
  installments: string | null;
}

export default function FeaturedProductCard({
  id,
  slug,
  name,
  image,
  cashPrice,
  price,
  installments,
}: FeaturedProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    addItem({ id, slug, title: name, image, cashPrice }, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <Link href={`/produto/${slug}`} className="flex flex-col flex-1">
        <div className="relative h-56 bg-gray-100">
          {image && (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          )}
          <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
            <span className="text-xs" style={{ color: "var(--silva-blue-dark)" }}>
              Destaque
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg mb-3" style={{ color: "var(--silva-blue-dark)" }}>
            {name}
          </h3>
          <div className="mb-0 mt-auto">
            <p className="text-3xl mb-1" style={{ color: "var(--silva-blue-dark)" }}>
              {price}
            </p>
            {installments && <p className="text-sm text-gray-500">{installments}</p>}
          </div>
        </div>
      </Link>
      <div className="px-6 pb-6">
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-3 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--silva-yellow)", color: "white" }}
        >
          {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          <span>{added ? "Adicionado!" : "Adicionar ao carrinho"}</span>
        </button>
      </div>
    </div>
  );
}
