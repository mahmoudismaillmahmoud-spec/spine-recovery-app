import { ICONS as I } from '../data/spine-data.js';
import { coachCards } from '../lib/coach.js';
import Svg from './Svg.jsx';
import ClaudeChat from './ClaudeChat.jsx';

export default function CoachPanel({ app }) {
  const isAr = app.isAr();
  const active = app.state.currentDay === 'coach';
  const cards = active ? coachCards(isAr) : [];
  return (
    <div className={'day-panel ' + (active ? 'active' : '')} data-screen-label="Coach">
      <div className="coach-header">
        <div className="coach-avatar"><Svg html={I.coach} /></div>
        <div>
          <h3 style={{ margin: 0 }}>{isAr ? 'مدربك الافتراضي' : 'Your Virtual Coach'}</h3>
          <p style={{ margin: '2px 0 0', fontSize: '.78em', color: 'var(--txt-dim)' }}>{isAr ? 'تحليل مبني على بياناتك آخر 14 يوم' : 'Analysis based on your last 14 days of data'}</p>
        </div>
      </div>
      {active && <ClaudeChat app={app} />}
      {cards.map((c, i) => (
        <div key={i} className={'chart-card coach-card ' + (c.tone === 'warn' ? 'coach-warn' : 'coach-ok')}><h4>{c.title}</h4><p>{c.msg}</p></div>
      ))}
      <div className="note" style={{ marginTop: 20 }}>
        {isAr
          ? 'المدرب ده بيحلل بياناتك بقواعد رياضية معروفة، ومش بديل عن دكتورك أو أخصائي العلاج الطبيعي — أي قرار كبير (زيادة وزن كبيرة، تمرين جديد، ألم مستمر) راجعه معاهم.'
          : 'This coach analyzes your data using established training rules — it is not a substitute for your doctor or physical therapist. Any big decision (major load increase, new exercise, persistent pain) should go through them.'}
      </div>
    </div>
  );
}
