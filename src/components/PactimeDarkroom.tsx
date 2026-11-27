import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, GripVertical } from 'lucide-react';
import { PACTIME } from '../data/profile';
import { useStickyProgress } from '../hooks/useStickyProgress';

const SPECS = [
  { label: '当前版本', value: 'v0.3.6 预览版' },
  { label: '支持平台', value: 'macOS · Windows x64' },
  { label: '数据存储', value: '本地运行 · 无需账号' },
  { label: '开源协议', value: 'GPL-3.0' },
];

const CAPTIONS = [
  '可以给游戏、视频、社交等桌面应用分别设置每天的使用时长，后台累计计时，每天 00:00 重置。',
  '支持浅色和深色界面，到点前可以设置 0–30 分钟的延迟关闭，留出时间保存文档。',
  '不需要注册账号，没有广告和云端上传，规则和近 14 天的使用记录都只保存在本机。',
];

export function PactimeDarkroom() {
  const trackRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { progress } = useStickyProgress(trackRef);

  const [manualSplit, setManualSplit] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const lastProgressRef = useRef(progress);

  useEffect(() => {
    if (Math.abs(progress - lastProgressRef.current) > 0.015) {
      setManualSplit(null);
      lastProgressRef.current = progress;
    }
  }, [progress]);

  const scrollSplit =
    progress <= 0.16
      ? 100
      : progress >= 0.82
      ? 0
      : 100 - ((progress - 0.16) / (0.82 - 0.16)) * 100;

  const split = manualSplit ?? scrollSplit;
  const captionIdx = split > 68 ? 0 : split > 30 ? 1 : 2;
  const frameScale = 0.94 + Math.min(1, progress / 0.16) * 0.06;

  const updateFromClientX = (clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setManualSplit(Math.min(98, Math.max(2, pct)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    if (dragging) setDragging(false);
  };

  return (
    <section
      id="pactime"
      ref={trackRef}
      className="relative h-[265vh] bg-[var(--carbon)] text-[#F2EFE9]"
      aria-label="Pactime 作品展示"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-between overflow-x-clip px-6 pt-22 pb-8 sm:px-12 lg:px-16">
        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src={PACTIME.icon}
              alt="Pactime 图标"
              className="h-10 w-10 rounded-[10px]"
            />
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h2 className="font-serif-editorial text-[34px] leading-none italic text-[#F2EFE9] sm:text-[38px]">
                {PACTIME.name}
              </h2>
              <span className="text-[13.5px] text-white/60">{PACTIME.tagline}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[12.5px]">
            <div className="hidden items-center rounded-full border border-white/14 bg-white/[0.04] p-0.5 text-[11px] md:inline-flex">
              <button
                type="button"
                onClick={() => setManualSplit(100)}
                className={`rounded-full px-2.5 py-0.5 transition-colors ${
                  split >= 90 ? 'bg-[#F2EFE9] text-[#10100F]' : 'text-white/55 hover:text-white'
                }`}
              >
                浅色
              </button>
              <button
                type="button"
                onClick={() => setManualSplit(50)}
                className={`rounded-full px-2.5 py-0.5 transition-colors ${
                  split > 10 && split < 90
                    ? 'bg-[#F2EFE9] text-[#10100F]'
                    : 'text-white/55 hover:text-white'
                }`}
              >
                对比
              </button>
              <button
                type="button"
                onClick={() => setManualSplit(0)}
                className={`rounded-full px-2.5 py-0.5 transition-colors ${
                  split <= 10 ? 'bg-[#F2EFE9] text-[#10100F]' : 'text-white/55 hover:text-white'
                }`}
              >
                深色
              </button>
            </div>

            <a
              href={PACTIME.releasesUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-[#F2EFE9] px-4 py-1.5 font-medium text-[#10100F] transition-opacity hover:opacity-85"
            >
              下载安装
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={PACTIME.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="link-editorial text-white/80 hover:text-white"
            >
              GitHub
              <ArrowUpRight className="ml-0.5 h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>

        <div className="relative z-10 mx-auto my-auto flex w-full max-w-[740px] flex-col items-center">
          <div
            className="w-full will-change-transform"
            style={{ transform: `scale(${frameScale})` }}
          >
            <div
              ref={frameRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              role="slider"
              tabIndex={0}
              aria-label="滚动或左右拖拽对比 Pactime 浅色与深色真实界面"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(split)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') setManualSplit(Math.max(0, split - 8));
                if (e.key === 'ArrowRight') setManualSplit(Math.min(100, split + 8));
              }}
              className="group relative aspect-[147/100] w-full cursor-ew-resize select-none overflow-hidden rounded-xl border border-white/15 bg-[#161614] shadow-[0_36px_90px_-30px_rgba(0,0,0,0.9)] touch-none"
            >
              <img
                src={PACTIME.darkScreenshot}
                alt="Pactime macOS 深色真实界面"
                draggable={false}
                className="pointer-events-none block h-full w-full object-cover"
              />

              <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `inset(0 ${100 - split}% 0 0)`,
                  transition:
                    dragging || manualSplit === null
                      ? 'none'
                      : 'clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <img
                  src={PACTIME.lightScreenshot}
                  alt="Pactime macOS 浅色真实界面"
                  draggable={false}
                  className="block h-full w-full object-cover"
                />
              </div>

              <div
                className="pointer-events-none absolute top-0 bottom-0 z-10 w-[1.5px] bg-[#E57A54]"
                style={{
                  left: `${split}%`,
                  transition:
                    dragging || manualSplit === null
                      ? 'none'
                      : 'left 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div className="absolute top-1/2 left-1/2 flex h-9 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#10100F] text-[#E57A54] shadow-lg">
                  <GripVertical className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-center text-[14px] leading-relaxed text-white/70">
            {CAPTIONS[captionIdx]}
          </p>
        </div>

        <dl className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-2 border-t border-white/14 pt-4 sm:grid-cols-4">
          {SPECS.map((spec) => (
            <div key={spec.label} className="px-2 py-1 text-center">
              <dt className="text-[11px] text-white/45">{spec.label}</dt>
              <dd className="mt-0.5 text-[13px] font-medium text-[#F2EFE9]">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
