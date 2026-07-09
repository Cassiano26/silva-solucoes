import type { StructureResolver } from "sanity/structure";

export const ABOUT_SINGLETON_ID = "about";
const ABOUT_SINGLETON_TYPE = "about";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Sobre Nós")
        .id(ABOUT_SINGLETON_TYPE)
        .child(
          S.document()
            .schemaType(ABOUT_SINGLETON_TYPE)
            .documentId(ABOUT_SINGLETON_ID)
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== ABOUT_SINGLETON_TYPE
      ),
    ]);
