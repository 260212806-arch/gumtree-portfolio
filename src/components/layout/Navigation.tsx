"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#works", label: "作品" },
  { href: "/#about", label: "关于" },
  { href: "/#contact", label: "合作" },
];

export function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        scrolled
          ? "bg-[color:var(--color-bg-base)]/70 backdrop-blur-md border-b border-[color:var(--color-border)]"
          : "bg-transparent"
      )}
    >
      <nav className="flex items-center justify-between px-6 md:px-16 py-5">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm tracking-wider"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-[color:var(--color-accent)] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
          </span>
          <span className="font-[family-name:var(--font-display)] font-bold">
            GUMTREE
          </span>
          <span className="hidden md:inline text-[color:var(--color-fg-muted)]">
            创意工坊
          </span>
        </Link>

        <ul className="flex items-center gap-6 md:gap-10 text-sm">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-accent)] transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
