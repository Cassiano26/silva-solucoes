import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Mendes",
      role: "Residência - Jurerê",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rating: 5,
      text: "Instalaram todo o sistema hidráulico e o aquecimento de água da minha casa com muito capricho. Equipe super profissional e pontual!"
    },
    {
      name: "Marina Silva",
      role: "Pousada - Florianópolis",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      rating: 5,
      text: "O aquecimento da piscina foi um excelente investimento. Os hóspedes adoram poder usar a piscina aquecida o ano todo. Recomendo!"
    },
    {
      name: "Roberto Costa",
      role: "Condomínio - São José",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      rating: 5,
      text: "Fizeram toda a parte hidráulica do nosso condomínio. Trabalho impecável, dentro do prazo e com ótimo custo-benefício."
    },
    {
      name: "Ana Paula",
      role: "Residência - Palhoça",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
      text: "O atendimento foi excepcional desde o primeiro contato. A equipe tirou todas as minhas dúvidas e o projeto ficou perfeito!"
    }
  ];

  return (
    <section className="py-24  bg-gray-50">
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: 'var(--silva-blue-dark)' }}>
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Satisfação garantida em cada projeto realizado
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              <Quote size={48} className="absolute top-4 right-4 opacity-10" style={{ color: 'var(--silva-blue-dark)' }} />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg" style={{ color: 'var(--silva-blue-dark)' }}>
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill="var(--silva-yellow)"
                    stroke="var(--silva-yellow)"
                  />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
