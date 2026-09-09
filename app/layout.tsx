import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "./globals.css";
import { SITE } from "@/lib/site";

const TITLE = "Dosa Hut Sunshine Coast | Authentic Indian Flavours";
const DESCRIPTION =
  "Authentic Indian favourites, biryanis, curries, dosas and more at Dosa Hut Sunshine Coast. Order online for pickup or delivery, 5 Lutana Street, Buddina QLD 4575.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: SITE.name,
    locale: "en_AU",
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "A spread of Dosa Hut curries, biryani, chutneys and fresh roti",
      },
    ],
  },
};

// Opening hours in schema.org's day/time shape. Keep in step with HOURS in
// lib/site.ts, which renders the same trading times in the Location section.
const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "11:00",
    closes: "14:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "16:00",
    closes: "21:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Friday", "Saturday", "Sunday"],
    opens: "11:00",
    closes: "21:30",
  },
];

const RESTAURANT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE.name,
  description: DESCRIPTION,
  url: SITE.siteUrl,
  image: new URL(SITE.ogImage, SITE.siteUrl).toString(),
  telephone: "+61423841991",
  priceRange: "$$",
  servesCuisine: ["Indian", "South Indian", "Indo-Chinese"],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.addressLine1,
    addressLocality: "Buddina",
    addressRegion: "QLD",
    postalCode: "4575",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.lat,
    longitude: SITE.lng,
  },
  hasMap: SITE.placeUrl,
  menu: SITE.menuPdfUrl,
  acceptsReservations: false,
  openingHoursSpecification: OPENING_HOURS,
  sameAs: [SITE.facebookUrl, SITE.instagramUrl, SITE.mainSiteUrl],
  potentialAction: {
    "@type": "OrderAction",
    target: SITE.orderUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* The full-bleed hero banner is the LCP element below xl, where it is
            the first paint of the page. Above xl the hero is the light orbit
            instead, so the preload is scoped to the widths that use it. */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-banner.png"
          media="(max-width: 1279px)"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(RESTAURANT_JSON_LD) }}
        />
      </head>
      <body className="antialiased bg-cream-50 text-ink-900">{children}</body>
    </html>
  );
}
