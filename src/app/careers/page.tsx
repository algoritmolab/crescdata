import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ControlBar } from "@/components/ui/ControlBar";
import { RoleRow } from "@/components/careers/RoleRow";
import { beforeYouApply, careersIntro, roles } from "@/content/roles";
import { logo, site } from "@/content/site";

const description =
  "Back-office careers supporting US apparel importers, from our Bangalore and Coimbatore centres. Order processing, EDI, accounting, customer service and IT roles on the US shift.";

export const metadata: Metadata = {
  title: "Careers",
  description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `Careers — ${site.name}`,
    description,
    url: `${site.url}/careers`,
    images: [
      { url: logo.src, width: logo.width, height: logo.height, alt: site.name },
    ],
  },
};

export default function CareersPage() {
  return (
    <div className="bg-paper">
      <ControlBar
        left={site.name}
        centre="Role index"
        right={`${roles.length} open`}
      />

      <Container className="pt-14 pb-14 sm:pt-20 sm:pb-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {careersIntro.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.045em] text-navy sm:text-6xl lg:text-7xl">
          {careersIntro.headline}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
          {careersIntro.subhead}
        </p>
      </Container>

      <Container className="pb-16">
        <section
          aria-labelledby="before-you-apply"
          className="border border-rule bg-surface"
        >
          <h2
            id="before-you-apply"
            className="border-b border-rule px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
          >
            Before you apply
          </h2>
          <ul className="divide-y divide-rule">
            {beforeYouApply.map((item) => (
              <li key={item} className="relative py-4 pl-12 pr-6">
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-[1.45rem] h-[6px] w-[6px] bg-rule"
                />
                <span className="text-[0.95rem] leading-relaxed text-ink-soft">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-24 sm:pb-28">
        <h2 className="flex items-baseline justify-between border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span>Index</span>
          <span>
            {roles.length} open {roles.length === 1 ? "role" : "roles"}
          </span>
        </h2>
        <ul>
          {roles.map((role) => (
            <RoleRow key={role.slug} role={role} />
          ))}
        </ul>
      </Container>
    </div>
  );
}
