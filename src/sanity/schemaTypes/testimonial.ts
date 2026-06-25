import { defineType, defineField } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome do Cliente",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Cargo / Contexto",
      description: "Ex: Proprietário, Síndico, Engenheiro...",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Foto do Cliente",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "quote",
      title: "Depoimento",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Avaliação (1 a 5)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "featured",
      title: "Exibir em Destaque",
      description: "Marque para exibir este depoimento na página inicial",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "quote",
      media: "avatar",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle?.slice(0, 80) + (subtitle?.length > 80 ? "..." : ""),
        media,
      };
    },
  },
});
