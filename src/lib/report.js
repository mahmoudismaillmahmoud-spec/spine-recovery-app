import { DAYS } from '../data/spine-data.js';
import { ls } from './storage.js';
import { computeStreak, getLevelInfo } from './progress.js';

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function openMonthlyReport(isAr, xpPerLevel) {
  const hist = ls('weekPctHistory', []).slice(-30);
  const streak = computeStreak();
  const lvl = getLevelInfo(xpPerLevel);
  let weightRows = '';
  DAYS.forEach(d => d.groups.forEach(g => g.items.forEach(it => {
    if (!it.sets) return;
    const logs = ls('wlog_' + it.id, []);
    if (!logs.length) return;
    const rows = logs.slice(-6).map(l => `${new Date(l.date).toLocaleDateString()}: ${l.weight != null ? l.weight + 'kg' : '—'}${l.pain ? ' (pain ' + l.pain + '/3)' : ''}`).join('<br>');
    weightRows += `<tr><td>${esc(isAr ? it.ar : it.en)}</td><td>${rows}</td></tr>`;
  })));
  const avgPct = hist.length ? Math.round(hist.reduce((s, h) => s + h.pct, 0) / hist.length) : 0;
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`
    <html dir="${isAr ? 'rtl' : 'ltr'}"><head><meta charset="UTF-8"><title>${isAr ? 'التقرير الشهري' : 'Monthly Report'}</title>
    <style>
      body{font-family:Arial,sans-serif;padding:30px;color:#1c2620;}
      h1{color:#1a5c3f;} table{width:100%;border-collapse:collapse;margin-top:16px;}
      th,td{border:1px solid #ddd;padding:8px;text-align:${isAr ? 'right' : 'left'};font-size:.85em;}
      th{background:#e5f2eb;} .stat{display:inline-block;margin-inline-end:24px;margin-bottom:14px;}
      .stat b{font-size:1.4em;color:#1a5c3f;display:block;}
    </style></head><body>
    <h1>${isAr ? 'تقرير المتابعة الشهري' : 'Monthly Progress Report'}</h1>
    <p>${isAr ? 'تاريخ التقرير' : 'Report date'}: ${new Date().toLocaleDateString()}</p>
    <div class="stat"><b>${avgPct}%</b>${isAr ? 'متوسط الالتزام (30 يوم)' : 'Avg consistency (30 days)'}</div>
    <div class="stat"><b>${streak}</b>${isAr ? 'يوم متتالي' : 'day streak'}</div>
    <div class="stat"><b>${lvl.level}</b>${isAr ? 'المستوى الحالي' : 'Current level'}</div>
    <h3>${isAr ? 'الأوزان المسجلة' : 'Logged Weights'}</h3>
    <table><tr><th>${isAr ? 'التمرين' : 'Exercise'}</th><th>${isAr ? 'آخر السجلات' : 'Recent Entries'}</th></tr>${weightRows || '<tr><td colspan=2>' + (isAr ? 'لا يوجد' : 'None') + '</td></tr>'}</table>
    <p style="margin-top:30px;font-size:.75em;color:#7c8a80;">${isAr ? 'هذا التقرير مُنشأ من بيانات المستخدم الذاتية، وليس تقييمًا طبيًا.' : 'This report is generated from self-tracked user data and is not a medical assessment.'}</p>
    <script>window.onload=()=>window.print();<\/script>
    </body></html>`);
  win.document.close();
}
