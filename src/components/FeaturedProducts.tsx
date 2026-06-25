import { Star, ShoppingCart } from "lucide-react";

export default function FeaturedProducts() {
  const products = [
    {
      name: "Tubo PPR 25mm (Barra 3m)",
      image: "https://images.unsplash.com/photo-1660330589257-813305a4a383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      rating: 5,
      reviews: 127,
      price: "R$ 79,90",
      installments: "3x de R$ 26,63"
    },
    {
      name: "Pressurizador Residencial 1/2 CV",
      image: "https://images.unsplash.com/photo-1726221062287-fda475b85493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      rating: 5,
      reviews: 89,
      price: "R$ 1.490,00",
      installments: "12x de R$ 124,17"
    },
    {
      name: "Boiler Inox 400L",
      image: "https://images.unsplash.com/photo-1723407653103-7a9c6b579acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      rating: 5,
      reviews: 156,
      price: "R$ 3.890,00",
      installments: "12x de R$ 324,17"
    },
    {
      name: "Bomba D'Água 1/2 CV",
      image: "https://images.unsplash.com/photo-1700318092011-6e4666e94ab5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      rating: 4,
      reviews: 234,
      price: "R$ 590,00",
      installments: "12x de R$ 49,17"
    },
    {
      name: "Filtro para Piscina",
      image: "https://images.unsplash.com/photo-1577877319317-b5b6ac30f3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      rating: 5,
      reviews: 98,
      price: "R$ 1.290,00",
      installments: "12x de R$ 107,50"
    },
    {
      name: "Kit Hidráulico Residencial",
      image: "https://images.unsplash.com/photo-1660330589243-4c640d878052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      rating: 5,
      reviews: 203,
      price: "R$ 2.190,00",
      installments: "12x de R$ 182,50"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--silva-blue-dark)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-white">
            Produtos em Destaque
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Produtos selecionados com as melhores marcas e garantia estendida
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="relative h-56 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
                  <span className="text-xs" style={{ color: 'var(--silva-blue-dark)' }}>Destaque</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg mb-3" style={{ color: 'var(--silva-blue-dark)' }}>
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < product.rating ? 'var(--silva-yellow)' : 'none'}
                        stroke={i < product.rating ? 'var(--silva-yellow)' : '#d1d5db'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <div className="mb-4">
                  <p className="text-3xl mb-1" style={{ color: 'var(--silva-blue-dark)' }}>
                    {product.price}
                  </p>
                  <p className="text-sm text-gray-500">{product.installments}</p>
                </div>
                <button
                  className="w-full py-3 rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
                  style={{ backgroundColor: 'var(--silva-yellow)', color: 'white' }}
                >
                  <ShoppingCart size={18} />
                  <span>Comprar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
