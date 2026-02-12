# Vercel 部署指南 (VitePress)

本指南将帮助你将 TS-AI API 文档部署到 Vercel 平台。

## 方式一：连接 Git 仓库自动部署（推荐）

1. **推送代码**：确保本项目已推送到 GitHub 仓库。
2. **导入项目**：
   - 登录 Vercel 控制台。
   - 点击 **"Add New..."** -> **"Project"**。
   - 在 **"Import Git Repository"** 中选择你的 `TS-API-DOC` 仓库。
3. **配置设置**：
   - **Framework Preset**: 选择 **VitePress** (如果列表中没有，选择 **Other**)。
   - **Build Command**: `npm run build`
   - **Output Directory**: `docs/.vitepress/dist`
   - **Environment Variables**: 无需配置。
4. **Deploy**：点击部署按钮。

## 方式二：使用 Vercel CLI 本地部署

1. 运行部署命令：
   ```bash
   vercel
   ```
2. 按照提示操作：
   - `Build Command`: `npm run build`
   - `Output Directory`: `docs/.vitepress/dist`

## 常见问题

### 样式丢失或 404？
- 确保 **Output Directory** 正确设置为 `docs/.vitepress/dist`。这是 VitePress 默认的构建输出目录。
