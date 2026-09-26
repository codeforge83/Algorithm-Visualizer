export default function ArrayVisualizer({ values, step, kind, target }) {
  const max = Math.max(...values, 1);
  const active = step?.indices || [];
  const isCompare = step?.type === 'compare';
  const isSwap = step?.type === 'swap';
  const sorted = step?.type === 'done' ? values.map((_, i) => i) : (step?.type === 'sorted' ? step.indices : []);
  return (
    <div className={'array-area ' + (kind === 'binary' ? 'binary' : '')}>
      <div className="bars">
        {values.map((v, i) => {
          const discarded = step?.discard?.includes(i);
          const probe = kind === 'binary' && [step?.left, step?.mid, step?.right].includes(i);
          const cls = 'bar-wrap '
            + (active.includes(i) && isCompare ? 'comparing ' : '')
            + (active.includes(i) && isSwap ? 'swapping ' : '')
            + (probe ? 'probe ' : '')
            + (sorted.includes(i) ? 'sorted ' : '')
            + (discarded ? 'discarded ' : '');
          return (
            <div className={cls} key={i}>
              <div className="bar" style={{ height: `${Math.max(12, v / max * 100)}%` }}><span>{v}</span></div>
              <small>{i}{kind === 'binary' && i === step?.left ? ' L' : kind === 'binary' && i === step?.mid ? ' M' : kind === 'binary' && i === step?.right ? ' R' : ''}</small>
            </div>
          );
        })}
      </div>
      {kind === 'binary' && <p className="target">Target: <strong>{target}</strong> · L / M / R mark the active search window</p>}
    </div>
  );
}
