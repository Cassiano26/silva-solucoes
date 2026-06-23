import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  const whatsappBudgetLink = "https://wa.me/554898059628?text=ola%20tenho%20interesse%20nos%20produtos";

  return (
    <section className="relative h-screen flex items-center justify-center" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Todas as soluções para hidráulica, aquecimento e piscinas em um só lugar.
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-200">
            Venda de produtos, manutenção e instalação especializada para residências, empresas e condomínios.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href={whatsappBudgetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-lg transition-all hover:shadow-xl hover:scale-105"
              style={{ backgroundColor: 'var(--silva-yellow)' }}
            >
              <span>Solicitar Orçamento</span>
              <ArrowRight size={20} />
            </a>
            <button
              className="flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white transition-all hover:bg-white/10"
            >
              <span>Ver Produtos</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} style={{ color: 'var(--silva-yellow)' }} />
              <div>
                <p className="text-2xl font-bold">+20 anos</p>
                <p className="text-sm text-gray-300">de experiência</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} style={{ color: 'var(--silva-yellow)' }} />
              <div>
                <p className="text-2xl font-bold">+1000</p>
                <p className="text-sm text-gray-300">projetos realizados</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} style={{ color: 'var(--silva-yellow)' }} />
              <div>
                <p className="text-2xl font-bold">Florianópolis</p>
                <p className="text-sm text-gray-300">e região</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
