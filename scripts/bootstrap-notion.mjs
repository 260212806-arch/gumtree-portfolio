// One-off bootstrap: creates the Gumtree Works database under the given
// parent page and seeds it with the 8 mock works. Run once, then delete.

import { readFileSync } from "node:fs";

// Load .env.local manually (no dotenv dep)
const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const TOKEN = env.NOTION_TOKEN;
const PARENT_PAGE_ID = "346a7e95-590d-8074-9f92-f3275f9677c0";
const NOTION_VERSION = "2022-06-28"; // broad-compat version for creating DBs

async function notion(path, body, method = "POST") {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`[notion ${method} ${path}] ${res.status}\n${text}`);
    process.exit(1);
  }
  return JSON.parse(text);
}

// ---------- 1. Create database ----------
console.log("Creating Gumtree Works database...");

const db = await notion("/databases", {
  parent: { type: "page_id", page_id: PARENT_PAGE_ID },
  title: [{ type: "text", text: { content: "Gumtree Works" } }],
  properties: {
    Title: { title: {} },
    Year: { number: { format: "number" } },
    Date: { date: {} },
    Category: {
      multi_select: {
        options: [
          { name: "TVC", color: "orange" },
          { name: "概念片", color: "purple" },
          { name: "MV", color: "pink" },
          { name: "实验影像", color: "blue" },
          { name: "角色设定", color: "green" },
          { name: "咨询案例", color: "gray" },
          { name: "其他", color: "default" },
        ],
      },
    },
    Duration: { rich_text: {} },
    Cover: { files: {} },
    "Bilibili URL": { url: {} },
    Client: { rich_text: {} },
    Role: { rich_text: {} },
    Description: { rich_text: {} },
    "AI Tools": {
      multi_select: {
        options: [
          { name: "Midjourney", color: "purple" },
          { name: "Kling", color: "blue" },
          { name: "Runway", color: "green" },
          { name: "Sora", color: "yellow" },
          { name: "Vidu", color: "orange" },
          { name: "DaVinci", color: "red" },
          { name: "After Effects", color: "pink" },
        ],
      },
    },
    Featured: { checkbox: {} },
    Published: { checkbox: {} },
  },
});

console.log("✅ Database created. ID:", db.id);

// ---------- 2. Seed 8 works ----------
const works = [
  {
    title: "哈尔滨啤酒 · 举杯时刻",
    year: 2026, date: "2026-04-12",
    category: ["TVC"], duration: "0:45",
    cover: "https://i2.hdslb.com/bfs/archive/3b9ee6bae8510cf73a03a6b244910a060ef4d5c2.jpg",
    url: "https://www.bilibili.com/video/BV1NhXjBQEgf",
    client: "哈尔滨啤酒", role: "AI Director",
    description: "为哈尔滨啤酒制作的 AI 驱动品牌短片。",
    tools: ["Midjourney", "Kling", "DaVinci"],
    featured: true,
  },
  {
    title: "未来战争", year: 2026, date: "2026-04-10",
    category: ["概念片", "实验影像"],
    cover: "https://i1.hdslb.com/bfs/archive/5f445382899a50cf824f2fd3c965a0def582427a.jpg",
    url: "https://www.bilibili.com/video/BV1ajA5zUETb",
    role: "AI Director", featured: false,
  },
  {
    title: "岚图泰山", year: 2026, date: "2026-04-08",
    category: ["TVC"],
    cover: "https://i0.hdslb.com/bfs/archive/c830c75bbffc72425f6d3a351a6deb108a587534.jpg",
    url: "https://www.bilibili.com/video/BV1j9DKBME8x",
    client: "岚图汽车", role: "AI Director", featured: false,
  },
  {
    title: "重启世界", year: 2026, date: "2026-04-05",
    category: ["概念片"],
    cover: "https://i1.hdslb.com/bfs/archive/bbe5258fd72fbd1ae895f0e4daaa68034aec4656.jpg",
    url: "https://www.bilibili.com/video/BV1yiDKBSE6A",
    role: "AI Director", featured: false,
  },
  {
    title: "涅槃重生", year: 2026, date: "2026-04-03",
    category: ["概念片"],
    cover: "https://i0.hdslb.com/bfs/archive/bebaabce84c856b057a7123532eeb239d3c07f47.jpg",
    url: "https://www.bilibili.com/video/BV1CsdJBAEsW",
    role: "AI Director", featured: false,
  },
  {
    title: "安慕希整颗蓝莓 MV", year: 2026, date: "2026-04-01",
    category: ["MV", "TVC"],
    cover: "https://i2.hdslb.com/bfs/archive/61cad36d6b5e8666734e2e9248c921abec09f403.jpg",
    url: "https://www.bilibili.com/video/BV1AsdJBPEmx",
    client: "安慕希", role: "AI Director", featured: false,
  },
  {
    title: "冰爽一刻", year: 2026, date: "2026-03-28",
    category: ["TVC"],
    cover: "https://i1.hdslb.com/bfs/archive/6875c7117965d22216c13800dbad8d685af45219.jpg",
    url: "https://www.bilibili.com/video/BV1CsdJBAEWZ",
    role: "AI Director", featured: false,
  },
  {
    title: "漫步林间", year: 2026, date: "2026-03-25",
    category: ["概念片", "实验影像"],
    cover: "https://i1.hdslb.com/bfs/archive/0ba8df8a058d1c81b56a5cf0bd36cdac53680911.jpg",
    url: "https://www.bilibili.com/video/BV1rbdJB8Er7",
    role: "AI Director", featured: false,
  },
];

for (const w of works) {
  const props = {
    Title: { title: [{ type: "text", text: { content: w.title } }] },
    Year: { number: w.year },
    Date: { date: { start: w.date } },
    Category: { multi_select: w.category.map((n) => ({ name: n })) },
    "Bilibili URL": { url: w.url },
    Cover: {
      files: [
        { name: `${w.title}.jpg`, type: "external", external: { url: w.cover } },
      ],
    },
    Featured: { checkbox: Boolean(w.featured) },
    Published: { checkbox: true },
  };
  if (w.duration) props.Duration = { rich_text: [{ type: "text", text: { content: w.duration } }] };
  if (w.client) props.Client = { rich_text: [{ type: "text", text: { content: w.client } }] };
  if (w.role) props.Role = { rich_text: [{ type: "text", text: { content: w.role } }] };
  if (w.description) props.Description = { rich_text: [{ type: "text", text: { content: w.description } }] };
  if (w.tools) props["AI Tools"] = { multi_select: w.tools.map((n) => ({ name: n })) };

  await notion("/pages", { parent: { database_id: db.id }, properties: props });
  console.log(`  + ${w.title}`);
}

console.log("\n✅ All done.");
console.log("NOTION_WORKS_DB_ID=" + db.id.replace(/-/g, ""));
