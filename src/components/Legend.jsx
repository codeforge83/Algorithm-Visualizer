import { IconGear } from './icons';

const ARRAY_ITEMS = [
  ['comparing', 'Comparing'],
  ['swapping', 'Swapping'],
  ['sorted', 'Sorted'],
  ['unsorted', 'Unsorted'],
];
const GRAPH_ITEMS = [
  ['current', 'Current'],
  ['visited', 'Visited'],
  ['unvisited', 'Unvisited'],
];

export default function Legend({ kind }) {
  const items = kind === 'graph' ? GRAPH_ITEMS : ARRAY_ITEMS;
  return (
    <section className="panel legend-card">
      <h2><span className="panel-icon"><IconGear /></span>Legend</h2>
      <ul>
        {items.map(([cls, label]) => (
          <li key={cls}><span className={'dot ' + cls} />{label}</li>
        ))}
      </ul>
    </section>
  );
}
