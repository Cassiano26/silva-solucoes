import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/index.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import { OG_IMAGE, SITE, SITE_URL } from "@/lib/site";
import { localBusinessJsonLd, websiteJsonLd } from "@/lib/structured-data";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} | Aquecimento, hidráulica e piscinas em Florianópolis`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "aquecimento de água Florianópolis",
    "aquecedor a gás",
    "boiler",
    "placa de aquecimento solar",
    "aquecimento de piscina",
    "instalação hidráulica",
    "bomba d'água",
    "pressurizador",
    "manutenção hidráulica Florianópolis",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE_URL,
    siteName: SITE.name,
    title: `${SITE.name} | Aquecimento, hidráulica e piscinas em Florianópolis`,
    description: SITE.description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Aquecimento e hidráulica em Florianópolis`,
    description: SITE.description,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
  formatDetection: {
    telephone: true,
    address: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={roboto.variable}>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <CartProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}
