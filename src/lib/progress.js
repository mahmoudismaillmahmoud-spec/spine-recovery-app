import { DAYS } from '../data/spine-data.js';
import { ls, lsSet } from './storage.js';

export const allItems = () => DAYS.flatMap(d => d.groups.flatMap(g => g.items));
export function findItem(id) { return allItems().find(it => it.id === id) || null; }
export function dayOf(id) { return DAYS.find(d => d.groups.some(g => g.items.some(it => it.id === id))) || null; }
export function dayPct(d, checked) {
  let done = 0, total = 0;
  d.groups.forEach(g => g.items.forEach(it => { total++; if (checked[it.id]) done++; }));
  return total ? done / total * 100 : 0;
}

export function computeStreak() {
  const dates = ls('completedDates', []).concat(ls('skippedDates', []));
  if (!dates.length) return 0;
  const set = new Set(dates);
  let streak = 0; const cursor = new Date();
  if (!set.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
  while (set.has(cursor.toDateString())) { streak++; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}
export function recordDayCompletion() {
  const today = new Date().toDateString();
  const dates = ls('completedDates', []);
  if (!dates.includes(today)) { dates.push(today); if (dates.length > 90) dates.shift(); lsSet('completedDates', dates); }
}
export function recordDailySnapshot(checked) {
  let done = 0, total = 0;
  allItems().forEach(it => { total++; if (checked[it.id]) done++; });
  const pct = total ? Math.round(done / total * 100) : 0;
  const today = new Date().toDateString();
  const hist = ls('weekPctHistory', []);
  const idx = hist.findIndex(h => h.date === today);
  if (idx >= 0) hist[idx].pct = pct; else hist.push({ date: today, pct });
  if (hist.length > 30) hist.shift();
  lsSet('weekPctHistory', hist);
}
export function getLevelInfo(perLevel) {
  const xp = ls('lifetimeXP', 0);
  return { xp, level: Math.floor(xp / perLevel) + 1, inLevel: xp % perLevel, perLevel };
}
export function adaptiveNote(id, t) {
  const logs = ls('wlog_' + id, []);
  if (!logs.length) return null;
  const last = logs[logs.length - 1];
  if (last.pain >= 3) return { cls: 'warn-note', text: t('حسيت بألم أعلى المرة دي — يفضل تقلل الوزن أو الحمل في المرة الجاية وترجع تدريجيًا', 'You logged higher pain this time — consider reducing the weight/load next time and progressing gradually') };
  if (last.pain === 1 && logs.length >= 2) return { cls: 'ok-note', text: t('مفيش ألم مسجل وده كويس — لو حاسس إن التمرين بقى سهل ممكن تزود شوية الأسبوع الجاي', 'No pain logged — nice. If it felt easy, you can progress slightly next week') };
  return null;
}
export function photoProgressAnalysis() {
  const weighted = ls('reportPhotos', []).filter(p => p.weight != null).sort((a, b) => new Date(a.date) - new Date(b.date));
  if (weighted.length < 2) return null;
  const first = weighted[0], last = weighted[weighted.length - 1];
  return { count: weighted.length, first, last, diff: Math.round((last.weight - first.weight) * 10) / 10 };
}
