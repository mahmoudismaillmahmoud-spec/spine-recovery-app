import React from 'react';
import { DAYS } from './data/spine-data.js';
import { CONFIG } from './config.js';
import { ls, lsSet, todayKey } from './lib/storage.js';
import { playTick, playClick, playBeep, vibrate } from './lib/sound.js';
import { findItem, dayOf, dayPct, recordDayCompletion, recordDailySnapshot } from './lib/progress.js';
import { openMonthlyReport } from './lib/report.js';
import { KEY_STORAGE } from './lib/claude-store.js';
import { Header, Dashboard } from './components/Dashboard.jsx';
import Tabs from './components/Tabs.jsx';
import DayPanel from './components/DayPanel.jsx';
import ProgressPanel from './components/ProgressPanel.jsx';
import CoachPanel from './components/CoachPanel.jsx';
import BottomNav from './components/BottomNav.jsx';
import FocusOverlay from './components/FocusOverlay.jsx';
import { SettingsSheet, EmergencySheet, PendingPhotoSheet, DetailSheet, CelebrateCard } from './components/Sheets.jsx';

const DEFAULT_TIMES = { mob: '07:30', breakfast: '09:00', snack1: '11:30', lunch: '14:00', gym: '17:30', snack2: '19:00', dinner: '21:00' };
const REMINDER_LABELS = {
  mob: { ar: 'وقت الحركة اليومية', en: 'Time for Daily Mobility' },
  breakfast: { ar: 'وقت الفطار', en: 'Time for Breakfast' },
  snack1: { ar: 'وقت سناك 1', en: 'Time for Snack 1' },
  lunch: { ar: 'وقت الغدا', en: 'Time for Lunch' },
  gym: { ar: 'وقت الجيم', en: 'Time for Gym' },
  snack2: { ar: 'وقت سناك 2', en: 'Time for Snack 2' },
  dinner: { ar: 'وقت العشا', en: 'Time for Dinner' },
};
const focusable = it => it.type === 'reps' || it.type === 'hold';
const todayDay = () => DAYS[new Date().getDay() % 7];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let lang = CONFIG.defaultLang;
    try { const raw = localStorage.getItem('lang'); if (raw) lang = raw.replace(/"/g, ''); } catch (e) {}
    if (lang !== 'en') lang = 'ar';
    const checked = {}, counters = {}, timeLeft = {};
    DAYS.forEach(d => d.groups.forEach(g => g.items.forEach(it => {
      checked[it.id] = ls('chk_' + it.id, false);
      counters[it.id] = ls('cnt_' + it.id, 0);
      if (it.type === 'hold') timeLeft[it.id] = ls('time_' + it.id, it.target);
    })));
    const standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone;
    this.state = {
      lang, dark: ls('darkMode', false), currentDay: 'd1', nav: 'today',
      checked, counters, timeLeft, running: {}, query: '',
      painSel: {}, wInputs: {}, notesTick: 0,
      sheetOpen: false, emergencyOpen: false, notifStatus: null,
      times: ls('notifTimes', null) || DEFAULT_TIMES,
      focus: { open: false, idx: 0, phase: 'exercise', list: [], remaining: 0, holdRunning: false },
      celebrate: null, saveShow: false, voiceOn: ls('voiceModeOn', false), photos: ls('reportPhotos', []),
      detailItemId: null, pwaBannerShow: !standalone && !ls('pwaBannerDismissed', false),
      waterCount: ls('water_' + todayKey(), 0), sleepHours: ls('sleep_' + todayKey(), ''),
      healthImport: ls('healthImport_' + todayKey(), null), healthMsg: null, healthAuto: ls('healthAuto', false),
      undoToast: null, pendingPhoto: null, photoTagWeight: '', photoTagType: 'progress',
    };
    this.intervals = {};
    this.focusInterval = null;
    this.panelsRef = React.createRef();
  }

  // ---------- lifecycle ----------
  componentDidMount() {
    this.applyBrandColor();
    this.applyDoc(this.state.lang, this.state.dark);
    recordDailySnapshot(this.state.checked);
    if ('Notification' in window && Notification.permission === 'granted' && ls('notifTimes', null)) this.startNotifLoop();
    this.initSwipe();
    this._onClickSound = e => {
      if (e.target.closest('button, .chk, .tab, .navbtn, .card-title, .skip-day-btn, .suggest-card, .search-result-row')) playClick();
    };
    document.addEventListener('click', this._onClickSound, true);
    // Floating buttons slide away while scrolling down so they never cover content.
    let lastY = window.scrollY;
    this._onScroll = () => {
      const y = window.scrollY, root = document.documentElement.classList;
      if (Math.abs(y - lastY) > 6) root.toggle('scrolling-down', y > lastY && y > 120);
      lastY = y;
      clearTimeout(this._scrollStopT);
      this._scrollStopT = setTimeout(() => root.remove('scrolling-down'), 700);
    };
    window.addEventListener('scroll', this._onScroll, { passive: true });
    this._onFirstTouch = () => this.autoImportHealth();
    document.addEventListener('pointerup', this._onFirstTouch, true);
    this._onVisible = () => { if (document.visibilityState === 'visible') this._healthTried = false; };
    document.addEventListener('visibilitychange', this._onVisible);
  }
  componentWillUnmount() {
    Object.values(this.intervals).forEach(i => clearInterval(i));
    if (this.focusInterval) clearInterval(this.focusInterval);
    if (this._notifInterval) clearInterval(this._notifInterval);
    document.removeEventListener('click', this._onClickSound, true);
    document.removeEventListener('pointerup', this._onFirstTouch, true);
    document.removeEventListener('visibilitychange', this._onVisible);
    window.removeEventListener('scroll', this._onScroll);
  }

  // ---------- helpers ----------
  save(key, val) { lsSet(key, val); this.showSaved(); }
  showSaved() {
    this.setState({ saveShow: true });
    clearTimeout(this._saveT);
    this._saveT = setTimeout(() => this.setState({ saveShow: false }), 1100);
  }
  isAr() { return this.state.lang !== 'en'; }
  t = (ar, en) => (this.isAr() ? ar : en);

  applyBrandColor() {
    const [green, dark, light] = CONFIG.primaryColor;
    const root = document.documentElement.style;
    if (green) root.setProperty('--green', green);
    if (dark) root.setProperty('--green-dark', dark);
    if (light) root.setProperty('--green-accent', light);
  }
  applyDoc(lang, dark) {
    const html = document.documentElement;
    html.lang = lang; html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    html.classList.toggle('dark', !!dark);
  }
  toggleLang = () => {
    const lang = this.isAr() ? 'en' : 'ar';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    this.applyDoc(lang, this.state.dark);
    this.setState({ lang });
  };
  toggleTheme = () => {
    const dark = !this.state.dark;
    this.save('darkMode', dark);
    this.applyDoc(this.state.lang, dark);
    this.setState({ dark });
  };

  // ---------- checklist / counters / timers ----------
  awardXP(id) {
    const key = id + '_' + new Date().toDateString();
    const xpLog = ls('xpLog', {});
    if (xpLog[key]) return;
    xpLog[key] = true;
    this.save('xpLog', xpLog);
    this.save('lifetimeXP', ls('lifetimeXP', 0) + 1);
  }
  toggleCheck = id => {
    const checked = { ...this.state.checked };
    const now = !checked[id];
    checked[id] = now;
    this.save('chk_' + id, now);
    vibrate(now ? 12 : 8);
    if (now) this.awardXP(id);
    let celebrate = this.state.celebrate;
    const day = dayOf(id);
    if (day) {
      if (dayPct(day, checked) >= 100) {
        if (!ls('celebrated_' + day.id, false)) {
          this.save('celebrated_' + day.id, true);
          recordDayCompletion();
          playBeep();
          celebrate = day;
        }
      } else {
        this.save('celebrated_' + day.id, false);
      }
    }
    let undoToast = this.state.undoToast;
    if (now) {
      const it = findItem(id);
      if (it) {
        undoToast = { id, ar: it.ar, en: it.en };
        clearTimeout(this._undoT);
        this._undoT = setTimeout(() => this.setState(s => (s.undoToast && s.undoToast.id === id ? { undoToast: null } : {})), 3200);
      }
    } else if (undoToast && undoToast.id === id) undoToast = null;
    this.setState({ checked, celebrate, undoToast }, () => recordDailySnapshot(this.state.checked));
  };
  undoLastCheck = () => {
    const id = this.state.undoToast && this.state.undoToast.id;
    if (id) this.toggleCheck(id);
    this.setState({ undoToast: null });
  };
  changeCounter = (id, delta) => {
    const it = findItem(id);
    const prev = this.state.counters[id] || 0;
    const v = Math.min(it.target, Math.max(0, prev + delta));
    this.save('cnt_' + id, v);
    this.setState(s => ({ counters: { ...s.counters, [id]: v } }));
    vibrate(8);
    if (prev === 0 && v === 1) this.speakExercise(it);
    if (v >= it.target && !this.state.checked[id]) this.toggleCheck(id);
  };
  startTimer = (id, target) => {
    if (this.intervals[id]) return;
    const it = findItem(id);
    if (it) this.speakExercise(it);
    let remaining = this.state.timeLeft[id];
    if (remaining == null || remaining <= 0) remaining = target;
    this.setState(s => ({ running: { ...s.running, [id]: true }, timeLeft: { ...s.timeLeft, [id]: remaining } }));
    this.intervals[id] = setInterval(() => {
      remaining -= 1;
      lsSet('time_' + id, remaining);
      this.setState(s => ({ timeLeft: { ...s.timeLeft, [id]: remaining } }));
      if (remaining > 0) playTick();
      if (remaining <= 0) {
        clearInterval(this.intervals[id]); delete this.intervals[id];
        this.setState(s => ({ running: { ...s.running, [id]: false } }));
        playBeep();
        vibrate([15, 60, 15]);
        if (!this.state.checked[id]) this.toggleCheck(id);
      }
    }, 1000);
  };
  resetTimer = (id, target) => {
    if (this.intervals[id]) { clearInterval(this.intervals[id]); delete this.intervals[id]; }
    this.save('time_' + id, target);
    this.setState(s => ({ running: { ...s.running, [id]: false }, timeLeft: { ...s.timeLeft, [id]: target } }));
  };

  // ---------- weight / pain log ----------
  setPain = (id, level) => this.setState(s => ({ painSel: { ...s.painSel, [id]: level } }));
  setWeightInput = (id, v) => this.setState(s => ({ wInputs: { ...s.wInputs, [id]: v } }));
  logExercise = id => {
    const weightStr = this.state.wInputs[id];
    const weight = weightStr ? parseFloat(weightStr) : null;
    const pain = this.state.painSel[id] || null;
    if (weight === null && pain === null) return;
    const logs = ls('wlog_' + id, []);
    const today = new Date().toDateString();
    const existingIdx = logs.findIndex(l => l.date === today);
    const entry = { date: today, weight: weight !== null ? weight : (logs.length ? logs[logs.length - 1].weight : null), pain };
    if (existingIdx >= 0) logs[existingIdx] = entry; else logs.push(entry);
    if (logs.length > 60) logs.shift();
    this.save('wlog_' + id, logs);
    this.setState(s => ({ wInputs: { ...s.wInputs, [id]: '' }, notesTick: s.notesTick + 1 }));
  };

  // ---------- daily log ----------
  addWater = delta => {
    const v = Math.max(0, (this.state.waterCount || 0) + delta);
    this.save('water_' + todayKey(), v);
    vibrate(10);
    this.setState({ waterCount: v });
  };
  setSleepHours = val => { this.save('sleep_' + todayKey(), val); this.setState({ sleepHours: val }); };
  sendToAppleHealth = () => {
    let weight = null;
    DAYS.forEach(d => d.groups.forEach(g => g.items.forEach(it => {
      if (!it.sets) return;
      const logs = ls('wlog_' + it.id, []);
      const l = logs[logs.length - 1];
      if (l && l.date === todayKey() && l.weight != null) weight = l.weight;
    })));
    const payload = { water_cups: this.state.waterCount || 0, sleep_hours: this.state.sleepHours || '', weight_kg: weight, date: todayKey() };
    window.location.href = `shortcuts://run-shortcut?name=${encodeURIComponent('Log Spine Recovery')}&input=text&text=${encodeURIComponent(JSON.stringify(payload))}`;
  };
  // Pulls today's data that the "Get Spine Health" Shortcut copied to the clipboard.
  // (Clipboard, not a URL: iOS opens links in Safari, whose storage is separate from the installed app.)
  // Tolerant of how Shortcuts formats numbers on an Arabic-language iPhone:
  // Arabic-Indic digits (٨٢٫٤), thousands separators (6,543), and units/text after the number.
  parseHealthClipboard(text) {
    const s = String(text || '')
      .replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 0x0660))
      .replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 0x06F0))
      .replace(/٫/g, '.').replace(/٬/g, ',');
    if (!s.includes('spine-health')) return null;
    const read = key => {
      const m = s.match(new RegExp('"?' + key + '"?\\s*:\\s*"?([^"}]*)'));
      if (!m) return null;
      let v = m[1].trim().replace(/,\s*$/, '');
      v = v.replace(/,(?=\d{3}(\D|$))/g, '').replace(',', '.');
      const n = parseFloat(v);
      return isNaN(n) ? null : n;
    };
    const date = (s.match(/"date"\s*:\s*"([^"]*)"/) || [])[1] || null;
    return { source: 'spine-health', date, steps: read('steps'), weight_kg: read('weight_kg'), sleep_hours: read('sleep_hours'), water_ml: read('water_ml') };
  }
  async readHealthClipboard() {
    let data = null;
    try { data = this.parseHealthClipboard(await navigator.clipboard.readText()); } catch (e) {}
    const dt = data && data.date ? new Date(data.date) : null;
    return data && (!dt || isNaN(dt) || dt.toDateString() === todayKey()) ? data : null;
  }
  // Auto mode: a daily Shortcuts automation copies Health data; the first touch after opening
  // the app (a user gesture iOS requires for clipboard access) imports it. Never launches Shortcuts.
  setHealthAuto = on => { this.save('healthAuto', on); this.setState({ healthAuto: on }); };
  autoImportHealth = async () => {
    if (!this.state.healthAuto || this._healthTried || ls('healthImport_' + todayKey(), null)) return;
    this._healthTried = true;
    const data = await this.readHealthClipboard();
    if (data) this.applyHealth(data);
  };
  importFromHealth = async () => {
    const data = await this.readHealthClipboard();
    if (!data) {
      this.setState({ healthMsg: this.t('بشغّل الشورت كت… لما يخلص ارجع للتطبيق ودوس الزرار تاني', 'Running the Shortcut… when it finishes, come back and tap this button again') });
      window.location.href = `shortcuts://run-shortcut?name=${encodeURIComponent('Get Spine Health')}`;
      return;
    }
    this.applyHealth(data);
  };
  async applyHealth(data) {
    const num = v => (v === '' || v == null || isNaN(Number(v)) ? null : Math.round(Number(v) * 10) / 10);
    // Summed sleep durations can arrive in hours, minutes or seconds depending on iOS — normalize to hours.
    let sleep = num(data.sleep_hours);
    if (sleep != null && sleep > 24) sleep = Math.round(sleep / (sleep > 1440 ? 3600 : 60) * 10) / 10;
    const imported = { steps: num(data.steps), weight: num(data.weight_kg), sleep, waterMl: num(data.water_ml) };
    if (imported.waterMl != null) {
      const cups = Math.round(imported.waterMl / 240);
      lsSet('water_' + todayKey(), cups);
      this.setState({ waterCount: cups });
    }
    if (imported.sleep != null) this.setSleepHours(String(imported.sleep));
    lsSet('healthImport_' + todayKey(), imported);
    if (imported.weight != null) {
      const log = ls('bodyWeightLog', []).filter(x => x.date !== todayKey());
      log.push({ date: todayKey(), weight: imported.weight });
      if (log.length > 120) log.shift();
      lsSet('bodyWeightLog', log);
    }
    try { await navigator.clipboard.writeText(''); } catch (e) {}
    this.showSaved();
    this.setState({ healthMsg: null, healthImport: imported });
  }
  dismissPwaBanner = () => { this.save('pwaBannerDismissed', true); this.setState({ pwaBannerShow: false }); };
  isDaySkipped(dayId) { return ls('skipped_' + dayId + '_' + todayKey(), false); }
  toggleSkipDay = dayId => {
    const now = !this.isDaySkipped(dayId);
    this.save('skipped_' + dayId + '_' + todayKey(), now);
    if (now) {
      const dates = ls('skippedDates', []);
      const today = todayKey();
      if (!dates.includes(today)) { dates.push(today); if (dates.length > 90) dates.shift(); this.save('skippedDates', dates); }
    }
    this.forceUpdate();
  };

  // ---------- navigation ----------
  navFor(dayId) {
    return ({ nutrition: 'nutrition', supplements: 'supplements', progress: 'progress', coach: 'coach' })[dayId] || 'week';
  }
  switchDay = (dayId, nav) => {
    if (dayId === 'progress') recordDailySnapshot(this.state.checked);
    if (dayId === this.state.currentDay) { if (nav) this.setState({ nav }); return; }
    this.setState({ currentDay: dayId, nav: nav || this.navFor(dayId) });
    requestAnimationFrame(() => {
      const active = document.querySelector('.tabs .tab.active');
      if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  };
  scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  goToday = () => { this.switchDay(todayDay().id, 'today'); this.scrollTop(); };
  goWeek = () => { this.setState({ nav: 'week' }); this.scrollTop(); };
  goTab = id => { this.switchDay(id); this.scrollTop(); };
  jumpToItem = (dayId, itemId) => {
    this.setState({ query: '' });
    this.switchDay(dayId);
    setTimeout(() => {
      const card = document.getElementById('card_' + itemId);
      if (card) {
        window.scrollTo({ top: card.getBoundingClientRect().top + window.scrollY - 150, behavior: 'smooth' });
        card.classList.remove('flash'); void card.offsetWidth; card.classList.add('flash');
      }
    }, 300);
  };
  initSwipe() {
    const el = this.panelsRef.current;
    if (!el) return;
    let startX = 0, startY = 0, touching = false;
    el.addEventListener('touchstart', e => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY; touching = true;
    }, { passive: true });
    el.addEventListener('touchend', e => {
      if (!touching) return;
      touching = false;
      const dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      const idx = DAYS.findIndex(d => d.id === this.state.currentDay);
      let dir = dx < 0 ? 1 : -1;
      if (document.documentElement.dir === 'rtl') dir = -dir;
      const next = DAYS[idx + dir];
      if (next) this.switchDay(next.id);
    }, { passive: true });
  }

  // ---------- focus mode ----------
  clearFocusInterval() { if (this.focusInterval) { clearInterval(this.focusInterval); this.focusInterval = null; } }
  openFocusFor(day, idx) {
    const list = [];
    day.groups.forEach(g => g.items.forEach(it => { if (focusable(it)) list.push(it); }));
    if (!list.length) return false;
    if (idx == null) { idx = list.findIndex(it => !this.state.checked[it.id]); if (idx < 0) idx = 0; }
    this.clearFocusInterval();
    const it = list[idx];
    this.speakExercise(it);
    this.setState({ focus: { open: true, idx, phase: 'exercise', list, dayId: day.id, remaining: it.type === 'hold' ? it.target : 0, holdRunning: false } });
    return true;
  }
  startFocusMode = () => {
    let day = DAYS.find(d => d.id === this.state.currentDay);
    if (!day || !day.groups.length) day = todayDay();
    this.openFocusFor(day);
  };
  exitFocus = () => {
    this.clearFocusInterval();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    this.setState(s => ({ focus: { ...s.focus, open: false, holdRunning: false } }));
  };
  startFocusHold = () => {
    const f = this.state.focus;
    if (this.focusInterval || f.phase !== 'exercise') return;
    let remaining = f.remaining || (f.list[f.idx] ? f.list[f.idx].target : 0);
    this.setState(s => ({ focus: { ...s.focus, holdRunning: true } }));
    this.focusInterval = setInterval(() => {
      remaining--;
      this.setState(s => ({ focus: { ...s.focus, remaining } }));
      if (remaining > 0) playTick();
      if (remaining <= 0) { this.clearFocusInterval(); playBeep(); this.completeFocusStep(); }
    }, 1000);
  };
  completeFocusStep = () => {
    this.clearFocusInterval();
    const f = this.state.focus;
    const it = f.list[f.idx];
    if (it && !this.state.checked[it.id]) this.toggleCheck(it.id);
    const idx = f.idx + 1;
    if (idx < f.list.length && it && it.sets) {
      let remaining = CONFIG.restSeconds;
      this.setState(s => ({ focus: { ...s.focus, idx, phase: 'rest', remaining, holdRunning: false } }));
      this.focusInterval = setInterval(() => {
        remaining--;
        this.setState(s => ({ focus: { ...s.focus, remaining } }));
        if (remaining > 0) playTick();
        if (remaining <= 0) { this.clearFocusInterval(); playBeep(); this.enterFocusExercise(idx); }
      }, 1000);
    } else {
      this.enterFocusExercise(idx);
    }
  };
  enterFocusExercise(idx) {
    const it = this.state.focus.list[idx];
    if (it) this.speakExercise(it); else playBeep();
    this.setState(s => ({ focus: { ...s.focus, idx, phase: 'exercise', remaining: it && it.type === 'hold' ? it.target : 0, holdRunning: false } }));
  }
  skipRest = () => { this.clearFocusInterval(); this.enterFocusExercise(this.state.focus.idx); };
  nextTrainingDay() {
    const idx = DAYS.findIndex(d => d.id === this.state.focus.dayId);
    return DAYS.slice(idx + 1).find(d => d.groups.some(g => g.items.some(focusable))) || null;
  }
  continueToNextDay = () => {
    const next = this.nextTrainingDay();
    if (!next) return;
    this.switchDay(next.id);
    this.openFocusFor(next, 0);
  };

  // ---------- voice ----------
  toggleVoice = () => { const on = !this.state.voiceOn; this.save('voiceModeOn', on); this.setState({ voiceOn: on }); };
  speakExercise(it) {
    if (!this.state.voiceOn || !('speechSynthesis' in window)) return;
    const isAr = this.isAr();
    const name = isAr ? it.ar : it.en;
    let text = name;
    if (it.type === 'hold') text = isAr ? `${name}، ثبات ${it.target} ثانية` : `${name}, hold for ${it.target} seconds`;
    else if (it.type === 'reps') text = isAr ? `${name}، ${it.target} تكرار` : `${name}, ${it.target} reps`;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = isAr ? 'ar-EG' : 'en-US'; u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  // ---------- backup / photos / report ----------
  exportBackup = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k !== KEY_STORAGE) data[k] = localStorage.getItem(k); }
    const url = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url; a.download = 'spine-recovery-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  };
  importBackup = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        Object.keys(data).forEach(k => { if (k !== KEY_STORAGE) localStorage.setItem(k, data[k]); });
        location.reload();
      } catch (err) { alert(this.t('ملف النسخة الاحتياطية غير صالح', 'Invalid backup file')); }
    };
    reader.readAsText(file);
  };
  addPhoto = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, 480 / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale; canvas.height = img.height * scale;
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        this.setState({ pendingPhoto: canvas.toDataURL('image/jpeg', 0.72), photoTagWeight: '', photoTagType: 'progress' });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };
  savePendingPhoto = () => {
    const data = this.state.pendingPhoto;
    if (!data) return;
    const photos = ls('reportPhotos', []);
    const weight = this.state.photoTagWeight ? parseFloat(this.state.photoTagWeight) : null;
    photos.push({ date: new Date().toISOString(), data, type: this.state.photoTagType || 'progress', weight });
    if (photos.length > 40) photos.shift();
    if (lsSet('reportPhotos', photos)) {
      this.showSaved();
      this.setState({ photos, pendingPhoto: null });
    } else {
      alert(this.t('مساحة التخزين امتلأت — احذف صور قديمة أو صدّر نسخة احتياطية الأول', 'Storage is full — delete some older photos or export a backup first'));
    }
  };
  genReport = () => openMonthlyReport(this.isAr(), CONFIG.xpPerLevel);

  // ---------- reminders ----------
  setReminderTime = (key, v) => this.setState(s => ({ times: { ...s.times, [key]: v } }));
  enableNotifications = () => {
    this.save('notifTimes', this.state.times);
    if (!('Notification' in window)) {
      this.setState({ notifStatus: { ok: false, text: this.t('الإشعارات مش مدعومة في المتصفح ده', 'Notifications are not supported in this browser') } });
      return;
    }
    Notification.requestPermission().then(perm => {
      if (perm === 'granted') {
        this.setState({ notifStatus: { ok: true, text: this.t('✓ تم التفعيل — التذكيرات هتوصلك طول ما الصفحة مفتوحة', '✓ Enabled — reminders will fire while this page stays open') } });
        this.startNotifLoop();
        setTimeout(() => this.setState({ sheetOpen: false }), 1400);
      } else {
        this.setState({ notifStatus: { ok: false, text: this.t('محتاج تسمح بالإشعارات من إعدادات المتصفح/الجهاز', 'Please allow notifications in your browser/device settings') } });
      }
    });
  };
  startNotifLoop() {
    if (this._notifInterval) clearInterval(this._notifInterval);
    this._notifInterval = setInterval(() => this.checkNotifTimes(), 20000);
    this.checkNotifTimes();
  }
  checkNotifTimes() {
    const times = ls('notifTimes', null);
    if (!times) return;
    const now = new Date();
    const hhmm = now.toTimeString().slice(0, 5);
    const todayStr = now.toDateString();
    const log = ls('notifFiredLog', {});
    Object.keys(times).forEach(key => {
      if (times[key] === hhmm && log[key] !== todayStr) {
        const isAr = this.isAr();
        const label = REMINDER_LABELS[key] ? REMINDER_LABELS[key][isAr ? 'ar' : 'en'] : key;
        const body = isAr ? 'افتح التطبيق وسجّل إنجازك' : 'Open the app and log it';
        // Prefer the service worker so the notification also shows on installed PWAs.
        if (navigator.serviceWorker && navigator.serviceWorker.ready) {
          navigator.serviceWorker.ready.then(reg => reg.showNotification(label, { body, icon: 'icons/icon-192.png' })).catch(() => { try { new Notification(label, { body }); } catch (e) {} });
        } else {
          try { new Notification(label, { body }); } catch (e) {}
        }
        playBeep();
        log[key] = todayStr;
        this.save('notifFiredLog', log);
      }
    });
  }

  // ---------- render ----------
  render() {
    const S = this.state;
    const isAr = this.isAr();
    // Nutrition, supplements, progress and coach open straight to their content (no daily dashboard above).
    const isDayTab = /^d\d+$/.test(S.currentDay);
    return (
      <>
        {S.pwaBannerShow && (
          <div className="pwa-banner">
            <div>
              <strong>{isAr ? 'ثبّت التطبيق على شاشتك الرئيسية' : 'Install this app on your home screen'}</strong>
              <p>{isAr ? 'من قائمة المتصفح اختر "إضافة للشاشة الرئيسية" لتجربة أسرع وإشعارات أفضل' : 'From your browser menu choose "Add to Home Screen" for a faster experience and better reminders'}</p>
            </div>
            <button onClick={this.dismissPwaBanner}>✕</button>
          </div>
        )}
        <Header app={this} showCover={isDayTab} />
        <div className="page">
          {isDayTab && <Dashboard app={this} />}
          <Tabs app={this} />
          <div id="panels" ref={this.panelsRef}>
            {DAYS.filter(d => d.groups.length && d.id === S.currentDay).map(d => <DayPanel key={d.id} app={this} day={d} />)}
            {S.currentDay === 'progress' && <ProgressPanel app={this} />}
            <CoachPanel app={this} />
          </div>
          <div className="footer-note">
            <span data-lang="ar">هذه أداة تنظيم ومتابعة تعليمية، وليست تشخيصًا أو بديلاً عن تقييم طبيبك أو أخصائي العلاج الطبيعي.</span>
            <span data-lang="en">This is an educational tracking tool, not a diagnosis or a substitute for evaluation by your physician or physical therapist.</span>
          </div>
        </div>
        <div className={'save-msg ' + (S.saveShow ? 'show' : '')}><span data-lang="ar">✓ تم الحفظ</span><span data-lang="en">✓ Saved</span></div>
        <div className={'toast-action ' + (S.undoToast ? 'show' : '')}>
          <span>{S.undoToast ? (isAr ? `تم ✓ ${S.undoToast.ar}` : `Done ✓ ${S.undoToast.en}`) : ''}</span>
          <button onClick={this.undoLastCheck}>{isAr ? 'تراجع' : 'Undo'}</button>
        </div>
        <SettingsSheet app={this} />
        <BottomNav app={this} />
        <EmergencySheet app={this} />
        <FocusOverlay app={this} />
        {S.pendingPhoto && <PendingPhotoSheet app={this} />}
        {S.detailItemId && <DetailSheet app={this} />}
        {S.celebrate && <CelebrateCard app={this} />}
      </>
    );
  }
}
