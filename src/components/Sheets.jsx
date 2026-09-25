import { ICONS as I } from '../data/spine-data.js';
import { findItem, dayOf } from '../lib/progress.js';
import { tipsFor, targetText } from '../lib/tips.js';
import { useState } from 'react';
import Svg from './Svg.jsx';
import { getApiKey, setApiKey } from '../lib/claude-store.js';

function ClaudeSettings({ app }) {
  const isAr = app.isAr();
  const [key, setKey] = useState(getApiKey());
  const [saved, setSaved] = useState(!!getApiKey());
  const save = () => { setApiKey(key); setSaved(!!key.trim()); app.showSaved(); };
  const remove = () => { setApiKey(''); setKey(''); setSaved(false); };
  return (
    <div className="settings-section">
      <h3>{isAr ? '✨ كلود (الذكاء الاصطناعي)' : '✨ Claude AI'}</h3>
      <p className="card-sub">{isAr
        ? 'حط مفتاح API من console.anthropic.com. المفتاح بيتحفظ على موبايلك بس، ومش بيدخل في النسخة الاحتياطية. الاستخدام بيتحاسب على حسابك في Anthropic.'
        : 'Paste an API key from console.anthropic.com. It stays on this phone only and is excluded from backups. Usage is billed to your Anthropic account.'}</p>
      <div className="key-row">
        <input type="password" autoComplete="off" value={key} onChange={e => { setKey(e.target.value); setSaved(false); }} placeholder="sk-ant-..." />
        <button onClick={save} disabled={!key.trim()}>{isAr ? 'حفظ' : 'Save'}</button>
      </div>
      {saved && <div className="notif-status ok">{isAr ? '✓ كلود متوصل — افتح تاب المدرب واسأله' : '✓ Connected — open the Coach tab to chat'} <button className="link-btn" onClick={remove}>{isAr ? 'امسح المفتاح' : 'Remove key'}</button></div>}
    </div>
  );
}

function HealthSettings({ app }) {
  const isAr = app.isAr();
  const on = app.state.healthAuto;
  return (
    <div className="settings-section">
      <h3>{isAr ? '🍏 Apple Health تلقائي' : '🍏 Automatic Apple Health'}</h3>
      <p className="card-sub">{isAr
        ? 'لما يكون شغال، أول لمسة ليك في التطبيق كل يوم بتسحب بيانات الصحة من غير ما تدوّر على زرار. محتاج أتمتة في Shortcuts بتشغّل "Get Spine Health" كل يوم (الخطوات في الشرح).'
        : 'When on, your first touch in the app each day pulls Health data automatically. Requires a Shortcuts automation that runs "Get Spine Health" daily.'}</p>
      <label className="toggle-row">
        <input type="checkbox" checked={!!on} onChange={e => app.setHealthAuto(e.target.checked)} />
        <span>{isAr ? 'سحب تلقائي من Apple Health' : 'Auto-import from Apple Health'}</span>
      </label>
    </div>
  );
}

const REMINDERS = [
  { key: 'mob', ar: 'الحركة اليومية', en: 'Daily Mobility', icon: I.mob },
  { key: 'breakfast', ar: 'الفطار', en: 'Breakfast', icon: I.nutrition },
  { key: 'snack1', ar: 'سناك 1', en: 'Snack 1', icon: I.nutrition },
  { key: 'lunch', ar: 'الغدا', en: 'Lunch', icon: I.nutrition },
  { key: 'gym', ar: 'الجيم / التمرين', en: 'Gym / Workout', icon: I.gym },
  { key: 'snack2', ar: 'سناك 2', en: 'Snack 2', icon: I.nutrition },
  { key: 'dinner', ar: 'العشا', en: 'Dinner', icon: I.nutrition },
];

export function SettingsSheet({ app }) {
  const S = app.state;
  const cls = S.sheetOpen ? 'open' : '';
  return (
    <>
      <div className={'sheet-overlay ' + cls} onClick={() => app.setState({ sheetOpen: false })} />
      <div className={'sheet ' + cls}>
        <div className="sheet-handle" />
        <button className="sheet-close" aria-label="close" onClick={() => app.setState({ sheetOpen: false })}>✕</button>
        <ClaudeSettings app={app} />
        <HealthSettings app={app} />
        <h3><span data-lang="ar">الإشعارات اليومية</span><span data-lang="en">Daily Reminders</span></h3>
        <p className="card-sub"><span data-lang="ar">حدد وقت كل تذكير — هيبعتلك إشعار طول ما الصفحة مفتوحة على جهازك (بعد ما تضيفها للشاشة الرئيسية).</span><span data-lang="en">Set a time for each reminder — you'll get a notification while this page is open on your device (after adding it to your home screen).</span></p>
        {REMINDERS.map((r, i) => (
          <div key={r.key} className="setting-row" style={i === REMINDERS.length - 1 ? { borderBottom: 'none' } : undefined}>
            <label><span className="row-ic"><Svg html={r.icon} /></span> <span data-lang="ar">{r.ar}</span><span data-lang="en">{r.en}</span></label>
            <input type="time" value={S.times[r.key] || ''} onChange={e => app.setReminderTime(r.key, e.target.value)} />
          </div>
        ))}
        <button className="big-btn" onClick={app.enableNotifications}><span data-lang="ar">تفعيل الإشعارات وحفظ المواعيد</span><span data-lang="en">Enable Notifications &amp; Save Times</span></button>
        <div className={'notif-status ' + (S.notifStatus && S.notifStatus.ok ? 'ok' : '')}>{S.notifStatus ? S.notifStatus.text : ''}</div>
      </div>
    </>
  );
}

