/* ========= CONFIGURABLE CONSTANTS ========= */
const BASE_EXPERIENCE = 50;           // XP to reach Lv1
const LEVEL_MULTIPLIER = 1.7;         // growth factor
const LICHESS_TOKEN = window.LICHESS_API_TOKEN || '';

/* ========= THEME ========== */
const themeToggle = document.getElementById('theme-toggle');
initTheme();
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  themeToggle.innerHTML = saved === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}
themeToggle.onclick = () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  initTheme();
};

/* ========= GLOBAL STATE ========= */
let allPlayers = [];
let currentPage = 1;
const perPage   = 10;
const TEAM_ID   = 'unicorn7love-fun-club';

/* ========= GITHUB CSV ========= */
const GH_OWNER = 'toxicmarquis';
const GH_REPO  = 'uni7club';
const GH_FOLDER = 'tournaments';
async function listCsv() {
  const url = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FOLDER}`;
  const r   = await fetch(url);
  if (!r.ok) return [];
  return (await r.json())
    .filter(f => f.type === 'file' && f.name.startsWith('lichess_tournament_') && f.name.endsWith('.csv'))
    .map(f => ({name: f.name, url: f.download_url}));
}
async function loadCsv(file) {
  const txt = await (await fetch(file.url)).text();
  const [head, ...rows] = txt.trim().split('\n');
  const keys = head.split(',');
  const d    = file.name.match(/(\\d{4})\\.(\\d{2})\\.(\\d{2})/);
  const date = d ? `${d[1]}-${d[2]}-${d[3]}` : '-';
  return rows.map(r => {
    const obj = {};
    r.split(',').forEach((v, i) => (obj[keys[i].trim()] = v.trim()));
    obj.tournament_date = date;
    return obj;
  });
}

/* ========= LEVEL / XP ========= */
function xpToLevel(score, attends, perf) {
  const xp = score * 10 + attends * 25 + Math.floor(perf / 100);
  let lvl = 0, need = BASE_EXPERIENCE, spent = 0;
  while (xp >= spent + need) {
    spent += need;
    lvl++;
    need = Math.floor(BASE_EXPERIENCE * Math.pow(LEVEL_MULTIPLIER, lvl));
  }
  return { level: lvl, cur: xp - spent, next: need, pct: Math.floor((xp - spent) * 100 / need) };
}

/* ========= AGGREGATION ========= */
function aggregate(raw) {
  const map = {};
  raw.forEach(r => {
    if (r.Team !== TEAM_ID) return;
    const u = r.Username;
    map[u] ||= { u, score: 0, perf: [], rate: [], dates: [] };
    map[u].score += +r.Score || 0;
    map[u].perf.push(+r.Performance || 0);
    map[u].rate.push(+r.Rating || 0);
    map[u].dates.push(r.tournament_date);
  });
  return Object.values(map).map(p => {
    const avgPerf = p.perf.length ? Math.round(p.perf.reduce((a, b) => a + b) / p.perf.length) : 0;
    const lvl     = xpToLevel(p.score, p.dates.length, avgPerf);
    return {
      username: p.u,
      total_score: p.score,
      avg_performance: avgPerf,
      max_performance: Math.max(...p.perf, 0),
      avg_rating: p.rate.length ? Math.round(p.rate.reduce((a, b) => a + b) / p.rate.length) : 0,
      first_tournament: p.dates.sort()[0] || '-',
      tournaments: p.dates.length,
      utility: p.score * 1_000_000 + p.dates.length * 1_000 + avgPerf,
      ...lvl
    };
  });
}

/* ========= UI HELPERS ========= */
function qs(sel, ctx = document) { return ctx.querySelector(sel); }
function qsa(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

/* ========= TOP-5 ========= */
async function renderTop5(list) {
  const top5 = [...list].sort((a, b) => b.total_score - a.total_score || b.tournaments - a.tournaments || b.avg_performance - a.avg_performance).slice(0, 5);
  top5.forEach((p, i) => {
    const card = qs(`.top-player[data-rank="${i + 1}"]`);
    if (!card) return;
    qs('.player-name', card).textContent     = p.username;
    qs('.level-number', card).textContent    = p.level;
    qs('.experience-fill', card).style.width = `${p.pct}%`;
    card.style.setProperty('--progress', `${p.pct}%`);
    qs('.first-date', card).textContent      = p.first_tournament;
    // numeric indicators
    qsa('.rating-value', card).forEach((el, k) => {
      if (k === 0) el.textContent = p.avg_rating;           // simple reuse
      if (k === 1) el.textContent = p.avg_performance;
    });
    // title (local DB, then API – omitted here for brevity, add if needed)
  });
}

/* ========= TABLE ========= */
function renderTable(list, page = 1) {
  currentPage = page;
  const search = qs('#playerSearch').value.toLowerCase();
  const sort   = qs('#sortSelect').value;
  let arr = list.filter(p => p.username.toLowerCase().includes(search));
  arr.sort((a, b) => {
    if (sort === 'avg_performance') return b.avg_performance - a.avg_performance;
    if (sort === 'tournaments')     return b.tournaments - a.tournaments;
    if (sort === 'total_score')     return b.total_score - a.total_score;
    return b.utility - a.utility;            // default
  });
  const tbody = qs('#playersTableBody');
  tbody.innerHTML = '';
  arr.slice((page - 1) * perPage, page * perPage).forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><a href="#" class="player-link" data-u="${p.username}">${p.username}</a></td>
      <td>${p.total_score}</td><td>${p.max_performance}</td>
      <td>${p.avg_performance}</td><td>${p.avg_rating}</td>
      <td>${p.tournaments}</td><td>${p.first_tournament}</td>`;
    tbody.appendChild(tr);
  });
  qs('#pageInfo').textContent = `Стр. ${page} из ${Math.max(1, Math.ceil(arr.length / perPage))}`;
  qs('#prevPage').disabled = page === 1;
  qs('#nextPage').disabled = page * perPage >= arr.length;
  qsa('.player-link').forEach(a => a.onclick = e => { e.preventDefault(); showModal(e.currentTarget.dataset.u); });
}

