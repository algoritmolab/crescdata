import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { navLinks, offices, site, type Office } from "@/content/site";

function OfficeCard({ office }: { office: Office }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-400">
        {office.region}
      </p>
      <p className="mt-2 text-sm font-semibold text-white">
        {office.name}
        {office.note && (
          <span className="font-normal text-brand-200"> · {office.note}</span>
        )}
      </p>
      <address className="mt-3 space-y-0.5 text-sm not-italic leading-relaxed text-brand-100">
        {office.address.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </address>
      {(office.phone || office.email) && (
        <div className="mt-3 space-y-1 text-sm">
          {office.phone && (
            <p>
              <a
                href={`tel:${office.phone.replace(/[^+\d]/g, "")}`}
                className="text-brand-100 transition-colors hover:text-accent-400"
              >
                {office.phone}
              </a>
            </p>
          )}
          {office.email && (
            <p>
              <a
                href={`mailto:${office.email}`}
                className="text-brand-100 transition-colors hover:text-accent-400"
              >
                {office.email}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {offices.map((office) => (
            <OfficeCard key={`${office.region}-${office.name}`} office={office} />
          ))}
        </div>

        <div className="mt-14 border-t border-white/15 pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-lg font-semibold tracking-tight">{site.name}</p>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-brand-100 transition-colors hover:text-accent-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mt-8 text-sm text-brand-200">
            © {year} {site.name} Pvt Ltd. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
