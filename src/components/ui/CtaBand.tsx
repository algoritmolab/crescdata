import { Container } from "./Container";
import { Button } from "./Button";

/** Restrained blue band used to close a page. */
export function CtaBand({
  heading,
  body,
  label = "Get in touch",
  href = "/contact",
}: {
  heading: string;
  body: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="bg-brand-700">
      <Container className="py-14 sm:py-16">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-3 leading-relaxed text-brand-50">{body}</p>
          </div>
          <Button href={href} variant="onBrand" size="lg" className="shrink-0">
            {label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
