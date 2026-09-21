// Hero story: four illustrated scenes — Ideas, Strategy, Visibility, Growth.
// The scenes are pure CSS (see .stage in global.css); moving from one to the next is just a
// change of the stage's data-scene attribute, so the same chips glide and morph between layouts.
// This file only decides *when* to change scene:
//   - each step button has a progress bar; when the active bar finishes, the next scene starts
//   - clicking a step jumps straight to it
//   - everything pauses while the card is off-screen or the tab is hidden

export function initHeroStory(root) {
  const stage = root.querySelector('[data-stage]');
  const steps = root.querySelector('.story__steps');
  const buttons = [...root.querySelectorAll('[data-step]')];
  const lines = [...root.querySelectorAll('[data-line]')];
  if (!stage || !buttons.length) return;

  let cur = 0;

  function show(next) {
    cur = next;
    stage.dataset.scene = String(cur);
    buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === cur)));
    lines.forEach((l, i) => l.classList.toggle('is-active', i === cur));
    // replay the glass sheen that sweeps across the card on every change
    stage.classList.remove('is-changing');
    void stage.offsetWidth;
    stage.classList.add('is-changing');
  }

  buttons.forEach((b, i) => b.addEventListener('click', () => { if (i !== cur) show(i); }));

  // the active step's progress bar is a CSS animation; when it ends, move on
  steps.addEventListener('animationend', (e) => {
    if (e.animationName === 'barFill') show((cur + 1) % buttons.length);
  });

  // depth parallax: the pieces drift slightly with the mouse, each at its own depth (mouse only)
  let raf = 0;
  let tx = 0;
  let ty = 0;
  const flush = () => {
    raf = 0;
    stage.style.setProperty('--px', tx.toFixed(3));
    stage.style.setProperty('--py', ty.toFixed(3));
  };
  root.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = stage.getBoundingClientRect();
    tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
    ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    if (!raf) raf = requestAnimationFrame(flush);
  });
  root.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(flush); });

  // pause off-screen / in a hidden tab (CSS pauses every animation inside .is-paused)
  let visible = true;
  const apply = () => root.classList.toggle('is-paused', !visible || document.hidden);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; apply(); }, { threshold: 0.15 }).observe(root);
  document.addEventListener('visibilitychange', apply);
}
