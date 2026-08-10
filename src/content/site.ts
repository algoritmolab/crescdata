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
  /** Rendered verbatim, lowercase, no spaces. */
  strapline: "ideate.innovate.deliver",
  tagline: "Supply chain back office for importers and wholesalers",
  url: "https://www.crescdata.com",
  email: "info@crescdata.com",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

/**
 * The single definition of nav order. The header (desktop and mobile) and the
 * footer all map over this, so the order can only ever be changed here.
 */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "White Papers", href: "/whitepapers" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export type Office = {
  /** Country label shown as the card's eyebrow. */
  region: string;
  /** Center name, e.g. "Center 1". */
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
    name: "Center 1",
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
    name: "Center 2",
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
    name: "Center 3",
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
  eyebrow: "Supply chain back office for importers and wholesalers",
  headline: "We run the back office, so you can grow the business.",
  subhead:
    "From order processing and EDI to import management and full accounting, Cresc takes the day-to-day operations off your plate. We work with importers and wholesalers of apparel, home furnishings and consumer products, handled by a team that has spent decades inside US retail supply chains.",
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
    title: "Built for importers and wholesalers",
    body: "Style, color and size masters, EDI 850/810/856, factor management and retailer routing guides. Deep in apparel, and the same disciplines applied across home furnishings and consumer products.",
    icon: "tag",
  },
  {
    title: "100+ years of combined experience",
    body: "A team that has run back offices serving the major US retail accounts, from Walmart to Nordstrom.",
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
    body: "UPC maintenance, 850/810/856 documents, GS1-128 labels, full order and AR integration.",
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
 * `heightClass` optically balances logos of different shapes rather than
 * matching raw pixel height: Sutton is a full-bleed square tile so it reads
 * large at a small height; Bluestone's artwork sits inside heavy internal
 * padding and needs a taller box; Metro1 is a full-bleed wordmark at 6.4:1,
 * so it needs a short box or it dominates the row.
 */
export type ClientLogo = {
  /** Static import for rasters; a public/ path for SVG (which Next cannot optimize). */
  src: StaticImageData | string;
  alt: string;
  /** Required when `src` is a path string. */
  width?: number;
  height?: number;
  heightClass: string;
};

export const clients = {
  enabled: true,
  heading: "Trusted by importers, wholesalers and brands",
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
    {
      src: "/images/metro1-solutions.svg",
      alt: "Metro1 Solutions",
      width: 296,
      height: 46,
      heightClass: "h-8 sm:h-9",
    },
  ] satisfies ClientLogo[],
  /** Text only. We do not use retailer logos or brand marks anywhere. */
  shipsToLabel: "Our clients ship to",
  shipsTo: [
    "Walmart",
    "Target",
    "Ross",
    "Nordstrom",
    "Macy's",
    "Saks",
    "Bloomingdale's",
  ],
};

/* -------------------------------------------------------- testimonials page */

/** Service areas, each with its own chip color in the color master. */
export const serviceAreas = [
  { key: "edi", label: "EDI", chip: "bg-chip-edi" },
  { key: "accounting", label: "Accounting", chip: "bg-chip-accounting" },
  { key: "imports", label: "Imports", chip: "bg-chip-imports" },
  { key: "compliance", label: "Compliance", chip: "bg-chip-compliance" },
  { key: "operations", label: "Operations", chip: "bg-chip-operations" },
] as const;

export type ServiceAreaKey = (typeof serviceAreas)[number]["key"];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  area: ServiceAreaKey;
};

export const testimonialsIntro = {
  heading: "What our clients say",
  intro:
    "A few words from the importers, wholesalers and brands we support every day, across apparel, home furnishings and consumer products.",
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
      "Cresc took over our EDI and order processing. Chargebacks dropped, and the team stopped firefighting its way through every peak season.",
    name: "Rebecca Alvarez",
    role: "VP of Operations",
    company: "Northfield Apparel Group",
    area: "edi",
  },
  {
    quote:
      "They run our AP, AR and month-end close like clockwork. Cleaner books, delivered earlier, at a fraction of what we were spending in-house.",
    name: "Daniel Osei",
    role: "Chief Financial Officer",
    company: "Meridian Import Co.",
    area: "accounting",
  },
  {
    quote:
      "We scale hard every fall. Cresc flexes with us: no scramble to hire, no overtime bill in January, and no drop in accuracy.",
    name: "Priya Nair",
    role: "President",
    company: "Coastline Brands",
    area: "operations",
  },
  {
    quote:
      "From purchase orders through shipment tracking to letter of credit management, our import desk finally feels like it is genuinely under control.",
    name: "Mark Feldman",
    role: "Supply Chain Manager",
    company: "Harbor & Vine",
    area: "imports",
  },
  {
    quote:
      "Retailer compliance used to keep me up at night. Now it is simply handled, routing guide by routing guide, without me chasing anyone.",
    name: "Tara Willis",
    role: "Operations Director",
    company: "Lyndon Textiles",
    area: "compliance",
  },
];
