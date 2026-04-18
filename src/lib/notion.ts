import { Client } from "@notionhq/client";

/**
 * Notion CMS wrapper.
 *
 * Reads the `Gumtree Works` database (schema defined in docs/NOTION_SETUP.md).
 * Falls back to mock data when NOTION_WORKS_DB_ID is not configured (useful
 * during scaffold before the user creates the database).
 */

export type Work = {
  id: string;
  slug: string;
  title: string;
  year: number;
  date: string;
  category: string[];
  duration?: string;
  coverUrl?: string;
  bilibiliUrl?: string;
  client?: string;
  role?: string;
  description?: string;
  aiTools?: string[];
  featured: boolean;
};

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const WORKS_DB_ID = process.env.NOTION_WORKS_DB_ID;

const notion = NOTION_TOKEN ? new Client({ auth: NOTION_TOKEN }) : null;

// ---------------- Mock fallback ----------------
// Used until the user creates the Notion database and sets NOTION_WORKS_DB_ID.
// Lets the site render and be reviewable immediately.
const MOCK_WORKS: Work[] = [
  {
    id: "mock-harbin",
    slug: "harbin-beer-2026",
    title: "哈尔滨啤酒 · 举杯时刻",
    year: 2026,
    date: "2026-04-12",
    category: ["TVC"],
    duration: "0:45",
    coverUrl: "https://i2.hdslb.com/bfs/archive/3b9ee6bae8510cf73a03a6b244910a060ef4d5c2.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV1NhXjBQEgf",
    client: "哈尔滨啤酒",
    role: "AI Director",
    description: "为哈尔滨啤酒制作的 AI 驱动品牌短片。",
    aiTools: ["Midjourney", "Kling", "DaVinci"],
    featured: true,
  },
  {
    id: "mock-future-war",
    slug: "future-war",
    title: "未来战争",
    year: 2026,
    date: "2026-04-10",
    category: ["概念片", "实验影像"],
    coverUrl: "https://i1.hdslb.com/bfs/archive/5f445382899a50cf824f2fd3c965a0def582427a.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV1ajA5zUETb",
    role: "AI Director",
    featured: false,
  },
  {
    id: "mock-lantu-taishan",
    slug: "lantu-taishan",
    title: "岚图泰山",
    year: 2026,
    date: "2026-04-08",
    category: ["TVC"],
    coverUrl: "https://i0.hdslb.com/bfs/archive/c830c75bbffc72425f6d3a351a6deb108a587534.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV1j9DKBME8x",
    client: "岚图汽车",
    role: "AI Director",
    featured: false,
  },
  {
    id: "mock-restart-world",
    slug: "restart-world",
    title: "重启世界",
    year: 2026,
    date: "2026-04-05",
    category: ["概念片"],
    coverUrl: "https://i1.hdslb.com/bfs/archive/bbe5258fd72fbd1ae895f0e4daaa68034aec4656.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV1yiDKBSE6A",
    role: "AI Director",
    featured: false,
  },
  {
    id: "mock-nirvana",
    slug: "nirvana-rebirth",
    title: "涅槃重生",
    year: 2026,
    date: "2026-04-03",
    category: ["概念片"],
    coverUrl: "https://i0.hdslb.com/bfs/archive/bebaabce84c856b057a7123532eeb239d3c07f47.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV1CsdJBAEsW",
    role: "AI Director",
    featured: false,
  },
  {
    id: "mock-ambrosial-blueberry",
    slug: "ambrosial-blueberry-mv",
    title: "安慕希整颗蓝莓 MV",
    year: 2026,
    date: "2026-04-01",
    category: ["MV", "TVC"],
    coverUrl: "https://i2.hdslb.com/bfs/archive/61cad36d6b5e8666734e2e9248c921abec09f403.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV1AsdJBPEmx",
    client: "安慕希",
    role: "AI Director",
    featured: false,
  },
  {
    id: "mock-ice-moment",
    slug: "ice-moment",
    title: "冰爽一刻",
    year: 2026,
    date: "2026-03-28",
    category: ["TVC"],
    coverUrl: "https://i1.hdslb.com/bfs/archive/6875c7117965d22216c13800dbad8d685af45219.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV1CsdJBAEWZ",
    role: "AI Director",
    featured: false,
  },
  {
    id: "mock-forest-walk",
    slug: "forest-walk",
    title: "漫步林间",
    year: 2026,
    date: "2026-03-25",
    category: ["概念片", "实验影像"],
    coverUrl: "https://i1.hdslb.com/bfs/archive/0ba8df8a058d1c81b56a5cf0bd36cdac53680911.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV1rbdJB8Er7",
    role: "AI Director",
    featured: false,
  },
];

// ---------------- Helpers ----------------
function slugify(title: string, id: string) {
  const base = title
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return base ? `${base}-${id.slice(0, 6)}` : id.slice(0, 8);
}

