import { FileText, Bot, CalendarCheck, FileCheck, CheckCircle, Wrench, Headphones } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: FileText, title: "Solicite um orçamento", description: "Preencha o formulário ou fale com nosso time" },
    { icon: Bot, title: "Receba recomendações da IA", description: "Nossa IA sugere os melhores produtos e serviços" },
    { icon: CalendarCheck, title: "Agende visita técnica", description: "Profissionais qualificados visitam sua residência" },
    { icon: FileCheck, title: "Receba o projeto", description: "Projeto detalhado com cronograma e valores" },
    { icon: CheckCircle, title: "Aprovação", description: "Revise e aprove o projeto personalizado" },
    { icon: Wrench, title: "Instalação", description: "Equipe especializada realiza a instalação" },
    { icon: Headphones, title: "Suporte pós-venda", description: "Acompanhamento e manutenção contínua" }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: 'var(--silva-blue-dark)' }}>
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Do primeiro contato até o suporte contínuo, estamos com você em cada etapa
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent" style={{ color: 'var(--silva-blue-medium)', opacity: 0.2 }}></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg z-10 bg-white"
                    style={{ border: `3px solid var(--silva-blue-medium)` }}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--silva-yellow)' }}>
                      <Icon size={28} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm z-20" style={{ backgroundColor: 'var(--silva-blue-dark)' }}>
                    {index + 1}
                  </div>
                  <h3 className="text-base mb-2" style={{ color: 'var(--silva-blue-dark)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
