import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