export function EmergencySheet({ app }) {
  const cls = app.state.emergencyOpen ? 'open' : '';
  const close = () => app.setState({ emergencyOpen: false });
  return (
    <>
      <div className={'sheet-overlay ' + cls} onClick={close} />
      <div className={'sheet emergency-sheet ' + cls}>
        <div className="sheet-handle" />
        <h3 style={{ color: '#c0392b' }}><span data-lang="ar">علامات خطر — روح دكتور فورًا لو حسيت بـ:</span><span data-lang="en">Warning Signs — Seek care immediately if you notice:</span></h3>
        <ul className="emergency-list">
          <li><span data-lang="ar">تنميل أو ضعف جديد أو متزايد، أو صعوبة رفع مقدمة القدم</span><span data-lang="en">New or worsening numbness/weakness, or difficulty lifting the front of the foot</span></li>
          <li><span data-lang="ar">تنميل بينتشر، أو في منطقة الفخذ الداخلي/العجان</span><span data-lang="en">Spreading numbness, or numbness in the inner thigh/groin area</span></li>
          <li><span data-lang="ar"><strong>فقدان السيطرة على البول أو البراز — طوارئ، روح المستشفى فورًا</strong></span><span data-lang="en"><strong>Loss of bladder or bowel control — emergency, go to the ER immediately</strong></span></li>
          <li><span data-lang="ar">ألم حاد كهربائي نازل في الرجل بشكل جديد أو بيزيد</span><span data-lang="en">New or worsening sharp, electric, shooting leg pain</span></li>
          <li><span data-lang="ar">ألم بيصحيك من النوم أو مش بيهدأ في أي وضعية</span><span data-lang="en">Pain that wakes you from sleep or won't settle in any position</span></li>
        </ul>
        <p style={{ fontSize: '.82em', color: 'var(--txt-dim)' }}><span data-lang="ar">لو حسيت بأي حاجة من دي، وقف أي تمرين فورًا وتواصل مع دكتورك أو اذهب لأقرب طوارئ.</span><span data-lang="en">If you notice any of these, stop exercising immediately and contact your doctor or the nearest emergency room.</span></p>
        <button className="big-btn" style={{ background: '#c0392b' }} onClick={close}><span data-lang="ar">فهمت</span><span data-lang="en">Got it</span></button>
      </div>
    </>
  );
}

export function PendingPhotoSheet({ app }) {
  const S = app.state;
  const isAr = app.isAr();
  return (
    <>
      <div className="sheet-overlay open" onClick={() => app.setState({ pendingPhoto: null })} />
      <div className="sheet open">
        <div className="sheet-handle" />
        <h3><span data-lang="ar">إضافة صورة</span><span data-lang="en">Add Photo</span></h3>
        <img src={S.pendingPhoto} alt="" className="pending-photo-preview" />
        <div className="photo-type-row">
          <button className={S.photoTagType === 'progress' ? 'active' : ''} onClick={() => app.setState({ photoTagType: 'progress' })}><span data-lang="ar">صورة متابعة</span><span data-lang="en">Progress photo</span></button>
          <button className={S.photoTagType === 'report' ? 'active' : ''} onClick={() => app.setState({ photoTagType: 'report' })}><span data-lang="ar">تقرير/أشعة</span><span data-lang="en">Report/MRI</span></button>
        </div>
        <input type="number" className="winput" style={{ width: '100%', marginTop: 10 }} step="0.5" min="0" value={S.photoTagWeight} onChange={e => app.setState({ photoTagWeight: e.target.value })} placeholder={isAr ? 'الوزن (كجم) اختياري' : 'Weight (kg) optional'} />
        <button className="big-btn" onClick={app.savePendingPhoto}><span data-lang="ar">حفظ</span><span data-lang="en">Save</span></button>
      </div>
    </>
  );
}

export function DetailSheet({ app }) {
  const id = app.state.detailItemId;
  const isAr = app.isAr();
  const it = findItem(id);
  if (!it) return null;
  const day = dayOf(id);
  const grp = day && day.groups.find(g => g.items.some(x => x.id === id));
  const tip = tipsFor(grp ? grp.key : 'mob');
  const close = () => app.setState({ detailItemId: null });
  return (
    <>
      <div className="sheet-overlay open" onClick={close} />
      <div className="sheet open">
        <div className="sheet-handle" />
        <h3 style={{ marginBottom: 2 }}>{isAr ? it.ar : it.en}</h3>
        <p className="card-sub" style={{ marginTop: 0 }}>{targetText(it, isAr)}</p>
        <div className="note" style={{ marginTop: 14 }}>{isAr ? tip.ar : tip.en}</div>
        <button className="big-btn" onClick={close}><span data-lang="ar">تمام</span><span data-lang="en">Got it</span></button>
      </div>
    </>
  );
}

export function CelebrateCard({ app }) {
  const day = app.state.celebrate;
  const isAr = app.isAr();
  const close = () => app.setState({ celebrate: null });
  return (
    <>
      <div className="sheet-overlay open" style={{ zIndex: 95 }} onClick={close} />
      <div className="celebrate-card">
        <div className="celebrate-icon"><Svg html={I.core} /></div>
        <h3>{isAr ? 'برافو! 🎉' : 'Great job! 🎉'}</h3>
        <p>{isAr ? `خلّصت كل حاجة في ${day.ar} النهاردة` : `You completed everything in ${day.en} today`}</p>
        <button className="big-btn" onClick={close}>{isAr ? 'تمام' : 'Nice'}</button>
      </div>
    </>
  );
}
