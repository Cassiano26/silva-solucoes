"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Phone } from "lucide-react";
import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import LogoWordmark from "@/components/LogoWordmark";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { totalItems } = useCart();
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá! Gostaria de falar com a Silva Hidráulica & Aquecimento."
  )}`;

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      const scrolledEnough = Math.abs(currentScrollY - lastScrollY.current) > 5;

      if (scrolledEnough) {
        setHidden(scrollingDown && currentScrollY > 100);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 bg-white backdrop-blur-sm shadow-md z-50 transition-transform duration-300 ease-in-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 sm:gap-3" aria-label="Silva Aquecimento & Hidráulica">
            <LogoMark className="h-11 w-11 md:h-14 md:w-14 shrink-0" />
            <LogoWordmark className="hidden sm:block h-7 md:h-9 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/#servicos" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Serviços
            </Link>
            <Link href="/#produtos" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Produtos
            </Link>
            <Link href="/#sobre" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Sobre
            </Link>
            {/* <Link href="/#blog" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Blog
            </Link> */}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/carrinho"
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" style={{ color: 'var(--silva-blue-dark)' }} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 rounded-full text-xs text-white"
                  style={{ backgroundColor: 'var(--silva-yellow)' }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2.5 sm:px-5 sm:py-2.5 rounded-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--silva-yellow)', color: 'white' }}
              aria-label="Falar no WhatsApp"
            >
              <Phone className="w-5 h-5 shrink-0" />
              <span className="hidden sm:inline text-sm whitespace-nowrap">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
