/* KMY · Press Kit público — pinta todas las secciones desde js/data.js */
(function () {
  "use strict";
  const { $, $$, esc, fmt, icons } = PK;
  const D = window.KMY;
  const A = D.artist;
  const spotifyUrl = (D.social.find((s) => s.id === "spotify") || {}).url || "#";

  /* ---------- Hero ---------- */
  $("#heroImg").src = A.heroPhoto;
  $("#ctaSpotify").href = spotifyUrl;
  $("#ctaSpotify").innerHTML = `${icons.spotify}<span>Escuchar en Spotify</span>`;
  $("#ctaPdf").href = D.contact.pdf;
  $("#ctaPdf").innerHTML = `${icons.download}<span>Media Kit PDF</span>`;
  $("#photosPdf").href = D.contact.pdf;
  $("#photosPdf").innerHTML = `${icons.download}<span>Descargar Media Kit PDF</span>`;
  const ps = D.publicStats;
  $("#heroKpis").innerHTML = [
    [ps.spotify.monthlyListeners, "Oyentes mensuales"],
    [ps.spotify.followers, "Seguidores Spotify"],
    [ps.youtube.subs, "Suscriptores YouTube"],
    [ps.youtube.views, "Vistas en YouTube"]
  ].map(([n, l]) => `<div class="kpi"><b data-count="${n}">0</b><small>${l}</small></div>`).join("");

  /* Marquee */
  const mq = ["KMY", "Reggaetón", "Urbano", "Cali · Colombia", "Magic Sound Music", "Desde la nave"];
  const mqHtml = mq.map((t) => `<span>${esc(t)}</span><span>✦</span>`).join("");
  $("#marquee").innerHTML = mqHtml + mqHtml;

  /* ---------- Biografía (pestañas) ---------- */
  $("#bioImg").src = D.photos[0].src;
  const panels = {
    historia: `${A.bio.map((p) => `<p>${esc(p)}</p>`).join("")}
      <div class="facts">
        <div class="fact"><small>Nació</small><b>${esc(A.born)}</b></div>
        <div class="fact"><small>Ciudad</small><b>Cali, Colombia</b></div>
        <div class="fact"><small>Sello</small><b>${esc(A.label)}</b></div>
      </div>`,
    sonido: `<p>Una propuesta sin etiquetas: pasa del trap callejero al reggaetón, del dancehall al synthwave, siempre con producción propia y una estética visual reconocible.</p>
      <div class="genres">${A.genres.map((g) => `<span class="tag">${esc(g)}</span>`).join("")}</div>
      <p style="margin-top:20px">También produce música para videojuegos: <em>“Trap De Amarella”</em>, <em>“Diana Siempre Gana”</em> y <em>“Who Is That Pokemon”</em>.</p>`,
    hitos: `<ul class="timeline">${A.timeline.map((t) => `<li><b>${esc(t.y)} · ${esc(t.t)}</b><p>${esc(t.d)}</p></li>`).join("")}</ul>`,
    colabs: `<p>Artistas con los que ha compartido canción, video o escenario:</p><div class="genres">${A.collabs.map((c) => `<span class="tag tag--mut">${esc(c)}</span>`).join("")}</div>`
  };
  const bioBox = $("#bioPanels");
  const tabBtns = $$(".bio__text [role=tab]");
  const showTab = (key) => {
    tabBtns.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === key)));
    bioBox.innerHTML = `<div class="tabpanel reveal in" role="tabpanel">${panels[key]}</div>`;
  };
  tabBtns.forEach((b, i) => {
    b.addEventListener("click", () => showTab(b.dataset.tab));
    b.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const n = tabBtns[(i + (e.key === "ArrowRight" ? 1 : tabBtns.length - 1)) % tabBtns.length];
        n.focus(); showTab(n.dataset.tab);
      }
    });
  });
  showTab("historia");

  /* ---------- Discografía ---------- */
  const relModal = PK.modal("relModal");
  const filters = [
    ["todos", "Todos", () => true],
    ["propio", "Como artista principal", (r) => r.kind === "propio"],
    ["colab", "Colaboraciones", (r) => r.kind === "colab"],
    ["Sencillo", "Sencillos", (r) => r.type === "Sencillo"],
    ["epalbum", "EP y álbumes", (r) => r.type === "EP" || r.type === "Álbum"]
  ];
  let discoFilter = "todos";
  const coverHTML = (r) => r.cover
    ? `<img src="${esc(r.cover)}" alt="Portada de ${esc(r.title)}" loading="lazy">`
    : `<div class="rel__fallback">${esc(r.title)}</div>`;
  const renderDisco = () => {
    const f = filters.find((x) => x[0] === discoFilter)[2];
    const list = D.releases.filter(f).sort((a, b) => b.year - a.year);
    $("#discoGrid").innerHTML = list.map((r) => `
      <button class="rel reveal in" data-id="${esc(r.id)}" aria-label="Ver ${esc(r.title)}">
        <div class="rel__cover">${coverHTML(r)}<span class="tag rel__badge">${esc(r.type)}</span><span class="rel__play">${icons.play}</span></div>
        <h3>${esc(r.title)}</h3><p>${r.year} · ${r.kind === "colab" ? "Colaboración" : "KMY"}</p>
      </button>`).join("") || `<p class="muted">Sin resultados.</p>`;
  };
  $("#discoFilters").innerHTML = filters.map(([k, l]) => `<button class="chip" aria-pressed="${k === discoFilter}" data-f="${k}">${l}</button>`).join("");
  $("#discoFilters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-f]"); if (!b) return;
    discoFilter = b.dataset.f;
    $$("#discoFilters .chip").forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
    renderDisco();
  });
  $("#discoGrid").addEventListener("click", (e) => {
    const b = e.target.closest(".rel"); if (!b) return;
    const r = D.releases.find((x) => x.id === b.dataset.id);
    const sp = r.spotify || spotifyUrl;
    const yt = r.youtube || `https://www.youtube.com/results?search_query=${encodeURIComponent("kmy " + r.title)}`;
    $("#relModalBody").innerHTML = `<div class="rel-modal">
      <div class="rel-modal__cover">${coverHTML(r)}</div>
      <div class="rel-modal__body">
        <div><span class="tag">${esc(r.type)} · ${r.year}</span></div>
        <h3>${esc(r.title)}</h3>
        <p class="muted">${esc(r.artists)}${r.note ? ` — ${esc(r.note)}` : ""}</p>
        <div class="rel-modal__links">
          <a class="btn btn--primary btn--sm" href="${esc(sp)}" target="_blank" rel="noopener">${icons.spotify}${r.spotify ? "Abrir en Spotify" : "Perfil en Spotify"}</a>
          <a class="btn btn--sm" href="${esc(yt)}" target="_blank" rel="noopener">${icons.youtube}Buscar en YouTube</a>
        </div>
      </div></div>`;
    relModal.open();
  });
  renderDisco();

  /* ---------- Estadísticas ---------- */
  const renderStats = (set) => {
    const pdf = set === "pdf";
    const sp = pdf ? ps.pdfReference.spotify : ps.spotify;
    const yt = pdf ? ps.pdfReference.youtube : ps.youtube;
    const cities = pdf ? ps.pdfReference.cities : ps.cities;
    const src = pdf ? ps.pdfReference.label : `Actualizado ${ps.updated}`;
    $("#statsLead").textContent = pdf
      ? "Cifras del Media Kit en PDF (versión anterior), como referencia histórica."
      : `Datos reales de Spotify, YouTube, Instagram y TikTok · actualizado ${ps.updated}. Estamos construyendo la comunidad desde cero y estos números se actualizan periódicamente.`;
    const tiles = [
      [sp.monthlyListeners, "Oyentes mensuales", "Spotify", "#c6ff00"],
      [sp.followers, "Seguidores", "Spotify", "#3ddc84"],
      [yt.subs, "Suscriptores", "YouTube", "#ff3d3d"],
      [yt.views, "Vistas totales", "YouTube", "#ff6a3d"]
    ];
    if (!pdf) tiles.push([yt.videos, "Videos publicados", "YouTube", "#8b6bff"]);
    if (!pdf) {
      tiles.push([ps.instagram.followers, "Seguidores", "Instagram", "#ff3d9a"]);
      tiles.push([ps.tiktok.followers, "Seguidores", "TikTok", "#36d6ff"]);
      tiles.push([ps.tiktok.likes, "Me gusta", "TikTok", "#36d6ff"]);
      tiles.push([ps.streams30d, "Streams (30 días)", "Spotify", "#3ddc84"]);
    }
    $("#statsGrid").innerHTML = tiles.map(([n, l, s, c]) => `<div class="stat" style="--c:${c}"><small>${l}</small><b data-count="${n}">0</b><span class="src">${s} · ${src}</span></div>`).join("");
    $("#citiesBars").innerHTML = PK.barsHTML(cities, { pct: true });
    $("#tracksBars").innerHTML = PK.barsHTML(ps.topTracks, { color: "linear-gradient(90deg,#ff6a3d,#ff3d9a)" });
    PK.countUp($("#statsGrid")); PK.animateBars($("#estadisticas"));
  };
  $("#statsToggle").addEventListener("click", (e) => {
    const b = e.target.closest("[data-set]"); if (!b) return;
    $$("#statsToggle .chip").forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
    renderStats(b.dataset.set);
  });
  renderStats("now");

  /* ---------- Próximos shows ---------- */
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = (D.shows || []).filter((x) => new Date(x.date + "T00:00:00") >= today).sort((a, b) => a.date.localeCompare(b.date));
  $("#showsGrid").innerHTML = upcoming.length ? upcoming.map((x) => {
    const d = new Date(x.date + "T12:00:00");
    const day = d.getDate(), mon = d.toLocaleDateString("es-CO", { month: "short" }).replace(".", "").toUpperCase();
    const wk = d.toLocaleDateString("es-CO", { weekday: "long" });
    const maps = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`${x.venue} ${x.address} ${x.city}`);
    return `<article class="card show reveal">
      ${x.flyer ? `<img class="show__flyer" src="${esc(x.flyer)}" alt="Flyer: ${esc(x.title)}" loading="lazy">` : ""}
      <div class="show__body">
        <div class="show__date"><b>${day}</b><span>${mon}</span></div>
        <h3>${esc(x.title)}</h3>
        <p class="muted">${esc(wk)} · ${esc(x.venue)} · ${esc(x.city)}</p>
        <p>${esc(x.info || "")}</p>
        <div class="rel-modal__links">
          <a class="btn btn--primary btn--sm" href="${esc(maps)}" target="_blank" rel="noopener">Ver ubicación</a>
          ${x.contact ? `<a class="btn btn--sm" href="tel:+57${esc(x.contact.replace(/\D/g, ""))}">Info y reservas: ${esc(x.contact)}</a>` : ""}
        </div>
      </div></article>`;
  }).join("") : `<div class="card reveal"><p class="muted">Pronto anunciaremos nuevas fechas. Escríbenos para contratación.</p></div>`;

  /* ---------- Redes ---------- */
  $("#socialGrid").innerHTML = D.social.map((s) => {
    const baseId = s.id.replace("msm-", "");
    return `<a class="card card--lift soc reveal ${s.url ? "" : "is-off"}" ${s.url ? `href="${esc(s.url)}" target="_blank" rel="noopener"` : 'aria-disabled="true"'}>
      <span class="soc__ico">${icons[baseId] || icons.link}</span>
      <span class="soc__body"><b>${esc(s.name)}</b><span>${s.url ? esc(s.handle) : "Próximamente"}</span></span>
      <span class="soc__go" aria-hidden="true">↗</span></a>`;
  }).join("");

  /* ---------- Streaming ---------- */
  $("#streamGrid").innerHTML = D.streaming.map((s) => `
    <a class="card card--lift stream__btn reveal ${s.url ? "" : "is-off"}" ${s.url ? `href="${esc(s.url)}" target="_blank" rel="noopener"` : 'aria-disabled="true"'}>
      ${icons[s.id] || icons.play}<b>${esc(s.name)}</b><small>${esc(s.note)}</small></a>`).join("");
  const sbox = $("#spotifyBox");
  if (D.spotifyEmbed && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { sbox.innerHTML = `<iframe title="KMY en Spotify" src="${esc(D.spotifyEmbed)}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`; io.disconnect(); } }, { rootMargin: "200px" });
    io.observe(sbox);
  }

  /* ---------- Galería + lightbox ---------- */
  const lb = PK.modal("lightbox");
  let idx = 0;
  $("#gallery").innerHTML = D.photos.map((p, i) => `<button class="gallery__item reveal" data-i="${i}" aria-label="Ampliar: ${esc(p.alt)}"><img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy"></button>`).join("");
  const showPhoto = (i) => { idx = (i + D.photos.length) % D.photos.length; const im = $("#lbImg"); im.src = D.photos[idx].src; im.alt = D.photos[idx].alt; };
  $("#gallery").addEventListener("click", (e) => { const b = e.target.closest("[data-i]"); if (!b) return; showPhoto(+b.dataset.i); lb.open(); });
  $("#lbPrev").addEventListener("click", () => showPhoto(idx - 1));
  $("#lbNext").addEventListener("click", () => showPhoto(idx + 1));
  document.addEventListener("keydown", (e) => { if (!lb.isOpen()) return; if (e.key === "ArrowLeft") showPhoto(idx - 1); if (e.key === "ArrowRight") showPhoto(idx + 1); });
  let tx = null;
  lb.el.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.el.addEventListener("touchend", (e) => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) showPhoto(idx + (dx < 0 ? 1 : -1)); tx = null; });

  /* ---------- Videos ---------- */
  const vm = PK.modal("vidModal");
  $("#vidModal").addEventListener("closed", () => { $("#vidFrame").innerHTML = ""; });
  const vfilters = [["todos", "Todos"], ["reciente", "Recientes"], ["popular", "Más vistos"]];
  let vf = "todos";
  const ytSearch = (v) => `https://www.youtube.com/results?search_query=${encodeURIComponent("kmy " + v.title)}`;
  const renderVideos = () => {
    const list = D.videos.filter((v) => vf === "todos" || v.cat === vf);
    $("#videoGrid").innerHTML = list.map((v, i) => {
      const thumb = v.id ? `<img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy">` : `<div class="vid__ph"><img src="${esc(A.logo)}" alt="" loading="lazy"></div>`;
      return `<button class="vid reveal in" data-t="${esc(v.title)}"><div class="vid__thumb">${thumb}<span class="vid__play">${icons.play}</span></div>
        <h3>${esc(v.title)}</h3><p>${esc(v.artists)} · ${esc(v.views)} vistas · ${esc(v.age)}</p></button>`;
    }).join("");
  };
  $("#videoFilters").innerHTML = vfilters.map(([k, l]) => `<button class="chip" aria-pressed="${k === vf}" data-f="${k}">${l}</button>`).join("");
  $("#videoFilters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-f]"); if (!b) return; vf = b.dataset.f;
    $$("#videoFilters .chip").forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
    renderVideos();
  });
  $("#videoGrid").addEventListener("click", (e) => {
    const b = e.target.closest(".vid"); if (!b) return;
    const v = D.videos.find((x) => x.title === b.dataset.t);
    if (v.id) { $("#vidFrame").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${esc(v.id)}?autoplay=1&rel=0" title="${esc(v.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`; vm.open(); }
    else window.open(ytSearch(v), "_blank", "noopener");
  });
  renderVideos();

  /* ---------- Contacto ---------- */
  const c = D.contact;
  $("#contactList").innerHTML = `
    <a href="mailto:${esc(c.email)}">${icons.mail}<span><b>Correo</b><br>${esc(c.email)}</span></a>
    <a href="https://wa.me/${esc(c.whatsapp)}" target="_blank" rel="noopener">${icons.whatsapp}<span><b>WhatsApp</b><br>${esc(c.phone)}</span></a>
    <a href="tel:+${esc(c.whatsapp)}">${icons.phone}<span><b>Llamar</b><br>${esc(c.phone)}</span></a>
    <a href="${esc(c.pdf)}" download>${icons.download}<span><b>Media Kit PDF</b><br>Descargar versión 2026</span></a>`;

  PK.observeReveals();
  PK.countUp(document);
})();
