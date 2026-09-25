const TIPS = {
  mob: { ar: 'حركة صغيرة ومتحكم فيها أفضل من مدى واسع سريع — لو حسيت وخز أو ألم حاد، قلل المدى فورًا.', en: 'Small, controlled range beats a fast wide range — if you feel sharp pain or tingling, reduce the range immediately.' },
  core: { ar: 'حافظ على تنفس طبيعي (متتنفسش نفسك) وشد البطن بهدوء بدل ما تقوّس الضهر.', en: "Keep breathing normally (don't hold your breath) and brace the core gently instead of arching the back." },
  str: { ar: 'ادخل في الإطالة تدريجيًا لحد ما تحس بشد خفيف، من غير ألم، وثبت من غير ما ترتد.', en: 'Ease into the stretch gradually to a gentle pull, never pain, and hold still without bouncing.' },
  gym: { ar: 'ابدأ بوزن تقدر تتحكم فيه بالكامل، وركّز على نزول بطيء (2-3 ثواني) قبل ما تزوّد الوزن.', en: 'Start with a weight you fully control, focus on a slow lowering phase (2-3s) before adding load.' },
  cardio: { ar: 'حافظ على إيقاع تقدر تتكلم فيه براحة (Zone 2) — مش سباق.', en: 'Keep a pace you can comfortably talk through (Zone 2) — not a race.' },
};
export const tipsFor = key => TIPS[key] || TIPS.mob;

export function targetText(it, isAr) {
  const setsInfo = it.sets ? it.sets + ' × ' : '';
  if (it.type === 'hold') return isAr ? `${setsInfo}ثبات ${it.target} ثانية` : `${setsInfo}hold ${it.target}s`;
  return isAr ? `${setsInfo}${it.target} تكرار` : `${setsInfo}${it.target} reps`;
}
export const videoUrl = it => it.q ? 'https://www.youtube.com/results?search_query=' + encodeURIComponent(it.q) : '';
export function fmtTime(sec) {
  sec = Math.max(0, Math.round(sec));
  const m = Math.floor(sec / 60), s = sec % 60;
  return m > 0 ? m + ':' + String(s).padStart(2, '0') : s + 's';
}
