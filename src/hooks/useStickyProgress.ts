import { useCallback, useEffect, useState, type RefObject } from 'react';

/**
 * Tracks normalized scroll progress [0..1] through a tall sticky section container.
 * 0 = top of container reaches top of viewport
 * 1 = bottom of container reaches bottom of viewport
 */
export function useStickyProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const compute = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
      const raw = -rect.top / scrollable;
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress((prev) => (Math.abs(prev - clamped) > 0.0005 ? clamped : prev));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);

  const scrollToProgress = useCallback(
    (target: number) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const topDoc = window.scrollY + rect.top;
      const scrollable = Math.max(1, el.offsetHeight - window.innerHeight);
      window.scrollTo({
        top: topDoc + scrollable * Math.min(1, Math.max(0, target)),
        behavior: 'smooth',
      });
    },
    [ref]
  );

  return { progress, scrollToProgress };
}
