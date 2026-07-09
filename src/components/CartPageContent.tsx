"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { buildCartWhatsappLink, formatCurrency } from "@/lib/whatsapp";

export default function CartPageContent() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
        <ShoppingBag className="mx-auto mb-4 text-gray-300" size={48} />
        <p className="text-gray-500 mb-6">Seu carrinho está vazio.</p>
        <Link href="/produtos/bombas-e-motores">
          <Button size="lg">Ver produtos</Button>
        </Link>
      </div>
    );
  }

  const whatsappLink = buildCartWhatsappLink(items, totalPrice);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-5">
            <div className="w-20 h-20 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-gray-300 text-xs">Sem imagem</div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <Link
                href={`/produto/${item.slug}`}
                className="block text-sm font-medium truncate hover:underline"
                style={{ color: "var(--silva-blue-dark)" }}
              >
                {item.title}
              </Link>
              {item.cashPrice !== undefined && (
                <p className="text-sm text-gray-500 mt-1">{formatCurrency(item.cashPrice)}</p>
              )}

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 hover:bg-gray-50 transition-colors"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 hover:bg-gray-50 transition-colors"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remover item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {item.cashPrice !== undefined && (
              <p className="text-sm font-medium shrink-0" style={{ color: "var(--silva-blue-dark)" }}>
                {formatCurrency(item.cashPrice * item.quantity)}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 lg:sticky lg:top-28">
        <h2 className="text-lg" style={{ color: "var(--silva-blue-dark)" }}>
          Resumo do pedido
        </h2>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Total estimado</span>
          <span className="text-lg font-semibold" style={{ color: "var(--silva-yellow)" }}>
            {formatCurrency(totalPrice)}
          </span>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white font-medium transition-all hover:shadow-lg"
          style={{ backgroundColor: "var(--silva-yellow)" }}
        >
          <MessageCircle size={18} />
          Enviar pedido via WhatsApp
        </a>

        <Button variant="outline" className="w-full" onClick={clearCart}>
          Limpar carrinho
        </Button>
      </div>
    </div>
  );
}
