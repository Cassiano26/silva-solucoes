"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { buildProductWhatsappLink } from "@/lib/whatsapp";

interface ProductDetailActionsProps {
  id: string;
  slug: string;
  title: string;
  image?: string;
  cashPrice?: number;
  available?: boolean;
  externalLink?: string;
  productUrl: string;
}

export default function ProductDetailActions({
  id,
  slug,
  title,
  image,
  cashPrice,
  available,
  externalLink,
  productUrl,
}: ProductDetailActionsProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isAvailable = available !== false;
  const whatsappLink = buildProductWhatsappLink(title, productUrl);

  function handleAddToCart() {
    addItem({ id, slug, title, image, cashPrice }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-4">
      {isAvailable && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Quantidade:</span>
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 hover:bg-gray-50 transition-colors"
              aria-label="Diminuir quantidade"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center text-sm">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 hover:bg-gray-50 transition-colors"
              aria-label="Aumentar quantidade"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          size="lg"
          variant="outline"
          disabled={!isAvailable}
          onClick={handleAddToCart}
          className="gap-2"
        >
          <ShoppingCart size={18} />
          {added ? "Adicionado!" : "Adicionar ao carrinho"}
        </Button>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-lg text-white"
          style={{ backgroundColor: "var(--silva-yellow)" }}
        >
          <MessageCircle size={18} />
          Comprar via WhatsApp
        </a>

        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Ver na loja parceira
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      {!isAvailable && (
        <p className="text-sm text-gray-500">
          Produto indisponível no momento. Entre em contato pelo WhatsApp para verificar prazo de reposição.
        </p>
      )}
    </div>
  );
}
