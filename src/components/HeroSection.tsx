import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  const whatsappBudgetLink = "https://wa.me/554898059628?text=ola%20tenho%20interesse%20nos%20produtos";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-28 pb-12" id="home">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Todas as soluções para hidráulica, aquecimento e piscinas em um só lugar.
          </h1>
          <p className="text-base sm:text-lg md:text-2xl mb-8 md:mb-12 text-gray-200">
            Manutenção e instalação especializada e venda de produtos para residências, empresas e condomínios.
          </p>

          <div className="mb-10 md:mb-16">
            <a
              href={whatsappBudgetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg text-sm sm:text-base transition-all hover:shadow-xl hover:scale-105"
              style={{ backgroundColor: 'var(--silva-yellow)' }}
            >
              <span>Peça já seu pré-orçamento</span>
              <ArrowRight size={18} />
            </a>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-gray-300 max-w-xl">
              Em poucos minutos pelo WhatsApp você recebe uma estimativa inicial, sem
              compromisso. O valor final é confirmado após a visita técnica.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} style={{ color: 'var(--silva-yellow)' }} />
              <div>
                <p className="text-xl md:text-2xl font-bold">+20 anos</p>
                <p className="text-sm text-gray-300">de experiência</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} style={{ color: 'var(--silva-yellow)' }} />
              <div>
                <p className="text-xl md:text-2xl font-bold">+1000</p>
                <p className="text-sm text-gray-300">projetos realizados</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={24} style={{ color: 'var(--silva-yellow)' }} />
              <div>
                <p className="text-xl md:text-2xl font-bold">Florianópolis</p>
                <p className="text-sm text-gray-300">e região</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
