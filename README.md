# Gumtree Creative Studio — Portfolio Site

个人作品集网站。AI-Native Director · 国内 freelance · 深色电影感 + WebGL。

## 相关文档

- [`../SPEC.md`](../SPEC.md) — 需求与方案
- [`CLAUDE.md`](CLAUDE.md) — 项目技术上下文
- [`docs/NOTION_SETUP.md`](docs/NOTION_SETUP.md) — Notion 数据库怎么建
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) — 怎么部署到 Vercel
- [`docs/USER_MANUAL.md`](docs/USER_MANUAL.md) — 日常维护手册

## 本地开发

```bash
npm install
npm run dev
# 打开 http://localhost:3000
```

环境变量（`.env.local`，已存在）：

- `NOTION_TOKEN` — Notion 集成 Token
- `NOTION_WORKS_DB_ID` — 作品数据库 ID（见 NOTION_SETUP.md）
- `NEXT_PUBLIC_HERO_BILIBILI_URL` — 哈啤 TVC 的 B 站链接
- `NEXT_PUBLIC_BAIDU_ANALYTICS_ID` — 百度统计 ID（可选）

未配置 `NOTION_WORKS_DB_ID` 时自动使用 mock 作品数据。

## 构建

```bash
npm run build
npm start
```

## 关键约束

- 非技术 owner — 内容只能通过 Notion 改
- 零月度成本 — Vercel 免费 + B 站 iframe + 3MB hero clip 打包进代码
- 微信 X5 为主要手机环境 — 自动降级为无 WebGL 版本
- 中文为主
