import { Phone, ArrowRight } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function FinalCTA() {
  const whatsappBudgetLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá! Gostaria de solicitar um pré-orçamento."
  )}`;
  const whatsappTalkLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá! Gostaria de tirar uma dúvida sobre os serviços da Silva."
  )}`;

  return (
    <section className="relative py-20 md:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/instalacao-placas-solares.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center text-white">
        <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6">
          Pronto para economizar energia e investir em soluções inteligentes?
        </h2>
        <p className="text-base md:text-2xl text-gray-200 mb-8 md:mb-12">
          Peça uma estimativa inicial sem compromisso e descubra quanto você pode economizar
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={whatsappBudgetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg transition-all hover:shadow-xl hover:scale-105 text-base md:text-lg"
            style={{ backgroundColor: 'var(--silva-yellow)', color: 'white' }}
          >
            <span>Peça seu pré-orçamento</span>
            <ArrowRight size={20} />
          </a>
          <a
            href={whatsappTalkLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg border-2 border-white transition-all hover:bg-white/10 text-base md:text-lg"
          >
            <Phone size={20} />
            <span>Conversar no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
