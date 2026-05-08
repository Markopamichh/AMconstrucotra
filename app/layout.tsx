import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AM Soluciones Constructivas | Constructora en Neuquén",
  description:
    "Construcción de viviendas en Neuquén. Sistema mixto tradicional + seco. Acompañamiento en todo el proceso. Visita técnica gratuita.",
  keywords: [
    "constructora Neuquén",
    "construcción por etapas Neuquén",
    "sistema mixto construcción",
    "viviendas Neuquén",
    "construcción tradicional Neuquén",
  ],
  openGraph: {
    title: "AM Soluciones Constructivas",
    description: "Construimos de forma clara, ordenada y a tu ritmo.",
    locale: "es_AR",
    type: "website",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans bg-white text-am-text">
        {children}
      </body>
    </html>
  );
}
