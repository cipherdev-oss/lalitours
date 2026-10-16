import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export interface SmoothScrollOptions {
  duration?: number;
  offset?: number;
  immediate?: boolean;
  onComplete?: () => void;
}

/**
 * Initialize Lenis smooth scroll engine on the window
 */
export function initSmoothScroll(): Lenis {
  if (typeof window === 'undefined') {
    return null as unknown as Lenis;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  // Initialize Lenis with smooth physics easing that prevents harsh corner/edge hits
  lenisInstance = new Lenis({
    duration: 1.25,
    // Exponential ease-out decelerates smoothly to 0 velocity before hitting boundaries
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.2,
    syncTouch: true,
    syncTouchLerp: 0.08,
    touchInertiaExponent: 1.6,
    infinite: false,
  });

  // RAF loop
  function raf(time: number) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  // Mark document element with lenis-initialized attribute for styling
  document.documentElement.classList.add('has-lenis-smooth');

  return lenisInstance;
}

/**
 * Get active Lenis instance if available
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Destroy Lenis instance on cleanup
 */
export function destroySmoothScroll() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('has-lenis-smooth');
  }
}

/**
 * Smoothly glide to a specific target (pixel offset, element ID, or DOM element)
 * Features asymptotic ease-out so it cushions before reaching the target
 */
export function smoothScrollTo(
  target: number | string | HTMLElement,
  options?: SmoothScrollOptions
) {
  const duration = options?.duration ?? 1.2;
  const offset = options?.offset ?? 0;
  const immediate = options?.immediate ?? false;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      duration,
      offset,
      immediate,
      lock: false,
      onComplete: () => {
        if (options?.onComplete) options.onComplete();
      },
    });
    return;
  }

  // Fallback if Lenis is not available
  if (typeof window === 'undefined') return;

  if (typeof target === 'number') {
    window.scrollTo({
      top: Math.max(0, target + offset),
      behavior: immediate ? 'auto' : 'smooth',
    });
  } else if (typeof target === 'string') {
    const el = document.querySelector(target) || document.getElementById(target.replace('#', ''));
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: immediate ? 'auto' : 'smooth',
      });
    }
  } else if (target instanceof HTMLElement) {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: immediate ? 'auto' : 'smooth',
    });
  }

  if (options?.onComplete) {
    setTimeout(options.onComplete, immediate ? 0 : duration * 1000);
  }
}

/**
 * Smoothly scroll to the very top (start) of the page without abrupt corner hitting
 */
export function smoothScrollToTop(duration = 1.25, onComplete?: () => void) {
  smoothScrollTo(0, {
    duration,
    offset: 0,
    onComplete,
  });
}

/**
 * Temporarily pause smooth scroll (e.g., when full-screen modal or lightbox is opened)
 */
export function pauseSmoothScroll() {
  lenisInstance?.stop();
}

/**
 * Resume smooth scroll
 */
export function resumeSmoothScroll() {
  lenisInstance?.start();
}
