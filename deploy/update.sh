#!/usr/bin/env bash
# Run in the server's website checkout. No SSH access is granted to another machine.
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo '请先从网站 Git 仓库 clone 此项目。'; exit 1
fi
if [ -n "$(git status --porcelain --untracked-files=no)" ]; then
  echo '服务器上的代码存在本地修改，已停止更新。'; exit 1
fi
node -e 'const [major,minor]=process.versions.node.split(".").map(Number);if(major<22||(major===22&&minor<12)){console.error("需要 Node.js 22.12 或以上");process.exit(1)}'
git pull --ff-only
npm ci
npm run build
printf '\n网站文件已更新。静态内容不需要重启 Nginx。\n'
