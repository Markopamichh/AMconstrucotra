import type { Metadata } from "next";
import "./globals.css";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://am-constructora.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "GeneralContractor"],
  "@id": BASE_URL,
  name: "AM Soluciones Constructivas",
  description:
    "Constructora en Neuquén especializada en viviendas. Sistema mixto tradicional + seco, obra por etapas y Método AM.",
  url: BASE_URL,
  telephone: ["+54 9 2994 22-6380", "+54 9 2995 23-0772"],
  email: "amsoluciones.nqn@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Córdoba 478",
    addressLocality: "Neuquén",
    addressRegion: "Neuquén",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -38.9516,
    longitude: -68.9587,
  },
  areaServed: { "@type": "City", name: "Neuquén" },
  sameAs: ["https://instagram.com/am_soluciones.nqn"],
  image: `${BASE_URL}/img/logosinfondo.jpeg`,
  priceRange: "$$",
};

export const metadata: Metadata = {
  title: "Constructora en Neuquén | Viviendas y Obras por Etapas - AM Soluciones",
  description:
    "Construcción de viviendas en Neuquén. Sistema mixto tradicional + seco. Acompañamiento en todo el proceso. Visita técnica gratuita.",
  keywords: [
    "constructora Neuquén",
    "construcción por etapas Neuquén",
    "sistema mixto construcción",
    "viviendas Neuquén",
    "plateas Neuquén",
    "steel frame Neuquén",
  ],
  openGraph: {
    title: "Constructora en Neuquén | AM Soluciones Constructivas",
    description:
      "Construimos tu vivienda en Neuquén de forma clara, ordenada y a tu ritmo. Sistema mixto, obra por etapas y visita técnica gratuita. ¡Consultanos!",
    locale: "es_AR",
    type: "website",
    url: BASE_URL,
    siteName: "AM Soluciones Constructivas",
    images: [
      {
        url: `${BASE_URL}/img/logosinfondo.jpeg`,
        width: 800,
        height: 600,
        alt: "AM Soluciones Constructivas — Constructora en Neuquén",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" style={{ colorScheme: "light" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans bg-white text-am-text">
        {children}
      </body>
    </html>
  );
}