// Minimal Notion property shape (only what we access) — avoids pulling in the
// full NotionhqClient type trees.
type NotionProps = Record<string, unknown>;

function prop<T = unknown>(props: NotionProps, key: string): T | undefined {
  return props[key] as T | undefined;
}

function readText(p: unknown): string | undefined {
  if (!p || typeof p !== "object") return undefined;
  const obj = p as {
    rich_text?: Array<{ plain_text?: string }>;
    title?: Array<{ plain_text?: string }>;
  };
  const arr = obj.rich_text ?? obj.title;
  if (!arr) return undefined;
  const joined = arr.map((t) => t.plain_text ?? "").join("");
  return joined || undefined;
}

function readNumber(p: unknown): number | undefined {
  if (!p || typeof p !== "object") return undefined;
  return (p as { number?: number }).number;
}

function readDate(p: unknown): string | undefined {
  if (!p || typeof p !== "object") return undefined;
  return (p as { date?: { start?: string } }).date?.start;
}

function readMultiSelect(p: unknown): string[] {
  if (!p || typeof p !== "object") return [];
  const arr = (p as { multi_select?: Array<{ name: string }> }).multi_select;
  return arr ? arr.map((x) => x.name) : [];
}

function readCheckbox(p: unknown): boolean {
  if (!p || typeof p !== "object") return false;
  return Boolean((p as { checkbox?: boolean }).checkbox);
}

function readUrl(p: unknown): string | undefined {
  if (!p || typeof p !== "object") return undefined;
  return (p as { url?: string }).url ?? undefined;
}

function readFileUrl(p: unknown): string | undefined {
  if (!p || typeof p !== "object") return undefined;
  const files = (p as {
    files?: Array<{
      file?: { url?: string };
      external?: { url?: string };
    }>;
  }).files;
  if (!files || files.length === 0) return undefined;
  return files[0].file?.url ?? files[0].external?.url;
}

// Notion API 2025-09-03 split databases into "data sources". A database has
// one or more data sources; we cache the first one per DB to avoid an extra
// round-trip on every request.
let cachedDataSourceId: string | null = null;

async function getDataSourceId(dbId: string): Promise<string | null> {
  if (cachedDataSourceId) return cachedDataSourceId;
  if (!notion) return null;
  try {
    const db = (await notion.databases.retrieve({ database_id: dbId })) as {
      data_sources?: Array<{ id: string }>;
    };
    const id = db.data_sources?.[0]?.id ?? null;
    if (id) cachedDataSourceId = id;
    return id;
  } catch (err) {
    console.error("[notion] failed to resolve data source id:", err);
    return null;
  }
}

// ---------------- Public API ----------------
export async function getAllWorks(): Promise<Work[]> {
  if (!notion || !WORKS_DB_ID) {
    return MOCK_WORKS;
  }

  try {
    const dataSourceId = await getDataSourceId(WORKS_DB_ID);
    if (!dataSourceId) return MOCK_WORKS;

    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Published",
        checkbox: { equals: true },
      },
      sorts: [
        { property: "Featured", direction: "descending" },
        { property: "Date", direction: "descending" },
      ],
    });

    return res.results.map((page) => {
      // `properties` exists on full page objects; narrow unsafely — we trust Notion's shape
      const props = (page as { properties: NotionProps }).properties;
      const id = (page as { id: string }).id;
      const title = readText(prop(props, "Title")) ?? "(未命名)";
      return {
        id,
        slug: slugify(title, id),
        title,
        year: readNumber(prop(props, "Year")) ?? new Date().getFullYear(),
        date: readDate(prop(props, "Date")) ?? "",
        category: readMultiSelect(prop(props, "Category")),
        duration: readText(prop(props, "Duration")),
        coverUrl: readFileUrl(prop(props, "Cover")),
        bilibiliUrl: readUrl(prop(props, "Bilibili URL")),
        client: readText(prop(props, "Client")),
        role: readText(prop(props, "Role")),
        description: readText(prop(props, "Description")),
        aiTools: readMultiSelect(prop(props, "AI Tools")),
        featured: readCheckbox(prop(props, "Featured")),
      } satisfies Work;
    });
  } catch (err) {
    console.error("[notion] query failed, falling back to mock:", err);
    return MOCK_WORKS;
  }
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const works = await getAllWorks();
  return works.find((w) => w.slug === slug) ?? null;
}

export async function getRelatedWorks(
  currentSlug: string,
  categories: string[],
  limit = 3
): Promise<Work[]> {
  const all = await getAllWorks();
  return all
    .filter((w) => w.slug !== currentSlug)
    .sort((a, b) => {
      const aMatch = a.category.filter((c) => categories.includes(c)).length;
      const bMatch = b.category.filter((c) => categories.includes(c)).length;
      return bMatch - aMatch;
    })
    .slice(0, limit);
}
