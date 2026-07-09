import { Bot, Sparkles, CheckCircle2 } from "lucide-react";

export default function AIAssistantSection() {
  return (
    <section className="py-24 " style={{ backgroundColor: 'var(--silva-blue-dark)' }}>
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'var(--silva-yellow)' }}>
            <Sparkles size={20} className="text-white" />
            <span className="text-sm text-white">Novidade</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-white">
            Receba recomendações e orçamentos com Inteligência Artificial
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descreva sua necessidade e receba sugestões de produtos, kits e serviços personalizados.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--silva-yellow)' }}>
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <p className="text-white">Assistente SILVA</p>
                <p className="text-xs text-gray-400">Sempre disponível</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                  U
                </div>
                <div className="bg-white/5 rounded-lg rounded-tl-none p-4 flex-1">
                  <p className="text-white">Quero aquecer minha piscina de 8x4m.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: 'var(--silva-yellow)' }}>
                  <Bot size={16} />
                </div>
                <div className="rounded-lg rounded-tl-none p-4 flex-1" style={{ backgroundColor: 'var(--silva-blue-medium)' }}>
                  <p className="text-white mb-3">
                    Perfeito! Para uma piscina de 32m2, recomendo um sistema de aquecimento com trocador de calor.
                  </p>
                  <div className="bg-white/10 rounded-lg p-3 mb-3">
                    <p className="text-sm text-white mb-1">Kit Aquecimento de Piscina com Trocador</p>
                    <p className="text-xs text-gray-300">Trocador + bomba + acessórios de instalação</p>
                    <p className="text-lg text-white mt-2" style={{ color: 'var(--silva-yellow)' }}>R$ 4.890,00</p>
                  </div>
                  <p className="text-sm text-gray-300">Posso agendar uma visita técnica para um orçamento personalizado?</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
                  U
                </div>
                <div className="bg-white/5 rounded-lg rounded-tl-none p-4 flex-1">
                  <p className="text-white">Quero modernizar a hidráulica da minha casa.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: 'var(--silva-yellow)' }}>
                  <Bot size={16} />
                </div>
                <div className="rounded-lg rounded-tl-none p-4 flex-1" style={{ backgroundColor: 'var(--silva-blue-medium)' }}>
                  <p className="text-white">
                    Ótima escolha! Me informe quantos banheiros e pontos de consumo voce tem para eu sugerir o sistema ideal de pressurizacao.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--silva-yellow)' }}>
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-white">Recomendações Inteligentes</h3>
                <p className="text-gray-300">
                  Nossa IA analisa suas necessidades e sugere os produtos e serviços mais adequados para seu projeto.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--silva-yellow)' }}>
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-white">Orçamento Instantâneo</h3>
                <p className="text-gray-300">
                  Receba estimativas de valores em tempo real, baseadas em milhares de projetos similares realizados.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--silva-yellow)' }}>
                <CheckCircle2 size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl mb-2 text-white">Suporte 24/7</h3>
                <p className="text-gray-300">
                  Tire dúvidas, compare produtos e agende visitas técnicas a qualquer hora, direto pelo chat.
                </p>
              </div>
            </div>

            <button
              className="w-full py-4 rounded-lg transition-all hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--silva-yellow)' }}
            >
              <Bot size={20} className="text-white" />
              <span className="text-white">Conversar com o Assistente</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
