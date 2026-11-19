// Leonida Trophy Guide: checklist, filters, spoiler mode, export/import and roadmap.
// Data comes from data/trophies.js (window.GTA6_TROPHIES); nothing is fetched,
// so the guide opens from file:// as well as from a static server.
const DATA = window.GTA6_TROPHIES;
const TROPHIES = DATA.trophies;
const STORE_KEY = 'gta6-trophy-guide-v1';
const SPOILER_KEY = 'gta6-trophy-guide-spoiler';

const KIND_LABELS = {
  story: 'Story', 'side-story': 'Side story', activity: 'Activity',
  collectible: 'Collectible', challenge: 'Challenge', robbery: 'Robbery',
  exploration: 'Exploration', milestone: 'Milestone', misc: 'Other',
};

const ROADMAP = [
  {
    title: '0 · Before you start',
    hours: '10 minutes of setup',
    text: 'The game has no mission replay and no New Game Plus, so your saves are your safety net.',
    bullets: [
      'Keep a manual save at the start of every chapter, plus one untouched save from just before the final mission. The game has 15 manual save slots plus one autosave.',
      'Never use cheats on your trophy save: cheats should switch off trophies and saving.',
      'Do Lucia\u2019s balcony meditation in Chapter 1 (see the missable trophy below) and keep a Chapter 1 save until Positive Mental Attitude pops.',
    ],
    trophies: '',
  },
  {
    title: '1 · Play the story',
    hours: '60–80 hours',
    text: 'The story carries 12 unmissable trophies with it. Do optional missions as they appear and scan vehicles as you go.',
    bullets: [
      'Finish the four chapters and the final mission; character switching between Jason and Lucia opens right after Breakfast Run in Chapter 2.',
      'Meditate with Lucia on the balcony of Jason\u2019s house in Chapter 1 — the one missable moment in the game.',
      'Keep the chapter saves from stage 0; you cannot replay a mission you rushed past.',
    ],
    trophies: 'Just Like Paradise · Paradise Lost · T**s Ass Drug Money · Vice City, Baby! · Top Of The World, Ma · You Gotta Know When to Get Off · Trust · Break the Bank · Family Matters · DWNFALL · Hi-Jacked · Snow Storm',
  },
  {
    title: '2 · Side stories',
    hours: 'alongside the story',
    text: 'Six questlines each end in a trophy, and eight stranger strands make a seventh. All of them stay open after the credits.',
    bullets: [
      'Andy\u2019s questline is Lucia-only; Tyrone\u2019s and Bret\u2019s are Jason-only.',
      'For Strangers & Freaks, only some questlines count — Andy\u2019s, Billy\u2019s and Tyrone\u2019s do not, because they have their own trophies. Check the trophy\u2019s progress counter after each strand.',
      'Do the Chapter 3 race Race Against Yago the moment it appears: it is time-sensitive (hourglass icon).',
    ],
    trophies: 'Road to Rehabilitation · This Was No Boat Accident · The Lone Rider · Supply & Demand · Spin On This! · Fair Game · Strangers & Freaks',
  },
  {
    title: '3 · Activities and collectibles',
    hours: 'do them as they open',
    text: 'The bulk of the list is out in the open world. Sample everything once for Master of None, then grind the counted ones.',
    bullets: [
      'Shooting Range: gold medals in all 42 challenges, across the two ranges. Top Fun: one drone-race win at each of the 14 locations.',
      'Cards: 3 full sets. WAiNK: 100 locations — scanning traffic counts for vehicles too. Vehicles: 100 discovered (200 for 100%).',
      'Money: 8 garages (about $160,000) after Daily Driver; 10 Scooter Bros registrations after Moses; $100,000 spent in shops.',
    ],
    trophies: 'Cunning Stunts · Master of None · The Shootist · Top Fun · Earn Cash, Not Kudos · Baited My Tackle · Stick Fiddler · Don\u2019t Touch My Deck · You WAiNKer! · Whip It Good · Little Boxes · On the Spot · Treat Yo Self',
  },
  {
    title: '4 · Robberies and combat',
    hours: 'Chapters 3–4',
    text: 'The tools for these arrive through story and optional missions in the middle of the game, so most of this stage waits until then.',
    bullets: [
      'Jewelry stores open with the Snap Gun from Yasmani\u2019s Jewelry Jobs (Chapter 3). Bank vaults open through That\u2019s Where The Money Is, an optional mission near the end of Chapter 4 — bring your partner, you cannot carry all the bags alone.',
      'Rob 3 shops in a row with your partner without letting the Wanted Level drop, and escape a 4-star Wanted Level with your partner: one vault job can earn both.',
      'Combat Focus (L3 + R3 while aiming) for 5 kills in one use; a jet from a VCIA boarding bridge (gates E3 and E4); a tank from Mile Zero Air Station.',
    ],
    trophies: 'Sneakthief · Retail Therapy · Hot Together · Maximum Withdrawal · A Classic Blitz Play · Pest Control · Dime on the Dollar · Gunslinger · Catch Me If You Can · Challenging Tank',
  },
  {
    title: '5 · 100% completion and cleanup',
    hours: 'about 100 hours',
    text: 'The 100% checklist appears under Progress > Stats > 100% Completion only after the story, but work done earlier still counts. This stage is the last trophy for most players.',
    bullets: [
      '300 stunts (the trophy needs 250), 70 of the 80 Challenges (the trophy needs 50), all 8 bank vaults, all 39 illegal operations, 200 of the 277 vehicles.',
      'Then finish any strands, collectibles and miscellaneous trophies left over. A Long Road pops, and with it the platinum: Vice Got a Price!',
    ],
    trophies: 'A Long Road · One Last Thing · Actions Speak Louder · The Goodtime State · Vice Got a Price!',
  },
];

