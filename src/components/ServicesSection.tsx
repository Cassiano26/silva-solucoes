import { Wrench, Sun, Flame, Waves, Home, Building2 } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function ServicesSection() {
  const whatsappVisitLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá! Gostaria de solicitar uma visita técnica."
  )}`;

  const services = [
    {
      icon: Wrench,
      title: "Instalação Hidráulica",
      description: "Instalação completa de sistemas hidráulicos residenciais e comerciais com garantia de qualidade."
    },
    {
      icon: Sun,
      title: "Bombas e Pressurização",
      description: "Dimensionamento e instalação de bombas, pressurizadores e sistemas para maior conforto no uso diário."
    },
    {
      icon: Flame,
      title: "Aquecimento de Água",
      description: "Instalação e manutenção de aquecedores, boilers e placas de aquecimento solar para residências, comércios e condomínios."
    },
    {
      icon: Waves,
      title: "Aquecimento de Piscinas",
      description: "Soluções eficientes para manter a piscina na temperatura ideal por mais tempo."
    },
    {
      icon: Home,
      title: "Serviços Residenciais",
      description: "Instalação e manutenção para sua casa com acompanhamento técnico completo."
    },
    {
      icon: Building2,
      title: "Serviços Comerciais",
      description: "Soluções em grande escala para condomínios, empresas e indústrias."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white" id="servicos">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl mb-4 md:mb-6" style={{ color: 'var(--silva-blue-dark)' }}>
            Serviços
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Equipe técnica qualificada para instalação e manutenção
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-gray-50 rounded-2xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-current"
                style={{ '--tw-border-opacity': '0.1' } as React.CSSProperties}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: 'var(--silva-yellow)' }}
                >
                  <Icon size={32} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl mb-3" style={{ color: 'var(--silva-blue-dark)' }}>
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href={whatsappVisitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base rounded-lg transition-all hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: 'var(--silva-blue-medium)', color: 'white' }}
          >
            Solicitar Visita Técnica
          </a>
        </div>
      </div>
    </section>
  );
}
