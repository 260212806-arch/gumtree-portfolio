"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";
import { BilibiliEmbed } from "@/components/ui/BilibiliEmbed";

const HERO_BILIBILI_URL =
  process.env.NEXT_PUBLIC_HERO_BILIBILI_URL ?? "https://b23.tv/2dJBqhL";

export function Hero() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-[100svh] w-full overflow-hidden"
      >
        {/* Background video (or fallback dark field if video absent) */}
        <motion.div
          className="absolute inset-0"
          style={{ scale }}
        >
          <video
            className="h-full w-full object-cover"
            src="/videos/hero-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
          />
          {/* Vignette + darken */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--color-bg-base)]" />
          <div className="absolute inset-0 bg-[color:var(--color-bg-base)]/40" />
        </motion.div>

        {/* Overlay content */}
        <motion.div
          className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:px-16 md:pb-32"
          style={{ opacity, y }}
        >
          <div className="mb-6 flex items-center gap-3 text-xs tracking-[0.3em] text-[color:var(--color-fg-muted)] uppercase">
            <span className="inline-block h-px w-8 bg-[color:var(--color-accent)]" />
            <span>Recent · Harbin Beer</span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,9vw,8rem)] font-black leading-[0.95] tracking-tight">
            Gumtree
            <br />
            <span className="text-[color:var(--color-accent)]">Creative</span>{" "}
            Studio
          </h1>

          <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
            <p className="text-base md:text-lg text-[color:var(--color-fg-muted)] max-w-xl">
              AI-Native Director · Gumtree 创意工坊 · 为品牌造梦
            </p>

            <button
              onClick={() => setLightboxOpen(true)}
              className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-base)]/50 backdrop-blur px-6 py-3 text-sm font-medium hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] transition-all duration-300 w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
              </span>
              观看完整片
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-[0.3em] text-[color:var(--color-fg-subtle)] uppercase"
          style={{ opacity }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll
        </motion.div>
      </section>

      <Lightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)}>
        <BilibiliEmbed url={HERO_BILIBILI_URL} title="哈尔滨啤酒 TVC" />
      </Lightbox>
    </>
  );
}
