// Same localStorage keys as the original prototype so existing data and backups keep working.
export function ls(key, fb) {
  try { const v = localStorage.getItem(key); return v == null ? fb : JSON.parse(v); } catch (e) { return fb; }
}
export function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; }
}
export function todayKey() { return new Date().toDateString(); }
