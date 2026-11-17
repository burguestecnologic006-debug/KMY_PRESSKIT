/* KMY · Zona equipo — dashboard, registro de datos, planificador y estrategia.
   Los datos del equipo se guardan en localStorage (solo en este navegador). */
(function () {
  "use strict";
  const { $, $$, esc, fmt, pad, iso, parseISO, uid } = PK;
  const D = window.KMY;

  /* ---------- Almacenamiento ---------- */
  const store = {
    get(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { PK.toast("No se pudo guardar en este navegador"); } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* noop */ } }
  };
  const K = { snap: "kmy.snapshots.v1", goals: "kmy.goals.v1", ev: "kmy.events.v1", chk: "kmy.checklist.v1" };
  const clone = (o) => JSON.parse(JSON.stringify(o));
  let snaps = store.get(K.snap, null) || clone(D.snapshots);
  let goals = store.get(K.goals, null) || clone(D.goals);
  let events = store.get(K.ev, (D.seedEvents) || []);
  let chk = store.get(K.chk, {});
  const saveSnaps = () => store.set(K.snap, snaps);
  const saveGoals = () => store.set(K.goals, goals);
  const saveEvents = () => store.set(K.ev, events);

  /* ---------- Helpers ---------- */
  const todayISO = () => iso(new Date());
  const longDate = (s) => parseISO(s).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const shortDate = (s) => parseISO(s).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "2-digit" });
  const sortedSnaps = () => snaps.slice().sort((a, b) => a.date.localeCompare(b.date));
  const isNum = (v) => v !== null && v !== undefined && v !== "" && !isNaN(v);
  const series = (key) => sortedSnaps().filter((s) => isNum(s[key])).map((s) => ({ date: s.date, y: Number(s[key]) }));
  const download = (name, text, mime) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: mime + ";charset=utf-8" }));
    a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  };
  const parseList = (text) => String(text || "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean).map((l) => {
    const m = l.match(/^(.*?)[:;\t]\s*([\d.,\s]+)$/);
    return m ? [m[1].trim(), Number(m[2].replace(/[^\d]/g, ""))] : null;
  }).filter((r) => r && r[0] && !isNaN(r[1]));
  const lastWith = (field) => sortedSnaps().reverse().filter((s) => parseList(s[field]).length);
  const openDlg = (d) => (typeof d.showModal === "function" ? d.showModal() : d.setAttribute("open", ""));
  const closeDlg = (d) => (typeof d.close === "function" ? d.close() : d.removeAttribute("open"));

  /* ==========================================================
     NAVEGACIÓN POR PESTAÑAS
     ========================================================== */
  const panels = ["dashboard", "datos", "calendario", "estrategia"];
  const rendered = {};
  function showPanel(p) {
    if (!panels.includes(p)) p = "dashboard";
    panels.forEach((id) => { $("#" + id).hidden = id !== p; });
    $$("#mainTabs .chip").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.p === p)));
    $$("#teamNav a[data-p], #drawer a[data-p]").forEach((a) => a.classList.toggle("active", a.dataset.p === p));
    if (location.hash !== "#" + p) history.replaceState(null, "", "#" + p);
    ({ dashboard: renderDashboard, datos: renderData, calendario: renderCalendar, estrategia: renderStrategy })[p]();
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  $("#mainTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-p]"); if (b) showPanel(b.dataset.p); });
  window.addEventListener("hashchange", () => showPanel(location.hash.slice(1)));

  /* ==========================================================
     DASHBOARD
     ========================================================== */
  function niceMax(v) {
    if (v <= 0) return 10;
    const p = Math.pow(10, Math.floor(Math.log10(v))), n = v / p;
    return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
  }
  function lineChart(pts, color) {
    if (!pts.length) return `<div class="chart-empty">Aún no hay datos para esta métrica. Regístralos en la pestaña “Registro de datos”.</div>`;
    const W = 640, H = 260, pl = 54, pr = 18, pt = 16, pb = 34;
    const maxY = niceMax(Math.max(...pts.map((p) => p.y)) * 1.05);
    const ts = pts.map((p) => parseISO(p.date).getTime());
    const t0 = Math.min(...ts), t1 = Math.max(...ts);
    const X = (t) => (t1 === t0 ? pl + (W - pl - pr) / 2 : pl + ((t - t0) / (t1 - t0)) * (W - pl - pr));
    const Y = (v) => pt + (1 - v / maxY) * (H - pt - pb);
    let g = "";
    for (let i = 0; i <= 4; i++) {
      const v = (maxY / 4) * i, y = Y(v);
      g += `<line class="axis" x1="${pl}" x2="${W - pr}" y1="${y}" y2="${y}"/><text x="${pl - 8}" y="${y + 4}" text-anchor="end">${PK.nf.format(Math.round(v))}</text>`;
    }
    const xy = pts.map((p, i) => [X(ts[i]), Y(p.y)]);
    const path = xy.map((c, i) => `${i ? "L" : "M"}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" ");
    const area = xy.length > 1 ? `${path} L${xy[xy.length - 1][0]},${H - pb} L${xy[0][0]},${H - pb} Z` : "";
    const labels = [0, Math.floor((pts.length - 1) / 2), pts.length - 1].filter((v, i, a) => a.indexOf(v) === i)
      .map((i) => `<text x="${xy[i][0]}" y="${H - 10}" text-anchor="${i === 0 && pts.length > 1 ? "start" : i === pts.length - 1 && pts.length > 1 ? "end" : "middle"}">${shortDate(pts[i].date)}</text>`).join("");
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Gráfica de evolución" style="color:${color}">
      <defs><linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".35"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>
      ${g}${area ? `<path class="area" d="${area}"/>` : ""}${xy.length > 1 ? `<path class="line" style="stroke:${color}" d="${path}"/>` : ""}
      ${xy.map((c, i) => `<circle class="dot" style="stroke:${color}" cx="${c[0]}" cy="${c[1]}" r="5"><title>${shortDate(pts[i].date)}: ${PK.nf.format(pts[i].y)}</title></circle>`).join("")}${labels}</svg>
      ${pts.length === 1 ? `<p class="muted" style="font-size:.85rem;margin:8px 0 0">Registra otro dato la próxima semana para ver la tendencia.</p>` : ""}`;
  }
  let metricKey = D.metrics[0].key;
  function renderChart() {
    const m = D.metrics.find((x) => x.key === metricKey);
    $("#chartBox").innerHTML = lineChart(series(metricKey), m.color);
  }
  function renderDashboard() {
    const ss = sortedSnaps(); const last = ss[ss.length - 1];
    $("#dashDate").textContent = last ? `Último registro: ${longDate(last.date)}` : "Sin registros";
    $("#kpis").innerHTML = D.metrics.map((m) => {
      const s = series(m.key), cur = s[s.length - 1], prev = s[s.length - 2];
      let delta = `<span class="delta flat">Sin comparación</span>`;
      if (cur && prev) {
        const d = cur.y - prev.y, pct = prev.y ? ((d / prev.y) * 100).toFixed(1) : "—";
        delta = `<span class="delta ${d > 0 ? "up" : d < 0 ? "down" : "flat"}">${d > 0 ? "▲ +" : d < 0 ? "▼ " : "= "}${PK.nf.format(d)} (${d > 0 ? "+" : ""}${pct}%)</span>`;
      }
      return `<div class="kpi-card" style="border-top:3px solid ${m.color}"><small>${esc(m.short)}</small><b>${cur ? PK.nf.format(cur.y) : "—"}</b>${delta}</div>`;
    }).join("");
    $("#metricSel").innerHTML = D.metrics.map((m) => `<option value="${m.key}" ${m.key === metricKey ? "selected" : ""}>${esc(m.label)}</option>`).join("");
    renderChart();

    $("#goalsBox").innerHTML = D.metrics.map((m) => {
      const s = series(m.key), cur = s.length ? s[s.length - 1].y : null, g = Number(goals[m.key]) || 0;
      const pct = g && cur !== null ? Math.min(100, Math.round((cur / g) * 100)) : 0;
      return `<div class="goal"><div class="goal__row"><span>${esc(m.short)}</span><span class="muted">${cur !== null ? PK.nf.format(cur) : "—"} / ${g ? PK.nf.format(g) : "sin meta"}</span></div>
        <div class="progress"><i style="width:${pct}%"></i></div>
        <div class="goal__inp"><label class="sr-only" for="g_${m.key}">Meta ${esc(m.short)}</label><input class="input" id="g_${m.key}" data-goal="${m.key}" type="number" min="0" inputmode="numeric" placeholder="Meta" value="${g || ""}"><span class="muted" style="font-size:.8rem">${g ? pct + "%" : ""}</span></div></div>`;
    }).join("");

    const withCities = lastWith("cities"), withTracks = lastWith("tracks");
    if (withCities.length) {
      const now = parseList(withCities[0].cities), prev = withCities[1] ? Object.fromEntries(parseList(withCities[1].cities)) : null;
      $("#dashCities").innerHTML = PK.barsHTML(now.map(([n, v]) => [prev && n in prev ? `${n}  ${v - prev[n] >= 0 ? "▲" : "▼"}${Math.abs(v - prev[n])}` : n, v]), { pct: true }) + `<p class="muted" style="font-size:.78rem;margin-top:12px">Registro del ${shortDate(withCities[0].date)}${prev ? " · ▲▼ vs registro anterior" : ""}</p>`;
    } else $("#dashCities").innerHTML = `<p class="muted">Sin datos de ciudades.</p>`;
    $("#dashTracks").innerHTML = withTracks.length ? PK.barsHTML(parseList(withTracks[0].tracks), { color: "linear-gradient(90deg,#ff6a3d,#ff3d9a)" }) + `<p class="muted" style="font-size:.78rem;margin-top:12px">Registro del ${shortDate(withTracks[0].date)}</p>` : `<p class="muted">Sin datos de temas.</p>`;
    PK.animateBars($("#dashboard"));
  }
  $("#metricSel").addEventListener("change", (e) => { metricKey = e.target.value; renderChart(); });
  $("#goalsBox").addEventListener("change", (e) => {
    const i = e.target.closest("[data-goal]"); if (!i) return;
    const v = Number(i.value); if (v > 0) goals[i.dataset.goal] = v; else delete goals[i.dataset.goal];
    saveGoals(); renderDashboard(); PK.toast("Meta actualizada");
  });

  /* ==========================================================
     REGISTRO DE DATOS
     ========================================================== */
  function renderData() {
    const ss = sortedSnaps(); const last = ss[ss.length - 1] || {};
    if (!rendered.datos) {
      $("#metricFields").innerHTML = D.metrics.map((m) => `<div class="field"><label for="m_${m.key}">${esc(m.label)}</label><input class="input" id="m_${m.key}" data-m="${m.key}" type="number" min="0" inputmode="numeric"></div>`).join("");
      $("#f_date").value = todayISO();
      $("#f_cities").value = last.cities || ""; $("#f_tracks").value = last.tracks || "";
      rendered.datos = true;
    }
    D.metrics.forEach((m) => { const s = series(m.key); $("#m_" + m.key).placeholder = s.length ? `Último: ${PK.nf.format(s[s.length - 1].y)}` : "Sin datos"; });
    const cols = D.metrics;
    $("#snapTable").innerHTML = `<thead><tr><th>Fecha</th>${cols.map((m) => `<th>${esc(m.short)}</th>`).join("")}<th>Nota</th><th></th></tr></thead>
      <tbody>${ss.slice().reverse().map((s) => `<tr><td><b>${shortDate(s.date)}</b></td>${cols.map((m) => `<td>${isNum(s[m.key]) ? PK.nf.format(s[m.key]) : "—"}</td>`).join("")}<td>${esc(s.note || "")}</td>
        <td><button class="btn btn--sm btn--danger" data-del="${s.date}" aria-label="Eliminar registro ${s.date}">✕</button></td></tr>`).join("") || `<tr><td colspan="${cols.length + 3}" class="muted">Sin registros.</td></tr>`}</tbody>`;
  }
  $("#snapForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const date = $("#f_date").value; if (!date) return;
    const prev = snaps.find((s) => s.date === date) || {};
    const s = { date, cities: $("#f_cities").value.trim(), tracks: $("#f_tracks").value.trim(), note: $("#f_note").value.trim() };
    let any = false;
    D.metrics.forEach((m) => {
      const v = $("#m_" + m.key).value;
      s[m.key] = v === "" ? (isNum(prev[m.key]) ? prev[m.key] : null) : Number(v);
      if (v !== "") any = true;
    });
    if (!any && !s.cities && !s.tracks) { PK.toast("Escribe al menos un dato"); return; }
    snaps = snaps.filter((x) => x.date !== date).concat(s); saveSnaps();
    D.metrics.forEach((m) => ($("#m_" + m.key).value = "")); $("#f_note").value = "";
    renderData(); PK.toast("Registro guardado ✓");
  });
  $("#snapTable").addEventListener("click", (e) => {
    const b = e.target.closest("[data-del]"); if (!b) return;
    if (confirm("¿Eliminar el registro del " + shortDate(b.dataset.del) + "?")) { snaps = snaps.filter((s) => s.date !== b.dataset.del); saveSnaps(); renderData(); PK.toast("Registro eliminado"); }
  });
  $("#btnCsv").addEventListener("click", () => {
    const q = (v) => `"${String(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " | ")}"`;
    const head = ["fecha", ...D.metrics.map((m) => m.key), "ciudades", "temas", "nota"];
    const rows = sortedSnaps().map((s) => [s.date, ...D.metrics.map((m) => (isNum(s[m.key]) ? s[m.key] : "")), q(s.cities), q(s.tracks), q(s.note)].join(","));
    download("kmy-datos.csv", "\ufeff" + [head.join(","), ...rows].join("\n"), "text/csv");
  });
  $("#btnBackup").addEventListener("click", () => {
    download(`kmy-respaldo-${todayISO()}.json`, JSON.stringify({ version: 1, snapshots: snaps, goals, events, checklist: chk }, null, 2), "application/json");
    PK.toast("Respaldo descargado");
  });
  $("#btnRestore").addEventListener("click", () => $("#fileRestore").click());
  $("#fileRestore").addEventListener("change", (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const o = JSON.parse(r.result);
        if (!Array.isArray(o.snapshots) || !Array.isArray(o.events)) throw new Error("formato");
        if (!confirm("Esto reemplazará los datos actuales de este navegador. ¿Continuar?")) return;
        snaps = o.snapshots; goals = o.goals || {}; events = o.events; chk = o.checklist || {};
        saveSnaps(); saveGoals(); saveEvents(); store.set(K.chk, chk);
        Object.keys(rendered).forEach((k) => delete rendered[k]); showPanel("datos"); PK.toast("Respaldo importado ✓");
      } catch (err) { PK.toast("Archivo no válido"); }
    };
    r.readAsText(f); e.target.value = "";
  });
  $("#btnReset").addEventListener("click", () => {
    if (!confirm("Se borrarán tus registros y metas y volverán los valores iniciales. Los eventos del calendario no se tocan. ¿Continuar?")) return;
    snaps = clone(D.snapshots); goals = clone(D.goals); saveSnaps(); saveGoals(); renderData(); PK.toast("Datos restablecidos");
  });

  /* ==========================================================
     PLANIFICADOR / CALENDARIO
     ========================================================== */
  const T = Object.fromEntries(D.eventTypes.map((t) => [t.key, t]));
  const statusLabel = { idea: "Idea", planeado: "Planeado", confirmado: "Confirmado", hecho: "Hecho" };
  let view = "mes", cur = new Date(), selDay = todayISO(), showPast = false;
  cur = new Date(cur.getFullYear(), cur.getMonth(), 1);
  const activeTypes = new Set(D.eventTypes.map((t) => t.key));
  const evKey = (e) => e.date + (e.time || "99:99");
  const visibleEvents = () => events.filter((e) => activeTypes.has(e.type)).sort((a, b) => evKey(a).localeCompare(evKey(b)));
  const byDate = () => { const m = {}; visibleEvents().forEach((e) => (m[e.date] = m[e.date] || []).push(e)); return m; };
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  function evRow(e) {
    const d = parseISO(e.date), t = T[e.type] || T.otro;
    return `<button class="ev ${e.status === "hecho" ? "done" : ""}" style="--ec:${t.color}" data-id="${e.id}">
      <span class="ev__date"><b>${d.getDate()}</b><small>${d.toLocaleDateString("es-CO", { month: "short" })}</small></span>
      <span class="ev__body"><b>${esc(e.title)}</b><span>${esc(t.label)}${e.time ? " · " + esc(e.time) : ""}${e.place ? " · " + esc(e.place) : ""}</span></span>
      <span class="status ${esc(e.status)}">${statusLabel[e.status] || esc(e.status)}</span></button>`;
  }

  function renderCalendar() {
    if (!rendered.calendario) {
      $("#typeFilters").innerHTML = D.eventTypes.map((t) => `<button class="chip" aria-pressed="true" data-t="${t.key}" style="--ec:${t.color}">${esc(t.label)}</button>`).join("");
      $("#legend").innerHTML = D.eventTypes.map((t) => `<span style="--ec:${t.color}"><i></i>${esc(t.label)}</span>`).join("");
      $("#e_type").innerHTML = D.eventTypes.map((t) => `<option value="${t.key}">${esc(t.label)}</option>`).join("");
      $("#e_status").innerHTML = D.eventStatus.map((s) => `<option value="${s}">${statusLabel[s]}</option>`).join("");
      rendered.calendario = true;
    }
    $$("[data-view]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.view === view)));
    $("#calNav").style.display = view === "agenda" ? "none" : "flex";
    $("#dayPanel").style.display = view === "mes" ? "block" : "none";
    if (view === "mes") renderMonth(); else if (view === "agenda") renderAgenda(); else renderYear();
  }

  function renderMonth() {
    const y = cur.getFullYear(), m = cur.getMonth(), map = byDate(), today = todayISO();
    $("#calTitle").textContent = cap(cur.toLocaleDateString("es-CO", { month: "long", year: "numeric" }));
    const offset = (new Date(y, m, 1).getDay() + 6) % 7;
    const dows = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    let cells = "";
    for (let i = 0; i < 42; i++) {
      const d = new Date(y, m, 1 - offset + i), k = iso(d), list = map[k] || [];
      cells += `<div class="cal__cell ${d.getMonth() !== m ? "other" : ""} ${k === today ? "today" : ""} ${k === selDay ? "sel" : ""}" tabindex="0" role="button" data-d="${k}" aria-label="${longDate(k)}${list.length ? ", " + list.length + " eventos" : ""}">
        <span class="cal__num">${d.getDate()}</span>
        ${list.slice(0, 3).map((e) => `<button class="ev-dot" style="--ec:${(T[e.type] || T.otro).color}" data-id="${e.id}" title="${esc(e.title)}">${esc(e.title)}</button>`).join("")}
        ${list.length > 3 ? `<span class="more ev-more">+${list.length - 3} más</span>` : ""}
        ${list.length ? `<span class="dots">${list.slice(0, 4).map((e) => `<i style="--ec:${(T[e.type] || T.otro).color}"></i>`).join("")}</span>` : ""}
      </div>`;
    }
    $("#calBody").innerHTML = `<div class="cal"><div class="cal__dow">${dows.map((d) => `<div>${d}</div>`).join("")}</div><div class="cal__grid" id="calGrid">${cells}</div></div>`;
    renderDayPanel();
  }
  function renderDayPanel() {
    const list = (byDate()[selDay] || []);
    $("#dayPanel").innerHTML = `<div class="toolbar"><h3 style="margin:0">${cap(longDate(selDay))}</h3><button class="btn btn--sm btn--primary" id="dayAdd">+ Añadir aquí</button></div>
      ${list.length ? list.map(evRow).join("") : `<p class="muted">Sin eventos este día.</p>`}`;
  }
  function renderAgenda() {
    $("#calTitle").textContent = "";
    const today = todayISO();
    const list = visibleEvents().filter((e) => showPast || e.date >= today);
    const groups = {};
    list.forEach((e) => { const k = e.date.slice(0, 7); (groups[k] = groups[k] || []).push(e); });
    const html = Object.keys(groups).map((k) => `<div><div class="agenda__month">${cap(parseISO(k + "-01").toLocaleDateString("es-CO", { month: "long", year: "numeric" }))}</div>${groups[k].map(evRow).join("")}</div>`).join("");
    $("#calBody").innerHTML = `<div class="chips"><button class="chip" aria-pressed="${showPast}" id="togglePast">Mostrar eventos pasados</button></div>
      <div class="agenda">${html || `<div class="card"><p class="muted" style="margin:0">No hay eventos próximos. Crea uno con “+ Nuevo evento” o genera un “Plan de lanzamiento”.</p></div>`}</div>`;
  }
  function renderYear() {
    const y = cur.getFullYear(), map = byDate();
    $("#calTitle").textContent = String(y);
    let html = "";
    for (let m = 0; m < 12; m++) {
      const first = new Date(y, m, 1), off = (first.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
      let n = 0, sq = "";
      for (let i = 0; i < off; i++) sq += `<i style="visibility:hidden"></i>`;
      for (let d = 1; d <= days; d++) {
        const l = map[`${y}-${pad(m + 1)}-${pad(d)}`];
        if (l) { n += l.length; sq += `<i class="has" style="--ec:${(T[l[0].type] || T.otro).color}"></i>`; } else sq += `<i></i>`;
      }
      html += `<button class="mini" data-m="${m}"><h4>${cap(first.toLocaleDateString("es-CO", { month: "long" }))}</h4><div class="mini__days">${sq}</div><small>${n ? n + (n === 1 ? " evento" : " eventos") : "Sin eventos"}</small></button>`;
    }
    $("#calBody").innerHTML = `<div class="year-grid">${html}</div>`;
  }

  /* Interacciones del calendario */
  $$("[data-view]").forEach((b) => b.addEventListener("click", () => { view = b.dataset.view; renderCalendar(); }));
  $("#calPrev").addEventListener("click", () => { cur = view === "anio" ? new Date(cur.getFullYear() - 1, cur.getMonth(), 1) : new Date(cur.getFullYear(), cur.getMonth() - 1, 1); renderCalendar(); });
  $("#calNext").addEventListener("click", () => { cur = view === "anio" ? new Date(cur.getFullYear() + 1, cur.getMonth(), 1) : new Date(cur.getFullYear(), cur.getMonth() + 1, 1); renderCalendar(); });
  $("#calToday").addEventListener("click", () => { const n = new Date(); cur = new Date(n.getFullYear(), n.getMonth(), 1); selDay = todayISO(); renderCalendar(); });
  $("#typeFilters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-t]"); if (!b) return;
    const k = b.dataset.t; activeTypes.has(k) ? activeTypes.delete(k) : activeTypes.add(k);
    b.setAttribute("aria-pressed", String(activeTypes.has(k))); renderCalendar();
  });
  const selectDay = (k) => { selDay = k; const d = parseISO(k); if (d.getMonth() !== cur.getMonth()) cur = new Date(d.getFullYear(), d.getMonth(), 1); renderCalendar(); };
  $("#calBody").addEventListener("click", (e) => {
    const chip = e.target.closest(".ev-dot, .ev"); if (chip) { editEvent(chip.dataset.id); return; }
    const mini = e.target.closest(".mini"); if (mini) { cur = new Date(cur.getFullYear(), +mini.dataset.m, 1); view = "mes"; renderCalendar(); return; }
    if (e.target.closest("#togglePast")) { showPast = !showPast; renderCalendar(); return; }
    const cell = e.target.closest(".cal__cell"); if (cell) selectDay(cell.dataset.d);
  });
  $("#calBody").addEventListener("keydown", (e) => { const cell = e.target.closest(".cal__cell"); if (cell && e.target === cell && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); selectDay(cell.dataset.d); } });
  $("#dayPanel").addEventListener("click", (e) => {
    const row = e.target.closest(".ev"); if (row) { editEvent(row.dataset.id); return; }
    if (e.target.closest("#dayAdd")) newEvent(selDay);
  });

  /* Diálogo de evento */
  const evDlg = $("#eventDialog"); let editingId = null;
  function fillEvent(e) {
    $("#evTitle").textContent = editingId ? "Editar evento" : "Nuevo evento";
    $("#e_title").value = e.title || ""; $("#e_type").value = e.type || "lanzamiento"; $("#e_status").value = e.status || "planeado";
    $("#e_date").value = e.date || todayISO(); $("#e_time").value = e.time || ""; $("#e_place").value = e.place || ""; $("#e_notes").value = e.notes || "";
    $("#e_delete").hidden = !editingId; openDlg(evDlg);
  }
  function newEvent(date) { editingId = null; fillEvent({ date: date || selDay || todayISO() }); }
  function editEvent(id) { const e = events.find((x) => x.id === id); if (!e) return; editingId = id; fillEvent(e); }
  $("#btnNewEvent").addEventListener("click", () => newEvent(selDay));
  $("#e_cancel").addEventListener("click", () => closeDlg(evDlg));
  evDlg.addEventListener("click", (e) => { if (e.target === evDlg) closeDlg(evDlg); });
  $("#eventForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const o = { title: $("#e_title").value.trim(), type: $("#e_type").value, status: $("#e_status").value, date: $("#e_date").value, time: $("#e_time").value, place: $("#e_place").value.trim(), notes: $("#e_notes").value.trim() };
    if (!o.title || !o.date) return;
    if (editingId) events = events.map((x) => (x.id === editingId ? { ...x, ...o } : x)); else events.push({ id: uid(), ...o });
    saveEvents(); closeDlg(evDlg); selDay = o.date; const d = parseISO(o.date); cur = new Date(d.getFullYear(), d.getMonth(), 1);
    renderCalendar(); PK.toast("Evento guardado ✓");
  });
  $("#e_delete").addEventListener("click", () => {
    if (!editingId || !confirm("¿Eliminar este evento?")) return;
    events = events.filter((x) => x.id !== editingId); saveEvents(); closeDlg(evDlg); renderCalendar(); PK.toast("Evento eliminado");
  });

  /* Plan de lanzamiento */
  const roDlg = $("#rolloutDialog");
  $("#btnRollout").addEventListener("click", () => { $("#r_name").value = ""; $("#r_date").value = ""; openDlg(roDlg); });
  $("#r_cancel").addEventListener("click", () => closeDlg(roDlg));
  roDlg.addEventListener("click", (e) => { if (e.target === roDlg) closeDlg(roDlg); });
  $("#rolloutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#r_name").value.trim(), date = $("#r_date").value; if (!name || !date) return;
    const base = parseISO(date);
    D.rollout.forEach((s) => {
      const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + s.d);
      events.push({ id: uid(), title: `${name} · ${s.t}`, type: s.type, status: "planeado", date: iso(d), time: "", place: "", notes: "Plan de lanzamiento (generado)" });
    });
    saveEvents(); closeDlg(roDlg); view = "agenda"; showPast = false; renderCalendar();
    PK.toast(`${D.rollout.length} tareas creadas ✓`);
  });

  /* Exportar .ics (Google Calendar / Apple Calendar / Outlook) */
  $("#btnIcs").addEventListener("click", () => {
    if (!events.length) { PK.toast("No hay eventos para exportar"); return; }
    const esc2 = (s) => String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    const L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//KMY Press Kit//ES", "CALSCALE:GREGORIAN", "X-WR-CALNAME:KMY · Plan de trabajo", "X-WR-TIMEZONE:America/Bogota"];
    events.forEach((e) => {
      const d = parseISO(e.date), ymd = e.date.replace(/-/g, "");
      L.push("BEGIN:VEVENT", `UID:${e.id}@kmy-presskit`, `DTSTAMP:${stamp}`);
      if (e.time) {
        const [h, mi] = e.time.split(":").map(Number), end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h + 1, mi);
        L.push(`DTSTART:${ymd}T${pad(h)}${pad(mi)}00`, `DTEND:${iso(end).replace(/-/g, "")}T${pad(end.getHours())}${pad(end.getMinutes())}00`);
      } else {
        const n = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
        L.push(`DTSTART;VALUE=DATE:${ymd}`, `DTEND;VALUE=DATE:${iso(n).replace(/-/g, "")}`);
      }
      L.push(`SUMMARY:${esc2(e.title)}`, `LOCATION:${esc2(e.place)}`, `DESCRIPTION:${esc2(`${(T[e.type] || T.otro).label} · ${statusLabel[e.status] || ""}${e.notes ? "\n" + e.notes : ""}`)}`, "END:VEVENT");
    });
    L.push("END:VCALENDAR");
    download("kmy-calendario.ics", L.join("\r\n"), "text/calendar"); PK.toast("Calendario exportado ✓");
  });

  /* ==========================================================
     ESTRATEGIA
     ========================================================== */
  const S = D.strategy;
  let stratTab = "diag";
  const bullets = (a) => `<ul class="bul">${a.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const stratViews = {
    diag: () => `<div class="play-grid">
        <div class="card"><h3>Diagnóstico</h3>${bullets(S.diagnostico)}</div>
        <div class="card" style="border-top:3px solid var(--lime)"><span class="tag">Concepto</span><h3 style="margin-top:12px">${esc(S.concepto.nombre)}</h3><p class="muted">${esc(S.concepto.texto)}</p></div></div>`,
    pilares: () => `<div class="play-grid three">${S.pilares.map((p) => `<div class="card pillar" style="--c:${p.c}"><div class="n">${p.n}</div><h3>${esc(p.t)}</h3>${bullets(p.items)}</div>`).join("")}</div>`,
    semana: () => `<div class="week">${S.semana.map(([d, t]) => `<div class="week__day"><b>${d}</b><span>${esc(t)}</span></div>`).join("")}</div>
        <div style="margin-top:20px"><button class="btn btn--primary" id="loadWeek">Cargar esta rutina al calendario (4 semanas)</button><p class="muted" style="font-size:.85rem;margin-top:10px">Crea una tarea por día a partir del próximo lunes. Las verás en Plan y calendario.</p></div>`,
    plat: () => `<div class="play-grid three">${S.plataformas.map((p) => `<div class="card"><span class="tag">${esc(p.s)}</span><h3 style="margin-top:12px">${esc(p.t)}</h3>${bullets(p.items)}</div>`).join("")}</div>`,
    embudo: () => `<div class="play-grid"><div><h3 style="margin-bottom:14px">Embudo de comunidad</h3><div class="funnel">${S.embudo.map(([t, d]) => `<div class="funnel__step"><b>${esc(t)}</b><p class="muted" style="margin:4px 0 0">${esc(d)}</p></div>`).join("")}</div></div>
        <div class="grid"><div class="card"><h3>Tácticas de crecimiento orgánico</h3>${bullets(S.tacticas)}</div><div class="card" style="border-top:3px solid #ff5b5b"><h3>Evitar</h3>${bullets(S.evitar)}</div></div></div>`,
    kpi: () => `<div class="play-grid three">${S.kpis.map((k) => `<div class="card"><h3>${esc(k.t)}</h3><p class="muted" style="margin:0">${esc(k.d)}</p></div>`).join("")}</div>
        <p class="muted" style="margin-top:18px">Registra las cifras cada domingo en <a href="#datos" style="color:var(--lime)">Registro de datos</a> y compáralas con tus metas en el Dashboard.</p>`,
    check: () => {
      const done = S.checklist.filter((_, i) => chk[i]).length, pct = Math.round((done / S.checklist.length) * 100);
      return `<div class="card" style="margin-bottom:16px"><div class="goal__row"><b>Progreso</b><span class="muted">${done} de ${S.checklist.length} · ${pct}%</span></div><div class="progress" style="margin-top:10px"><i style="width:${pct}%"></i></div></div>
        <div class="grid">${S.checklist.map((t, i) => `<label class="check ${chk[i] ? "done" : ""}"><input type="checkbox" data-c="${i}" ${chk[i] ? "checked" : ""}><span>${esc(t)}</span></label>`).join("")}</div>`;
    }
  };
  function renderStrategy() {
    $$("#stratTabs .chip").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.s === stratTab)));
    $("#stratBody").innerHTML = stratViews[stratTab]();
  }
  $("#stratTabs").addEventListener("click", (e) => { const b = e.target.closest("[data-s]"); if (b) { stratTab = b.dataset.s; renderStrategy(); } });
  $("#stratBody").addEventListener("change", (e) => {
    const c = e.target.closest("[data-c]"); if (!c) return;
    chk[c.dataset.c] = c.checked; store.set(K.chk, chk); renderStrategy();
  });
  $("#stratBody").addEventListener("click", (e) => {
    if (!e.target.closest("#loadWeek")) return;
    const t = new Date(); const toMon = ((8 - t.getDay()) % 7) || 7;
    const start = new Date(t.getFullYear(), t.getMonth(), t.getDate() + toMon); let n = 0;
    for (let w = 0; w < 4; w++) S.semana.forEach(([, text], i) => {
      const d = iso(new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + i));
      if (!events.some((x) => x.date === d && x.title === text)) { events.push({ id: uid(), title: text, type: "contenido", status: "planeado", date: d, time: "", place: "", notes: "Rutina semanal (estrategia de comunidad)" }); n++; }
    });
    saveEvents(); PK.toast(`${n} tareas añadidas al calendario ✓`);
  });

  /* ---------- Inicio ---------- */
  showPanel(location.hash.slice(1) || "dashboard");
})();
