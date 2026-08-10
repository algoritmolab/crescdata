/**
 * Case studies.
 *
 * Adding one is a single edit: append an entry below. The flow diagram is
 * rendered from `flow`, so no drawing work is needed either — place nodes on
 * a column/lane grid and list the edges between them.
 *
 * Every engagement here is anonymised and representative. There are no real
 * client names, no named individuals, no quotes, and no verified figures.
 * Metrics are qualitative or expressed as typical ranges on purpose.
 */

export const REPRESENTATIVE_NOTE =
  "Representative engagement. Client details are anonymised and figures are indicative of typical outcomes.";

/** Node kinds drive the shape and treatment in the diagram. */
export type FlowKind =
  | "terminal" // start or end of the sequence
  | "step" // ordinary processing step
  | "decision" // branch point
  | "escalation"; // handed to a client-side decision

export type FlowNode = {
  id: string;
  /** Each entry is one rendered line of mono text. */
  lines: string[];
  kind: FlowKind;
  /** Horizontal position on the grid. */
  col: number;
  /** 0 = main path, 1 = exception path. */
  lane: 0 | 1;
};

export type FlowEdge = {
  from: string;
  to: string;
  /** Short branch label, e.g. "yes" / "no". */
  label?: string;
};

export type Flow = { nodes: FlowNode[]; edges: FlowEdge[] };

export type Metric = { value: string; label: string };
export type BeforeAfter = { aspect: string; before: string; after: string };

export type CaseStudy = {
  slug: string;
  ref: string;
  sector: string;
  functionArea: string;
  title: string;
  context: string;
  metrics: Metric[];
  flow: Flow;
  howItWorks: string[];
  beforeAfter: BeforeAfter[];
  systems: string[];
  outcome: string;
};

export const caseStudiesIntro = {
  eyebrow: "Case studies",
  headline: "What handing over the back office actually looks like.",
  subhead:
    "Four representative engagements across order operations, retailer compliance, receivables and accounting — the work, the process, and what changed.",
} as const;

