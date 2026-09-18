import { SITE, SITE_URL } from "@/lib/site";
import { client } from "@/sanity/lib/client";

export const revalidate = 3600;

interface CategoryDoc {
  title: string;
  slug: string;
  description?: string;
}

async function fetchCategories(): Promise<CategoryDoc[]> {
  try {
    return await client.fetch(
      `*[_type == "category" && defined(slug.current)] | order(title asc){
        title, "slug": slug.current, description
      }`
    );
  } catch {
    return [];
  }
}

/**
 * llms.txt — descreve o site em markdown para assistentes de IA,
 * seguindo a proposta de llmstxt.org.
 */
export async function GET() {
  const categories = await fetchCategories();

  const categoryLines = categories.length
    ? categories
        .map(
          (c) =>
            `- [${c.title}](${SITE_URL}/produtos/${c.slug})${
              c.description ? `: ${c.description.replace(/\s+/g, " ").trim()}` : ""
            }`
        )
        .join("\n")
    : "- [Catálogo de produtos](" + SITE_URL + "/#produtos)";

  const body = `# ${SITE.name}

> ${SITE.description}

Empresa de Florianópolis com mais de 20 anos de atuação em aquecimento de
água, hidráulica e piscinas. Atende residências, comércios e condomínios,
com venda de equipamentos, instalação e manutenção.

## Como contratar

O atendimento começa por um pré-orçamento pelo WhatsApp (${SITE.phone}).
As etapas são: pré-orçamento, visita técnica, orçamento final ajustado ao
que foi visto na visita, aprovação e, por fim, instalação e manutenção.

## Serviços

${SITE.services.map((s) => `- ${s}`).join("\n")}

## Produtos

${categoryLines}

## Área de atendimento

${SITE.areaServed.map((c) => `- ${c}`).join("\n")}

## Páginas

- [Início](${SITE_URL}/): serviços, etapas de contratação e área de atuação
- [Sobre](${SITE_URL}/sobre): história da empresa e números
- [Bombas e motores](${SITE_URL}/bombas-e-motores): linha de bombas

## Contato

- WhatsApp: ${SITE.phone}
- Endereço: ${SITE.address.street}, ${SITE.address.neighborhood}, ${SITE.address.city}/${SITE.address.state}, CEP ${SITE.address.postalCode}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
