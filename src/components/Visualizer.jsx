import ArrayVisualizer from './ArrayVisualizer';
import GraphVisualizer from './GraphVisualizer';
import { IconBars, IconShare, IconSwapArrows } from './icons';

function pillText(kind, step, values) {
  if (!step) return 'Ready to begin';
  if (kind === 'graph') return step.node ? `Visiting ${step.node}` : (step.status || '');
  if (kind === 'binary') {
    if (step.type === 'probe') return `Checking index ${step.mid} (${values[step.mid]})`;
    if (step.type === 'found') return `Found at index ${step.mid}`;
    if (step.type === 'notfound') return 'Not found';
    return step.status || '';
  }
  const [a, b] = step.indices || [];
  if (step.type === 'compare') return `Comparing ${values[a]} and ${values[b]}`;
  if (step.type === 'swap') return `Swapping ${values[a]} and ${values[b]}`;
  if (step.type === 'overwrite') return `Writing ${step.value}`;
  if (step.type === 'sorted') return `${values[step.indices[0]]} placed`;
  if (step.type === 'done') return 'Sorted!';
  return step.status || '';
}

export default function Visualizer({ kind, values, step, algorithm, target, graph, tree }) {
  const isGraph = kind === 'graph';
  return (
    <section className="visualizer">
      <div className="viz-head">
        <span className="viz-icon">{isGraph ? <IconShare /> : <IconBars />}</span>
        <h2>{isGraph ? (tree ? 'Tree Visualization' : 'Graph Visualization') : 'Array Visualization'}</h2>
        <span className="viz-pill"><IconSwapArrows /> {pillText(kind, step, values)}</span>
      </div>
      {isGraph
        ? <GraphVisualizer step={step} mode={algorithm.name.includes('Breadth') ? 'bfs' : 'dfs'} graph={graph} tree={tree} />
        : <ArrayVisualizer values={values} step={step} kind={kind} target={target} />}
    </section>
  );
}
