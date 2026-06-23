import { Phone, ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const whatsappBudgetLink = "https://wa.me/554898059628?text=ola%20tenho%20interesse%20nos%20produtos";

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1660330589257-813305a4a383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6">
          Pronto para economizar energia e investir em soluções inteligentes?
        </h2>
        <p className="text-xl md:text-2xl text-gray-200 mb-12">
          Solicite um orçamento gratuito e descubra quanto você pode economizar
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={whatsappBudgetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-lg transition-all hover:shadow-xl hover:scale-105 text-lg"
            style={{ backgroundColor: 'var(--silva-yellow)', color: 'white' }}
          >
            <span>Solicitar Orçamento</span>
            <ArrowRight size={20} />
          </a>
          <a
            href="https://wa.me/5548999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-white transition-all hover:bg-white/10 text-lg"
          >
            <Phone size={20} />
            <span>Conversar no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
