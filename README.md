# Vergil 的个人网站

React 19 + TypeScript + Vite + Tailwind CSS。保留现有设计，个人介绍已精简；页面构建时预渲染，线上使用 Nginx 静态托管。

## 本地开发

```bash
npm ci
npm run dev
```

构建：`npm run build`。需要 Node.js 22.12 或以上。

## Git 部署

源码仓库：[Vergil-coder/vergil-site](https://github.com/Vergil-coder/vergil-site)（公开）。服务器可通过 HTTPS 直接 clone 并构建，Nginx 指向 `/opt/vergil/dist`。以后在服务器工程目录执行：

```bash
npm run update
```

该命令只做 git pull、npm ci 和构建；不传压缩包，不给这台 Mac 添加服务器登录权限，不配置 GitHub Actions 或存储服务器密钥。

首次操作见 [部署说明](docs/部署说明.md)。本地已连接该公开仓库；线上服务器仍需按部署说明首次配置。

## 文件

- `src/`：React 页面与内容。
- `public/`：图片、本地字体、错误页和关闭 JS 时的阅读样式。
- `tools/build.mjs`：静态预渲染。
- `deploy/update.sh`：服务器 Git 更新命令。
- `deploy/vergil.me.conf` / `vergil.me.https.conf`：HTTP / HTTPS 配置示例。
- `src/data/profile.ts`：网站 ICP「粤ICP备2024281609号-2」及个人、项目资料。
- `backups/`：本轮修改前的本地备份，不部署。

字体已本地化，许可证随文件提供；添加新文案可用 `tools/prepare-fonts.py` 更新字体子集。

## 许可证

网站程序代码采用 [MIT License](LICENSE)，可以复用并修改。个人头像、产品截图、应用图标、品牌标识和个人资料不在 MIT 授权范围内，复用网站时请替换为自己的内容；第三方字体仍遵守 public/fonts 中随附的许可证。
