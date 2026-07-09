import { MapPin, CheckCircle } from "lucide-react";

export default function ServiceArea() {
  const cities = [
    "Florianópolis",
    "São José",
    "Palhoça",
    "Biguaçu",
    "Santo Amaro da Imperatriz",
    "Governador Celso Ramos"
  ];

  return (
    <section className="py-24 " style={{ backgroundColor: 'var(--silva-blue-dark)' }}>
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={32} style={{ color: 'var(--silva-yellow)' }} />
              <h2 className="text-4xl md:text-5xl text-white">
                Área de Atuação
              </h2>
            </div>
            <p className="text-xl text-gray-300 mb-8">
              Atendemos toda a Grande Florianópolis com equipe especializada e atendimento rápido.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cities.map((city, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <CheckCircle size={20} style={{ color: 'var(--silva-yellow)' }} />
                  <span className="text-lg">{city}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="aspect-square bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin size={64} className="mx-auto mb-4" style={{ color: 'var(--silva-yellow)' }} />
                <p className="text-white text-2xl mb-2">Grande Florianópolis</p>
                <p className="text-gray-300">Cobertura completa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
