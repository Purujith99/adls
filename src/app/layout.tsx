import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#063D2E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://athreyadesigns.com"),
  title: "Athreya Design & Landscaping Studio | Architecture, Interiors & Landscape Design",
  description:
    "Athreya Design & Landscaping Studio — Designing Spaces. Enhancing Life. Premium architectural planning, luxury garden layouts, 3D visualization, drip irrigation, and sustainable landscape design across India.",
  keywords: [
    "Athreya Design & Landscaping Studio",
    "landscape design India",
    "architectural design studio",
    "luxury garden design",
    "terrace gardens",
    "farmhouse landscaping",
    "villa architecture",
    "drip irrigation design",
    "interior and exterior design",
    "3D architectural visualization",
  ],
  authors: [{ name: "Athreya Design & Landscaping Studio" }],
  creator: "Athreya Design & Landscaping Studio",
  publisher: "Athreya Design & Landscaping Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Athreya Design & Landscaping Studio | Designing Spaces. Enhancing Life.",
    description:
      "We Plan. We Design. We Create. Green. Functional. Beautiful. High-end landscape planning and architectural design studio serving clients across India.",
    url: "https://athreyadesigns.com",
    siteName: "Athreya Design & Landscaping Studio",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 900,
        alt: "Athreya Design & Landscaping Studio - Luxury Architecture & Landscape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Athreya Design & Landscaping Studio | Architecture & Landscape Design",
    description: "Designing Spaces. Enhancing Life. Green. Functional. Beautiful.",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Athreya Design & Landscaping Studio",
    "alternateName": "Athreya Designs",
    "description":
      "Professional landscape planning, architectural design, interior & exterior execution, and drip irrigation systems across India.",
    "slogan": "Designing Spaces. Enhancing Life.",
    "telephone": ["+919491246574", "+917075947455"],
    "email": "athreyadesigns6@gmail.com",
    "sameAs": [
      "https://instagram.com/athreyadesigns_"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "priceRange": "$$$",
    "knowsAbout": [
      "Landscape Architecture",
      "Garden Layout Planning",
      "Plant & Tree Selection Guidance",
      "Drip Irrigation Systems",
      "Floor Plans & Working Drawings",
      "3D Architectural Visualization",
      "Villa & Farmhouse Landscape Design"
    ]
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body text-[#18221D] bg-[#FAF6F0] antialiased selection:bg-[#063D2E] selection:text-[#F4EBDD]">
        {children}
      </body>
    </html>
  );
}
