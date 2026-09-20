// Hero story: one set of dots that re-arranges itself through the four things Makudi does,
// using pictures from social media and digital marketing.
//   Ideas      – a light bulb switching on, thoughts drifting around it
//   Strategy   – the funnel: reach, engage, convert
//   Visibility – a network spreading outward: more and more of the audience reached
//   Growth     – bars that climb, with a trend line
// Plain canvas 2D: ~180 dots, no libraries, paused when off-screen or when the tab is hidden.

const N = 182;
const STAGE_SECONDS = 4.8;
const MORPH_SECONDS = 1.5;

const INK = [29, 29, 31];
const GOLD = [253, 184, 19];
const BLUE = [0, 113, 227];
const FONT = '600 11px "Inter Tight Variable", "Helvetica Neue", Arial, sans-serif';

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (x) => x * x * (3 - 2 * x);
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const mix = (a, b, t) => a + (b - a) * t;

function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// per-dot constants (stable across resizes)
const rand = rng(11);
const dot = Array.from({ length: N }, () => ({
  delay: rand(), fx: 0.4 + rand() * 0.9, fy: 0.4 + rand() * 0.9, px: rand() * 6.28, py: rand() * 6.28,
  seedX: rand(), seedY: rand(), seedR: rand(),
}));

// ---- shapes (unit space, y down) and a sampler that spreads n dots evenly along them ----------
function sample(pts, n, closed) {
  const P = closed ? [...pts, pts[0]] : pts;
  const cum = [0];
  for (let i = 1; i < P.length; i++) cum.push(cum[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  const total = cum[cum.length - 1];
  const out = [];
  let seg = 1;
  for (let k = 0; k < n; k++) {
    const d = closed ? (k / n) * total : (n === 1 ? 0 : (k / (n - 1)) * total);
    while (seg < P.length - 1 && cum[seg] < d) seg++;
    const t = (d - cum[seg - 1]) / (cum[seg] - cum[seg - 1] || 1);
    out.push([mix(P[seg - 1][0], P[seg][0], t), mix(P[seg - 1][1], P[seg][1], t)]);
  }
  return out;
}
const place = (pts, cx, cy, s, rot) => pts.map(([x, y]) => [cx + (x * Math.cos(rot) - y * Math.sin(rot)) * s, cy + (x * Math.sin(rot) + y * Math.cos(rot)) * s]);

// ---- the four formations, for a canvas of W x H css pixels -------------------------------------
function layout(W, H) {
  const padX = W * 0.07;
  const padY = H * 0.08;
  const iw = W - padX * 2;
  const ih = H - padY * 2;
  const stages = [0, 1, 2, 3].map(() => ({
    x: new Float32Array(N), y: new Float32Array(N), r: new Float32Array(N), h: new Float32Array(N),
    a: new Float32Array(N), w: new Float32Array(N).fill(0.12),
  }));
  const extra = {};

  // 0 — Ideas: a light bulb switching on, with thoughts drifting around it
  {
    const s = stages[0];
    const rayK = new Float32Array(N).fill(-1);
    let i = 0;
    const put = (pts, r, a = 1, ray = false) => pts.forEach(([x, y], k) => { s.x[i] = x; s.y[i] = y; s.r[i] = r; s.h[i] = 0; s.a[i] = a; s.w[i] = 0.15; rayK[i] = ray ? k : -1; i++; });
    const u = ih / 2.65;
    const ox = W / 2;
    const oy = padY + 1.5 * u;
    const at = (pts) => pts.map(([x, y]) => [ox + x * u, oy + y * u]);

    const glass = [];
    for (let k = 0; k <= 24; k++) { const a = ((135 + (270 * k) / 24) * Math.PI) / 180; glass.push([Math.cos(a) * 0.62, Math.sin(a) * 0.62]); }
    put(at(sample(glass, 44, false)), 2.2);
    put(at([...sample([[-0.44, 0.44], [-0.3, 0.78]], 5, false), ...sample([[0.44, 0.44], [0.3, 0.78]], 5, false)]), 2.2);
    [0.9, 1.02, 1.14].forEach((y, n) => put(at(sample([[-0.3 + n * 0.03, y], [0.3 - n * 0.03, y]], 8, false)), 2.4));
    put(at([
      ...sample([[-0.13, 0.62], [-0.13, 0.1]], 4, false),
      ...sample([[0.13, 0.62], [0.13, 0.1]], 4, false),
      ...sample([[-0.13, 0.1], [-0.065, -0.12], [0, 0.06], [0.065, -0.12], [0.13, 0.1]], 7, false),
    ]), 2.8);
    [-165, -135, -105, -75, -45, -15].forEach((deg) => {
      const a = (deg * Math.PI) / 180;
      put(at([1.0, 1.15, 1.3, 1.45].map((r) => [Math.cos(a) * r, Math.sin(a) * r])), 2.4, 1, true);
    });
    extra.rayK = rayK;

    // the rest: loose thoughts that keep clear of the bulb
    for (; i < N; i++) {
      let x = 0; let y = 0;
      for (let tries = 0; tries < 30; tries++) {
        x = padX + rand() * iw; y = padY + rand() * ih;
        if (Math.hypot(x - ox, y - oy) > u * 1.55) break;
      }
      s.x[i] = x; s.y[i] = y; s.w[i] = 1; s.h[i] = 0;
      s.r[i] = 1.2 + dot[i].seedR * dot[i].seedR * 2;
      s.a[i] = 0.4 + dot[i].seedR * 0.45;
    }
  }

  // 1 — Strategy: the marketing funnel (reach > engage > convert)
  {
    const s = stages[1];
    const counts = [40, 34, 28, 24, 20, 16, 12, 8];
    const fcx = W * 0.42;
    const fw = iw * 0.68;
    const top = padY + ih * 0.03;
    const bottom = padY + ih * 0.8;
    const spoutEnd = padY + ih * 0.98;
    const yAt = (k) => top + ((bottom - top) * k) / 7;
    const wAt = (k) => fw * (1 - (0.76 * k) / 7);
    let i = 0;
    counts.forEach((n, k) => {
      const hh = clamp01((k - 4) / 3);
      for (let j = 0; j < n; j++, i++) {
        s.x[i] = fcx - wAt(k) / 2 + ((j + 0.5) / n) * wAt(k);
        s.y[i] = yAt(k);
        s.r[i] = hh > 0.6 ? 3 : 2;
        s.h[i] = hh; s.a[i] = 0.85;
      }
    });
    const gap = 12;
    extra.sides = [
      [[fcx - wAt(0) / 2 - gap, yAt(0) - 16], [fcx - wAt(7) / 2 - gap, yAt(7) + 14], [fcx - wAt(7) / 2 - gap, spoutEnd]],
      [[fcx + wAt(0) / 2 + gap, yAt(0) - 16], [fcx + wAt(7) / 2 + gap, yAt(7) + 14], [fcx + wAt(7) / 2 + gap, spoutEnd]],
    ];
    const edge = (k) => fcx + wAt(k) / 2 + gap + 6;
    extra.labels = [
      { text: 'REACH', y: yAt(0), from: edge(0) },
      { text: 'ENGAGE', y: yAt(3.5), from: edge(3.5) },
      { text: 'CONVERT', y: yAt(7), from: edge(7) },
    ];
    extra.labelX = W - padX * 0.5;
    extra.funnelTop = top;
    extra.funnelH = bottom - top;
  }

  // 2 — Visibility: a network spreading outward, reaching more and more of the audience
  {
    const s = stages[2];
    const cx = W / 2;
    const cy = H / 2;
    const maxR = Math.min(iw, ih) * 0.5;
    extra.centre = [cx, cy];
    extra.maxR = maxR;
    s.x[0] = cx; s.y[0] = cy; s.r[0] = 8; s.h[0] = 0; s.a[0] = 1;
    const counts = [9, 17, 26, 34, 43, 52];
    const start = [];
    const parent = new Int16Array(N).fill(0);
    const dist = new Float32Array(N);
    let i = 1;
    counts.forEach((n, k) => {
      start[k] = i;
      const rad = ((k + 1) / counts.length) * maxR;
      for (let j = 0; j < n; j++, i++) {
        const ang = (j / n) * Math.PI * 2 + k * 0.55;
        s.x[i] = cx + Math.cos(ang) * rad;
        s.y[i] = cy + Math.sin(ang) * rad;
        s.r[i] = 2.1; s.a[i] = 0.9;
        dist[i] = rad;
        if (k > 0) {
          const m = counts[k - 1];
          const near = Math.round(((ang - (k - 1) * 0.55) / (Math.PI * 2)) * m);
          parent[i] = start[k - 1] + ((near % m) + m) % m;
        }
      }
    });
    extra.parent = parent;
    extra.dist = dist;
  }

  // 3 — Growth: bars of dots that climb, with a trend line over the tops
  {
    const s = stages[3];
    const heights = [4, 6, 8, 10, 12, 14, 17, 20];
    const cellPx = Math.min(W * 0.034, (H * 0.66) / 21);
    const totalW = (heights.length * 3 - 1) * cellPx;
    const x0 = (W - totalW) / 2;
    const base = H * 0.88;
    const tops = [];
    let i = 0;
    heights.forEach((rows, b) => {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < 2; col++, i++) {
          s.x[i] = x0 + b * 3 * cellPx + (col + 0.5) * cellPx;
          s.y[i] = base - (row + 0.5) * cellPx;
          s.r[i] = Math.min(4.2, cellPx * 0.28);
          s.a[i] = 0.9;
          if (row === rows - 1) { s.h[i] = b === heights.length - 1 ? 1 : 0.55; s.r[i] += 0.6; }
        }
      }
      tops.push([x0 + b * 3 * cellPx + cellPx, base - rows * cellPx - cellPx * 0.9]);
    });
    const last = tops[tops.length - 1];
    extra.trend = [...tops, [last[0] + cellPx * 1.8, last[1] - cellPx * 2.6]];
    extra.base = [[x0 - cellPx, base + cellPx * 0.4], [x0 + totalW + cellPx, base + cellPx * 0.4]];
  }

  return { stages, extra };
}

