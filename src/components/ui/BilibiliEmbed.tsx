"use client";

import { useRef, useState, useEffect } from "react";

/**
 * Embeds a Bilibili video given a share URL (https://b23.tv/xxxx)
 * or a BV-ID URL. Adds custom fullscreen + open-in-Bilibili controls
 * on top of the iframe so controls are always visible/obvious.
 */
export function BilibiliEmbed({
  url,
  title,
}: {
  url: string;
  title?: string;
}) {
  const bvid = extractBvid(url);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen().catch(() => {});
    }
  };

  if (!bvid) {
    return (
      <div className="aspect-video w-full flex items-center justify-center bg-[color:var(--color-bg-elevated)] rounded-lg">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full border border-[color:var(--color-border)] text-[color:var(--color-fg-primary)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] transition-colors"
        >
          ▶ 在 B 站观看完整版
        </a>
      </div>
    );
  }

  const src = `//player.bilibili.com/player.html?bvid=${bvid}&autoplay=1&high_quality=1&danmaku=0`;

  return (
    <div
      ref={wrapRef}
      className="group relative aspect-video w-full overflow-hidden rounded-lg bg-black fullscreen:rounded-none"
    >
      <iframe
        src={src}
        title={title ?? "Bilibili player"}
        allowFullScreen
        allow="autoplay; encrypted-media; fullscreen"
        scrolling="no"
        className="absolute inset-0 h-full w-full border-0"
      />

      {/* Custom control chrome — floats over iframe edge so it never conflicts with B站 controls */}
      <div className="pointer-events-none absolute top-3 right-3 flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
        <a
          href={`https://www.bilibili.com/video/${bvid}`}
          target="_blank"
          rel="noopener noreferrer"
          title="在 B 站打开"
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur text-xs text-white border border-white/10 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          B 站
        </a>
        <button
          type="button"
          onClick={toggleFullscreen}
          title={isFs ? "退出全屏" : "全屏"}
          aria-label={isFs ? "退出全屏" : "全屏"}
          className="pointer-events-auto flex items-center justify-center h-8 w-8 rounded-full bg-black/70 backdrop-blur text-white border border-white/10 hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)] transition-colors"
        >
          {isFs ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
          )}
        </button>
      </div>
    </div>
  );
}

function extractBvid(url: string): string | null {
  const m = url.match(/BV[a-zA-Z0-9]{10}/);
  return m ? m[0] : null;
}
