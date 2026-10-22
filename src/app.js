/* =====================================================================
   APP
   ===================================================================== */
(function () {
  "use strict";
  const F = FORMULAS;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const L = x => x == null ? { de: "", es: "" } : typeof x === "string" ? { de: x, es: "" } : x;
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const rint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const fmt = (n, d = 2) => Number(Number(n).toFixed(d)).toLocaleString("de-DE", { maximumFractionDigits: d, useGrouping: false });
  let uid = 0;

  /* ---------- Text helpers ---------- */
  function rich(s, terms = true) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[\[(.+?)\]\]/g, (m, t) => {
        const [shown, key] = t.split("|");
        return terms ? `<button type="button" class="term" data-term="${key || shown}">${shown}</button>` : shown;
      });
  }
  function bi(x) {
    const v = L(x);
    return `<span class="de">${rich(v.de)}</span>` + (v.es ? `<span class="es" lang="es">${rich(v.es, false)}</span>` : "");
  }
  const plain = x => L(x).de.replace(/\[\[(.+?)\]\]/g, (m, t) => t.split("|")[0]).replace(/\*\*/g, "");

  /* ---------- State ---------- */
  const KEY = "bio-energie-ernaehrung-v1";
  const DEFAULTS = () => ({ xp: 0, bestStreak: 0, visited: {}, best: {}, mistakes: [], exams: [], es: false, letters: {}, lettersDone: {} });
  function load() {
    try { return Object.assign(DEFAULTS(), JSON.parse(localStorage.getItem(KEY)) || {}); }
    catch (e) { return DEFAULTS(); }
  }
  let S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

  const CH = Object.fromEntries(CHAPTERS.map(c => [c.id, c]));
  const QMAP = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));

  function level() { return [...LEVELS].reverse().find(l => S.xp >= l.min); }
  function addXP(n) {
    const before = level();
    S.xp += n; save(); renderTop();
    FX.floatText($("#xp"), `+${n} kJ`);
    const after = level();
    if (after !== before) {
      toast(`<b>Neues Level: ${esc(after.de)}!</b><span class="mono">ES</span>${esc(after.es)}`);
      FX.burstAt($("#xp"), 40, 1.3);
    }
  }
  const CH_ICON = { energie: "bolt", umsatz: "heart", vitamine: "orange", naehrstoffe: "bread", mineral: "bone" };
  function progressOf(id) { return Math.min(100, Math.round((S.visited[id] ? 25 : 0) + 0.75 * (S.best[id] || 0))); }
  function stars(p) { const n = p >= 90 ? 3 : p >= 70 ? 2 : p >= 50 ? 1 : 0; return "★".repeat(n) + "☆".repeat(3 - n); }
  function topicTag(t) { return CH[t] ? `<span class="tag tc-${t}">${esc(CH[t].title.de.split(" ")[0])}</span>` : ""; }

  function addMistake(q) {
    if (S.mistakes.some(m => m.id === q.id)) return;
    S.mistakes.push(q.gen ? { id: q.id, q } : { id: q.id });
    if (S.mistakes.length > 80) S.mistakes.shift();
    save();
  }
  function removeMistake(q) {
    const n = S.mistakes.length;
    S.mistakes = S.mistakes.filter(m => m.id !== q.id);
    if (n !== S.mistakes.length) save();
  }
  const mistakeQuestions = () => S.mistakes.map(m => m.q || QMAP[m.id]).filter(Boolean);

  /* ---------- Toast, top bar, ES toggle ---------- */
  let toastT;
  function toast(html) {
    const t = $("#toast"); t.innerHTML = html; t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 3000);
  }
  function renderTop() {
    const lv = level();
    $("#xp").textContent = `${S.xp} kJ · ${lv.de}`;
    $("#es-toggle").setAttribute("aria-pressed", S.es ? "true" : "false");
    document.body.classList.toggle("es-on", !!S.es);
  }
  $("#es-toggle").addEventListener("click", () => { S.es = !S.es; save(); renderTop(); });

  document.addEventListener("click", e => {
    const term = e.target.closest(".term");
    if (term) {
      const k = term.dataset.term;
      toast(`<b>${esc(k)}</b><span class="mono">ES</span>${esc(GLOSSARY[k] || "–")}`);
      e.stopPropagation();
      return;
    }
    const g = e.target.closest("[data-go]");
    if (g) { go(g.dataset.go); return; }
    const esb = e.target.closest(".es-btn");
    if (esb) {
      const box = esb.closest(".blk, .qz-card");
      const on = !box.classList.contains("es-open");
      box.classList.toggle("es-open", on);
      esb.setAttribute("aria-pressed", on ? "true" : "false");
      return;
    }
    const flip = e.target.closest(".flip");
    if (flip) flip.classList.toggle("open");
  }, true);

  /* ---------- Router ---------- */
  let cleanups = [];
  let pendingQuiz = null;
  function go(t) {
    if (location.hash.slice(1) === t) route();
    else location.hash = t;
  }
  function route() {
    cleanups.forEach(f => f()); cleanups = [];
    const t = location.hash.slice(1);
    const app = $("#app");
    app.innerHTML = "";
    window.scrollTo(0, 0);
    const views = { quiz: viewQuiz, rechnen: viewCalc, memory: viewMemory, sortieren: viewSort, probe: viewExam, fehler: viewMistakes, brief: viewBrief };
    if (CH[t]) viewChapter(app, CH[t]);
    else (views[t] || viewHome)(app);
    FX.observe(app);
  }
  window.addEventListener("hashchange", route);

  /* =====================================================================
     HOME
     ===================================================================== */
  function viewHome(app) {
    const lv = level();
    const nextCh = CHAPTERS.find(c => !S.visited[c.id]);
    app.innerHTML = `
      <section class="hero">
        <div>
          <p class="eyebrow">Biologie · 8. Klasse · Examen</p>
          <h1>Energie &amp; Ernährung</h1>
          <p class="lead">${bi({ de: "Lerne die fünf Themen Schritt für Schritt und übe sie danach mit Quiz, Memory, Sortierspielen und einer Probeprüfung. Tippe oben auf „Español“, um die Übersetzung zu sehen.", es: "Aprende los cinco temas paso a paso y luego practícalos con quiz, memory, juegos de clasificar y un examen de prueba. Toca «Español» arriba para ver la traducción." })}</p>
          <ul class="exam-list">
            ${CHAPTERS.map(c => `<li class="tc-${c.id}"><span class="tag">${c.n}</span><span>${bi(c.exam)}</span></li>`).join("")}
            <li><span class="tag">✉</span><span>${bi({ de: "Zum Schluss: einen Brief schreiben", es: "Al final: escribir una carta" })}</span></li>
          </ul>
          <div class="hero-actions">
            ${nextCh ? `<button type="button" class="btn" data-go="${nextCh.id}">${nextCh.n === 1 ? "Mit Kapitel 1 starten" : `Weiter mit Kapitel ${nextCh.n}`}</button>` : `<button type="button" class="btn" data-go="probe">Probeprüfung starten</button>`}
            <button type="button" class="btn ghost" data-go="quiz">Quiz spielen</button>
          </div>
        </div>
        <aside class="label" aria-label="Lernstand">
          <h2>Lernstand</h2>
          <div class="label-sub">pro Examen · 5 Themen</div>
          <div class="lrow head"><span>Thema</span><span>Fortschritt</span></div>
          ${CHAPTERS.map((c, k) => {
            const p = progressOf(c.id);
            return `<button type="button" class="lrow tc-${c.id}" data-go="${c.id}">
              <span style="flex:1;min-width:0"><span class="lname">${esc(c.title.de)}</span><span class="lbar"><i style="width:${p}%"></i></span></span>
              <span class="lval">${p} %</span></button>`;
          }).join("")}
          <div class="lrow thick"><span class="lname">Lern-Energie</span><span class="lval">${S.xp} kJ</span></div>
          <div class="lrow"><span>Level</span><span><b>${esc(lv.de)}</b></span></div>
          <div class="lrow"><span>Beste Serie</span><span class="lval">${S.bestStreak}</span></div>
          <p class="label-foot">* Fortschritt = Kapitel gelesen (25 %) + bestes Quiz-Ergebnis (75 %). Jede richtige Antwort bringt 10 kJ.</p>
        </aside>
      </section>

      <figure class="fig homefig">
        ${FIG.home()}
        <figcaption>${bi({ de: "Darum geht es im Examen: wie Energie von der Sonne über die Nahrung in deinen Körper kommt. Tippe auf eine Station.", es: "De eso trata el examen: cómo la energía llega del Sol, a través de los alimentos, a tu cuerpo. Toca una estación." })}</figcaption>
      </figure>

      <section class="sec">
        <div><h2 class="sec-h">Lernen</h2><p class="sec-sub">${bi({ de: "Die Kapitel folgen dem Themenblatt. Jedes endet mit einem kurzen Check.", es: "Los capítulos siguen la hoja de temas. Cada uno termina con un pequeño test." })}</p></div>
        <div class="chapters">
          ${CHAPTERS.map(c => {
            const best = S.best[c.id];
            return `<button type="button" class="chap tc-${c.id}" data-go="${c.id}">
              <span class="chap-n">${ico(CH_ICON[c.id], "md")}<i class="mono">${c.n}</i></span>
              <span><span class="chap-t">${esc(c.title.de)}</span><br><span class="chap-d">${bi(c.short)}</span></span>
              <span class="chap-m">${S.visited[c.id] ? "gelesen ✓" : "neu"}<br><span class="stars">${best != null ? stars(best) : "☆☆☆"}</span></span>
            </button>`;
          }).join("")}
        </div>
      </section>

      <section class="sec">
        <div><h2 class="sec-h">Üben</h2><p class="sec-sub">${bi({ de: "Falsche Antworten landen im Fehlerheft – dort kannst du sie gezielt wiederholen.", es: "Las respuestas incorrectas van al cuaderno de errores, donde puedes repasarlas." })}</p></div>
        <div class="games">
          ${gameTile("quiz", "Quiz", "nach Thema", { de: "Multiple Choice, Richtig/Falsch, Lückentexte und Rechnungen. Sammle Sterne für jedes Thema.", es: "Opción múltiple, verdadero/falso, huecos y cálculos. Consigue estrellas en cada tema." })}
          ${gameTile("rechnen", "Rechentrainer", "∞ Aufgaben", { de: "Grundumsatz, PAL-Wert, kcal ↔ kJ und „Was fehlt Jonas?“ mit immer neuen Zahlen.", es: "Metabolismo basal, valor PAL, kcal ↔ kJ y «¿Qué le falta a Jonas?» con números siempre nuevos." })}
          ${gameTile("memory", "Memory", `${MEMORY.length} Decks`, { de: "Finde die Paare: Element ↔ Funktion, Gerät ↔ Umwandlung …", es: "Encuentra las parejas: elemento ↔ función, aparato ↔ transformación…" })}
          ${gameTile("sortieren", "Sortieren", `${SORTS.length} Spiele`, { de: "Ordne zu: Makro oder Mikro? Welcher Nährstoff? Grund- oder Leistungsumsatz?", es: "Clasifica: ¿macro o micro? ¿Qué nutriente? ¿Basal o actividad?" })}
          ${gameTile("probe", "Probeprüfung", `${EXAM_N} Fragen`, { de: "Alle Themen gemischt, wie im Examen. Mit Auswertung pro Thema.", es: "Todos los temas mezclados, como en el examen. Con resultado por tema." }, true)}
          ${gameTile("brief", "Brief schreiben", `${LETTERS.length} Aufträge`, { de: "Der letzte Teil im Examen: Übe einen Brief mit Fachbegriffen – mit Checkliste und Musterbrief.", es: "La última parte del examen: practica una carta con términos técnicos, con lista de control y carta modelo." })}
          ${gameTile("fehler", "Fehlerheft", `${S.mistakes.length} offen`, { de: "Wiederhole die Fragen, die du falsch beantwortet hast.", es: "Repite las preguntas que respondiste mal." })}
        </div>
      </section>
      <footer class="foot">${bi({ de: "Inhalte nach dem Unterrichtsmaterial (Arbeitsblätter und Heft). Im Zweifel gilt das Heft.", es: "Contenido según el material de clase (hojas de trabajo y cuaderno). En caso de duda vale el cuaderno." })}</footer>`;
  }
  function gameTile(go, title, meta, desc, featured) {
    const icons = { quiz: "quiz", rechnen: "calc", memory: "cards", sortieren: "bins", probe: "exam", fehler: "notebook", brief: "letter" };
    return `<button type="button" class="game ${featured ? "featured" : ""}" data-go="${go}">
      ${ico(icons[go], "lg game-ico")}
      <span class="game-t"><span>${esc(title)}</span><span class="mono">${esc(meta)}</span></span>
      <span class="game-d">${bi(desc)}</span></button>`;
  }

  /* =====================================================================
     CHAPTER
     ===================================================================== */
  function viewChapter(app, c) {
    S.visited[c.id] = true; save();
    const prev = CHAPTERS[c.n - 2], next = CHAPTERS[c.n];
    app.innerHTML = `
      <header class="ch-head tc-${c.id}">
        <div class="ch-text">
          <div><button type="button" class="back" data-go="">← Übersicht</button></div>
          <p class="eyebrow">Kapitel ${c.n} von ${CHAPTERS.length}</p>
          <h1>${bi(c.title)}</h1>
          <div class="exam-box"><span class="eyebrow">Das kommt im Examen</span>${bi(c.exam)}</div>
        </div>
        <div class="ch-ico">${ico(CH_ICON[c.id], "xl")}</div>
      </header>
      ${c.sections.map(s => `
        <section class="blk tc-${c.id}">
          <div class="blk-h"><h2>${bi(s.h)}${s.extra ? `<span class="extra-tag">Zusatz</span>` : ""}</h2>
            <button type="button" class="es-btn" aria-pressed="false" title="Übersetzung für diesen Abschnitt">ES</button></div>
          ${s.blocks.map(renderBlock).join("")}
        </section>`).join("")}
      <section class="blk tc-${c.id}">
        <div class="blk-h"><h2>${bi({ de: "Check: 3 Fragen", es: "Test: 3 preguntas" })}</h2></div>
        <div id="check"></div>
      </section>
      <nav class="ch-nav">
        ${prev ? `<button type="button" class="btn ghost" data-go="${prev.id}">← ${esc(prev.title.de)}</button>` : `<span></span>`}
        <button type="button" class="btn ghost" id="practice">Thema üben (Quiz)</button>
        ${next ? `<button type="button" class="btn" data-go="${next.id}">${esc(next.title.de)} →</button>` : `<button type="button" class="btn" data-go="probe">Probeprüfung →</button>`}
      </nav>`;
    $$("[data-widget]", app).forEach(mountWidget);
    $("#practice", app).onclick = () => { pendingQuiz = c.id; go("quiz"); };
    const pool = QUESTIONS.filter(q => q.topic === c.id && !q.extra && q.type !== "cloze");
    runQuiz($("#check", app), { questions: shuffle(pool).slice(0, 3), compact: true, topic: c.id });
  }

  function renderBlock(b) {
    switch (b.type) {
      case "p": return `<p>${bi(b.text)}</p>`;
      case "def": return `<div class="def"><div class="def-l">${esc(L(b.label || { de: "Merksatz" }).de)}</div><p>${bi(b.text)}</p></div>`;
      case "formula": return `<div class="formula"><div class="f-main">${bi(b.text)}</div>${b.sub ? `<div class="f-sub">${bi(b.sub)}</div>` : ""}</div>`;
      case "note": return `<aside class="note">${bi(b.text)}</aside>`;
      case "list": return b.items.some(i => i.ico)
        ? `<ul class="icolist">${b.items.map(i => `<li>${ico(i.ico, "md")}<span>${bi(i)}</span></li>`).join("")}</ul>`
        : `<ul class="list">${b.items.map(i => `<li>${bi(i)}</li>`).join("")}</ul>`;
      case "chips": return `<div class="chips">${b.items.map(i => `<span class="chip static">${bi(i)}</span>`).join("")}</div>`;
      case "cards": return `<div class="flips">${b.items.map(i => `<button type="button" class="flip" aria-label="${esc(plain(i.front))}: Beispiel zeigen">
          <span class="flip-in">
            <span class="f-face f-front">${ico(i.ico, "lg")}<span class="f-title">${bi(i.front)}</span><span class="f-hint">Tippen für Beispiel ↻</span></span>
            <span class="f-face f-back"><span class="f-title sm">${esc(plain(i.front))}</span><span>${bi(i.back)}</span></span>
          </span></button>`).join("")}</div>`;
      case "fig": return `<figure class="fig fig-${b.name}">${FIG[b.name]()}${b.caption ? `<figcaption>${bi(b.caption)}</figcaption>` : ""}</figure>`;
      case "example": return `<div class="example"><h4>${bi(b.title)}</h4>${b.text ? `<p>${bi(b.text)}</p>` : ""}
          <ol class="steps mono">${b.steps.map(s => `<li>${bi(s)}</li>`).join("")}</ol>
          ${b.pct != null ? FIG.pct(b.pct) : ""}
          <div class="result-line">${bi(b.result)}</div></div>`;
      case "table": return `<div class="tbl-wrap"><table><thead><tr>${b.head.map(h => `<th>${bi(h)}</th>`).join("")}</tr></thead>
          <tbody>${b.rows.map(r => `<tr>${r.map(cell => `<td>${bi(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      case "mikro": return `<div class="ptable">${MIKRO.map((m, i) => `<div class="ptile mini" style="--i:${i}"><span class="pnum">Mikro</span><span class="sym">${m.sym}</span><span class="pname">${bi(m.name)}</span>${m.note ? `<span class="pnote">${bi(m.note)}</span>` : ""}</div>`).join("")}</div>`;
      case "widget": return `<div data-widget="${b.name}" data-arg="${b.arg || ""}"></div>`;
    }
    return "";
  }

  const formChip = (f, hidden) => hidden
    ? `<span class="fchip q"><span class="qmark">?</span></span>`
    : `<span class="fchip">${ico(FORMS[f].ico, "md")}<span>${bi(FORMS[f].name)}</span></span>`;

  function mountWidget(el) {
    const name = el.dataset.widget, arg = el.dataset.arg;
    if (name === "conversion") wConversion(el);
    else if (name === "sankey") wSankey(el);
    else if (name === "gucalc") wGuCalc(el);
    else if (name === "nutrients") wNutrients(el);
    else if (name === "elements") wElements(el);
    else if (name === "pal") wPal(el);
    else if (name === "jonas") wJonas(el);
    else if (name === "sort") runSort(el, SORTS.find(s => s.id === arg), { embedded: true });
    else if (name === "quiz") runQuiz(el, { questions: [QMAP[arg]], compact: true });
    else if (name === "calc") runQuiz(el, { source: () => GEN[pick(arg.split(","))](), compact: true });
  }

  /* ---------- Widgets ---------- */
  function wConversion(el) {
    el.innerHTML = `<div class="devs">${CONVERSIONS.map((c, i) => `<button type="button" class="dev" data-i="${i}">${ico(c.ico, "md")}<span>${bi(c.dev)}</span></button>`).join("")}</div>
      <div class="conv-out" aria-live="polite"></div>`;
    const out = $(".conv-out", el);
    function show(i, reveal) {
      const c = CONVERSIONS[i], first = c.chain[0], last = c.chain[c.chain.length - 1], middle = c.chain.slice(1, -1);
      $$(".dev", el).forEach(b => b.classList.toggle("on", +b.dataset.i === i));
      out.innerHTML = `<div class="machine ${reveal ? "revealed" : ""}">
          <div class="m-col"><span class="m-cap">hinein</span>${first.map(f => formChip(f, !reveal)).join("")}</div>
          ${FIG.arrow()}
          <div class="m-dev">${ico(c.ico, "xl")}<b>${bi(c.dev)}</b>
            ${middle.length ? `<span class="m-mid">${reveal ? `über: ${middle.map(st => st.map(f => esc(FORMS[f].name.de)).join(" + ")).join(" → ")}` : "+ ein Zwischenschritt"}</span>` : ""}</div>
          ${FIG.arrow()}
          <div class="m-col"><span class="m-cap">heraus</span>${last.map(f => formChip(f, !reveal)).join("")}</div>
        </div>
        ${reveal ? "" : `<div><button type="button" class="btn reveal">Auflösen</button></div>`}`;
      const r = $(".reveal", out);
      if (r) r.onclick = () => { show(i, true); FX.burstAt($(".m-dev", out), 14, .6); };
    }
    el.addEventListener("click", e => { const b = e.target.closest(".dev"); if (b) show(+b.dataset.i, false); });
    show(0, true);
  }

  function wSankey(el) {
    let mode = "bulb";
    el.innerHTML = `<figure class="fig"><div class="seg" role="group" aria-label="Lampe wählen">
        <button type="button" class="on" data-m="bulb">Glühlampe</button><button type="button" data-m="led">LED-Lampe</button></div>
      <div class="sk"></div>
      <figcaption></figcaption></figure>`;
    function upd() {
      $(".sk", el).innerHTML = FIG.sankey(mode);
      const light = mode === "bulb" ? 5 : 40;
      $("figcaption", el).innerHTML = bi({
        de: `**100 J = ${light} J + ${100 - light} J.** Keine Energie geht verloren – sie wird nur umgewandelt. ${mode === "bulb" ? "Die Glühlampe macht aber vor allem Wärme." : "Die LED macht aus derselben Energie viel mehr Licht."}`,
        es: `100 J = ${light} J + ${100 - light} J. No se pierde energía, solo se transforma. ${mode === "bulb" ? "Pero la bombilla produce sobre todo calor." : "El LED produce mucha más luz con la misma energía."}`
      });
    }
    $(".seg", el).addEventListener("click", e => {
      const b = e.target.closest("[data-m]"); if (!b) return;
      mode = b.dataset.m; $$(".seg button", el).forEach(x => x.classList.toggle("on", x === b)); upd();
    });
    upd();
  }

  function wGuCalc(el) {
    const id = "gu" + (++uid);
    let w = 50, female = true;
    el.innerHTML = `<div class="gu">
      <div class="gu-in">
        <label for="${id}">Körpergewicht: <b class="mono wv"></b></label>
        <input type="range" id="${id}" min="25" max="100" step="1" value="${w}">
        <div class="seg" role="group" aria-label="Formel">
          <button type="button" data-f="m">Mann / Junge: kg × 24</button>
          <button type="button" class="on" data-f="f">Frau / Mädchen: kg × 24 × 0,9</button>
        </div>
        <ol class="steps mono"></ol>
      </div>
      <div class="gu-side">${ico("scale", "lg")}<div class="label small"></div></div>
      <div class="gu-hours"><p class="muted">${bi({ de: "Jedes Kästchen ist eine Stunde (kcal pro Stunde). 24 Stunden = ein Tag:", es: "Cada casilla es una hora (kcal por hora). 24 horas = un día:" })}</p>${FIG.hours()}</div></div>`;
    let hoursT;
    function upd() {
      const f = female ? F.guFemaleFactor : 1, kcal = w * F.guHours * f, kj = kcal * F.kcalToKj;
      $(".wv", el).textContent = w + " kg";
      $$(".hr b", el).forEach(b => { b.textContent = fmt(w * f, 1); });
      const hs = $(".hours", el);
      hs.classList.remove("tick"); clearTimeout(hoursT);
      hoursT = setTimeout(() => { void hs.offsetWidth; hs.classList.add("tick"); }, 120);
      $(".steps", el).innerHTML = `<li>${w} × 24 = ${w * 24} kcal</li>${female ? `<li>${w * 24} × 0,9 = ${fmt(kcal, 1)} kcal</li>` : ""}<li>${fmt(kcal, 1)} kcal × 4,2 = ${fmt(kj, 0)} kJ</li>`;
      $(".label", el).innerHTML = `<h2>Grundumsatz</h2><div class="label-sub">${female ? "Frau/Mädchen" : "Mann/Junge"} · ${w} kg</div>
        <div class="lrow"><span>pro Stunde</span><span class="lval">${fmt(w * f, 1)} kcal</span></div>
        <div class="lrow thick"><span class="lname">pro Tag</span><span class="lval">${fmt(kcal, 1)} kcal</span></div>
        <div class="lrow"><span class="lname">in Kilojoule</span><span class="lval">${fmt(kj, 0)} kJ</span></div>`;
    }
    $("input", el).addEventListener("input", e => { w = +e.target.value; upd(); });
    $(".seg", el).addEventListener("click", e => {
      const b = e.target.closest("[data-f]"); if (!b) return;
      female = b.dataset.f === "f"; $$(".seg button", el).forEach(x => x.classList.toggle("on", x === b)); upd();
    });
    upd();
  }

  function wNutrients(el) {
    el.innerHTML = `<div class="nut"><div class="tabs" role="tablist">${NUTRIENTS.map((n, i) => `<button type="button" role="tab" data-i="${i}" aria-selected="${i === 0}">${ico(n.meta, "sm")}${esc(n.name.de)}</button>`).join("")}</div><div class="nut-p" role="tabpanel"></div></div>`;
    function show(i) {
      const n = NUTRIENTS[i];
      $$(".tabs button", el).forEach(b => b.setAttribute("aria-selected", +b.dataset.i === i ? "true" : "false"));
      $(".nut-p", el).innerHTML = `
        <div class="nut-top"><div class="nut-hero">${ico(n.meta, "xl")}<div class="nut-img">${bi(n.image)}</div></div>
          <div class="nut-e"><span class="big mono">${n.kj}</span><span>kJ pro Gramm<br>≈ ${n.kcal} kcal</span></div></div>
        <div><h4>Aufbau</h4><p>${bi(n.aufbau)}</p></div>
        <div><h4>Aufgaben im Körper</h4><ul class="list">${n.fn.map(x => `<li>${bi(x)}</li>`).join("")}</ul></div>
        <div><h4>Vorkommen</h4><div class="foods">${n.src.map((x, k) => `<span class="food" style="--i:${k}">${x.ico ? ico(x.ico, "lg") : ""}<span>${bi(x)}</span></span>`).join("")}</div></div>
        <div><h4>Besonderheiten</h4><p class="muted">${bi(n.extra)}</p></div>`;
    }
    $(".tabs", el).addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) show(+b.dataset.i); });
    // the metaphor tiles above the explorer select a tab
    const sec = el.closest(".blk");
    if (sec) sec.addEventListener("click", e => {
      const t = e.target.closest("[data-nut]"); if (!t) return;
      show(NUTRIENTS.findIndex(n => n.id === t.dataset.nut));
      el.scrollIntoView({ block: "nearest", behavior: FX.reduced() ? "auto" : "smooth" });
    });
    show(0);
  }

  function wElements(el) {
    el.innerHTML = `<div class="ptable">${MAKRO.map((m, i) => `<button type="button" class="ptile" data-i="${i}" style="--i:${i}"><span class="pnum">Makro</span><span class="sym">${m.sym}</span><span class="pname">${esc(m.name.de)}</span></button>`).join("")}</div>
      <div class="pdetail" aria-live="polite"></div>`;
    function show(i) {
      const m = MAKRO[i];
      $$(".ptile", el).forEach(b => b.classList.toggle("sel", +b.dataset.i === i));
      const d = $(".pdetail", el);
      d.innerHTML = `<h4><span class="psym mono">${m.sym}</span>${bi(m.name)}</h4>
        <div><h5>Funktion</h5><div class="icorow">${m.fnIco.map(x => ico(x, "lg")).join("")}</div>${bi(m.fn)}</div>
        <div><h5>Vorkommen</h5><div class="icorow">${m.srcIco.map(x => ico(x, "lg")).join("")}</div>${bi(m.src)}</div>`;
      d.classList.remove("pop"); void d.offsetWidth; d.classList.add("pop");
    }
    el.addEventListener("click", e => { const b = e.target.closest(".ptile[data-i]"); if (b) show(+b.dataset.i); });
    show(0);
  }

  /* Tagesplan → durchschnittlicher PAL → Gesamtumsatz */
  function wPal(el) {
    const id = "pal" + (++uid);
    let w = 50, female = true;
    const hours = Object.fromEntries(PAL_ACTS.map(a => [a.id, a.h]));
    el.innerHTML = `<div class="pal">
      <div class="pal-top">
        <label for="${id}">Körpergewicht: <b class="mono wv"></b></label>
        <input type="range" id="${id}" min="25" max="100" step="1" value="${w}">
        <div class="seg" role="group" aria-label="Geschlecht"><button type="button" data-f="m">Mann / Junge</button><button type="button" class="on" data-f="f">Frau / Mädchen</button></div>
      </div>
      <div class="pal-day" aria-hidden="true"></div>
      <div class="pal-rows">${PAL_ACTS.map(a => `<div class="pal-row" data-a="${a.id}">
        <i class="pal-sw" style="background:${a.c}"></i>${ico(a.ico, "md")}
        <span class="pal-n">${bi(a.name)}<small class="mono">PAL ${fmt(a.pal)}</small></span>
        <span class="stepper"><button type="button" data-d="-1" aria-label="eine Stunde weniger">−</button><b class="mono h"></b><button type="button" data-d="1" aria-label="eine Stunde mehr">+</button></span>
        <span class="mono pal-p"></span></div>`).join("")}</div>
      <p class="pal-warn" aria-live="polite"></p>
      <div class="label small pal-res"></div></div>`;
    function upd() {
      const gu = w * F.guHours * (female ? F.guFemaleFactor : 1);
      const tot = PAL_ACTS.reduce((s, a) => s + hours[a.id], 0);
      const sum = PAL_ACTS.reduce((s, a) => s + hours[a.id] * a.pal, 0);
      const ok = tot === 24, avg = Math.round(sum / 24 * 100) / 100, total = gu * avg;
      $(".wv", el).textContent = w + " kg";
      PAL_ACTS.forEach(a => {
        const r = $(`[data-a="${a.id}"]`, el);
        $(".h", r).textContent = hours[a.id] + " h";
        $(".pal-p", r).textContent = `${hours[a.id]} × ${fmt(a.pal)} = ${fmt(hours[a.id] * a.pal)}`;
      });
      $(".pal-day", el).innerHTML = PAL_ACTS.flatMap(a => Array.from({ length: hours[a.id] }, () => `<i style="background:${a.c}"></i>`)).join("")
        + Array.from({ length: Math.max(0, 24 - tot) }, () => `<i class="empty"></i>`).join("");
      $(".pal-warn", el).textContent = ok ? "" : `Dein Tag hat ${tot} Stunden – es müssen genau 24 sein.`;
      $(".pal-res", el).innerHTML = `<h2>Dein Tag</h2><div class="label-sub">${female ? "Frau/Mädchen" : "Mann/Junge"} · ${w} kg</div>
        <div class="lrow"><span>Grundumsatz (${w} × 24${female ? " × 0,9" : ""})</span><span class="lval">${fmt(gu, 0)} kcal</span></div>
        <div class="lrow"><span>Summe Stunden × PAL</span><span class="lval">${fmt(sum)}</span></div>
        <div class="lrow"><span>Ø PAL = Summe : 24</span><span class="lval">${ok ? fmt(avg) : "–"}</span></div>
        <div class="lrow thick"><span class="lname">Gesamtumsatz</span><span class="lval">${ok ? fmt(total, 0) + " kcal" : "–"}</span></div>
        <div class="lrow"><span>davon Leistungsumsatz</span><span class="lval">${ok ? fmt(total - gu, 0) + " kcal" : "–"}</span></div>`;
    }
    $("input", el).addEventListener("input", e => { w = +e.target.value; upd(); });
    $(".seg", el).addEventListener("click", e => {
      const b = e.target.closest("[data-f]"); if (!b) return;
      female = b.dataset.f === "f"; $$(".seg button", el).forEach(x => x.classList.toggle("on", x === b)); upd();
    });
    $(".pal-rows", el).addEventListener("click", e => {
      const b = e.target.closest("[data-d]"); if (!b) return;
      const a = b.closest("[data-a]").dataset.a;
      hours[a] = Math.max(0, Math.min(24, hours[a] + +b.dataset.d)); upd();
    });
    upd();
  }

  /* Arbeitsblatt „Was fehlt Jonas?“ zum Ausfüllen */
  function wJonas(el) {
    let cur = 0;
    const solved = new Set();
    const val = r => r.mg != null ? r.mg : r.per100 * r.g / 100;
    el.innerHTML = `<div class="jonas"><div class="seg" role="group" aria-label="Mineralsalz">${JONAS.map((j, i) => `<button type="button" data-j="${i}" class="${i ? "" : "on"}">${esc(j.el.de)} (${j.kind === "makro" ? "Makro" : "Mikro"})</button>`).join("")}</div><div class="jn-body"></div></div>`;
    function render() {
      const j = JONAS[cur];
      let yn = null;
      const body = $(".jn-body", el);
      body.innerHTML = `<div class="tbl-wrap"><table class="jn-tbl">
        <thead><tr><th>${bi({ de: "Lebensmittel", es: "Alimento" })}</th><th>${bi({ de: "Menge", es: "Cantidad" })}</th><th>${bi({ de: "pro 100 g", es: "por 100 g" })}</th><th>${esc(j.el.de)} (mg)</th></tr></thead>
        <tbody>${j.rows.map((r, k) => `<tr><td><span class="jn-food">${ico(r.ico, "sm")}<span>${bi(r.food)}</span></span></td><td class="mono">${r.g} g</td>
          <td class="mono">${r.per100 != null ? fmt(r.per100) + " mg" : "–"}</td>
          <td>${r.mg != null ? `<span class="mono">${fmt(r.mg)}</span>` : `<input class="jn-in" data-k="${k}" inputmode="decimal" autocomplete="off" aria-label="${esc(plain(r.food))} in mg">`}</td></tr>`).join("")}</tbody>
        <tfoot>
          <tr><th colspan="3">Gesamt</th><td><input class="jn-in" data-k="sum" inputmode="decimal" autocomplete="off" aria-label="Gesamt in mg"></td></tr>
          <tr><th colspan="3">Tagesbedarf</th><td class="mono">${fmt(j.need)}</td></tr>
          <tr><th colspan="3">Tagesbedarf gedeckt?</th><td><span class="jn-yn"><button type="button" class="chip" data-yn="1">Ja</button><button type="button" class="chip" data-yn="0">Nein</button></span></td></tr>
        </tfoot></table></div>
        <div class="row-actions"><button type="button" class="btn jn-check">Prüfen</button><button type="button" class="btn ghost jn-hint">Tipp</button></div>
        <div class="jn-out" aria-live="polite"></div>`;
      const out = $(".jn-out", body);
      const total = j.rows.reduce((s, r) => s + val(r), 0), covered = total >= j.need;
      body.onclick = e => {
        const y = e.target.closest("[data-yn]");
        if (y) { yn = y.dataset.yn === "1"; $$("[data-yn]", body).forEach(b => b.classList.toggle("on", b === y)); return; }
        if (e.target.closest(".jn-hint")) {
          const ex = j.rows.find(r => r.per100 != null);
          out.innerHTML = `<div class="note">${bi({
            de: `**Dreisatz** 100 g ≙ Gehalt. Teile die Menge durch 100 und nimm den Gehalt so oft. Beispiel ${plain(ex.food)}: ${ex.g} g : 100 = ${fmt(ex.g / 100)} → ${fmt(ex.per100)} mg × ${fmt(ex.g / 100)} = ${fmt(val(ex))} mg. Danach alles zusammenzählen und mit dem Tagesbedarf vergleichen.`,
            es: `Regla de tres: 100 g ≙ contenido. Divide la cantidad entre 100 y multiplica el contenido por ese número. Ejemplo: ${ex.g} g : 100 = ${fmt(ex.g / 100)} → ${fmt(ex.per100)} mg × ${fmt(ex.g / 100)} = ${fmt(val(ex))} mg. Después súmalo todo y compáralo con la necesidad diaria.`
          })}</div>`;
          return;
        }
        if (!e.target.closest(".jn-check")) return;
        let ok = 0, n = 0;
        $$(".jn-in", body).forEach(inp => {
          const want = inp.dataset.k === "sum" ? total : val(j.rows[+inp.dataset.k]);
          const good = Math.abs(parseNum(inp.value) - want) < 0.006;
          inp.classList.toggle("ok", good); inp.classList.toggle("no", !good);
          n++; if (good) ok++;
        });
        const ynOk = yn === covered;
        n++; if (ynOk) ok++;
        $$("[data-yn]", body).forEach(b => { b.classList.remove("good", "bad"); if (b.classList.contains("on")) b.classList.add(ynOk ? "good" : "bad"); });
        if (ok === n) {
          out.innerHTML = `<div class="example"><h4>${bi({ de: "Alles richtig!", es: "¡Todo correcto!" })}</h4>
            <p>${bi({ de: `Jonas nimmt ${fmt(total)} mg ${j.el.de} auf. Sein Tagesbedarf ist ${fmt(j.need)} mg – der Tagesbedarf ist ${covered ? "gedeckt ✓" : "nicht gedeckt"}.`, es: `Jonas toma ${fmt(total)} mg de ${j.el.es}. Su necesidad diaria es ${fmt(j.need)} mg: ${covered ? "está cubierta ✓" : "no está cubierta"}.` })}</p>
            ${FIG.pct(Math.round(total / j.need * 100), "vom Tagesbedarf")}</div>`;
          FX.burstAt($(".jn-check", body), 40, 1.1);
          if (!solved.has(cur)) { solved.add(cur); addXP(20); }
        } else {
          out.innerHTML = `<p class="status">${ok} von ${n} richtig. Rechne die roten Felder nochmal.${yn === null ? " Und kreuze an: gedeckt – ja oder nein?" : ""}</p>`;
        }
      };
    }
    $(".seg", el).addEventListener("click", e => {
      const b = e.target.closest("[data-j]"); if (!b) return;
      cur = +b.dataset.j; $$(".seg button", el).forEach(x => x.classList.toggle("on", x === b)); render();
    });
    render();
  }

  /* =====================================================================
     GENERATED CALCULATIONS
     ===================================================================== */
  const NAMES_F = ["Lena", "Mia", "Sofia", "Lara", "Emma", "Nina", "Sabine", "Anna"];
  const NAMES_M = ["Noah", "Luca", "Elias", "Jonas", "Leon", "Tim", "Herbert", "Adam"];
  const NAMES = [...NAMES_F, ...NAMES_M];
  const gid = t => `gen-${t}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
  /* Ein Tag Jonas-Art: 3 Lebensmittel mit Mengen, Summe deutlich über oder unter dem Tagesbedarf */
  function mineralDay() {
    for (;;) {
      const nut = pick(MIN_FOOD.filter(m => m.foods.length >= 3));
      const foods = shuffle(nut.foods).slice(0, 3).map(f => { const g = pick([50, 100, 150, 200, 250, 300]); return { ...f, g, got: f.mg * g / 100 }; });
      const total = foods.reduce((x, f) => x + f.got, 0);
      if (Math.abs(total - nut.need) > nut.need * 0.08) return { nut, foods, total, covered: total >= nut.need, n: pick(NAMES) };
    }
  }
  const dayText = d => ({
    de: `${d.n} isst ${d.foods.map(f => `${f.g} g ${f.de} (100 g ≙ ${fmt(f.mg)} mg)`).join(", ").replace(/, ([^,]*)$/, " und $1")}. Der Tagesbedarf an ${d.nut.de} ist ${fmt(d.nut.need)} mg.`,
    es: `${d.n} come ${d.foods.map(f => `${f.g} g de ${f.es} (100 g ≙ ${fmt(f.mg)} mg)`).join(", ").replace(/, ([^,]*)$/, " y $1")}. La necesidad diaria de ${d.nut.es} es ${fmt(d.nut.need)} mg.`
  });
  const daySteps = d => [
    ...d.foods.map(f => ({ de: `${f.de}: ${fmt(f.mg)} mg × ${fmt(f.g / 100)} = ${fmt(f.got)} mg`, es: `${f.es}: ${fmt(f.mg)} mg × ${fmt(f.g / 100)} = ${fmt(f.got)} mg` })),
    { de: `Gesamt: ${d.foods.map(f => fmt(f.got)).join(" + ")} = ${fmt(d.total)} mg`, es: `Total: ${d.foods.map(f => fmt(f.got)).join(" + ")} = ${fmt(d.total)} mg` },
    { de: `${fmt(d.total)} mg ${d.covered ? "≥" : "<"} ${fmt(d.nut.need)} mg → Tagesbedarf ${d.covered ? "gedeckt ✓" : "nicht gedeckt"}`, es: `${fmt(d.total)} mg ${d.covered ? "≥" : "<"} ${fmt(d.nut.need)} mg → necesidad ${d.covered ? "cubierta ✓" : "no cubierta"}` }
  ];
  const GEN = {
    gu_kcal() {
      const female = Math.random() < .5, n = pick(female ? NAMES_F : NAMES_M), w = rint(35, 85);
      const kcal = w * F.guHours * (female ? F.guFemaleFactor : 1);
      const age = rint(13, 60), m = fmt(rint(150, 192) / 100), grams = Math.random() < .25, wTxt = grams ? `${w * 1000} g` : `${w} kg`;
      return { id: gid("gukcal"), gen: true, topic: "umsatz", type: "num", unit: "kcal", answer: kcal, tol: 0.5,
        q: { de: `${n} ist ${age} Jahre alt, ${m} m groß und wiegt ${wTxt}. Berechne ${female ? "ihren" : "seinen"} Grundumsatz pro Tag in kcal.`, es: `${n} tiene ${age} años, mide ${m} m y pesa ${wTxt}. Calcula su metabolismo basal diario en kcal.` },
        steps: [...(grams ? [`${w * 1000} g = ${w} kg`] : []),
          female ? { de: "Frau: Körpergewicht × 24 × 0,9", es: "Mujer: peso × 24 × 0,9" } : { de: "Mann: Körpergewicht × 24", es: "Hombre: peso × 24" },
          female ? `${w} × 24 × 0,9 = ${fmt(kcal)} kcal` : `${w} × 24 = ${fmt(kcal)} kcal`,
          { de: "Alter und Größe brauchst du nicht.", es: "La edad y la estatura no hacen falta." }] };
    },
    gu_kj() {
      const w = rint(35, 85), n = pick(NAMES), kj = F.guKjPerKgHour * w * F.guHours;
      return { id: gid("gukj"), gen: true, topic: "umsatz", type: "num", unit: "kJ", answer: kj, tol: 1,
        q: { de: `${n} wiegt ${w} kg. Berechne den Grundumsatz pro Tag in kJ (4,2 kJ pro kg und Stunde).`, es: `${n} pesa ${w} kg. Calcula el metabolismo basal diario en kJ (4,2 kJ por kg y hora).` },
        steps: [`4,2 kJ × ${w} × 24 = ${fmt(kj)} kJ`] };
    },
    gu_weight() {
      const w = rint(40, 90), kcal = w * F.guHours;
      return { id: gid("guw"), gen: true, topic: "umsatz", type: "num", unit: "kg", answer: w, tol: 0.2,
        q: { de: `Der Grundumsatz eines Mannes beträgt ${kcal} kcal pro Tag. Wie viel wiegt er?`, es: `El metabolismo basal de un hombre es de ${kcal} kcal al día. ¿Cuánto pesa?` },
        steps: [{ de: "Mann: Körpergewicht × 24 = Grundumsatz → Körpergewicht = Grundumsatz : 24", es: "Hombre: peso × 24 = basal → peso = basal : 24" }, `${kcal} : 24 = ${w} kg`] };
    },
    gesamt() {
      const gu = rint(12, 20) * 100, lu = rint(4, 14) * 100, total = gu + lu;
      if (Math.random() < .5) return { id: gid("ges"), gen: true, topic: "umsatz", type: "num", unit: "kcal", answer: total, tol: 0.5,
        q: { de: `Grundumsatz: ${gu} kcal, Leistungsumsatz: ${lu} kcal. Wie groß ist der Gesamtumsatz?`, es: `Metabolismo basal: ${gu} kcal, gasto por actividad: ${lu} kcal. ¿Cuál es el gasto total?` },
        steps: [{ de: "Gesamtumsatz = Grundumsatz + Leistungsumsatz", es: "Gasto total = basal + actividad" }, `${gu} + ${lu} = ${total} kcal`] };
      return { id: gid("lu"), gen: true, topic: "umsatz", type: "num", unit: "kcal", answer: lu, tol: 0.5,
        q: { de: `Gesamtumsatz: ${total} kcal, Grundumsatz: ${gu} kcal. Wie groß ist der Leistungsumsatz?`, es: `Gasto total: ${total} kcal, metabolismo basal: ${gu} kcal. ¿Cuál es el gasto por actividad?` },
        steps: [{ de: "Leistungsumsatz = Gesamtumsatz − Grundumsatz", es: "Actividad = total − basal" }, `${total} − ${gu} = ${lu} kcal`] };
    },
    pal_avg() {
      let h;
      do { h = { sleep: rint(7, 10), sit: rint(5, 8), light: rint(1, 4), sport: rint(0, 2) }; h.free = 24 - h.sleep - h.sit - h.light - h.sport; } while (h.free < 1 || h.free > 6);
      const acts = PAL_ACTS.filter(a => h[a.id] > 0);
      const sum = acts.reduce((x, a) => x + h[a.id] * a.pal, 0), avg = Math.round(sum / 24 * 100) / 100, n = pick(NAMES);
      return { id: gid("pal"), gen: true, topic: "umsatz", type: "num", unit: "", answer: avg, tol: 0.011,
        q: { de: `Ein Tag von ${n}: ${acts.map(a => `${plain(a.name)} ${h[a.id]} h (PAL ${fmt(a.pal)})`).join(", ")}. Berechne den durchschnittlichen PAL-Wert (auf 2 Stellen nach dem Komma).`,
          es: `Un día de ${n}: ${acts.map(a => `${a.name.es} ${h[a.id]} h (PAL ${fmt(a.pal)})`).join(", ")}. Calcula el valor PAL medio (con 2 decimales).` },
        steps: [...acts.map(a => `${h[a.id]} × ${fmt(a.pal)} = ${fmt(h[a.id] * a.pal)}`),
          { de: `Summe: ${fmt(sum)}`, es: `Suma: ${fmt(sum)}` }, `${fmt(sum)} : 24 ≈ ${fmt(avg)}`] };
    },
    pal_total() {
      const gu = rint(12, 20) * 100, pal = pick([1.4, 1.45, 1.5, 1.55, 1.6, 1.7, 1.8, 1.9]), total = Math.round(gu * pal * 100) / 100;
      if (Math.random() < .6) return { id: gid("palt"), gen: true, topic: "umsatz", type: "num", unit: "kcal", answer: total, tol: 0.5,
        q: { de: `Grundumsatz: ${gu} kcal, durchschnittlicher PAL-Wert: ${fmt(pal)}. Wie groß ist der Gesamtumsatz?`, es: `Metabolismo basal: ${gu} kcal, valor PAL medio: ${fmt(pal)}. ¿Cuál es el gasto total?` },
        steps: [{ de: "Gesamtumsatz = Grundumsatz × PAL", es: "Gasto total = basal × PAL" }, `${gu} kcal × ${fmt(pal)} = ${fmt(total)} kcal`] };
      const lu = Math.round((total - gu) * 100) / 100;
      return { id: gid("pall"), gen: true, topic: "umsatz", type: "num", unit: "kcal", answer: lu, tol: 0.5,
        q: { de: `Grundumsatz: ${gu} kcal, durchschnittlicher PAL-Wert: ${fmt(pal)}. Wie groß ist der Leistungsumsatz?`, es: `Metabolismo basal: ${gu} kcal, valor PAL medio: ${fmt(pal)}. ¿Cuál es el gasto por actividad?` },
        steps: [`${gu} kcal × ${fmt(pal)} = ${fmt(total)} kcal`, { de: `Leistungsumsatz = ${fmt(total)} − ${gu} = ${fmt(lu)} kcal`, es: `Actividad = ${fmt(total)} − ${gu} = ${fmt(lu)} kcal` }] };
    },
    conv() {
      const kcal = rint(2, 40) * 50, kj = kcal * F.kcalToKj;
      if (Math.random() < .5) return { id: gid("conv"), gen: true, topic: "energie", type: "num", unit: "kJ", answer: kj, tol: Math.max(1, kj * 0.005),
        q: { de: `Rechne ${kcal} kcal in kJ um (1 kcal ≈ 4,2 kJ).`, es: `Convierte ${kcal} kcal en kJ (1 kcal ≈ 4,2 kJ).` },
        steps: [`${kcal} × 4,2 = ${fmt(kj)} kJ`] };
      return { id: gid("conv"), gen: true, topic: "energie", type: "num", unit: "kcal", answer: kcal, tol: Math.max(1, kcal * 0.005),
        q: { de: `Rechne ${fmt(kj)} kJ in kcal um (1 kcal ≈ 4,2 kJ).`, es: `Convierte ${fmt(kj)} kJ en kcal (1 kcal ≈ 4,2 kJ).` },
        steps: [`${fmt(kj)} : 4,2 = ${kcal} kcal`] };
    },
    naehr_energy() {
      const k = F.kjPerGram;
      if (Math.random() < .5) {
        const nt = pick([["kh", "Kohlenhydrate", "carbohidratos"], ["fett", "Fett", "grasa"], ["protein", "Eiweiß", "proteína"]]), g = rint(4, 60), e = g * k[nt[0]];
        return { id: gid("ne"), gen: true, topic: "naehrstoffe", type: "num", unit: "kJ", answer: e, tol: 0.5,
          q: { de: `Wie viel Energie liefern ${g} g ${nt[1]}?`, es: `¿Cuánta energía aportan ${g} g de ${nt[2]}?` },
          steps: [`${g} g × ${k[nt[0]]} kJ = ${e} kJ`] };
      }
      const a = rint(10, 40), b = rint(2, 15), c = rint(2, 12), e = a * k.kh + b * k.fett + c * k.protein;
      return { id: gid("ne"), gen: true, topic: "naehrstoffe", type: "num", unit: "kJ", answer: e, tol: 0.5,
        q: { de: `Ein Snack enthält ${a} g Kohlenhydrate, ${b} g Fett und ${c} g Eiweiß. Wie viel Energie liefert er? (17 / 37 / 17 kJ pro g)`, es: `Un snack contiene ${a} g de carbohidratos, ${b} g de grasa y ${c} g de proteína. ¿Cuánta energía aporta? (17 / 37 / 17 kJ por g)` },
        steps: [`${a} × ${k.kh} = ${a * k.kh} kJ`, `${b} × ${k.fett} = ${b * k.fett} kJ`, `${c} × ${k.protein} = ${c * k.protein} kJ`, `${a * k.kh} + ${b * k.fett} + ${c * k.protein} = ${e} kJ`] };
    },
    min_portion() {
      const nut = pick(MIN_FOOD), food = pick(nut.foods), g = pick([50, 150, 200, 250, 300, 400]), mg = food.mg * g / 100;
      return { id: gid("mpo"), gen: true, topic: "mineral", type: "num", unit: "mg", answer: mg, tol: Math.max(0.05, mg * 0.005),
        q: { de: `100 g ${food.de} enthalten ${fmt(food.mg)} mg ${nut.de}. Wie viel mg ${nut.de} stecken in ${g} g ${food.de}?`, es: `100 g de ${food.es} contienen ${fmt(food.mg)} mg de ${nut.es}. ¿Cuántos mg de ${nut.es} hay en ${g} g?` },
        steps: [`100 g ≙ ${fmt(food.mg)} mg`, `${g} g : 100 g = ${fmt(g / 100)}`, `${fmt(food.mg)} mg × ${fmt(g / 100)} = ${fmt(mg)} mg`] };
    },
    min_day() {
      const d = mineralDay();
      return { id: gid("mday"), gen: true, topic: "mineral", type: "num", unit: "mg", answer: d.total, tol: Math.max(0.05, d.total * 0.005),
        q: { de: `${dayText(d).de} Wie viel mg ${d.nut.de} nimmt ${d.n} insgesamt auf?`, es: `${dayText(d).es} ¿Cuántos mg de ${d.nut.es} toma en total?` }, steps: daySteps(d) };
    },
    min_covered() {
      const d = mineralDay();
      return { id: gid("mcov"), gen: true, topic: "mineral", type: "mc",
        q: { de: `${dayText(d).de} Ist der Tagesbedarf gedeckt?`, es: `${dayText(d).es} ¿Está cubierta la necesidad diaria?` },
        options: [{ de: "Ja, gedeckt", es: "Sí, cubierta" }, { de: "Nein, nicht gedeckt", es: "No, no cubierta" }], answer: d.covered ? 0 : 1, steps: daySteps(d) };
    },
    min_pct() {
      const nut = pick(MIN_FOOD), food = pick(nut.foods);
      let a, mg, pct;
      for (let t = 0; t < 30; t++) {
        a = pick([50, 100, 150, 200, 250, 300, 400, 500]);
        mg = a / 100 * food.mg; pct = mg / nut.need * 100;
        if (pct <= 150 && Math.abs(pct * 10 - Math.round(pct * 10)) < 1e-9) break;
      }
      const round = Math.abs(pct - Math.round(pct)) > 1e-9;
      return { id: gid("mp"), gen: true, topic: "mineral", type: "num", unit: "%", answer: pct, tol: 0.6,
        q: { de: `100 g ${food.de} enthalten ${fmt(food.mg)} mg ${nut.de}. Du isst ${a} g. Wie viel Prozent deines Tagesbedarfs (${fmt(nut.need)} mg) deckst du?${round ? " (Runde auf eine Stelle nach dem Komma.)" : ""}`, es: `100 g de ${food.es} contienen ${fmt(food.mg)} mg de ${nut.es}. Comes ${a} g. ¿Qué porcentaje de tu necesidad diaria (${fmt(nut.need)} mg) cubres?${round ? " (Redondea a un decimal.)" : ""}` },
        steps: [{ de: `${a} g enthalten ${fmt(food.mg)} mg × ${fmt(a / 100)} = ${fmt(mg)} mg`, es: `${a} g contienen ${fmt(food.mg)} mg × ${fmt(a / 100)} = ${fmt(mg)} mg` }, `${fmt(mg)} mg : ${fmt(nut.need)} mg × 100 = ${fmt(pct, 1)} %`] };
    }
  };
  const CALC_TYPES = [
    { label: { de: "Grundumsatz (kcal)", es: "Metabolismo basal (kcal)" }, gens: ["gu_kcal", "gu_kcal", "gu_weight"] },
    { label: { de: "Grundumsatz in kJ", es: "Metabolismo basal en kJ" }, gens: ["gu_kj"] },
    { label: { de: "PAL-Wert und Gesamtumsatz", es: "Valor PAL y gasto total" }, gens: ["pal_avg", "pal_total", "gesamt"] },
    { label: { de: "kcal ↔ kJ", es: "kcal ↔ kJ" }, gens: ["conv"] },
    { label: { de: "Energie aus Nährstoffen", es: "Energía de los nutrientes" }, gens: ["naehr_energy"] },
    { label: { de: "Mineralsalze: Dreisatz", es: "Sales minerales: regla de tres" }, gens: ["min_portion"] },
    { label: { de: "Tagesbedarf gedeckt?", es: "¿Necesidad diaria cubierta?" }, gens: ["min_day", "min_covered"] },
    { label: { de: "% vom Tagesbedarf", es: "% de la necesidad diaria" }, gens: ["min_pct"] }
  ];
  const TOPIC_GENS = { energie: ["conv"], umsatz: ["gu_kcal", "gu_kj", "pal_avg", "pal_total"], naehrstoffe: ["naehr_energy"], mineral: ["min_portion", "min_day", "min_covered"], vitamine: [] };
  const EXAM_PLAN = { energie: 4, umsatz: 3, vitamine: 5, naehrstoffe: 3, mineral: 3 };
  const EXAM_N = Object.values(EXAM_PLAN).reduce((a, b) => a + b, 0) + 3; // + Grundumsatz, Dreisatz, Tagesbedarf

  /* =====================================================================
     QUIZ ENGINE
     ===================================================================== */
  const PRAISE = ["Richtig!", "Genau!", "Super!", "Stimmt!", "Perfekt!"];
  const KIND = { tf: "Richtig oder falsch?", multi: "Mehrere Antworten sind richtig", cloze: "Tippe die Wörter in die Lücken", num: "Rechne" };

  function clozeParts(q) { const parts = L(q.text).de.split(/\{([^}]+)\}/); return { parts, blanks: parts.filter((_, k) => k % 2) }; }
  function rightOf(q) {
    switch (q.type) {
      case "mc": return plain(q.options[q.answer]);
      case "tf": return q.answer ? "Richtig" : "Falsch";
      case "multi": return q.answer.map(k => plain(q.options[k])).join(", ");
      case "cloze": return clozeParts(q).blanks.join(" · ");
      case "num": return `${fmt(q.answer)} ${q.unit}`;
    }
    return "";
  }
  function parseNum(s) {
    s = String(s).trim().replace(/[\s'’]/g, "").replace(/(kcal|kj|kg|mg\/kg|mg|g|ml|%)$/i, "");
    if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
    s = s.replace(",", ".");
    return s === "" ? NaN : Number(s);
  }

  function renderQuestion(q, el, done, exam) {
    let locked = false;
    const finish = (correct, given) => { if (locked) return; locked = true; done({ correct, given, right: rightOf(q) }); };

    if (q.type === "mc" || q.type === "tf") {
      const opts = q.type === "tf"
        ? [{ t: { de: "Richtig", es: "Verdadero" }, k: true }, { t: { de: "Falsch", es: "Falso" }, k: false }]
        : shuffle(q.options.map((t, k) => ({ t, k })));
      el.innerHTML = `<div class="opts ${q.type === "tf" ? "tf" : ""}">${opts.map((o, n) => `<button type="button" class="opt" data-n="${n}">
        ${q.type === "tf" ? "" : `<span class="opt-k mono">${"ABCDEF"[n]}</span>`}<span>${bi(o.t)}</span></button>`).join("")}</div>`;
      el.onclick = e => {
        const b = e.target.closest(".opt"); if (!b || locked) return;
        const o = opts[+b.dataset.n], ok = o.k === q.answer;
        $$(".opt", el).forEach(x => { x.disabled = true; });
        b.classList.add("picked");
        if (!exam) {
          b.classList.add(ok ? "ok" : "no");
          if (!ok) $$(".opt", el).find(x => opts[+x.dataset.n].k === q.answer).classList.add("ok");
        }
        finish(ok, plain(o.t));
      };
    }

    else if (q.type === "multi") {
      const opts = shuffle(q.options.map((t, k) => ({ t, k })));
      el.innerHTML = `<div class="opts">${opts.map((o, n) => `<button type="button" class="opt" data-n="${n}" aria-pressed="false"><span class="opt-k mono">☐</span><span>${bi(o.t)}</span></button>`).join("")}</div>
        <div><button type="button" class="btn chk">Prüfen</button></div>`;
      el.onclick = e => {
        const b = e.target.closest(".opt"); if (!b || locked) return;
        const on = !b.classList.contains("sel");
        b.classList.toggle("sel", on); b.setAttribute("aria-pressed", on); $(".opt-k", b).textContent = on ? "☑" : "☐";
      };
      $(".chk", el).onclick = () => {
        if (locked) return;
        const chosen = $$(".opt.sel", el).map(b => opts[+b.dataset.n].k);
        if (!chosen.length) { toast("Wähle mindestens eine Antwort."); return; }
        const ok = chosen.length === q.answer.length && chosen.every(k => q.answer.includes(k));
        $$(".opt", el).forEach(b => {
          b.disabled = true;
          if (exam) return;
          const k = opts[+b.dataset.n].k, isRight = q.answer.includes(k), sel = b.classList.contains("sel");
          b.classList.remove("sel");
          if (sel) b.classList.add(isRight ? "ok" : "no"); else if (isRight) b.classList.add("miss");
        });
        $(".chk", el).disabled = true;
        finish(ok, chosen.map(k => plain(q.options[k])).join(", "));
      };
    }

    else if (q.type === "cloze") {
      const { parts, blanks } = clozeParts(q);
      const chips = shuffle([...blanks, ...(q.distractors || [])].map((w, id) => ({ w, id })));
      const fill = Array(blanks.length).fill(null);
      el.innerHTML = `<p class="cloze-text">${parts.map((p, k) => k % 2 ? `<button type="button" class="slot" data-s="${(k - 1) / 2}">&nbsp;</button>` : rich(p, false)).join("")}</p>
        ${L(q.text).es ? `<p class="es" lang="es">${esc(L(q.text).es)}</p>` : ""}
        <div class="chips">${chips.map(c => `<button type="button" class="chip" data-c="${c.id}">${esc(c.w)}</button>`).join("")}</div>
        <div><button type="button" class="btn chk" disabled>Prüfen</button></div>`;
      const sync = () => {
        $$(".slot", el).forEach(s => { const c = fill[+s.dataset.s]; s.innerHTML = c == null ? "&nbsp;" : esc(chips.find(x => x.id === c).w); });
        $$(".chip", el).forEach(b => b.classList.toggle("used", fill.includes(+b.dataset.c)));
        $(".chk", el).disabled = fill.includes(null);
      };
      el.onclick = e => {
        if (locked) return;
        const chip = e.target.closest(".chip[data-c]"), slot = e.target.closest(".slot");
        if (chip && !chip.classList.contains("used")) { const i = fill.indexOf(null); if (i >= 0) { fill[i] = +chip.dataset.c; sync(); } }
        else if (slot) { fill[+slot.dataset.s] = null; sync(); }
      };
      $(".chk", el).onclick = () => {
        if (locked) return;
        const words = fill.map(c => chips.find(x => x.id === c).w);
        const ok = words.every((w, s) => w === blanks[s]);
        if (!exam) $$(".slot", el).forEach(s => { const k = +s.dataset.s; s.classList.add(words[k] === blanks[k] ? "ok" : "no"); });
        $$(".chip, .slot, .chk", el).forEach(b => { b.disabled = true; });
        finish(ok, words.join(" · "));
      };
    }

    else if (q.type === "num") {
      const id = "num" + (++uid);
      el.innerHTML = `<form class="num" novalidate><label class="muted" for="${id}" style="width:100%">Deine Antwort</label>
        <input id="${id}" inputmode="decimal" autocomplete="off" placeholder="z. B. 1200"><span class="unit mono">${esc(q.unit)}</span>
        <button type="submit" class="btn">Prüfen</button></form>`;
      const input = $("input", el);
      $("form", el).onsubmit = e => {
        e.preventDefault(); if (locked) return;
        const v = parseNum(input.value);
        if (isNaN(v)) { toast("Bitte gib eine Zahl ein, z. B. 5040 oder 2,4."); return; }
        const tol = q.tol != null ? q.tol : Math.max(0.5, Math.abs(q.answer) * 0.01);
        const ok = Math.abs(v - q.answer) <= tol;
        input.disabled = true; $("button", el).disabled = true;
        if (!exam) input.classList.add(ok ? "ok" : "no");
        finish(ok, `${input.value} ${q.unit}`);
      };
    }
  }

  /* runQuiz(root, { questions | source, compact, mode: "practice"|"exam", topic, timerMin, onFinish, onRestart }) */
  function runQuiz(root, o) {
    const infinite = !!o.source;
    const qs = o.questions || [];
    const exam = o.mode === "exam";
    let i = 0, score = 0, streak = 0, current = null, tick = null;
    const log = [];
    const deadline = o.timerMin ? Date.now() + o.timerMin * 60000 : 0;
    if (deadline) { tick = setInterval(updTimer, 1000); cleanups.push(() => clearInterval(tick)); }

    function show() {
      current = infinite ? o.source() : qs[i];
      const single = !infinite && qs.length === 1;
      root.innerHTML = `<div class="qz">
        ${single ? "" : `<div class="qz-top"><span class="mono">${infinite ? "Aufgabe" : "Frage"} ${i + 1}${infinite ? "" : " / " + qs.length}</span>
          ${exam ? "" : `<span class="mono">✓ ${score}${streak >= 2 ? ` · Serie ${streak}` : ""}</span>`}
          ${deadline ? `<span class="mono timer"></span>` : ""}</div>
          ${infinite ? "" : `<div class="bar"><span style="width:${(i / qs.length) * 100}%"></span></div>`}`}
        <div class="qz-card">
          ${CH_ICON[current.topic] ? ico(CH_ICON[current.topic], "qz-deco") : ""}
          <div class="qz-meta"><span>${topicTag(current.topic)}${KIND[current.type] ? `<span class="kind">${KIND[current.type]}</span>` : ""}</span>
            <button type="button" class="es-btn" aria-pressed="false" title="Übersetzung">ES</button></div>
          <h3 class="qz-q">${bi(current.q)}</h3>
          <div class="qz-body"></div>
          <div class="qz-fb" hidden></div>
        </div></div>`;
      renderQuestion(current, $(".qz-body", root), answered, exam);
      updTimer();
    }

    function answered(res) {
      log.push({ q: current, ...res });
      if (res.correct) {
        score++; streak++;
        if (!exam) {
          addXP(10 + (streak % 5 === 0 ? 20 : 0));
          if (streak > S.bestStreak) { S.bestStreak = streak; save(); }
          if (streak % 5 === 0) toast(`<b>Serie ${streak}!</b> +20 kJ Bonus`);
        }
        removeMistake(current);
      } else { streak = 0; addMistake(current); }

      if (exam) { setTimeout(next, 200); return; }

      const fb = $(".qz-fb", root), more = infinite || i < qs.length - 1;
      fb.hidden = false;
      fb.className = "qz-fb " + (res.correct ? "good" : "bad");
      fb.innerHTML = `<p class="fb-h">${res.correct ? pick(PRAISE) : "Leider falsch."}</p>
        ${!res.correct ? `<p>Richtig ist: <b>${esc(res.right)}</b></p>` : ""}
        ${current.steps ? `<ol class="steps mono">${current.steps.map(s => `<li>${bi(s)}</li>`).join("")}</ol>` : ""}
        ${current.explain ? `<p>${bi(current.explain)}</p>` : ""}
        <div class="fb-actions">
          ${!res.correct && !o.compact && CH[current.topic] ? `<button type="button" class="btn ghost" data-go="${current.topic}">Im Kapitel nachlesen</button>` : ""}
          ${more ? `<button type="button" class="btn nx">${infinite ? "Neue Aufgabe" : "Weiter"}</button>` : `<button type="button" class="btn nx">${qs.length > 1 ? "Ergebnis" : "Nochmal"}</button>`}
        </div>`;
      const nx = $(".nx", fb);
      nx.onclick = !infinite && qs.length === 1 ? () => runQuiz(root, o) : next;
      nx.focus({ preventScroll: true });
      fb.scrollIntoView({ block: "nearest" });
      if (res.correct) FX.burstAt($(".fb-h", fb), streak % 5 === 0 ? 40 : 16, streak % 5 === 0 ? 1.2 : .6);
    }

    function next() { i++; if (infinite || i < qs.length) show(); else finish(); }

    function finish() {
      if (tick) clearInterval(tick);
      const pct = Math.round((score / qs.length) * 100);
      if (o.topic && !o.compact) { S.best[o.topic] = Math.max(S.best[o.topic] || 0, pct); save(); }
      const r = { score, total: qs.length, pct, log };
      if (o.onFinish) o.onFinish(r); else root.innerHTML = summaryHTML(r, o);
      celebrate(root, r.pct);
      const again = $(".again", root);
      if (again) again.onclick = () => o.onRestart ? o.onRestart() : runQuiz(root, Object.assign({}, o, { questions: shuffle(qs) }));
    }

    function updTimer() {
      if (!deadline) return;
      const left = Math.max(0, deadline - Date.now());
      const t = $(".timer", root);
      if (t) t.textContent = `⏱ ${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, "0")}`;
      if (left === 0 && log.length < qs.length) {
        clearInterval(tick);
        for (let k = log.length; k < qs.length; k++) log.push({ q: qs[k], correct: false, given: "(keine Zeit mehr)", right: rightOf(qs[k]) });
        toast("Die Zeit ist um!");
        i = qs.length; finish();
      }
    }

    show();
  }

  function celebrate(root, pct) {
    FX.countUp($(".cu", root), pct);
    if (pct >= 70) setTimeout(() => FX.burstAt($(".result-score", root), pct >= 90 ? 70 : 40, 1.6), 250);
    $(".result-score", root)?.scrollIntoView({ block: "nearest" });
  }

  function summaryHTML(r, o) {
    const wrong = r.log.filter(x => !x.correct);
    const byTopic = {};
    r.log.forEach(x => { const t = x.q.topic; byTopic[t] = byTopic[t] || { ok: 0, n: 0 }; byTopic[t].n++; if (x.correct) byTopic[t].ok++; });
    const topicsShown = CHAPTERS.filter(c => byTopic[c.id]);
    return `<div class="result">
      <div class="result-score">${ico(r.pct >= 70 ? "star" : "book", "xl res-ico")}<span class="big mono"><span class="cu" data-to="${r.pct}">${r.pct}</span> %</span><span>${r.score} von ${r.total} richtig</span><span class="stars pop-stars">${[...stars(r.pct)].map((s, k) => `<i style="--i:${k}">${s}</i>`).join("")}</span></div>
      ${o.breakdown ? `<div class="breakdown">${topicsShown.map(c => { const b = byTopic[c.id], p = Math.round(b.ok / b.n * 100); return `<div class="bd-row tc-${c.id}"><span>${esc(c.title.de.split(" ")[0])}</span><span class="bd-bar"><i style="width:${p}%"></i></span><span class="mono">${b.ok}/${b.n}</span></div>`; }).join("")}</div>
        ${topicsShown.filter(c => byTopic[c.id].ok / byTopic[c.id].n < .7).length ? `<p><b>Das musst du noch üben:</b> ${topicsShown.filter(c => byTopic[c.id].ok / byTopic[c.id].n < .7).map(c => `<button type="button" class="chip" data-go="${c.id}">${esc(c.title.de)}</button>`).join(" ")}</p>` : ""}` : ""}
      ${wrong.length ? `<h3>${o.compact ? "Schau dir das nochmal an" : "Das solltest du nochmal anschauen"}</h3>
        <ol class="review">${wrong.map(w => `<li>
          <p class="rv-q">${bi(w.q.q)}</p>
          ${w.q.type === "cloze" ? `<p class="muted">${esc(plain(w.q.text).replace(/\{([^}]+)\}/g, "___"))}</p>` : ""}
          <p>Deine Antwort: <s>${esc(w.given)}</s></p>
          <p>Richtig: <b>${esc(w.right)}</b></p>
          ${w.q.steps ? `<ol class="steps mono">${w.q.steps.map(s => `<li>${bi(s)}</li>`).join("")}</ol>` : ""}
          ${w.q.explain ? `<p class="muted">${bi(w.q.explain)}</p>` : ""}</li>`).join("")}</ol>`
        : `<p>${bi({ de: "Alles richtig – super gemacht!", es: "¡Todo correcto, muy bien!" })}</p>`}
      <div class="row-actions"><button type="button" class="btn again">Nochmal</button>${o.compact ? "" : `<button type="button" class="btn ghost" data-go="">Zur Übersicht</button>`}</div>
    </div>`;
  }

  /* =====================================================================
     GAME VIEWS
     ===================================================================== */
  function pageHead(title, sub) {
    return `<div class="page-h"><div><button type="button" class="back" data-go="">← Übersicht</button></div><h1>${esc(title)}</h1>${sub ? `<p class="sec-sub">${bi(sub)}</p>` : ""}</div>`;
  }

  function topicQuestions(t) {
    const pool = QUESTIONS.filter(q => q.topic === t);
    const gens = TOPIC_GENS[t] || [];
    const nGen = gens.length ? 2 : 0;
    return shuffle([...shuffle(pool).slice(0, 10 - nGen), ...Array.from({ length: nGen }, () => GEN[pick(gens)]())]);
  }
  function mixedQuestions() {
    const out = [];
    CHAPTERS.forEach(c => out.push(...shuffle(QUESTIONS.filter(q => q.topic === c.id && !q.extra)).slice(0, 2)));
    out.push(GEN.gu_kcal(), GEN[pick(["min_portion", "min_covered"])]());
    return shuffle(out);
  }

  function viewQuiz(app) {
    const start = t => {
      app.innerHTML = pageHead(t === "mix" ? "Quiz: alles gemischt" : `Quiz: ${CH[t].title.de}`) + `<div id="qroot"></div>`;
      const qs = t === "mix" ? mixedQuestions() : topicQuestions(t);
      runQuiz($("#qroot", app), { questions: qs, topic: t === "mix" ? null : t, onRestart: () => start(t) });
    };
    if (pendingQuiz) { const t = pendingQuiz; pendingQuiz = null; return start(t); }
    app.innerHTML = pageHead("Quiz", { de: "Wähle ein Thema. Pro Runde gibt es 10 Fragen. Ab 90 % bekommst du drei Sterne.", es: "Elige un tema. Cada ronda tiene 10 preguntas. Con un 90 % consigues tres estrellas." }) +
      `<div class="picker">${CHAPTERS.map(c => `<button type="button" class="pick tc-${c.id}" data-t="${c.id}">
        <span class="tag">${c.n}</span><span class="pick-t">${esc(c.title.de)}</span>
        <span class="pick-d">${S.best[c.id] != null ? `Bestes Ergebnis: ${S.best[c.id]} % <span class="stars">${stars(S.best[c.id])}</span>` : "Noch nicht gespielt"}</span></button>`).join("")}
        <button type="button" class="pick" data-t="mix"><span class="tag">∑</span><span class="pick-t">Alles gemischt</span><span class="pick-d">12 Fragen aus allen Themen</span></button></div>`;
    $(".picker", app).onclick = e => { const b = e.target.closest("[data-t]"); if (b) start(b.dataset.t); };
  }

  function viewCalc(app) {
    const sel = new Set(CALC_TYPES.map((_, i) => i));
    app.innerHTML = pageHead("Rechentrainer", { de: "Immer neue Zahlen. Wähle, was du üben willst. Kommazahlen kannst du mit Komma oder Punkt schreiben.", es: "Números siempre nuevos. Elige qué quieres practicar. Los decimales se pueden escribir con coma o punto." }) +
      `<div class="chips" id="ctypes">${CALC_TYPES.map((c, i) => `<button type="button" class="chip on" data-i="${i}" aria-pressed="true">${bi(c.label)}</button>`).join("")}</div><div id="croot"></div>`;
    const start = () => {
      const gens = [...sel].flatMap(i => CALC_TYPES[i].gens);
      runQuiz($("#croot", app), { source: () => GEN[pick(gens)]() });
    };
    $("#ctypes", app).onclick = e => {
      const b = e.target.closest("[data-i]"); if (!b) return;
      const i = +b.dataset.i;
      if (sel.has(i) && sel.size === 1) { toast("Mindestens ein Aufgabentyp muss ausgewählt sein."); return; }
      sel.has(i) ? sel.delete(i) : sel.add(i);
      b.classList.toggle("on", sel.has(i)); b.setAttribute("aria-pressed", sel.has(i));
      start();
    };
    start();
  }

  function viewMemory(app) {
    app.innerHTML = pageHead("Memory", { de: "Decke zwei Karten auf. Passen Begriff und Beschreibung zusammen, bleiben sie offen.", es: "Da la vuelta a dos cartas. Si el concepto y la descripción encajan, se quedan abiertas." }) +
      `<div class="picker">${MEMORY.map((d, i) => `<button type="button" class="pick tc-${d.topic}" data-i="${i}"><span class="tag">${esc(CH[d.topic].title.de.split(" ")[0])}</span><span class="pick-t">${esc(d.title.de)}</span><span class="pick-d">${d.pairs.length} Paare</span></button>`).join("")}</div>
      <div id="mroot"></div>`;
    $(".picker", app).onclick = e => { const b = e.target.closest("[data-i]"); if (b) { runMemory($("#mroot", app), MEMORY[+b.dataset.i]); $("#mroot", app).scrollIntoView({ block: "start", behavior: "smooth" }); } };
  }

  function runMemory(root, deck) {
    const pairs = shuffle(deck.pairs).slice(0, 8);
    const cards = shuffle(pairs.flatMap((p, k) => [{ k, side: "a", t: p.a, ic: p.ia }, { k, side: "b", t: p.b, ic: p.ib }]));
    let open = [], moves = 0, found = 0, lock = false;
    root.innerHTML = `<div class="panel tc-${deck.topic}"><div class="qz-meta"><h3>${esc(deck.title.de)}</h3><span class="status mono">Züge: 0 · Paare: 0/${pairs.length}</span></div>
      <div class="mem-grid">${cards.map((c, i) => `<button type="button" class="mem side-${c.side}" data-i="${i}" aria-label="Karte ${i + 1}" style="--i:${i}"><span class="mem-in"><span class="m-back" aria-hidden="true">${ico("cards", "md")}</span><span class="m-face">${c.ic ? ico(c.ic, "md") : ""}<span>${bi(c.t)}</span></span></span></button>`).join("")}</div>
      <div class="mem-end"></div></div>`;
    const status = () => { $(".status", root).textContent = `Züge: ${moves} · Paare: ${found}/${pairs.length}`; };
    $(".mem-grid", root).onclick = e => {
      const b = e.target.closest(".mem"); if (!b || lock || b.classList.contains("open") || b.classList.contains("done")) return;
      b.classList.add("open"); open.push(b);
      if (open.length < 2) return;
      moves++;
      const [x, y] = open.map(el => cards[+el.dataset.i]);
      if (x.k === y.k && x.side !== y.side) {
        open.forEach(el => { el.classList.remove("open"); el.classList.add("done"); });
        FX.burstAt(b, 10, .5);
        open = []; found++; status();
        if (found === pairs.length) {
          const xp = Math.max(10, 40 - (moves - pairs.length) * 2);
          addXP(xp);
          $(".mem-end", root).innerHTML = `<div class="result-score"><span class="big mono">${moves}</span><span>Züge für ${pairs.length} Paare · +${xp} kJ</span></div>
            <div class="row-actions" style="margin-top:10px"><button type="button" class="btn again">Nochmal</button></div>`;
          $(".again", root).onclick = () => runMemory(root, deck);
          FX.burstAt($(".mem-end", root), 50, 1.4);
        }
      } else {
        lock = true; status();
        open.forEach(el => el.classList.add("wrong"));
        setTimeout(() => { open.forEach(el => el.classList.remove("open", "wrong")); open = []; lock = false; }, 1100);
      }
    };
  }

  function viewSort(app) {
    app.innerHTML = pageHead("Sortieren", { de: "Ziehe jedes Kärtchen in die richtige Gruppe – oder tippe zuerst das Kärtchen und dann die Gruppe an.", es: "Arrastra cada tarjeta al grupo correcto, o toca primero la tarjeta y luego el grupo." }) +
      `<div class="picker">${SORTS.map((s, i) => `<button type="button" class="pick tc-${s.topic}" data-i="${i}"><span class="tag">${esc(CH[s.topic].title.de.split(" ")[0])}</span><span class="pick-t">${esc(s.title.de)}</span><span class="pick-d">${s.items.length} Kärtchen</span></button>`).join("")}</div>
      <div id="sroot"></div>`;
    $(".picker", app).onclick = e => { const b = e.target.closest("[data-i]"); if (b) { runSort($("#sroot", app), SORTS[+b.dataset.i]); $("#sroot", app).scrollIntoView({ block: "start", behavior: "smooth" }); } };
  }

  function runSort(root, set, opts = {}) {
    const items = shuffle(set.items.map(([label, b, pic], i) => ({ label: L(label), b, i, pic })));
    const picHTML = p => !p ? "" : p[0] === "#" ? `<span class="symb mono">${p.slice(1)}</span>` : ico(p, "sm");
    let placed = 0, errors = 0, sel = null;
    const host = root;
    host.innerHTML = `<div class="${opts.embedded ? "" : "panel"}" style="display:flex;flex-direction:column;gap:12px">
      ${opts.embedded ? "" : `<h3>${esc(set.title.de)}</h3>`}
      <div class="pool">${items.map(it => `<button type="button" class="chip sortchip" data-i="${it.i}">${picHTML(it.pic)}<span>${bi(it.label)}</span></button>`).join("")}</div>
      <div class="buckets">${set.buckets.map(b => `<div class="bucket" data-b="${b.id}" role="button" tabindex="0"><div class="bucket-h">${bi(b.label)}</div><div class="bucket-items"></div></div>`).join("")}</div>
      <p class="status mono"></p></div>`;
    root = host.firstElementChild; // fresh element per run, so listeners never stack up
    const restart = () => runSort(host, set, opts);
    const status = () => {
      const st = $(".status", root);
      if (placed === items.length) {
        FX.burstAt(st, errors === 0 ? 50 : 25, 1.2);
        st.innerHTML = `Geschafft! ${errors === 0 ? "Ohne Fehler." : `${errors} Fehlversuch${errors === 1 ? "" : "e"}.`} <button type="button" class="btn ghost again" style="margin-left:8px">Nochmal</button>`;
        $(".again", root).onclick = restart;
      } else st.textContent = `${placed}/${items.length} richtig zugeordnet · ${errors} Fehlversuche`;
    };
    const select = chip => { sel = chip && sel !== chip ? chip : null; $$(".sortchip", root).forEach(c => c.classList.toggle("on", c === sel)); };
    function place(chip, bucket) {
      const it = items.find(x => x.i === +chip.dataset.i);
      if (it.b === bucket.dataset.b) {
        chip.classList.remove("on", "sortchip"); chip.disabled = true;
        $(".bucket-items", bucket).appendChild(chip);
        placed++; addXP(5);
        chip.classList.add("landed"); FX.burstAt(chip, 8, .35);
      } else {
        errors++;
        bucket.classList.remove("shake"); void bucket.offsetWidth; bucket.classList.add("shake");
        toast(`<b>${esc(it.label.de)}</b> gehört nicht zu „${esc(plain(set.buckets.find(b => b.id === bucket.dataset.b).label))}“.`);
      }
      select(null); status();
    }
    root.addEventListener("click", e => {
      const chip = e.target.closest(".sortchip");
      if (chip && e.detail === 0) { select(chip); return; } // keyboard
      const bucket = e.target.closest(".bucket");
      if (bucket && sel) place(sel, bucket);
    });
    root.addEventListener("keydown", e => {
      const bucket = e.target.closest(".bucket");
      if (bucket && sel && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); place(sel, bucket); }
    });
    // Pointer drag (mouse + touch)
    root.addEventListener("pointerdown", e => {
      const chip = e.target.closest(".sortchip"); if (!chip || chip.disabled) return;
      const sx = e.clientX, sy = e.clientY; let ghost = null, over = null;
      chip.setPointerCapture(e.pointerId);
      const move = ev => {
        if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;
        if (!ghost) {
          const r = chip.getBoundingClientRect();
          ghost = chip.cloneNode(true); ghost.classList.add("ghost-drag"); ghost.style.width = r.width + "px";
          document.body.appendChild(ghost); chip.style.opacity = ".35";
        }
        ghost.style.left = ev.clientX - ghost.offsetWidth / 2 + "px"; ghost.style.top = ev.clientY - ghost.offsetHeight / 2 + "px";
        const t = document.elementFromPoint(ev.clientX, ev.clientY);
        const b = t && t.closest(".bucket");
        if (b !== over) { if (over) over.classList.remove("hover"); over = b && root.contains(b) ? b : null; if (over) over.classList.add("hover"); }
      };
      const up = () => {
        chip.removeEventListener("pointermove", move); chip.removeEventListener("pointerup", up); chip.removeEventListener("pointercancel", up);
        if (ghost) { ghost.remove(); chip.style.opacity = ""; if (over) { over.classList.remove("hover"); place(chip, over); } }
        else select(chip);
      };
      chip.addEventListener("pointermove", move); chip.addEventListener("pointerup", up); chip.addEventListener("pointercancel", up);
    });
    status();
  }

  function buildExam() {
    const out = [];
    Object.entries(EXAM_PLAN).forEach(([t, n]) => {
      const pool = QUESTIONS.filter(q => q.topic === t && !q.extra);
      const cl = shuffle(pool.filter(q => q.type === "cloze")).slice(0, 1);
      out.push(...cl, ...shuffle(pool.filter(q => !cl.includes(q))).slice(0, n - cl.length));
      if (t === "umsatz") out.push(GEN.gu_kcal());
      if (t === "mineral") out.push(GEN.min_portion(), GEN.min_covered());
    });
    return out;
  }

  function viewExam(app) {
    const hist = S.exams.slice(0, 5);
    app.innerHTML = pageHead("Probeprüfung", { de: `${EXAM_N} Fragen aus allen Themen, geordnet wie in einem Examen. Du siehst die Lösungen erst am Ende. Den Brief übst du unter „Brief schreiben“.`, es: `${EXAM_N} preguntas de todos los temas, ordenadas como en un examen. Verás las soluciones al final. La carta la practicas en «Brief schreiben».` }) +
      `<div class="panel">
        <label class="check"><input type="checkbox" id="ex-timer"> Mit Zeitlimit (25 Minuten)</label>
        <div><button type="button" class="btn" id="ex-start">Prüfung starten</button></div>
        ${hist.length ? `<p class="muted">Letzte Ergebnisse: ${hist.map(h => `<span class="mono">${h.pct} %</span>`).join(" · ")}</p>` : ""}
      </div><div id="eroot"></div>`;
    $("#ex-start", app).onclick = () => {
      const timer = $("#ex-timer", app).checked;
      const root = $("#eroot", app);
      $(".panel", app).hidden = true;
      runQuiz(root, {
        questions: buildExam(), mode: "exam", timerMin: timer ? 25 : 0,
        onFinish: r => {
          addXP(r.score * 10);
          S.exams.unshift({ d: Date.now(), pct: r.pct }); S.exams = S.exams.slice(0, 10); save();
          root.innerHTML = summaryHTML(r, { breakdown: true });
          celebrate(root, r.pct);
          window.scrollTo(0, 0);
        },
        onRestart: () => go("probe")
      });
    };
  }

  function viewMistakes(app) {
    const qs = mistakeQuestions();
    app.innerHTML = pageHead("Fehlerheft", { de: "Hier sammeln sich alle Fragen, die du falsch beantwortet hast. Beantwortest du eine richtig, verschwindet sie.", es: "Aquí se guardan todas las preguntas que respondiste mal. Si aciertas una, desaparece." }) +
      (qs.length
        ? `<div class="panel"><p><b class="mono">${qs.length}</b> Fragen warten auf dich.</p>
            <div class="row-actions"><button type="button" class="btn" id="fx">${qs.length > 15 ? "15 davon üben" : "Jetzt üben"}</button><button type="button" class="btn ghost" id="fclear">Fehlerheft leeren</button></div></div>
            <div id="froot"></div>`
        : `<div class="empty">${bi({ de: "Dein Fehlerheft ist leer. Falsch beantwortete Fragen aus Quiz, Rechentrainer und Probeprüfung landen automatisch hier.", es: "Tu cuaderno de errores está vacío. Las preguntas que respondas mal en quiz, cálculos y examen de prueba aparecen aquí automáticamente." })}</div>`);
    if (!qs.length) return;
    $("#fx", app).onclick = () => {
      $(".panel", app).hidden = true;
      runQuiz($("#froot", app), { questions: shuffle(qs).slice(0, 15), onRestart: () => go("fehler") });
    };
    const clr = $("#fclear", app);
    clr.onclick = () => {
      if (clr.dataset.confirm) { S.mistakes = []; save(); route(); return; }
      clr.dataset.confirm = "1"; clr.textContent = "Wirklich leeren? Nochmal tippen";
    };
  }

  /* =====================================================================
     BRIEF SCHREIBEN
     ===================================================================== */
  const wordCount = s => (s.trim().match(/\S+/g) || []).length;
  const LETTER_FORM = [
    [{ de: "Ort und Datum", es: "lugar y fecha" }, s => /\d{1,2}\.\s?\d{1,2}\./.test(s)],
    [{ de: "Anrede (Liebe … / Lieber …)", es: "saludo (Querida… / Querido…)" }, s => /^\s*(liebe|lieber|hallo|sehr geehrte)/im.test(s)],
    [{ de: "Einleitung, Hauptteil, Schluss (mindestens 3 Absätze)", es: "introducción, desarrollo, cierre (al menos 3 párrafos)" }, s => s.split(/\n\s*\n/).filter(p => p.trim().length > 20).length >= 3],
    [{ de: "Grußformel (Viele Grüße …)", es: "despedida (Un saludo…)" }, s => /gr(ü|ue)(ß|ss)e/i.test(s)],
    [{ de: "mindestens 100 Wörter", es: "al menos 100 palabras" }, s => wordCount(s) >= 100]
  ];
  const termLabel = t => Array.isArray(t) ? (t.length <= 2 ? t.join(" / ") : t[0]) : t.l;
  const termHit = (t, low) => (Array.isArray(t) ? t : t.a).some(a => low.includes(a.toLowerCase()));

  function viewBrief(app) {
    S.letters = S.letters || {};
    app.innerHTML = pageHead("Brief schreiben", { de: "Im Examen schreibst du zum Schluss einen Brief. Wähle einen Auftrag und schreibe los. Benutze möglichst viele Fachbegriffe – die Checkliste hakt sich beim Schreiben von selbst ab. Dein Text wird auf diesem Gerät gespeichert.", es: "En el examen, al final, escribes una carta. Elige un encargo y empieza a escribir. Usa todos los términos técnicos que puedas: la lista se marca sola mientras escribes. Tu texto se guarda en este dispositivo." }) +
      `<div class="picker">${LETTERS.map((l, i) => `<button type="button" class="pick tc-${l.topic}" data-i="${i}"><span class="tag">✉</span><span class="pick-t">${esc(l.title.de)}</span>
        <span class="pick-d">${S.letters[l.id] ? `${wordCount(S.letters[l.id])} Wörter geschrieben` : "noch leer"}</span></button>`).join("")}</div>
      <div id="broot"></div>`;
    $(".picker", app).onclick = e => {
      const b = e.target.closest("[data-i]"); if (!b) return;
      openLetter($("#broot", app), LETTERS[+b.dataset.i]);
      $("#broot", app).scrollIntoView({ block: "start", behavior: FX.reduced() ? "auto" : "smooth" });
    };
  }

  function openLetter(root, l) {
    S.lettersDone = S.lettersDone || {};
    root.innerHTML = `<div class="panel tc-${l.topic} brief">
      <h3>${bi(l.title)}</h3>
      <aside class="note">${bi(l.task)}</aside>
      <div class="brief-grid">
        <div class="brief-main">
          <textarea class="brief-ta" rows="16" spellcheck="true" lang="de" aria-label="Dein Brief" placeholder="Ort, Datum&#10;&#10;Liebe … / Lieber …,&#10;&#10;…&#10;&#10;Viele Grüße&#10;…"></textarea>
          <p class="status brief-wc"></p>
        </div>
        <aside class="brief-side">
          <h4>Aufbau</h4><ul class="checks brief-form"></ul>
          <h4>Fachbegriffe</h4><ul class="checks brief-terms"></ul>
        </aside>
      </div>
      <div class="row-actions"><button type="button" class="btn ghost brief-model">Musterbrief zeigen</button><button type="button" class="btn ghost brief-clear">Text löschen</button></div>
      <div class="brief-out"></div></div>`;
    const ta = $(".brief-ta", root);
    ta.value = S.letters[l.id] || "";
    let saveT;
    function upd() {
      const s = ta.value, low = s.toLowerCase();
      const form = LETTER_FORM.map(([lab, test]) => [lab, test(s)]), terms = l.terms.map(t => [termLabel(t), termHit(t, low)]);
      $(".brief-form", root).innerHTML = form.map(([lab, ok]) => `<li class="${ok ? "ok" : ""}">${bi(lab)}</li>`).join("");
      $(".brief-terms", root).innerHTML = terms.map(([lab, ok]) => `<li class="${ok ? "ok" : ""}">${esc(lab)}</li>`).join("");
      const nOk = form.filter(x => x[1]).length + terms.filter(x => x[1]).length, nAll = form.length + terms.length;
      $(".brief-wc", root).textContent = `${wordCount(s)} Wörter · ${nOk} von ${nAll} Punkten erfüllt`;
      if (nOk === nAll && !S.lettersDone[l.id]) {
        S.lettersDone[l.id] = true; save();
        FX.burstAt($(".brief-wc", root), 50, 1.3); addXP(30);
        toast(`<b>Super Brief!</b> Alle Punkte erfüllt.`);
      }
    }
    ta.addEventListener("input", () => {
      upd(); clearTimeout(saveT);
      saveT = setTimeout(() => { S.letters[l.id] = ta.value; save(); }, 400);
    });
    $(".brief-model", root).onclick = e => {
      const out = $(".brief-out", root), open = !out.innerHTML;
      out.innerHTML = open ? `<div class="example"><h4>${bi({ de: "Musterbrief", es: "Carta modelo" })}</h4><div class="letter">${bi(l.model)}</div></div>` : "";
      e.currentTarget.textContent = open ? "Musterbrief verstecken" : "Musterbrief zeigen";
    };
    const clr = $(".brief-clear", root);
    clr.onclick = () => {
      if (!clr.dataset.confirm) { clr.dataset.confirm = "1"; clr.textContent = "Wirklich löschen? Nochmal tippen"; return; }
      ta.value = ""; S.letters[l.id] = ""; save(); delete clr.dataset.confirm; clr.textContent = "Text löschen"; upd();
    };
    upd();
  }

  /* ---------- Boot ---------- */
  renderTop();
  route();
})();
