'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const REDUCED = '(prefers-reduced-motion: reduce)';
const LENIS_OPTIONS = { lerp: 0.1, wheelMultiplier: 1, smoothWheel: true };
const HOME = '/';

/** Inertial scrolling for the whole page, driven by GSAP's ticker so ScrollTrigger animations stay in step with it. */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia(REDUCED).matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const instance = new Lenis(LENIS_OPTIONS);
    lenis.current = instance;
    const tick = (time: number) => instance.raf(time * 1000);
    instance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // Posts and case studies always open at their top, even mid-glide; the home page keeps the reader's place and its section links.
  useEffect(() => {
    if (pathname === HOME || window.location.hash) return;
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
