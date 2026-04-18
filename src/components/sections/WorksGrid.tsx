"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Work } from "@/lib/notion";

export function WorksGrid({ works }: { works: Work[] }) {
  return (
    <section
      id="works"
      className="relative px-6 py-24 md:px-16 md:py-40"
    >
      <div className="mb-12 md:mb-20 flex items-end justify-between gap-8">
        <div>
          <div className="mb-4 flex items-center gap-3 text-xs tracking-[0.3em] text-[color:var(--color-fg-muted)] uppercase">
            <span className="inline-block h-px w-8 bg-[color:var(--color-accent)]" />
            <span>Selected Works</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-7xl font-black tracking-tight">
            作品
          </h2>
        </div>
        <span className="text-sm text-[color:var(--color-fg-muted)] whitespace-nowrap">
          {String(works.length).padStart(2, "0")} 件
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {works.map((work, i) => (
          <WorkCard key={work.id} work={work} index={i} />
        ))}
      </div>
    </section>
  );
}

function WorkCard({ work, index }: { work: Work; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/works/${work.slug}`}
        className="group block"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[color:var(--color-bg-elevated)]">
          {work.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={work.coverUrl}
              alt={work.title}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[color:var(--color-bg-elevated)] to-[color:var(--color-secondary)]/30 flex items-center justify-center">
              <span className="text-6xl text-[color:var(--color-fg-subtle)] font-[family-name:var(--font-display)] font-black">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />

          {/* Category badges */}
          {work.category.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {work.category.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-[color:var(--color-border-strong)] bg-black/40 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title + meta (always visible) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[-4px]">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0 flex-1">
                {work.client && (
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-accent)] mb-1 truncate">
                    {work.client}
                  </div>
                )}
                <h3 className="text-lg md:text-xl font-semibold leading-tight truncate">
                  {work.title}
                </h3>
              </div>
              <span className="text-xs text-[color:var(--color-fg-muted)] font-[family-name:var(--font-mono)] whitespace-nowrap">
                {work.year}
              </span>
            </div>
          </div>

          {/* Corner accent (reveal on hover) */}
          <div className="absolute top-4 right-4 h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute top-0 right-0 h-px w-full bg-[color:var(--color-accent)]" />
            <div className="absolute top-0 right-0 h-full w-px bg-[color:var(--color-accent)]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
