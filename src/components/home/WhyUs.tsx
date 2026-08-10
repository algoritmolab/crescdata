import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { whyUs } from "@/content/site";

export function WhyUs() {
  return (
    <Section tone="subtle">
      <SectionHeading
        eyebrow="Why Cresc Datasoft"
        title="A back office team that already speaks your language."
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-hairline bg-surface p-7 transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Icon name={item.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-base font-semibold text-ink">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
