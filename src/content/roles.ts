/**
 * Open roles.
 *
 * Adding or removing a role is a single edit to `roles`. The shift line and
 * the closing notes are shared constants, so they only ever change in one
 * place and stay identical across every posting.
 */

export const US_SHIFT = "US shift, 6:30 PM–3:30 AM IST, Mon–Fri";

export const APPLY_EMAIL = "resume@crescdata.com";

/** Applied to every role. */
const SHARED_NOTES = [
  "Night shift only. Work timing 6:30 PM to 3:30 AM IST, Monday to Friday. No rotating shifts.",
  `Send your CV to ${APPLY_EMAIL} with the role title in the subject line.`,
];

export type Role = {
  slug: string;
  title: string;
  department: string;
  location: string;
  shift: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  notes: string[];
};

type RoleInput = Omit<Role, "shift" | "notes"> &
  Partial<Pick<Role, "shift" | "notes">>;

const defineRoles = (input: RoleInput[]): Role[] =>
  input.map((role) => ({
    ...role,
    shift: role.shift ?? US_SHIFT,
    notes: role.notes ?? SHARED_NOTES,
  }));

export const roles: Role[] = defineRoles([
  {
    slug: "order-processing-associate",
    title: "Order Processing Associate",
    department: "Supply Chain Operations",
    location: "Bangalore",
    experience: "2–7 years",
    summary:
      "You run the order-to-ship cycle for US apparel importers — entering orders, allocating stock, releasing pick tickets and getting invoices out clean.",
    responsibilities: [
      "Create sales orders",
      "Allocate against inventory",
      "Send pick tickets to the warehouse",
      "Coordinate with warehouses by phone and email",
      "Raise invoices, credit memos and return authorisations",
      "Take credit approvals from factors and banks",
      "Manage inventory records",
      "Coordinate with sales reps and owners",
    ],
    requirements: [
      "2–7 years in order processing or supply chain for US retail accounts",
      "Advanced Excel",
      "Excellent written and spoken US English",
      "Accuracy under deadline pressure",
      "Graduate or postgraduate in any discipline",
    ],
    niceToHave: [
      "Experience with major US retailers such as Walmart, Macy's, Saks, Bloomingdale's or Nordstrom",
      "Hands-on EDI experience with 850, 856 and 810 documents",
    ],
  },
  {
    slug: "ar-collections-specialist",
    title: "AR Collections Specialist",
    department: "Credit & Accounts Receivable",
    location: "Bangalore",
    experience: "2–4 years",
    summary:
      "You keep cash coming in — chasing delinquent B2B accounts, resolving disputes and keeping bad debt down for US clients.",
    responsibilities: [
      "Review the ageing report daily and investigate credits and overpayments",
      "Contact delinquent accounts and resolve discrepancies by phone and email",
      "Keep a full contact log of every conversation",
      "Work the credit hold report and respond to hold alerts so orders release on time",
      "Help establish and maintain credit lines by gathering financial information",
      "Flag key past-due accounts to the supervisor",
      "Cover other AR functions when needed, including billing and account maintenance",
    ],
    requirements: [
      "2–4 years in accounts receivable with strong B2B collections",
      "International collections experience essential",
      "Proficient in Excel",
      "Strong written and spoken English",
      "Calm problem-solver with a customer-service instinct",
      "B.Com, M.Com or MBA Finance preferred",
    ],
  },
  {
    slug: "supply-chain-executive",
    title: "Supply Chain Executive",
    department: "Supply Chain Operations",
    location: "Bangalore",
    experience: "2–6 years",
    summary:
      "You decide how inventory and incoming production get allocated across live customer orders, and keep shippable volume as high as possible.",
    responsibilities: [
      "Analyse customer sales orders and allocate to inventory or production",
      "Flag orders needing extension for production delays",
      "Handle orders hit by factory short shipments or quality issues",
      "Resolve issues across customer, warehouse and sales team",
      "Prioritise the day against inbound freight schedules and shipping goals",
      "Manage inventory daily and resolve factory overages and shortages",
      "Maintain master files and order changes, including cancellations, corrections and bulk adjustments",
      "Check distribution orders against bulked quantities",
      "Process EDI orders and related documents",
      "Run scheduled and ad hoc reports",
    ],
    requirements: [
      "Strong Excel, Word and Outlook",
      "Excellent written and spoken English",
      "Highly organised and detail-focused",
      "Able to hold multiple priorities under pressure",
      "Customer-service background with a flexible approach to deadlines",
    ],
  },
  {
    slug: "analyst-finance-accounts",
    title: "Analyst — Finance & Accounts",
    department: "Finance & Accounting",
    location: "Bangalore",
    experience: "2–6 years",
    summary:
      "You own day-to-day bookkeeping and month-end close for US clients, right through to P&L and balance sheet.",
    responsibilities: [
      "Run daily accounting operations",
      "Process AP, AR, cash receipts, general ledger and payroll entries",
      "Handle bank, factor and capital asset reconciliations",
      "Produce financial reports and statements",
      "Carry out cost, inventory and variance analysis",
      "Support annual audits",
      "Maintain fiscal records",
      "Improve procedures and flag corrective action",
    ],
    requirements: [
      "Proven bookkeeping and accounting experience",
      "Working knowledge of QuickBooks or equivalent",
      "Strong MS Office and comfort handling large data sets",
      "Sound grasp of accounting principles and standards",
      "Excellent written and spoken US English",
      "B.Com, M.Com, MBA Finance, ICWA, CS or CA Inter",
    ],
    niceToHave: [
      "Audit-firm background handling books for several small and mid-size companies",
      "Prior US market or BPO experience",
    ],
  },
  {
    slug: "analyst-supply-chain",
    title: "Analyst — Supply Chain Management",
    department: "Supply Chain Operations",
    location: "Bangalore",
    experience: "0–2 years",
    summary:
      "An entry route into apparel supply chain work. You process live client transactions and grow into owning the day-to-day relationship.",
    responsibilities: [
      "Process and maintain data accurately to deadline",
      "Liaise with clients, warehouses and factors to resolve data queries",
      "Build expertise in recurring data issues",
      "Maintain data quality, accuracy and completeness to client standards",
      "Identify and fix data problems before they escalate",
      "Follow change control and data operating procedures",
      "Support projects as assigned",
    ],
    requirements: [
      "Any graduate or postgraduate with strong communication skills",
      "0–2 years experience",
      "Excellent written and spoken English",
    ],
    niceToHave: ["Prior BPO or similar operations experience"],
  },
  {
    slug: "customer-service-executive",
    title: "Customer Service Executive",
    department: "Customer Service",
    location: "Bangalore",
    experience: "2+ years",
    summary:
      "You are the link between US customers, the sales team, the warehouse and everyone else in the order chain.",
    responsibilities: [
      "Manage customer relationships day to day",
      "Close out unwanted and partially fulfilled purchase orders",
      "Work with the warehouse on smooth shipment and resolve PO mismatches and overages",
      "Keep customers updated on shipping schedules, pricing, product availability, documentation and sample requests",
      "Coordinate order and shipping updates with the sales team",
      "Track shipments through to delivery",
    ],
    requirements: [
      "At least two years in customer relations, sales support or order processing",
      "Excellent written and spoken US English",
      "Strong Excel and analytical skills",
      "Detail-focused and comfortable multitasking",
      "Able to handle difficult conversations calmly",
      "Good cultural and geographic understanding of the US market",
    ],
    niceToHave: [
      "Garment merchandising, fashion or buying house background",
      "A degree in garment merchandising or fashion with apparel industry experience",
    ],
  },
  {
    slug: "software-developer",
    title: "Software Developer",
    department: "Technology",
    location: "Bangalore",
    experience: "2–7 years",
    summary:
      "You build and maintain the applications our operations teams run on, and help shape what we build next.",
    responsibilities: [
      "Work with senior managers to design, build and deploy applications",
      "Own delivery of a significant part of a system",
      "Manage your work against project plans and delivery commitments",
      "Write and run test plans and quality checks",
    ],
    requirements: [
      "HTML, CSS, JavaScript and jQuery",
      "PHP and MySQL",
      "SQL",
      "Solid object-oriented programming",
    ],
    niceToHave: [
      "MVC architecture",
      "A PHP framework",
      "A modern JavaScript framework",
      "SQL Server",
      "REST APIs",
      "Web server management",
    ],
  },
  {
    slug: "system-administrator",
    title: "System Administrator",
    department: "IT Infrastructure",
    location: "Bangalore",
    experience: "1–2 years",
    summary:
      "You keep the servers, networks and phone systems running so operations never stop mid-shift.",
    responsibilities: [
      "Install, rebuild and configure servers, hardware and services to standard",
      "Write and maintain installation and configuration procedures",
      "Monitor systems daily and verify backups and scheduled jobs complete",
      "Run backup operations and manage offsite media",
      "Manage user accounts",
      "Troubleshoot and resolve hardware and software failures",
      "Support staff requests",
    ],
    requirements: [
      "1–2 years in system administration",
      "Sound technical and computing knowledge",
      "Microsoft Active Directory essential",
      "Experience with an IP PBX system such as Grandstream",
      "Strong Remote Desktop and remote troubleshooting skills",
      "Good communication skills",
    ],
  },
]);

export const careersIntro = {
  eyebrow: "Careers",
  headline: "Work on the operations behind US apparel.",
  subhead:
    "Our teams in Bangalore and Coimbatore run live back-office operations for apparel importers in the United States. The work is real, the deadlines are real, and you learn an industry properly.",
} as const;

export const beforeYouApply: string[] = [
  "All roles run on the US shift, 6:30 PM to 3:30 AM IST, Monday to Friday. No rotating shifts.",
  "You will work directly with US clients, warehouses and factors, so strong written and spoken English matters.",
  "Offices: Bangalore (New BEL Road and RMV 2nd Stage) and Coimbatore (KCT Tech Park).",
];

export function getRole(slug: string): Role | undefined {
  return roles.find((role) => role.slug === slug);
}
