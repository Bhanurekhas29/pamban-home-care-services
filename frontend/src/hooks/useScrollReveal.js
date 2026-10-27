import { useLayoutEffect } from 'react';

// Which parts of the page fade in as they scroll into view, and from which side.
// (The hero animates by itself when the page opens, see styles/motion.css.)
const FROM_BELOW = [
  '.eyebrow', '.services-eyebrow', '.section-title', '.services-heart', '.services-sub', '.why-sub', '.how-sub',
  '.about-text', '.pro-text', '.promises-text', '.pro-quote', '.contact-head > *', '.physio-head > *',
  '.service-card', '.physio-card', '.physio-banner', '.services-cta',
  '.why-card', '.promise-card', '.how-step', '.about-list li', '.about-copy .btn', '.pro-copy .btn',
  '.google-box', '.footer-brand', '.footer-col', '.footer-bottom p',
];
const FROM_LEFT = ['.about-photo-wrap', '.contact-info'];
const FROM_RIGHT = ['.pro-photo-wrap', '.contact-form'];

const STEP_MS = 80; // gap between neighbours (cards in a row, lines in a list)
const MAX_STEPS = 5;
const TRIGGER = 0.97; // an item starts appearing when its top edge is 3% up from the bottom of the screen

export default function useScrollReveal(ready) {
  // runs before the browser paints, so nothing flashes on screen before it is hidden for its entrance
  useLayoutEffect(() => {
    if (!ready) return undefined;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (calm || !('IntersectionObserver' in window)) return undefined;

    const targets = new Map(); // element -> direction
    const add = (selectors, direction) =>
      document.querySelectorAll(selectors.join(',')).forEach((el) => {
        if (el.closest('.hero') || el.closest('.site-header') || targets.has(el)) return;
        targets.set(el, direction);
      });
    add(FROM_BELOW, 'up');
    add(FROM_LEFT, 'left');
    add(FROM_RIGHT, 'right');

    // stagger neighbours: the 1st card first, then the 2nd a moment later, and so on
    const seen = new Map(); // parent -> how many revealed so far
    targets.forEach((direction, el) => {
      const n = seen.get(el.parentElement) || 0;
      seen.set(el.parentElement, n + 1);
      el.classList.add('reveal', `reveal-${direction}`);
      el.style.setProperty('--reveal-delay', `${Math.min(n, MAX_STEPS) * STEP_MS}ms`);
    });

    const pending = new Set(targets.keys());
    const show = (el) => {
      el.classList.add('is-visible');
      pending.delete(el);
      observer.unobserve(el);
    };

    // main trigger: starts a little before the item scrolls into view
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && show(entry.target)),
      { threshold: 0, rootMargin: '0px 0px 4% 0px' }
    );
    pending.forEach((el) => observer.observe(el));

    // safety net: anything on screen or already scrolled past always gets shown, even after a fast scroll
    let frame = 0;
    const sweep = () => {
      frame = 0;
      const limit = window.innerHeight * TRIGGER;
      pending.forEach((el) => { if (el.getBoundingClientRect().top < limit) show(el); });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(sweep); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ready]);
}
