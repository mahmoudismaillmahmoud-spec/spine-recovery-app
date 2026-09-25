import Anthropic from '@anthropic-ai/sdk';
import { DAYS } from '../data/spine-data.js';
import { ls, todayKey } from './storage.js';
import { computeStreak, dayPct } from './progress.js';
import { getApiKey } from './claude-store.js';

// Loaded lazily (dynamic import) so the SDK doesn't weigh down app start-up.

const MODEL = 'claude-opus-5';

function client() {
  return new Anthropic({ apiKey: getApiKey(), dangerouslyAllowBrowser: true });
}

const SYSTEM = `You are the virtual coach inside "Spine Recovery", a personal spine-rehab and fitness tracking app.
The user has real lumbar nerve compression with foot numbness and follows a 7-day program (mobility, therapeutic core, stretching, gym days, active rest) plus a nutrition and supplement plan.

How to respond:
- Reply in the language the user writes in. For Arabic, use friendly Egyptian Arabic, like the rest of the app.
- Be concise and practical: short paragraphs or a few bullets, sized for a phone screen.
- Base advice on the data snapshot below. Quote the numbers you rely on, and say so when data is missing instead of guessing.
- You are not a doctor. For load increases, new exercises, or persistent or worsening pain, recommend confirming with their physician or physical therapist.
- If the user mentions red-flag symptoms (new or worsening numbness or weakness, foot drop, numbness in the groin or inner thigh, loss of bladder or bowel control, severe or worsening shooting leg pain, pain that wakes them at night), tell them clearly to stop exercising and seek medical care immediately. For loss of bladder or bowel control, tell them to go to the emergency room now.`;

// A compact, factual snapshot of the user's tracked data for Claude to reason over.
export function buildSnapshot(checked) {
  const today = todayKey();
  const hist = ls('weekPctHistory', []).slice(-14).map(h => `${h.date}: ${h.pct}%`);
  const days = DAYS.filter(d => d.groups.length).map(d => {
    const items = d.groups.flatMap(g => g.items);
    const done = items.filter(it => checked[it.id]).map(it => it.en);
    return `${d.en}: ${Math.round(dayPct(d, checked))}% (${done.length}/${items.length} done${done.length ? ': ' + done.join(', ') : ''})`;
  });
  const logs = [];
  DAYS.forEach(d => d.groups.forEach(g => g.items.forEach(it => {
    if (!it.sets) return;
    const l = ls('wlog_' + it.id, []).slice(-5);
    if (l.length) logs.push(`${it.en}: ` + l.map(x => `${x.date} ${x.weight != null ? x.weight + 'kg' : '-'} pain ${x.pain ?? '-'}/3`).join('; '));
  })));
  const health = ls('healthImport_' + today, null);
  const body = ls('bodyWeightLog', []).slice(-10).map(x => `${x.date}: ${x.weight}kg`);
  return [
    `Today: ${new Date().toDateString()} (weekday index ${new Date().getDay()}; the app maps Sunday to Day 1)`,
    `Streak: ${computeStreak()} days. Rest days logged: ${ls('skippedDates', []).length}. Lifetime XP: ${ls('lifetimeXP', 0)}`,
    `Water today: ${ls('water_' + today, 0)} cups. Sleep last night: ${ls('sleep_' + today, '') || 'not logged'} h`,
    `Apple Health today: ${health ? JSON.stringify(health) : 'not imported'}`,
    `Body weight history: ${body.join('; ') || 'none'}`,
    `Checklist progress this week:\n- ${days.join('\n- ')}`,
    `Daily consistency (last 14 days):\n${hist.join('\n') || 'no data yet'}`,
    `Exercise logs (last 5 each, pain 1=none 2=mild 3=high):\n${logs.join('\n') || 'none yet'}`,
  ].join('\n\n');
}

// Streams Claude's reply. `history` is [{role, content}] with plain-text content.
export async function askClaude(history, checked, onText) {
  const stream = client().beta.messages.stream({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: 'adaptive' },
    output_config: { effort: 'medium' },
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: [
      { type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } },
      { type: 'text', text: 'User data snapshot:\n\n' + buildSnapshot(checked) },
    ],
    messages: history.map(m => ({ role: m.role, content: m.content })),
  });
  stream.on('text', (_delta, snapshot) => onText(snapshot));
  const msg = await stream.finalMessage();
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('refusal'), { kind: 'refusal' });
  return msg.content.filter(b => b.type === 'text').map(b => b.text).join('');
}

export function errorText(err, isAr) {
  const t = (ar, en) => (isAr ? ar : en);
  if (err && err.kind === 'refusal') return t('كلود اعتذر عن الرد على السؤال ده. جرّب تصيغه بشكل تاني.', 'Claude declined to answer this. Try rephrasing.');
  if (err instanceof Anthropic.AuthenticationError) return t('مفتاح API غلط أو اتلغى. راجعه من الإعدادات.', 'Invalid or revoked API key. Check it in Settings.');
  if (err instanceof Anthropic.PermissionDeniedError) return t('المفتاح ده مالوش صلاحية. راجع حسابك على console.anthropic.com.', 'This key lacks permission. Check your console.anthropic.com account.');
  if (err instanceof Anthropic.RateLimitError) return t('طلبات كتير ورا بعض. استنى دقيقة وجرّب تاني.', 'Too many requests. Wait a minute and try again.');
  if (err instanceof Anthropic.BadRequestError) return t('الطلب اترفض: ' + err.message + ' (لو المشكلة في الرصيد، اشحن من console.anthropic.com)', 'Request rejected: ' + err.message);
  if (err instanceof Anthropic.APIConnectionError) return t('مفيش اتصال بالنت. كلود محتاج نت.', 'No connection. Claude needs internet.');
  if (err instanceof Anthropic.APIError) return t(`خطأ من السيرفر (${err.status}). جرّب تاني بعد شوية.`, `Server error (${err.status}). Try again shortly.`);
  return t('حصل خطأ غير متوقع. جرّب تاني.', 'Unexpected error. Try again.');
}
