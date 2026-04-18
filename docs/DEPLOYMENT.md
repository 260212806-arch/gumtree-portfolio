# 部署到 Vercel（免费）

这份指南教你把网站**部署到公网**，免费，全程在浏览器里操作。

---

## 第 1 步：把代码推到 GitHub

**如果你没装过 Git，安装 GitHub Desktop（图形界面版）：**
https://desktop.github.com/

1. 注册 GitHub 账号：https://github.com/signup
2. 打开 GitHub Desktop，登录
3. `File` → `Add Local Repository` → 选择 `C:\Users\gumtr\Documents\AICG\website`
4. GitHub Desktop 会提示"这个文件夹还不是 git 仓库"，点 `create a repository`
5. 点 `Publish repository` → 名字填 `gumtree-portfolio` → 勾上 `Keep this code private`（私有，推荐）→ `Publish Repository`

---

## 第 2 步：在 Vercel 导入项目

1. 打开 https://vercel.com/signup，用你刚注册的 GitHub 账号登录（最方便）
2. 进入 Dashboard 后，点 `Add New...` → `Project`
3. 找到 `gumtree-portfolio` 仓库，点 `Import`
4. Framework Preset 会自动识别成 `Next.js`，不用改
5. **重要：展开 `Environment Variables`**，把下面这些逐一添加：

   | Name | Value |
   |------|-------|
   | `NOTION_TOKEN` | 你的 Notion Token（`ntn_...` 开头）|
   | `NOTION_WORKS_DB_ID` | 你的 Notion 数据库 ID（见 `NOTION_SETUP.md` 第 4 步）|
   | `NEXT_PUBLIC_HERO_BILIBILI_URL` | `https://b23.tv/2dJBqhL` |
   | `NEXT_PUBLIC_BAIDU_ANALYTICS_ID` | 你的百度统计 ID（没有可先空着）|

6. 点 `Deploy`
7. 等 1-2 分钟，构建完成后你会得到一个 `https://gumtree-portfolio.vercel.app` 的链接

---

## 第 3 步：以后怎么更新？

### 加一个新作品（最常见）
你什么都不用做！直接在 Notion 里加一行，勾上 `Published`，**60 秒内网站自动更新**。

### 改文案 / 改样式（偶尔）
这部分需要改代码，如果自己搞不定可以扔给我：
1. 打开 GitHub Desktop → 切到 `gumtree-portfolio` 仓库
2. 手动在 VS Code / 记事本里改文件
3. GitHub Desktop 会提示"有更改" → 填 commit message → `Commit to main` → `Push origin`
4. Vercel 自动重新部署（1-2 分钟）

---

## 第 4 步（可选）：绑自定义域名

等你想花钱了（~¥55/年买一个 `.com`）：
1. 在阿里云 / Namecheap 买域名
2. Vercel 项目 → `Settings` → `Domains` → 输入你的域名
3. 按 Vercel 的提示在域名服务商那里配置 DNS（通常加 2-3 条记录）
4. 等待生效（一般 5-30 分钟）

---

## 常见问题

**Q: Vercel 部署失败，提示 "Build Error"？**
A: 99% 是环境变量没填对。去 Settings → Environment Variables 检查 `NOTION_TOKEN` 和 `NOTION_WORKS_DB_ID` 有没有填、有没有带多余空格。

**Q: 网站能访问，但作品列表是"占位 1 / 占位 2 ..."？**
A: 说明 Notion 还没连上，走的是 mock 数据。检查：
- `NOTION_WORKS_DB_ID` 是否正确
- Notion 数据库是否已经把你的集成加到 Connections
- 至少有一条作品勾上了 `Published`

**Q: 改了 Notion，但网站没更新？**
A: 网站每 60 秒才重新拉一次数据。刷新页面时按 `Ctrl+F5` 强刷一下就行。如果 2 分钟后还没更新，去 Vercel 项目 → Deployments → 点最新的那条 → 右上角 `···` → `Redeploy` 手动触发一次。
