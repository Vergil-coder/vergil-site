import { useRef } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { MELLOWFIN, PACTIME, PROFILE } from '../data/profile';
import { useStickyProgress } from '../hooks/useStickyProgress';

export function HeroAperture() {
  const trackRef = useRef<HTMLElement>(null);
  const { progress } = useStickyProgress(trackRef);

  const shiftY = -progress * 42;
  const opacity = Math.max(0.14, 1 - progress * 1.02);
  const scale = 1 - progress * 0.035;

  return (
    <section
      id="cover"
      ref={trackRef}
      className="relative h-[135vh] bg-[var(--linen)] text-[var(--ink)]"
      aria-label="个人首页封面"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-x-clip px-6 pt-16 pb-10 sm:px-12 lg:px-16">
        <div
          className="mx-auto grid w-full max-w-[1200px] items-center gap-12 will-change-transform lg:grid-cols-12 lg:gap-14"
          style={{
            transform: `translate3d(0, ${shiftY}px, 0) scale(${scale})`,
            opacity,
          }}
        >
          {/* Left 7 Columns: Clean Overseas Editorial Typography & Actions */}
          <div className="lg:col-span-7">
            <h1 className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <span className="overflow-hidden pb-2">
                <span className="blind-reveal font-serif-editorial block pr-2 text-[clamp(4.4rem,9.2vw,8rem)] leading-[1.0] font-normal italic tracking-[-0.03em] text-[var(--ink)]">
                  Vergil
                </span>
              </span>
              <span className="overflow-hidden pb-1">
                <span className="blind-reveal blind-delay-1 font-display block text-[clamp(1.35rem,2.4vw,2rem)] font-medium tracking-tight text-[var(--ink-muted)]">
                  {PROFILE.cnName}
                </span>
              </span>
            </h1>

            <p className="blind-reveal blind-delay-2 mt-5 max-w-[540px] text-[16px] leading-[1.85] text-[var(--ink)]/80 sm:text-[17.5px]">
              {PROFILE.intro}
            </p>

            {/* Clean Primary & Secondary Actions */}
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a
                href="#pactime"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-[13.5px] font-medium text-[var(--linen)] transition-opacity hover:opacity-85"
              >
                <span>查看作品</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://github.com/Vergil-coder"
                target="_blank"
                rel="noreferrer"
                className="link-editorial text-[14px] text-[var(--ink)]"
              >
                GitHub
                <ArrowUpRight className="ml-0.5 h-3.5 w-3.5 opacity-55" />
              </a>

              <a
                href="#contact"
                className="link-editorial text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)]"
              >
                联系我
              </a>
            </div>
          </div>

          {/* Right 5 Columns: Refined Editorial Profile & Works Card */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[var(--line-light)] bg-[#FAF8F4] p-6 shadow-[0_20px_50px_-36px_rgba(0,0,0,0.22)] sm:p-7">
              {/* Top Row: Crisp Real Portrait + Straightforward Info */}
              <div className="flex items-center gap-5">
                <img
                  src={PROFILE.avatar}
                  alt="Vergil · 快跑啊小卢_"
                  className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
                />
                <div className="min-w-0 space-y-2.5">
                  <div>
                    <div className="text-[15px] font-semibold text-[var(--ink)]">
                      {PROFILE.cnName}
                    </div>
                    <div className="text-[12.5px] text-[var(--ink-muted)]">
                      广州
                    </div>
                  </div>


                </div>
              </div>

              {/* Divider */}
              <div className="my-5 h-[1px] w-full bg-[var(--line-light)]" />

              {/* Bottom Row: 2 Flagship Works */}
              <div className="space-y-2.5">
                <a
                  href="#pactime"
                  className="group flex items-center justify-between gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-[var(--linen)]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={PACTIME.icon}
                      alt="Pactime 图标"
                      className="h-9 w-9 shrink-0 rounded-[9px]"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold text-[var(--ink)] group-hover:text-[var(--accent)]">
                        {PACTIME.name}
                      </div>
                      <div className="truncate text-[12px] text-[var(--ink-muted)]">
                        Windows / macOS 应用时间限制工具
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[var(--ink-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
                </a>

                <a
                  href="#mellowfin"
                  className="group flex items-center justify-between gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-[var(--linen)]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={MELLOWFIN.icon}
                      alt="专注鱼鱼图标"
                      className="h-9 w-9 shrink-0 rounded-[9px] border border-black/10 object-cover"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold text-[var(--ink)] group-hover:text-[var(--accent)]">
                        {MELLOWFIN.name}
                      </div>
                      <div className="truncate text-[12px] text-[var(--ink-muted)]">
                        iOS 番茄专注与养鱼收集应用
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[var(--ink-muted)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
