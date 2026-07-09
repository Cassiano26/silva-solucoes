export const WHATSAPP_NUMBER = "554898059628";

export function formatCurrency(value?: number) {
  if (value === undefined || value === null) return "";
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function buildProductWhatsappLink(productTitle: string, productUrl?: string) {
  const lines = [`Olá! Tenho interesse no produto: *${productTitle}*`];
  if (productUrl) lines.push(productUrl);
  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface WhatsappCartItem {
  title: string;
  quantity: number;
  cashPrice?: number;
}

export function buildCartWhatsappLink(items: WhatsappCartItem[], total: number) {
  const lines = [
    "Olá! Gostaria de comprar os seguintes produtos:",
    "",
    ...items.map(
      (item) =>
        `- ${item.quantity}x ${item.title}${
          item.cashPrice ? ` (${formatCurrency(item.cashPrice)} cada)` : ""
        }`
    ),
  ];

  if (total > 0) {
    lines.push("", `Total estimado: ${formatCurrency(total)}`);
  }

  const message = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
