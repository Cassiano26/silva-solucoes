import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  // Requires a token with "Editor" or "Administrator" permissions (write access).
  // SANITY_API_VIEW_TOKEN is read-only and will fail with a 403 here.
  token: process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_VIEW_TOKEN,
});

function block(text: string, style: string = "normal") {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2),
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: Math.random().toString(36).slice(2),
        text,
        marks: [],
      },
    ],
  };
}

async function main() {
  const paragraphs = [
    "A Silva Instaladora nasceu da dedicação, experiência e compromisso de oferecer soluções de qualidade para seus clientes. Há mais de 14 anos no mercado, atuamos com excelência nos segmentos de aquecimento solar, instalações hidráulicas e instalações elétricas, sempre buscando entregar segurança, eficiência e satisfação em cada serviço realizado.",
    "À frente da empresa está Orildo, sócio proprietário e técnico especializado, que aos 53 anos acumula vasta experiência no setor e uma trajetória construída com muito trabalho, responsabilidade e aperfeiçoamento constante. Sua atuação prática e conhecimento técnico são a base da confiança conquistada junto aos clientes ao longo dos anos.",
    "Ao seu lado está Ana Carolina, responsável pelo atendimento comercial e vendas de equipamentos, contribuindo para que cada cliente receba orientação personalizada e as melhores soluções para suas necessidades.",
    "A Silva Instaladora trabalha com venda, instalação e manutenção de sistemas de aquecimento solar, além de serviços hidráulicos e elétricos, atendendo residências, condomínios, comércios e empresas. Nosso compromisso é oferecer produtos de qualidade, atendimento transparente e serviços executados com profissionalismo.",
    "Mais do que instalar equipamentos, nossa missão é proporcionar conforto, economia e tranquilidade para nossos clientes, construindo relacionamentos duradouros baseados na confiança e no respeito.",
  ];

  const body = paragraphs.map((p) => block(p));

  // Fixed document ID so this always targets the singleton "Sobre Nós" document
  // (matches ABOUT_SINGLETON_ID in src/sanity/structure.ts).
  const ABOUT_SINGLETON_ID = "about";

  const doc = {
    _id: ABOUT_SINGLETON_ID,
    _type: "about",
    title: "Sobre Nós",
    tagline: "Silva Instaladora — 14 anos de experiência transformando conhecimento em soluções.",
    body,
    stats: [
      { _type: "stat", _key: "s1", value: "14+", label: "Anos de Experiência" },
      { _type: "stat", _key: "s2", value: "3", label: "Áreas de Atuação" },
      { _type: "stat", _key: "s3", value: "100%", label: "Compromisso e Profissionalismo" },
    ],
  };

  const result = await client.createOrReplace(doc);
  console.log("About document saved:", result._id);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