const SOURCES = [
  { name: 'Output Lag — GTA 6 Trophy List: All 55 Trophies and Achievements', domain: 'outputlag.com', what: 'The full list, the split of 27 visible and 28 hidden trophies, the one missable trophy, the roadmap numbers (200 hours, 300 stunts, 70 Challenges, 8 vaults, 39 operations) and most unlock tips.' },
  { name: 'GTA Vibes — GTA 6 Trophy List: All 55 Trophies and Achievements', domain: 'gtavibes.com', what: 'The full list, the one missable trophy and the platinum roadmap (story 60–80 hours, then 100% checklist, then cleanup).' },
  { name: 'KeenGamer — GTA 6 Trophy Guide & Platinum Roadmap, All 55 Trophies', domain: 'keengamer.com', what: 'The platinum roadmap and the missable-trophy warning; confirms 55 trophies with 1 missable (Positive Mental Attitude).' },
  { name: 'all.gg — Every GTA 6 PSN Trophy', domain: 'all.gg', what: 'The PSN trophy list as published, confirming the story trophies and their order.' },
  { name: 'Exophase and PSNProfiles trophy databases', domain: 'exophase.com · psnprofiles.com', what: 'The trophy databases the kit\u2019s official list was cross-checked against for every name, description and grade.' },
];

// ---- state ----
const params = new URLSearchParams(location.search);
let earned = new Set();
try { earned = new Set(JSON.parse(localStorage.getItem(STORE_KEY) ?? '[]')); } catch { earned = new Set(); }
earned = new Set([...earned].filter((id) => TROPHIES.some((t) => t.id === id)));
if (params.has('earned')) {
  earned = new Set(params.get('earned').split(',').map(Number).filter((id) => TROPHIES.some((t) => t.id === id)));
}
let spoiler = localStorage.getItem(SPOILER_KEY) === '1';
if (params.get('spoiler') === 'on') spoiler = true;
if (params.get('spoiler') === 'off') spoiler = false;

const $ = (id) => document.getElementById(id);
const listEl = $('list');
const searchEl = $('search');
const gradeEl = $('grade');
const kindEl = $('kind');
const missableOnlyEl = $('missable-only');
const hideEarnedEl = $('hide-earned');
const spoilerEl = $('spoiler');

function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify([...earned].sort((a, b) => a - b))); } catch { /* private mode */ }
  try { localStorage.setItem(SPOILER_KEY, spoiler ? '1' : '0'); } catch { /* private mode */ }
}

function isHiddenFromReader(t) {
  return spoiler && t.hidden && !earned.has(t.id);
}

function visibleText(t) {
  if (isHiddenFromReader(t)) return 'hidden trophy hidden earn it to reveal';
  return `${t.name} ${t.description} ${t.guide}`.toLowerCase();
}

function matchesFilters(t) {
  const q = searchEl.value.trim().toLowerCase();
  if (q && !visibleText(t).includes(q)) return false;
  if (gradeEl.value !== 'all' && t.grade !== gradeEl.value) return false;
  if (kindEl.value !== 'all' && t.kind !== kindEl.value) return false;
  if (missableOnlyEl.checked && !t.missable) return false;
  if (hideEarnedEl.checked && earned.has(t.id)) return false;
  return true;
}

