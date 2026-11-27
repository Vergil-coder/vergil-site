import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { LINKS, PROFILE, SITE } from '../data/profile';

export function MonumentalFooter() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Ignore gracefully
    }
  };

  return (
    <footer
      id="contact"
      className="bg-[var(--carbon)] pt-24 pb-10 text-[#F2EFE9]"
      aria-label="社交账号与联系方式"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-12 lg:px-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[28px] font-semibold tracking-tight text-[#F2EFE9] sm:text-[34px]">
            在这里找到我
          </h2>
        </div>

        <div className="grid grid-cols-2 border-t border-l border-white/12 sm:grid-cols-3">
          {LINKS.map((item) => {
            if (item.type === 'link') {
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col justify-between border-r border-b border-white/12 p-5 transition-colors hover:bg-white/[0.04] sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium text-[#F2EFE9] group-hover:text-[#E57A54]">
                      {item.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#E57A54]" />
                  </div>
                  <span className="font-mono-tech mt-4 text-[12px] text-white/50">
                    {item.handle}
                  </span>
                </a>
              );
            }

            const copied = copiedKey === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => handleCopy(item.name, item.copyText)}
                className="group flex flex-col justify-between border-r border-b border-white/12 p-5 text-left transition-colors hover:bg-white/[0.04] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-medium text-[#F2EFE9] group-hover:text-[#E57A54]">
                    {item.name}
                  </span>
                  {copied ? (
                    <Check className="h-4 w-4 text-[#E57A54]" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-white/40 group-hover:text-[#E57A54]" />
                  )}
                </div>
                <span className="font-mono-tech mt-4 text-[12px] text-white/50">
                  {copied ? '已复制到剪贴板' : item.handle}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-20 border-t border-white/12 pt-16 text-center">
          <p className="text-[13.5px] text-white/50">
            产品反馈或交流，欢迎来信。
          </p>

          <button
            type="button"
            onClick={() => handleCopy('email', PROFILE.email)}
            className="group mx-auto mt-4 block"
          >
            <span className="font-serif-editorial break-all text-[clamp(2.4rem,7.8vw,6.4rem)] leading-[1.0] italic text-[#F2EFE9] transition-colors duration-300 group-hover:text-[#E57A54]">
              {PROFILE.email}
            </span>
          </button>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => handleCopy('email', PROFILE.email)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F2EFE9] px-5 py-2 text-[12.5px] font-medium text-[#10100F] transition-opacity hover:opacity-85"
            >
              {copiedKey === 'email' ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>已复制邮箱</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>复制邮箱</span>
                </>
              )}
            </button>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1 rounded-full border border-white/20 px-5 py-2 text-[12.5px] text-[#F2EFE9] transition-colors hover:border-white/50"
            >
              <span>直接发邮件</span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-65" />
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 items-center gap-2 border-t border-white/12 pt-7 text-[12px] text-white/40 sm:grid-cols-3">
          <span>© 2026 {PROFILE.fullEnName}</span>
          <span className="hidden text-center sm:block">
            {PROFILE.cnName} · 独立开发 · AI 分享
          </span>
          <span className="text-right">广州</span>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] leading-6 text-[#F2EFE9]/75">
          <span>Vergil 的个人网站</span>
          <a
            href={SITE.icpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 transition-colors hover:text-[#E57A54] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E57A54]"
          >
            {SITE.icpNumber}
          </a>
        </div>
      </div>
    </footer>
  );
}
