const root = document.documentElement;
const motion = root.classList.contains('motion-ok');

function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-solid', y > 24);
    if (!document.body.classList.contains('menu-open')) {
      header.classList.toggle('is-hidden', y > 240 && y > lastY + 4);
      if (y < lastY - 4 || y < 240) header.classList.remove('is-hidden');
    }
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

function initMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;

  const set = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.menu-toggle__label').textContent = open ? 'Close' : 'Menu';
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
    if (open) menu.querySelector('a')?.focus({ preventScroll: true });
  };
  toggle.addEventListener('click', () => set(menu.hidden));
  menu.querySelectorAll('[data-menu-link]').forEach((a) => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { set(false); toggle.focus(); } });
  window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => { if (e.matches && !menu.hidden) set(false); });
}

// Services: hover (mouse) or click/tap/keyboard opens a row and closes the others.
function initServices() {
  const rows = [...document.querySelectorAll('[data-svc]')];
  if (!rows.length) return;
  const set = (row, open) => {
    row.classList.toggle('is-open', open);
    row.querySelector('button').setAttribute('aria-expanded', String(open));
  };
  rows.forEach((row) => {
    row.querySelector('button').addEventListener('click', (e) => {
      // with a mouse, hover has already opened the row, so a click keeps it open;
      // touch and keyboard have no hover, so they toggle
      const open = e.pointerType === 'mouse' ? true : !row.classList.contains('is-open');
      rows.forEach((r) => set(r, false));
      set(row, open);
    });
    row.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse') return;
      rows.forEach((r) => set(r, r === row));
    });
  });
}

function initReveals() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
}

function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const t0 = performance.now() + 900;
    const dur = 1600;
    el.textContent = '0';
    const tick = (now) => {
      const p = Math.min(Math.max((now - t0) / dur, 0), 1);
      el.textContent = String(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

async function initHeroStory() {
  const story = document.querySelector('[data-story]');
  if (!story) return;
  try {
    const { initHeroStory } = await import('./hero-story.js');
    initHeroStory(story, { reduced: !motion });
  } catch (err) {
    // the step labels and captions still work as plain content
    console.warn('Hero animation unavailable.', err);
  }
}

function boot() {
  try {
    initHeader();
    initMenu();
    initServices();
    if (motion) {
      initReveals();
      initCounters();
    }
    initHeroStory();
    if (motion) {
      const load = () => import('./motion.js').catch((e) => console.warn('Scroll motion unavailable.', e));
      'requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 1500 }) : setTimeout(load, 300);
    }
  } catch (err) {
    // never leave content hidden if the enhancement layer fails
    console.error(err);
    root.classList.remove('motion-ok');
    root.classList.add('no-motion');
  }
}

boot();