export const caseStudies: CaseStudy[] = [
  {
    slug: "order-operations",
    ref: "CS-01",
    sector:
      "Womenswear importer, New Jersey, selling into major US department stores",
    functionArea: "Order Operations",
    title: "Running the order desk through peak season",
    context:
      "Around 400 to 600 sales orders a week arriving by EDI, email and retailer portals. Two in-house staff were keeping up in the quiet months and drowning from August onward. Orders were shipping late, and short-ship situations were being caught after the fact rather than before.",
    metrics: [
      { value: "Same day", label: "Order turnaround" },
      { value: "99%+", label: "Order entry accuracy" },
      { value: "No seasonal hiring", label: "Peak coverage" },
      { value: "2 FTE", label: "In-house headcount replaced" },
    ],
    flow: {
      nodes: [
        { id: "in", lines: ["ORDER IN", "850 / EMAIL / PORTAL"], kind: "terminal", col: 0, lane: 0 },
        { id: "val", lines: ["VALIDATE VS", "MASTER FILE"], kind: "step", col: 1, lane: 0 },
        { id: "stock", lines: ["CHECK STOCK +", "INCOMING PRODUCTION"], kind: "step", col: 2, lane: 0 },
        { id: "alloc?", lines: ["ALLOCATABLE?"], kind: "decision", col: 3, lane: 0 },
        { id: "alloc", lines: ["ALLOCATE +", "PICK TICKET"], kind: "step", col: 4, lane: 0 },
        { id: "wh", lines: ["WAREHOUSE RELEASE", "+ CONFIRMATION"], kind: "step", col: 5, lane: 0 },
        { id: "docs", lines: ["ASN 856", "+ INVOICE 810"], kind: "step", col: 6, lane: 0 },
        { id: "ar", lines: ["POST TO AR"], kind: "terminal", col: 7, lane: 0 },
        { id: "flag", lines: ["FLAG EXCEPTION"], kind: "step", col: 4, lane: 1 },
        { id: "opt", lines: ["EXTEND, PART-SHIP", "OR CANCEL"], kind: "decision", col: 5, lane: 1 },
        { id: "esc", lines: ["CLIENT SALES", "DECIDES"], kind: "escalation", col: 6, lane: 1 },
        { id: "upd", lines: ["UPDATE ORDER", "+ NOTIFY ACCOUNT"], kind: "step", col: 7, lane: 1 },
      ],
      edges: [
        { from: "in", to: "val" },
        { from: "val", to: "stock" },
        { from: "stock", to: "alloc?" },
        { from: "alloc?", to: "alloc", label: "yes" },
        { from: "alloc?", to: "flag", label: "no" },
        { from: "alloc", to: "wh" },
        { from: "wh", to: "docs" },
        { from: "docs", to: "ar" },
        { from: "flag", to: "opt" },
        { from: "opt", to: "esc" },
        { from: "esc", to: "upd" },
      ],
    },
    howItWorks: [
      "Order intake across every channel the client's accounts use: EDI, email and retailer portals.",
      "Validation against the master file so style, color, size and pricing match before anything moves.",
      "Allocation against on-hand inventory and incoming production.",
      "Exception identification: short ships, quality holds and date issues, found before allocation rather than after shipping.",
      "Pick ticket creation and release to the warehouse.",
      "ASN and invoice generation once the warehouse confirms.",
      "AR posting.",
      "Daily open-order and shippable reporting back to the client.",
    ],
    beforeAfter: [
      { aspect: "Order entry", before: "1 to 2 days", after: "Same day" },
      { aspect: "Short-ship discovery", before: "After shipping", after: "Before allocation" },
      { aspect: "Peak season temporary hires", before: "3 to 4", after: "None" },
      { aspect: "Open order visibility", before: "Weekly", after: "Daily" },
      { aspect: "Staff required", before: "2 FTE in-house", after: "Cresc team on US hours" },
    ],
    systems: [
      "Client's ERP",
      "EDI VAN",
      "Retailer portals",
      "Warehouse portal",
      "Excel reporting",
    ],
    outcome:
      "The order desk holds through peak without seasonal hiring, and exceptions surface early enough for the client's sales team to act on them.",
  },

  {
    slug: "retailer-compliance",
    ref: "CS-02",
    sector:
      "Home furnishings importer, US East Coast, shipping to national big-box and department store accounts",
    functionArea: "EDI & Retailer Compliance",
    title: "Taking ownership of the routing guides",
    context:
      "Chargebacks were running high enough to erode margin on entire programs. Most traced back to routing guide details: label placement, carton marking, and ASNs sent outside the retailer's window. Nobody in-house owned the routing guides.",
    metrics: [
      { value: "Materially reduced", label: "Chargeback rate" },
      { value: "On time", label: "ASN sent in window" },
      { value: "Near zero", label: "Label spec errors" },
      { value: "All accounts", label: "Routing guides owned" },
    ],
    flow: {
      nodes: [
        { id: "acct", lines: ["NEW ACCOUNT", "OR PROGRAM"], kind: "terminal", col: 0, lane: 0 },
        { id: "guide", lines: ["LOG ROUTING GUIDE", "REQUIREMENTS"], kind: "step", col: 1, lane: 0 },
        { id: "upc", lines: ["UPC / GTIN", "+ CATALOG SET-UP"], kind: "step", col: 2, lane: 0 },
        { id: "po", lines: ["RECEIVE PO 850"], kind: "step", col: 3, lane: 0 },
        { id: "spec?", lines: ["MEETS LABEL +", "PACK SPEC?"], kind: "decision", col: 4, lane: 0 },
        { id: "label", lines: ["GS1-128 LABELS", "+ ROUTING REQUEST"], kind: "step", col: 5, lane: 0 },
        { id: "asn?", lines: ["ASN IN WINDOW?"], kind: "decision", col: 6, lane: 0 },
        { id: "send", lines: ["TRANSMIT 856", "THEN 810"], kind: "terminal", col: 7, lane: 0 },
        { id: "hold", lines: ["HOLD + CORRECT", "BEFORE SHIPMENT"], kind: "step", col: 5, lane: 1 },
        { id: "cb", lines: ["LOG CHARGEBACK"], kind: "step", col: 7, lane: 1 },
        { id: "disp", lines: ["FILE DISPUTE", "WITH PROOF"], kind: "escalation", col: 8, lane: 1 },
      ],
      edges: [
        { from: "acct", to: "guide" },
        { from: "guide", to: "upc" },
        { from: "upc", to: "po" },
        { from: "po", to: "spec?" },
        { from: "spec?", to: "label", label: "yes" },
        { from: "spec?", to: "hold", label: "no" },
        { from: "hold", to: "asn?" },
        { from: "label", to: "asn?" },
        { from: "asn?", to: "send", label: "yes" },
        { from: "asn?", to: "cb", label: "no" },
        { from: "cb", to: "disp" },
      ],
    },
    howItWorks: [
      "Routing guide capture and version control for every account, with one owner.",
      "UPC and catalog maintenance so retailer item set-up does not hold up the first order.",
      "PO receipt and a compliance pre-check against that account's spec.",
      "GS1-128 carton label generation.",
      "Routing request submission and handling of the returned routing instruction.",
      "ASN timing control against each retailer's window.",
      "Invoice transmission.",
      "Chargeback logging, dispute filing with documentation, and root-cause feedback each month.",
    ],
    beforeAfter: [
      { aspect: "Routing guide ownership", before: "Nobody", after: "Cresc, per account" },
      { aspect: "ASN timing", before: "Inconsistent", after: "Inside the window" },
      { aspect: "Chargeback disputes", before: "Rarely filed", after: "Filed with documentation" },
      { aspect: "Label errors", before: "Recurring", after: "Caught pre-shipment" },
      { aspect: "Root cause review", before: "Never", after: "Monthly" },
    ],
    systems: [
      "Client's ERP",
      "EDI VAN",
      "UPC catalog services (GXS, InterTrade and similar)",
      "Retailer vendor portals",
    ],
    outcome:
      "Compliance stopped being something discovered on the remittance and became a check that happens before goods leave the building.",
  },

  {
    slug: "receivables-and-factoring",
    ref: "CS-03",
    sector: "Consumer products wholesaler, US, receivables factored",
    functionArea: "Credit & Accounts Receivable",
    title: "Getting orders off credit hold and cash applied",
    context:
      "Credit approvals sat waiting, so shippable orders were stuck on credit hold. Cash was arriving but not being applied promptly, so the aging report could not be trusted. Collections calls were happening only when someone remembered.",
    metrics: [
      { value: "Same day", label: "Credit hold release" },
      { value: "Cleared daily", label: "Unapplied cash" },
      { value: "Reliable", label: "Aging accuracy" },
      { value: "Daily cycle", label: "Collections contact" },
    ],
    flow: {
      nodes: [
        { id: "order", lines: ["NEW ORDER"], kind: "terminal", col: 0, lane: 0 },
        { id: "check", lines: ["CREDIT CHECK"], kind: "step", col: 1, lane: 0 },
        { id: "fact?", lines: ["FACTORED", "ACCOUNT?"], kind: "decision", col: 2, lane: 0 },
        { id: "submit", lines: ["SUBMIT TO FACTOR"], kind: "step", col: 3, lane: 0 },
        { id: "appr?", lines: ["APPROVED?"], kind: "decision", col: 4, lane: 0 },
        { id: "release", lines: ["RELEASE ORDER"], kind: "step", col: 5, lane: 0 },
        { id: "inv", lines: ["INVOICE +", "FACTOR ASSIGNMENT"], kind: "step", col: 6, lane: 0 },
        { id: "cash", lines: ["CASH RECEIVED", "+ APPLIED"], kind: "step", col: 7, lane: 0 },
        { id: "short?", lines: ["SHORT PAY OR", "DEDUCTION?"], kind: "decision", col: 8, lane: 0 },
        { id: "clean", lines: ["AGING CLEAN"], kind: "terminal", col: 9, lane: 0 },
        { id: "house", lines: ["CHECK HOUSE", "CREDIT LIMIT"], kind: "step", col: 3, lane: 1 },
        { id: "within?", lines: ["WITHIN LIMIT?"], kind: "decision", col: 4, lane: 1 },
        { id: "esc", lines: ["CLIENT SALES", "DECIDES"], kind: "escalation", col: 5, lane: 1 },
        { id: "res", lines: ["RESEARCH +", "LOG DISPUTE"], kind: "step", col: 9, lane: 1 },
      ],
      edges: [
        { from: "order", to: "check" },
        { from: "check", to: "fact?" },
        { from: "fact?", to: "submit", label: "yes" },
        { from: "fact?", to: "house", label: "no" },
        { from: "submit", to: "appr?" },
        { from: "appr?", to: "release", label: "yes" },
        { from: "appr?", to: "esc", label: "no" },
        { from: "house", to: "within?" },
        { from: "within?", to: "esc", label: "no" },
        { from: "release", to: "inv" },
        { from: "inv", to: "cash" },
        { from: "cash", to: "short?" },
        { from: "short?", to: "clean", label: "no" },
        { from: "short?", to: "res", label: "yes" },
      ],
    },
    howItWorks: [
      "Credit checks on new and existing accounts.",
      "Factor submissions and tracking through to a decision.",
      "Approval and decline handling, with declines going straight back to the client's sales team with the options.",
      "House credit limits maintained for non-factored accounts.",
      "The credit hold report worked daily so nothing sits.",
      "Factor assignments.",
      "Cash application against invoices.",
      "Deduction and short-pay research.",
      "Daily aging review and collections contacts, with every conversation logged.",
      "Escalation of unresolved disputes.",
    ],
    beforeAfter: [
      { aspect: "Credit hold releases", before: "Days", after: "Same day" },
      { aspect: "Cash application", before: "In batches", after: "Daily" },
      { aspect: "Aging report trusted", before: "No", after: "Yes" },
      { aspect: "Collections calls", before: "Ad hoc", after: "Daily cycle" },
      { aspect: "Deduction disputes", before: "Unworked", after: "Logged and researched" },
    ],
    systems: [
      "Client's ERP",
      "Factor portal",
      "Banking portal",
      "Excel reporting",
    ],
    outcome:
      "Shippable orders stopped waiting on credit, and the aging report became something the owner could plan cash against.",
  },

  {
    slug: "accounting-and-close",
    ref: "CS-04",
    sector: "Apparel and home textiles importer, US, no in-house accountant",
    functionArea: "Accounting & Bookkeeping",
    title: "Closing the books on time, every month",
    context:
      "The books were running weeks behind. Bank and factor reconciliations were incomplete, so the owner had no reliable view of profitability by season. Year-end became a scramble every time.",
    metrics: [
      { value: "Within days", label: "Month-end close" },
      { value: "Cleared", label: "Backlog" },
      { value: "Monthly, complete", label: "Reconciliations" },
      { value: "Year round", label: "Audit readiness" },
    ],
    flow: {
      nodes: [
        { id: "daily", lines: ["DAILY: AP, AR,", "CASH POSTING"], kind: "terminal", col: 0, lane: 0 },
        { id: "bank", lines: ["RECONCILE", "BANK ACCOUNTS"], kind: "step", col: 1, lane: 0 },
        { id: "factor", lines: ["RECONCILE", "FACTOR STATEMENTS"], kind: "step", col: 2, lane: 0 },
        { id: "inv", lines: ["INVENTORY +", "COST ENTRIES"], kind: "step", col: 3, lane: 0 },
        { id: "var?", lines: ["VARIANCES", "EXPLAINED?"], kind: "decision", col: 4, lane: 0 },
        { id: "close", lines: ["CLOSE CHECKLIST"], kind: "step", col: 5, lane: 0 },
        { id: "stmts", lines: ["P&L +", "BALANCE SHEET"], kind: "step", col: 6, lane: 0 },
        { id: "pack", lines: ["REPORTING PACK"], kind: "terminal", col: 7, lane: 0 },
        { id: "dig", lines: ["INVESTIGATE"], kind: "step", col: 5, lane: 1 },
        { id: "esc", lines: ["CLIENT REVIEWS", "AND CONFIRMS"], kind: "escalation", col: 6, lane: 1 },
      ],
      edges: [
        { from: "daily", to: "bank" },
        { from: "bank", to: "factor" },
        { from: "factor", to: "inv" },
        { from: "inv", to: "var?" },
        { from: "var?", to: "close", label: "yes" },
        { from: "var?", to: "dig", label: "no" },
        { from: "dig", to: "esc" },
        { from: "esc", to: "stmts" },
        { from: "close", to: "stmts" },
        { from: "stmts", to: "pack" },
      ],
    },
    howItWorks: [
      "Daily AP and AR processing.",
      "Cash receipts and disbursements recorded as they happen.",
      "Bank reconciliation every month.",
      "Factor reconciliation every month.",
      "Inventory and cost entries.",
      "Variance investigation, with anything unexplained going back to the client rather than being posted through.",
      "Month-end close checklist.",
      "P&L and balance sheet preparation.",
      "Management reporting pack.",
      "Audit schedule preparation and support for the external auditor.",
    ],
    beforeAfter: [
      { aspect: "Close timing", before: "Weeks late", after: "Within days of month end" },
      { aspect: "Bank reconciliation", before: "Intermittent", after: "Monthly" },
      { aspect: "Factor reconciliation", before: "Not done", after: "Monthly" },
      { aspect: "Profitability view", before: "Unclear", after: "By season and account" },
      { aspect: "Year-end", before: "A scramble", after: "Schedules ready" },
    ],
    systems: [
      "QuickBooks or the client's accounting platform",
      "Client's ERP",
      "Banking portal",
      "Factor statements",
    ],
    outcome:
      "The owner gets a reliable close within days of month end, and year-end stopped being an event.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
