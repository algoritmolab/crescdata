/**
 * White paper library.
 *
 * Adding a document is a single edit: append an entry below. Available papers
 * need `sections`; forthcoming ones need only title, summary, topic and ref.
 * The barcode mark is derived from `docRef`, so nothing else is needed to give
 * a new paper its own pattern.
 */

export type Topic =
  | "Compliance"
  | "EDI"
  | "Operations"
  | "Imports"
  | "Finance";

export type Status = "available" | "forthcoming";

export type Block =
  | { kind: "para"; text: string }
  | { kind: "subhead"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "checklist"; title: string; items: string[] }
  | { kind: "table"; title: string; rows: { label: string; value: string }[] }
  | { kind: "quote"; kicker: string; text: string };

export type Section = {
  /** Anchor id, also used by the contents rail. */
  id: string;
  heading: string;
  blocks: Block[];
};

export type WhitePaper = {
  slug: string;
  docRef: string;
  title: string;
  summary: string;
  topic: Topic;
  /** ISO date. Rendered through formatFiledDate so it never varies by locale. */
  filedDate: string;
  readTime?: string;
  status: Status;
  whoItsFor?: string;
  /** Exactly one paper should carry this; it takes the top slot on the index. */
  featured?: boolean;
  /**
   * Number the section headings. Only true where the content is a genuine
   * sequence of steps. None of the current papers are: they are analytical,
   * so numbering would imply an order that isn't there.
   */
  numberSections?: boolean;
  sections?: Section[];
};

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

