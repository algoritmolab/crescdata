import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { finalCta } from "@/content/site";

export function FinalCta() {
  return (
    <section className="bg-accent-500">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-brand-950 sm:text-4xl">
              {finalCta.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-900/85">
              {finalCta.body}
            </p>
          </div>
          <Button
            href={finalCta.cta.href}
            variant="onAccent"
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
