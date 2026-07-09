"use client";

import { useEffect, useRef, useState } from "react";
import { ShoppingCart, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { totalItems } = useCart();

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
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto ">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Silva Hidráulica & Aquecimento"
              className="h-16 w-auto object-contain"
              height={64}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/#produtos" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Produtos
            </Link>
            <Link href="/#servicos" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Serviços
            </Link>
            <Link href="/#projetos" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Projetos
            </Link>
            <Link href="/sobre" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Sobre
            </Link>
            {/* <Link href="/#blog" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Blog
            </Link> */}
            <Link href="/#contato" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Contato
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/carrinho"
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Carrinho de compras"
            >
              <ShoppingCart size={24} style={{ color: 'var(--silva-blue-dark)' }} />
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
              href="https://wa.me/554898059628"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--silva-yellow)', color: 'white' }}
            >
              <Phone size={18} />
              <span className="text-sm">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