/** "2025-04-22" -> "22 APR 2025". Fixed output, no locale dependency. */
export function formatFiledDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d} ${MONTHS[Number(m) - 1]} ${y}`;
}

export const whitePapers: WhitePaper[] = [
  {
    slug: "retailer-chargebacks",
    docRef: "CD-011",
    title: "The Hidden Cost of Retailer Chargebacks — and How to Cut Them",
    summary:
      "Where apparel importers lose margin to compliance errors, and a practical framework to reduce it.",
    topic: "Compliance",
    filedDate: "2025-04-22",
    readTime: "9 min",
    status: "available",
    whoItsFor:
      "Operations and finance leaders who see deductions on their remittances and cannot say what is causing them.",
    featured: true,
    sections: [
      {
        id: "cost",
        heading: "What deductions actually cost",
        blocks: [
          {
            kind: "para",
            text: "Most importers know their chargeback number as a line on a remittance. It arrives net. The retailer pays the invoice less a deduction, sometimes with a code, sometimes with nothing more than a reference number. By the time it reaches finance the shipment is weeks old and the person who packed it has moved on to the next season.",
          },
          {
            kind: "para",
            text: "Total compliance deductions commonly sit somewhere between 1% and 3% of gross shipped value for importers without tight controls. Well-run vendors keep the figure under 0.5%. The gap between those two numbers is worth more than most cost reduction projects. On $40m of shipped value, moving from 2% to 0.5% is $600,000 a year, and it is margin you have already earned once.",
          },
          {
            kind: "para",
            text: "Two things keep the number out of sight. Deductions are netted off payment rather than invoiced, so they never arrive as a cost anyone has to approve. And they are spread across a dozen small codes rather than one large one. A $340 late ASN charge does not trigger a review. Four hundred of them would, but nobody adds them up.",
          },
          {
            kind: "table",
            title: "Common deduction categories",
            rows: [
              {
                label: "Late or missing ASN (856)",
                value: "Highest volume cause",
              },
              {
                label: "GS1-128 carton label errors",
                value: "High volume, low value each",
              },
              {
                label: "Carton contents do not match the ASN",
                value: "Often triggers a full audit",
              },
              {
                label: "Routing or carrier violation",
                value: "High value per occurrence",
              },
              {
                label: "Shipped outside the ship window",
                value: "High value per occurrence",
              },
              {
                label: "Invoice does not match the order",
                value: "Usually recoverable",
              },
            ],
          },
        ],
      },
      {
        id: "causes",
        heading: "Why the money leaks",
        blocks: [
          {
            kind: "para",
            text: "The routing guide is the root of most of it. Every major retailer publishes one and every one of them changes: a new label placement, a revised ASN window, a different carrier for a region, a lower carton weight limit. The guide is a PDF in somebody's inbox. When a revision lands, nobody re-reads the whole document. They read the summary email and assume the rest is unchanged.",
          },
          { kind: "subhead", text: "The ASN is built from the wrong data" },
          {
            kind: "para",
            text: "The 856 should describe what is physically in the cartons. In a lot of operations it describes what was supposed to be in them, because it is generated from the sales order rather than from scanned pack data. Everything matches on paper until the retailer's DC scans a carton and finds eleven units where the ASN promised twelve.",
          },
          { kind: "subhead", text: "Timing is tighter than people assume" },
          {
            kind: "para",
            text: "Most retailers want the 856 transmitted before the goods arrive, and several want it within a fixed window after the shipment leaves your dock. If your ASN goes out at the end of the day and the truck left at eleven that morning, you are late on paper even though the shipment itself is early.",
          },
          { kind: "subhead", text: "Nobody owns the deduction file" },
          {
            kind: "para",
            text: "Disputes have deadlines. Depending on the retailer you generally have between 30 and 90 days from the deduction date to challenge it with evidence. Recovering a valid dispute takes perhaps twenty minutes of work. Missing the window costs the whole amount. In most back offices this work sits between finance, who see the deduction, and operations, who hold the evidence, and it falls down the gap between them.",
          },
        ],
      },
      {
        id: "fixes",
        heading: "What to do about it",
        blocks: [
          {
            kind: "checklist",
            title: "A working control set",
            items: [
              "Treat each retailer's routing guide as a controlled document: one named owner, a dated version on file, and a short written note of what changed at each revision.",
              "Generate the 856 from scanned pack data rather than from the sales order.",
              "Validate GS1-128 labels at the point of pack, so a bad label is caught at the bench and not at the retailer's door.",
              "Book routing requests against the cut-off in the guide, not against your own planned ship date.",
              "Log every deduction in a register: retailer, date, value, code, shipment, and a root cause someone has actually confirmed.",
              "Keep a standard evidence pack ready for disputes: bill of lading, proof of delivery, ASN transmission timestamp, the 997 acknowledgement, and a photograph of the carton label.",
              "Review the top three root causes every week and fix the process, not the individual charge.",
            ],
          },
          {
            kind: "para",
            text: "The register is the part people skip and the part that pays. Without it you are arguing about individual charges as they arrive. With it you can see that 60% of last quarter's deduction value came from one cause at one distribution centre, which is a problem you can actually solve.",
          },
          {
            kind: "quote",
            kicker: "Note",
            text: "A deduction you dispute successfully is money back. A deduction you prevent is money you never had to chase. The register tells you which of the two you should be working on.",
          },
        ],
      },
      {
        id: "benchmark",
        heading: "What good looks like",
        blocks: [
          {
            kind: "list",
            items: [
              "Deduction value tracked as a percentage of shipped value, by retailer, reviewed monthly by someone senior enough to change a process.",
              "ASN transmitted on time for more than 99% of shipments, measured against the retailer's window rather than your own ship date.",
              "A named owner for each retailer's compliance requirements, with the current routing guide version recorded.",
              "Disputes raised inside the window as routine weekly work, not as a quarterly clean-up.",
              "Root cause recorded for every deduction above a set value, with a short monthly summary of what was fixed.",
            ],
          },
          {
            kind: "para",
            text: "None of that needs new software. It needs the work to be someone's job, done in the same rhythm every week. The importers who keep deductions under half a percent are not running better systems than everyone else. They are running the same systems with someone watching them.",
          },
        ],
      },
      {
        id: "cresc",
        heading: "Where we fit",
        blocks: [
          {
            kind: "para",
            text: "We run this work for apparel importers as part of the back office: ASN generation and transmission monitoring, label validation, the deduction register, and disputes filed against each retailer's deadline. If you already have the controls above and they are holding, you do not need us for this. If you know the number is too high and nobody has the time to own it, that is the conversation worth having.",
          },
        ],
      },
    ],
  },

  {
    slug: "edi-buyers-guide",
    docRef: "CD-012",
    title: "EDI Without the Headaches: A Buyer's Guide for Apparel Importers",
    summary:
      "What 850/810/856 really require, and how to keep documents clean at scale.",
    topic: "EDI",
    filedDate: "2025-07-15",
    readTime: "10 min",
    status: "available",
    whoItsFor:
      "Anyone selecting an EDI provider, or inheriting a set-up that keeps failing at the worst moment.",
    sections: [
      {
        id: "documents",
        heading: "The documents, and what they are for",
        blocks: [
          {
            kind: "para",
            text: "EDI has a reputation for complexity that the document set does not deserve. For most apparel importers the working set is small and stable.",
          },
          {
            kind: "table",
            title: "The working set",
            rows: [
              { label: "850", value: "Purchase order from the retailer" },
              { label: "855", value: "Your acknowledgement of that order" },
              { label: "860", value: "The retailer changing the order" },
              { label: "856", value: "Advance ship notice, sent at despatch" },
              { label: "810", value: "Invoice" },
              { label: "820", value: "Remittance, including deductions" },
              { label: "997", value: "Proof a document actually arrived" },
              { label: "832", value: "Price and product catalogue" },
              { label: "852", value: "Sell-through by store" },
              { label: "846", value: "Inventory availability" },
            ],
          },
          {
            kind: "para",
            text: "Six of those carry the order to cash cycle. The 997 is the one people ignore, and it is the one that tells you whether any of the others arrived at all.",
          },
          {
            kind: "para",
            text: "The 820 deserves more attention than it usually gets. It is the remittance, and it carries the deduction detail alongside the payment. If your AR process treats it as a payment file and discards the rest, you have thrown away the only structured record of what the retailer has taken off you and why. Load the deduction lines, code them, and you have most of a chargeback register without any extra work.",
          },
        ],
      },
      {
        id: "problems",
        heading: "Where EDI set-ups go wrong",
        blocks: [
          { kind: "subhead", text: "The mapping is not the hard part" },
          {
            kind: "para",
            text: "Translating a file format is a solved problem. Any provider can map an 850. The work that takes the time is master data: making sure a style, colour and size in your system matches the item the retailer thinks they ordered, that the UPC on the carton matches the GTIN on the 856, that the ship-to location code points at the right DC, and that your vendor number is correct for the division placing the order. Get that wrong and the documents will transmit perfectly and still fail.",
          },
          { kind: "subhead", text: "The ASN has to match the cartons" },
          {
            kind: "para",
            text: "An 856 is hierarchical: shipment, then order, then pack, then item. The pack level carries the SSCC-18 printed on the GS1-128 label on the carton. If the hierarchy says a carton holds six of one style and four of another, that carton needs to hold exactly that. Most ASN failures start here, and it is a warehouse process problem wearing an EDI costume.",
          },
          { kind: "subhead", text: "Item set-up causes more delay than mapping" },
          {
            kind: "para",
            text: "A retailer will not send you an 850 for an item their system does not recognise. Before a single order flows, the style has to exist on their side with the right item number, the right UPC at each colour and size, the right pack configuration and the right price. That set-up runs on the retailer's calendar, not yours, and it is frequently the reason a launch slips. Build it into the plan as a dated task with an owner rather than assuming it happens alongside the technical work.",
          },
          { kind: "subhead", text: "Nobody watches the acknowledgements" },
          {
            kind: "para",
            text: "If a retailer's system rejects your 810 you find out either from a 997 or from the fact that you have not been paid. One of those is considerably faster. Checking that every outbound document has a matching acknowledgement takes a few minutes a day and catches problems while they are still small enough to fix quietly.",
          },
          { kind: "subhead", text: "Specifications change without much warning" },
          {
            kind: "para",
            text: "A new label requirement, a changed segment, a different qualifier on an existing field. If your provider treats every change as a chargeable project with a two week lead time, you will be late, and being late here means deductions.",
          },
          {
            kind: "quote",
            kicker: "Note",
            text: "If someone is retyping an order that arrived electronically, you do not have EDI. You have a fax machine with better formatting.",
          },
        ],
      },
      {
        id: "choosing",
        heading: "Choosing a provider",
        blocks: [
          {
            kind: "checklist",
            title: "Questions worth asking before you sign",
            items: [
              "How is pricing structured: per document, per kilocharacter, or a flat fee? Model it against your peak month, not your average month.",
              "Who makes map changes when a retailer changes a specification, how long does it take in practice, and is it included?",
              "What is the testing and certification process for adding a retailer, and how long does it usually run?",
              "What are your support hours measured against our cut-off times, including through our peak season?",
              "Do we get visibility of 997s and rejections without having to ask for a report?",
              "What happens to our maps and our data if we leave?",
              "Is the connection AS2, a VAN, or a web portal, and what does that mean for cost as volume grows?",
            ],
          },
          {
            kind: "para",
            text: "Web EDI is fine at low volume. It stops being fine the moment someone is re-keying orders from a browser into your ERP, because that is where errors begin and it does not survive a peak. If you are adding retailers, ask what the third and fourth connection cost, not just the first.",
          },
          {
            kind: "para",
            text: "Be careful with implementation timelines. A provider quoting four weeks to connect a new retailer is usually quoting their own technical work, which is the short part. Add the retailer's testing queue, item set-up, and a round of corrections after the first live orders. Eight to twelve weeks from decision to steady state is a more realistic plan for a first connection, and it shortens considerably once your data is clean and your team has done it once.",
          },
        ],
      },
      {
        id: "benchmark",
        heading: "What good looks like",
        blocks: [
          {
            kind: "list",
            items: [
              "Orders flow from the 850 into the order book without re-keying, with an exception queue for anything that fails validation.",
              "ASNs are generated from scanned pack data and transmitted inside each retailer's window.",
              "Every outbound document is reconciled against its 997 daily.",
              "UPC and price data agree across your item master, the 832 and the 810, so invoices do not fail on price.",
              "Someone can explain on one page which documents you exchange with which retailer, and who fixes it when one breaks.",
            ],
          },
        ],
      },
      {
        id: "cresc",
        heading: "Where we fit",
        blocks: [
          {
            kind: "para",
            text: "We run EDI day to day for apparel importers: UPC and item maintenance, the 850 through 810 cycle, ASN generation against retailer windows, GS1-128 labelling, and acknowledgement monitoring. We work with whichever provider you already have. If you are still choosing one, the questions above are the ones we would ask on your behalf.",
          },
        ],
      },
    ],
  },

  {
    slug: "in-house-vs-outsourced",
    docRef: "CD-013",
    title: "In-House vs Outsourced Back Office: A True Cost Breakdown",
    summary:
      "A clear-eyed comparison of staffing, systems and error costs, including where outsourcing does not help.",
    topic: "Operations",
    filedDate: "2025-11-04",
    readTime: "9 min",
    status: "available",
    whoItsFor:
      "Finance leaders building a business case, and operations leaders who will have to live with the answer.",
    sections: [
      {
        id: "visible",
        heading: "The cost you can see",
        blocks: [
          {
            kind: "para",
            text: "A back office team of six looks like a simple sum: six salaries, some software, a bit of desk space. That is the sum most comparisons start and finish with, and it is usually about half the real number.",
          },
          {
            kind: "table",
            title: "Direct cost lines, per head, per year",
            rows: [
              { label: "Base salary", value: "By role and location" },
              { label: "Employment on-costs", value: "Typically 25% to 35%" },
              { label: "Software and licences", value: "ERP seat, EDI fees" },
              { label: "Space and equipment", value: "Desk, hardware, telephony" },
              { label: "Recruitment", value: "Spread over expected tenure" },
            ],
          },
          {
            kind: "para",
            text: "On-costs are the first thing left out. Payroll taxes, health cover, paid leave and the employer's share of everything else commonly add a quarter to a third on top of base salary in the US. A $65,000 order entry role is closer to $85,000 before anyone has bought a licence for them to use.",
          },
          {
            kind: "para",
            text: "Software is the second. ERP seats are usually counted, but EDI charges are often billed per document or per kilocharacter, which means they rise with volume rather than with headcount. If you are comparing options across a growing order book, model those fees against next year's transaction count, not last year's invoice.",
          },
        ],
      },
      {
        id: "hidden",
        heading: "The cost you cannot",
        blocks: [
          { kind: "subhead", text: "Turnover" },
          {
            kind: "para",
            text: "Back office roles turn over. Replacing someone costs advertising and agency fees, the hiring manager's time, and then several months in which the new person works more slowly and makes more mistakes than the person who left. Estimates of total replacement cost vary a great deal, but 20% to 50% of annual salary is a reasonable planning range for roles of this kind.",
          },
          { kind: "subhead", text: "Time to competence" },
          {
            kind: "para",
            text: "An order entry or EDI role in apparel is not learned in a week. Style, colour and size structures, retailer quirks, routing rules, and the fifty small conventions your business runs on take months to absorb. Three to six months to full productivity is normal. If your peak is four months away, hiring now is already tight.",
          },
          { kind: "subhead", text: "Cover" },
          {
            kind: "para",
            text: "One person who understands the ASN process is a risk, not a resource. Holiday, illness and resignation all have a habit of landing in the same week as a ship window. Cover costs you either a second trained person or a missed deadline, and the second option is rarely cheaper.",
          },
          { kind: "subhead", text: "Management time" },
          {
            kind: "para",
            text: "Someone supervises this team, handles the exceptions, chases the retailer portal that has locked everyone out, and rewrites the rota when two people are off. That person is usually senior and usually expensive, and their time rarely appears in the comparison because their salary is already booked somewhere else. Estimate the share of their week honestly and put it in the model.",
          },
          { kind: "subhead", text: "Errors" },
          {
            kind: "para",
            text: "Errors have a price, and it is almost never booked against the team that caused them. Chargebacks, credit notes, re-shipments, the working capital cost of an invoice sitting unpaid because it was raised late, and the cost of a month-end that closes a week after it should.",
          },
        ],
      },
      {
        id: "comparison",
        heading: "Building a fair comparison",
        blocks: [
          {
            kind: "checklist",
            title: "What a defensible comparison includes",
            items: [
              "Every direct cost line above, for every role in scope.",
              "On-costs at your actual loaded rate rather than base salary.",
              "A turnover assumption taken from your own history, not an industry average.",
              "The cost of cover through holiday, sickness and peak.",
              "A value for errors: last year's deductions, credit notes and rework.",
              "A per-unit denominator, so the two options stay comparable as volume moves.",
            ],
          },
          {
            kind: "para",
            text: "The denominator matters more than the total. Cost per order line, per invoice, per carton or per active retailer will tell you things a monthly total cannot. It shows you what happens when volume doubles in September, and it gives you a number to hold a provider to once you have signed.",
          },
          {
            kind: "para",
            text: "Include the cost of moving, and be realistic about it. A transition runs three to six months for a full back office, and for part of that you are paying twice: your existing team is still running the work while the incoming team learns it. Skipping the overlap to save money is the most common way these moves go wrong, because the knowledge transfer never actually happens and the errors arrive later at a worse moment.",
          },
          {
            kind: "quote",
            kicker: "Note",
            text: "Compare cost per unit of work, not headcount against monthly fee. Headcount is what you buy. Throughput is what you actually need.",
          },
        ],
      },
      {
        id: "limits",
        heading: "When outsourcing does not help",
        blocks: [
          {
            kind: "para",
            text: "It is worth being straight about this. Outsourcing a back office works when the work is high volume, rule-based and repeating. It works particularly well when volume is seasonal, because you stop paying for peak capacity through twelve months of the year.",
          },
          {
            kind: "para",
            text: "It works badly in three situations. When nobody on your side owns the relationship, decisions stall and the provider fills the silence with guesses. When a process genuinely lives in one person's head and has never been written down, moving it just relocates the risk. And when work needs constant judgement rather than consistent execution, an outside team will always be slower than the person sitting next to the merchandiser.",
          },
          {
            kind: "para",
            text: "For most importers the honest answer is that some of it should move and some of it should not. Order processing, EDI, invoicing, AR administration and bookkeeping travel well. Allocation calls, key account relationships and anything that involves arguing with a buyer usually do not.",
          },
        ],
      },
      {
        id: "cresc",
        heading: "Where we fit",
        blocks: [
          {
            kind: "para",
            text: "We run the parts that travel well, and we will say so when something is better kept in-house. If you want to build the comparison above against your own numbers, ask us for the cost lines we would use and fill them in yourself. It is a more useful starting point than a proposal.",
          },
        ],
      },
    ],
  },

  {
    slug: "scaling-with-your-season",
    docRef: "CD-014",
    title: "Building a Back Office That Scales With Your Season",
    summary:
      "How to handle demand peaks without over-hiring or sacrificing accuracy.",
    topic: "Operations",
    filedDate: "2026-03-17",
    readTime: "9 min",
    status: "available",
    whoItsFor:
      "Operations leaders who know which ten weeks of the year hurt, and want a plan before the next one.",
    sections: [
      {
        id: "pressure",
        heading: "What peak does to a back office",
        blocks: [
          {
            kind: "para",
            text: "Apparel volume has never been flat. Order intake clusters, ship windows cluster behind it, and month-end arrives on the same date regardless. For most importers the busiest ten weeks of the year carry two or three times the volume of a quiet week.",
          },
          {
            kind: "para",
            text: "The pressure does not land evenly, and it fails in a predictable sequence.",
          },
          {
            kind: "list",
            items: [
              "Order entry goes first. A backlog of unentered orders hides the true order book, and allocation decisions get made on incomplete data.",
              "ASN timing goes next, because packing runs late into the evening and the 856 goes out the following morning, outside the window.",
              "Invoicing slips, because the team is busy shipping. AR ages and cash arrives later than the forecast promised.",
              "Factor approvals get requested late, which means either shipping against an unapproved balance or holding goods that are ready to go.",
              "Month-end takes longer, because four weeks of unresolved exceptions are still open when it starts.",
            ],
          },
          {
            kind: "para",
            text: "By the time the season ends, the cost of peak has been spread across deductions, late cash and a tired team, and none of it is labelled as the cost of peak.",
          },
        ],
      },
      {
        id: "hiring",
        heading: "Why hiring for peak rarely works",
        blocks: [
          {
            kind: "para",
            text: "The arithmetic does not work. If a competent order entry person takes three to six months to reach full speed and your peak runs for ten weeks, anyone hired for peak is still learning when it ends. You pay the recruitment cost, the training cost and the error cost, and then you either carry the headcount through a quiet season or let them go and pay it all again next year.",
          },
          {
            kind: "para",
            text: "Temporary staff have the same problem on a shorter clock. They can handle genuinely simple tasks under close supervision, but the supervision comes out of your experienced people, who are the constraint you were trying to relieve in the first place.",
          },
        ],
      },
      {
        id: "model",
        heading: "Building capacity you can flex",
        blocks: [
          { kind: "subhead", text: "Separate routine from judgement" },
          {
            kind: "para",
            text: "Go through the work and split it in two. Routine work follows a rule and produces the same answer whoever does it: order entry from an 850, invoice generation, label validation, cash application against a remittance. Judgement work needs context: which account gets the short supply, whether to push a ship date, how hard to argue a deduction. Routine work can move to a larger flexible team. Judgement work should stay close to the business.",
          },
          { kind: "subhead", text: "Write the routine work down" },
          {
            kind: "para",
            text: "Not a policy document. A working instruction with the actual screens, the actual codes and the actual exceptions. If a competent person cannot follow it without asking a question, it is not finished. This is the piece that makes flexing possible, and the piece that never gets done because it is nobody's priority in a quiet month.",
          },
          { kind: "subhead", text: "Build a capacity model" },
          {
            kind: "para",
            text: "Measure throughput for each routine task: order lines entered per person per day, invoices processed, cartons validated. Multiply by forecast volume by week. You now have a staffing requirement by week rather than a feeling that September will be difficult. It also sizes the bench you need on standby, which is a far cheaper thing to arrange than a hire.",
          },
          { kind: "subhead", text: "Cross-train outside peak" },
          {
            kind: "para",
            text: "A bench only works if the people on it have done the task recently. Rotate someone through each routine process during the quiet months and let them run it properly for a week, not shadow it for an afternoon. It costs a little throughput in February and it is the difference between adding capacity in September and adding another person to train.",
          },
          { kind: "subhead", text: "Agree service levels by document type" },
          {
            kind: "para",
            text: "Orders entered within a set number of working hours of receipt. ASN transmitted before the retailer's window closes. Invoice raised the same day as shipment. Deductions logged within a week. These are the things that break in peak, so they are the things worth writing down before it starts rather than during it.",
          },
          {
            kind: "checklist",
            title: "Before the season starts",
            items: [
              "A volume forecast by week, shared eight to twelve weeks ahead and updated when it moves.",
              "A written cut-off calendar covering routing requests, ship windows, invoicing and month-end.",
              "Working instructions for every routine task, current enough to hand to someone new.",
              "A capacity model that turns forecast volume into people by week.",
              "Named cover for every critical task, tested at least once outside peak.",
              "Agreed service levels and an escalation route that does not depend on one person answering their phone.",
            ],
          },
        ],
      },
      {
        id: "benchmark",
        heading: "What good looks like",
        blocks: [
          {
            kind: "list",
            items: [
              "Forecasts arrive early enough to act on, and get updated when they change.",
              "Team size moves with the season without a hiring round.",
              "Order entry stays inside its service level in the busiest week of the year.",
              "ASN on-time performance does not dip in peak. This is the clearest single sign that the back office is holding.",
              "Month-end takes the same number of days in October as it does in February.",
            ],
          },
          {
            kind: "para",
            text: "The last one is a good test. If your close gets longer in peak, exceptions are not being cleared as they arise, and they will keep compounding into the following quarter.",
          },
        ],
      },
      {
        id: "cresc",
        heading: "Where we fit",
        blocks: [
          {
            kind: "para",
            text: "This shape of work is what we are built for. Our teams flex with the season, the routine work is documented because it has to be, and capacity is planned against your forecast rather than found at the last minute. If you would rather start with the capacity model than a proposal, that is usually the more useful conversation.",
          },
        ],
      },
    ],
  },

  {
    slug: "import-management-101",
    docRef: "CD-015",
    title: "Import Management 101: POs, Shipments and Letters of Credit",
    summary:
      "A back-to-basics guide to a tightly run import desk.",
    topic: "Imports",
    filedDate: "2026-06-09",
    status: "forthcoming",
  },

  {
    slug: "factor-management",
    docRef: "CD-016",
    title: "Factor Management Made Simple for Apparel Importers",
    summary:
      "Credit approvals, assignment and cash application, without the month-end scramble.",
    topic: "Finance",
    filedDate: "2026-07-28",
    status: "forthcoming",
  },
];

export const availablePapers = whitePapers.filter(
  (p) => p.status === "available",
);

export const featuredPaper =
  whitePapers.find((p) => p.featured) ?? availablePapers[0];

export function getPaper(slug: string): WhitePaper | undefined {
  return whitePapers.find((p) => p.slug === slug);
}

/** Ordering used by the index and by previous/next on the detail pages. */
export const orderedPapers = whitePapers;
