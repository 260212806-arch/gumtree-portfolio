"use client";

import { motion } from "framer-motion";

// Skills & tools are hard-coded for v1 — per SPEC, these can be moved to
// a Notion config page in v2 if the owner wants to edit them without a deploy.
const SKILLS = [
  "AI 影像创作",
  "Prompt 工程",
  "视觉风格设计",
  "品牌叙事",
  "剪辑合成",
];

const AI_TOOLS = [
  "Midjourney",
  "Kling 可灵",
  "Runway",
  "Sora",
  "Vidu",
  "DaVinci Resolve",
  "After Effects",
];

const CLIENTS = [
  { name: "哈尔滨啤酒", short: "Harbin Beer" },
  { name: "安慕希", short: "Ambrosial" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative px-6 py-24 md:px-16 md:py-40 border-t border-[color:var(--color-border)]"
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Left: heading */}
        <div className="lg:col-span-5">
          <div className="mb-4 flex items-center gap-3 text-xs tracking-[0.3em] text-[color:var(--color-fg-muted)] uppercase">
            <span className="inline-block h-px w-8 bg-[color:var(--color-accent)]" />
            <span>About</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black tracking-tight leading-[0.95]">
            用 AI 把脑子里
            <br />
            <span className="text-[color:var(--color-accent)]">的画面</span>
            拍出来
          </h2>
        </div>

        {/* Right: content */}
        <div className="lg:col-span-7 space-y-12">
          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="text-lg md:text-xl text-[color:var(--color-fg-primary)]/90 leading-relaxed"
          >
            我是 <strong>Gumtree Creative Studio</strong> 的创始人，一名
            AI-Native Director。
            擅长用 AIGC 工具链为品牌与创意团队快速产出电影级的商业短片与视觉叙事。
            过去一年服务过 <strong className="text-[color:var(--color-accent)]">哈尔滨啤酒</strong>、
            <strong className="text-[color:var(--color-accent)]">安慕希</strong>
            等一线品牌，也为独立创作者与艺术项目定制过实验影像。
          </motion.p>

          {/* Skills */}
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--color-fg-muted)]">
              Capabilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--color-fg-muted)]">
              Toolchain
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {AI_TOOLS.map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="font-[family-name:var(--font-mono)] text-sm text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-accent)] transition-colors"
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Clients */}
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--color-fg-muted)]">
              Trusted by
            </h3>
            <div className="flex flex-wrap gap-8">
              {CLIENTS.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="group flex flex-col"
                >
                  <span className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-bold transition-colors group-hover:text-[color:var(--color-accent)]">
                    {c.name}
                  </span>
                  <span className="text-xs text-[color:var(--color-fg-subtle)] mt-1">
                    {c.short}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
