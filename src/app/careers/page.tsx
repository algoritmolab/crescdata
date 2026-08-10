import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ControlBar } from "@/components/ui/ControlBar";
import { Lead } from "@/components/ui/Lead";
import { RoleRow } from "@/components/careers/RoleRow";
import { beforeYouApply, careersIntro, roles } from "@/content/roles";
import { logo, site } from "@/content/site";

const description =
  "Back-office careers supporting US importers and wholesalers, from our Bangalore and Coimbatore centers. Order processing, EDI, accounting, customer service and IT roles on the US shift.";

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
        center="Role index"
        right={`${roles.length} open`}
      />

      {/*
        Photographic hero, same treatment as the home page. Fixed heights per
        breakpoint so the section reserves its box and nothing shifts on load.
        The image is mirrored in the asset itself so the in-focus operators sit
        right of the copy block rather than behind it.
      */}
      <section className="relative isolate flex min-h-[440px] items-center overflow-hidden bg-navy sm:min-h-[500px] lg:min-h-[560px]">
        <Image
          src="/images/operations-floor.webp"
          alt=""
          fill
          sizes="100vw"
          className="photo object-cover"
          style={{ objectPosition: "50% 18%" }}
        />
        <div aria-hidden="true" className="photo-tint absolute inset-0" />
        <div aria-hidden="true" className="photo-scrim-left absolute inset-0" />

        <Container className="relative w-full py-14 sm:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-100">
            {careersIntro.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-display text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
            {careersIntro.headline}
          </h1>
          <Lead tone="light" className="mt-6">
            {careersIntro.subhead}
          </Lead>
        </Container>
      </section>

      <Container className="pb-16">
        <section
          aria-labelledby="before-you-apply"
          className="border border-rule bg-surface"
        >
          <h2
            id="before-you-apply"
            className="border-b border-rule px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-label"
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
        <h2 className="flex items-baseline justify-between border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-label">
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
