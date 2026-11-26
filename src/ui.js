/* ============================================================
   UI: rendering, VFX, ocean, turn flow, menus
   ============================================================ */
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- story formatting ---------- */
function formatNarration(text) {
  const blocks = text.replace(/\r/g, "").split(/\n\s*\n|\n(?=[A-Z][\w .'\-]{0,40}:\s*["“])/);
  return blocks.map((b) => {
    b = b.trim(); if (!b) return "";
    const m = b.match(/^([A-Z][\w .'\-]{0,40}):\s*(["“][\s\S]*)$/);
    const inline = (s) => esc(s).replace(/\*([^*\n]{1,60})\*/g, "<em>$1</em>").replace(/\n/g, "<br>");
    if (m) return `<span class="line"><strong>${esc(m[1])}</strong>${inline(m[2])}</span>`;
    return `<p>${inline(b)}</p>`;
  }).join("");
}

/* ---------- log ---------- */
const logEl = $("#log");
function logNode(entry) {
  const el = document.createElement("div");
  el.className = "entry";
  if (entry.t === "you") { el.classList.add("you"); const b = document.createElement("div"); b.textContent = entry.text; el.append(b); }
  else if (entry.t === "gm") { el.classList.add("gm"); el.innerHTML = formatNarration(entry.text) + chipsHTML(entry.chips); }
  else { el.classList.add("sys"); if (entry.kind === "event") el.classList.add("event"); el.innerHTML = `<b>${esc(entry.label || "News")}</b>${esc(entry.text)}`; }
  return el;
}
function chipsHTML(chips) {
  if (!chips || !chips.length) return "";
  return `<div class="deltas">${chips.slice(0, 14).map((c) => `<span class="chip ${esc(c.cls)}">${esc(c.text)}</span>`).join("")}</div>`;
}
function pushLog(entry) {
  S.log.push(entry); if (S.log.length > 400) S.log.splice(0, S.log.length - 400);
  const el = logNode(entry); logEl.append(el); scrollDown(); return el;
}
function renderLog() { logEl.innerHTML = ""; for (const e of S.log.slice(-120)) logEl.append(logNode(e)); scrollDown(true); }
function scrollDown(instant) { requestAnimationFrame(() => logEl.scrollTo({ top: logEl.scrollHeight, behavior: instant || reduceMotion ? "auto" : "smooth" })); }

/* ---------- typewriter ---------- */
const tw = { target: "", shown: 0, el: null, raf: 0 };
function twStart(el) { tw.el = el; tw.target = ""; tw.shown = 0; }
function twSet(text) { tw.target = text; if (!tw.raf) tw.raf = requestAnimationFrame(twTick); }
function twTick() {
  const diff = tw.target.length - tw.shown;
  if (diff > 0 && tw.el) {
    tw.shown += reduceMotion ? diff : Math.max(1, Math.ceil(diff / settings.speed));
    tw.el.innerHTML = formatNarration(tw.target.slice(0, tw.shown));
    const nearBottom = logEl.scrollHeight - logEl.scrollTop - logEl.clientHeight < 160;
    if (nearBottom) logEl.scrollTop = logEl.scrollHeight;
    tw.raf = requestAnimationFrame(twTick);
  } else tw.raf = 0;
}
function twFlush() { return new Promise((res) => { const check = () => (tw.shown >= tw.target.length ? res() : setTimeout(check, 60)); check(); }); }

/* ---------- HUD ---------- */
function renderHUD() {
  const p = S.player;
  $("#hpFill").style.width = (100 * p.hp / p.max_hp) + "%";
  $("#hudBounty").textContent = fmt(p.bounty);
  $("#hudDay").textContent = `${S.day} · ${String(Math.floor(S.hour)).padStart(2, "0")}:00`;
  const isl = byId(S.islands, S.location);
  $("#hudLoc").textContent = isl ? isl.name.split(" (")[0] : S.location;
  $("#hudWeather").textContent = S.weather;
  Sea.setWeather(S.weather);
}
function renderSuggestions() {
  const box = $("#suggest"); box.innerHTML = "";
  for (const s of S.suggestions || []) {
    const b = document.createElement("button"); b.type = "button"; b.textContent = s;
    b.onclick = () => { $("#action").value = s; $("#action").focus(); };
    box.append(b);
  }
}

/* ---------- side panel ---------- */
const TABS = [["status", "Status"], ["crew", "Crew"], ["map", "Map"], ["factions", "Factions"], ["people", "People"], ["fruits", "Fruits"], ["world", "World"], ["chron", "Chronicle"]];
let tab = store.get("tsl_tab") || "status";
function renderTabs() {
  const t = $("#tabs"); t.innerHTML = "";
  for (const [id, label] of TABS) {
    const b = document.createElement("button"); b.type = "button"; b.role = "tab"; b.textContent = label; b.setAttribute("aria-selected", id === tab);
    b.onclick = () => { tab = id; store.set("tsl_tab", id); renderTabs(); renderPanel(); };
    t.append(b);
  }
}
const meter = (label, v, cls = "") => `<div class="meter ${cls}">${esc(label)} <b style="float:right">${v}</b><div class="bar"><i style="width:${clamp(v, 0, 100)}%"></i></div></div>`;
const dispTag = (v) => `<span class="disp ${v > 15 ? "pos" : v < -15 ? "neg" : "neu"}">${v > 0 ? "+" : ""}${v}</span>`;
function renderPanel() {
  if (!S) return;
  const P = $("#panel"); const p = S.player; let h = "";
  if (tab === "status") {
    const f = p.fruit ? byId(S.fruits, p.fruit) : null;
    h += `<h3>${esc(p.name)}${p.epithet ? ` "${esc(p.epithet)}"` : ""}</h3><dl class="kv">
      <dt>HP</dt><dd>${p.hp} / ${p.max_hp}</dd><dt>Bounty</dt><dd>${fmt(p.bounty)}</dd><dt>Berries</dt><dd>${fmt(p.berries)}</dd>
      <dt>Style</dt><dd>${esc(p.style)}</dd><dt>Origin</dt><dd>${esc(p.origin)}</dd><dt>Ship</dt><dd>${esc(p.ship)}</dd></dl>
      <h3>Haki</h3>${meter("Observation", p.observation, "haki")}${meter("Armament", p.armament, "haki")}
      <div class="meter">Conqueror's <b style="float:right">${p.conqueror ? "AWAKENED" : "dormant"}</b></div>
      <h3>Devil Fruit</h3>${f ? `<div class="card"><div class="t">${esc(f.name)}</div><div class="s">${esc(f.eng)} · ${esc(f.type)}</div>${esc(f.power)}<div class="s" style="margin-top:4px">Limit: ${esc(f.limit)}</div></div>${meter("Mastery", p.mastery)}` : `<p class="empty">No fruit. You can still swim.</p>`}
      <h3>Inventory</h3>${p.items.length ? `<ul class="list">${p.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : `<p class="empty">Empty pockets.</p>`}
      <h3>Dream</h3><p style="font-size:13px;line-height:1.5">${esc(p.dream)}</p>`;
  } else if (tab === "crew") {
    h += `<h3>Crew</h3>` + (p.crew.length ? p.crew.map((m) => { const n = m.npc_id ? byId(S.npcs, m.npc_id) : null; return `<div class="card"><div class="t">${esc(m.name)}</div><div class="s">${esc(m.role)}</div>${n ? esc(n.desc) : ""}</div>`; }).join("") : `<p class="empty">You sail alone for now. Recruit people by earning their trust.</p>`);
    h += `<h3>Ship</h3><p style="font-size:13px">${esc(p.ship)}</p>`;
  } else if (tab === "map") {
    h += `<h3>Chart of the Sundered Seas</h3><div id="mapWrap">${mapSVG()}</div><h3>Known islands</h3>`;
    h += S.islands.filter((i) => i.known).map((i) => `<div class="card"><div class="t">${esc(i.name)}${i.id === S.location ? " · YOU ARE HERE" : ""}</div><div class="s">${esc(i.sea)} · held by ${esc(factionName(i.controller))}</div>${esc(i.status)}</div>`).join("");
  } else if (tab === "factions") {
    h += `<h3>Powers of the sea</h3>` + S.factions.map((f) => `<div class="card"><div class="t">${esc(f.name)} ${dispTag(f.attitude)}</div><div class="s">${esc(f.kind)}</div>${esc(f.desc)}${meter("Power", f.power)}</div>`).join("");
  } else if (tab === "people") {
    const known = S.npcs.filter((n) => n.known);
    h += `<h3>People you know of (${known.length})</h3>` + known.map((n) => {
      const isl = byId(S.islands, n.location);
      return `<div class="card"><div class="t">${esc(n.name)} ${dispTag(n.disposition)}</div><div class="s">${n.epithet ? `"${esc(n.epithet)}" · ` : ""}${esc(n.role)}${n.bounty ? " · " + fmt(n.bounty) : ""}</div><div class="s">${esc(n.status)} · last seen ${esc(isl && isl.known ? isl.name.split(" (")[0] : "unknown")}</div>${esc(n.desc)}${n.revealed ? `<div class="secret">Secret: ${esc(n.secret)}</div>` : ""}${(n.notes || []).length ? `<div class="s" style="margin-top:4px">${esc(n.notes[n.notes.length - 1])}</div>` : ""}</div>`;
    }).join("");
  } else if (tab === "fruits") {
    const known = S.fruits.filter((f) => f.known);
    h += `<h3>Devil Fruit encyclopedia (${known.length} / ${S.fruits.length})</h3>` + known.map((f) => {
      const holder = f.holder === "player" ? "You" : f.holder === "none" ? "Unclaimed" : (byId(S.npcs, f.holder)?.name || f.holder);
      return `<div class="card"><div class="t">${esc(f.name)}</div><div class="s">${esc(f.eng)} · ${esc(f.type)} · ${esc(holder)}</div>${esc(f.power)}</div>`;
    }).join("") + `<p class="empty">${S.fruits.length - known.length} fruits still undiscovered.</p>`;
  } else if (tab === "world") {
    const active = S.threads.filter((t) => t.stage > 0 || t.id === "dream" || t.id === "saltcradle");
    h += `<h3>Story threads</h3>` + active.map((t) => `<div class="card"><div class="t">${esc(t.name)}</div><div class="s">${esc(t.stages[t.stage])}</div><div class="stage">${t.stages.map((_, i) => `<i class="${i <= t.stage ? "on" : ""}"></i>`).join("")}</div></div>`).join("");
    const cal = S.events.filter((e) => e.public && e.status === "pending").sort((a, b) => a.day - b.day);
    h += `<h3>Calendar of the sea</h3>` + (cal.length ? cal.map((e) => `<div class="card"><div class="t">Day ${e.day}: ${esc(e.title)}</div>${esc(e.desc)}</div>`).join("") : `<p class="empty">Nothing announced.</p>`);
    const past = S.events.filter((e) => e.status !== "pending").slice(-8).reverse();
    if (past.length) h += `<h3>What already happened</h3>` + past.map((e) => `<div class="card"><div class="t">${e.status === "cancelled" ? "Averted" : "Day " + (e.firedDay || e.day)}: ${esc(e.title)}</div></div>`).join("");
    h += `<h3>News &amp; rumors</h3>` + (S.news.length ? `<ul class="list">${S.news.slice(-10).reverse().map((n) => `<li>D${n.day}: ${esc(n.text)}</li>`).join("")}</ul>` : `<p class="empty">No news yet.</p>`);
  } else if (tab === "chron") {
    h += `<h3>Chronicle</h3>` + (S.chronicle.length ? `<ul class="list">${S.chronicle.slice().reverse().map((c) => `<li>${c.imp >= 3 ? "★ " : ""}D${c.day}: ${esc(c.text)}</li>`).join("")}</ul>` : `<p class="empty">Your legend starts with your first action.</p>`);
  }
  P.innerHTML = h;
}
function mapSVG() {
  const isl = S.islands.filter((i) => i.known);
  const seaLabels = [["EAST BLUE", 800, 560], ["NORTH BLUE", 250, 60], ["SOUTH BLUE", 250, 570], ["WEST BLUE", 800, 60], ["PARADISE", 760, 205], ["NEW WORLD", 260, 205]];
  return `<svg viewBox="0 0 1000 600" role="img" aria-label="Map of known islands">
    <rect width="1000" height="600" fill="#0a1a27"/>
    <rect x="0" y="240" width="1000" height="120" fill="#123247" opacity=".7"/>
    <rect x="488" y="0" width="24" height="600" fill="#7a2a24"/>
    <rect x="976" y="0" width="24" height="600" fill="#7a2a24"/>
    <rect x="976" y="282" width="24" height="36" fill="#0a1a27"/>
    <rect x="0" y="0" width="12" height="600" fill="#7a2a24" opacity=".6"/>
    ${seaLabels.map(([t, x, y]) => `<text x="${x}" y="${y}" fill="#47c2b1" opacity=".45" font-size="18" text-anchor="middle" font-family="sans-serif" letter-spacing="4">${t}</text>`).join("")}
    <text x="500" y="230" fill="#e0564f" font-size="14" text-anchor="middle" font-family="sans-serif" transform="rotate(-90 500 230)">RED LINE</text>
    ${isl.map((i) => {
      const here = i.id === S.location;
      return `<g><circle cx="${i.x}" cy="${i.y}" r="${here ? 11 : 7}" fill="${here ? "#e6a93d" : i.visited ? "#47c2b1" : "#9fb3ba"}" stroke="#07121d" stroke-width="2"/>
      ${here ? `<circle cx="${i.x}" cy="${i.y}" r="18" fill="none" stroke="#e6a93d" stroke-width="2"><animate attributeName="r" values="12;24;12" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2.4s" repeatCount="indefinite"/></circle>` : ""}
      <text x="${i.x}" y="${i.y - 15}" fill="#ebe5d2" font-size="17" text-anchor="middle" font-family="sans-serif" paint-order="stroke" stroke="#07121d" stroke-width="4">${esc(i.name.split(" (")[0])}</text></g>`;
    }).join("")}
  </svg>`;
}
function renderAll() { renderHUD(); renderSuggestions(); renderTabs(); renderPanel(); }

/* ---------- VFX ---------- */
const fx = $("#fx");
function vfxOn() { return settings.vfx !== "off"; }
function addFx(cls, ms, html = "", style = "") { const el = document.createElement("div"); el.className = cls; if (style) el.style.cssText = style; el.innerHTML = html; fx.append(el); setTimeout(() => el.remove(), ms); return el; }
function shake() { const a = $("#app"); a.classList.remove("shake"); void a.offsetWidth; a.classList.add("shake"); }
function sfx(text) { addFx("fx-sfx", 1400, "", `left:${10 + Math.random() * 45}%;top:${18 + Math.random() * 35}%`).textContent = text; }
function hakiBolts() {
  const w = innerWidth, h = innerHeight; let paths = "";
  for (let k = 0; k < 5; k++) {
    let x = Math.random() * w, y = 0, d = `M${x} ${y}`;
    while (y < h) { x += (Math.random() - .5) * 120; y += 30 + Math.random() * 60; d += ` L${x.toFixed(0)} ${y.toFixed(0)}`; }
    paths += `<path d="${d}" stroke="#000" stroke-width="9" fill="none"/><path d="${d}" stroke="#e0564f" stroke-width="3" fill="none"/><path d="${d}" stroke="#9b5cff" stroke-width="1" fill="none"/>`;
  }
  addFx("fx-haki", 950, `<svg width="100%" height="100%" viewBox="0 0 ${w} ${h}">${paths}</svg>`);
}
function sparkles() { for (let i = 0; i < 14; i++) addFx("fx-sparkle", 1500, "", `left:${Math.random() * 100}%;top:${20 + Math.random() * 60}%;animation-delay:${Math.random() * .5}s`); }
function playVFX(list) {
  if (!vfxOn() || !Array.isArray(list)) return;
  fx.classList.toggle("fx-quiet", settings.vfx === "quiet");
  list.slice(0, 3).forEach((v, i) => setTimeout(() => {
    v = String(v);
    if (v.startsWith("sfx:")) return sfx(v.slice(4).slice(0, 8));
    switch (v) {
      case "shake": shake(); break;
      case "impact": addFx("fx-flash", 520); shake(); sfx(SFX_DEFAULT.impact); break;
      case "speedlines": addFx("fx-speed", 1150); break;
      case "flash": addFx("fx-flash", 520); break;
      case "haki": hakiBolts(); shake(); break;
      case "fruit": addFx("fx-swirl", 1650); break;
      case "sparkle": sparkles(); break;
      case "gloom": addFx("fx-gloom", 2300); break;
    }
  }, i * 380));
}
function titleCard(isl) {
  if (!vfxOn()) return;
  addFx("fx-card", 2900, `<div><small>${esc(isl.sea)}</small><strong>${esc(isl.name.split(" (")[0])}</strong></div>`);
}
function bountyPoster() {
  if (!vfxOn()) return;
  const p = S.player;
  addFx("fx-poster", 3700, `<div class="w">WANTED</div><div class="face">☠</div><div class="d">DEAD OR ALIVE</div><div class="n">${esc(p.name)}${p.epithet ? `<br><small>"${esc(p.epithet)}"</small>` : ""}</div><div class="b">${fmt(p.bounty)}</div>`);
}

/* ---------- ocean canvas ---------- */
const Sea = (() => {
  const cv = $("#sea"), cx = cv.getContext("2d");
  let W = 0, H = 0, t = 0, weather = "clear", parts = [];
  const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
  addEventListener("resize", resize); resize();
  const palette = { clear: ["#0b1d2c", "#07121d"], night: ["#060d18", "#03070d"], rain: ["#0d1a24", "#060e15"], storm: ["#12141f", "#05070b"], fog: ["#1a2a33", "#0b141a"], embers: ["#24130f", "#0b0707"], snow: ["#17283a", "#0a121b"] };
  function spawn() {
    parts = [];
    const n = { rain: 120, storm: 200, snow: 80, embers: 60, fog: 0, clear: 30, night: 50 }[weather] ?? 30;
    for (let i = 0; i < n; i++) parts.push({ x: Math.random() * W, y: Math.random() * H, v: Math.random(), s: Math.random() });
  }
  function frame() {
    t += 1;
    const [a, b] = palette[weather] || palette.clear;
    const g = cx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, a); g.addColorStop(1, b);
    cx.fillStyle = g; cx.fillRect(0, 0, W, H);
    // waves
    for (let k = 0; k < 6; k++) {
      const y0 = H * (0.55 + k * 0.08);
      cx.beginPath(); cx.moveTo(0, H);
      for (let x = 0; x <= W; x += 24) cx.lineTo(x, y0 + Math.sin(x * 0.006 + t * 0.012 * (1 + k * 0.3) + k) * (10 + k * 4) * (weather === "storm" ? 2 : 1));
      cx.lineTo(W, H); cx.closePath();
      cx.fillStyle = `rgba(71,194,177,${0.025 + k * 0.012})`; cx.fill();
    }
    // particles
    for (const p of parts) {
      if (weather === "rain" || weather === "storm") {
        p.y += 9 + p.v * 8; p.x -= weather === "storm" ? 4 : 1.5;
        cx.strokeStyle = "rgba(180,210,230,.28)"; cx.lineWidth = 1; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(p.x + 3, p.y - 12); cx.stroke();
      } else if (weather === "snow") {
        p.y += 0.6 + p.v; p.x += Math.sin(t * 0.02 + p.s * 9) * 0.5;
        cx.fillStyle = "rgba(235,240,245,.6)"; cx.fillRect(p.x, p.y, 2 + p.s * 2, 2 + p.s * 2);
      } else if (weather === "embers") {
        p.y -= 0.6 + p.v; p.x += Math.sin(t * 0.03 + p.s * 9) * 0.6;
        cx.fillStyle = `rgba(230,${120 + p.s * 80},61,${0.4 + p.v * 0.4})`; cx.fillRect(p.x, p.y, 2, 2);
      } else {
        const tw = 0.3 + 0.5 * Math.abs(Math.sin(t * 0.01 + p.s * 20));
        cx.fillStyle = `rgba(235,229,210,${tw * 0.5})`; cx.fillRect(p.x, p.y * 0.5, 1.5, 1.5);
      }
      if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W + 60; }
      if (p.y < -20) { p.y = H + 10; p.x = Math.random() * W; }
    }
    if (weather === "fog") { cx.fillStyle = "rgba(200,215,220,.08)"; for (let k = 0; k < 3; k++) cx.fillRect(0, H * 0.3 + Math.sin(t * 0.004 + k) * 40 + k * 90, W, 120); }
    if (weather === "storm" && Math.random() < 0.004 && vfxOn() && settings.vfx === "full") { cx.fillStyle = "rgba(255,255,255,.25)"; cx.fillRect(0, 0, W, H); }
    if (!reduceMotion) requestAnimationFrame(frame);
  }
  spawn(); frame();
  return { setWeather(w) { if (w !== weather) { weather = w; spawn(); if (reduceMotion) frame(); } } };
})();

/* ---------- turn flow ---------- */
const ERR = {
  not_granted: "The Game Master needs permission to use Claude. Allow it when asked, then try again.",
  sampling_disabled: "Claude isn't available for this account, so the Game Master can't speak here.",
  rate_limited: "The Game Master is catching its breath (usage or rate limit). Wait a bit and try again.",
  refused: "The sea refuses to answer that one. Try phrasing your action differently.",
  session_expired: "Your Claude session expired. Sign in again and retry.",
  prompt_too_large: "The voyage memory got too large. Try again; minor memories will be trimmed.",
  bad_key: "That API key was rejected. Check it in Settings.",
  no_engine: "No Game Master connected. Open this game on claude.ai, or add an API key in Settings.",
  empty_completion: "The Game Master went quiet. Try again.",
  upstream_error: "The connection to the Game Master dropped. Try again."
};
function setBusy(b) {
  busy = b; $("#sendBtn").disabled = b; $("#stopBtn").hidden = !b; $("#action").disabled = b;
  $("#hint").textContent = b ? "The Game Master is writing…" : "Enter to act, Shift+Enter for a new line. Your words change the world.";
}
async function takeTurn(action) {
  if (busy || !S) return;
  if (!Engine.ready()) { openSettings(); return; }
  setBusy(true);
  if (action !== "[BEGIN]") pushLog({ t: "you", text: action });
  saveGame();
  const gmEl = document.createElement("div"); gmEl.className = "entry gm";
  gmEl.innerHTML = `<div class="thinking"><i></i><i></i><i></i> The Game Master is reading the tides…</div>`;
  logEl.append(gmEl); scrollDown();
  ctl = new AbortController();
  let started = false;
  twStart(gmEl);
  let raw = "";
  try {
    raw = await Engine.run(buildPrompt(action), (text) => {
      if (!started) { started = true; gmEl.innerHTML = ""; gmEl.classList.add("streaming"); }
      twSet(liveNarration(text));
    }, ctl.signal);
  } catch (e) {
    gmEl.remove(); tw.el = null;
    // drop the unanswered player bubble so the same action can be retried
    if (action !== "[BEGIN]" && S.log[S.log.length - 1]?.t === "you") S.log.pop();
    if (e?.code !== "cancelled") pushLog({ t: "sys", label: "Game Master", text: ERR[e?.code] || ERR.upstream_error });
    renderLog(); setBusy(false);
    if (action !== "[BEGIN]") $("#action").value = action; else showRetryBegin();
    return;
  }
  const { narr, json } = splitReply(raw);
  twSet(narr); await twFlush();
  gmEl.classList.remove("streaming");
  const out = processGM(json, action === "[BEGIN]" ? "(opening scene)" : action, narr);
  if (!json) out.chips.push({ text: "World state unchanged this turn (the GM's ledger blurred)", cls: "down" });
  const entry = { t: "gm", text: narr, chips: out.chips };
  S.log.push(entry);
  gmEl.innerHTML = formatNarration(narr) + chipsHTML(out.chips);
  // effects
  playVFX(json?.vfx);
  if (out.fruitEaten && !(json?.vfx || []).includes("fruit")) setTimeout(() => playVFX(["fruit"]), 600);
  if (out.moved) setTimeout(() => titleCard(out.moved), 300);
  if (out.bountyUp > 0) setTimeout(bountyPoster, 900);
  for (const ev of out.events) pushLog({ t: "sys", kind: "event", label: `Day ${S.day} · World event`, text: `${ev.title}. ${ev.desc}` });
  if (out.rumor) pushLog({ t: "sys", label: "Rumor on the wind", text: out.rumor });
  if (S.player.hp <= 0) pushLog({ t: "sys", kind: "event", label: "Defeated", text: "You've been knocked out. Describe what you try when you come to." });
  saveGame(); renderAll(); setBusy(false); scrollDown();
  if (!matchMedia("(max-width: 860px)").matches) $("#action").focus();
}
function showRetryBegin() {
  const el = document.createElement("div"); el.className = "entry";
  const b = document.createElement("button"); b.className = "btn"; b.type = "button"; b.textContent = "BEGIN THE VOYAGE";
  b.onclick = () => { el.remove(); takeTurn("[BEGIN]"); };
  el.append(b); logEl.append(el);
}

/* ---------- forms & menus ---------- */
function show(id) { $("#" + id).hidden = false; }
function hide(id) { $("#" + id).hidden = true; }
document.addEventListener("click", (e) => { const c = e.target.closest("[data-close]"); if (c) hide(c.dataset.close); });

$("#composer").addEventListener("submit", (e) => { e.preventDefault(); const v = $("#action").value.trim(); if (!v) return; $("#action").value = ""; takeTurn(v.slice(0, 1500)); });
$("#action").addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); $("#composer").requestSubmit(); } });
$("#stopBtn").onclick = () => ctl?.abort();
$("#drawerBtn").onclick = () => $("#side").classList.toggle("open");
$("#log").addEventListener("click", () => $("#side").classList.remove("open"));

// character creation
let pickedFruit = null;
function buildCreate() {
  $("#cOrigin").innerHTML = ORIGINS.map((o) => `<option value="${o.id}">${esc(o.label)}</option>`).join("");
  $("#cStyle").innerHTML = STYLES.map((s) => `<option>${esc(s)}</option>`).join("");
  const starters = WORLD_SEED.fruits.filter((f) => f.starter);
  const box = $("#fruitPicks"); box.innerHTML = "";
  const opts = [{ id: null, name: "No fruit", eng: "Keep the sea as your friend", power: "You can swim. Haki and your fighting style grow a little faster.", type: "" }, ...starters];
  for (const f of opts) {
    const b = document.createElement("button"); b.type = "button"; b.className = "fruitpick"; b.setAttribute("aria-pressed", f.id === pickedFruit);
    b.innerHTML = `<b>${esc(f.name)}</b><small>${esc(f.eng)}${f.type ? " · " + esc(f.type) : ""}</small><br>${esc(f.power)}`;
    b.onclick = () => { pickedFruit = f.id; buildCreate(); };
    box.append(b);
  }
}
$("#newBtn").onclick = () => { buildCreate(); show("create"); };
$("#createForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const origin = ORIGINS.find((o) => o.id === $("#cOrigin").value);
  S = newGame({ slot: +$("#cSlot").value, name: $("#cName").value.trim() || "Nameless", origin: origin.label + ". " + origin.text, style: $("#cStyle").value,
    dream: $("#cDream").value.trim() || "Be free.", look: $("#cLook").value.trim(), fruit: pickedFruit });
  S.threads.find((t) => t.id === "dream").name = "Dream: " + S.player.dream.slice(0, 60);
  hide("create"); hide("title");
  renderLog(); renderAll(); saveGame();
  takeTurn("[BEGIN]");
});

// continue
function buildSlots() {
  const list = $("#slotList"); list.innerHTML = "";
  for (const n of [1, 2, 3]) {
    const s = loadSlot(n);
    const row = document.createElement("div"); row.className = "slot";
    if (s) {
      const isl = s.islands?.find((i) => i.id === s.location);
      row.innerHTML = `<div><b>Slot ${n}: ${esc(s.player?.name)}</b><small>Day ${s.day} · ${esc(isl?.name.split(" (")[0] || s.location)} · ${fmt(s.player?.bounty || 0)} · ${s.turn} turns</small></div>`;
      const go = document.createElement("button"); go.className = "btn"; go.type = "button"; go.textContent = "SAIL";
      go.onclick = () => startFrom(s);
      const del = document.createElement("button"); del.className = "btn ghost"; del.type = "button"; del.textContent = "Delete";
      del.onclick = () => { if (del.dataset.armed) { store.del(slotKey(n)); buildSlots(); } else { del.dataset.armed = "1"; del.textContent = "Tap again to delete"; } };
      const wrap = document.createElement("div"); wrap.style.cssText = "display:flex;gap:8px"; wrap.append(del, go); row.append(wrap);
    } else row.innerHTML = `<div><b>Slot ${n}</b><small>Empty</small></div>`;
    list.append(row);
  }
}
function startFrom(s) {
  S = s; hide("slots"); hide("title"); renderLog(); renderAll();
  if (!S.log.some((e) => e.t === "gm")) showRetryBegin();
}
$("#contBtn").onclick = () => { buildSlots(); $("#importMsg").textContent = ""; show("slots"); };
$("#importBtn").onclick = () => {
  try {
    const s = decodeSave($("#importCode").value);
    if (!s.player || !s.npcs) throw 0;
    s.slot = s.slot || 1; startFrom(s); saveGame();
  } catch { $("#importMsg").textContent = "That save code couldn't be read. Make sure you pasted the whole thing."; }
};

// settings
function engineText() {
  if (Engine.mode === "detecting") return "Looking for the Game Master…";
  if (Engine.mode === "sample") return "Game Master: <b>connected through your Claude account</b>.";
  if (store.get("tsl_apikey")) return "Game Master: <b>connected with your API key</b>.";
  return `<b class="warn">No Game Master yet.</b> Open this game on claude.ai, or add an Anthropic API key in Game Master settings.`;
}
function openSettings() {
  $("#setEngine").innerHTML = engineText();
  $("#setSample").hidden = Engine.mode !== "sample";
  $("#setApi").hidden = Engine.mode === "sample";
  $("#tier").value = settings.tier; $("#speed").value = String(settings.speed); $("#vfxLevel").value = settings.vfx; $("#apiModel").value = settings.apiModel;
  $("#apiKey").value = store.get("tsl_apikey") || "";
  show("settings");
}
$("#setBtn").onclick = openSettings;
$("#menuSettings").onclick = () => { hide("menu"); openSettings(); };
$("#saveSettings").onclick = () => {
  settings.tier = $("#tier").value; settings.speed = +$("#speed").value; settings.vfx = $("#vfxLevel").value; settings.apiModel = $("#apiModel").value;
  saveSettingsLocal();
  const k = $("#apiKey").value.trim();
  if (Engine.mode !== "sample") { if (k) { store.set("tsl_apikey", k); Engine.mode = "api"; } else { store.del("tsl_apikey"); Engine.mode = "none"; } }
  $("#engineStatus").innerHTML = engineText();
  hide("settings");
};

// in-game menu
$("#menuBtn").onclick = () => {
  if (!S) return;
  $("#menuInfo").textContent = `${S.player.name} · Day ${S.day} · ${S.turn} turns · saved in slot ${S.slot}`;
  $("#exportCode").value = encodeSave(S);
  show("menu");
};
$("#copyCode").onclick = async () => {
  const ta = $("#exportCode");
  try { await navigator.clipboard.writeText(ta.value); $("#copyCode").textContent = "Copied"; }
  catch { ta.focus(); ta.select(); $("#copyCode").textContent = "Selected: press Ctrl/Cmd+C"; }
  setTimeout(() => ($("#copyCode").textContent = "Copy save code"), 2200);
};
$("#toTitle").onclick = () => { saveGame(); hide("menu"); show("title"); };

/* ---------- boot ---------- */
(async function boot() {
  $("#engineStatus").innerHTML = engineText();
  await Engine.detect();
  $("#engineStatus").innerHTML = engineText();
})();
