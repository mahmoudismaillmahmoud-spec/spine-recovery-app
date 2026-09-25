import { DAYS, ICONS as I } from '../data/spine-data.js';
import { CONFIG } from '../config.js';
import { ls } from '../lib/storage.js';
import { computeStreak, dayPct } from '../lib/progress.js';
import Svg from './Svg.jsx';
import Ring from './Ring.jsx';

export function Header({ app }) {
  const S = app.state;
  const isAr = app.isAr();
  return (
    <>
      <div className="topbar">
        <h1>{isAr ? CONFIG.appName : 'Spine Recovery System'}</h1>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="theme-btn" onClick={app.toggleTheme}><Svg html={S.dark ? I.sun : I.moon} /></button>
          <button className="lang-btn" onClick={app.toggleLang}><span data-lang="ar">EN</span><span data-lang="en">AR</span></button>
        </div>
      </div>
      <div className="cover">
        <h2><span data-lang="ar">جدولك اليومي المتحرك</span><span data-lang="en">Your Interactive Daily Schedule</span></h2>
        <p><span data-lang="ar">مرونة + استرتشات + قوة، مع تشيك ليست وتايمر وعداد لكل تمرين، وتتبع تقدمك أول بأول.</span><span data-lang="en">Mobility + stretching + strength, with a checklist, timer, and rep counter for every exercise, tracking your progress live.</span></p>
      </div>
    </>
  );
}

function Search({ app }) {
  const S = app.state;
  const isAr = app.isAr();
  const q = S.query.trim().toLowerCase();
  const results = [];
  if (q.length >= 2) {
    DAYS.forEach(d => d.groups.forEach(g => g.items.forEach(it => {
      if (results.length < 8 && (it.ar + ' ' + it.en).toLowerCase().includes(q)) results.push({ d, it });
    })));
  }
  return (
    <div className="search-wrap">
      <input type="text" value={S.query} onChange={e => app.setState({ query: e.target.value })} placeholder={isAr ? 'دور على أي تمرين...' : 'Search any exercise...'} />
      <span className="sicon"><Svg html={I.search} /></span>
      <div className={'search-results ' + (q.length >= 2 ? 'show' : '')}>
        {results.map(({ d, it }) => (
          <div key={it.id} className="search-result-row" onClick={() => app.jumpToItem(d.id, it.id)}>
            {isAr ? it.ar : it.en}<small>{isAr ? d.ar : d.en}</small>
          </div>
        ))}
        {q.length >= 2 && !results.length && <div className="search-result-row" style={{ cursor: 'default' }}>{isAr ? 'مفيش نتائج' : 'No results'}</div>}
      </div>
    </div>
  );
}

function Suggestion({ app }) {
  const S = app.state;
  const isAr = app.isAr();
  const h = new Date().getHours();
  const today = DAYS[new Date().getDay() % 7];
  const pct = dayPct(today, S.checked);
  let remain = 0;
  today.groups.forEach(g => g.items.forEach(it => { if (!S.checked[it.id]) remain++; }));
  let title, sub;
  if (pct >= 100) {
    title = isAr ? 'خلصت يومك — برافو 👏' : 'Day complete — nice work 👏';
    sub = isAr ? 'إطالة خفيفة اختيارية قبل النوم تحسّن نومك' : 'Optional light stretching before bed improves sleep';
  } else if (pct > 0) {
    title = isAr ? `كمّل يومك — فاضلك ${remain} عناصر` : `Finish your day — ${remain} items left`;
    sub = isAr ? `إنجازك ${Math.round(pct)}% · دوس وكمّل بوضع التركيز` : `You're at ${Math.round(pct)}% · tap to continue in focus mode`;
  } else if (h < 12) {
    title = isAr ? 'صباح الخير — ابدأ بالحركة اليومية' : 'Good morning — start with mobility';
    sub = isAr ? '10-12 دقيقة تجهّز ضهرك لليوم' : '10-12 minutes to prep your back for the day';
  } else if (h < 20) {
    title = isAr ? `وقت التمرين — ${today.ar}` : `Workout time — ${today.en}`;
    sub = isAr ? 'دوس هنا وابدأ وضع التركيز' : 'Tap to start focus mode';
  } else {
    title = isAr ? 'قبل النوم — إطالة خفيفة' : 'Before bed — light stretching';
    sub = isAr ? 'خمس دقايق إطالة تحسّن نومك' : 'Five minutes of stretching improves your sleep';
  }
  const go = () => { app.switchDay(today.id); app.openFocusFor(today); };
  return (
    <div className="suggest-card" onClick={go}>
      <div><h4>{title}</h4><p>{sub}</p></div>
      <span className="arrow-ic">{isAr ? '◀' : '▶'}</span>
    </div>
  );
}

