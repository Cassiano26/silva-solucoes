"use client";

import { Phone, MapPin } from "lucide-react";
// import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import LogoWordmark from "@/components/LogoWordmark";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function Footer() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer style={{ backgroundColor: 'var(--silva-blue-dark)' }} id="contato">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 mb-12">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <LogoMark className="h-12 w-12 shrink-0" />
              <LogoWordmark variant="light" className="h-8 w-auto" />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Mais de 20 anos oferecendo soluções completas em hidráulica, aquecimento e piscinas para Florianópolis e região.
            </p>
            {/* <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Linkedin size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Youtube size={20} className="text-white" />
              </a>
            </div> */}
          </div>

          <div>
            <h4 className="text-lg mb-6 text-white">Contato</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <Phone size={20} className="flex-shrink-0 mt-1" style={{ color: 'var(--silva-yellow)' }} />
                  <p>(48) 98805-9628</p>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin size={20} className="flex-shrink-0 mt-1" style={{ color: 'var(--silva-yellow)' }} />
                <p>Travessa Manuel Antônio Vitorino, 58<br />Ponta das Canas - Florianópolis/SC<br />CEP 88056-005</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col gap-2">
            <p className="text-gray-400 text-sm">
              Cakai Tecnologia © 2026. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
