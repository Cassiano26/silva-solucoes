"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Zap } from "lucide-react";

type Product = {
  name: string;
  price: string;
  cashPrice: string;
  description: string;
  link: string;
  image?: string;
};

const products: Product[] = [
  {
    name: "Bomba Circuladora Ecologic ECO350BR 220V",
    price: "R$ 864,98",
    cashPrice: "R$ 821,73 a vista/pix",
    description:
      "Ideal para circulacao continua de agua quente em aquecimento solar, boiler e calefacao. Carcaca em bronze, ate 100C, 3 velocidades e operacao silenciosa.",
    link: "https://www.hotech.com.br/bomba-circuladora-ecologic-eco350br-220v",
    image:
      "https://m.magazineluiza.com.br/a-static/420x420/bomba-circuladora-ecologic-eco350br-220v/hotech/0000044546007/ba9449e6fc24325afeea9765cc28e4de.jpeg",
  },
  {
    name: "Bomba Circuladora Ecologic ECO550BR 220V",
    price: "R$ 1.734,00",
    cashPrice: "R$ 1.647,30 a vista/pix",
    description:
      "Modelo de alta vazao para sistemas residenciais, comerciais e industriais. Carcaca em bronze, ate 100C, 3 velocidades e compatibilidade com automacao.",
    link: "https://www.hotech.com.br/bomba-circuladora-ecologic-eco550br-220v",
  },
  {
    name: "Bomba Circuladora Ecologic ECO100BR 220V",
    price: "R$ 477,00",
    cashPrice: "R$ 453,15 a vista/pix",
    description:
      "Recomendada para aquecimento solar e recirculacao de agua quente. Carcaca em bronze, 3 velocidades, conexoes 1 polegada e baixo ruido.",
    link: "https://www.hotech.com.br/bomba-circuladora-ecologic-eco100br-220v",
  },
  {
    name: "Bomba Circuladora Hioda HBS 100 Bronze 220V",
    price: "R$ 440,10",
    cashPrice: "R$ 418,10 a vista/pix",
    description:
      "Aplicacao em aquecimento solar, calefacao e recirculacao de sistemas fechados. Corpo em bronze, potencia ajustavel e vazao maxima de 50 l/min.",
    link: "https://www.hotech.com.br/bomba-hioda-circuladora-bronze-hbs100-220v",
  },
  {
    name: "Bomba de Circulacao Rheem 93W p/ Agua Quente Boiler 220V",
    price: "R$ 551,20",
    cashPrice: "R$ 523,64 a vista/pix",
    description:
      "Bomba compacta com 3 velocidades e corpo em latao, indicada para recirculacao de agua e aquecimento solar. Suporta ate 110C.",
    link: "https://www.hotech.com.br/bomba-de-circulacao-rheem-93w-p-agua-quente-boiler-220v",
  },
  {
    name: "Bomba Circuladora Texius TBHWD-BR 100W 220V",
    price: "Indisponivel",
    cashPrice: "Sem preco ativo no momento",
    description:
      "Indicada para circulacao de agua quente, aquecimento solar, calefacao e piso aquecido. Corpo em bronze, operacao silenciosa e protetor termico.",
    link: "https://www.hotech.com.br/produto/bomba-circuladora-texius-tbhwd-br-100w-220v.html",
  },
];

export default function BombasMotoresPage() {
  return (
    <main>
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e2438] via-[#1d4f73] to-[#2b7099]" />
        <div className="relative max-w-7xl mx-auto text-white">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-4 py-2 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Voltar para inicio</span>
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="uppercase tracking-[0.2em] text-sm text-white/80 mb-4">Catalogo</p>
            <h1 className="text-4xl md:text-6xl leading-tight mb-6">Bombas e Motores</h1>
            <p className="text-lg md:text-xl text-white/85">
              Selecionamos os principais modelos de bombas circuladoras para voce comparar preco, disponibilidade
              e aplicacao com rapidez.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.name}
                className="group rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#f6c62f]/20">
                      <Zap size={22} style={{ color: "var(--silva-blue-medium)" }} />
                    </div>
                    <span className="text-xs uppercase tracking-[0.18em] text-gray-500">Bombas Circuladoras</span>
                  </div>

                  <h2 className="text-2xl mb-3" style={{ color: "var(--silva-blue-dark)" }}>
                    {product.name}
                  </h2>

                  {product.image && (
                    <div className="mb-5 overflow-hidden rounded-xl border border-gray-100 bg-white">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-52 object-contain bg-white p-3"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <p className="text-gray-600 mb-5">{product.description}</p>

                  <div className="rounded-xl bg-gray-50 p-4 mb-5">
                    <p className="text-sm text-gray-500 mb-1">Preco principal</p>
                    <p className="text-2xl font-semibold" style={{ color: "var(--silva-blue-dark)" }}>
                      {product.price}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{product.cashPrice}</p>
                  </div>

                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg transition-colors"
                    style={{ backgroundColor: "var(--silva-yellow)", color: "white" }}
                  >
                    <span>Ver produto no fornecedor</span>
                    <ExternalLink size={18} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
