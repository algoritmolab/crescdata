import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { servicesSummary } from "@/content/site";

export function ServicesSummary() {
  return (
    <Section>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="What we do"
          title="Everything behind the order, handled end to end."
          intro="Six connected service lines that cover the full cycle — from the moment an order lands to the month-end financials."
        />
        <Button href="/services" variant="secondary" className="shrink-0">
          View all services
          <Icon name="arrow" className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicesSummary.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="group flex flex-col rounded-2xl border border-hairline bg-surface p-7 transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
          >
            <h3 className="text-base font-semibold text-ink">
              {service.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
              {service.body}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
              Learn more
              <Icon
                name="arrow"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