function gradeBadge(t) {
  const s = document.createElement('span');
  s.className = `badge ${t.grade}`;
  s.textContent = t.grade;
  return s;
}

function renderList() {
  const shown = TROPHIES.filter(matchesFilters);
  listEl.replaceChildren();
  $('empty').hidden = shown.length > 0;
  for (const t of shown) {
    const card = document.createElement('article');
    card.className = 'card' + (earned.has(t.id) ? ' earned' : '') + (t.missable ? ' missable-card' : '');
    card.dataset.trophyId = String(t.id);
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = earned.has(t.id);
    box.setAttribute('aria-label', `Mark ${t.name} earned`);
    box.addEventListener('change', () => {
      if (box.checked) earned.add(t.id); else earned.delete(t.id);
      save();
      renderAll();
    });
    const body = document.createElement('div');
    const head = document.createElement('div');
    head.className = 'card-head';
    const h = document.createElement('h3');
    h.textContent = isHiddenFromReader(t) ? 'Hidden trophy' : t.name;
    head.append(h, gradeBadge(t));
    const kindTag = document.createElement('span');
    kindTag.className = 'tag';
    kindTag.textContent = KIND_LABELS[t.kind] ?? t.kind;
    head.append(kindTag);
    if (t.hidden) {
      const ht = document.createElement('span');
      ht.className = 'tag hidden-tag';
      ht.textContent = 'Hidden on PSN';
      head.append(ht);
    }
    if (t.missable) {
      const mt = document.createElement('span');
      mt.className = 'tag missable';
      mt.textContent = 'Missable';
      head.append(mt);
    }
    body.append(head);
    const desc = document.createElement('p');
    desc.className = 'desc';
    desc.textContent = isHiddenFromReader(t)
      ? 'Hidden — earn it to reveal.'
      : `“${t.description}” — official description`;
    body.append(desc);
    const guide = document.createElement('p');
    guide.className = 'guide';
    if (isHiddenFromReader(t)) {
      const cover = document.createElement('span');
      cover.className = 'spoiler-cover';
      cover.textContent = 'Guide hidden until earned — turn off “Hide spoilers” to read it, or tick the trophy once you have it.';
      guide.append(cover);
    } else {
      const label = document.createElement('span');
      label.className = 'guide-label';
      label.textContent = 'How to get it — ';
      guide.append(label, document.createTextNode(t.guide));
    }
    body.append(guide);
    if (!isHiddenFromReader(t)) {
      const src = document.createElement('p');
      src.className = 'src';
      src.textContent = `Source: ${t.source}`;
      body.append(src);
    }
    card.append(box, body);
    listEl.append(card);
  }
  $('count-line').textContent = `Showing ${shown.length} of ${TROPHIES.length} trophies · ${earned.size} earned`;
}

function renderProgress() {
  const total = TROPHIES.length;
  const pct = Math.round((earned.size / total) * 100);
  $('earned-count').textContent = String(earned.size);
  $('bar-fill').style.width = `${pct}%`;
  $('progress-sub').textContent = `${pct}% to the platinum`;
  const counts = {};
  for (const t of TROPHIES) counts[t.grade] = (counts[t.grade] ?? 0) + 1;
  const got = {};
  for (const id of earned) {
    const t = TROPHIES.find((x) => x.id === id);
    if (t) got[t.grade] = (got[t.grade] ?? 0) + 1;
  }
  $('grade-counts').innerHTML = '';
  const parts = ['platinum', 'gold', 'silver', 'bronze'].map((g) => {
    const b = document.createElement('b');
    b.textContent = `${got[g] ?? 0}/${counts[g]} ${g}`;
    return b;
  });
  parts.forEach((b, i) => {
    if (i > 0) $('grade-counts').append(document.createTextNode(' · '));
    $('grade-counts').append(b);
  });
}

