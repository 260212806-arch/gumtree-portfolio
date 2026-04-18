# Notion 数据库设置指南

这份指南教你**从零**建一个作品数据库，之后网站所有作品内容都从这里拉。全程在 Notion 里操作，**不需要写代码**。

---

## 第 1 步：确认集成已创建

你已经给我一个 Token（`ntn_450...`），说明你已经建过一个 Notion Integration。确认一下：

1. 打开 https://www.notion.so/profile/integrations
2. 应该能看到你创建的集成（比如名字叫 "Gumtree Portfolio" 或类似）
3. 如果**没看到**，点 `+ New integration` 新建一个：
   - Name: `Gumtree Portfolio`
   - Type: `Internal`
   - Associated workspace: 选你自己的 workspace
   - 建好后把新 Token 告诉我，旧的可以删了

---

## 第 2 步：创建作品数据库

1. 在 Notion 里随便找一页（或新建一页），输入 `/database` → 选 **"Database - Full page"**
2. 标题改为 `Gumtree Works`
3. 删掉默认的 "Name / Tags" 等字段，按下面的表**一个一个加字段**：

| 字段名 (严格一致) | 字段类型 | 说明 |
|------|------|------|
| `Title` | Title（默认主字段）| 作品标题，例如"哈尔滨啤酒 - 举杯时刻" |
| `Year` | Number | 年份，例如 `2026` |
| `Date` | Date | 作品创作日期，决定排序 |
| `Category` | Multi-select | 类型标签：`TVC` / `概念片` / `角色设定` / `实验影像` / `咨询案例` / `其他` |
| `Duration` | Text | 时长，例如 `0:45`、`1:23` |
| `Cover` | Files & media | 封面图（一张 16:9 的图）|
| `Bilibili URL` | URL | B 站视频链接，格式如 `https://b23.tv/xxxxx`。**没传 B 站就留空**，网站会自动隐藏"观看完整版"按钮 |
| `Client` | Text | 客户/品牌（可选），例如"哈尔滨啤酒" |
| `Role` | Text | 你的角色（可选），例如"AI Director / Prompt Artist" |
| `Description` | Text | 背景故事（可选，100-300 字）|
| `AI Tools` | Multi-select | 使用的工具：`Midjourney` / `Kling` / `Runway` / `Sora` / `Vidu` / `DaVinci` / `After Effects` |
| `Featured` | Checkbox | 打勾的会在首页置顶 |
| `Published` | Checkbox | **打勾的才会显示在网站上**（给你"草稿"能力）|

⚠️ **字段名必须和上表一字不差**（大小写、空格都要一致），否则网站拉不到数据。

---

## 第 3 步：把数据库分享给集成

数据库建好后，需要**把它授权给**你的 Notion 集成：

1. 打开你的 `Gumtree Works` 数据库页
2. 右上角 `···`（三个点）→ `Connections` → 搜索你的集成名字 → 点击添加
3. 看到集成出现在 Connections 列表里就 OK

---

## 第 4 步：把数据库 ID 发给我

1. 打开你的 `Gumtree Works` 数据库
2. 右上角 `···` → `Copy link`
3. 链接长这样：`https://www.notion.so/Gumtree-Works-abc123def456...?v=xxxxx`
4. 其中 `abc123def456...` 这段 32 位的字符串就是 **Database ID**
5. 把这串 ID 发给我，我填进网站配置

---

## 第 5 步：录入你的作品

先录一条**哈啤 TVC** 作为测试：

| 字段 | 填写 |
|------|------|
| Title | `哈尔滨啤酒 · 举杯时刻`（或你起的名字）|
| Year | `2026` |
| Date | `2026-04-12` |
| Category | `TVC` |
| Duration | 看实际时长填 |
| Cover | 上传一张 16:9 的封面图（从视频里截一帧都行）|
| Bilibili URL | `https://b23.tv/2dJBqhL` |
| Client | `哈尔滨啤酒` |
| Role | `AI Director` |
| AI Tools | `Midjourney` + `Kling` + `DaVinci`（按你实际使用勾选）|
| Featured | ✅ 勾上 |
| Published | ✅ 勾上 |

然后**剩下 15 个作品的条目你也先建**，即使 B 站还没传：
- Bilibili URL **留空**
- Cover 先上一张图（视频截图就行）
- Published **暂时不勾**（不勾就不会出现在网站上）
- 等 B 站传完了，你回来填 URL、勾上 Published，网站 60 秒内自动更新

---

## 未来维护流程（给运营者看的精简版）

> 加一个新作品：
> 1. 打开 `Gumtree Works` 数据库，点 `+ New`
> 2. 填 Title / Year / Date / Category / Duration
> 3. 上传 Cover 封面图
> 4. 填 Bilibili URL（如果有）
> 5. 勾选 Published
> 6. 等 60 秒，刷新网站就能看到
>
> 改顺序：拖动行的顺序，或者改 `Featured` 的勾选状态
>
> 暂时隐藏某个作品：把它的 `Published` 取消勾选即可
