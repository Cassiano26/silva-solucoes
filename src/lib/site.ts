/**
 * Dados canônicos do site, usados por metadata, sitemap, robots,
 * JSON-LD e llms.txt. Um único lugar para mudar domínio e contato.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://silva-solucoes.vercel.app")
).replace(/\/$/, "");

export const SITE = {
  name: "Silva Aquecimento & Hidráulica",
  shortName: "Silva",
  legalName: "Silva Aquecimento & Hidráulica",
  url: SITE_URL,
  description:
    "Aquecedores, boilers, placas solares, bombas e piscinas: venda, instalação e manutenção para casas, comércios e condomínios. Pré-orçamento pelo WhatsApp.",
  locale: "pt_BR",
  phone: "+55 48 98805-9628",
  phoneRaw: "554898059628",
  email: "",
  address: {
    street: "Travessa Manuel Antônio Vitorino, 58",
    neighborhood: "Ponta das Canas",
    city: "Florianópolis",
    state: "SC",
    postalCode: "88056-005",
    country: "BR",
  },
  geo: {
    // Ponta das Canas, Florianópolis
    latitude: -27.3936,
    longitude: -48.4283,
  },
  areaServed: [
    "Florianópolis",
    "São José",
    "Palhoça",
    "Biguaçu",
    "Santo Amaro da Imperatriz",
    "Governador Celso Ramos",
  ],
  services: [
    "Instalação hidráulica",
    "Bombas e pressurização",
    "Aquecimento de água",
    "Aquecimento de piscinas",
    "Serviços residenciais",
    "Serviços comerciais",
  ],
  foundingYear: 2005,
} as const;

export const OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  alt: `${SITE.name} — soluções em aquecimento e hidráulica em Florianópolis`,
};
