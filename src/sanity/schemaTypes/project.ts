import { defineType, defineField } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Projeto Realizado",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      description: "Texto rico — descreva o projeto em detalhes.",
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
    }),
    defineField({
      name: "images",
      title: "Imagens",
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
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
    },
  },
});
