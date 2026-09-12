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

// Shared, sitewide defaults. A page (e.g. app/page.tsx, app/scratchy-tuesday)
// can override title/description/openGraph/alternates for itself — Next.js
// replaces these fields per route rather than merging into them, so anything
// homepage-specific (the Restaurant JSON-LD, the "/" canonical, the homepage
// OG copy) lives in app/page.tsx instead of here, where every route would
// otherwise inherit it.
const TITLE = "Dosa Hut Sunshine Coast | Authentic Indian Flavours";
const DESCRIPTION =
  "Authentic Indian favourites, biryanis, curries, dosas and more at Dosa Hut Sunshine Coast. Order online for pickup or delivery, 5 Lutana Street, Buddina QLD 4575.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title: {
    default: TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased bg-cream-50 text-ink-900">{children}</body>
    </html>
  );
}
