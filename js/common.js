/* KMY · Press Kit — utilidades compartidas (menú, scroll, iconos, helpers) */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  const PK = (window.PK = {});
  PK.$ = (s, r = document) => r.querySelector(s);
  PK.$$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Formato ---------- */
  PK.nf = new Intl.NumberFormat("es-CO");
  PK.fmt = (n) => (n === null || n === undefined || n === "" || isNaN(n) ? "—" : PK.nf.format(n));
  PK.esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  PK.pad = (n) => String(n).padStart(2, "0");
  PK.iso = (d) => `${d.getFullYear()}-${PK.pad(d.getMonth() + 1)}-${PK.pad(d.getDate())}`;
  PK.parseISO = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  PK.uid = () => Math.random().toString(36).slice(2, 10);

  /* ---------- Iconos (SVG propios, heredan color) ---------- */
  const S = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  PK.icons = {
    instagram: `<svg ${S}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg>`,
    tiktok: `<svg ${S}><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.6 2.1 4.3 5 4.5"/></svg>`,
    youtube: `<svg ${S}><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor"/></svg>`,
    facebook: `<svg ${S}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8z"/></svg>`,
    spotify: `<svg ${S}><circle cx="12" cy="12" r="9.5"/><path d="M7 9.5c3.5-1 7-.6 10 1"/><path d="M7.7 12.8c2.8-.7 5.5-.4 8 1"/><path d="M8.5 15.8c2.2-.5 4.2-.3 6 .7"/></svg>`,
    youtubemusic: `<svg ${S}><circle cx="12" cy="12" r="9.5"/><path d="m10 8.8 5 3.2-5 3.2z" fill="currentColor"/></svg>`,
    apple: `<svg ${S}><path d="M9 18V6l9-2v12"/><circle cx="7" cy="18" r="2.5"/><circle cx="16" cy="16" r="2.5"/></svg>`,
    deezer: `<svg ${S}><path d="M4 19v-3M8 19v-7M12 19V8M16 19v-5M20 19V5"/></svg>`,
    amazon: `<svg ${S}><path d="M5 11c0 4 3 7 7 7s7-3 7-7"/><path d="M8 6.5C9 5 10.5 4.5 12 4.5c2.5 0 4 1.5 4 4V14"/><path d="M4 19c4 2 12 2 16-1"/></svg>`,
    whatsapp: `<svg ${S}><path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 18.8z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.5-2.5l.8-1-1-2z"/></svg>`,
    mail: `<svg ${S}><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>`,
    phone: `<svg ${S}><path d="M6 3h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z"/></svg>`,
    download: `<svg ${S}><path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/></svg>`,
    play: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>`,
    link: `<svg ${S}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>`
  };

  /* ---------- Toast ---------- */
  let toastEl, toastT;
  PK.toast = (msg) => {
    if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove("show"), 2600);
  };

  /* ---------- Modal accesible ---------- */
  PK.modal = (id) => {
    const el = document.getElementById(id);
    let last;
    const open = () => { last = document.activeElement; el.classList.add("open"); document.body.style.overflow = "hidden"; const c = el.querySelector(".modal__close"); c && c.focus(); };
    const close = () => { el.classList.remove("open"); document.body.style.overflow = ""; el.dispatchEvent(new Event("closed")); last && last.focus && last.focus(); };
    el.addEventListener("click", (e) => { if (e.target === el) close(); });
    el.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", close));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && el.classList.contains("open")) close(); });
    return { el, open, close, isOpen: () => el.classList.contains("open") };
  };

  /* ---------- Header: scroll + menú móvil ---------- */
  const header = PK.$(".header");
  const burger = PK.$(".burger");
  const drawer = PK.$(".drawer");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const setMenu = (open) => {
    if (!burger || !drawer) return;
    burger.setAttribute("aria-expanded", String(open)); drawer.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger && burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
  drawer && drawer.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  window.addEventListener("resize", () => { if (window.innerWidth >= 900) setMenu(false); });

  /* ---------- Sección activa en el menú (scroll-spy) ---------- */
  const links = PK.$$('.nav a[href^="#"], .drawer a[href^="#"]');
  if (links.length && "IntersectionObserver" in window) {
    const map = new Map();
    links.forEach((a) => { const t = document.querySelector(a.getAttribute("href")); if (t) { (map.get(t) || map.set(t, []).get(t)).push(a); } });
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { links.forEach((a) => a.classList.remove("active")); (map.get(en.target) || []).forEach((a) => a.classList.add("active")); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    map.forEach((_, t) => spy.observe(t));
  }

  /* ---------- Animación de entrada + contadores ---------- */
  PK.observeReveals = (root = document) => {
    const els = PK.$$(".reveal:not(.in)", root);
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12 });
    els.forEach((e) => io.observe(e));
  };
  PK.countUp = (root = document) => {
    const els = PK.$$("[data-count]", root);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = (el) => {
      if (el.dataset.done) return; el.dataset.done = "1";
      const to = Number(el.dataset.count); if (isNaN(to)) return;
      if (reduce) { el.textContent = PK.fmt(to); return; }
      const t0 = performance.now(), dur = 1100;
      const step = (t) => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = PK.fmt(Math.round(to * e)); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } }), { threshold: .4 });
    els.forEach((e) => io.observe(e));
  };
  PK.animateBars = (root = document) => {
    const bars = PK.$$(".bar__fill", root);
    const go = (b) => { b.style.width = b.dataset.w + "%"; };
    if (!("IntersectionObserver" in window)) { bars.forEach(go); return; }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { go(en.target); io.unobserve(en.target); } }), { threshold: .3 });
    bars.forEach((b) => io.observe(b));
  };

  /* Barras horizontales a partir de [[nombre, valor], ...] */
  PK.barsHTML = (rows, opts = {}) => {
    const max = Math.max(1, ...rows.map((r) => r[1] || 0));
    const total = rows.reduce((a, r) => a + (r[1] || 0), 0);
    return `<div class="bars">${rows.map((r) => `
      <div class="bar"><div class="bar__row"><span>${PK.esc(r[0])}</span><span>${PK.fmt(r[1])}${opts.pct && total ? ` · ${Math.round((r[1] / total) * 100)}%` : ""}</span></div>
      <div class="bar__track"><div class="bar__fill" data-w="${Math.round(((r[1] || 0) / max) * 100)}"${opts.color ? ` style="background:${opts.color}"` : ""}></div></div></div>`).join("")}</div>`;
  };

  /* Año del footer */
  PK.$$("[data-year]").forEach((e) => (e.textContent = new Date().getFullYear()));
})();
