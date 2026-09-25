const C = 226.19;
export default function Ring({ pct, children }) {
  return (
    <div className={'ring ' + (pct >= 100 ? 'complete' : '')}>
      <svg width="90" height="90">
        <circle className="bg" cx="45" cy="45" r="36" />
        <circle className="fg" cx="45" cy="45" r="36" style={{ strokeDasharray: C + 'px', strokeDashoffset: (C - (pct / 100) * C).toFixed(1) + 'px' }} />
      </svg>
      <div className="ring-label">{Math.round(pct)}%</div>
      <div>{children}</div>
    </div>
  );
}
