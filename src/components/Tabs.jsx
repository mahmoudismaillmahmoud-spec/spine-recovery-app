import { DAYS, ICONS as I } from '../data/spine-data.js';
import Svg from './Svg.jsx';

export default function Tabs({ app }) {
  const cur = app.state.currentDay;
  return (
    <div className="tabs">
      {DAYS.map(d => (
        <div key={d.id} className={'tab ' + (d.id === cur ? 'active' : '')} onClick={() => app.switchDay(d.id)}>
          {d.icon && <span className="tab-ic"><Svg html={I[d.icon]} /></span>}
          <span data-lang="ar">{d.ar}</span><span data-lang="en">{d.en}</span>
        </div>
      ))}
    </div>
  );
}
