import { MapPin, Calendar } from "lucide-react";

export default function ProjectsGallery() {
  const projects = [
    {
      title: "Sistema de Pressurização Residencial",
      location: "Florianópolis - SC",
      date: "Janeiro 2026",
      image: "https://images.unsplash.com/photo-1660330589257-813305a4a383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      category: "Hidráulica"
    },
    {
      title: "Aquecimento de Piscina com Trocador",
      location: "Jurerê - SC",
      date: "Dezembro 2025",
      image: "https://images.unsplash.com/photo-1577877319317-b5b6ac30f3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      category: "Piscinas"
    },
    {
      title: "Instalação Hidráulica Residencial",
      location: "São José - SC",
      date: "Novembro 2025",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      category: "Hidráulica"
    },
    {
      title: "Projeto Hidráulico Comercial",
      location: "Palhoça - SC",
      date: "Outubro 2025",
      image: "https://images.unsplash.com/photo-1660330589243-4c640d878052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      category: "Hidráulica"
    }
  ];

  return (
    <section className="py-24  bg-white" id="projetos">
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: 'var(--silva-blue-dark)' }}>
            Projetos Realizados
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 1000 projetos entregues com excelência em Florianópolis e região
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 rounded-full text-white text-sm" style={{ backgroundColor: 'var(--silva-yellow)' }}>
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl mb-3">{project.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-200">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{project.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="px-8 py-4 rounded-lg transition-all hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: 'var(--silva-blue-medium)', color: 'white' }}
          >
            Ver Todos os Projetos
          </button>
        </div>
      </div>
    </section>
  );
}
