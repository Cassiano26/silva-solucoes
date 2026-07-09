import type { Metadata } from "next";
import "@/styles/index.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Silva Soluções",
  description:
    "Conectando clientes em Florianópolis com soluções especializadas em hidráulica, aquecimento de água e sistemas de piscinas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
