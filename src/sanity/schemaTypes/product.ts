import { defineType, defineField } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Produto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome do Produto",
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
      name: "image",
      title: "Imagem Principal",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "subcategory",
      title: "Subcategoria",
      type: "reference",
      to: [{ type: "subcategory" }],
    }),
    defineField({
      name: "cashPrice",
      title: "Preço à Vista / PIX (R$)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "installmentPrice",
      title: "Preço Parcelado (R$)",
      description: "Preço total quando parcelado (pode ser maior que o à vista)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "maxInstallments",
      title: "Número máximo de parcelas",
      type: "number",
      validation: (Rule) => Rule.min(1).max(48),
    }),
    defineField({
      name: "available",
      title: "Disponível",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "externalLink",
      title: "Link externo (loja parceira)",
      type: "url",
    }),
    defineField({
      name: "brand",
      title: "Marca",
      type: "string",
    }),
    defineField({
      name: "specs",
      title: "Especificações Técnicas",
      description: "Liste as especificações do produto",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "Produto em Destaque",
      description: "Marque para exibir este produto na seção de destaques do site",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ?? "Sem categoria",
        media,
      };
    },
  },
});
