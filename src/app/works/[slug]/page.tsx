import { notFound } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { FilmGrain } from "@/components/effects/FilmGrain";
import { BilibiliEmbed } from "@/components/ui/BilibiliEmbed";
import { getAllWorks, getRelatedWorks, getWorkBySlug } from "@/lib/notion";

export const revalidate = 60;

export async function generateStaticParams() {
  const works = await getAllWorks();
  return works.map((w) => ({ slug: w.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function WorkDetail({ params }: Props) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  const related = await getRelatedWorks(work.slug, work.category, 3);

  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <FilmGrain />
      <Navigation />

      {/* Prominent floating exit button — always visible on the detail page */}
      <Link
        href="/#works"
        aria-label="返回作品列表"
        className="fixed top-20 left-4 md:top-24 md:left-6 z-[120] inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-black/60 backdrop-blur px-4 py-2 text-sm text-[color:var(--color-fg-primary)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] transition-colors shadow-lg"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        <span className="hidden sm:inline">返回作品列表</span>
        <span className="sm:hidden">返回</span>
      </Link>

      <main className="pt-24 md:pt-32 pb-40 px-6 md:px-16">
        {/* Inline back link (kept for in-flow navigation) */}
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-sm text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-accent)] transition-colors mb-12"
        >
          <span>←</span> 返回作品列表
        </Link>

        {/* Title block */}
        <header className="mb-12 md:mb-16 max-w-5xl">
          {work.category.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {work.category.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[color:var(--color-border-strong)] px-3 py-1 text-[10px] uppercase tracking-wider"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-7xl font-black tracking-tight leading-[0.95]">
            {work.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-[color:var(--color-fg-muted)]">
            <span>{work.year}</span>
            {work.duration && <span>时长 {work.duration}</span>}
            {work.client && (
              <span>
                客户{" "}
                <span className="text-[color:var(--color-fg-primary)]">
                  {work.client}
                </span>
              </span>
            )}
            {work.role && (
              <span>
                角色{" "}
                <span className="text-[color:var(--color-fg-primary)]">
                  {work.role}
                </span>
              </span>
            )}
          </div>
        </header>

        {/* Video player */}
        <section className="mb-16 md:mb-24">
          {work.bilibiliUrl ? (
            <BilibiliEmbed url={work.bilibiliUrl} title={work.title} />
          ) : (
            <div className="aspect-video w-full rounded-lg bg-[color:var(--color-bg-elevated)] flex items-center justify-center border border-[color:var(--color-border)]">
              {work.coverUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={work.coverUrl}
                  alt={work.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
              ) : null}
              <p className="text-sm text-[color:var(--color-fg-muted)]">
                视频即将上线
              </p>
            </div>
          )}
        </section>

        {/* Optional description */}
        {work.description && (
          <section className="mb-16 md:mb-24 max-w-3xl">
            <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--color-fg-muted)]">
              About this work
            </h2>
            <p className="text-lg leading-relaxed text-[color:var(--color-fg-primary)]/90">
              {work.description}
            </p>
          </section>
        )}

        {/* Optional AI tools */}
        {work.aiTools && work.aiTools.length > 0 && (
          <section className="mb-16 md:mb-24 max-w-3xl">
            <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--color-fg-muted)]">
              Toolchain
            </h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-[family-name:var(--font-mono)] text-sm text-[color:var(--color-fg-muted)]">
              {work.aiTools.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24 border-t border-[color:var(--color-border)] pt-12">
            <h2 className="mb-8 text-xs uppercase tracking-[0.3em] text-[color:var(--color-fg-muted)]">
              Related works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/works/${r.slug}`}
                  className="group block"
                >
                  <div className="aspect-video overflow-hidden rounded-lg bg-[color:var(--color-bg-elevated)] mb-3">
                    {r.coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={r.coverUrl}
                        alt={r.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[color:var(--color-bg-elevated)] to-[color:var(--color-secondary)]/30" />
                    )}
                  </div>
                  <h3 className="text-sm font-medium group-hover:text-[color:var(--color-accent)] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs text-[color:var(--color-fg-muted)] mt-1">
                    {r.category.join(" · ")}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
