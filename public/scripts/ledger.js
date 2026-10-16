(function () {
  const root = document.querySelector('.hai');
  if (!root || root.dataset.ledgerBooted) return;
  root.dataset.ledgerBooted = '1';

  const PHASES = ['Idea', 'Active', 'Blocked', 'Paused', 'Done'];
  const DEFAULT_TARGET = 20;

  const $ = (id) => document.getElementById(id);
  const listEl = $('list'), attnEl = $('attention'), statusEl = $('status'),
        meEl = $('me'), slotEl = $('slot'), dlEl = $('deadline');

  let state = null, me = '', meId = '', openId = null, filter = 'all', mode = null;
  let fellowNames = []; // current fellows, offered when adding a volunteer
  const hist = { month: null, week: 'all', proj: 'all', pm: 'all', year: null };
  let person = null; // { pid, own, page }: the "all records" screen for one person
  const RECORDS_PER_PAGE = 5;

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Math.random().toString(36).slice(2, 9);
  const now = () => new Date().toISOString();
  const short = (iso) => new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fullDate = (iso) => {
    const d = new Date(iso);
    return WEEKDAYS[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  };

  const pad2 = (n) => String(n).padStart(2, '0');
  const ymd = (d) => d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  // Built from local date parts, not toISOString(): that converts to UTC first,
  // which moves Monday to Sunday for anyone east of Greenwich.
  function weekKey(d) {
    const x = new Date(d || Date.now());
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
    return ymd(x);
  }
  const thisWeek = () => weekKey();
  const weekLabel = (k) => 'week of ' + new Date(k + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  function cutoff(k) {
    const d = new Date(k + 'T00:00:00');
    d.setDate(d.getDate() + 4); // Monday + 4 = Friday
    d.setHours(18, 0, 0, 0);
    return d;
  }

  const target = (p) => (p.target == null ? DEFAULT_TARGET : Number(p.target));
  const pmHours = (p, k) => (p.weeks || []).filter((w) => w.week === k).reduce((s, w) => s + (Number(w.hours) || 0), 0);
  const memberHours = (m, k) => (m.weeks || []).filter((w) => w.week === k).reduce((s, w) => s + (Number(w.hours) || 0), 0);
  const teamHours = (p, k) => (p.team || []).reduce((s, m) => s + memberHours(m, k), 0);
  const filed = (p, k) => (p.weeks || []).some((w) => w.week === k) ||
    (p.notes || []).some((n) => n.week === k) ||
    (p.team || []).some((m) => (m.weeks || []).some((w) => w.week === k));
  const notesIn = (p, k) => (p.notes || []).filter((n) => n.week === k);

  /* ---------- weekly details ----------
     Every person (the PM, and each volunteer) has a list of weekly entries:
     { week, hours, task, next }. One entry per person per week. The ledger
     shows the current month's entries under each person; earlier months are
     read from the History window. A week belongs to the month its Monday is in. */

  const monthOf = (wk) => wk.slice(0, 7);
  const thisMonth = () => monthOf(thisWeek());
  const monthLabel = (mk) => MONTHS[Number(mk.slice(5, 7)) - 1] + ' ' + mk.slice(0, 4);
  const weekShort = (k) => new Date(k + 'T00:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  // "Friday, Sep 25" (the year is added only when it is not the current one).
  const dayDate = (iso) => {
    const d = new Date(iso);
    return WEEKDAYS[d.getDay()] + ', ' + short(iso) + (d.getFullYear() !== new Date().getFullYear() ? ', ' + d.getFullYear() : '');
  };
  const weekRange = (k) => {
    const a = new Date(k + 'T00:00:00'), e = addDays(k, 6), b = new Date(e + 'T00:00:00');
    return WEEKDAYS[a.getDay()].slice(0, 3) + ', ' + weekShort(k) + ' to ' + WEEKDAYS[b.getDay()].slice(0, 3) + ', ' + weekShort(e);
  };
  const weekNo = (k) => Math.ceil(Number(k.slice(8, 10)) / 7);
  const addDays = (k, n) => { const d = new Date(k + 'T00:00:00'); d.setDate(d.getDate() + n); return ymd(d); };
  const byWeek = (a, b) => (a.week < b.week ? -1 : a.week > b.week ? 1 : 0);
  const entryOf = (list, k) => (list || []).find((w) => w.week === k) || null;

  // A volunteer has at most one entry per week. A PM can have several work
  // items in the same week, so the PM's list may hold more than one row per week.
  const pmItems = (p, k) => (p.weeks || []).filter((w) => w.week === k);
  const itemLine = (w) => w.task + (Number(w.hours) > 0 ? ' (' + w.hours + ' hrs)' : '');

  // Every Monday that falls in month mk ("YYYY-MM"): the weeks that belong to it.
  function weeksOfMonth(mk) {
    const out = [], d = new Date(mk + '-01T00:00:00');
    while (d.getDay() !== 1) d.setDate(d.getDate() + 1);
    for (; monthOf(ymd(d)) === mk; d.setDate(d.getDate() + 7)) out.push(ymd(d));
    return out;
  }

  // Mondays of the current month, up to and including this week.
  function currentMonthWeeks() {
    const out = [], mk = thisMonth();
    for (let k = thisWeek(); monthOf(k) === mk; k = addDays(k, -7)) out.unshift(k);
    return out;
  }

  // Create/update the entry for week k; an entry left with no hours and no text is dropped.
  function setEntry(list, k, patch) {
    let e = entryOf(list, k);
    if (!e) { e = { week: k, hours: 0, task: '', next: '' }; list.push(e); }
    Object.assign(e, patch);
    if (!(Number(e.hours) > 0) && !e.task && !e.next) list.splice(list.indexOf(e), 1);
    return e;
  }

  // The PM's list: work items with text stay separate; the bare hours-only rows
  // that older versions stacked up in one week are folded into a single row.
  function mergePmWeeks(list) {
    const out = [], bare = new Map();
    (list || []).forEach((w) => {
      const item = { week: w.week, hours: Number(w.hours) || 0, task: w.task || '', next: w.next || '', who: w.who || '' };
      if (!item.task && !item.next) {
        const b = bare.get(w.week);
        if (b) { b.hours += item.hours; if (item.who) b.who = item.who; return; }
        bare.set(w.week, item);
      }
      out.push(item);
    });
    return out.sort(byWeek);
  }

  // Older data could hold several hours rows for the same week (hours used to
  // just stack). Fold them into one entry so each week has a single row.
  function mergeWeeks(list) {
    const by = new Map();
    (list || []).forEach((w) => {
      const e = by.get(w.week) || { week: w.week, hours: 0, task: '', next: '' };
      e.hours += Number(w.hours) || 0;
      if (w.task) e.task = w.task;
      if (w.next) e.next = w.next;
      if (w.who) e.who = w.who;
      by.set(w.week, e);
    });
    return Array.from(by.values()).sort(byWeek);
  }

  // What a volunteer did in week k. Volunteers created before weekly details
  // existed only have a single role/next on their row, so for the current week
  // (and only until they log anything) that older text is shown instead.
  const fieldFor = (m, k, f, legacy) => {
    const e = entryOf(m.weeks, k);
    if (e && e[f]) return e[f];
    return k === thisWeek() && !(m.weeks || []).some((w) => w[f]) ? (legacy || '') : '';
  };
  const taskFor = (m, k) => fieldFor(m, k, 'task', m.role);
  const nextFor = (m, k) => fieldFor(m, k, 'next', m.next);

  // Keep the row-level role/next equal to the most recent weekly text.
  function syncLatest(m) {
    const ws = (m.weeks || []).slice().sort(byWeek).reverse();
    const t = ws.find((w) => w.task), n = ws.find((w) => w.next);
    if (t) m.role = t.task;
    if (n) m.next = n.next;
  }

  // "Monday, Sep 28 · 3:42 PM" in the viewer's own time zone. Every update is
  // stored with the moment it was made, so this never shows a week's date.
  const stamp = (iso) => dayDate(iso) + ' \u00b7 ' + new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  const lastUpdate = (m, k) => (m.log || []).filter((l) => l.week === k).sort((a, b) => (a.at < b.at ? 1 : -1))[0] || null;

  // Change one volunteer's entry for week k AND add a timestamped record of it
  // to their update trail (shown in All records). Returns false, recording
  // nothing, when the values are the same as what is already saved.
  function recordUpdate(m, k, patch) {
    const cur = entryOf(m.weeks, k) || {};
    const val = {
      task: patch.task !== undefined ? patch.task : cur.task || '',
      next: patch.next !== undefined ? patch.next : cur.next || '',
      hours: patch.hours !== undefined ? Number(patch.hours) || 0 : Number(cur.hours) || 0
    };
    if (val.task === (cur.task || '') && val.next === (cur.next || '') && val.hours === (Number(cur.hours) || 0)) return false;
    setEntry(m.weeks, k, val);
    // One record per week: a later update for the same week replaces the earlier
    // one, so All records shows the week as it finally stood, not every edit.
    m.log = (m.log || []).filter((l) => l.week !== k);
    m.log.push({ week: k, task: val.task, next: val.next, hours: val.hours, who: me || '', at: now() });
    syncLatest(m);
    return true;
  }

  // The PM's counterpart of recordUpdate. A PM week holds several work items.
  // p.weeks always holds the full current set (so hours/exports/history stay
  // correct), but the RECORD added to pmLog holds only the items that are new
  // or changed since the last update -- an item already logged earlier is not
  // repeated every time another item is added, which is what made "All
  // records" show the same work item duplicated across consecutive updates.
  function recordPmUpdate(p, k, items) {
    const before = pmItems(p, k);
    const clean = items.map((w) => ({ week: k, hours: Number(w.hours) || 0, task: w.task || '', next: w.next || '', who: w.who || me || p.pm || '' }));
    const sig = (arr) => JSON.stringify(arr.map((w) => [w.task || '', w.next || '', Number(w.hours) || 0]));
    if (sig(before) === sig(clean)) return false;

    const beforeByTask = new Map();
    before.forEach((w) => { if (w.task) beforeByTask.set(w.task, w); });
    const changed = clean.filter((w) => {
      const match = w.task ? beforeByTask.get(w.task) : null;
      if (!match) return true; // new item, or one with no task text yet
      return Number(match.hours) !== w.hours || (match.next || '') !== w.next;
    });

    p.weeks = p.weeks.filter((w) => w.week !== k).concat(clean).sort(byWeek);
    (p.pmLog = p.pmLog || []).push({
      week: k, next: '', task: clean.map((w) => w.task).filter(Boolean).join('; '),
      hours: clean.reduce((sum, w) => sum + w.hours, 0),
      items: (changed.length ? changed : clean).map((w) => ({ task: w.task, next: w.next, hours: w.hours })),
      who: me || '', at: now()
    });
    return true;
  }

  function pmUpdText(p, k) {
    const u = (p.pmLog || []).filter((l) => l.week === k).sort((a, b) => (a.at < b.at ? 1 : -1))[0];
    if (u) return 'Updated ' + stamp(u.at) + (u.who ? ' by ' + u.who : '');
    return pmItems(p, k).length ? 'Saved earlier, no timestamp was recorded' : 'No update recorded for this week yet';
  }

  // Text under a volunteer's row: when THIS week's details were last updated.
  function updText(m, k) {
    const u = lastUpdate(m, k);
    if (u) return 'Updated ' + stamp(u.at) + (u.who ? ' by ' + u.who : '');
    return entryOf(m.weeks, k) ? 'Saved earlier, no timestamp was recorded' : 'No update recorded for this week yet';
  }

  // Grey hint showing the last thing logged before week k.
  function lastBefore(list, k, f, legacy) {
    const prev = (list || []).filter((w) => w.week < k && w[f]).sort(byWeek).reverse()[0];
    const v = prev ? prev[f] : legacy;
    return v ? 'Last: ' + (v.length > 60 ? v.slice(0, 57) + '...' : v) : '';
  }
  const byName = (a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
  // A volunteer is added once and then stays on the project; every later week
  // just logs more hours against that same row. This is what stops "Add
  // volunteer" from silently creating a second row -- and splitting that
  // person's hours in two -- when someone re-adds a name that is already there.
  const findMember = (p, name) => (p.team || []).find(
    (m) => (m.name || '').trim().toLowerCase() === name.trim().toLowerCase()
  );
  // A volunteer must already have a fellow account.
  const isFellow = (name) => fellowNames.some((f) => f.name.trim().toLowerCase() === name.trim().toLowerCase());
  const notAFellow = (name) => 'No fellow is called “' + name + '”. Pick a name from the list; HR adds new fellows in the admin dashboard.';
  const sorted = () => state.projects.slice().sort(byName);


  function promptModal(title, placeholder) {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.innerHTML =
        '<div class="modal-box">' +
          '<h3>' + esc(title) + '</h3>' +
          '<input type="text" placeholder="' + esc(placeholder || '') + '">' +
          '<div class="modal-actions">' +
            '<button data-cancel class="ghost">Cancel</button>' +
            '<button data-ok class="primary">OK</button>' +
          '</div>' +
        '</div>';
      document.querySelector('.hai').appendChild(overlay);
      const input = overlay.querySelector('input');
      input.focus();

      const finish = (value) => { overlay.remove(); resolve(value); };
      overlay.querySelector('[data-ok]').addEventListener('click', () => finish(input.value.trim() || null));
      overlay.querySelector('[data-cancel]').addEventListener('click', () => finish(null));
      overlay.addEventListener('click', (e) => { if (e.target === overlay) finish(null); });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') finish(input.value.trim() || null);
        if (e.key === 'Escape') finish(null);
      });
    });
  }

  function confirmModal(title, message, okLabel) {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.innerHTML =
        '<div class="modal-box">' +
          '<h3>' + esc(title) + '</h3>' +
          '<p class="modal-msg">' + esc(message) + '</p>' +
          '<div class="modal-actions">' +
            '<button data-cancel class="ghost">Cancel</button>' +
            '<button data-ok class="primary">' + esc(okLabel || 'OK') + '</button>' +
          '</div>' +
        '</div>';
      document.querySelector('.hai').appendChild(overlay);
      overlay.querySelector('[data-ok]').focus();

      const finish = (value) => { overlay.remove(); document.removeEventListener('keydown', onKey); resolve(value); };
      const onKey = (e) => { if (e.key === 'Escape') finish(false); };
      overlay.querySelector('[data-ok]').addEventListener('click', () => finish(true));
      overlay.querySelector('[data-cancel]').addEventListener('click', () => finish(false));
      overlay.addEventListener('click', (e) => { if (e.target === overlay) finish(false); });
      document.addEventListener('keydown', onKey);
    });
  }

  function say(msg, isErr) {
    statusEl.textContent = msg || '';
    statusEl.className = 'status' + (isErr ? ' err' : '');
    if (msg && !isErr) setTimeout(() => { if (statusEl.textContent === msg) say(''); }, 2600);
  }

  // Fills in anything a project from the server may leave out.
  function normalize(p) {
    ['team', 'notes', 'weeks', 'strands'].forEach((k) => { if (!Array.isArray(p[k])) p[k] = []; });
    if (p.pm == null) p.pm = '';
    if (p.email == null) p.email = '';
    if (p.target == null) p.target = DEFAULT_TARGET;
    p.weeks = mergePmWeeks(p.weeks);
    p.pmLog = Array.isArray(p.pmLog) ? p.pmLog : [];
    p.team.forEach((m) => {
      m.weeks = mergeWeeks(m.weeks);
      m.log = Array.isArray(m.log) ? m.log : [];
      if (m.next == null) m.next = '';
      if (m.role == null) m.role = '';
      if (!m.added) m.added = p.touched || now();
    });
    p.notes.forEach((n) => { if (!n.id) n.id = uid(); });
    return p;
  }

  // The list of fellows offered by every "Volunteer name" box.
  function fillFellowList() {
    let dl = document.getElementById('hai-fellows');
    if (!dl) { dl = document.createElement('datalist'); dl.id = 'hai-fellows'; root.appendChild(dl); }
    dl.innerHTML = fellowNames.map((f) => '<option value="' + esc(f.name) + '"></option>').join('');
  }

  async function load() {
    try {
      const r = await fetch('/api/ledger/projects');
      if (r.status === 401) { window.location.href = '/fellows/login?next=/ledger'; return; }
      if (r.status === 403) { state = { projects: [] }; render(); say('The Project Ledger is for project managers.', true); return; }
      if (!r.ok) throw new Error('load failed');
      const data = await r.json();
      state = { projects: Array.isArray(data.projects) ? data.projects : [] };
      fellowNames = Array.isArray(data.fellows) ? data.fellows : [];
      fillFellowList();
    } catch (e) {
      // A failed load used to fall back to the seed list silently, which made
      // the ledger look fine while nothing the user did was reaching Neon.
      state = { projects: [] };
      render();
      say('Could not load the ledger from the database. Refresh to try again.', true);
      return;
    }
    state.projects.forEach(normalize);
    render();
  }

  // Saves exactly one project (and its full team/hours/notes) — each save
  // only touches that project's rows, so two PMs saving different projects
  // at the same time can no longer overwrite each other.
  async function putProject(p) {
    const r = await fetch('/api/ledger/projects/' + p.id, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p)
    });
    if (r.status === 401) { window.location.href = '/fellows/login?next=/ledger'; throw new Error('Signed out'); }
    if (!r.ok) {
      // Pass the server's own reason through instead of a generic failure, so
      // a schema or connection problem is visible instead of looking like a
      // change that just vanished.
      const detail = await r.json().catch(() => null);
      throw new Error((detail && detail.error) || 'Save failed (' + r.status + ')');
    }
    const data = await r.json().catch(() => null);
    if (data && data.project) {
      // Updated in place: open screens keep their reference to this project.
      Object.keys(p).forEach((k) => { delete p[k]; });
      Object.assign(p, normalize(data.project));
    }
  }

  async function saveProject(p, msg) {
    render();
    try {
      await putProject(p);
      say(msg || 'Saved');
    } catch (e) {
      say((e && e.message) || 'That change did not save. Check your connection and try again.', true);
    }
  }


  const isMine = (p) => !!meId && p.pmId === meId;
  const needsAttention = (p) => {
    const wk = thisWeek();
    return p.phase === 'Blocked' || (!p.pm && p.phase !== 'Done') ||
      (p.pm && p.phase !== 'Done' && p.phase !== 'Paused' && !filed(p, wk)) ||
      (p.pm && target(p) > 0 && filed(p, wk) && pmHours(p, wk) < target(p));
  };

  function renderDeadline() {
    const wk = thisWeek(), c = cutoff(wk);
    const past = Date.now() > c.getTime();
    const label = c.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
    const wl = weekLabel(wk);
    dlEl.className = 'deadline' + (past ? ' past' : '');
    dlEl.innerHTML = wl.charAt(0).toUpperCase() + wl.slice(1) + '. Filings ' +
      (past ? 'were due <b>' + label + ' at 6pm</b> and are now late.' : 'due <b>' + label + ' at 6pm</b>.');
  }

  function renderAttention() {
    const ps = sorted(), wk = thisWeek();
    const lines = [];
    const push = (label, arr) => { if (arr.length) lines.push('<b>' + label + '</b> ' + arr.join(', ')); };
    const pmName = (p) => esc((p.pm || '').split(' ')[0] || 'nobody') + ' (' + esc(p.name) + ')';

    push('Not filed this week:', ps.filter((p) => p.pm && p.phase !== 'Done' && p.phase !== 'Paused' && !filed(p, wk)).map(pmName));
    push('Blocked:', ps.filter((p) => p.phase === 'Blocked').map((p) => esc(p.name)));
    push('Short of hours:', ps.filter((p) => p.pm && target(p) > 0 && filed(p, wk) && pmHours(p, wk) < target(p))
      .map((p) => esc(p.pm.split(' ')[0]) + ' ' + pmHours(p, wk) + ' of ' + target(p) + 'h'));
    push('No volunteers listed:', ps.filter((p) => p.pm && p.phase === 'Active' && !p.team.length).map((p) => esc(p.name)));
    push('No PM assigned:', ps.filter((p) => !p.pm && p.phase !== 'Done').map((p) => esc(p.name)));

    const flagged = ps.filter(needsAttention);
    if (!lines.length) {
      attnEl.className = 'attention clear';
      attnEl.innerHTML = '<p>Everyone has filed. The meeting view is ready.</p>';
      return;
    }
    attnEl.className = 'attention';
    attnEl.innerHTML = '<p>' + flagged.length + (flagged.length === 1 ? ' project needs' : ' projects need') +
      ' attention before the meeting.</p><ul><li>' + lines.join('</li><li>') + '</li></ul>';
  }

  /* ---------- weekly export ---------- */

  // One row per person per project for the chosen week: who, what they worked
  // on, how many hours, and the dates that week covers. That is the record this
  // tool exists to produce, so the export is built around the person rather
  // than around the project.
  const EXPORT_HEADER = [
    'Week starting', 'Week ending',
    'Person', 'Role', 'Project', 'Phase', 'Worked on', 'Hours this week',
    'Next step', 'Updates this week', 'Exported on'
  ];

  // The week's Monday and Sunday, each as one YYYY-MM-DD date.
  const weekDateParts = (k) => [k, addDays(k, 6)];

  function stampNow() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0') + ' ' +
      String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  // weeks: the week keys to include. onlyLogged: skip people with no entry in a
  // week (used for History, where listing the whole roster for every week
  // would just be noise). match: a (project) => boolean filter, e.g. to limit
  // to one project or one PM; omit it to include everyone.
  function exportRows(weeks, onlyLogged, match) {
    const stamp = stampNow();
    const cur = thisWeek();
    const people = [];

    weeks.forEach((wk) => {
      const when = weekDateParts(wk);
      sorted().filter(match || (() => true)).forEach((p) => {
        const updates = notesIn(p, wk).map((n) => n.text).join(' | ');
        const items = pmItems(p, wk);
        const pmName = (items[0] && items[0].who) || p.pm;
        if (pmName && (!onlyLogged || items.length)) {
          // One row per PM per project per week -- several work items in the
          // same week are joined into that row rather than one row each, so
          // the file reads as a single week per person, not several.
          const withNext = items.find((it) => it.next);
          people.push({
            when, wk, who: pmName, role: 'PM', proj: p.name, phase: p.phase,
            task: items.map((it) => it.task).filter(Boolean).join('; '),
            hours: items.reduce((s, it) => s + (Number(it.hours) || 0), 0),
            next: (withNext && withNext.next) || (wk === cur ? p.next : ''), updates
          });
        }
        p.team.forEach((m) => {
          if (onlyLogged && !entryOf(m.weeks, wk)) return;
          people.push({
            when, wk, who: m.name, role: 'Volunteer', proj: p.name, phase: p.phase,
            task: taskFor(m, wk), hours: memberHours(m, wk), next: nextFor(m, wk), updates
          });
        });
      });
    });

    // Sorted by person so the file reads as a timesheet; someone on two
    // projects gets their rows together, oldest week first.
    const cmp = (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' });
    people.sort((a, b) => cmp(a.who, b.who) || cmp(a.wk, b.wk) || cmp(a.proj, b.proj));

    return [EXPORT_HEADER.slice()].concat(people.map((r) =>
      r.when.concat([r.who, r.role, r.proj, r.phase, r.task, r.hours, r.next, r.updates, stamp])));
  }

  function toCSV(rows) {
    return rows.map((r) => r.map((v) => {
      const s = String(v == null ? '' : v);
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    }).join(',')).join('\r\n');
  }

  function downloadCSV(weeks, filename, onlyLogged, match) {
    const rows = exportRows(weeks, onlyLogged, match);
    if (rows.length < 2) { say(onlyLogged ? 'Nothing logged for that selection' : 'Nobody is listed on a project yet', true); return; }
    // A leading BOM so Excel opens it as UTF-8 rather than mangling names.
    const blob = new Blob(['﻿' + toCSV(rows)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    say('Exported ' + (rows.length - 1) + ' rows' + (weeks.length === 1 ? ' for ' + weekLabel(weeks[0]) : ''));
  }

  /* ---------- meeting view ---------- */

  // Only people who actually logged something THIS week -- a PM or volunteer
  // who never filed shouldn't appear with "0 hrs / not stated", which read as
  // if they were reporting no work rather than simply not having filed at all.
  function peopleRollup(wk) {
    const rows = [];
    sorted().forEach((p) => {
      const pt = pmItems(p, wk).filter((w) => w.task);
      if (p.pm && pmItems(p, wk).length) rows.push({ who: p.pm, proj: p.name, task: pt.length ? 'PM: ' + pt.map((w) => w.task).join('; ') : 'PM', next: (pt[0] && pt[0].next) || p.next, hours: pmHours(p, wk) });
      p.team.forEach((m) => {
        if (entryOf(m.weeks, wk)) rows.push({ who: m.name, proj: p.name, task: taskFor(m, wk), next: nextFor(m, wk), hours: memberHours(m, wk) });
      });
    });
    return rows.sort((a, b) => a.who.localeCompare(b.who, undefined, { sensitivity: 'base' }));
  }

  function digestText(wk) {
    const ps = sorted();
    const withPm = ps.filter((p) => p.pm);
    const filedList = withPm.filter((p) => filed(p, wk));
    const total = ps.reduce((s, p) => s + pmHours(p, wk) + teamHours(p, wk), 0);
    const L = [];
    L.push('HUMANITARIANS AI - ' + weekLabel(wk).toUpperCase());
    L.push('Filed ' + filedList.length + ' of ' + withPm.length + ' projects. ' + total + ' hours logged in total.');
    L.push('');
    // Projects with nothing filed this week get one line each here instead of
    // a full block -- a blank "Update: none filed" / "no volunteers listed"
    // repeated for every quiet project just to say nothing happened made this
    // unnecessarily long to read or paste into an agenda.
    const active = ps.filter((p) => filed(p, wk));
    const quiet = ps.filter((p) => !filed(p, wk));
    active.forEach((p) => {
      L.push(p.name.toUpperCase() + (p.strands.length ? '  (' + p.strands.join(', ') + ')' : ''));
      const t = target(p);
      L.push('  PM: ' + (p.pm || 'none') + '  |  ' + p.phase +
        (t > 0 ? '  |  ' + pmHours(p, wk) + ' of ' + t + ' hrs' : '  |  hours not tracked'));
      if (p.next) L.push('  Next: ' + p.next);
      pmItems(p, wk).filter((w) => w.task).forEach((w) => L.push('  PM worked on: ' + itemLine(w)));
      const ns = notesIn(p, wk);
      if (ns.length) ns.forEach((n) => L.push('  Update: ' + n.text));
      if (!p.team.length) {
        L.push('    - no volunteers listed');
      } else {
        p.team.filter((m) => entryOf(m.weeks, wk)).forEach((m) => {
          L.push('    - ' + m.name + ' (' + memberHours(m, wk) + ' hrs)');
          L.push('        on: ' + (taskFor(m, wk) || 'not stated'));
          if (nextFor(m, wk)) L.push('        next: ' + nextFor(m, wk));
        });
      }
      L.push('');
    });
    if (quiet.length) {
      L.push('NOT FILED THIS WEEK');
      quiet.forEach((p) => L.push('  ' + p.name + (p.pm ? '  |  PM: ' + p.pm : '  |  no PM')));
      L.push('');
    }
    L.push('WHO IS DOING WHAT');
    peopleRollup(wk).forEach((r) => {
      L.push('  ' + r.who + '  |  ' + r.proj + '  |  ' + (r.task || 'not stated') + '  |  ' + r.hours + ' hrs');
    });
    return L.join('\n');
  }

  // A full-screen view of its own (like History and a project window), so the
  // project cards and filter tabs are not still showing underneath it once
  // the digest is read.
  function renderMeeting() {
    const wk = thisWeek(), ps = sorted();
    const withPm = ps.filter((p) => p.pm);
    const filedList = withPm.filter((p) => filed(p, wk));
    const total = ps.reduce((s, p) => s + pmHours(p, wk) + teamHours(p, wk), 0);
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('data-detail-overlay', '');
    const box = document.createElement('div');
    box.className = 'modal-box detail-box wide';

    const people = peopleRollup(wk);

    box.innerHTML = '<div class="detail-head"><h3>Meeting view, ' + esc(weekLabel(wk)) + '</h3>' +
        '<button class="tiny ghost" data-close>&larr; Back to ledger</button></div>' +
      '<p class="hint">' + filedList.length + ' of ' + withPm.length + ' projects filed. ' + total +
      ' hours logged across everyone. The plain text at the bottom is ready to paste into the agenda.</p>' +
      ps.map((p) => {
        const h = pmHours(p, wk), t = target(p), f = filed(p, wk);
        const ns = notesIn(p, wk);
        return '<div class="mrow"><div class="mhead">' +
          '<span class="mname">' + esc(p.name) + '</span>' +
          '<span class="mmeta">' + esc(p.pm || 'no PM') + '</span>' +
          '<span class="mmeta">' + esc(p.phase) + '</span>' +
          '<span class="mmeta' + (t > 0 && h < t ? ' flag' : '') + '">' +
            (t > 0 ? h + ' of ' + t + ' hrs' : 'hours not tracked') + '</span>' +
          (p.pm && !f ? '<span class="mmeta flag">not filed</span>' : '') +
          '</div>' +
          (p.next ? '<div class="mbody"><span class="lbl">Next: </span>' + esc(p.next) + '</div>' : '') +
          pmItems(p, wk).filter((w) => w.task).map((w) => '<div class="mbody"><span class="lbl">PM worked on: </span>' + esc(itemLine(w)) + '</div>').join('') +
          ns.map((n) => '<div class="mbody">' + esc(n.text) + '</div>').join('') +
          '<ul class="mteam">' + (p.team.length
            ? p.team.map((m) => '<li>' + esc(m.name) + ' <span>' + memberHours(m, wk) + ' hrs</span><br>' +
                '<span>on: </span>' + esc(taskFor(m, wk) || 'not stated') +
                (nextFor(m, wk) ? '<br><span>next: </span>' + esc(nextFor(m, wk)) : '') + '</li>').join('')
            : '<li><span>no volunteers listed</span></li>') + '</ul></div>';
      }).join('') +
      '<div class="block" style="margin-top:20px"><h3>Who is doing what</h3>' +
        (people.length ? '<table class="team"><thead><tr><th class="who">Person</th><th>Project</th><th>Worked on</th><th class="hrs">Hours</th></tr></thead><tbody>' +
          people.map((r) => '<tr><td class="who nm">' + esc(r.who) + '</td><td>' + esc(r.proj) +
            '</td><td>' + esc(r.task || 'not stated') + '</td><td class="hrs">' + r.hours + '</td></tr>').join('') +
          '</tbody></table>' : '<p class="empty">Nobody listed yet.</p>') +
      '</div>' +
      '<div class="block"><h3>Plain text for the agenda</h3>' +
        '<textarea class="digest" readonly>' + esc(digestText(wk)) + '</textarea></div>';

    box.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) { mode = null; render(); } });
    box.querySelector('.digest').addEventListener('focus', (e) => e.target.select());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) { mode = null; render(); } });
    overlay.appendChild(box);
    document.querySelector('.hai').appendChild(overlay);
  }

  /* ---------- file my week ---------- */

  function collectReview(box, wk) {
    let count = 0, hrs = 0; const changedProjects = [];
    box.querySelectorAll('[data-rid]').forEach((blk) => {
      const p = state.projects.find((x) => x.id === blk.getAttribute('data-rid'));
      if (!p) return;
      let changed = false;
      const phase = blk.querySelector('[data-rphase]').value;
      const next = blk.querySelector('[data-rnext]').value.trim();
      const note = blk.querySelector('[data-rnote]').value.trim();
      const hEl = blk.querySelector('[data-rhours]');
      const h = hEl && !hEl.disabled ? Number(hEl.value) || 0 : 0;
      const ptask = blk.querySelector('[data-rtask]').value.trim();
      if (phase !== p.phase) { p.phase = phase; changed = true; }
      if (next !== p.next) { p.next = next; changed = true; }
      if (note) { p.notes.push({ id: uid(), who: me, text: note, when: short(now()), week: wk, createdAt: now() }); changed = true; }

      // Anything typed here is a new work item for the PM this week; work
      // already logged stays as it is (edit it from the project window).
      if (ptask || h > 0) {
        recordPmUpdate(p, wk, pmItems(p, wk).concat([{ week: wk, hours: h, task: ptask, next: '', who: me || p.pm || '' }]));
        if (h > 0) hrs += h;
        changed = true;
      }

      blk.querySelectorAll('[data-mid]').forEach((row) => {
        const m = p.team.find((x) => x.id === row.getAttribute('data-mid'));
        if (!m) return;
        const e = entryOf(m.weeks, wk);
        const role = row.querySelector('[data-mrole]').value.trim();
        const mnext = row.querySelector('[data-mnext]').value.trim();
        const mh = Number(row.querySelector('[data-mhours]').value) || 0;
        const patch = {};
        if (role !== ((e && e.task) || '')) patch.task = role;
        if (mnext !== ((e && e.next) || '')) patch.next = mnext;
        if (mh > 0) patch.hours = ((e && e.hours) || 0) + mh;
        if (Object.keys(patch).length && recordUpdate(m, wk, patch)) {
          if (mh > 0) hrs += mh;
          changed = true;
        }
      });

      if (changed) { p.touched = now(); count++; changedProjects.push(p); }
    });
    return { count, hrs, changedProjects };
  }

  function renderReview() {
    const wk = thisWeek();
    const mineList = me ? sorted().filter(isMine) : [];
    const box = document.createElement('div');
    box.className = 'panel';

    if (!me) {
      box.innerHTML = '<h2>File my week</h2><p class="hint">Sign in as a fellow to see the projects you are PM on.</p>' +
        '<div class="foot"><button data-close>Close</button></div>';
    } else if (!mineList.length) {
      box.innerHTML = '<h2>File my week</h2><p class="hint">No projects list ' + esc(me) +
        ' as PM. An admin assigns PMs in the admin dashboard.</p>' +
        '<div class="foot"><button data-close>Close</button></div>';
    } else {
      const already = mineList.reduce((s, p) => s + pmHours(p, wk), 0);
      const tgt = mineList.reduce((s, p) => s + target(p), 0);
      box.innerHTML = '<h2>' + esc(me) + ', ' + weekLabel(wk) + '</h2>' +
        '<p class="hint">Add what you worked on and your hours (each time you file, it is added as another work item for this week), then a line per volunteer saying what they did this week, what is next for them, and their hours. Each volunteer keeps one row all month, and this week\'s details are saved under it. Hours stack on whatever is already logged for a volunteer this week.</p>' +
        mineList.map((p) => {
          const h = pmHours(p, wk), t = target(p);
          const done = pmItems(p, wk).filter((w) => w.task || Number(w.hours) > 0);
          return '<div class="rblock" data-rid="' + p.id + '">' +
            '<div class="rtop">' +
              '<span class="rname">' + esc(p.name) +
                '<small>' + (filed(p, wk) ? 'filed' : 'not filed yet') +
                (h ? ', ' + h + ' hrs logged' : '') + '</small></span>' +
              '<select data-rphase>' + PHASES.map((n) => '<option' + (p.phase === n ? ' selected' : '') + '>' + n + '</option>').join('') + '</select>' +
              '<input class="hrs" data-rhours type="number" min="0" max="60" step="0.5" placeholder="my hrs"' +
                (t === 0 ? ' disabled title="hours not tracked"' : '') + '>' +
            '</div>' +
            '<div class="rstack">' +
              (done.length
                ? '<div class="already"><b>Already logged this week:</b> ' + done.map((w) => esc(w.task || 'hours only') + (Number(w.hours) > 0 ? ' (' + w.hours + ' hrs)' : '')).join('; ') + '</div>'
                : '') +
              '<textarea data-rtask placeholder="' + (done.length ? 'Another piece of work you did this week' : 'What you worked on this week (your own tasks)') + '"></textarea>' +
              '<input data-rnext value="' + esc(p.next) + '" placeholder="Next step for the project">' +
              '<textarea data-rnote placeholder="Update for Nina, Nik and Cole"></textarea>' +
            '</div>' +
            '<p class="subhead">Volunteers on ' + esc(p.name) + '</p>' +
            (p.team.length
              ? '<table class="team"><thead><tr><th class="who">Person</th><th>Worked on</th><th>Next step</th><th class="hrs">Hours</th></tr></thead><tbody>' +
                p.team.map((m) => {
                  const e = entryOf(m.weeks, wk) || {};
                  return '<tr data-mid="' + m.id + '">' +
                    '<td class="who nm">' + esc(m.name) + '</td>' +
                    '<td class="doing"><input data-mrole value="' + esc(e.task || '') + '" placeholder="' + esc(lastBefore(m.weeks, wk, 'task', m.role) || 'what they worked on this week') + '"></td>' +
                    '<td class="doing"><input data-mnext value="' + esc(e.next || '') + '" placeholder="' + esc(lastBefore(m.weeks, wk, 'next', m.next) || 'their next step') + '"></td>' +
                    '<td class="hrs"><input data-mhours type="number" min="0" max="60" step="0.5" placeholder="hrs"></td>' +
                    '</tr>';
                }).join('') + '</tbody></table>'
              : '<p class="empty">No volunteers on this project yet.</p>') +
            '<div class="addrow"><input class="n" data-newname list="hai-fellows" placeholder="Fellow\'s name">' +
              '<input class="t" data-newtask placeholder="What they worked on">' +
              '<button data-addperson="' + p.id + '">Add volunteer</button></div>' +
          '</div>';
        }).join('') +
        '<div class="foot"><button class="primary" data-savereview>File week</button>' +
        '<button data-close class="ghost">Cancel</button>' +
        '<span class="spacer"></span><span class="tally">' + already + (tgt ? ' of ' + tgt : '') + ' of my own hours logged so far</span></div>';
    }

    box.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) { mode = null; render(); return; }

      const addBtn = e.target.closest('[data-addperson]');
      if (addBtn) {
        const blk = addBtn.closest('[data-rid]');
        const nEl = blk.querySelector('[data-newname]'), tEl = blk.querySelector('[data-newtask]');
        const name = nEl.value.trim();
        if (!name) { nEl.focus(); return; }
        const p = state.projects.find((x) => x.id === blk.getAttribute('data-rid'));
        if (!findMember(p, name) && !isFellow(name)) { say(notAFellow(name), true); nEl.focus(); return; }

        const addNew = () => {
          const r = collectReview(box, wk);
          const task = tEl.value.trim();
          const nm = { id: uid(), name, role: task, next: '', added: now(), weeks: [], log: [] };
          p.team.push(nm);
          recordUpdate(nm, wk, { task });
          p.touched = now();
          if (r.changedProjects.indexOf(p) === -1) r.changedProjects.push(p);
          render();
          Promise.all(r.changedProjects.map(putProject))
            .then(() => say(name + ' added to ' + p.name))
            .catch((err) => say((err && err.message) || 'That change did not save.', true));
        };

        const existing = findMember(p, name);
        if (existing) {
          // They already have an editable row in the table above -- that is
          // where this week's hours for them belong, not a second row here.
          confirmModal(
            'Already on this project',
            name + ' is already listed on ' + p.name + ' above -- put this week\'s details in that row instead. Add a second row for them anyway?',
            'Add anyway'
          ).then((ok) => {
            if (!ok) {
              const hoursInput = blk.querySelector('[data-mid="' + existing.id + '"] [data-mhours]');
              if (hoursInput) hoursInput.focus();
              return;
            }
            addNew();
          });
          return;
        }

        addNew();
        return;
      }

      if (!e.target.closest('[data-savereview]')) return;
      const r = collectReview(box, wk);
      mode = null;
      render();
      if (!r.changedProjects.length) { say('Nothing changed'); return; }
      Promise.all(r.changedProjects.map(putProject)).then(() => {
        say(r.count + ' project' + (r.count === 1 ? '' : 's') + ' filed' + (r.hrs ? ', ' + r.hrs + ' hrs logged' : ''));
      }).catch((err) => {
        say((err && err.message) || 'That change did not save. Check your connection and try again.', true);
      });
    });

    slotEl.appendChild(box);
  }

  /* ---------- ledger rows ---------- */

  // The weekly-details table: one row per person (the PM first, then each
  // volunteer) for a single week. A panel is built for every week of the
  // current month and only the selected one is visible, so switching weeks never
  // loses anything typed. Earlier months live in History.
  function personRow(own, list, k, whoCell, actCell, legacyTask, legacyNext, cls, updHtml) {
    const e = entryOf(list, k) || {};
    return '<tr class="' + cls + '" data-own="' + own + '" data-wk="' + k + '">' +
      '<td class="who">' + whoCell + '</td>' +
      '<td class="doing"><textarea data-wtask rows="2" placeholder="' + esc(lastBefore(list, k, 'task', legacyTask) || 'what they worked on') + '">' + esc(e.task || '') + '</textarea>' + (updHtml || '') + '</td>' +
      '<td class="doing"><input data-wnext value="' + esc(e.next || '') + '" placeholder="' + esc(lastBefore(list, k, 'next', legacyNext) || 'next step') + '"></td>' +
      '<td class="hrs"><input data-whours type="number" min="0" max="80" step="0.5" placeholder="hrs" value="' + (e.hours || '') + '"></td>' +
      '<td class="act">' + actCell + '</td>' +
      '</tr>';
  }

  // One PM work item. A PM can have several of these in the same week.
  function pmItemRow(k, it, p) {
    const e = it || {};
    return '<tr class="pmitem" data-own="pm" data-wk="' + k + '" data-who="' + esc(e.who || '') + '">' +
      '<td class="who"><span class="wlabel">Work item</span></td>' +
      '<td class="doing"><textarea data-wtask rows="2" placeholder="' + esc(lastBefore(p.weeks, k, 'task', '') || 'what you worked on') + '">' + esc(e.task || '') + '</textarea></td>' +
      '<td class="doing"><input data-wnext value="' + esc(e.next || '') + '" placeholder="' + esc(lastBefore(p.weeks, k, 'next', '') || 'next step') + '"></td>' +
      '<td class="hrs"><input data-whours type="number" min="0" max="80" step="0.5" placeholder="hrs" value="' + (e.hours || '') + '"></td>' +
      '<td class="act"><button class="tiny ghost" data-dropitem title="Remove this work item" aria-label="Remove this work item">&times;</button></td>' +
      '</tr>';
  }

  function weekPanel(p, k, visible) {
    const pmName = p.pm ? esc(p.pm) : '<em>No PM assigned</em>';
    const under = p.pm ? esc(p.pm) : 'the project manager';
    const items = pmItems(p, k);
    return '<div class="wkpanel" data-wkpanel="' + k + '"' + (visible ? '' : ' hidden') + '>' +
      '<table class="team log"><thead><tr><th class="who">Person</th><th>Worked on</th><th>Next step</th><th class="hrs">Hours</th><th class="act"></th></tr></thead><tbody>' +
      '<tr class="pmhead"><td colspan="5"><div class="pmbar">' +
        '<div class="pmwho"><span class="pmname">' + pmName + '</span> <span class="tag">PM</span>' +
          '<small class="upd" data-pmupd>' + esc(pmUpdText(p, k)) + '</small></div>' +
        '<span class="pmacts"><button class="tiny ghost" data-viewperson="pm">All records &rarr;</button>' +
        '<button class="tiny" data-addpmitem="' + k + '">+ Add work item</button>' +
        '<button class="tiny primary" data-updatepm="' + k + '" title="Save this week\'s work items and add them to the PM records">Update</button></span>' +
      '</div></td></tr>' +
      (items.length ? items : [null]).map((it) => pmItemRow(k, it, p)).join('') +
      '<tr class="vsub"><td colspan="5">Volunteers under ' + under + ' (' + p.team.length + ')</td></tr>' +
      (p.team.length
        ? p.team.map((m) => personRow(m.id, m.weeks, k,
            '<input class="vname" data-mname="' + m.id + '" value="' + esc(m.name) + '" aria-label="Volunteer name" readonly>' +
              // No "Added <date>" here: next to the week's own "Updated ..." line it
              // read as a stale date. The joined date is on the All records screen.
              '<div class="vmeta"><button class="tiny ghost linkbtn" data-viewperson="' + m.id + '">All records &rarr;</button></div>',
            '<div class="vacts"><button class="tiny primary" data-updatevol="' + m.id + '" data-wk="' + k + '" title="Save this week\'s details for ' + esc(m.name) + ' and add them to their records">Update</button>' +
              '<button class="tiny ghost" data-drop="' + m.id + '" title="Remove from project" aria-label="Remove ' + esc(m.name) + '">&times;</button></div>',
            m.role, m.next, 'vrow', '<small class="upd" data-upd>' + esc(updText(m, k)) + '</small>')).join('')
        : '<tr class="vsub"><td colspan="5" class="none">No volunteers yet. Add the first one below.</td></tr>') +
      '</tbody></table>' +
      '</div>';
  }

  function renderRow(p) {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML =
      '<button class="row-head" data-open="' + p.id + '" aria-haspopup="dialog">' +
        '<div class="chead">' +
          '<span class="pname">' + esc(p.name) + '</span>' +
          '<span class="phase ' + p.phase.toLowerCase() + '">' + esc(p.phase) + '</span>' +
        '</div>' +
        (p.strands.length ? '<div class="strands">' + esc(p.strands.join(', ')) + '</div>' : '') +
        '<div class="pnext' + (p.next ? '' : ' none') + '">' +
          (p.next ? 'Next: ' + esc(p.next) : esc(p.blurb || 'No next step written down')) + '</div>' +
        '<div class="cfoot">' +
          (p.pm ? '<span class="pmcell">' + esc(p.pm) + '</span>' : '<span class="pmcell none">no PM</span>') +
        '</div>' +
      '</button>';
    return li;
  }

  // Status to show the next time the detail modal is drawn. render() tears the
  // modal down and rebuilds it, so a message set during a save has to survive
  // that round trip rather than being written straight into the old DOM.
  let detailMsg = null;
  let detailWeek = null; // week picked in the project window; survives the rebuild after a save

  function renderDetailModal(p) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('data-detail-overlay', '');
    const box = document.createElement('div');
    box.className = 'modal-box detail-box';
    const weeks = currentMonthWeeks();
    let sel = detailWeek && weeks.indexOf(detailWeek) >= 0 ? detailWeek : thisWeek();
    const weekOpt = (k) => '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>Week ' + weekNo(k) + ', ' +
      esc(weekShort(k)) + (k === thisWeek() ? ' (this week)' : '') + '</option>';
    const selWk = () => sel;
    // The Updates list follows the Week picker, like the table above it: only
    // the selected week's updates are listed, and a new one is logged to it.
    const notesHtml = (k) => {
      const ns = notesIn(p, k);
      return ns.length
        ? '<ul class="notes">' + ns.slice().reverse().map((n) =>
            '<li><div class="ntext"><span class="meta">' + esc(n.who) + ', ' + esc(n.createdAt ? stamp(n.createdAt) : n.when) + '</span>' + esc(n.text) + '</div>' +
            '<button class="tiny ghost" data-delnote="' + n.id + '" title="Delete this update">&times;</button></li>').join('') + '</ul>'
        : '<p class="empty">No updates logged for this week.</p>';
    };

    box.innerHTML =
      '<div class="detail-head">' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<span class="spacer"></span>' +
        '<button class="tiny ghost" data-openhistory>History</button>' +
        '<button class="tiny ghost" data-closedetail>&larr; Back to ledger</button>' +
      '</div>' +
      (p.canEdit ? '' : '<p class="viewonly">View only. Only this project\'s PM can make changes.</p>') +
      '<div class="grid">' +
        '<label class="field"><span>Project manager</span><input data-f="pm" value="' + esc(p.pm || 'No PM yet') + '" readonly title="Set in the admin dashboard"></label>' +
        '<label class="field"><span>Phase</span><select data-f="phase">' +
          PHASES.map((n) => '<option' + (p.phase === n ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></label>' +
        '<label class="field wide2"><span>Next step for the project</span><input data-f="next" value="' + esc(p.next) + '" placeholder="the one thing that moves this"></label>' +
      '</div>' +
      '<details class="more"><summary>More project details</summary>' +
        '<div class="grid">' +
          '<label class="field"><span>PM email</span><input data-f="email" value="' + esc(p.email) + '" readonly title="Set in the admin dashboard"></label>' +
          '<label class="field"><span>Weekly hours target</span><input data-f="target" type="number" min="0" max="60" value="' + target(p) + '"></label>' +
        '</div>' +
        '<div class="block"><h3>What this project is</h3><textarea class="wide" data-f="blurb" readonly title="Set in the admin dashboard">' + esc(p.blurb) + '</textarea></div>' +
        '<div class="block"><h3>Strands under this PM</h3><textarea class="wide" data-f="strandsText" placeholder="comma separated">' + esc(p.strands.join(', ')) + '</textarea></div>' +
      '</details>' +
      '<div class="block weekly">' +
        '<div class="wkbar"><h3>Weekly details for ' + esc(monthLabel(thisMonth())) + '</h3>' +
          '<label class="wkpick">Week <select data-weeksel>' + weeks.map(weekOpt).join('') + '</select></label></div>' +
        weeks.map((k) => weekPanel(p, k, k === sel)).join('') +
        '<div class="addvol">' +
          '<button class="primary" data-showadd>+ Add volunteer</button>' +
          '<div class="addform" data-addform hidden>' +
            '<h4>Volunteer details <span class="muted">for ' + (p.pm ? esc(p.pm) : 'the project manager') + ', <span data-addwk>Week ' + weekNo(sel) + '</span></span></h4>' +
            '<div class="addgrid">' +
              '<label class="field"><span>Volunteer name</span><input data-newname list="hai-fellows" placeholder="Start typing a fellow\'s name"></label>' +
              '<label class="field"><span>Worked on</span><input data-newtask placeholder="What they worked on"></label>' +
              '<label class="field"><span>Next step</span><input data-newnext placeholder="Their next step"></label>' +
              '<label class="field"><span>Hours</span><input data-newhours type="number" min="0" max="80" step="0.5" placeholder="hrs"></label>' +
            '</div>' +
            '<div class="addacts"><button class="primary" data-addperson>Add volunteer</button><button class="ghost" data-canceladd>Cancel</button></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="block"><h3>Updates for <span data-noteswk>Week ' + weekNo(sel) + '</span></h3>' +
        '<div data-noteslist>' + notesHtml(sel) + '</div>' +
        '<div class="post"><textarea data-note placeholder="What changed, what you need, what is in the way"></textarea>' +
        '<button class="primary" data-post>Log update</button></div></div>' +
      '<div class="foot savebar">' +
        '<button class="primary" data-savedetail>Save changes</button>' +
        '<button class="ghost" data-closedetail>Close</button>' +
        '<span class="spacer"></span>' +
        '<span class="detail-status" data-dstatus></span>' +
        '<span class="unsaved" data-unsaved>Unsaved changes</span>' +
      '</div>';
    overlay.appendChild(box);
    document.querySelector('.hai').appendChild(overlay);

    const dstatus = box.querySelector('[data-dstatus]');
    if (detailMsg) {
      dstatus.textContent = detailMsg.text;
      dstatus.className = 'detail-status' + (detailMsg.err ? ' err' : '');
      detailMsg = null;
    }

    function markDirty() {
      const ind = box.querySelector('[data-unsaved]');
      if (ind) ind.classList.add('show');
      dstatus.textContent = '';
    }

    function closeDetail() { openId = null; render(); }

    // Copy the whole form back into the project object. Previously only the
    // fields that happened to fire a `change` event were picked up, and the
    // pending "add volunteer" row and the update textarea were never read at
    // all -- so pressing Save changes threw that typing away when the modal
    // was rebuilt.
    function readForm() {
      const wk = thisWeek();

      box.querySelectorAll('[data-f]').forEach((el) => {
        if (el.readOnly) return;
        const f = el.getAttribute('data-f');
        if (f === 'strandsText') {
          p.strands = el.value.split(',').map((x) => x.trim()).filter(Boolean);
        } else if (f === 'target') {
          p.target = Math.max(0, Number(el.value) || 0);
        } else {
          p[f] = el.value.trim();
        }
      });

      // Every weekly row on screen (the PM's and each volunteer's) is copied
      // into that person's entry for that week. Weeks not on screen -- earlier
      // months -- are left exactly as they are.
      const pmRows = {};
      box.querySelectorAll('tr[data-own]').forEach((tr) => {
        const own = tr.getAttribute('data-own'), k = tr.getAttribute('data-wk');
        const patch = {
          task: tr.querySelector('[data-wtask]').value.trim(),
          next: tr.querySelector('[data-wnext]').value.trim(),
          hours: Math.max(0, Number(tr.querySelector('[data-whours]').value) || 0)
        };
        if (own === 'pm') {
          (pmRows[k] = pmRows[k] || []).push({ week: k, hours: patch.hours, task: patch.task, next: patch.next,
            who: tr.getAttribute('data-who') || p.pm || me || '' });
        } else {
          const m = p.team.find((x) => x.id === own);
          if (m) recordUpdate(m, k, patch);
        }
      });
      // Every work item for a week is on screen, so the week's PM list is
      // replaced by exactly what is there (blank rows are dropped).
      Object.keys(pmRows).forEach((k) => {
        recordPmUpdate(p, k, pmRows[k].filter((it) => it.hours > 0 || it.task || it.next));
      });
      p.weeks.sort(byWeek);

      // A half-filled "add volunteer" row counts as an add.
      const nEl = box.querySelector('[data-newname]');
      if (nEl && nEl.value.trim() && isFellow(nEl.value)) {
        const tEl = box.querySelector('[data-newtask]');
        const nxEl = box.querySelector('[data-newnext]');
        const hEl = box.querySelector('[data-newhours]');
        const hrs = Math.max(0, Number(hEl && hEl.value) || 0);
        const task = (tEl && tEl.value.trim()) || '', nx = (nxEl && nxEl.value.trim()) || '';
        const nm = { id: uid(), name: nEl.value.trim(), role: task, next: nx, weeks: [], log: [], added: now() };
        p.team.push(nm);
        recordUpdate(nm, selWk(), { task, next: nx, hours: hrs });
        [nEl, tEl, nxEl, hEl].forEach((el) => { if (el) el.value = ''; });
      }

      // ...and so does a typed-but-unposted update.
      const ta = box.querySelector('[data-note]');
      if (ta && ta.value.trim()) {
        p.notes.push({
          id: uid(), who: me || 'Someone', text: ta.value.trim(),
          when: short(now()), week: selWk(), createdAt: now()
        });
        ta.value = '';
      }

      p.touched = now();
    }

    // One path for every save made from this modal. On success we either go
    // back to the ledger (Save changes) or redraw the modal with a note
    // (Add volunteer, Log update, Remove). On failure the modal is redrawn
    // from the in-memory project, so nothing the user typed is lost and the
    // reason is visible inside the modal rather than behind it.
    function commit(msg, close) {
      box.querySelectorAll('button').forEach((b) => { b.disabled = true; });
      dstatus.className = 'detail-status';
      dstatus.textContent = 'Saving...';
      putProject(p).then(() => {
        if (close) { openId = null; render(); say(msg || 'Saved'); }
        else { detailMsg = { text: msg || 'Saved' }; render(); }
      }).catch((err) => {
        detailMsg = {
          text: (err && err.message) || 'That change did not save. Check your connection and try again.',
          err: true
        };
        render();
      });
    }

    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeDetail(); });

    box.addEventListener('input', (e) => {
      // A volunteer's name is repeated in every week's table; keep them equal.
      if (e.target.classList.contains('vname')) {
        const id = e.target.getAttribute('data-mname');
        box.querySelectorAll('[data-mname="' + id + '"]').forEach((el) => { if (el !== e.target) el.value = e.target.value; });
      }
      markDirty();
    });
    box.addEventListener('change', (e) => {
      if (e.target.matches('[data-weeksel]')) {
        sel = e.target.value;
        detailWeek = sel;
        box.querySelectorAll('[data-wkpanel]').forEach((el) => { el.hidden = el.getAttribute('data-wkpanel') !== sel; });
        box.querySelector('[data-addwk]').textContent = 'Week ' + weekNo(sel);
        box.querySelector('[data-noteswk]').textContent = 'Week ' + weekNo(sel);
        box.querySelector('[data-noteslist]').innerHTML = notesHtml(sel);
        return;
      }
      markDirty();
    });

    box.addEventListener('click', (e) => {
      if (e.target.closest('[data-closedetail]')) { closeDetail(); return; }

      // Show / hide the "new volunteer" form.
      if (e.target.closest('[data-showadd]')) {
        box.querySelector('[data-addform]').hidden = false;
        box.querySelector('[data-showadd]').hidden = true;
        box.querySelector('[data-newname]').focus();
        return;
      }
      if (e.target.closest('[data-canceladd]')) {
        ['[data-newname]', '[data-newtask]', '[data-newnext]', '[data-newhours]'].forEach((q) => { box.querySelector(q).value = ''; });
        box.querySelector('[data-addform]').hidden = true;
        box.querySelector('[data-showadd]').hidden = false;
        return;
      }

      // Update: save just this volunteer's details for this row's week and add
      // them, with the current date and time, to their records. Whatever is
      // typed in other rows stays on screen untouched.
      const upd = e.target.closest('[data-updatevol]');
      if (upd) {
        const id = upd.getAttribute('data-updatevol'), k = upd.getAttribute('data-wk');
        const m = p.team.find((x) => x.id === id);
        const tr = box.querySelector('tr[data-own="' + id + '"][data-wk="' + k + '"]');
        if (!m || !tr) return;
        const line = tr.querySelector('[data-upd]');
        const backup = JSON.stringify({ w: m.weeks, l: m.log, r: m.role, n: m.next, t: p.touched });
        const changed = recordUpdate(m, k, {
          task: tr.querySelector('[data-wtask]').value.trim(),
          next: tr.querySelector('[data-wnext]').value.trim(),
          hours: Math.max(0, Number(tr.querySelector('[data-whours]').value) || 0)
        });
        if (!changed) { line.className = 'upd'; line.textContent = 'Nothing new to record. ' + updText(m, k); return; }
        p.touched = now();
        upd.disabled = true;
        line.className = 'upd';
        line.textContent = 'Saving...';
        putProject(p).then(() => {
          line.className = 'upd ok';
          line.textContent = updText(m, k);
          upd.disabled = false;
          box.querySelector('[data-unsaved]').classList.remove('show');
        }).catch((err) => {
          const b = JSON.parse(backup);
          m.weeks = b.w; m.log = b.l; m.role = b.r; m.next = b.n; p.touched = b.t;
          line.className = 'upd err';
          line.textContent = (err && err.message) || 'That update did not save. Check your connection and try again.';
          upd.disabled = false;
        });
        return;
      }

      // Update (PM): save this week's work items and add a timestamped snapshot
      // of them to the PM's records. Other rows on screen are left as typed.
      const updPm = e.target.closest('[data-updatepm]');
      if (updPm) {
        const k = updPm.getAttribute('data-updatepm');
        const panelEl = box.querySelector('[data-wkpanel="' + k + '"]');
        const line = panelEl.querySelector('[data-pmupd]');
        const items = [...panelEl.querySelectorAll('tr.pmitem')].map((tr) => ({
          task: tr.querySelector('[data-wtask]').value.trim(),
          next: tr.querySelector('[data-wnext]').value.trim(),
          hours: Math.max(0, Number(tr.querySelector('[data-whours]').value) || 0),
          who: tr.getAttribute('data-who') || p.pm || me || ''
        })).filter((it) => it.hours > 0 || it.task || it.next);
        const backup = JSON.stringify({ w: p.weeks, l: p.pmLog, t: p.touched });
        if (!recordPmUpdate(p, k, items)) { line.className = 'upd'; line.textContent = 'Nothing new to record. ' + pmUpdText(p, k); return; }
        p.touched = now();
        updPm.disabled = true;
        line.className = 'upd';
        line.textContent = 'Saving...';
        putProject(p).then(() => {
          line.className = 'upd ok';
          line.textContent = pmUpdText(p, k);
          updPm.disabled = false;
          box.querySelector('[data-unsaved]').classList.remove('show');
        }).catch((err) => {
          const b = JSON.parse(backup);
          p.weeks = b.w; p.pmLog = b.l; p.touched = b.t;
          line.className = 'upd err';
          line.textContent = (err && err.message) || 'That update did not save. Check your connection and try again.';
          updPm.disabled = false;
        });
        return;
      }

      // Add / remove a PM work item (client-side until Save changes).
      const addItem = e.target.closest('[data-addpmitem]');
      if (addItem) {
        const k = addItem.getAttribute('data-addpmitem');
        const rows = box.querySelectorAll('[data-wkpanel="' + k + '"] tr.pmitem');
        const ref = rows[rows.length - 1];
        ref.insertAdjacentHTML('afterend', pmItemRow(k, null, p));
        ref.nextElementSibling.querySelector('textarea').focus();
        return;
      }
      const dropItem = e.target.closest('[data-dropitem]');
      if (dropItem) {
        const tr = dropItem.closest('tr');
        const same = tr.parentNode.querySelectorAll('tr.pmitem');
        // Always leave one row so the week still has somewhere to type.
        if (same.length > 1) tr.remove();
        else tr.querySelectorAll('textarea, input').forEach((el) => { el.value = ''; });
        markDirty();
        return;
      }

      // Open one person's full record (all weeks, paginated).
      const vp = e.target.closest('[data-viewperson]');
      if (vp) {
        const own = vp.getAttribute('data-viewperson');
        const go = () => { person = { pid: p.id, own, page: 1 }; render(); };
        if (box.querySelector('[data-unsaved]').classList.contains('show')) {
          confirmModal('Leave without saving?', 'You have unsaved changes on ' + p.name + '. Opening the records will discard them.', 'Discard and open').then((ok) => { if (ok) go(); });
        } else go();
        return;
      }

      // Open History filtered to this project. Anything unsaved here would be
      // lost, so ask first.
      if (e.target.closest('[data-openhistory]')) {
        const go = () => { openId = null; mode = 'history'; hist.proj = p.id; hist.pm = 'all'; hist.year = null; hist.month = null; hist.week = 'all'; render(); };
        if (box.querySelector('[data-unsaved]').classList.contains('show')) {
          confirmModal('Leave without saving?', 'You have unsaved changes on ' + p.name + '. Opening History will discard them.', 'Discard and open').then((ok) => { if (ok) go(); });
        } else go();
        return;
      }

      if (e.target.closest('[data-savedetail]')) {
        readForm();
        commit('Saved', false);
        return;
      }

      const dr = e.target.closest('[data-drop]');
      if (dr) {
        const id = dr.getAttribute('data-drop');
        const m = p.team.find((x) => x.id === id);
        if (m) {
          confirmModal('Remove volunteer?', 'Remove ' + (m.name || 'this person') + ' from ' + p.name + '? This also takes them off the project on the website. Hours they already logged are kept in the database.', 'Remove').then((ok) => {
            if (!ok) return;
            readForm();
            p.team = p.team.filter((x) => x.id !== id);
            commit('Removed', false);
          });
        }
        return;
      }

      const delNote = e.target.closest('[data-delnote]');
      if (delNote) {
        const id = delNote.getAttribute('data-delnote');
        const n = p.notes.find((x) => x.id === id);
        if (n) {
          confirmModal('Delete this update?', 'Are you sure you want to delete this update?', 'Delete').then((ok) => {
            if (!ok) return;
            readForm();
            p.notes = p.notes.filter((x) => x.id !== id);
            commit('Update deleted', false);
          });
        }
        return;
      }

      if (e.target.closest('[data-addperson]')) {
        const nEl = box.querySelector('[data-newname]');
        const name = nEl.value.trim();
        if (!name) { nEl.focus(); return; }
        if (!findMember(p, name) && !isFellow(name)) {
          dstatus.textContent = notAFellow(name);
          dstatus.className = 'detail-status err';
          nEl.focus();
          return;
        }

        const existing = findMember(p, name);
        if (existing) {
          confirmModal(
            'Already on this project',
            name + ' is already listed on ' + p.name + '. Add this week\'s details under their existing entry instead of a second row?',
            'Add to their entry'
          ).then((ok) => {
            if (!ok) return;
            const wk = selWk();
            const tEl = box.querySelector('[data-newtask]'), nxEl = box.querySelector('[data-newnext]'), hEl = box.querySelector('[data-newhours]');
            const hrs = Math.max(0, Number(hEl && hEl.value) || 0);
            // Write into this week's row for that volunteer, then let readForm()
            // pick everything up the normal way -- one code path for both
            // a plain edit and this merge.
            const tr = box.querySelector('tr[data-own="' + existing.id + '"][data-wk="' + wk + '"]');
            if (tr) {
              if (tEl && tEl.value.trim()) tr.querySelector('[data-wtask]').value = tEl.value.trim();
              if (nxEl && nxEl.value.trim()) tr.querySelector('[data-wnext]').value = nxEl.value.trim();
              if (hrs > 0) {
                const h = tr.querySelector('[data-whours]');
                h.value = (Number(h.value) || 0) + hrs;
              }
            }
            [nEl, tEl, nxEl, hEl].forEach((el) => { if (el) el.value = ''; });
            readForm();
            commit('Details logged for ' + name, false);
          });
          return;
        }

        readForm(); // picks the new volunteer up along with everything else
        commit(name + ' added', false);
        return;
      }

      if (e.target.closest('[data-post]')) {
        const ta = box.querySelector('[data-note]');
        if (!ta.value.trim()) { ta.focus(); return; }
        readForm(); // picks the update up along with everything else
        commit('Update logged', false);
      }
    });
  }

  /* ---------- one person's records ---------- */

  // One record per week, newest first. A volunteer's week holds every timestamped
  // update made in it (newest first); weeks saved before updates were timed show
  // their single entry. A PM's week holds all of that week's work items.
  function personRecords(p, own) {
    const by = new Map();
    const rec = (wk) => {
      let r = by.get(wk);
      if (!r) { r = { week: wk, hours: 0, items: [] }; by.set(wk, r); }
      return r;
    };
    if (own === 'pm') {
      p.weeks.forEach((w) => { rec(w.week).hours += Number(w.hours) || 0; });
      (p.pmLog || []).forEach((l) => rec(l.week));
      // Every CURRENT work item is shown -- not just whichever ones happened to
      // be part of the most recent Update click -- since an item that hasn't
      // changed since an earlier click is still real, live work for the week,
      // and was disappearing from this screen whenever a later click didn't
      // happen to mention it. Each item's timestamp is the most recent log
      // entry that recorded it (or none, if it predates timestamped updates).
      const allLog = (p.pmLog || []).slice().sort((a, b) => (a.at < b.at ? 1 : -1));
      by.forEach((r, wk) => {
        const logsThisWeek = allLog.filter((l) => l.week === wk);
        let latestAt = null;
        r.items = pmItems(p, wk).map((it) => {
          const hit = logsThisWeek.find((l) => (l.items || []).some((g) => g.task && g.task === it.task));
          if (!hit) return { task: it.task, next: it.next, hours: it.hours, untimed: true };
          if (!latestAt || hit.at > latestAt) latestAt = hit.at;
          return { task: it.task, next: it.next, hours: it.hours, at: hit.at, who: hit.who };
        });
        r.items.forEach((it) => { if (it.at && it.at === latestAt) it.latest = true; });
        // Most recently touched first; items with no timestamp trail at all last.
        r.items.sort((a, b) => (a.at && b.at ? (a.at < b.at ? 1 : -1) : a.at ? -1 : b.at ? 1 : 0));
      });
    } else {
      const m = p.team.find((x) => x.id === own) || { weeks: [], log: [] };
      m.weeks.forEach((w) => { rec(w.week).hours = Number(w.hours) || 0; });
      (m.log || []).forEach((l) => rec(l.week));
      by.forEach((r, wk) => {
        const ups = (m.log || []).filter((l) => l.week === wk).sort((a, b) => (a.at < b.at ? 1 : -1));
        if (ups.length) {
          // Only the latest update for the week (older data may still hold several).
          const u = ups[0];
          r.items = [{ task: u.task, next: u.next, hours: u.hours, at: u.at, who: u.who }];
        } else {
          const e = entryOf(m.weeks, wk);
          r.items = e ? [{ task: e.task, next: e.next, hours: e.hours, untimed: true }] : [];
        }
      });
    }
    return Array.from(by.values()).sort((a, b) => (a.week < b.week ? 1 : -1));
  }

  // Page buttons: all of them when there are few, otherwise first, last and the neighbours.
  function pagerHtml(page, pages) {
    if (pages <= 1) return '';
    const nums = [];
    for (let n = 1; n <= pages; n++) if (pages <= 7 || n === 1 || n === pages || Math.abs(n - page) <= 1) nums.push(n);
    let html = '<button data-page="' + (page - 1) + '"' + (page === 1 ? ' disabled' : '') + '>&larr; Previous</button>';
    nums.forEach((n, i) => {
      if (i && n - nums[i - 1] > 1) html += '<span class="gap">&hellip;</span>';
      html += '<button data-page="' + n + '"' + (n === page ? ' class="on" aria-current="page"' : '') + '>' + n + '</button>';
    });
    return html + '<button data-page="' + (page + 1) + '"' + (page === pages ? ' disabled' : '') + '>Next &rarr;</button>';
  }

  function renderPersonView(p) {
    const isPm = person.own === 'pm';
    const m = isPm ? null : p.team.find((x) => x.id === person.own);
    const name = isPm ? (p.pm || 'Project manager') : m.name;
    const recs = personRecords(p, person.own);
    const pages = Math.max(1, Math.ceil(recs.length / RECORDS_PER_PAGE));
    person.page = Math.min(Math.max(1, person.page), pages);
    const from = (person.page - 1) * RECORDS_PER_PAGE;
    const slice = recs.slice(from, from + RECORDS_PER_PAGE);
    const total = recs.reduce((s, r) => s + r.hours, 0);
    const updates = (p.pmLog || []).length;

    const whenHtml = (it) =>
      (it.at ? '<div class="rec-when">' + esc(stamp(it.at)) + (it.who ? ' &middot; by ' + esc(it.who) : '') +
        (it.latest ? ' <span class="chip">latest</span>' : '') + '</div>' : '') +
      (it.untimed ? '<div class="rec-when muted">No timestamp (saved before updates were timed)</div>' : '');

    // Volunteers have one entry per week ("N hrs for the week" is accurate).
    // The PM can have several work items in a week, so each one shows its own
    // hours -- "for the week" would wrongly read as if that one item were the
    // week's whole total (the true total is already in the week's own header).
    const itemHtml = (r, it) => {
      const cleared = !isPm && it.at && !it.task && !it.next && !(Number(it.hours) > 0);
      return '<div class="rec-item">' + whenHtml(it) +
        '<div class="rec-task">' + esc(cleared ? '(cleared)' : (it.task || 'not stated')) + '</div>' +
        (it.next ? '<div class="rec-meta">Next: ' + esc(it.next) + '</div>' : '') +
        (isPm
          ? '<div class="rec-meta">' + (Number(it.hours) || 0) + ' hrs</div>'
          : (it.at ? '<div class="rec-meta">' + (Number(it.hours) || 0) + ' hrs for the week</div>' : '')) +
        '</div>';
    };

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('data-detail-overlay', '');
    const box = document.createElement('div');
    box.className = 'modal-box detail-box';
    box.innerHTML =
      '<div class="detail-head"><h3>' + esc(name) + ' <span class="tag">' + (isPm ? 'PM' : 'Volunteer') + '</span></h3>' +
        '<button class="tiny ghost" data-personback>&larr; Back to ' + (isPm ? esc(p.name) : 'volunteers') + '</button></div>' +
      '<p class="hint">' + esc(p.name) + (m ? ' &middot; Added ' + esc(dayDate(m.added || now())) : '') +
        ' &middot; ' + recs.length + ' week' + (recs.length === 1 ? '' : 's') + ' logged &middot; ' + total + ' hrs in total' +
        (isPm ? ' &middot; ' + updates + ' update' + (updates === 1 ? '' : 's') + ' recorded' : '') + '</p>' +
      (slice.length
        ? slice.map((r) =>
            '<div class="rec"><div class="rec-head"><b>Week ' + weekNo(r.week) + ', ' + esc(monthLabel(monthOf(r.week))) + '</b>' +
              (r.week === thisWeek() ? ' <span class="chip">this week</span>' : '') +
              '<span class="rec-range">' + esc(weekRange(r.week)) + '</span><span class="rec-hrs">' + r.hours + ' hrs</span></div>' +
              r.items.map((it) => itemHtml(r, it)).join('') +
            '</div>').join('')
        : '<p class="empty">No weekly records yet. Add this week\'s details from the project window.</p>') +
      (recs.length
        ? '<div class="pager"><span class="pager-info">Showing ' + (from + 1) + '-' + (from + slice.length) + ' of ' + recs.length + ' weeks</span>' +
          '<span class="pager-btns">' + pagerHtml(person.page, pages) + '</span></div>'
        : '') +
      '<p class="hint-inline">Records are read-only here. Use Update in the project window to add to them.</p>';

    box.addEventListener('click', (e) => {
      if (e.target.closest('[data-personback]')) { person = null; render(); return; }
      const pg = e.target.closest('[data-page]');
      if (pg && !pg.disabled) { person.page = Number(pg.getAttribute('data-page')); render(); }
    });
    overlay.appendChild(box);
    document.querySelector('.hai').appendChild(overlay);
  }

  /* ---------- history ---------- */

  // Read-only record of every week that has anything logged, browsed by year,
  // then month, then week. Nothing is moved or deleted when a month ends: the
  // ledger just stops showing that month's rows under each person, and they
  // appear here. `match` is a (project) => boolean filter.
  function loggedWeeks(match) {
    const s = new Set();
    state.projects.filter(match).forEach((p) => {
      p.weeks.forEach((w) => s.add(w.week));
      p.notes.forEach((n) => s.add(n.week));
      p.team.forEach((m) => m.weeks.forEach((w) => s.add(w.week)));
    });
    return Array.from(s).filter(Boolean).sort();
  }

  // One row per person per project for a single week -- a PM's several work
  // items are joined into their one row, the same way the CSV export does it,
  // so a week with three work items reads as one row, not three.
  function historyRows(wk, match) {
    const out = [];
    sorted().filter(match).forEach((p) => {
      const items = pmItems(p, wk);
      if (items.length) {
        const withNext = items.find((it) => it.next);
        out.push({
          who: items[0].who || p.pm || 'PM', role: 'PM', proj: p.name,
          task: items.map((it) => it.task).filter(Boolean).join('; '),
          next: (withNext && withNext.next) || '',
          hours: items.reduce((s, it) => s + (Number(it.hours) || 0), 0)
        });
      }
      p.team.forEach((m) => {
        const e = entryOf(m.weeks, wk);
        if (e) out.push({ who: m.name, role: 'Volunteer', proj: p.name, task: e.task || '', next: e.next || '', hours: Number(e.hours) || 0 });
      });
    });
    const cmp = (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' });
    return out.sort((a, b) => cmp(a.proj, b.proj) || (a.role === b.role ? 0 : a.role === 'PM' ? -1 : 1) || cmp(a.who, b.who));
  }

  // A full-screen view of its own (like a project window) with a Back button, so
  // the project cards are not shown underneath it.
  function renderHistory() {
    // The filters follow the calendar: every month of the year and every week
    // of the month is offered, whether or not anything was logged in it. They
    // used to list only the months and weeks that already held data, so a
    // ledger with entries in October alone offered October as the only month.
    const pmNames = Array.from(new Set(state.projects.filter((p) => p.pm).map((p) => p.pm)))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    if (hist.pm !== 'all' && pmNames.indexOf(hist.pm) < 0) hist.pm = 'all';
    // Choosing a PM narrows the Project list to that PM's projects.
    const projOptions = sorted().filter((p) => hist.pm === 'all' || p.pm === hist.pm);
    if (hist.proj !== 'all' && !projOptions.some((p) => p.id === hist.proj)) hist.proj = 'all';
    const match = (p) => (hist.proj === 'all' || p.id === hist.proj) && (hist.pm === 'all' || p.pm === hist.pm);

    const curYear = thisMonth().slice(0, 4);
    const everyWeek = loggedWeeks(() => true);
    const firstYear = Math.min(Number(curYear), everyWeek.length ? Number(everyWeek[0].slice(0, 4)) : Number(curYear));
    const years = [];
    for (let y = Number(curYear); y >= firstYear; y--) years.push(String(y));
    if (years.indexOf(hist.year) < 0) hist.year = curYear;

    const months = [];
    for (let m = 1; m <= 12; m++) months.push(hist.year + '-' + pad2(m));
    const logged = loggedWeeks(match);
    if (months.indexOf(hist.month) < 0) {
      // This year opens on the current month; an earlier year on its last month with data.
      hist.month = hist.year === curYear ? thisMonth()
        : (logged.filter((w) => w.slice(0, 4) === hist.year).map(monthOf).pop() || hist.year + '-12');
    }
    // Every Monday in the month, plus any logged week that somehow is not one.
    const mWeeks = Array.from(new Set(weeksOfMonth(hist.month).concat(logged.filter((w) => monthOf(w) === hist.month)))).sort();
    if (hist.week !== 'all' && mWeeks.indexOf(hist.week) < 0) hist.week = 'all';
    const shown = hist.week === 'all' ? mWeeks : [hist.week];

    // Totals across the selected weeks (the whole month, or just the one
    // week chosen) -- this is the default view: a month's totals, not a
    // week-by-week printout, since the Week filter is there for that.
    const totals = new Map();
    shown.forEach((wk) => {
      historyRows(wk, match).forEach((r) => {
        const key = r.who + '|' + r.proj;
        const t = totals.get(key) || { who: r.who, proj: r.proj, role: r.role, hours: 0, weekSet: new Set() };
        t.hours += r.hours; t.weekSet.add(wk);
        totals.set(key, t);
      });
    });
    const totalRows = Array.from(totals.values()).sort((x, y) =>
      x.proj.localeCompare(y.proj, undefined, { sensitivity: 'base' }) || (x.role === y.role ? 0 : x.role === 'PM' ? -1 : 1) || x.who.localeCompare(y.who, undefined, { sensitivity: 'base' }));
    const grand = totalRows.reduce((s, t) => s + t.hours, 0);
    const scope = hist.week === 'all' ? monthLabel(hist.month) : 'week of ' + weekShort(hist.week);

    // The week-by-week breakdown (who worked on what) only appears once a
    // single week is chosen, so the default screen is just the month's totals.
    let detailHtml = '';
    if (hist.week !== 'all') {
      const wk = hist.week;
      const rows = historyRows(wk, match);
      const notes = [];
      sorted().filter(match).forEach((p) =>
        notesIn(p, wk).forEach((n) => notes.push('<div class="mbody"><span class="lbl">' + esc(p.name) + ' update' +
          (n.who ? ' (' + esc(n.who) + ')' : '') + ': </span>' + esc(n.text) + '</div>')));
      detailHtml = '<div class="block hweek"><h3>Week ' + weekNo(wk) + ', week of ' + esc(weekShort(wk)) + '</h3>' +
        (rows.length
          ? '<table class="team"><thead><tr><th class="who">Person</th><th>Project</th><th>Worked on</th><th>Next step</th><th class="hrs">Hours</th></tr></thead><tbody>' +
            rows.map((r) => '<tr class="' + (r.role === 'PM' ? 'pmrow' : 'vrow') + '"><td class="who nm">' + esc(r.who) + (r.role === 'PM' ? ' <span class="tag">PM</span>' : '') + '</td><td>' + esc(r.proj) +
              '</td><td>' + esc(r.task || 'not stated') + '</td><td>' + esc(r.next) + '</td><td class="hrs">' + r.hours + '</td></tr>').join('') +
            '</tbody></table>'
          : '<p class="empty">No hours or details logged this week.</p>') +
        notes.join('') + '</div>';
    }

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('data-detail-overlay', '');
    const box = document.createElement('div');
    box.className = 'modal-box detail-box wide';
    box.innerHTML =
      '<div class="detail-head"><h3>History</h3><button class="tiny ghost" data-close>&larr; Back to ledger</button></div>' +
      '<p class="hint">Pick a year and month to see that month\'s totals, then a week to see who worked on what that week. Project and PM narrow either view. Weeks in the current month can still be edited from each project.</p>' +
      '<div class="hfilters">' +
        '<label>Year <select data-hyear>' + years.map((y) => '<option value="' + y + '"' +
          (y === hist.year ? ' selected' : '') + '>' + y + '</option>').join('') + '</select></label>' +
        '<label>Month <select data-hmonth>' + months.map((m) => '<option value="' + m + '"' + (m === hist.month ? ' selected' : '') + '>' +
          esc(MONTHS[Number(m.slice(5, 7)) - 1]) + (m === thisMonth() ? ' (current)' : '') + '</option>').join('') + '</select></label>' +
        '<label>Week <select data-hweek><option value="all">All weeks (month totals)</option>' + mWeeks.map((w) => '<option value="' + w + '"' +
          (w === hist.week ? ' selected' : '') + '>Week ' + weekNo(w) + ', ' + esc(weekShort(w)) + (w === thisWeek() ? ' (this week)' : '') + '</option>').join('') + '</select></label>' +
        '<label>Project <select data-hproj><option value="all">All projects</option>' + projOptions.map((p) => '<option value="' + p.id + '"' +
          (p.id === hist.proj ? ' selected' : '') + '>' + esc(p.name) + '</option>').join('') + '</select></label>' +
        '<label>PM <select data-hpm><option value="all">All PMs</option>' + pmNames.map((n) => '<option value="' + esc(n) + '"' +
          (n === hist.pm ? ' selected' : '') + '>' + esc(n) + '</option>').join('') + '</select></label>' +
        '<span class="spacer"></span><button data-histexport>Download CSV</button>' +
      '</div>' +
      // Exactly one table: month totals when "All weeks" is picked, or the
      // single week's own breakdown when a week is picked -- never both, so
      // one filter state always shows one clear view.
      (hist.week === 'all'
        ? '<div class="block"><h3>Totals for ' + esc(scope) + ': ' + grand + ' hrs</h3>' +
          (totalRows.length
            ? '<table class="team"><thead><tr><th class="who">Person</th><th>Project</th><th>Weeks logged</th><th class="hrs">Hours</th></tr></thead><tbody>' +
              totalRows.map((t) => '<tr class="' + (t.role === 'PM' ? 'pmrow' : 'vrow') + '"><td class="who nm">' + esc(t.who) + (t.role === 'PM' ? ' <span class="tag">PM</span>' : '') + '</td><td>' + esc(t.proj) + '</td><td>' + t.weekSet.size +
                '</td><td class="hrs">' + t.hours + '</td></tr>').join('') + '</tbody></table>'
            : '<p class="empty">Nothing has been logged for this selection yet.</p>') +
          '</div>'
        : detailHtml);

    box.addEventListener('change', (e) => {
      const t = e.target;
      if (t.matches('[data-hyear]')) { hist.year = t.value; hist.month = null; hist.week = 'all'; render(); }
      else if (t.matches('[data-hmonth]')) { hist.month = t.value; hist.week = 'all'; render(); }
      else if (t.matches('[data-hweek]')) { hist.week = t.value; render(); }
      else if (t.matches('[data-hproj]')) { hist.proj = t.value; hist.week = 'all'; render(); }
      else if (t.matches('[data-hpm]')) { hist.pm = t.value; hist.week = 'all'; render(); }
    });
    box.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) { mode = null; render(); return; }
      if (e.target.closest('[data-histexport]')) {
        const name = 'hai-ledger-' + hist.month + (hist.week === 'all' ? '' : '-week-' + hist.week) + '.csv';
        downloadCSV(shown, name, true, match);
      }
    });
    overlay.addEventListener('click', (e) => { if (e.target === overlay) { mode = null; render(); } });
    overlay.appendChild(box);
    document.querySelector('.hai').appendChild(overlay);
  }

  function render() {
    renderDeadline();
    renderAttention();
    slotEl.innerHTML = '';
    if (mode === 'review') renderReview();
    const shown = sorted().filter((p) =>
      filter === 'attention' ? needsAttention(p) : filter === 'mine' ? isMine(p) : true);
    listEl.innerHTML = '';
    if (!shown.length) {
      const li = document.createElement('li');
      li.innerHTML = '<p class="empty" style="padding:16px 0">' +
        (filter === 'mine' ? 'You are not the PM of any project yet. An admin assigns PMs in the admin dashboard.' : 'Nothing here right now.') + '</p>';
      listEl.appendChild(li);
    } else {
      shown.forEach((p) => listEl.appendChild(renderRow(p)));
    }

    const staleModal = document.querySelector('.hai > [data-detail-overlay]');
    if (staleModal) staleModal.remove();
    if (openId) {
      const p = state.projects.find((x) => x.id === openId);
      if (!p) { openId = null; person = null; }
      else if (person && person.pid === p.id && (person.own === 'pm' || p.team.some((x) => x.id === person.own))) renderPersonView(p);
      else { person = null; renderDetailModal(p); }
    } else person = null;
    if (mode === 'history' && !openId) renderHistory();
    if (mode === 'meeting' && !openId) renderMeeting();
  }

  listEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open]');
    if (!btn) return;
    openId = btn.getAttribute('data-open');
    detailWeek = null;
    render();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && person) { person = null; render(); }
    else if (e.key === 'Escape' && openId) { openId = null; render(); }
    else if (e.key === 'Escape' && (mode === 'history' || mode === 'meeting')) { mode = null; render(); }
  });

  document.querySelectorAll('[data-filter]').forEach((b) => {
    b.addEventListener('click', () => {
      filter = b.getAttribute('data-filter');
      document.querySelectorAll('[data-filter]').forEach((x) => x.classList.toggle('on', x === b));
      render();
    });
  });

  $('review').addEventListener('click', () => { mode = mode === 'review' ? null : 'review'; render(); });
  $('meeting').addEventListener('click', () => { mode = mode === 'meeting' ? null : 'meeting'; render(); });
  $('history').addEventListener('click', () => { mode = mode === 'history' ? null : 'history'; render(); });
  $('export').addEventListener('click', () => downloadCSV([thisWeek()], 'hai-ledger-week-' + thisWeek() + '.csv', false));



  // The signed-in fellow (or admin) is who every update is recorded under.
  async function init() {
    try {
      const r = await fetch('/api/ledger/me');
      if (r.status === 401) { window.location.href = '/fellows/login?next=/ledger'; return; }
      if (r.ok) {
        const user = (await r.json()).user || {};
        me = user.name || '';
        meId = user.id || '';
      }
    } catch (e) {}
    meEl.value = me;
    load();
  }

  init();
})();
