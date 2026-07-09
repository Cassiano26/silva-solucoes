import Link from "next/link";
import { Droplet, Sun, Flame, Waves, Zap, Package, type LucideIcon } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const ICON_MAP: Record<string, LucideIcon> = {
  "Hidráulica": Droplet,
  "Pressurização": Sun,
  "Aquecimento de Água": Flame,
  "Piscinas": Waves,
  "Bombas e Motores": Zap,
  "Kits Completos": Package,
};

interface SanityCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  image?: { asset: { _ref: string } };
}

async function getCategories(): Promise<SanityCategory[]> {
  return client.fetch(
    `*[_type == "category"] | order(title asc) { _id, title, slug, description, image }`
  );
}

export default async function CategoriesSection() {
  const sanityCategories = await getCategories();

  const categories = sanityCategories.map((cat) => ({
    title: cat.title,
    slug: cat.slug.current,
    icon: ICON_MAP[cat.title] ?? Package,
    image: cat.image ? urlFor(cat.image).width(600).url() : undefined,
    description: cat.description ?? "",
  }));

  return (
    <section
      className="relative py-24  overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #eef3f8 100%)' }}
      id="produtos"
    >
      {/* Decorative background elements */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--silva-blue-medium)' }}
      />
      <div
        className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--silva-yellow)' }}
      />

      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto relative sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm mb-4 tracking-wide uppercase"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', color: 'var(--silva-yellow)' }}
          >
            Nosso catálogo
          </span>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: 'var(--silva-blue-dark)' }}>
            Categorias Principais
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encontre tudo que você precisa para seus projetos hidráulicos, aquecimento e piscinas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                href={`/produtos/${category.slug}`}
                className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-transparent hover:border-[var(--silva-yellow)]/40 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div className="relative h-64 shrink-0 overflow-hidden">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, var(--silva-blue-dark), var(--silva-blue-medium))' }}
                    >
                      <Icon size={56} className="text-white/70" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <div
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                  >
                    <Icon size={24} style={{ color: 'var(--silva-blue-medium)' }} />
                  </div>
                  <h3 className="absolute bottom-4 left-6 right-6 text-2xl text-white drop-shadow-md">
                    {category.title}
                  </h3>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-gray-600 flex-1">{category.description}</p>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all"
                    style={{ color: 'var(--silva-blue-medium)' }}
                  >
                    Ver produtos
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
