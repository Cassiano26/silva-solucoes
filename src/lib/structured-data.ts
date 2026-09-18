import { SITE, SITE_URL } from "@/lib/site";

/**
 * JSON-LD para buscadores e assistentes. LocalBusiness é o tipo que
 * alimenta o painel de negócios locais do Google.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    description: SITE.description,
    telephone: SITE.phone,
    image: `${SITE_URL}/og-image.png`,
    priceRange: "$$",
    foundingDate: String(SITE.foundingYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: SITE.areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: SITE.services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service },
      })),
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "customer service",
      areaServed: "BR",
      availableLanguage: ["Portuguese"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#business` },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function productJsonLd(product: {
  title: string;
  description?: string;
  image?: string;
  slug: string;
  cashPrice?: number;
  available?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    url: `${SITE_URL}/produto/${product.slug}`,
    brand: { "@type": "Brand", name: SITE.name },
    ...(product.cashPrice
      ? {
          offers: {
            "@type": "Offer",
            price: product.cashPrice,
            priceCurrency: "BRL",
            availability: product.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            seller: { "@id": `${SITE_URL}/#business` },
          },
        }
      : {}),
  };
}
