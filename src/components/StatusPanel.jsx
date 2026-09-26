import { IconBulb } from './icons';

const LABELS = {
  compare: 'Comparing elements',
  swap: 'Swapping elements',
  sorted: 'Placing element',
  done: 'Complete',
  overwrite: 'Writing value',
  range: 'Merging ranges',
  probe: 'Checking middle value',
  found: 'Target found',
  discard: 'Narrowing search',
  notfound: 'Not found',
  visit: 'Visiting node',
  enqueue: 'Enqueuing node',
};

export default function StatusPanel({ step, index, total }) {
  const label = step ? (LABELS[step.type] || 'In progress') : 'Ready to begin';
  return (
    <section className="panel explanation-card" aria-live="polite">
      <div className="panel-head">
        <h2><span className="panel-icon"><IconBulb /></span>Explanation</h2>
        <small>Step {Math.max(0, index + 1)} of {total}</small>
      </div>
      <span className="explanation-badge">{label}</span>
      <p>{step?.status || 'Press Play or Step Forward to begin the walkthrough.'}</p>
    </section>
  );
}
