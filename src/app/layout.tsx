import type { Metadata, Viewport } from "next";
import { Noto_Sans_SC, Inter_Tight, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gumtree Creative Studio · AI-Native Director",
  description:
    "Gumtree 创意工坊 — AI-Native Director。擅长用 AIGC 为品牌打造电影级短片与视觉叙事。合作品牌包括哈尔滨啤酒、安慕希。",
  keywords: [
    "AIGC",
    "AI Director",
    "AI 影像",
    "Gumtree",
    "作品集",
    "TVC",
    "Midjourney",
    "Kling",
    "Runway",
  ],
  authors: [{ name: "Gumtree Creative Studio" }],
  openGraph: {
    title: "Gumtree Creative Studio",
    description: "AI-Native Director · 为品牌造梦",
    type: "website",
    locale: "zh_CN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const BAIDU_ID = process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSansSC.variable} ${interTight.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[color:var(--color-bg-base)] text-[color:var(--color-fg-primary)]">
        {children}
        {/* Baidu Analytics — only loads if ID is configured */}
        {BAIDU_ID && (
          <Script id="baidu-analytics" strategy="afterInteractive">
            {`
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?${BAIDU_ID}";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
