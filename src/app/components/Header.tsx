import { ShoppingCart, Phone } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Silva Hidráulica & Aquecimento"
              className="h-16 w-auto object-contain"
            />
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <a href="#produtos" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Produtos
            </a>
            <a href="#servicos" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Serviços
            </a>
            <a href="#projetos" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Projetos
            </a>
            <a href="#sobre" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Sobre
            </a>
            {/* <a href="#blog" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Blog
            </a> */}
            <a href="#contato" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--silva-blue-dark)' }}>
              Contato
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart size={24} style={{ color: 'var(--silva-blue-dark)' }} />
            </button>
            <a
              href="https://wa.me/5548999999999"
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
