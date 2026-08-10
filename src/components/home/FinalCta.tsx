import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { finalCta } from "@/content/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-brand-700">
      {/* Thin orange rule — a small accent moment against the blue band. */}
      <div aria-hidden="true" className="h-1 w-full bg-accent-500" />
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              {finalCta.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-50">
              {finalCta.body}
            </p>
          </div>
          <Button
            href={finalCta.cta.href}
            variant="onBrand"
            size="lg"
            className="shrink-0"
          >
            {finalCta.cta.label}
            <Icon name="arrow" className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
