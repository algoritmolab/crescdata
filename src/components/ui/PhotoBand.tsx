import Image from "next/image";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

/**
 * Full-width photographic band with a single line of copy at its foot.
 *
 * Carries the shared photo treatment (.photo, .photo-tint, .photo-scrim-*)
 * so any future band inherits the same look automatically. The wrapper has a
 * fixed height at every breakpoint, so the band reserves its space and the
 * page never shifts when the image arrives.
 */
export function PhotoBand({
  src,
  alt,
  eyebrow,
  objectPosition = "50% 50%",
  className,
  children,
}: {
  src: string;
  /** Descriptive where the photo carries meaning; "" where it is decorative. */
  alt: string;
  eyebrow?: string;
  objectPosition?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn("relative isolate overflow-hidden bg-navy", className)}
    >
      <div className="relative h-[300px] sm:h-[360px] lg:h-[420px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="photo object-cover"
          style={{ objectPosition }}
        />
        <div aria-hidden="true" className="photo-tint absolute inset-0" />
        <div
          aria-hidden="true"
          className="photo-scrim-bottom absolute inset-0"
        />

        <Container className="relative flex h-full items-end pb-9 sm:pb-12">
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-100">
                {eyebrow}
              </p>
            )}
            <p className="mt-3 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-white sm:text-2xl lg:text-[1.75rem]">
              {children}
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
