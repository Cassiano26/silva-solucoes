"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--silva-blue-dark)' }} id="contato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <h3 className="text-2xl mb-1 text-white">SILVA</h3>
              <p className="text-sm" style={{ color: 'var(--silva-yellow)' }}>Hidráulica & Aquecimento</p>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Mais de 20 anos oferecendo soluções completas em hidráulica, aquecimento e piscinas para Florianópolis e região.
            </p>
            <div className="flex gap-4">
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
            </div>
          </div>

          <div>
            <h4 className="text-lg mb-6 text-white">Empresa</h4>
            <ul className="space-y-3">
              <li>
                <a href="#sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#projetos" className="text-gray-300 hover:text-white transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#carreiras" className="text-gray-300 hover:text-white transition-colors">
                  Carreiras
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-6 text-white">Produtos</h4>
            <ul className="space-y-3">
              <li>
                <a href="#produtos" className="text-gray-300 hover:text-white transition-colors">
                  Hidráulica
                </a>
              </li>
              <li>
                <a href="#produtos" className="text-gray-300 hover:text-white transition-colors">
                  Pressurização
                </a>
              </li>
              <li>
                <a href="#produtos" className="text-gray-300 hover:text-white transition-colors">
                  Aquecimento de Água
                </a>
              </li>
              <li>
                <a href="#produtos" className="text-gray-300 hover:text-white transition-colors">
                  Piscinas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-6 text-white">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <Phone size={20} className="flex-shrink-0 mt-1" style={{ color: 'var(--silva-yellow)' }} />
                <div>
                  <p>(48) 3333-4444</p>
                  <p>(48) 99999-9999</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Mail size={20} className="flex-shrink-0 mt-1" style={{ color: 'var(--silva-yellow)' }} />
                <p>contato@silvasolucoes.com.br</p>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin size={20} className="flex-shrink-0 mt-1" style={{ color: 'var(--silva-yellow)' }} />
                <p>Av. Principal, 1234<br />Florianópolis - SC</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              SILVA Hidráulica & Aquecimento © 2026. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#privacidade" className="text-gray-400 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#termos" className="text-gray-400 hover:text-white transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
