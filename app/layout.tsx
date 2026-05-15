import type { Metadata } from "next";
import "./globals.css";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { Analytics } from "@vercel/analytics/next";

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
    longitude: -68.0591,
  },
  areaServed: { "@type": "City", name: "Neuquén" },
  sameAs: ["https://instagram.com/am_soluciones.nqn"],
  image: `${BASE_URL}/img/logosinfondo.jpeg`,
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "6",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Nashira Buganém" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "Excelente asesoramiento personalizado. Cumplieron en tiempo y forma con los trabajos pedidos.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Milcell Neuquén" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "Terminaron antes de tiempo, el trabajo quedó mejor de lo que esperaba. Muy buena comunicación. Muy recomendables.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Andrés Cerda" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody: "Se cumplió en tiempo y forma. 55 metros de piso. La verdad, muy conformes.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Natalia Ramos" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "Realizaron el revestimiento de mi quincho, pisos, pintura y sanitarios. Quedó hermoso todo.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Ana Bravo" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "Responsabilidad, calidad de materiales y accesibles en presupuestos. La platea quedó excelente. Son de confianza.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Valén Pino" },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "Súper responsables, de confianza. Cumplen con su palabra. No duden en contratarlos.",
    },
  ],
};

export const metadata: Metadata = {
  title: "Constructora en Neuquén | Viviendas y Obras por Etapas - AM Soluciones",
  description:
    "Construcción de viviendas en Neuquén. Sistema mixto tradicional + seco. Acompañamiento en todo el proceso. Visita técnica gratuita.",
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
  twitter: {
    card: "summary_large_image",
    title: "Constructora en Neuquén | AM Soluciones Constructivas",
    description:
      "Construimos tu vivienda en Neuquén de forma clara, ordenada y a tu ritmo.",
    images: [`${BASE_URL}/img/logosinfondo.jpeg`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" style={{ colorScheme: "light" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans bg-white text-am-text pb-[72px] md:pb-0">
        {children}
        <StickyMobileCTA />
        <Analytics />
      </body>
    </html>
  );
}
