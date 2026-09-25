import { Fragment } from 'react';
import { ICONS as I, GROUP_ICON, getAnim } from '../data/spine-data.js';
import { ls } from '../lib/storage.js';
import { dayPct, adaptiveNote } from '../lib/progress.js';
import { fmtTime, videoUrl } from '../lib/tips.js';
import Svg from './Svg.jsx';

function subText(it, isAr) {
  const setsInfo = it.sets ? it.sets + ' × ' : '';
  if (it.type === 'hold') return isAr ? `${setsInfo}ثبات ${it.target} ثانية` : `${setsInfo}hold ${it.target}s`;
  if (it.type === 'reps') return isAr ? `${setsInfo}${it.target} تكرار` : `${setsInfo}${it.target} reps`;
  if (it.type === 'info') return isAr ? it.desc_ar || '' : it.desc_en || '';
  return '';
}

function ExerciseCard({ app, it }) {
  const S = app.state;
  const isAr = app.isAr();
  const done = !!S.checked[it.id];
  const cnt = S.counters[it.id] || 0;
  const note = it.sets ? adaptiveNote(it.id, app.t) : null;
  const logs = it.sets ? ls('wlog_' + it.id, []) : [];
  const lastW = logs.length && logs[logs.length - 1].weight != null ? String(logs[logs.length - 1].weight) : '';
  const pSel = S.painSel[it.id];
  const isFood = it.id.startsWith('n') || it.id.startsWith('sup');
  return (
    <div className={'card ' + (done ? 'done' : '')} id={'card_' + it.id}>
      <div className="card-top">
        <div className={'chk ' + (done ? 'checked' : '')} onClick={() => app.toggleCheck(it.id)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M4 12l5 5L20 6" /></svg>
        </div>
        <div className={'card-anim ' + (isFood ? 'food' : '')}><Svg html={getAnim(it)} /></div>
        <div className="card-title" onClick={it.type !== 'info' ? () => app.setState({ detailItemId: it.id }) : undefined} style={{ cursor: 'pointer' }}>
          <span data-lang="ar">{it.ar}</span><span data-lang="en">{it.en}</span>
          <div className="card-sub">
            <span data-lang="ar" dangerouslySetInnerHTML={{ __html: subText(it, true) }} />
            <span data-lang="en" dangerouslySetInnerHTML={{ __html: subText(it, false) }} />
          </div>
        </div>
        {it.q && (
          <a className="vid" target="_blank" rel="noopener noreferrer" href={videoUrl(it)}>
            <Svg html={I.play} /> <span data-lang="ar">فيديو</span><span data-lang="en">video</span>
          </a>
        )}
      </div>
      {it.type === 'reps' && (
        <div className="controls"><div className="counter">
          <button onClick={() => app.changeCounter(it.id, -1)}>−</button>
          <span className="val">{cnt}/{it.target}</span>
          <button onClick={() => app.changeCounter(it.id, 1)}>+</button>
        </div></div>
      )}
      {it.type === 'hold' && (
        <div className="controls"><div className={'timer ' + (S.running[it.id] ? 'running' : '')}>
          <span className="tval">{fmtTime(S.timeLeft[it.id] != null ? S.timeLeft[it.id] : it.target)}</span>
          <button onClick={() => app.startTimer(it.id, it.target)}><span data-lang="ar">ابدأ</span><span data-lang="en">Start</span></button>
          <button onClick={() => app.resetTimer(it.id, it.target)}>↺</button>
        </div></div>
      )}
      {!!it.sets && (
        <>
          <div className="quicklog">
            <input type="number" className="winput" value={S.wInputs[it.id] || ''} onChange={e => app.setWeightInput(it.id, e.target.value)} placeholder={lastW || (isAr ? 'كجم' : 'kg')} min="0" step="0.5" />
            <div className="painbtns">
              {['🙂', '😐', '😣'].map((emo, i) => (
                <button key={i} className={pSel === i + 1 ? 'active' : ''} onClick={() => app.setPain(it.id, i + 1)}>{emo}</button>
              ))}
            </div>
            <button className="logbtn" onClick={() => app.logExercise(it.id)}><span data-lang="ar">سجّل</span><span data-lang="en">Log</span></button>
          </div>
          {note && <div className={'adaptive-note show ' + note.cls}>{note.text}</div>}
        </>
      )}
    </div>
  );
}

export default function DayPanel({ app, day }) {
  const S = app.state;
  const isAr = app.isAr();
  const pct = dayPct(day, S.checked);
  const skipped = app.isDaySkipped(day.id);
  return (
    <div className={'day-panel ' + (day.id === S.currentDay ? 'active' : '')} data-screen-label={day.en}>
      <div className="day-progress">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span><span data-lang="ar">تقدم {day.ar}</span><span data-lang="en">{day.en} progress</span> — <span>{Math.round(pct)}%</span></span>
          <button className={'skip-day-btn ' + (skipped ? 'active' : '')} onClick={() => app.toggleSkipDay(day.id)}>
            {skipped ? (isAr ? '✓ يوم راحة' : '✓ Rest day') : (isAr ? 'تخطي اليوم' : 'Skip day')}
          </button>
        </div>
        <div className="bar-outer"><div className={'bar-inner ' + (pct >= 100 ? 'complete' : '')} style={{ width: pct.toFixed(1) + '%' }} /></div>
      </div>
      {day.groups.map(g => (
        <Fragment key={g.key + g.en}>
          <h3 className="group">
            <span className="gicon"><Svg html={GROUP_ICON[g.key]} /></span>{' '}
            <span data-lang="ar">{g.ar}</span><span data-lang="en">{g.en}</span>
            <span className="group-count">{g.items.filter(x => S.checked[x.id]).length}/{g.items.length}</span>
          </h3>
          {g.items.map(it => <ExerciseCard key={it.id} app={app} it={it} />)}
        </Fragment>
      ))}
    </div>
  );
}
