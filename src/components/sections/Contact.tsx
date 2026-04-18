"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 py-24 md:px-16 md:py-40 border-t border-[color:var(--color-border)]"
    >
      <div className="mx-auto max-w-5xl text-center">
        <div className="mb-6 flex items-center justify-center gap-3 text-xs tracking-[0.3em] text-[color:var(--color-fg-muted)] uppercase">
          <span className="inline-block h-px w-8 bg-[color:var(--color-accent)]" />
          <span>Let&apos;s Talk</span>
          <span className="inline-block h-px w-8 bg-[color:var(--color-accent)]" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-display)] text-5xl md:text-8xl font-black tracking-tight leading-[0.95] mb-8"
        >
          有项目想聊？
          <br />
          <span className="text-[color:var(--color-accent)]">扫码找我</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[color:var(--color-fg-muted)] max-w-xl mx-auto mb-12"
        >
          AIGC 短片 · 品牌概念片 · 角色设定 · AI 工作流定制。
          <br />
          先把 brief 或者想法发我，我们聊聊能做到什么程度。
        </motion.p>

        {/* QR Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          <div className="relative p-6 rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-elevated)] hover:border-[color:var(--color-accent)] transition-colors duration-500 group">
            {/* Glow on hover */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[color:var(--color-accent)]/0 via-[color:var(--color-accent)]/20 to-[color:var(--color-accent)]/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />

            <div className="bg-white p-3 rounded-xl">
              <Image
                src="/images/wechat-qr.jpg"
                alt="微信二维码"
                width={240}
                height={240}
                className="block"
                priority={false}
              />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[color:var(--color-fg-muted)]">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8.5 13.5c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5zm7 0c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5z" />
              </svg>
              微信扫码添加
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-xs text-[color:var(--color-fg-subtle)] tracking-[0.2em] uppercase"
        >
          © Gumtree Creative Studio · Gumtree 创意工坊
        </motion.p>
      </div>
    </section>
  );
}
