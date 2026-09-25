import { useEffect, useRef, useState } from 'react';
import { getApiKey, loadChat, saveChat } from '../lib/claude-store.js';

const SUGGESTIONS = {
  ar: ['حلّل أسبوعي وقولي أركّز على إيه', 'إيه خطة النهارده المناسبة لحالتي؟', 'أزوّد الأوزان ولا لسه؟', 'ضهري واجعني النهارده، أعمل إيه؟'],
  en: ['Analyze my week and tell me what to focus on', "What's the right plan for today?", 'Should I increase my weights yet?', 'My back hurts today, what should I do?'],
};

export default function ClaudeChat({ app }) {
  const isAr = app.isAr();
  const [msgs, setMsgs] = useState(loadChat);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const endRef = useRef(null);
  const hasKey = !!getApiKey();

  useEffect(() => { if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [msgs, draft]);

  if (!hasKey) {
    return (
      <div className="chart-card claude-setup">
        <h4>{isAr ? '✨ مدرب كلود الذكي' : '✨ Claude AI coach'}</h4>
        <p>{isAr
          ? 'اربط التطبيق بكلود عشان يحلل بياناتك ويرد على أسئلتك بالعربي. محتاج مفتاح API من console.anthropic.com، وبيتحط مرة واحدة في الإعدادات.'
          : 'Connect Claude to analyze your data and answer your questions. You need an API key from console.anthropic.com, added once in Settings.'}</p>
        <button className="big-btn" onClick={() => app.setState({ sheetOpen: true, nav: 'settings' })}>{isAr ? 'افتح الإعدادات' : 'Open Settings'}</button>
      </div>
    );
  }

  async function send(text) {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    const history = [...msgs, { role: 'user', content: q }];
    setMsgs(history); setInput(''); setError(''); setBusy(true); setDraft('');
    let api = null;
    try {
      api = await import('../lib/claude.js');
      const reply = await api.askClaude(history, app.state.checked, snap => setDraft(snap));
      const next = [...history, { role: 'assistant', content: reply }];
      setMsgs(next); saveChat(next);
    } catch (err) {
      // Drop the unanswered question so the conversation stays user/assistant alternating.
      setMsgs(msgs); setInput(q);
      setError(api ? api.errorText(err, isAr) : (isAr ? 'مفيش اتصال بالنت. كلود محتاج نت.' : 'No connection. Claude needs internet.'));
    } finally { setBusy(false); setDraft(''); }
  }

  function clear() { setMsgs([]); saveChat([]); setError(''); }

  return (
    <div className="chart-card claude-chat">
      <div className="claude-head">
        <h4>{isAr ? '✨ اسأل كلود' : '✨ Ask Claude'}</h4>
        {msgs.length > 0 && <button className="claude-clear" onClick={clear}>{isAr ? 'محادثة جديدة' : 'New chat'}</button>}
      </div>
      <div className="claude-msgs">
        {msgs.length === 0 && !busy && (
          <div className="claude-suggest">
            {SUGGESTIONS[isAr ? 'ar' : 'en'].map(s => <button key={s} onClick={() => send(s)}>{s}</button>)}
          </div>
        )}
        {msgs.map((m, i) => <div key={i} className={'claude-msg ' + m.role}>{m.content}</div>)}
        {busy && <div className="claude-msg assistant">{draft || <span className="claude-typing"><i /><i /><i /></span>}</div>}
        <div ref={endRef} />
      </div>
      {error && <div className="claude-error">{error}</div>}
      <form className="claude-input" onSubmit={e => { e.preventDefault(); send(); }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder={isAr ? 'اكتب سؤالك…' : 'Ask anything…'} disabled={busy} />
        <button type="submit" disabled={busy || !input.trim()}>{isAr ? 'إرسال' : 'Send'}</button>
      </form>
    </div>
  );
}
