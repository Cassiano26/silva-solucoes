import Image from "next/image";
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
    <section className="py-16 md:py-24" style={{ backgroundColor: 'var(--silva-blue-dark)' }}>
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={32} style={{ color: 'var(--silva-yellow)' }} />
              <h2 className="text-3xl md:text-5xl text-white">
                Área de Atuação
              </h2>
            </div>
            <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8">
              Atendemos toda a Grande Florianópolis com equipe especializada e atendimento rápido.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {cities.map((city, index) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <CheckCircle size={20} style={{ color: 'var(--silva-yellow)' }} />
                  <span className="text-base md:text-lg">{city}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/20">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src="/mapa-grande-florianopolis.jpg"
                alt="Mapa da Grande Florianópolis com a área de atuação da Silva Hidráulica & Aquecimento"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom right, rgba(69, 52, 20, 0.55), rgba(41, 31, 12, 0.7))' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 drop-shadow-lg" style={{ color: 'var(--silva-yellow)' }} />
                  <p className="text-white text-xl md:text-2xl mb-2 drop-shadow-md">Grande Florianópolis</p>
                  <p className="text-sm md:text-base text-gray-200 drop-shadow-md">Cobertura completa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
