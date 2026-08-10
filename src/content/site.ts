/**
 * Single source of truth for site-wide content.
 * Pages and shared layout components read from here so copy, nav and office
 * details only ever need changing in one place.
 */

import type { StaticImageData } from "next/image";
import crescLogo from "../../public/cresc_logo.png";
import suttonLogo from "../../public/sutton_logo.webp";
import bluestoneLogo from "../../public/bluestone_logo.png";

export const logo = crescLogo;

export const site = {
  name: "Cresc Datasoft",
  tagline: "Supply chain back office for apparel importers",
  url: "https://www.crescdata.com",
  email: "info@crescdata.com",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "White Papers", href: "/whitepapers" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export type Office = {
  /** Country label shown as the card's eyebrow. */
  region: string;
  /** Centre name, e.g. "Centre 1". */
  name: string;
  /** Optional qualifier, e.g. "Registered office". */
  note?: string;
  address: string[];
  phone?: string;
  email?: string;
};

export const offices: Office[] = [
  {
    region: "India",
    name: "Centre 1",
    note: "Registered office",
    address: [
      "Cresc Datasoft Pvt Ltd",
      "3rd Floor, BSR Memoirs, #15, New BEL Road",
      "Chickmaranahalli, RMV 2nd Stage",
      "Bangalore 560 094",
    ],
    phone: "+91-80-42281100",
    email: "info@crescdata.com",
  },
  {
    region: "India",
    name: "Centre 2",
    address: [
      "2nd & 3rd Floor, Daffodil, #2/6, 80 Feet Rd",
      "RMV 2nd Stage, Ashwath Nagar",
      "Devasandra Layout",
      "Bangalore 560 094",
    ],
    phone: "+91-80-42281100",
    email: "info@crescdata.com",
  },
  {
    region: "India",
    name: "Centre 3",
    address: [
      "Ground Floor, West Wing, KCT Tech Park",
      "KCT Campus, Thudiyalur Rd",
      "Saravanampatti",
      "Coimbatore 641049",
    ],
  },
  {
    region: "USA",
    name: "New Jersey",
    address: ["236 Possum Hollow Rd", "Jamesburg, NJ 08831", "USA"],
    phone: "+1-646-797-4999",
    email: "info@crescdata.com",
  },
];

/* ---------------------------------------------------------------- home page */

export const hero = {
  eyebrow: "Supply chain back office for apparel importers",
  headline: "We run the back office, so you can grow the business.",
  subhead:
    "From order processing and EDI to import management and full accounting, Cresc Datasoft takes the day-to-day operations off your plate — handled by a team that has spent decades inside the apparel supply chain.",
  primaryCta: { label: "Explore our services", href: "/services" },
  secondaryCta: { label: "Get in touch", href: "/contact" },
} as const;

export type ValueProp = {
  title: string;
  body: string;
  /** Key into the icon map in components/ui/Icon.tsx */
  icon: "tag" | "clock" | "trend" | "scale";
};

export const whyUs: ValueProp[] = [
  {
    title: "Built for apparel importers",
    body: "We know style/colour/size masters, EDI 850/810/856, factor management and retailer compliance inside out.",
    icon: "tag",
  },
  {
    title: "100+ years of combined experience",
    body: "A team that has run back offices for major US retailers, from Walmart to Nordstrom.",
    icon: "clock",
  },
  {
    title: "Lower cost, fewer headaches",
    body: "Cut the cost of in-house staff, systems and overheads while improving accuracy.",
    icon: "trend",
  },
  {
    title: "Ready for the seasonal rush",
    body: "Scale up and down with your season, without hiring and firing.",
    icon: "scale",
  },
];

export type ServiceSummary = {
  title: string;
  body: string;
  href: string;
};

export const servicesSummary: ServiceSummary[] = [
  {
    title: "Order & Invoice Processing",
    body: "Sales order entry, pick tickets, allocation and invoicing.",
    href: "/services",
  },
  {
    title: "EDI",
    body: "UPC maintenance, 850/810/856 documents, GS1-128 labels, full order/AR integration.",
    href: "/services",
  },
  {
    title: "Import & Production Management",
    body: "Purchase orders, shipment tracking and LC management.",
    href: "/services",
  },
  {
    title: "Credit & AR Management",
    body: "Factor data entry, approvals, cash application and aged AR reporting.",
    href: "/services",
  },
  {
    title: "Accounting & Bookkeeping",
    body: "AP, AR, general ledger and financial statements.",
    href: "/services",
  },
  {
    title: "Customer Service & Compliance",
    body: "Customer call handling and retailer compliance checks.",
    href: "/services",
  },
];

export const finalCta = {
  heading: "Ready to hand off your back office?",
  body: "Let's talk about how we can run your operations more accurately and at lower cost.",
  cta: { label: "Get in touch", href: "/contact" },
} as const;

/**
 * CLIENT LOGO STRIP.
 *
 * To add a client: drop the file in public/, import it at the top of this
 * file and push another entry. The strip re-flows automatically.
 *
 * `heightClass` optically balances logos of different shapes: Sutton is a
 * full-bleed square tile so it reads large at a small height, while
 * Bluestone's artwork sits inside heavy internal padding and needs a taller
 * box to match it.
 */
export type ClientLogo = {
  src: StaticImageData;
  alt: string;
  heightClass: string;
};

export const clients = {
  enabled: true,
  heading: "Trusted by apparel brands and importers",
  logos: [
    {
      src: suttonLogo,
      alt: "Sutton Home Fashions",
      heightClass: "h-14 sm:h-16",
    },
    {
      src: bluestoneLogo,
      alt: "Bluestone",
      heightClass: "h-20 sm:h-24",
    },
  ] satisfies ClientLogo[],
};

/* -------------------------------------------------------- testimonials page */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonialsIntro = {
  heading: "What our clients say",
  intro:
    "A few words from the apparel importers and brands we support every day.",
} as const;

/**
 * PLACEHOLDER TESTIMONIALS — not real client quotes.
 *
 * These are illustrative copy standing in until approved quotes are collected.
 * Replace each entry with a real, attributed testimonial before launch, and
 * make sure written permission is on file for the name/company used.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Cresc took our entire EDI and order processing off our hands. Chargebacks dropped and our team finally stopped firefighting during peak season.",
    name: "Rebecca Alvarez",
    role: "VP of Operations",
    company: "Northfield Apparel Group",
  },
  {
    quote:
      "Their accounting team runs our AP, AR and month-end close like clockwork. Cleaner books at a fraction of what we spent in-house.",
    name: "Daniel Osei",
    role: "Chief Financial Officer",
    company: "Meridian Import Co.",
  },
  {
    quote:
      "We scale up hard every autumn. Cresc flexes with us — no scramble to hire, no drop in accuracy.",
    name: "Priya Nair",
    role: "President",
    company: "Coastline Brands",
  },
  {
    quote:
      "From purchase orders to shipment tracking and LC management, our import desk finally feels under control.",
    name: "Mark Feldman",
    role: "Supply Chain Manager",
    company: "Harbor & Vine",
  },
  {
    quote:
      "Retailer compliance used to keep me up at night. Now it's just handled.",
    name: "Tara Willis",
    role: "Operations Director",
    company: "Lyndon Textiles",
  },
];

/* -------------------------------------------------------- white papers page */

export type WhitePaper = {
  title: string;
  summary: string;
  /**
   * Path to the PDF in public/, e.g. "/whitepapers/chargebacks.pdf".
   * Leave as null while the file does not exist — the card then renders a
   * disabled "Coming soon" button instead of a download link.
   */
  file: string | null;
};

export const whitePapersIntro = {
  heading: "White papers & insights",
  intro:
    "Practical guidance on running a leaner, more accurate apparel supply chain back office.",
} as const;

/**
 * PLACEHOLDER WHITE PAPERS — the PDFs do not exist yet.
 *
 * Every entry has `file: null`, so each card shows a disabled "Coming soon"
 * button. To publish one: drop the PDF in public/whitepapers/ and set `file`
 * to its path. No component changes needed.
 */
export const whitePapers: WhitePaper[] = [
  {
    title: "The Hidden Cost of Retailer Chargebacks — and How to Cut Them",
    summary:
      "Where apparel importers lose margin to compliance errors, and a practical framework to reduce it.",
    file: null,
  },
  {
    title: "EDI Without the Headaches: A Buyer's Guide for Apparel Importers",
    summary:
      "What 850/810/856 really require, and how to keep documents clean at scale.",
    file: null,
  },
  {
    title: "Building a Back Office That Scales With Your Season",
    summary:
      "How to handle demand peaks without over-hiring or sacrificing accuracy.",
    file: null,
  },
  {
    title: "In-House vs Outsourced Back Office: A Cost Breakdown",
    summary:
      "A clear-eyed comparison of staffing, systems and error costs.",
    file: null,
  },
  {
    title: "Import Management 101: POs, Shipments and Letters of Credit",
    summary:
      "A back-to-basics guide to a tightly run import desk.",
    file: null,
  },
];
