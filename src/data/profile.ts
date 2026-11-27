export const SITE = {
  url: 'https://vergil.me',
  icpNumber: '粤ICP备2024281609号-2',
  icpUrl: 'https://beian.miit.gov.cn/',
} as const;

export const PROFILE = {
  enName: 'Vergil',
  fullEnName: 'Vergil Lu',
  cnName: '快跑啊小卢_',
  location: '广州',
  email: 'vergilluw@gmail.com',
  avatar: '/assets/vergil-avatar.jpg',
  headline: '独立开发者 · 自媒体创作者',
  intro: '独立开发者、自媒体创作者。做一些日常工具，分享 AI 与 AIGC 的使用经验。',
  bioParagraphs: ['做一些日常工具，分享 AI 与 AIGC 的使用经验。'],
};

export const PACTIME = {
  name: 'Pactime',
  tagline: '给每天的应用使用设个限额',
  meta: 'macOS · Windows · GPL-3.0 开源 · v0.3.6',
  icon: '/assets/pactime-icon.svg',
  lightScreenshot: '/assets/pactime-light.png',
  darkScreenshot: '/assets/pactime-dark.png',
  repoUrl: 'https://github.com/Vergil-coder/pactime',
  releasesUrl: 'https://github.com/Vergil-coder/pactime/releases',
  description:
    '免费、开源的 Windows / macOS 桌面应用时间限制工具。给游戏、视频、社交等软件设定每日使用限额，后台累计计时并在额度用完后自动关闭；支持设置 0–30 分钟关闭延迟，留出保存文档或收尾的时间。',
  facts: [
    '按应用独立分配每日额度，多进程共用计时，每天本地 00:00 重置',
    '规则与近 14 天使用记录完全保存在本机，无需账号、无广告、无数据上传',
    '支持浅色、深色与跟随系统外观，支持简体中文与英文，弹窗与提示音可独立开关',
  ],
};

export const MELLOWFIN = {
  name: '专注鱼鱼',
  enName: 'Mellowfin',
  tagline: '结合番茄专注与养鱼收集的 iOS 独立应用',
  meta: 'iOS · Live Activities · iCloud 同步',
  icon: '/assets/mellowfin-icon.png',
  supportUrl: 'https://vergil-coder.github.io/stillsea-support/support.html#zh',
  description:
    '一款以安静、克制为基调的 iOS 专注计时应用。把每一次有效专注变成看得见的积累——单次有效专注满 10 分钟可获得鱼卵，完整专注 25 分钟可获得海浪卵，结束后点开孵化并收集进自己的鱼群图鉴。',
  facts: [
    {
      label: '专注结卵',
      detail: '单次有效专注满 10 分钟获得鱼卵，完成 25 分钟获得海浪卵，结束即可孵化',
    },
    {
      label: '锁屏实时活动',
      detail: '适配 iOS 通知与锁屏 Live Activities，倒计时状态一目了然',
    },
    {
      label: '图鉴与鱼卡',
      detail: '孵化后的鱼群收纳于图鉴，支持打开详情生成鱼卡并保存到系统相册',
    },
    {
      label: 'iCloud 同步',
      detail: '登录同一 Apple 账户开启 iCloud 同步，换机也能完整找回鱼群与专注记录',
    },
  ],
};

export const OTHER_PROJECTS = [
  {
    name: 'xiaolu-skills',
    tag: 'AI Agent Skills',
    description:
      '真实用过、跑通验证的 AI Skills 工作流库，内置品牌升级提案全流程 Skill（xiaolu-brand-proposal），支持 Claude Code / Cursor / Codex 安装使用。',
    url: 'https://github.com/Vergil-coder/xiaolu-skills',
  },
  {
    name: '声光调节 · Tonivue',
    tag: 'macOS · 筹备上架中',
    icon: '/assets/tonivue-icon.png',
    description:
      '把外接设备的本机音量和外接显示器画面明暗放进一个 Mac 窗口，支持通过键盘亮度键调节鼠标所在屏幕。',
    url: 'https://github.com/Vergil-coder/tonivue-site',
  },
  {
    name: 'ai-multimedia-system',
    tag: 'Next.js · AIGC',
    description:
      '基于 Next.js 与智谱 AI API 构建的多媒体处理系统，支持图片解析、AI 生图与 AI 生视频。',
    url: 'https://github.com/Vergil-coder/ai-multimedia-system',
  },
  {
    name: 'react-big-screen',
    tag: 'React · 数据可视化',
    description: 'React 数据可视化大屏自适应布局与工程实践项目。',
    url: 'https://github.com/Vergil-coder/react-big-screen',
  },
];

export const LINKS = [
  {
    name: 'GitHub',
    handle: '@Vergil-coder',
    url: 'https://github.com/Vergil-coder',
    type: 'link' as const,
  },
  {
    name: 'YouTube',
    handle: '@vergillu',
    url: 'https://www.youtube.com/@vergillu',
    type: 'link' as const,
  },
  {
    name: '稀土掘金',
    handle: '快跑啊小卢_',
    url: 'https://juejin.cn/user/3371904739190105',
    type: 'link' as const,
  },
  {
    name: '哔哩哔哩',
    handle: '快跑啊小卢_',
    url: 'https://search.bilibili.com/upuser?keyword=%E5%BF%AB%E8%B7%91%E5%95%8A%E5%B0%8F%E5%8D%A2_',
    type: 'link' as const,
  },
  {
    name: '小红书 / 抖音',
    handle: '快跑啊小卢_',
    copyText: '快跑啊小卢_',
    type: 'copy' as const,
  },
  {
    name: '微信公众号',
    handle: '前端快快跑',
    copyText: '前端快快跑',
    type: 'copy' as const,
  },
];