function renderRoadmap() {
  const host = $('roadmap');
  host.replaceChildren();
  const warn = document.createElement('div');
  warn.className = 'warn';
  const strong = document.createElement('strong');
  strong.textContent = 'The one missable trophy: Positive Mental Attitude. ';
  warn.append(strong, document.createTextNode('Meditate at every spot across Leonida. Lucia\u2019s balcony meditation in Chapter 1 disappears after that chapter, and there is no mission replay. Do it in Chapter 1 and keep a Chapter 1 save. The Chapter 3 race Race Against Yago is also time-sensitive — do it the moment it appears.'));
  host.append(warn);
  for (const stage of ROADMAP) {
    const div = document.createElement('section');
    div.className = 'stage';
    const h = document.createElement('h3');
    h.textContent = stage.title;
    const hours = document.createElement('span');
    hours.className = 'hours';
    hours.textContent = stage.hours;
    h.append(hours);
    div.append(h);
    const p = document.createElement('p');
    p.textContent = stage.text;
    div.append(p);
    const ul = document.createElement('ul');
    for (const b of stage.bullets) {
      const li = document.createElement('li');
      li.textContent = b;
      ul.append(li);
    }
    div.append(ul);
    if (stage.trophies) {
      const names = document.createElement('p');
      names.className = 'trophy-names';
      names.textContent = `Trophies: ${stage.trophies}`;
      div.append(names);
    }
    host.append(div);
  }
}

function renderSources() {
  const host = $('sources');
  host.replaceChildren();
  for (const s of SOURCES) {
    const li = document.createElement('li');
    const b = document.createElement('b');
    b.textContent = s.name;
    li.append(b, document.createTextNode(` (${s.domain}) — ${s.what}`));
    host.append(li);
  }
}

function renderAll() {
  renderProgress();
  renderList();
  $('spoiler-note').hidden = !spoiler;
}

function setView(name) {
  for (const btn of document.querySelectorAll('.tab')) {
    btn.classList.toggle('active', btn.dataset.view === name);
  }
  $('view-checklist').hidden = name !== 'checklist';
  $('view-roadmap').hidden = name !== 'roadmap';
  $('view-sources').hidden = name !== 'sources';
}

// ---- wiring ----
for (const btn of document.querySelectorAll('.tab')) {
  btn.addEventListener('click', () => setView(btn.dataset.view));
}
for (const el of [searchEl, gradeEl, kindEl, missableOnlyEl, hideEarnedEl]) {
  el.addEventListener('input', renderList);
  el.addEventListener('change', renderList);
}
spoilerEl.addEventListener('change', () => {
  spoiler = spoilerEl.checked;
  save();
  renderAll();
});
$('show-missable').addEventListener('click', () => {
  searchEl.value = '';
  gradeEl.value = 'all';
  kindEl.value = 'all';
  missableOnlyEl.checked = true;
  hideEarnedEl.checked = false;
  renderList();
  const card = listEl.querySelector('[data-trophy-id="28"]');
  if (card) card.scrollIntoView({ block: 'center' });
});
$('export').addEventListener('click', () => {
  const payload = {
    game: 'Grand Theft Auto VI',
    guide: 'Leonida Trophy Guide',
    exportedAt: new Date().toISOString(),
    earned: [...earned].sort((a, b) => a - b).map((id) => {
      const t = TROPHIES.find((x) => x.id === id);
      return { id, name: t ? t.name : '' };
    }),
  };
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }));
  a.download = 'gta6-trophy-progress.json';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});
$('import').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const raw = JSON.parse(await file.text());
    const arr = Array.isArray(raw) ? raw : raw.earned;
    if (!Array.isArray(arr)) throw new Error('no earned list');
    const next = new Set();
    for (const item of arr) {
      const id = typeof item === 'number' ? item : item.id;
      const name = typeof item === 'string' ? item : item.name;
      const t = TROPHIES.find((x) => x.id === id || (name && x.name === name));
      if (t) next.add(t.id);
    }
    earned = next;
    save();
    renderAll();
  } catch {
    alert('That file is not a trophy progress export from this guide.');
  }
  e.target.value = '';
});
$('reset').addEventListener('click', () => {
  if (confirm('Clear all earned trophies?')) {
    earned = new Set();
    save();
    renderAll();
  }
});

// ---- start from the URL, so screenshots can open any view ----
if (params.get('view') === 'roadmap' || params.get('view') === 'sources') setView(params.get('view'));
if (params.get('grade')) gradeEl.value = params.get('grade');
if (params.get('kind')) kindEl.value = params.get('kind');
if (params.get('missable') === '1') missableOnlyEl.checked = true;
if (params.get('hideearned') === '1') hideEarnedEl.checked = true;
if (params.get('search')) searchEl.value = params.get('search');
spoilerEl.checked = spoiler;
save();
renderRoadmap();
renderSources();
renderAll();
if (params.get('open')) {
  const card = listEl.querySelector(`[data-trophy-id="${params.get('open')}"]`);
  if (card) card.scrollIntoView({ block: 'center' });
}
window.__shotReady = true;
