import { defineType, defineField } from "sanity";

export const subcategoryType = defineType({
  name: "subcategory",
  title: "Subcategoria",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome da Subcategoria",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria Pai",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Categoria: ${subtitle}` : "",
      };
    },
  },
});
