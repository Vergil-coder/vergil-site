# 当前实现方案

采用 /Volumes/My PSSD/vergil 中的原有设计。

1. 保留 React、TypeScript、Vite、Tailwind 与 Lenis，构建为 Nginx 静态站点。
2. 页脚显示网站备案号及工信部链接，构建期预渲染，字体本地托管。
3. 精简个人简介，删除冗长的履历和宣言。
4. 使用普通 Git 拉取及构建更新，不上传压缩包，不配置 GitHub Actions，不授予 Mac 服务器登录权限。
5. 当前仅完成本地代码、构建和部署说明；源码备份至 Vergil-coder/vergil-site 公开仓库，线上部署尚未完成。

实际步骤见「部署说明.md」。
