import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { logo, site } from "@/content/site";

/** Display face — tight industrial grotesque, used for headings. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

/** Body face. */
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/** Data face — reference numbers, dates, topic codes, labels, eyebrows. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = `${site.name} — ${site.tagline}`;
const description =
  "Cresc Datasoft runs the back office for apparel importers — order processing, EDI, import management, AR and accounting. Lower cost, higher accuracy.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    // Inner pages set their own title; this appends the company name.
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "apparel back office",
    "supply chain BPO",
    "EDI services",
    "order processing",
    "import management",
    "accounts receivable outsourcing",
    "apparel importers",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description,
    url: site.url,
    locale: "en_US",
    images: [
      {
        url: logo.src,
        width: logo.width,
        height: logo.height,
        alt: site.name,
      },
    ],
  },
  twitter: {
    // The logo is a wide, short wordmark, so a summary card frames it better
    // than a large image card. Swap to "summary_large_image" once we have a
    // purpose-built 1200x630 social image.
    card: "summary",
    title,
    description,
    images: [logo.src],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
