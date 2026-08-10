import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ControlBar } from "@/components/ui/ControlBar";
import { DataLabel, DataValue, Bullet } from "@/components/ui/Data";
import { Lead } from "@/components/ui/Lead";
import { BackLink } from "@/components/ui/BackLink";
import { ArrowIcon } from "@/components/ui/ArrowLink";
import { ApplyBlock } from "@/components/careers/ApplyBlock";
import { getRole, roles, type Role } from "@/content/roles";
import { logo, site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const role = getRole(slug);

  if (!role) return { title: "Role not found" };

  // The layout template appends " — Cresc Datasoft".
  const title = `${role.title} — Careers`;

  return {
    title,
    description: role.summary,
    openGraph: {
      type: "article",
      siteName: site.name,
      title: `${title} — ${site.name}`,
      description: role.summary,
      url: `${site.url}/careers/${role.slug}`,
      images: [
        { url: logo.src, width: logo.width, height: logo.height, alt: site.name },
      ],
    },
  };
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 max-w-prose space-y-3.5">
      {items.map((item) => (
        <li key={item} className="relative pl-6">
          <Bullet />
          <span className="text-[1.0625rem] leading-[1.7] text-ink-soft">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Block({
  heading,
  items,
  first = false,
}: {
  heading: string;
  items: string[];
  first?: boolean;
}) {
  return (
    <section className={first ? undefined : "mt-14 border-t border-rule pt-10"}>
      <h2 className="font-display text-2xl font-semibold tracking-[-0.025em] text-navy sm:text-[1.75rem]">
        {heading}
      </h2>
      <BulletList items={items} />
    </section>
  );
}

export default async function RolePage({ params }: Props) {
  const { slug } = await params;
  const role: Role | undefined = getRole(slug);

  if (!role) notFound();

  const index = roles.findIndex((r) => r.slug === role.slug);
  const previous = index > 0 ? roles[index - 1] : undefined;
  const next = index < roles.length - 1 ? roles[index + 1] : undefined;

  return (
    <div className="bg-paper">
      <ControlBar
        left={<BackLink href="/careers">All roles</BackLink>}
        right={role.department}
      />

      <Container className="pt-12 pb-10 sm:pt-16 sm:pb-12">
        <h1 className="max-w-4xl font-display text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-navy sm:text-5xl lg:text-6xl">
          {role.title}
        </h1>
        <Lead className="mt-7">{role.summary}</Lead>
      </Container>

      <Container>
        <div className="border border-rule bg-rule">
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-surface p-5">
              <DataLabel>Department</DataLabel>
              <DataValue>{role.department}</DataValue>
            </div>
            <div className="bg-surface p-5">
              <DataLabel>Location</DataLabel>
              <DataValue>{role.location}</DataValue>
            </div>
            <div className="bg-surface p-5">
              <DataLabel>Shift</DataLabel>
              <DataValue>{role.shift}</DataValue>
            </div>
            <div className="bg-surface p-5">
              <DataLabel>Experience</DataLabel>
              <DataValue>{role.experience}</DataValue>
            </div>
          </div>
        </div>
      </Container>

      <Container className="pt-12 pb-20 sm:pb-24">
        <article className="border border-rule bg-surface px-5 py-10 sm:px-10 sm:py-12">
          <Block
            first
            heading="What you will do"
            items={role.responsibilities}
          />
          <Block
            heading="What we are looking for"
            items={role.requirements}
          />
          {role.niceToHave && (
            <Block heading="Nice to have" items={role.niceToHave} />
          )}
          <Block heading="Good to know" items={role.notes} />
        </article>

        <ApplyBlock role={role} />

        {(previous || next) && (
          <nav
            aria-label="Other roles"
            className="mt-14 grid gap-px border border-rule bg-rule sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/careers/${previous.slug}`}
                className="group bg-paper p-6 transition-colors hover:bg-surface"
              >
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-label">
                  <ArrowIcon direction="left" />
                  Previous role
                </span>
                <span className="mt-3 block font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-brand-700">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span className="bg-paper p-6" />
            )}

            {next && (
              <Link
                href={`/careers/${next.slug}`}
                className="group bg-paper p-6 transition-colors hover:bg-surface sm:text-right"
              >
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-label sm:justify-end">
                  Next role
                  <ArrowIcon direction="right" />
                </span>
                <span className="mt-3 block font-display text-base font-semibold leading-snug text-navy transition-colors group-hover:text-brand-700">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </Container>
    </div>
  );
}
