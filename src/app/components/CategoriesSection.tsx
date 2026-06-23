import { Droplet, Sun, Flame, Waves, Zap, Package } from "lucide-react";

export default function CategoriesSection() {
  const categories = [
    {
      title: "Hidráulica",
      icon: Droplet,
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      description: "Tubos, conexões, registros e acessórios"
    },
    {
      title: "Pressurização",
      icon: Sun,
      image: "https://images.unsplash.com/photo-1660330589257-813305a4a383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      description: "Pressurizadores, controladores e sistemas de bombeamento"
    },
    {
      title: "Aquecimento de Água",
      icon: Flame,
      image: "https://images.unsplash.com/photo-1723407653103-7a9c6b579acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      description: "Boilers, aquecedores e acessórios"
    },
    {
      title: "Piscinas",
      icon: Waves,
      image: "https://images.unsplash.com/photo-1577877319317-b5b6ac30f3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      description: "Aquecimento, filtros e tratamento"
    },
    {
      title: "Bombas e Motores",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1700318092011-6e4666e94ab5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      description: "Bombas d'água e motobombas"
    },
    {
      title: "Kits Completos",
      icon: Package,
      image: "https://images.unsplash.com/photo-1660330589243-4c640d878052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
      description: "Soluções prontas para instalar"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50" id="produtos">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: 'var(--silva-blue-dark)' }}>
            Categorias Principais
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre tudo que você precisa para seus projetos hidráulicos, aquecimento e piscinas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isBombasMotores = category.title === "Bombas e Motores";
            const Wrapper = isBombasMotores ? "a" : "div";
            return (
              <Wrapper
                key={index}
                href={isBombasMotores ? "#/bombas-e-motores" : undefined}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Icon size={24} style={{ color: 'var(--silva-blue-medium)' }} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl mb-2" style={{ color: 'var(--silva-blue-dark)' }}>
                    {category.title}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
