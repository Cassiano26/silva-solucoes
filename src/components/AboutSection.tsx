import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Award, HandHeart, ShieldCheck, Sparkles } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import AboutImagesCarousel from "@/components/AboutImagesCarousel";

interface SanityImageValue {
  _key?: string;
  asset?: { _ref: string };
  alt?: string;
}

interface AboutStat {
  value: string;
  label: string;
}

interface SanityAbout {
  title?: string;
  tagline?: string;
  body?: unknown;
  images?: SanityImageValue[];
  stats?: AboutStat[];
}

async function getAbout(): Promise<SanityAbout | null> {
  return client.fetch(
    `*[_type == "about" && _id == "about"][0]{ title, tagline, body, images, stats }`
  );
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h3 className="text-2xl md:text-3xl mt-8 mb-4 first:mt-0" style={{ color: "var(--silva-blue-dark)" }}>
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="text-xl mt-6 mb-3 first:mt-0" style={{ color: "var(--silva-blue-dark)" }}>
        {children}
      </h4>
    ),
    h4: ({ children }) => (
      <h5 className="text-lg mt-4 mb-2 first:mt-0" style={{ color: "var(--silva-blue-dark)" }}>
        {children}
      </h5>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="border-l-4 pl-6 italic my-6 text-gray-600"
        style={{ borderColor: "var(--silva-yellow)" }}
      >
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-gray-600 leading-relaxed mb-5 last:mb-0">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-5 space-y-2 text-gray-600 mb-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-5 space-y-2 text-gray-600 mb-5">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ color: "var(--silva-blue-dark)" }}>{children}</strong>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:opacity-70 transition-opacity"
        style={{ color: "var(--silva-blue-medium)" }}
      >
        {children}
      </a>
    ),
  },
};

const defaultStats: AboutStat[] = [
  { value: "14+", label: "Anos de Experiência" },
  { value: "1000+", label: "Projetos Entregues" },
  { value: "100%", label: "Compromisso e Qualidade" },
];

const decorativeIcons = [ShieldCheck, Award, HandHeart, Sparkles];

export default async function AboutSection() {
  const about = await getAbout();

  if (!about?.body) {
    return null;
  }

  const images = (about.images ?? [])
    .filter((image) => image?.asset?._ref)
    .map((image) => ({
      src: urlFor(image).width(900).height(1125).url(),
      alt: image.alt || about.title || "Silva Instaladora",
    }));

  const stats = about.stats && about.stats.length > 0 ? about.stats : defaultStats;

  return (
    <section
      id="sobre"
      className="relative py-24  overflow-hidden"
      style={{ backgroundColor: "var(--muted)" }}
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--silva-blue-medium)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--silva-yellow)" }}
      />

      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto relative">
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm mb-6"
            style={{ backgroundColor: "rgba(245, 158, 11, 0.12)", color: "var(--silva-yellow)" }}
          >
            {about.tagline || "Quem Somos"}
          </span>
          <h2 className="text-4xl md:text-5xl" style={{ color: "var(--silva-blue-dark)" }}>
            {about.title || "Sobre Nós"}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {images.length > 0 && (
            <div className="order-2 lg:order-1">
              <AboutImagesCarousel images={images} />
            </div>
          )}

          <div className={images.length > 0 ? "order-1 lg:order-2" : "lg:col-span-2 max-w-4xl mx-auto"}>
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
              <PortableText value={about.body} components={portableTextComponents} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => {
            const Icon = decorativeIcons[index % decorativeIcons.length];
            return (
              <div
                key={`${stat.label}-${index}`}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--silva-blue-dark)" }}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <p className="text-3xl mb-1" style={{ color: "var(--silva-blue-dark)" }}>
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