function WeeklySummary({ app, streak }) {
  const isAr = app.isAr();
  const wd = new Date().getDay();
  if (wd !== 5 && wd !== 6) return null;
  const hist = ls('weekPctHistory', []).slice(-7);
  if (!hist.length) return null;
  return (
    <div className="weekly-summary">
      <h4>{isAr ? 'ملخص أسبوعك 🏆' : 'Your Week in Review 🏆'}</h4>
      <div className="ws-stats">
        <div className="ws-stat"><b>{Math.round(hist.reduce((s, x) => s + x.pct, 0) / hist.length)}%</b><span>{isAr ? 'متوسط الالتزام' : 'avg consistency'}</span></div>
        <div className="ws-stat"><b>{hist.filter(x => x.pct >= 100).length}</b><span>{isAr ? 'أيام كاملة' : 'full days'}</span></div>
        <div className="ws-stat"><b>{streak}</b><span>{isAr ? 'سلسلة متتالية' : 'day streak'}</span></div>
      </div>
    </div>
  );
}

export function Dashboard({ app }) {
  const S = app.state;
  const isAr = app.isAr();
  const streak = computeStreak();
  let weekDone = 0, weekTotal = 0, dPct = 0;
  DAYS.forEach(d => {
    let done = 0, total = 0;
    d.groups.forEach(g => g.items.forEach(it => { total++; if (S.checked[it.id]) done++; }));
    weekDone += done; weekTotal += total;
    if (d.id === S.currentDay && total) dPct = done / total * 100;
  });
  const wPct = weekTotal ? weekDone / weekTotal * 100 : 0;
  return (
    <>
      <div className="warn">
        <span data-lang="ar"><strong>مهم:</strong> عندك ضغط عصبي حقيقي مع تنميل في القدم — خد موافقة دكتورك/أخصائي العلاج الطبيعي قبل ما تبدأ في أي قسم قوة أو تأهيل هنا.</span>
        <span data-lang="en"><strong>Important:</strong> you have real nerve compression with foot numbness — get sign-off from your physician/PT before starting any strength or rehab section here.</span>
      </div>
      {streak > 0 && (
        <div className="streak-badge">
          <span className="flame" style={{ display: 'inline-flex' }}><Svg html={I.flame} /></span>{' '}
          <span className="streak-text">{isAr ? `${streak} يوم متتالي 🔥` : `${streak}-day streak 🔥`}</span>
        </div>
      )}
      <div className="stat-strip">
        <div className="stat-pill"><b>{Math.round(dPct)}%</b><span>{isAr ? 'اليوم' : 'Today'}</span></div>
        <div className="stat-pill"><b>{Math.round(wPct)}%</b><span>{isAr ? 'الأسبوع' : 'Week'}</span></div>
        <div className="stat-pill"><b>{streak + (isAr ? ' يوم' : 'd')}</b><span>{isAr ? 'سلسلة' : 'Streak'}</span></div>
      </div>
      <div className="progress-wrap">
        <Ring pct={dPct}><span data-lang="ar">إنجاز اليوم</span><span data-lang="en">Today</span></Ring>
        <Ring pct={wPct}><span data-lang="ar">إنجاز الأسبوع</span><span data-lang="en">This Week</span></Ring>
      </div>
      <Search app={app} />
      <div className="daily-log-row">
        <div className="daily-log-card">
          <span>{(isAr ? '💧 كوباية ماء' : '💧 Water cups') + ` (${S.waterCount}/${CONFIG.waterGoal})`}</span>
          <div className="counter">
            <button onClick={() => app.addWater(-1)}>−</button>
            <span className="val">{S.waterCount}</span>
            <button onClick={() => app.addWater(1)}>+</button>
          </div>
        </div>
        <div className="daily-log-card">
          <span>{isAr ? '😴 ساعات النوم' : '😴 Sleep hours'}</span>
          <input type="number" className="winput" min="0" max="14" step="0.5" value={S.sleepHours} onChange={e => app.setSleepHours(e.target.value)} />
        </div>
      </div>
      <div className="health-sync-row">
        <button className="health-sync-btn" onClick={app.sendToAppleHealth}>{isAr ? '🍏 أرسل لـ Apple Health' : '🍏 Send to Apple Health'}</button>
        <p>{isAr
          ? 'محتاج مرة واحدة بس تعمل Shortcut اسمه "Log Spine Recovery" على جهازك (Shortcuts app) يستقبل البيانات ويحفظها في تطبيق الصحة — بعدها الزرار ده هيشتغل تلقائي كل مرة.'
          : 'One-time setup: create a Shortcut named "Log Spine Recovery" in the Shortcuts app that receives this data and logs it into Health — after that, this button works automatically every time.'}</p>
      </div>
      <Suggestion app={app} />
      <WeeklySummary app={app} streak={streak} />
    </>
  );
}
