import { DAYS, ICONS as I, getAnim } from '../data/spine-data.js';
import { fmtTime, targetText, videoUrl } from '../lib/tips.js';
import Svg from './Svg.jsx';

function Body({ app }) {
  const S = app.state;
  const f = S.focus;
  const isAr = app.isAr();
  if (f.idx >= f.list.length) {
    const next = app.nextTrainingDay();
    return (
      <>
        <div className="level-badge" style={{ width: 70, height: 70 }}><Svg html={I.trophy} /></div>
        <h2 className="focus-exname">{isAr ? 'خلصت التمرين! 🎉' : 'Workout complete! 🎉'}</h2>
        <div className="focus-actions">
          {next && <button className="big-btn" style={{ maxWidth: 260 }} onClick={app.continueToNextDay}>{isAr ? 'كمّل بيوم تاني ▶' : 'Continue to next day ▶'}</button>}
          <button className="big-btn skip-btn" style={{ maxWidth: 220 }} onClick={app.exitFocus}>{isAr ? 'تمام' : 'Done'}</button>
        </div>
      </>
    );
  }
  const it = f.list[f.idx];
  const name = isAr ? it.ar : it.en;
  if (f.phase === 'rest') {
    return (
      <>
        <div className="focus-rest-label">{isAr ? 'راحة' : 'Rest'}</div>
        <div className="focus-big-timer rest">{f.remaining}</div>
        <p style={{ color: 'var(--txt-dim)', margin: 0 }}>{isAr ? 'التمرين الجاي:' : 'Up next:'} <strong>{name}</strong></p>
        <div className="focus-actions"><button className="big-btn skip-btn" onClick={app.skipRest}>{isAr ? 'تخطّي الراحة' : 'Skip Rest'}</button></div>
      </>
    );
  }
  const dayObj = DAYS.find(d => d.id === f.dayId);
  const exercising = f.holdRunning || S.counters[it.id] > 0;
  return (
    <>
      <div className="focus-tags">
        <span className="focus-tag">{dayObj ? (isAr ? dayObj.ar : dayObj.en) : ''}</span>
        <span className="focus-tag phase">{exercising ? (isAr ? '🏃 بتتمرن' : '🏃 Exercising') : (isAr ? '⏳ جاهز' : '⏳ Ready')}</span>
      </div>
      <div className="focus-anim"><Svg html={getAnim(it)} /></div>
      <h2 className="focus-exname">{name}</h2>
      <div className="focus-target">{targetText(it, isAr)}</div>
      {it.type === 'hold' && <div className="focus-big-timer">{fmtTime(f.remaining)}</div>}
      <div className="focus-actions">
        {it.type === 'hold' && !f.holdRunning && <button className="big-btn" onClick={app.startFocusHold}>{isAr ? 'ابدأ' : 'Start'}</button>}
        <button className="big-btn skip-btn" onClick={app.completeFocusStep}>{isAr ? 'خلصته ✓' : 'Done ✓'}</button>
      </div>
      {it.q && <a className="vid" target="_blank" rel="noopener noreferrer" href={videoUrl(it)}><Svg html={I.play} /> <span>{isAr ? 'فيديو' : 'video'}</span></a>}
    </>
  );
}

export default function FocusOverlay({ app }) {
  const f = app.state.focus;
  const inProgress = f.open && f.idx < f.list.length;
  return (
    <div className={'focus-overlay ' + (f.open ? 'open' : '')}>
      <div className="focus-top">
        <button className="focus-close" onClick={app.exitFocus}>✕</button>
        <span className="focus-count">{inProgress ? `${f.idx + 1} / ${f.list.length}` : ''}</span>
      </div>
      <div className="focus-body">{f.open && <Body app={app} />}</div>
    </div>
  );
}
