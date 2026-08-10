/**
 * Services content.
 *
 * `coreServices` is the order-to-cash lifecycle and its order carries meaning,
 * so it is numbered. `crossCutting` runs alongside the whole sequence and is
 * deliberately not numbered.
 */

export type CoreService = {
  /** Two-digit step label, e.g. "01". */
  step: string;
  title: string;
  intro: string;
  items: string[];
};

export const servicesHero = {
  eyebrow: "Services",
  headline: "Everything behind the order, handled.",
  subhead:
    "Cresc runs the full back office for apparel importers — from the style master through to the financial statements. We work in your systems, to your retailers' rules, on your calendar.",
} as const;

export const coreServices: CoreService[] = [
  {
    step: "01",
    title: "Master File Maintenance",
    intro:
      "Clean master data is what keeps everything downstream from breaking. We own it and keep it accurate.",
    items: [
      "Style, colour and size masters",
      "Customer bill-to, ship-to and distribution centre records",
      "Sales terms and pricing files",
      "Royalty tracking",
      "Custom MIS reporting by vendor",
    ],
  },
  {
    step: "02",
    title: "Order & Invoice Processing",
    intro:
      "Orders in, pick tickets out, invoices raised. Processed to your rules, on US business hours.",
    items: [
      "Sales order entry across all channels",
      "Allocation against on-hand inventory and incoming production",
      "Pick ticket creation and warehouse release",
      "Invoicing, credit memos and return authorisations",
      "Custom reporting",
    ],
  },
  {
    step: "03",
    title: "EDI",
    intro:
      "We handle the documents your retailers demand, and keep them clean at volume.",
    items: [
      "UPC and GTIN maintenance",
      "Purchase orders (850), invoices (810), advance ship notices (856)",
      "GS1-128 / UCC-128 carton labels",
      "UPC catalogue maintenance (GXS, InterTrade and similar)",
      "Routing requests and retailer routing instructions",
      "Full integration with order management, AR and inventory",
    ],
  },
  {
    step: "04",
    title: "Import & Production Management",
    intro: "Visibility from the factory floor to the DC door.",
    items: [
      "Purchase order management with overseas factories",
      "Shipment tracking through to receipt",
      "Letter of credit management",
      "Custom reporting",
    ],
  },
  {
    step: "05",
    title: "Credit & AR Management",
    intro: "Approvals moving, cash applied, ageing under control.",
    items: [
      "Factor data entry and submissions",
      "Factor approvals and declines",
      "House credit limits for non-factored accounts",
      "Factor assignments",
      "Cash application and aged AR reporting",
    ],
  },
  {
    step: "06",
    title: "Accounting & Bookkeeping",
    intro: "Books closed on time, every month.",
    items: [
      "Accounts payable and accounts receivable",
      "General ledger and month-end close",
      "Bank and factor reconciliations",
      "Financial statements, P&L and balance sheet",
    ],
  },
];

export type CrossCuttingService = {
  title: string;
  body: string;
};

export const crossCutting: CrossCuttingService[] = [
  {
    title: "Retailer Compliance",
    body: "Packing instructions to routing guide, tag/label/marking requirements, and the retailer-specific checks that stop chargebacks before they start.",
  },
  {
    title: "Customer Service",
    body: "We handle inbound customer calls, research queries and close out grievances, in US English.",
  },
  {
    title: "Vendor & Partner Coordination",
    body: "Freight brokers, overseas factories, and trim, label, tag and supply vendors.",
  },
  {
    title: "We Work In Your Systems",
    body: "No new software to buy. We operate inside your existing ERP, handle transactions remotely, and you save on headcount, benefits, real estate and IT.",
  },
];

export const whyCresc: string[] = [
  "Apparel is all we do. Style/colour/size, factor approvals, routing guides — this is our day job, not a vertical we serve.",
  "100+ years of combined supply chain experience, including back offices for major US retail accounts.",
  "Built for the seasonal peak. Capacity flexes with your calendar, without hiring and firing.",
  "Substantially lower cost than an in-house team, with fewer errors.",
];
