import { DAYS } from '../data/spine-data.js';
import { ls } from './storage.js';
import { computeStreak } from './progress.js';

const WD_AR = ['الأحد', 'الاتنين', 'التلات', 'الأربع', 'الخميس', 'الجمعة', 'السبت'];
const WD_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function analyze() {
  const hist = ls('weekPctHistory', []);
  const last7 = hist.slice(-7), prev7 = hist.slice(-14, -7);
  const avg = arr => arr.length ? Math.round(arr.reduce((s, h) => s + h.pct, 0) / arr.length) : null;
  const exSummaries = [];
  const painByWeekday = {};
  DAYS.forEach(d => d.groups.forEach(g => g.items.forEach(it => {
    const logs = ls('wlog_' + it.id, []);
    logs.forEach(l => {
      if (l.pain >= 3) { const wd = new Date(l.date).getDay(); painByWeekday[wd] = (painByWeekday[wd] || 0) + 1; }
    });
    if (!it.sets || !logs.length) return;
    const recent = logs.slice(-5);
    const painVals = recent.filter(l => l.pain != null).map(l => l.pain);
    const avgPain = painVals.length ? painVals.reduce((s, p) => s + p, 0) / painVals.length : null;
    const weights = recent.filter(l => l.weight != null).map(l => l.weight);
    exSummaries.push({
      item: it, logs, avgPain,
      weightTrend: weights.length >= 2 ? weights[weights.length - 1] - weights[0] : 0,
      lastWeight: weights.length ? weights[weights.length - 1] : null,
    });
  })));
  let worstWeekday = null, worstCount = 0;
  Object.keys(painByWeekday).forEach(wd => { if (painByWeekday[wd] > worstCount) { worstCount = painByWeekday[wd]; worstWeekday = Number(wd); } });
  return { avg7: avg(last7), avgPrev7: avg(prev7), streak: computeStreak(), exSummaries, worstWeekday, worstCount, dataDays: hist.length, hist };
}

