// Scroll-linked motion: smooth scrolling + a few scrubbed moments. Loaded lazily, only when
// the visitor has not asked for reduced motion.
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -84 } });
window.__lenis = lenis;
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// The logo mark in the "Why" panel turns as you scroll past it.
const spin = document.querySelector('[data-spin]');
if (spin) {
  gsap.fromTo(
    spin,
    { rotation: -35, scale: 0.88 },
    { rotation: 65, scale: 1, ease: 'none', scrollTrigger: { trigger: spin.closest('.why'), start: 'top bottom', end: 'bottom top', scrub: 0.6 } }
  );
}

// The hero spiral drifts up and softens as the hero leaves.
const visual = document.querySelector('[data-hero-visual]');
if (visual) {
  gsap.to(visual, {
    yPercent: -8,
    opacity: 0.35,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });
}

// Closing rings open up as the call to action arrives.
const rings = document.querySelector('[data-cta-rings]');
if (rings) {
  gsap.fromTo(
    rings,
    { scale: 0.7, transformOrigin: '50% 50%' },
    { scale: 1.15, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: 0.8 } }
  );
}

export function stopScroll() { lenis.stop(); }
export function startScroll() { lenis.start(); }
