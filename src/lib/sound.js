let ctx = null;
function audio() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}
function blip(type, freq, peak, dur) {
  try {
    const c = audio();
    const osc = c.createOscillator(), gain = c.createGain();
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(peak, c.currentTime + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(); osc.stop(c.currentTime + dur + 0.01);
  } catch (e) {}
}
export const playTick = () => blip('square', 700, 0.06, 0.05);
export const playClick = () => blip('sine', 1200, 0.12, 0.07);
export function playBeep() {
  try {
    const c = audio();
    [880, 1108, 1320].forEach((freq, i) => {
      const osc = c.createOscillator(), gain = c.createGain();
      osc.type = 'sine'; osc.frequency.value = freq;
      const start = c.currentTime + i * 0.14;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
      osc.connect(gain).connect(c.destination);
      osc.start(start); osc.stop(start + 0.35);
    });
  } catch (e) {}
}
export function vibrate(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} }