export function coachCards(isAr) {
  const t = (ar, en) => isAr ? ar : en;
  const a = analyze();
  const cards = [];
  if (a.avg7 !== null) {
    let msg, tone;
    if (a.avgPrev7 !== null && a.avg7 > a.avgPrev7 + 5) {
      msg = t(`التزامك طالع لفوق: ${a.avgPrev7}% ← ${a.avg7}% الأسبوع ده. كمّل بنفس الإيقاع.`, `Your consistency is climbing: ${a.avgPrev7}% → ${a.avg7}% this week. Keep this rhythm.`);
      tone = 'ok';
    } else if (a.avgPrev7 !== null && a.avg7 < a.avgPrev7 - 5) {
      msg = t(`التزامك نزل من ${a.avgPrev7}% لـ ${a.avg7}%. مش مشكلة — رجّع الإيقاع بأبسط حاجة: خلّص الحركة اليومية بس (10 دقايق) لمدة 3 أيام ورا بعض.`, `Consistency dipped from ${a.avgPrev7}% to ${a.avg7}%. No problem — rebuild momentum with the simplest thing: just the daily mobility (10 min) for 3 days in a row.`);
      tone = 'warn';
    } else {
      msg = t(`متوسط التزامك ${a.avg7}% الأسبوع ده — ثابت. الثبات أهم من الكمال في التأهيل.`, `Your average this week is ${a.avg7}% — steady. In rehab, steady beats perfect.`);
      tone = 'ok';
    }
    cards.push({ title: t('قراءة الأسبوع', 'Week Read'), msg, tone });
  } else {
    cards.push({ title: t('قراءة الأسبوع', 'Week Read'), msg: t('لسه مفيش بيانات كفاية — استخدم التطبيق كام يوم وارجعلي.', 'Not enough data yet — use the app for a few days and come back.'), tone: 'ok' });
  }
  a.exSummaries.forEach(s => {
    const name = isAr ? s.item.ar : s.item.en;
    if (s.avgPain !== null && s.avgPain >= 2.5) {
      const reduced = s.lastWeight ? Math.round(s.lastWeight * 0.75 * 2) / 2 : null;
      cards.push({
        title: name, tone: 'warn',
        msg: t(`الألم في التمرين ده عالي باستمرار. الأسبوع الجاي: قلل الوزن 20-30% (${s.lastWeight ? 'من ' + s.lastWeight + ' لحوالي ' + reduced + ' كجم' : ''}) وركز على البطء والتحكم. لو الألم فضل عالي حتى بالوزن الأقل، وقّفه وقول لدكتورك.`,
          `Pain on this exercise is consistently high. Next week: cut the load 20-30% (${s.lastWeight ? 'from ' + s.lastWeight + ' to ~' + reduced + 'kg' : ''}) and focus on slow control. If pain stays high even lighter, pause it and tell your doctor.`),
      });
    } else if (s.avgPain !== null && s.avgPain <= 1.3 && s.weightTrend >= 0 && s.logs.length >= 3) {
      const suggested = s.lastWeight ? Math.round((s.lastWeight * 1.05) * 2) / 2 : null;
      cards.push({
        title: name, tone: 'ok',
        msg: t(`مفيش ألم تقريبًا وأنت مستقر عليه من ${s.logs.length} تسجيلات. جاهز لزيادة صغيرة: ${suggested ? s.lastWeight + ' ← ' + suggested + ' كجم' : 'زوّد ~5%'} أو تكرار إضافي لكل سيت.`,
          `Almost no pain and you've been stable across ${s.logs.length} logs. Ready for a small bump: ${suggested ? s.lastWeight + ' → ' + suggested + 'kg' : 'add ~5%'} or one extra rep per set.`),
      });
    }
  });
  if (a.worstWeekday !== null && a.worstCount >= 2) {
    const dayName = isAr ? WD_AR[a.worstWeekday] : WD_EN[a.worstWeekday];
    cards.push({
      title: t('نمط لاحظته', 'Pattern I Noticed'), tone: 'warn',
      msg: t(`الألم العالي بيتسجل أكتر حاجة يوم ${dayName} (${a.worstCount} مرات). فكّر إيه اللي بيحصل قبله — نوم أقل؟ قعدة طويلة؟ يوم رجل تقيل؟ جرّب تخفف حمل اليوم اللي قبله وشوف الفرق.`,
        `High pain logs cluster on ${dayName} (${a.worstCount} times). Think about what happens before it — less sleep? Long sitting? A heavy leg day? Try lightening the day before and see if it changes.`),
    });
  }
  if (a.streak >= 3) {
    cards.push({ title: t('السلسلة', 'Streak'), tone: 'ok', msg: t(`${a.streak} أيام متتالية — الاستمرارية دي هي اللي بتبني ضهر قوي. حافظ عليها حتى لو بيوم مخفف.`, `${a.streak} days in a row — this consistency is what builds a strong back. Protect it, even with a light day.`) });
  } else if (a.dataDays >= 5 && a.streak === 0) {
    cards.push({ title: t('نصيحة اليوم', "Today's Nudge"), tone: 'warn', msg: t('ابدأ سلسلة جديدة النهاردة بأصغر خطوة: افتح وضع التركيز وخلّص الحركة اليومية بس. اليوم الكامل مش شرط.', "Start a new streak today with the smallest step: open focus mode and finish just the mobility routine. A full day isn't required.") });
  }
  if (a.hist.length >= 7) {
    const byWd = {};
    a.hist.forEach(x => { const wd = new Date(x.date).getDay(); (byWd[wd] = byWd[wd] || []).push(x.pct); });
    let bestWd = null, bestAvg = -1;
    Object.keys(byWd).forEach(wd => { const av = byWd[wd].reduce((s, p) => s + p, 0) / byWd[wd].length; if (av > bestAvg) { bestAvg = av; bestWd = Number(wd); } });
    if (bestWd !== null && bestAvg >= 50) {
      cards.push({
        title: t('أقوى أيامك', 'Your Strongest Day'), tone: 'ok',
        msg: t(`يوم ${WD_AR[bestWd]} هو أعلى أيامك التزامًا (${Math.round(bestAvg)}%). حط فيه أصعب تمريناتك واستغل الطاقة دي.`, `${WD_EN[bestWd]} is your most consistent day (${Math.round(bestAvg)}%). Schedule your hardest sessions there.`),
      });
    }
  }
  const readyCount = a.exSummaries.filter(s => s.avgPain !== null && s.avgPain <= 1.3 && s.logs.length >= 3).length;
  if (readyCount >= 3) {
    cards.push({ title: t('أسبوع تقدم', 'Progression Week'), tone: 'ok', msg: t(`${readyCount} تمارين مستقرة بدون ألم — الأسبوع الجاي مناسب لزيادات صغيرة في الحمل (2.5-5%) عليهم كلهم.`, `${readyCount} exercises are stable and pain-free — next week is a good time for small load increases (2.5-5%) across them.`) });
  }
  if (a.streak >= 10) {
    cards.push({ title: t('نصيحة ديلود', 'Deload Tip'), tone: 'warn', msg: t(`${a.streak} يوم متواصل — جسمك بيبني في الراحة. خصص 2-3 أيام أخف (نص الأحمال) الأسبوع ده عشان تكمل أقوى.`, `${a.streak} straight days — the body adapts during recovery. Take 2-3 lighter days (half loads) this week to come back stronger.`) });
  }
  const skipped = ls('skippedDates', []).length;
  if (skipped >= 2) {
    cards.push({ title: t('أيام الراحة', 'Rest Days'), tone: 'ok', msg: t(`سجّلت ${skipped} يوم راحة موثّق — ده أفضل من إنك تكسر الروتين بصمت وتحس بالذنب. استمر تسجّلها براحة.`, `You've logged ${skipped} tracked rest day(s) — better than silently breaking the routine and feeling guilty. Keep logging them honestly.`) });
  }
  return cards;
}
