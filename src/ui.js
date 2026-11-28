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
  const tier = hereTier();
  $("#hudThreat").textContent = "★".repeat(tier) + "☆".repeat(5 - tier);
  $("#hudThreat").title = TIER_TEXT[tier];
  $("#combatBadge").hidden = !S.combat;
  Sea.setWeather(S.weather);
}
function renderFxBtn() {
  const any = Object.values(settings.fx).some(Boolean);
  $("#fxBtn").textContent = any ? "FX on" : "FX off";
  $("#fxBtn").setAttribute("aria-pressed", any);
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
    h += statusHTML();
  } else if (tab === "crew") {
    h += `<h3>Crew</h3>` + (p.crew.length ? p.crew.map((m) => { const n = m.npc_id ? byId(S.npcs, m.npc_id) : null; return `<div class="card"><div class="t">${esc(m.name)}</div><div class="s">${esc(m.role)}</div>${n ? esc(n.desc) : ""}</div>`; }).join("") : `<p class="empty">You sail alone for now. Recruit people by earning their trust.</p>`);
    h += `<h3>Ship</h3><p style="font-size:13px">${esc(p.ship)}</p>`;
  } else if (tab === "map") {
    h += mapPanelHTML();
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
      return `<div class="card"><div class="t">${esc(f.name)} <span class="tag ${f.canon ? "canon" : "orig"}">${f.canon ? "Known fruit" : "Original"}</span></div><div class="s">${esc(f.eng)} · ${esc(f.type)} · ${esc(holder)}</div>${esc(f.power)}</div>`;
    }).join("") + `<p class="empty">${S.fruits.length - known.length} fruits still undiscovered.</p>`;
  } else if (tab === "world") {
    const cal = S.events.filter((e) => e.public && e.status === "pending").sort((a, b) => a.day - b.day);
    h += `<h3>Posted notices</h3>` + (cal.length ? cal.map((e) => `<div class="card"><div class="t">Day ${e.day}: ${esc(e.title)}</div>${esc(e.desc)}</div>`).join("") : `<p class="empty">Nothing announced.</p>`);
    const past = S.events.filter((e) => e.status !== "pending").slice(-8).reverse();
    if (past.length) h += `<h3>What already happened</h3>` + past.map((e) => `<div class="card"><div class="t">${e.status === "cancelled" ? "Averted" : "Day " + (e.firedDay || e.day)}: ${esc(e.title)}</div></div>`).join("");
    h += `<h3>News &amp; rumors</h3>` + (S.news.length ? `<ul class="list">${S.news.slice(-10).reverse().map((n) => `<li>D${n.day}: ${esc(n.text)}</li>`).join("")}</ul>` : `<p class="empty">No news yet.</p>`);
  } else if (tab === "chron") {
    h += `<h3>Chronicle</h3>` + (S.chronicle.length ? `<ul class="list">${S.chronicle.slice().reverse().map((c) => `<li>${c.imp >= 3 ? "★ " : ""}D${c.day}: ${esc(c.text)}</li>`).join("")}</ul>` : `<p class="empty">Your legend starts with your first action.</p>`);
  }
  P.innerHTML = h;
}
/* ---------- skill webs: fruit mastery and Haki ---------- */
let nodeOpen = null;
function chainHTML(key, nodes, value, color) {
  const next = nodes.find((n) => value < n.at);
  return `<div class="web" style="--wc:${color}">${nodes.map((n, i) => {
    const on = value >= n.at, isNext = n === next, id = `${key}:${n.at}`, open = nodeOpen === id;
    return `<button type="button" class="wnode ${on ? "on" : ""} ${isNext ? "next" : ""} ${i % 2 ? "r" : "l"}" data-node="${id}" aria-expanded="${open}">
      <span class="dot">${n.at}</span><span class="wtxt"><b>${esc(n.name)}</b>${isNext ? `<small>Unlocks at ${n.at}</small>` : ""}${open ? `<small class="wdesc">${esc(n.desc)}</small>` : ""}</span></button>`;
  }).join("")}</div>`;
}
function fruitWebHTML() {
  const p = S.player, f = byId(S.fruits, p.fruit), sc = scaleFor(p.mastery);
  return `<div class="scalecard"><small>Fruit scale</small><b>${esc(sc.name)}</b><span>${esc(sc.desc)}</span></div>
    <h4 class="webtitle">Mastery web</h4>${chainHTML("fruit", webFor(p.fruit), p.mastery, f?.color || "#e6a93d")}`;
}
function hakiWebHTML() {
  const p = S.player, cl = p.conqueror ? (p.conqueror_lvl || 0) : -1;
  const col = (k, label, v, color) => {
    const nodes = hakiTree(k), next = nodes.find((n) => v < n.at);
    return `<div class="hcol" style="--wc:${color}"><div class="hhead">${label}<small>${v < 0 ? "dormant" : v}</small></div>
      ${nodes.map((n) => { const id = `${k}:${n.at}`; return `<button type="button" class="hnode ${v >= n.at ? "on" : ""} ${n === next ? "next" : ""} ${nodeOpen === id ? "sel" : ""}" data-node="${id}" title="${esc(n.name)}"><span class="dot">${n.at}</span><span class="hname">${esc(n.name)}</span></button>`; }).join("")}</div>`;
  };
  let detail = "";
  if (nodeOpen && /^(observation|armament|conqueror):/.test(nodeOpen)) {
    const [k, at] = nodeOpen.split(":"); const n = hakiTree(k).find((x) => x.at === +at);
    const v = k === "conqueror" ? cl : p[k];
    if (n) detail = `<div class="statinfo"><b>${esc(n.name)}</b>${esc(n.desc)}<small>${v >= n.at ? "Unlocked" : k === "conqueror" && v < 0 ? "Conqueror's Haki hasn't awakened yet." : `Unlocks at ${n.at}`}</small></div>`;
  }
  return `<h4 class="webtitle">Haki tree</h4><div class="hakiweb">${col("observation", "Observation", p.observation, "#47c2b1")}${col("armament", "Armament", p.armament, "#9b5cff")}${col("conqueror", "Conqueror's", cl, "#e6a93d")}</div>${detail}`;
}
function techniquesHTML() {
  const p = S.player, slots = techSlots(), full = p.techniques.length >= slots, next = nextSlotAt();
  let h = "";
  h += p.techniques.length ? p.techniques.map((t, i) => `<div class="card"><div class="t">${esc(t.name)} <span class="disp ${t.rank >= 2 ? "pos" : "neu"}">${RANKS[t.rank]}</span></div>
    <div class="stage">${RANKS.map((_, r) => `<i class="${r <= t.rank ? "on" : ""}"></i>`).join("")}</div>
    <div style="margin-top:6px">${esc(t.desc)}</div>${t.fresh ? `<div class="s">Untested: the sea will judge it on your next action.</div>` : ""}${t.note ? `<div class="s" style="margin-top:4px">${esc(t.note)}</div>` : ""}
    <div class="row2"><button type="button" class="mini" data-use="I use ${esc(t.name)}: ">Use</button><button type="button" class="linkbtn" data-forget="${i}">${p.forgetArm === i ? "Tap again to forget" : "Forget"}</button></div></div>`).join("") : `<p class="empty">No techniques yet.</p>`;
  if (full) h += `<p class="empty">All slots used. ${next ? `Next slot at power level ${next}.` : "Earn more through great milestones."} Forget one to invent another.</p>`;
  else h += `<div class="invent"><div class="field"><label for="tName">Invent a technique</label><input id="tName" maxlength="50" placeholder="Name, e.g. Gale Piercer"></div>
    <div class="field"><textarea id="tDesc" rows="2" maxlength="220" placeholder="What does it do? Dream big; it starts at Raw and grows as you do."></textarea></div>
    ${p.fruit === "kuki" ? `<div class="chips">${AIR_MOVES.filter((m) => !p.techniques.some((t) => t.name === m.name)).map((m) => `<button type="button" data-airmove="${esc(m.name)}" title="${esc(m.desc)}">${esc(m.name)}</button>`).join("")}</div>` : ""}
    <button type="button" class="btn ghost" id="tAdd">Add technique</button></div>`;
  return h;
}
$("#panel").addEventListener("click", (e) => {
  const p = S?.player; if (!p) return;
  const f = e.target.closest("[data-forget]");
  if (f) { const i = +f.dataset.forget; if (p.forgetArm === i) { p.techniques.splice(i, 1); delete p.forgetArm; saveGame(); } else p.forgetArm = i; renderPanel(); return; }
  const am = e.target.closest("[data-airmove]");
  if (am) { const m = AIR_MOVES.find((x) => x.name === am.dataset.airmove); if (m) { $("#tName").value = m.name; $("#tDesc").value = m.desc; } return; }
  if (e.target.id === "tAdd") {
    const name = $("#tName").value.trim(), desc = $("#tDesc").value.trim();
    if (!name || !desc || p.techniques.length >= techSlots()) return;
    p.techniques.push({ name: name.slice(0, 50), desc: desc.slice(0, 220), rank: 0, fresh: true, note: "" });
    saveGame(); renderPanel();
  }
});
/* ---------- interactive stat sheet ---------- */
const STAT_INFO = {
  kills: ["Kills", "How many people you've killed. Killers get bigger bounties, more respect and more enemies.", "It goes up when fights end that way."],
  hp: ["Health", "How much punishment you can take. At 0 you're defeated: captured, washed ashore or rescued.", "Rest, eat, see a doctor, or recruit one."],
  bounty: ["Bounty", "What the World Government will pay for you. Bigger bounties bring stronger hunters and more respect.", "Public deeds against the Government and big fights raise it."],
  power: ["Power level", "Your overall strength from Haki, fruit mastery, technique ranks, weapons and crew. Compare it with the threat stars of where you are.", "Train, win hard fights, rank up techniques, and recruit."],
  threat: ["Threat", "How dangerous this sea is. Enemies here are scaled to it.", "Higher-threat seas have stronger foes and bigger rewards."],
  observation: ["Observation Haki", "Sense presences and emotions, and read attacks before they land.", "Grows through danger, focus and fighting blind. +1 to +4 per real test."],
  armament: ["Armament Haki", "Harden your body and weapons with willpower. Lets you hit Logia users.", "Grows through hard fights and training."],
  conqueror: ["Conqueror's Haki", "The rare will of a king. It can knock out the weak-willed.", "Can awaken only at a huge emotional climax."],
  mastery: ["Fruit mastery", "How well you control your Devil Fruit. Higher mastery unlocks stronger uses.", "Use your fruit creatively and push it in real fights."]
};
let statOpen = null;
function openSecs() { return safeJSON(store.get("tsl_open")) || { haki: true, fruit: true, tech: true, gear: false, items: false }; }
function sec(id, title, body) {
  const o = openSecs()[id];
  return `<details class="sec" data-sec="${id}" ${o ? "open" : ""}><summary>${title}</summary><div class="sec-body">${body}</div></details>`;
}
function statRow(key, label, value, bar) {
  const open = statOpen === key, info = STAT_INFO[key];
  return `<button type="button" class="statrow ${open ? "open" : ""}" data-stat="${key}" aria-expanded="${open}"><span>${esc(label)}</span><b>${value}</b>${bar !== undefined ? `<i class="sbar"><i style="width:${clamp(bar, 0, 100)}%"></i></i>` : ""}</button>
    ${open && info ? `<div class="statinfo"><b>${esc(info[0])}</b>${esc(info[1])}<small>How to raise it: ${esc(info[2])}</small></div>` : ""}`;
}
function radarSVG() {
  const p = S.player, rankSum = p.techniques.reduce((a, t) => a + t.rank, 0);
  const axes = [["Observation", p.observation], ["Armament", p.armament], ["Fruit", p.fruit ? p.mastery : 0], ["Techniques", Math.min(100, rankSum * 8)], ["Crew", Math.min(100, p.crew.length * 12)]];
  const cx = 110, cy = 100, R = 72, pt = (i, v) => { const a = -Math.PI / 2 + i * 2 * Math.PI / axes.length; return [cx + Math.cos(a) * R * v, cy + Math.sin(a) * R * v]; };
  const ring = (v) => axes.map((_, i) => pt(i, v).join(",")).join(" ");
  const shape = axes.map(([, v], i) => pt(i, Math.max(0.04, v / 100)).join(",")).join(" ");
  return `<svg class="radar" viewBox="0 0 220 200" role="img" aria-label="Stat radar">
    ${[0.25, 0.5, 0.75, 1].map((v) => `<polygon points="${ring(v)}" fill="none" stroke="var(--rope)" stroke-width="1"/>`).join("")}
    ${axes.map((_, i) => { const [x, y] = pt(i, 1); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--rope)"/>`; }).join("")}
    <polygon points="${shape}" fill="color-mix(in srgb, var(--ochre) 35%, transparent)" stroke="var(--ochre)" stroke-width="2"/>
    ${axes.map(([l, v], i) => { const [x, y] = pt(i, 1.22); return `<text x="${x}" y="${y}" fill="var(--mist)" font-size="10" text-anchor="middle" dominant-baseline="middle">${l} ${v}</text>`; }).join("")}
  </svg>`;
}
function statusHTML() {
  const p = S.player, f = p.fruit ? byId(S.fruits, p.fruit) : null, tier = hereTier();
  let h = `<div class="sheet-head"><div><h3 style="margin:0">${esc(p.name)}</h3><small>${p.epithet ? `"${esc(p.epithet)}" · ` : ""}${esc(p.style.split(" (")[0])}</small></div>
    <div class="badges"><span class="badge gold">PWR ${powerLevel()}</span>${p.fruit ? `<span class="badge blue">${esc(scaleFor(p.mastery).name)} scale</span>` : ""}</div></div>
    <div class="tiercmp ${playerTier() > tier ? "up" : playerTier() < tier ? "down" : ""}"><span>You <b>${"★".repeat(playerTier())}</b></span><span>vs</span><span>Here <b>${"★".repeat(tier)}</b></span><small>${playerTier() > tier ? "You outclass this sea." : playerTier() < tier ? "This sea outclasses you. Fights here can kill you." : "An even match."}</small></div>
    ${radarSVG()}
    <div class="stats">${statRow("hp", "HP", `${p.hp} / ${p.max_hp}`, 100 * p.hp / p.max_hp)}${statRow("bounty", "Bounty", fmt(p.bounty))}${statRow("power", "Power level", `${powerLevel()} / 100`, powerLevel())}${statRow("threat", "Threat here", "★".repeat(tier) + "☆".repeat(5 - tier))}${statRow("kills", "Kills", p.kills || 0)}
    <div class="kv" style="margin:6px 0 0"><dt>Berries</dt><dd>${fmt(p.berries)}</dd><dt>Ship</dt><dd>${esc(p.ship)}</dd></div></div>`;
  h += sec("haki", "Haki", statRow("observation", "Observation", p.observation, p.observation) + statRow("armament", "Armament", p.armament, p.armament) + statRow("conqueror", "Conqueror's", p.conqueror ? p.conqueror_lvl || 0 : "dormant", p.conqueror ? p.conqueror_lvl || 0 : undefined) + hakiWebHTML());
  h += sec("fruit", "Devil Fruit", f ? `<div class="card"><div class="t">${esc(f.name)} <span class="tag ${f.canon ? "canon" : "orig"}">${f.canon ? "Known fruit" : "Original"}</span></div><div class="s">${esc(f.eng)} · ${esc(f.type)}</div>${esc(f.power)}<div class="s" style="margin-top:4px">Limit: ${esc(f.limit)}</div>
      <button type="button" class="mini" data-use="I use my ${esc(f.eng)} to ">Use fruit</button></div>${statRow("mastery", "Mastery", p.mastery, p.mastery)}${fruitWebHTML()}` : `<p class="empty">No fruit. You can still swim.</p>`);
  h += sec("tech", `Techniques (${p.techniques.length} / ${techSlots()})`, techniquesHTML());
  h += sec("gear", `Weapons (${p.weapons.length})`, p.weapons.length ? p.weapons.map((w) => `<div class="card"><div class="t">${esc(w.name)} <span class="disp ${w.grade === "Legendary" || w.grade === "Grade Blade" ? "pos" : "neu"}">${esc(w.grade)}</span></div><div class="s">${esc(w.kind)}</div>${esc(w.desc)}<br><button type="button" class="mini" data-use="I draw my ${esc(w.name)} and ">${w.kind === "gun" ? "Aim" : "Draw"}</button></div>`).join("") : `<p class="empty">Unarmed.</p>`);
  h += sec("items", `Items (${p.items.length})`, p.items.length ? `<ul class="itemlist">${p.items.map((i) => `<li><span>${esc(i)}</span><button type="button" class="mini" data-use="I use the ${esc(i)} to ">Use</button></li>`).join("")}</ul>` : `<p class="empty">Empty pockets.</p>`);
  h += `<h3>Dream</h3><p style="font-size:13px;line-height:1.5">${esc(p.dream)}</p>`;
  return h;
}
$("#panel").addEventListener("toggle", (e) => {
  const d = e.target.closest?.("details[data-sec]"); if (!d) return;
  const o = openSecs(); o[d.dataset.sec] = d.open; store.set("tsl_open", JSON.stringify(o));
}, true);
$("#panel").addEventListener("click", (e) => {
  const nd = e.target.closest("[data-node]");
  if (nd) { nodeOpen = nodeOpen === nd.dataset.node ? null : nd.dataset.node; renderPanel(); return; }
  const st = e.target.closest("[data-stat]");
  if (st) { statOpen = statOpen === st.dataset.stat ? null : st.dataset.stat; renderPanel(); return; }
  const u = e.target.closest("[data-use]");
  if (u) { const a = $("#action"); a.value = u.dataset.use; $("#side").classList.remove("open"); a.focus(); a.setSelectionRange(a.value.length, a.value.length); return; }
  const isl = e.target.closest("[data-island]");
  if (isl) { mapPick = isl.dataset.island; renderPanel(); }
});

/* ---------- the chart ---------- */
let mapPick = null;
const TIER_COLORS = ["", "#47c2b1", "#8fd16a", "#e6a93d", "#e0784f", "#e0564f"];
function mapSVG(big) {
  const isl = S.islands; // every island shows; unexplored ones are dimmed
  const seaLabels = [["EAST BLUE", 800, 570], ["NORTH BLUE", 240, 50], ["SOUTH BLUE", 240, 575], ["WEST BLUE", 800, 50], ["PARADISE", 740, 212], ["NEW WORLD", 250, 212]];
  const route = (S.route || []).map((id) => byId(S.islands, id)).filter((i) => i && i.known);
  let path = ""; route.forEach((i, k) => { path += `${k ? "L" : "M"}${i.x} ${i.y} `; });
  return `<svg viewBox="0 0 1000 600" class="chart-svg" role="img" aria-label="Chart of the seas">
    <defs><radialGradient id="seaG" cx="50%" cy="50%" r="70%"><stop offset="0" stop-color="#10283a"/><stop offset="1" stop-color="#081521"/></radialGradient>
      <pattern id="waves" width="40" height="14" patternUnits="userSpaceOnUse"><path d="M0 7 Q10 2 20 7 T40 7" fill="none" stroke="#1d3a4d" stroke-width="1"/></pattern></defs>
    <rect width="1000" height="600" fill="url(#seaG)"/><rect width="1000" height="600" fill="url(#waves)" opacity=".6"/>
    <rect x="0" y="232" width="1000" height="26" fill="#2c3f3a" opacity=".55"/><rect x="0" y="342" width="1000" height="26" fill="#2c3f3a" opacity=".55"/>
    <text x="150" y="249" fill="#9fb3ba" opacity=".55" font-size="11" font-family="sans-serif" letter-spacing="3">CALM BELT</text>
    <text x="650" y="359" fill="#9fb3ba" opacity=".55" font-size="11" font-family="sans-serif" letter-spacing="3">CALM BELT</text>
    <rect x="0" y="258" width="1000" height="84" fill="#174059" opacity=".75"/>
    <text x="760" y="334" fill="#47c2b1" opacity=".5" font-size="12" font-family="sans-serif" letter-spacing="5" text-anchor="middle">GRAND LINE</text>
    <rect x="490" y="0" width="22" height="600" fill="#8a2f28"/><rect x="975" y="0" width="25" height="600" fill="#8a2f28"/><rect x="0" y="0" width="10" height="600" fill="#8a2f28" opacity=".7"/>
    <text x="501" y="150" fill="#f2b8a8" font-size="11" text-anchor="middle" font-family="sans-serif" letter-spacing="3" transform="rotate(-90 501 150)">RED LINE</text>
    ${seaLabels.map(([t, x, y]) => `<text x="${x}" y="${y}" fill="#47c2b1" opacity=".5" font-size="16" text-anchor="middle" font-family="sans-serif" letter-spacing="4">${t}</text>`).join("")}
    ${path ? `<path d="${path}" fill="none" stroke="#e6a93d" stroke-width="2.5" stroke-dasharray="6 6" opacity=".8"/>` : ""}
    <g transform="translate(70 520)" opacity=".8"><circle r="34" fill="none" stroke="#9fb3ba" stroke-width="1"/><path d="M0 -30 L6 0 L0 30 L-6 0Z" fill="#e6a93d"/><path d="M-30 0 L0 5 L30 0 L0 -5Z" fill="#9fb3ba"/><text y="-38" fill="#ebe5d2" font-size="12" text-anchor="middle" font-family="sans-serif">N</text></g>
    ${isl.map((i) => {
      const here = i.id === S.location, pick = i.id === mapPick, c = TIER_COLORS[i.tier || 1];
      const unexp = !i.known && !here, label = big || i.known || here || pick;
      const op = here || i.visited ? 1 : i.known ? 0.75 : 0.45;
      return `<g class="isle ${unexp ? "unexp" : ""}" data-island="${esc(i.id)}" tabindex="0" role="button" aria-label="${esc(i.name)}${unexp ? " (unexplored)" : ""}" opacity="${op}">
        <circle cx="${i.x}" cy="${i.y}" r="22" fill="transparent"/>
        ${here ? `<circle cx="${i.x}" cy="${i.y}" r="16" fill="none" stroke="#e6a93d" stroke-width="2"><animate attributeName="r" values="10;24;10" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2.4s" repeatCount="indefinite"/></circle>` : ""}
        <circle cx="${i.x}" cy="${i.y}" r="${here ? 10 : 7}" fill="${here ? "#e6a93d" : unexp ? "#0a1a27" : c}" stroke="${pick ? "#fff" : unexp ? c : "#07121d"}" stroke-width="${pick ? 3 : 2}" ${unexp ? 'stroke-dasharray="3 2"' : ""}/>
        ${label ? `<text x="${i.x}" y="${i.y - 15}" fill="#ebe5d2" font-size="${big ? (unexp ? 12 : 15) : 24}" font-style="${unexp ? "italic" : "normal"}" text-anchor="${i.x > 930 ? "end" : i.x < 70 ? "start" : "middle"}" font-family="sans-serif" paint-order="stroke" stroke="#07121d" stroke-width="5">${esc(i.name)}</text>
        <text x="${i.x}" y="${i.y + 24}" fill="${c}" font-size="${big ? 11 : 16}" text-anchor="middle" font-family="sans-serif" paint-order="stroke" stroke="#07121d" stroke-width="3">${"★".repeat(i.tier || 1)}</text>` : ""}</g>`;
    }).join("")}
  </svg>`;
}
function islandCard(i) {
  if (!i) return `<p class="empty">Tap an island on the chart to see what you know about it.</p>`;
  if (!i.known && i.id !== S.location) {
    const teaser = (i.desc.match(/^[^.!?]*[.!?]/) || [i.desc])[0];
    return `<div class="card islecard"><div class="t">${esc(i.name)} <span class="tag unexp">Unexplored</span></div>
      <div class="s">${esc(i.sea)} · <span style="color:${TIER_COLORS[i.tier || 1]}">${"★".repeat(i.tier || 1)}</span></div>
      ${esc(teaser)}<div class="s" style="margin-top:6px">Sail there to learn who rules it and what's happening.</div>
      <button type="button" class="mini" data-use="I set a course for ${esc(i.name)} and ">Set course</button></div>`;
  }
  const people = S.npcs.filter((n) => n.known && n.location === i.id && n.status === "alive");
  return `<div class="card islecard"><div class="t">${esc(i.name)}${i.id === S.location ? " · YOU ARE HERE" : ""}</div>
    <div class="s">${esc(i.sea)} · <span style="color:${TIER_COLORS[i.tier || 1]}">${"★".repeat(i.tier || 1)}</span> · held by ${esc(factionName(i.controller))}${i.visited ? " · visited" : ""}</div>
    ${esc(i.desc)}<div class="s" style="margin-top:6px">Now: ${esc(i.status)}</div>
    ${people.length ? `<div class="s" style="margin-top:6px">People here: ${people.map((n) => esc(n.name)).join(", ")}</div>` : ""}
    ${i.id !== S.location ? `<button type="button" class="mini" data-use="I set a course for ${esc(i.name)} and ">Set course</button>` : ""}</div>`;
}
function mapPanelHTML() {
  const pick = byId(S.islands, mapPick || S.location);
  const visited = S.islands.filter((i) => i.visited).length;
  let h = `<div class="maphead"><div><h3 style="margin:0">Chart of the seas</h3><small class="mapcount">${S.islands.length} islands · ${visited} visited</small></div><button type="button" class="mini" id="openChart">Open full chart</button></div>
    <div id="mapWrap">${mapSVG(false)}</div>
    <div class="legend">${[1, 2, 3, 4, 5].map((t) => `<span><i style="background:${TIER_COLORS[t]}"></i>${"★".repeat(t)}</span>`).join("")}<span><i class="route"></i>your route</span><span><i class="unexp"></i>unexplored</span></div>
    ${islandCard(pick)}`;
  const seas = {};
  for (const i of S.islands) (seas[i.sea.split(" — ")[0].split(" (")[0]] ||= []).push(i);
  for (const [sea, list] of Object.entries(seas)) h += `<h3>${esc(sea)}</h3>` + list.map((i) => { const unexp = !i.known && i.id !== S.location; return `<button type="button" class="islerow ${unexp ? "unexp" : ""}" data-island="${esc(i.id)}"><span>${esc(i.name)}${i.id === S.location ? " ⚓" : ""}${unexp ? ' <span class="tag unexp">Unexplored</span>' : i.visited ? "" : ' <span class="tag">Heard of</span>'}</span><span style="color:${TIER_COLORS[i.tier || 1]}">${"★".repeat(i.tier || 1)}</span></button>`; }).join("");
  return h;
}
/* full-screen chart with zoom and pan */
const chartView = { k: 1, x: 0, y: 0 };
function openChart() {
  $("#chartInner").innerHTML = mapSVG(true);
  const pick = byId(S.islands, mapPick || S.location); $("#chartCard").innerHTML = islandCard(pick);
  show("chart");
  fitChart(); // measure only once the overlay is visible
}
// open zoomed out so the whole map fits, centered
function fitChart() {
  const r = $("#chartViewport").getBoundingClientRect();
  const w = Math.min(r.width, r.height * 1000 / 600);
  $("#chartInner").style.width = w + "px";
  Object.assign(chartView, { k: 1, x: (r.width - w) / 2, y: Math.max(0, (r.height - w * 0.6) / 2) }); applyChart();
}
function applyChart() { $("#chartInner").style.transform = `translate(${chartView.x}px, ${chartView.y}px) scale(${chartView.k})`; }
function zoomChart(f, cx, cy) {
  const r = $("#chartViewport").getBoundingClientRect();
  cx ??= r.width / 2; cy ??= r.height / 2;
  const k = clamp(chartView.k * f, 1, 5), real = k / chartView.k;
  chartView.x = cx - (cx - chartView.x) * real; chartView.y = cy - (cy - chartView.y) * real; chartView.k = k;
  applyChart();
}
(() => {
  const vp = $("#chartViewport"), pts = new Map(); let lastDist = 0, moved = false;
  vp.addEventListener("pointerdown", (e) => { pts.set(e.pointerId, { x: e.clientX, y: e.clientY }); moved = false; vp.setPointerCapture(e.pointerId); });
  vp.addEventListener("pointermove", (e) => {
    if (!pts.has(e.pointerId)) return;
    const prev = pts.get(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2) {
      const [a, b] = [...pts.values()], d = Math.hypot(a.x - b.x, a.y - b.y), r = vp.getBoundingClientRect();
      if (lastDist) zoomChart(d / lastDist, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      lastDist = d; moved = true;
    } else { const dx = e.clientX - prev.x, dy = e.clientY - prev.y; if (Math.abs(dx) + Math.abs(dy) > 2) moved = true; chartView.x += dx; chartView.y += dy; applyChart(); }
  });
  const up = (e) => { pts.delete(e.pointerId); if (pts.size < 2) lastDist = 0; };
  vp.addEventListener("pointerup", up); vp.addEventListener("pointercancel", up);
  vp.addEventListener("wheel", (e) => { e.preventDefault(); const r = vp.getBoundingClientRect(); zoomChart(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - r.left, e.clientY - r.top); }, { passive: false });
  vp.addEventListener("click", (e) => { if (moved) return; const g = e.target.closest("[data-island]"); if (g) { mapPick = g.dataset.island; $("#chartInner").innerHTML = mapSVG(true); $("#chartCard").innerHTML = islandCard(byId(S.islands, mapPick)); } });
  $("#zoomIn").onclick = () => zoomChart(1.3); $("#zoomOut").onclick = () => zoomChart(1 / 1.3);
  $("#zoomReset").onclick = () => fitChart();
  $("#chartCard").addEventListener("click", (e) => { const u = e.target.closest("[data-use]"); if (u) { hide("chart"); $("#action").value = u.dataset.use; $("#side").classList.remove("open"); $("#action").focus(); } });
  $("#panel").addEventListener("click", (e) => { if (e.target.id === "openChart") openChart(); });
})();
function renderAll() { renderHUD(); renderSuggestions(); renderTabs(); renderPanel(); }

/* ---------- VFX ---------- */
const fx = $("#fx");
// effect settings: combat moves, story moments, shake & flashes, animated sea
function fxSet() { return settings.fx; }
function vfxOn() { return settings.fx.story; }
function combatFxOn() { return settings.fx.combat; }
function addFx(cls, ms, html = "", style = "") { const el = document.createElement("div"); el.className = cls; if (style) el.style.cssText = style; el.innerHTML = html; fx.append(el); setTimeout(() => el.remove(), ms); return el; }
function shake() { if (!settings.fx.shake) return; const a = $("#app"); a.classList.remove("shake"); void a.offsetWidth; a.classList.add("shake"); }
function sfx(text) { addFx("fx-sfx", 1400, "", `left:${10 + Math.random() * 45}%;top:${18 + Math.random() * 35}%`).textContent = text; }
function hakiBolts(color) {
  const w = innerWidth, h = innerHeight; let paths = "";
  for (let k = 0; k < 5; k++) {
    let x = Math.random() * w, y = 0, d = `M${x} ${y}`;
    while (y < h) { x += (Math.random() - .5) * 120; y += 30 + Math.random() * 60; d += ` L${x.toFixed(0)} ${y.toFixed(0)}`; }
    paths += `<path d="${d}" stroke="#000" stroke-width="9" fill="none"/><path d="${d}" stroke="${color || "#e0564f"}" stroke-width="3" fill="none"/><path d="${d}" stroke="${color ? "#fff" : "#9b5cff"}" stroke-width="1" fill="none"/>`;
  }
  addFx("fx-haki", 950, `<svg width="100%" height="100%" viewBox="0 0 ${w} ${h}">${paths}</svg>`);
}
function slash() {
  const a = -25 + Math.random() * 50;
  addFx("fx-slash", 700, "", `transform:rotate(${a}deg)`);
  setTimeout(() => addFx("fx-slash thin", 600, "", `transform:rotate(${a + 8}deg) translateY(40px)`), 90);
  addFx("fx-flash soft", 400);
}
function burst(cls, n, color) {
  for (let i = 0; i < n; i++) {
    const ang = Math.random() * Math.PI * 2, dist = 120 + Math.random() * 260;
    addFx(cls, 1100, "", `left:50%;top:55%;--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist - 60}px;${color ? `background:${color};` : ""}animation-delay:${Math.random() * 0.15}s`);
  }
}
function wind() { for (let i = 0; i < 12; i++) addFx("fx-wind", 1000, "", `top:${8 + Math.random() * 84}%;animation-delay:${Math.random() * 0.4}s;width:${20 + Math.random() * 40}%`); }
function zoom() { addFx("fx-zoom", 900); }
function aura(color = "#9b5cff") { addFx("fx-aura", 1800, "", `--c:${color}`); }
// growth banners play one at a time so they never overlap
const bannerQ = []; let bannerBusy = false;
function rankup(text, kind) {
  if (!vfxOn()) return;
  bannerQ.push({ text, kind: kind === true ? "air" : kind || "tech" });
  if (!bannerBusy) nextBanner();
}
function nextBanner() {
  const b = bannerQ.shift(); if (!b) { bannerBusy = false; return; }
  bannerBusy = true;
  const label = { air: "Air mastery", fruit: "Fruit mastery", haki: "Haki awakening", tech: "Technique growth" }[b.kind] || "Growth";
  addFx("fx-rank", 2600, `<small>${label}</small><strong></strong>`).querySelector("strong").textContent = b.text;
  sparkles(); aura(b.kind === "air" ? "#bfe6ff" : b.kind === "haki" ? "#9b5cff" : "#e6a93d");
  if (b.kind === "air") airburst(); else if (b.kind === "haki") hakiBolts();
  setTimeout(nextBanner, 2700);
}
function dangerPulse(tier) {
  if (!vfxOn()) return;
  aura("#e0564f"); addFx("fx-card danger", 2600, `<div><small>Threat rising</small><strong>${"★".repeat(tier)}</strong></div>`);
}
function airburst() {
  for (let i = 0; i < 4; i++) addFx("fx-ring", 1200, "", `animation-delay:${i * 0.12}s`);
  wind(); addFx("fx-flash soft", 350);
}
function fruitSwirl(color) { addFx("fx-swirl", 1650, "", color ? `background:repeating-conic-gradient(transparent 0 12deg, ${color}66 12deg 18deg)` : ""); }
function sparkles() { for (let i = 0; i < 14; i++) addFx("fx-sparkle", 1500, "", `left:${Math.random() * 100}%;top:${20 + Math.random() * 60}%;animation-delay:${Math.random() * .5}s`); }
// one effect by name; sound-effect words only in fights
function effect(v, withSfx) {
  fx.classList.toggle("fx-quiet", !settings.fx.shake);
  const say = (t) => { if (withSfx) sfx(t); };
  switch (String(v)) {
    case "shake": shake(); break;
    case "impact": addFx("fx-flash", 520); shake(); say(SFX_DEFAULT.impact); break;
    case "speedlines": addFx("fx-speed", 1150); say("ドドド"); break;
    case "flash": addFx("fx-flash", 520); break;
    case "haki": hakiBolts(); shake(); say("バチッ"); break;
    case "fruit": fruitSwirl(byId(S.fruits, S.player.fruit)?.color); break;
    case "sparkle": sparkles(); break;
    case "gloom": addFx("fx-gloom", 2300); break;
    case "slash": slash(); say("ザンッ"); break;
    case "shot": burst("fx-drop ember", 10, "#ffe08a"); addFx("fx-flash soft", 300); say("バンッ"); break;
    case "splash": burst("fx-drop", 26, "#7fd3ff"); say("ザバッ"); break;
    case "fire": burst("fx-drop ember", 30, "#ff8a3d"); addFx("fx-heat", 1200); say("ゴォッ"); break;
    case "ice": burst("fx-shard", 18); addFx("fx-aura", 1200, "", "--c:#a8e8ff"); say("ピキッ"); break;
    case "lightning": hakiBolts("#ffe14a"); addFx("fx-flash soft", 300); say("ゴロッ"); break;
    case "wind": wind(); say("ヒュオッ"); break;
    case "shatter": burst("fx-shard", 22); addFx("fx-flash soft", 400); say("パリンッ"); break;
    case "aura": aura(); break;
    case "zoom": zoom(); break;
    case "airburst": airburst(); say("ボウッ"); break;
    default: addFx("fx-flash soft", 300); shake();
  }
}
// story moments: at most one, no sound words
function playVFX(list) {
  if (!vfxOn() || !Array.isArray(list) || !list.length) return;
  effect(list[0], false);
}
// fights: every move plays in order with a callout
function playCombat(moves) {
  if (!combatFxOn() || !moves?.length) return 0;
  const step = reduceMotion ? 900 : 1300;
  moves.forEach((m, i) => setTimeout(() => {
    const mine = /^you$/i.test(m.by) || m.by === S.player.name;
    const res = ["hit", "miss", "blocked", "crit"].includes(m.result) ? m.result : "hit";
    const el = addFx(`fx-callout ${mine ? "mine" : "foe"} ${res}`, step - 60, `<small></small><strong></strong><em></em>`);
    el.querySelector("small").textContent = mine ? "YOU" : m.by;
    el.querySelector("strong").textContent = m.name;
    el.querySelector("em").textContent = res === "crit" ? "CRITICAL!" : res.toUpperCase();
    if (res !== "miss") effect(m.effect, true);
    if (res === "crit") setTimeout(() => shake(), 200);
  }, i * step));
  return moves.length * step;
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
    if (weather === "storm" && Math.random() < 0.004 && settings.fx.shake) { cx.fillStyle = "rgba(255,255,255,.25)"; cx.fillRect(0, 0, W, H); }
    if (!reduceMotion && settings.fx.sea) requestAnimationFrame(frame); else running = false;
  }
  let running = true;
  spawn(); frame();
  return {
    setWeather(w) { if (w !== weather) { weather = w; spawn(); if (!running) frame(); } },
    setAnimated(on) { if (on && !running && !reduceMotion) { running = true; frame(); } }
  };
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
  if (busy || !S || S.dead) return;
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
  // effects: each fight move gets one; outside fights, only real story moments
  const fightMs = playCombat(out.moves);
  const later = Math.max(fightMs, 0);
  if (!out.moves?.length) playVFX(out.vfx);
  if (out.fruitEaten) setTimeout(() => { if (vfxOn()) effect("fruit", false); }, 600 + later);
  if (out.moved) setTimeout(() => titleCard(out.moved), 300 + later);
  if (out.danger) setTimeout(() => dangerPulse(out.danger), 3300 + later);
  if (out.bountyUp > 0) setTimeout(bountyPoster, 900 + later);
  setTimeout(() => {
    out.rankups?.forEach((t) => rankup(`${t.name}: ${RANKS[t.rank]}`, S.player.fruit === "kuki"));
    out.unlocks?.forEach((u) => rankup(`Unlocked: ${u.name}`, u.kind === "haki" ? "haki" : S.player.fruit === "kuki" ? "air" : "fruit"));
    if (out.slotGained) rankup("New technique slot!");
  }, 1400 + later);
  if (out.saga) pushLog({ t: "sys", kind: "event", label: `Saga ${out.saga}`, text: "A new age begins on the sea." });
  for (const ev of out.events) pushLog({ t: "sys", kind: "event", label: `Day ${S.day} · World event`, text: `${ev.title}. ${ev.desc}` });
  if (out.rumor) pushLog({ t: "sys", label: "Rumor on the wind", text: out.rumor });
  if (out.died) { saveGame(); renderAll(); setBusy(false); setTimeout(showDeath, 1200 + later); return; }
  if (S.player.hp <= 0) pushLog({ t: "sys", kind: "event", label: "Defeated", text: "You've been knocked out. Describe what you try when you come to." });
  else if (S.player.hp < S.player.max_hp * 0.25) pushLog({ t: "sys", kind: "event", label: "Near death", text: `Only ${S.player.hp} HP left. One more bad hit could kill you.` });
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
let pickedFruit = null, fruitFilter = "All", pickedStart = "apprentice", createBuilt = false;
function buildCreate() {
  if (!createBuilt) {
    createBuilt = true;
    $("#cOrigin").innerHTML = ORIGINS.map((o) => `<option value="${o.id}">${esc(o.label)}</option>`).join("");
    $("#cStyle").innerHTML = STYLES.map((s, i) => `<option value="${i}">${esc(s.name)}</option>`).join("");
    const styleNote = () => ($("#cStyleNote").textContent = STYLES[+$("#cStyle").value].note);
    $("#cStyle").onchange = styleNote; styleNote();
    const groups = [["sword", "Swords"], ["gun", "Guns"], ["other", "Other weapons"]];
    const wOpts = `<option value="">None</option>` + groups.map(([k, l]) => `<optgroup label="${l}">${WEAPONS.filter((w) => w.kind === k).map((w) => `<option value="${w.id}">${esc(w.name)} (${w.grade})</option>`).join("")}</optgroup>`).join("");
    $("#cW1").innerHTML = wOpts; $("#cW2").innerHTML = wOpts; $("#cW1").value = "cutlass";
    const wNote = () => ($("#cWNote").textContent = ["#cW1", "#cW2"].map((s) => WEAPONS.find((w) => w.id === $(s).value)).filter(Boolean).map((w) => `${w.name}: ${w.desc}`).join("  ·  "));
    $("#cW1").onchange = wNote; $("#cW2").onchange = wNote; wNote();
  }
  renderFruitPicks(); renderStarts(); renderMoveIdeas();
}
function renderFruitPicks() {
  const chips = $("#fruitFilter"); chips.innerHTML = "";
  for (const f of ["All", "Paramecia", "Logia", "Zoan"]) {
    const b = document.createElement("button"); b.type = "button"; b.textContent = f; b.setAttribute("aria-pressed", f === fruitFilter);
    b.onclick = () => { fruitFilter = f; renderFruitPicks(); }; chips.append(b);
  }
  const starters = WORLD_SEED.fruits.filter((f) => f.starter && (fruitFilter === "All" || f.type.includes(fruitFilter))).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  const box = $("#fruitPicks"); box.innerHTML = "";
  const opts = [...(fruitFilter === "All" ? [{ id: null, name: "No fruit", eng: "Keep the sea as your friend", power: "You can swim, and seastone can't touch you. Haki and your fighting style grow a little faster.", type: "", cost: "No miracle powers. You win with skill, grit and friends." }] : []), ...starters];
  for (const f of opts) {
    const b = document.createElement("button"); b.type = "button"; b.className = "fruitpick"; b.setAttribute("aria-pressed", f.id === pickedFruit);
    b.innerHTML = `${f.featured ? `<span class="featured">Featured · full mastery path</span>` : ""}<b>${esc(f.name)}${f.id ? ` <span class="tag ${f.canon ? "canon" : "orig"}">${f.canon ? "Known fruit" : "Original"}</span>` : ""}</b><small>${esc(f.eng)}${f.type ? " · " + esc(f.type) : ""}</small><br>${esc(f.power)}${f.cost ? `<span class="cost">Cost: ${esc(f.cost)}</span>` : ""}`;
    if (f.color) b.style.setProperty("--fc", f.color);
    if (f.featured) b.classList.add("feat");
    b.onclick = () => { pickedFruit = f.id; renderFruitPicks(); renderStarts(); renderMoveIdeas(); };
    box.append(b);
  }
  $("#fruitCount").textContent = `${WORLD_SEED.fruits.filter((f) => f.starter).length} starter fruits of ${WORLD_SEED.fruits.length} in the world · fruits you don't pick will be eaten by people somewhere in the world`;
}
function renderMoveIdeas() {
  const box = $("#moveIdeas"); box.innerHTML = "";
  box.hidden = pickedFruit !== "kuki";
  if (box.hidden) return;
  const lab = document.createElement("small"); lab.className = "note"; lab.style.width = "100%"; lab.textContent = "Air move ideas: tap one to fill the next empty technique slot.";
  box.append(lab);
  for (const m of AIR_MOVES) {
    const b = document.createElement("button"); b.type = "button"; b.textContent = m.name; b.title = m.desc;
    b.onclick = () => { const i = [1, 2, 3].find((n) => !$("#cT" + n).value.trim()); if (!i) return; $("#cT" + i).value = m.name; $("#cT" + i + "d").value = m.desc; };
    box.append(b);
  }
}
function startOk(s) {
  if (s.req === "any") return true;
  if (s.req === "fruit" || s.req === "nofruit") return (s.req === "fruit") === !!pickedFruit;
  return s.req === pickedFruit; // fruit-specific path
}
function renderStarts() {
  if (!startOk(STARTS.find((s) => s.id === pickedStart))) pickedStart = STARTS.find(startOk).id;
  const box = $("#startPicks"); box.innerHTML = "";
  for (const s of STARTS) {
    const ok = startOk(s);
    const b = document.createElement("button"); b.type = "button"; b.className = "fruitpick startpick"; b.disabled = !ok; b.setAttribute("aria-pressed", s.id === pickedStart);
    const why = s.req === "fruit" ? "Needs a Devil Fruit" : s.req === "nofruit" ? "Only without a Devil Fruit" : `Only with the ${WORLD_SEED.fruits.find((f) => f.id === s.req)?.eng || s.req}`;
    b.innerHTML = `<b>${esc(s.title)}</b>${esc(s.text)}<span class="cost">${esc(s.cons)}</span>${ok ? "" : `<small>${esc(why)}</small>`}`;
    b.onclick = () => { pickedStart = s.id; renderStarts(); };
    box.append(b);
  }
}
$("#newBtn").onclick = () => { buildCreate(); show("create"); };
$("#createForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const origin = ORIGINS.find((o) => o.id === $("#cOrigin").value);
  const style = STYLES[+$("#cStyle").value];
  const techniques = [1, 2, 3].map((i) => ({ name: $("#cT" + i).value.trim(), desc: $("#cT" + i + "d").value.trim() })).filter((t) => t.name);
  const weapons = [...new Set([$("#cW1").value, $("#cW2").value].filter(Boolean))];
  S = newGame({ slot: +$("#cSlot").value, name: $("#cName").value.trim() || "Nameless", origin: origin.label + ". " + origin.text, style: `${style.name} (${style.note})`,
    dream: $("#cDream").value.trim() || "Be free.", look: $("#cLook").value.trim(), fruit: pickedFruit, start: pickedStart, weapons, techniques });
  S.threads.find((t) => t.id === "dream").name = "Dream: " + S.player.dream.slice(0, 60);
  hide("create"); hide("title"); $("#composer").hidden = false;
  renderLog(); renderAll(); saveGame();
  takeTurn("[BEGIN]");
});

// continue
function buildSlots() {
  const list = $("#slotList"); list.innerHTML = "";
  for (const n of [1, 2, 3]) {
    const s = loadSlot(n);
    const row = document.createElement("div"); row.className = "slot";
    if (s && isOldStory(s)) {
      row.innerHTML = `<div><b>Slot ${n}: ${esc(s.player?.name)}</b><small>From the old story. It can't continue in the new world.</small></div>`;
      const del = document.createElement("button"); del.className = "btn ghost"; del.type = "button"; del.textContent = "Delete";
      del.onclick = () => { store.del(slotKey(n)); buildSlots(); };
      row.append(del);
    } else if (s && s.dead) {
      row.innerHTML = `<div><b>Slot ${n}: ${esc(s.player?.name)} ✝</b><small>Died on Day ${s.dead.day}. ${esc(s.dead.cause)}</small></div>`;
      const read = document.createElement("button"); read.className = "btn ghost"; read.type = "button"; read.textContent = "Read";
      read.onclick = () => startFrom(s);
      const del = document.createElement("button"); del.className = "btn ghost"; del.type = "button"; del.textContent = "Delete";
      del.onclick = () => { store.del(slotKey(n)); buildSlots(); };
      const wrap = document.createElement("div"); wrap.style.cssText = "display:flex;gap:8px"; wrap.append(del, read); row.append(wrap);
    } else if (s) {
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
  S = migrate(s); hide("slots"); hide("title"); renderLog(); renderAll(); lockIfDead();
  if (!S.dead && !S.log.some((e) => e.t === "gm")) showRetryBegin();
}
function lockIfDead() {
  const dead = !!S?.dead;
  $("#composer").hidden = dead;
  if (dead && !logEl.querySelector(".deadnote")) { const el = logNode({ t: "sys", kind: "event", label: "Voyage ended", text: `${S.player.name} died on Day ${S.dead.day}. ${S.dead.cause}` }); el.classList.add("deadnote"); logEl.append(el); }
}
function showDeath() {
  const p = S.player, top = S.chronicle.filter((c) => c.imp >= 2).slice(-6);
  $("#deathBody").innerHTML = `<div class="kicker">Day ${S.dead.day}</div><h2>${esc(p.name)}${p.epithet ? ` "${esc(p.epithet)}"` : ""}</h2>
    <p class="cause">${esc(S.dead.cause)}</p>
    <div class="deathstats"><div><small>Final bounty</small><b>${fmt(p.bounty)}</b></div><div><small>Days at sea</small><b>${S.day}</b></div><div><small>Kills</small><b>${p.kills || 0}</b></div><div><small>Power level</small><b>${powerLevel()}</b></div></div>
    ${p.crew.length ? `<p><b>Crew:</b> ${p.crew.map((c) => esc(c.name)).join(", ")}</p>` : ""}
    ${top.length ? `<h3>Legend</h3><ul class="list">${top.map((c) => `<li>D${c.day}: ${esc(c.text)}</li>`).join("")}</ul>` : ""}`;
  lockIfDead(); show("death");
}
$("#deathRead").onclick = () => hide("death");
$("#deathNew").onclick = () => { hide("death"); show("title"); buildCreate(); show("create"); };
$("#contBtn").onclick = () => { buildSlots(); $("#importMsg").textContent = ""; show("slots"); };
$("#importBtn").onclick = () => {
  try {
    const s = decodeSave($("#importCode").value);
    if (!s.player || !s.npcs) throw 0;
    if (isOldStory(s)) { $("#importMsg").textContent = "That save is from the old story and can't continue in the new world."; return; }
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
  $("#tier").value = settings.tier; $("#speed").value = String(settings.speed); $("#apiModel").value = settings.apiModel;
  $("#fxCombat").checked = settings.fx.combat; $("#fxStory").checked = settings.fx.story; $("#fxShake").checked = settings.fx.shake; $("#fxSea").checked = settings.fx.sea;
  $("#apiKey").value = store.get("tsl_apikey") || "";
  show("settings");
}
$("#setBtn").onclick = openSettings;
// effects switches
let fxBefore = null;
function applyFx(next) {
  settings.fx = next; saveSettingsLocal();
  if (!next.story && !next.combat) fx.innerHTML = "";
  Sea.setAnimated(next.sea);
  renderFxBtn();
}
$("#fxAllOff").onclick = () => { ["#fxCombat", "#fxStory", "#fxShake", "#fxSea"].forEach((id) => ($(id).checked = false)); };
$("#fxBtn").onclick = () => {
  const any = Object.values(settings.fx).some(Boolean);
  if (any) { fxBefore = { ...settings.fx }; applyFx({ combat: false, story: false, shake: false, sea: false }); }
  else applyFx(fxBefore || { combat: true, story: true, shake: true, sea: true });
};
$("#menuSettings").onclick = () => { hide("menu"); openSettings(); };
$("#saveSettings").onclick = () => {
  settings.tier = $("#tier").value; settings.speed = +$("#speed").value; settings.apiModel = $("#apiModel").value;
  applyFx({ combat: $("#fxCombat").checked, story: $("#fxStory").checked, shake: $("#fxShake").checked, sea: $("#fxSea").checked });
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
renderFxBtn();
(async function boot() {
  $("#engineStatus").innerHTML = engineText();
  await Engine.detect();
  $("#engineStatus").innerHTML = engineText();
})();
