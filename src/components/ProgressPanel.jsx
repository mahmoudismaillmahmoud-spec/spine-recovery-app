import { DAYS, ICONS as I } from '../data/spine-data.js';
import { CONFIG } from '../config.js';
import { ls } from '../lib/storage.js';
import { computeStreak, getLevelInfo, photoProgressAnalysis } from '../lib/progress.js';
import Svg from './Svg.jsx';

const dim = { color: 'var(--txt-dim)' };

export default function ProgressPanel({ app }) {
  const S = app.state;
  const isAr = app.isAr();
  const active = S.currentDay === 'progress';
  const streak = computeStreak();
  const lvl = getLevelInfo(CONFIG.xpPerLevel);
  const todayStr = new Date().toDateString();
  const hist14 = ls('weekPctHistory', []).slice(-14);
  const bars = hist14.map(x => ({ key: x.date, h: Math.max(x.pct, 3), cls: x.date === todayStr ? 'today' : '', lbl: String(new Date(x.date).getDate()) }));

  const weightRows = [];
  DAYS.forEach(d => d.groups.forEach(g => g.items.forEach(it => {
    if (!it.sets) return;
    const logs = ls('wlog_' + it.id, []);
    if (!logs.length) return;
    const last = logs[logs.length - 1];
    weightRows.push({ id: it.id, name: isAr ? it.ar : it.en, wt: last.weight != null ? last.weight + 'kg' : '—', count: logs.length + ' ' + (isAr ? 'تسجيل' : 'logs') });
  })));

  const thumbs = S.photos.slice(-8).reverse();
  const pa = photoProgressAnalysis();
  let paText = '';
  if (pa) {
    const dir = pa.diff < 0 ? (isAr ? 'نزل' : 'down') : pa.diff > 0 ? (isAr ? 'زاد' : 'up') : (isAr ? 'ثابت' : 'stable');
    paText = isAr
      ? `من ${pa.count} صور بالوزن: وزنك ${dir} ${Math.abs(pa.diff)} كجم (من ${pa.first.weight} إلى ${pa.last.weight} كجم) على مدار الفترة دي.`
      : `From ${pa.count} weighted photos: your weight is ${dir} ${Math.abs(pa.diff)}kg (${pa.first.weight} → ${pa.last.weight}kg) over this period.`;
  }

  return (
    <div className={'day-panel ' + (active ? 'active' : '')} data-screen-label="Progress">
      <div className="chart-card level-card">
        <div className="level-badge"><Svg html={I.trophy} /></div>
        <div>
          <h4 style={{ margin: 0 }}>{isAr ? `المستوى ${lvl.level}` : `Level ${lvl.level}`}</h4>
          <div className="bar-outer" style={{ width: 160, marginTop: 6 }}><div className="bar-inner" style={{ width: (lvl.inLevel / lvl.perLevel * 100).toFixed(1) + '%' }} /></div>
          <div style={{ fontSize: '.72em', ...dim, marginTop: 4 }}>{`${lvl.inLevel}/${lvl.perLevel} XP · ${isAr ? 'إجمالي' : 'total'} ${lvl.xp} XP`}</div>
        </div>
      </div>

      <div className="chart-card">
        <h4>{isAr ? 'الالتزام آخر 14 يوم' : 'Last 14 Days Consistency'}</h4>
        <div className="bar-chart">
          {bars.map(b => <div key={b.key} className={'bcol ' + b.cls} style={{ height: b.h + '%' }} />)}
          {!bars.length && <div style={{ width: '100%', textAlign: 'center', ...dim, fontSize: '.8em', paddingTop: 30 }}>{isAr ? 'لسه مفيش بيانات كفاية' : 'Not enough data yet'}</div>}
        </div>
        <div className="bar-labels">{bars.map(b => <span key={b.key}>{b.lbl}</span>)}</div>
      </div>

      <div className="chart-card">
        <h4>{isAr ? `السلسلة المتتالية: ${streak} يوم` : `Current Streak: ${streak} days`}</h4>
        <p style={{ ...dim, fontSize: '.85em', margin: 0 }}>{isAr ? 'خلّص كل حاجة في يومك عشان تحافظ على السلسلة' : 'Complete everything in your day to keep the streak going'}</p>
      </div>

      <div className="chart-card">
        <h4>{isAr ? 'آخر الأوزان المسجلة' : 'Latest Logged Weights'}</h4>
        {weightRows.map(w => (
          <div key={w.id} className="weight-history-row"><span>{w.name}</span><span><strong>{w.wt}</strong> · {w.count}</span></div>
        ))}
        {!weightRows.length && <div style={{ ...dim, fontSize: '.85em', textAlign: 'center', padding: '10px 0' }}>{isAr ? 'لسه ما سجلتش أوزان — سجّل وزن أي تمرين جيم عشان يظهر هنا' : 'No weights logged yet — log a gym exercise weight to see it here'}</div>}
      </div>

      <div className="chart-card">
        <h4>{isAr ? 'صور التقارير والمتابعة' : 'Report & Progress Photos'}</h4>
        <p style={{ ...dim, fontSize: '.82em', margin: '0 0 10px' }}>{isAr ? 'ارفع صور تقارير الأشعة أو صور متابعة (قبل/بعد) — بتتحفظ على جهازك بس' : 'Upload MRI/report photos or before-after progress shots — stored on your device only'}</p>
        {pa && <div className="photo-analysis">{paText}</div>}
        <div className="photo-grid">
          {thumbs.map(p => {
            const d = new Date(p.date);
            return (
              <div key={p.date} className="photo-thumb">
                <img src={p.data} alt="" />
                <span>{d.getDate() + '/' + (d.getMonth() + 1) + (p.weight != null ? ' · ' + p.weight + 'kg' : '')}</span>
              </div>
            );
          })}
          {!thumbs.length && <div style={{ ...dim, fontSize: '.85em', textAlign: 'center', padding: '10px 0', gridColumn: '1/-1' }}>{isAr ? 'لسه مفيش صور — ضيف أول صورة تقرير أو متابعة' : 'No photos yet — add your first report or progress photo'}</div>}
        </div>
        <div className="backup-row">
          <button onClick={() => document.getElementById('photoFile').click()}><Svg html={I.camera} /> <span data-lang="ar">إضافة صورة</span><span data-lang="en">Add Photo</span></button>
        </div>
        <input type="file" id="photoFile" accept="image/*" style={{ display: 'none' }} onChange={app.addPhoto} />
      </div>

      <div className="chart-card">
        <h4>{isAr ? 'وضع الصوت' : 'Voice Mode'}</h4>
        <p style={{ ...dim, fontSize: '.82em', margin: '0 0 10px' }}>{isAr ? 'يقرا اسم التمرين وعدد التكرار بصوت عالي وانت بتتحرك، من غير ما تبص في الموبايل' : 'Reads the exercise name and reps out loud while you move, without looking at your phone'}</p>
        <div className="backup-row">
          <button onClick={app.toggleVoice}>{S.voiceOn ? (isAr ? '🔊 مفعّل — دوس تقفل' : '🔊 On — tap to turn off') : (isAr ? '🔇 مقفول — دوس تشغّل' : '🔇 Off — tap to turn on')}</button>
        </div>
      </div>

      <div className="chart-card">
        <h4>{isAr ? 'تقرير شهري للطباعة' : 'Printable Monthly Report'}</h4>
        <p style={{ ...dim, fontSize: '.82em', margin: '0 0 10px' }}>{isAr ? 'يجهزلك صفحة ملخص (الالتزام، الأوزان، السلسلة) تقدر تطبعها أو تحفظها PDF من نافذة الطباعة عشان توريها لدكتورك' : 'Prepares a summary page (consistency, weights, streak) you can print or save as PDF from the print dialog to show your doctor'}</p>
        <div className="backup-row"><button onClick={app.genReport}>{isAr ? '📄 جهّز التقرير' : '📄 Generate Report'}</button></div>
      </div>

      <div className="chart-card">
        <h4>{isAr ? 'نسخة احتياطية' : 'Backup'}</h4>
        <p style={{ ...dim, fontSize: '.85em', margin: 0 }}>{isAr ? 'صدّر كل بياناتك (تشيك، أوزان، إعدادات) كملف تقدر ترفعه تاني لو غيّرت الجهاز' : 'Export all your data (checklist, weights, settings) as a file you can restore later or on a new device'}</p>
        <div className="backup-row">
          <button onClick={app.exportBackup}>{isAr ? '⬇ تصدير' : '⬇ Export'}</button>
          <button onClick={() => document.getElementById('importFile').click()}>{isAr ? '⬆ استيراد' : '⬆ Import'}</button>
        </div>
        <input type="file" id="importFile" accept="application/json" style={{ display: 'none' }} onChange={app.importBackup} />
      </div>
    </div>
  );
}
