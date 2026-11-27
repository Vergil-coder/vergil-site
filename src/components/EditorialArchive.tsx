import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Minus, Plus } from 'lucide-react';
import { OTHER_PROJECTS } from '../data/profile';

const ARCHIVE_DETAILS: Record<
  string,
  { year: string; stack: string[]; command?: string; note: string }
> = {
  'xiaolu-skills': {
    year: '2026',
    stack: ['Agent Skills', 'Claude Code', 'Cursor / Codex', 'MIT'],
    command:
      '帮我从这个仓库安装 Skills：https://github.com/Vergil-coder/xiaolu-skills',
    note: '一些常用的 AI 工作流，支持 Claude Code、Cursor 和 Codex。',
  },
  '声光调节 · Tonivue': {
    year: '2026',
    stack: ['macOS 原生', '音频输出控制', '外接屏调光'],
    note: 'Mac 外接屏亮度和音量调节工具。',
  },
  'ai-multimedia-system': {
    year: '2025',
    stack: ['Next.js', 'TypeScript', '智谱 AI API'],
    note: '用 Next.js 和智谱 AI API 做的一个多媒体处理项目，支持图片解析、AI 生图和 AI 生视频。',
  },
  'react-big-screen': {
    year: '2024',
    stack: ['React', 'TypeScript', '数据可视化'],
    note: '之前做数据可视化大屏时整理的 React 自适应布局项目。',
  },
};

export function EditorialArchive() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  const copyCommand = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 1800);
    } catch {
      // Ignore gracefully
    }
  };

  return (
    <section
      id="archive"
      className="bg-[var(--linen)] px-6 pt-28 pb-24 text-[var(--ink)] sm:px-12 sm:pt-32 sm:pb-32 lg:px-16"
      aria-label="开源与更多项目"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.08] font-semibold tracking-tight text-[var(--ink)]">
              开源与更多项目
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p className="text-[14px] leading-relaxed text-[var(--ink-muted)]">
              一些开源项目和小工具。
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--line-light)]">
          {OTHER_PROJECTS.map((project, idx) => {
            const isOpen = openIdx === idx;
            const detail = ARCHIVE_DETAILS[project.name];

            return (
              <div key={project.name} className="border-b border-[var(--line-light)]">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="ink-sweep-row group flex w-full items-center justify-between gap-4 px-3 py-6 text-left sm:px-6 sm:py-8"
                >
                  <div className="relative z-10 flex min-w-0 items-center gap-5 sm:gap-10">
                    <span className="font-mono-tech text-[12px] opacity-50">
                      0{idx + 1}
                    </span>

                    <div className="flex min-w-0 items-center gap-3.5">
                      {project.icon && (
                        <img
                          src={project.icon}
                          alt=""
                          className="h-8 w-8 shrink-0 rounded-[8px] object-cover"
                        />
                      )}
                      <span className="font-display truncate text-[clamp(1.35rem,3vw,2.5rem)] leading-tight font-medium tracking-tight">
                        {project.name}
                      </span>
                    </div>
                  </div>

                  <div className="relative z-10 flex shrink-0 items-center gap-6">
                    <span className="hidden text-[12.5px] opacity-55 md:inline">
                      {project.tag}
                    </span>
                    <span className="font-mono-tech hidden text-[12px] opacity-45 sm:inline">
                      {detail?.year}
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current/25">
                      {isOpen ? (
                        <Minus className="h-3.5 w-3.5" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </div>
                </button>

                <div
                  className="grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="bg-[var(--linen-deep)]/55 px-4 py-6 sm:px-16 sm:py-8">
                      <p className="max-w-3xl text-[15px] leading-[1.85] text-[var(--ink)]/80">
                        {detail?.note ?? project.description}
                      </p>

                      {detail?.command && (
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--line-light)] bg-[var(--linen)] px-4 py-3">
                          <code className="font-mono-tech truncate text-[12px] text-[var(--ink)]">
                            {detail.command}
                          </code>
                          <button
                            type="button"
                            onClick={() => copyCommand(detail.command!)}
                            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#10100F] px-3.5 py-1 text-[11.5px] text-[#F2EFE9] transition-opacity hover:opacity-85"
                          >
                            {copiedCmd ? (
                              <>
                                <Check className="h-3 w-3 text-[#E57A54]" />
                                <span>已复制</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>复制安装口令</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {detail?.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-[var(--line-light)] bg-[var(--linen)] px-3 py-0.5 text-[11.5px] text-[var(--ink-muted)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="link-editorial text-[13px] text-[var(--ink)]"
                        >
                          查看 GitHub 仓库
                          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
