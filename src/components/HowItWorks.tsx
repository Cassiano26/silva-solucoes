import { FileText, CalendarCheck, FileCheck, CheckCircle, Wrench } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: FileText, title: "Pré-orçamento", description: "Peça uma estimativa inicial em poucos minutos" },
    { icon: CalendarCheck, title: "Visita técnica", description: "Agendamos uma visita para avaliar o local" },
    { icon: FileCheck, title: "Orçamento final", description: "Ajustamos os valores ao que foi visto na visita" },
    { icon: CheckCircle, title: "Aprovação", description: "Você revisa e aprova a proposta final" },
    { icon: Wrench, title: "Instalação e manutenção", description: "Executamos o serviço e damos acompanhamento" }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl mb-4 md:mb-6" style={{ color: 'var(--silva-blue-dark)' }}>
            Como Funciona
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Do pedido de orçamento à manutenção, acompanhamos cada etapa
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: 'var(--silva-blue-medium)', opacity: 0.2 }}></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg z-10 bg-white"
                      style={{ border: `3px solid var(--silva-blue-medium)` }}
                    >
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--silva-yellow)' }}>
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white text-xs md:text-sm z-20" style={{ backgroundColor: 'var(--silva-blue-dark)' }}>
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-base mb-2" style={{ color: 'var(--silva-blue-dark)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 max-w-xs">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
