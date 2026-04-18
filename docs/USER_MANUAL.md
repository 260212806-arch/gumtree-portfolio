# 使用手册 · Gumtree Creative Studio 作品集网站

这份手册告诉你**网站上线后怎么自己维护**，不用找开发者。

---

## 日常操作：加一个新作品

1. 打开你的 Notion `Gumtree Works` 数据库
2. 点 `+ New` 加一行
3. 按字段填：
   - **Title**（必填）：作品名
   - **Year**（必填）：年份
   - **Date**（必填）：作品日期，决定排序
   - **Category**：选类型标签（可多选）
   - **Cover**：上传一张 16:9 的封面图（**很重要**，没有封面会显示占位）
   - **Bilibili URL**：B 站视频链接；**还没传 B 站就留空**，网站会自动隐藏"观看完整版"按钮
   - **Client / Role / Description / AI Tools**：可选，写了会在详情页显示；不写会自动隐藏该区块
   - **Featured**：打勾会置顶到网格开头
   - **Published**：**必须勾选**，不勾的不会显示
4. 保存，等 60 秒刷新网站 → 出现了

---

## 临时隐藏某个作品

取消 `Published` 的勾选即可，60 秒后消失。想再显示就再勾上。

---

## 改作品顺序

网站排序规则：**Featured（置顶） > Date（日期倒序）**

要调顺序就改这两个字段。

---

## 改关于 / 技能 / 工具列表

这部分**写在代码里**（不走 Notion）。要改的话发给我或让开发者改一下。文件位置：
- `src/components/sections/About.tsx`（技能、工具、客户 logo 墙）
- `src/components/sections/Contact.tsx`（CTA 文案）

---

## 换微信二维码

1. 把新的二维码图片重命名为 `wechat-qr.jpg`
2. 放到 `public/images/` 目录，覆盖原文件
3. GitHub Desktop → Commit → Push
4. Vercel 自动重新部署

---

## 看网站访问数据

1. 打开 https://tongji.baidu.com
2. 用你注册时的账号登录
3. 进入"报告" → 能看到 PV / UV / 访问时长 / 来源等

（百度统计部分需要你先在 `.env.local` / Vercel 环境变量里填过 `NEXT_PUBLIC_BAIDU_ANALYTICS_ID`）

---

## 测试网站有没有坏掉

每次改完 Notion 或代码后，在**不同设备**打开网站链接检查一次：
- 电脑浏览器（Chrome / Safari）
- 手机微信（扫码或直接打开链接）
- 手机浏览器（Safari / 夸克）

重点看：
- 首屏 hero 视频能不能自动播放
- 作品网格有没有 16 张
- 点击任一作品能不能进详情页
- Contact 的二维码能不能扫

---

## 出问题了怎么办？

1. 先试 `Ctrl+F5` 强刷浏览器
2. 去 Vercel Dashboard 看最新一次部署是不是 `Ready`（绿色）
3. 如果 Notion 里新加的作品一直不出现，检查：
   - 是否勾选 Published
   - 是否把数据库加到了集成的 Connections
   - 字段名有没有拼错
4. 实在搞不定，把**现象 + 截图**发给开发者
