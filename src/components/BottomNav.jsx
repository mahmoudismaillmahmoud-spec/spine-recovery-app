import { ICONS as I } from '../data/spine-data.js';
import Svg from './Svg.jsx';

export default function BottomNav({ app }) {
  const nav = app.state.nav;
  const items = [
    { key: 'today', icon: I.home, ar: 'اليوم', en: 'Today', go: app.goToday },
    { key: 'week', icon: I.calendar, ar: 'الأسبوع', en: 'Week', go: app.goWeek },
    { key: 'nutrition', icon: I.nutrition, ar: 'تغذية', en: 'Nutrition', go: () => app.goTab('nutrition') },
    { key: 'supplements', icon: I.supplements, ar: 'مكملات', en: 'Supplements', go: () => app.goTab('supplements') },
    { key: 'coach', icon: I.coach, ar: 'المدرب', en: 'Coach', go: () => app.goTab('coach') },
    { key: 'progress', icon: I.chart, ar: 'التقدم', en: 'Progress', go: () => app.goTab('progress') },
    { key: 'settings', icon: I.settings, ar: 'إعدادات', en: 'Settings', go: () => app.setState({ sheetOpen: true, nav: 'settings' }) },
  ];
  return (
    <>
      <div className="bottomnav">
        {items.map(n => (
          <button key={n.key} className={'navbtn ' + (nav === n.key ? 'active' : '')} onClick={n.go}>
            <span className="ic"><Svg html={n.icon} /></span>
            <span data-lang="ar">{n.ar}</span><span data-lang="en">{n.en}</span>
          </button>
        ))}
      </div>
      <div className="sos-btn" onClick={() => app.setState({ emergencyOpen: true })}><span><Svg html={I.sos} /></span></div>
      <button className="focus-fab" onClick={app.startFocusMode}>
        <Svg html={I.play} /><span data-lang="ar">ابدأ التمرين</span><span data-lang="en">Start Workout</span>
      </button>
    </>
  );
}
