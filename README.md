# Vergil 的个人网站

React 19 + TypeScript + Vite + Tailwind CSS。保留现有设计，个人介绍已精简；页面构建时预渲染，线上使用 Nginx 静态托管。

## 本地开发

```bash
npm ci
npm run dev
```

构建：`npm run build`。需要 Node.js 22.12 或以上。

## Git 部署

把源码提交到你自己的 Git 仓库，服务器 clone 后构建一次，Nginx 指向 `/opt/vergil/dist`。以后在服务器工程目录执行：

```bash
npm run update
```

该命令只做 git pull、npm ci 和构建；不传压缩包，不给这台 Mac 添加服务器登录权限，不配置 GitHub Actions 或存储服务器密钥。

首次操作见 [部署说明](docs/部署说明.md)。本轮尚未创建或连接远程仓库，也没有改动服务器。

## 文件

- `src/`：React 页面与内容。
- `public/`：图片、本地字体、错误页和关闭 JS 时的阅读样式。
- `tools/build.mjs`：静态预渲染。
- `deploy/update.sh`：服务器 Git 更新命令。
- `deploy/vergil.me.conf` / `vergil.me.https.conf`：HTTP / HTTPS 配置示例。
- `src/data/profile.ts`：网站 ICP「粤ICP备2024281609号-2」及个人、项目资料。
- `backups/`：本轮修改前的本地备份，不部署。

字体已本地化，许可证随文件提供；添加新文案可用 `tools/prepare-fonts.py` 更新字体子集。
