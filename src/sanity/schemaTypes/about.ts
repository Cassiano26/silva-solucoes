import { defineType, defineField } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "Sobre Nós",
  type: "document",
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: "title",
      title: "Título da Seção",
      type: "string",
      initialValue: "Sobre Nós",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Frase de Destaque",
      description: "Ex: 14 anos de experiência transformando conhecimento em soluções.",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Texto (Rich Text)",
      description: "Texto rico — adicione parágrafos, listas, negrito, links, etc.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Título H2", value: "h2" },
            { title: "Título H3", value: "h3" },
            { title: "Título H4", value: "h4" },
            { title: "Citação", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numerada", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
              { title: "Sublinhado", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Imagens",
      description: "Adicione uma ou mais imagens. Com duas ou mais, a página exibe um carrossel automaticamente.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto alternativo",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "stats",
      title: "Números em Destaque",
      description: "Ex: 14+ Anos de Experiência, 1000+ Projetos Entregues",
      type: "array",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            { name: "value", title: "Valor", type: "string", validation: (Rule) => Rule.required() },
            { name: "label", title: "Descrição", type: "string", validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tagline",
      media: "images.0",
    },
  },
});