/* ========= MODAL ========= */
function showModal(user) {
  const ply = allPlayers.find(p => p.username === user);
  if (!ply) return;
  const m = qs('#playerModal'), c = qs('#modalContent');
  c.innerHTML = `
    <h2>${ply.username}</h2>
    <div class="level-bar">
      <span class="level-number">Lv${ply.level}</span>
      <div class="experience-bar"><div class="experience-fill" style="width:${ply.pct}%"></div></div>
      <span>${ply.cur} / ${ply.next}</span>
    </div>
    <p>Первый турнир: ${ply.first_tournament}</p>
    <p>Bullet 🚀: ${ply.avg_rating}</p>
    <p>Blitz 🔥: ${ply.avg_performance}</p>
    <a href="https://lichess.org/@/${ply.username}" target="_blank">Профиль Lichess</a>`;
  m.style.display = 'block';
}
qs('.close').onclick = () => (qs('#playerModal').style.display = 'none');
window.onclick = e => { if (e.target === qs('#playerModal')) qs('#playerModal').style.display = 'none'; };

/* ========= LIVE GAME ========= */
async function liveGame() {
  const box = qs('#liveGameContainer');
  if (!box) return;
  box.innerHTML = '<div class="loading">Загрузка…</div>';
  try {
    const topNames = allPlayers.slice(0, 20).map(p => p.username).join(',');
    const sRes = await fetch('https://lichess.org/api/users/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                 ...(LICHESS_TOKEN ? { Authorization: `Bearer ${LICHESS_TOKEN}` } : {}) },
      body: topNames
    });
    const statuses = await sRes.json();
    const playing  = statuses.find(u => u.playing);
    if (playing) {
      box.innerHTML = `<iframe src="https://lichess.org/embed/game/${playing.playing}?theme=auto" allowtransparency="true"></iframe>`;
      return;
    }
    // fallback
    box.innerHTML = '<iframe src="https://lichess.org/embed/tv/bullet?theme=auto" allowtransparency="true"></iframe>';
  } catch (e) {
    console.error(e);
    box.textContent = 'Не удалось загрузить трансляцию.';
  }
}

/* ========= INIT ========= */
async function init() {
  const files = await listCsv();
  let raw = [];
  for (const f of files) raw = raw.concat(await loadCsv(f));
  allPlayers = aggregate(raw);
  renderTop5(allPlayers);
  renderTable(allPlayers);
  liveGame();
}
document.addEventListener('DOMContentLoaded', () => {
  init();
  qs('#playerSearch').oninput = () => renderTable(allPlayers, 1);
  qs('#sortSelect').onchange  = () => renderTable(allPlayers, 1);
  qs('#prevPage').onclick     = () => renderTable(allPlayers, currentPage - 1);
  qs('#nextPage').onclick     = () => renderTable(allPlayers, currentPage + 1);
});
