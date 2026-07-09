export default function BrandsSection() {
  const brands = [
    "Amanco Wavin",
    "Krona",
    "Grundfos",
    "Schneider Electric",
    "Deca",
    "WEG",
    "Tigre",
    "Docol"
  ];

  return (
    <section className="py-16  bg-gray-50">
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4" style={{ color: 'var(--silva-blue-dark)' }}>
            Marcas Parceiras
          </h2>
          <p className="text-gray-600">
            Trabalhamos apenas com as melhores marcas do mercado
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="w-40 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <span className="text-lg text-center" style={{ color: 'var(--silva-blue-dark)' }}>
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
