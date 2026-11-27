import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MELLOWFIN } from '../data/profile';
import { useStickyProgress } from '../hooks/useStickyProgress';

const PLATES = [
  {
    index: '01',
    numeral: '10′',
    shortLabel: '10 分钟得鱼卵',
    tag: '短时专注',
    title: '单次有效专注满 10 分钟就能获得鱼卵',
    detail:
      '不需要一开始就定很长的目标，单次专注满 10 分钟就有鱼卵，平时短时间专注也能有正反馈。',
    meta: '单次有效专注 10 分钟',
  },
  {
    index: '02',
    numeral: '25′',
    shortLabel: '25 分钟海浪卵',
    tag: '番茄计时',
    title: '完整专注 25 分钟获得海浪卵',
    detail:
      '完成一轮 25 分钟专注可以获得海浪卵，计时结束后点开即可孵化，收集不同的鱼。',
    meta: '完整专注 25 分钟',
  },
  {
    index: '03',
    numeral: '03',
    shortLabel: '锁屏实时活动',
    tag: 'iOS 原生适配',
    title: '支持锁屏实时活动与通知提醒',
    detail:
      '适配 iOS 锁屏 Live Activities，开始倒计时后锁屏也能直接看到剩余时间，不用频繁解锁手机。',
    meta: 'Live Activities 锁屏计时',
  },
  {
    index: '04',
    numeral: '04',
    shortLabel: '图鉴与 iCloud',
    tag: '收藏与同步',
    title: '支持保存鱼卡和 iCloud 跨设备同步',
    detail:
      '孵化后的鱼会收录在图鉴里，可以把鱼卡保存到相册；两台设备登录同一 Apple 账户并开启 iCloud 同步，换手机也能找回鱼群和记录。',
    meta: '鱼卡保存 · iCloud 同步',
  },
] as const;

export function MellowfinGallery() {
  const trackRef = useRef<HTMLElement>(null);
  const { progress, scrollToProgress } = useStickyProgress(trackRef);

  const activeIdx = Math.min(3, Math.floor(progress * 3.99));
  const slideOffsetPct = progress * 300;

  return (
    <section
      id="mellowfin"
      ref={trackRef}
      className="relative h-[300vh] bg-[var(--sea)] text-[var(--sea-ink)]"
      aria-label="专注鱼鱼横向滚动画廊"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-x-clip px-6 pt-22 pb-10 sm:px-12 lg:px-16">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={MELLOWFIN.icon}
              alt="专注鱼鱼图标"
              className="h-10 w-10 rounded-[10px] border border-[var(--sea-ink)]/15 object-cover"
            />
            <div className="flex items-baseline gap-2.5">
              <h2 className="text-[24px] leading-none font-semibold tracking-tight text-[var(--sea-ink)] sm:text-[28px]">
                {MELLOWFIN.name}
              </h2>
              <span className="font-serif-editorial text-[28px] leading-none italic text-[var(--sea-ink)]/65 sm:text-[32px]">
                {MELLOWFIN.enName}
              </span>
            </div>
          </div>

          <a
            href={MELLOWFIN.supportUrl}
            target="_blank"
            rel="noreferrer"
            className="link-editorial text-[13px] text-[var(--sea-ink)]"
          >
            产品支持与说明
            <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mx-auto my-auto w-full max-w-[1160px] overflow-hidden">
          <div
            className="flex will-change-transform"
            data-gallery-slides
            style={{
              transform: `translate3d(-${Math.min(300, Math.max(0, slideOffsetPct))}%, 0, 0)`,
            }}
          >
            {PLATES.map((plate) => (
              <div key={plate.index} className="w-full shrink-0 px-4 sm:px-10">
                <div className="grid items-center gap-8 border-y border-[var(--sea-ink)]/15 py-10 sm:py-14 md:grid-cols-12">
                  <div className="text-center md:col-span-5 md:border-r md:border-[var(--sea-ink)]/15 md:pr-8">
                    <div className="font-serif-editorial px-2 text-[clamp(4.8rem,12vw,9.6rem)] leading-[0.95] italic text-[var(--sea-ink)]">
                      {plate.numeral}
                    </div>
                    <div className="mt-4 text-[12px] text-[var(--sea-ink)]/65">
                      {plate.meta}
                    </div>
                  </div>

                  <div className="text-center md:col-span-7 md:pl-8 md:text-left">
                    <div className="text-[12px] font-medium text-[var(--accent)]">
                      {plate.tag}
                    </div>
                    <h3 className="mt-3 text-[22px] leading-snug font-semibold tracking-tight text-[var(--sea-ink)] sm:text-[28px]">
                      {plate.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-[15px] leading-[1.85] text-[var(--sea-ink)]/75">
                      {plate.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1200px]">
          <div className="h-[1px] w-full overflow-hidden bg-[var(--sea-ink)]/15">
            <div
              className="h-full origin-left bg-[var(--sea-ink)]"
              style={{ transform: `scaleX(${Math.max(0.03, progress)})` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-center sm:grid-cols-4" data-gallery-controls>
            {PLATES.map((plate, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  key={plate.index}
                  type="button"
                  onClick={() => scrollToProgress(idx / 3)}
                  className={`py-1 text-[12px] transition-opacity ${
                    active
                      ? 'font-semibold text-[var(--sea-ink)] opacity-100'
                      : 'text-[var(--sea-ink)] opacity-45 hover:opacity-85'
                  }`}
                >
                  {plate.shortLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