function pathLength(pts) {
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return len;
}

// stroke the first `p` (0..1) of a polyline
function strokePartial(ctx, pts, p) {
  const total = pathLength(pts) * p;
  let run = 0;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) {
    const seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (run + seg >= total) {
      const t = seg ? (total - run) / seg : 0;
      ctx.lineTo(mix(pts[i - 1][0], pts[i][0], t), mix(pts[i - 1][1], pts[i][1], t));
      break;
    }
    ctx.lineTo(pts[i][0], pts[i][1]);
    run += seg;
  }
  ctx.stroke();
}

export function initHeroStory(root, { reduced = false } = {}) {
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas unavailable');
  const buttons = [...root.querySelectorAll('[data-step]')];
  const lines = [...root.querySelectorAll('[data-line]')];
  const bars = buttons.map((b) => b.querySelector('.step__bar i'));

  let W = 0;
  let H = 0;
  let dpr = 1;
  let L = null;

  // live state (positions without idle drift)
  const f32 = () => new Float32Array(N);
  const cx = f32(), cy = f32(), cr = f32(), ch = f32(), ca = f32(), cw = f32();
  const fx = f32(), fy = f32(), fr = f32(), fh = f32(), fa = f32(), fw = f32();

  let cur = 0;
  let stageT = 0; // seconds since the current stage began
  let clock = 0;
  let intro = 0;
  const lw = [1, 0, 0, 0]; // fade weight of each stage's line work

  function snapshot() {
    fx.set(cx); fy.set(cy); fr.set(cr); fh.set(ch); fa.set(ca); fw.set(cw);
  }
  function snapTo(s) {
    const t = L.stages[s];
    cx.set(t.x); cy.set(t.y); cr.set(t.r); ch.set(t.h); ca.set(t.a); cw.set(t.w);
    snapshot();
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    if (!r.width || !r.height) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    L = layout(W, H);
    snapTo(cur);
  }

  function setStage(next, { manual = false } = {}) {
    if (next === cur && !manual) return;
    cur = next;
    stageT = 0;
    snapshot();
    if (reduced) snapTo(cur);
    buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === cur)));
    lines.forEach((l, i) => l.classList.toggle('is-active', i === cur));
    bars.forEach((b, i) => { b.style.transform = `scaleX(${reduced && i === cur ? 1 : 0})`; });
  }

  function step(dt) {
    clock += dt;
    intro = Math.min(intro + dt, 2);
    stageT += dt;
    if (!reduced && stageT >= STAGE_SECONDS) setStage((cur + 1) % 4);

    // morph the dots toward the current formation
    const target = L.stages[cur];
    const p = reduced ? 1 : clamp01(stageT / MORPH_SECONDS);
    for (let i = 0; i < N; i++) {
      const local = easeInOut(clamp01((p - dot[i].delay * 0.45) / 0.55));
      cx[i] = mix(fx[i], target.x[i], local);
      cy[i] = mix(fy[i], target.y[i], local);
      cr[i] = mix(fr[i], target.r[i], local);
      ch[i] = mix(fh[i], target.h[i], local);
      ca[i] = mix(fa[i], target.a[i], local);
      cw[i] = mix(fw[i], target.w[i], local);
      // a gentle arc on the way, so the change reads as movement rather than teleporting
      const arcOff = Math.sin(local * Math.PI) * (dot[i].seedR - 0.5) * W * 0.06;
      cx[i] += arcOff; cy[i] -= arcOff * 0.6;
    }

    // line work fades in for the current stage, out for the others
    const k = 1 - Math.exp(-dt * 6);
    for (let s = 0; s < 4; s++) lw[s] += ((s === cur ? 1 : 0) - lw[s]) * (reduced ? 1 : k);

    if (!reduced) bars[cur].style.transform = `scaleX(${clamp01(stageT / STAGE_SECONDS)})`;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const gate = (s) => (s === cur ? smooth(clamp01((stageT - MORPH_SECONDS * 0.7) / (MORPH_SECONDS * 0.5))) : 1);
    const drawIn = (s, delay, len) => (s === cur ? (reduced ? 1 : clamp01((stageT - MORPH_SECONDS - delay) / len)) : 1);
    const { extra } = L;
    const frontRadius = () => (reduced ? extra.maxR * 1.1 : clamp01((stageT - 1.2) / 2.8) * extra.maxR * 1.1);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Strategy: funnel outline and its labels
    if (lw[1] > 0.01) {
      const a = lw[1] * gate(1);
      ctx.globalAlpha = a * 0.5;
      ctx.strokeStyle = `rgb(${INK})`;
      ctx.lineWidth = 1.6;
      extra.sides.forEach((side) => { ctx.beginPath(); ctx.moveTo(side[0][0], side[0][1]); side.slice(1).forEach(([x, y]) => ctx.lineTo(x, y)); ctx.stroke(); });

      ctx.font = FONT;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'right';
      extra.labels.forEach((lb) => {
        const tw = ctx.measureText(lb.text).width;
        const labelLeft = extra.labelX - tw - 12;
        ctx.globalAlpha = a * 0.3;
        ctx.setLineDash([2, 5]);
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(lb.from, lb.y); ctx.lineTo(labelLeft, lb.y); ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = a * 0.85;
        ctx.fillStyle = `rgb(${INK})`;
        ctx.fillText(lb.text, extra.labelX, lb.y);
      });
    }

    // Visibility: the reach front spreads out and connects everyone it touches
    if (lw[2] > 0.01) {
      const [ox, oy] = extra.centre;
      const R = frontRadius();
      const T = L.stages[2];
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgb(${BLUE})`;
      for (let i = 1; i < N; i++) {
        const reach = smooth(clamp01((R - extra.dist[i]) / (extra.maxR * 0.09)));
        if (reach < 0.02) continue;
        const q = extra.parent[i];
        ctx.globalAlpha = lw[2] * reach * 0.3;
        ctx.beginPath(); ctx.moveTo(T.x[q], T.y[q]); ctx.lineTo(T.x[i], T.y[i]); ctx.stroke();
      }
      if (R > 0) {
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = lw[2] * (0.1 + 0.5 * (1 - clamp01(R / (extra.maxR * 1.1))));
        ctx.beginPath(); ctx.arc(ox, oy, R, 0, 6.283); ctx.stroke();
      }
      const pulse = reduced ? 0.5 : (clock * 0.8) % 1;
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = lw[2] * gate(2) * (1 - pulse) * 0.6;
      ctx.beginPath(); ctx.arc(ox, oy, 12 + pulse * 22, 0, 6.283); ctx.stroke();
    }

    // Growth: baseline + trend line
    if (lw[3] > 0.01) {
      const a = lw[3] * gate(3);
      ctx.globalAlpha = a * 0.35;
      ctx.strokeStyle = `rgb(${INK})`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(extra.base[0][0], extra.base[0][1]); ctx.lineTo(extra.base[1][0], extra.base[1][1]); ctx.stroke();

      const p = drawIn(3, 0.1, 1.8);
      if (p > 0) {
        ctx.globalAlpha = lw[3];
        ctx.strokeStyle = `rgb(${GOLD})`; ctx.lineWidth = 8;
        strokePartial(ctx, extra.trend, p);
        ctx.strokeStyle = `rgb(${INK})`; ctx.lineWidth = 2;
        strokePartial(ctx, extra.trend, p);
        if (p > 0.97) {
          const n = extra.trend.length;
          const [x1, y1] = extra.trend[n - 1];
          const [x0, y0] = extra.trend[n - 2];
          const ang = Math.atan2(y1 - y0, x1 - x0);
          const pop = clamp01((p - 0.97) / 0.03);
          ctx.globalAlpha = lw[3] * pop;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 - Math.cos(ang - 0.5) * 14, y1 - Math.sin(ang - 0.5) * 14);
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 - Math.cos(ang + 0.5) * 14, y1 - Math.sin(ang + 0.5) * 14);
          ctx.stroke();
        }
      }
    }

    // the dots
    const [ox, oy] = extra.centre;
    const R = lw[2] > 0.01 ? frontRadius() : 0;
    const funnelPulse = extra.funnelTop + ((clock * 0.38) % 1) * extra.funnelH;
    const wob = reduced ? 0 : W * 0.012;

    for (let i = 0; i < N; i++) {
      const d = dot[i];
      const x = cx[i] + Math.sin(clock * d.fx + d.px) * wob * cw[i];
      const y = cy[i] + Math.cos(clock * d.fy + d.py) * wob * cw[i];
      let r = cr[i];
      let h = ch[i];
      let alpha = ca[i];

      // Ideas: the bulb switches on and its rays flash outward
      const rk = extra.rayK[i];
      if (rk >= 0 && lw[0] > 0.01) {
        const on = cur === 0 ? smooth(clamp01((stageT - MORPH_SECONDS * 0.9) / 0.5)) : 1;
        const flash = reduced ? 1 : 0.3 + 0.7 * Math.max(0, Math.sin(clock * 3.6 - rk * 1.1));
        alpha *= mix(1, on * flash, lw[0]);
      }

      // Strategy: a pulse runs down the funnel
      if (lw[1] > 0.01 && !reduced) {
        const q = (y - funnelPulse) / (H * 0.06);
        const b = Math.exp(-q * q) * lw[1] * gate(1);
        h = Math.max(h, b); r *= 1 + b * 0.6;
      }

      // Visibility: dots become clearer, larger and blue as the reach front arrives
      let blueT = 0;
      if (lw[2] > 0.01) {
        const reach = smooth(clamp01((R - Math.hypot(x - ox, y - oy)) / (extra.maxR * 0.09)));
        alpha *= mix(1, 0.28 + 0.72 * reach, lw[2]);
        r *= 1 + reach * 0.55 * lw[2];
        blueT = reach * lw[2];
      }

      alpha *= clamp01(intro / 1.1 - d.delay * 0.6);
      if (alpha <= 0.01) continue;

      const gold = clamp01(h);
      let rr = Math.round(mix(INK[0], GOLD[0], gold));
      let gg = Math.round(mix(INK[1], GOLD[1], gold));
      let bl = Math.round(mix(INK[2], GOLD[2], gold));
      if (blueT > 0) {
        rr = Math.round(mix(rr, BLUE[0], blueT));
        gg = Math.round(mix(gg, BLUE[1], blueT));
        bl = Math.round(mix(bl, BLUE[2], blueT));
      }

      if (r > 2.6 && gold > 0.5) {
        ctx.globalAlpha = alpha * 0.22;
        ctx.fillStyle = `rgb(${GOLD})`;
        ctx.beginPath(); ctx.arc(x, y, r * 2.4, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgb(${rr},${gg},${bl})`;
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
      if (gold > 0.5 && r > 2.6) {
        ctx.globalAlpha = alpha * 0.9;
        ctx.lineWidth = 1.2; ctx.strokeStyle = `rgb(${INK})`; ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  // ---- loop -------------------------------------------------------------------------------
  let running = false;
  let raf = 0;
  let last = 0;
  function frame(now) {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.25); // real elapsed time, so slow devices stay on schedule
    last = now;
    step(dt);
    draw();
    raf = requestAnimationFrame(frame);
  }
  function play() {
    if (running || reduced) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function pause() {
    running = false;
    cancelAnimationFrame(raf);
  }

  resize();
  if (reduced) {
    intro = 2;
    bars[0].style.transform = 'scaleX(1)';
    step(0);
    draw();
  }
  new ResizeObserver(() => {
    resize();
    if (!running) { step(0); draw(); }
  }).observe(canvas);

  buttons.forEach((b, i) => b.addEventListener('click', () => {
    setStage(i, { manual: true });
    if (reduced || !running) { step(0); draw(); }
  }));

  if (!reduced) {
    new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? play() : pause())).observe(canvas);
    document.addEventListener('visibilitychange', () => (document.hidden ? pause() : play()));
  }
}
