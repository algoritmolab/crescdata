/**
 * Single source of truth for site-wide content.
 * Pages and shared layout components read from here so copy, nav and office
 * details only ever need changing in one place.
 */

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
 * PROOF SECTION — placeholder content.
 *
 * Flip `enabled` to false to hide the whole section (no other edits needed).
 * To go live: replace `logos` with real client names (or swap the placeholder
 * boxes in components/home/Proof.tsx for <Image> logos) and fill in the
 * `testimonial` fields with a real quote.
 */
export const proof = {
  enabled: true,
  heading: "Trusted by apparel brands and importers",
  logos: [
    "Client logo",
    "Client logo",
    "Client logo",
    "Client logo",
    "Client logo",
  ],
  testimonial: {
    quote:
      "Placeholder — a short client quote will go here, describing the results they saw after moving their back office to Cresc Datasoft.",
    author: "Name, Title",
    company: "Company name",
  },
} as const;
