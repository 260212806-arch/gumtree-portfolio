"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

type LightboxProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Lightbox({ open, onClose, children }: LightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop — click to close */}
          <button
            aria-label="关闭"
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
          />

          {/* Fixed close button — always visible in top-right of viewport */}
          <button
            onClick={onClose}
            aria-label="关闭"
            className="fixed top-4 right-4 md:top-6 md:right-6 z-[220] flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
          >
            <span>关闭</span>
            <span className="text-lg leading-none">✕</span>
            <span className="ml-1 hidden md:inline text-[10px] tracking-wider text-white/50 border border-white/20 rounded px-1.5 py-0.5">
              ESC
            </span>
          </button>

          {/* Content — sized to fit viewport on any screen, preserving 16:9 */}
          <motion.div
            className="relative z-10 w-[min(92vw,calc((100svh-8rem)*16/9))]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
