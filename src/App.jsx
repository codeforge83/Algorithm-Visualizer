import { useCallback, useState } from 'react';
import { algorithms } from './data/algorithms';
import { useVisualizer } from './hooks/useVisualizer';
import { binarySearch } from './algorithms/binarySearch';
import Controls from './components/Controls';
import Visualizer from './components/Visualizer';
import Pseudocode from './components/Pseudocode';
import ComplexityPanel from './components/ComplexityPanel';
import StatusPanel from './components/StatusPanel';
import Legend from './components/Legend';
import { IconHome, IconBars, IconSearch, IconShare, IconTree, IconPencil, IconShuffle, IconCubes } from './components/icons';

const SORT = [42, 18, 75, 29, 56, 11, 68, 34], BINARY = [4, 9, 15, 22, 31, 43, 55, 67, 72, 88], EMPTY = [];
const DEFAULT_GRAPH = { A: ['B', 'C'], B: ['A', 'D', 'E'], C: ['A', 'F'], D: ['B'], E: ['B', 'F'], F: ['C', 'E'] };
const DEFAULT_EDGES = 'A-B, A-C, B-D, B-E, C-F', DEFAULT_TREE = '1,2,3,4,5,null,7';

const nums = t => { const a = t.split(',').map(x => Number(x.trim())); return a.length && a.every(Number.isInteger) ? a : null; };
const edges = t => { const g = {}; for (const part of t.split(',')) { const [a, b, ...x] = part.trim().split('-').map(x => x.trim()); if (!a || !b || x.length) return null; (g[a] ??= []).push(b); (g[b] ??= []).push(a); } return Object.keys(g).length ? g : null; };
const tree = t => { const a = t.split(',').map(x => x.trim()), g = {}; if (!a[0]) return null; a.forEach(v => { if (v && v !== 'null') g[v] ??= []; }); a.forEach((v, i) => { if (!i || v === 'null') return; const p = a[Math.floor((i - 1) / 2)]; if (p && p !== 'null') g[p].push(v); }); return Object.keys(g).length ? g : null; };

export default function App() {
  const [id, setId] = useState('bubble');
  const [sortText, setSortText] = useState(SORT.join(', '));
  const [sortData, setSortData] = useState(SORT);
  const [arrayText, setArrayText] = useState(BINARY.join(', '));
  const [targetText, setTargetText] = useState('43');
  const [binary, setBinary] = useState(BINARY);
  const [target, setTarget] = useState(43);
  const [mode, setMode] = useState('graph');
  const [edgeText, setEdgeText] = useState(DEFAULT_EDGES);
  const [treeText, setTreeText] = useState(DEFAULT_TREE);
  const [start, setStart] = useState('A');
  const [graphData, setGraphData] = useState(DEFAULT_GRAPH);
  const [message, setMessage] = useState('');

  const algorithm = algorithms[id];
  const isGraph = algorithm.kind === 'graph';
  const initial = algorithm.kind === 'binary' ? binary : algorithm.kind === 'sort' ? sortData : EMPTY;

  const makeSteps = useCallback(v => id === 'binary' ? binarySearch(v, target) : isGraph ? algorithm.run(start, graphData) : algorithm.run(v), [id, algorithm, target, isGraph, start, graphData]);
  const v = useVisualizer(makeSteps, initial), current = v.steps[v.stepIndex];

  const apply = () => {
    if (algorithm.kind === 'sort') { const n = nums(sortText); if (!n) { setMessage('Enter comma-separated integers.'); return; } setSortData(n); v.reset(n); setMessage('Custom array applied.'); return; }
    if (id === 'binary') { const n = nums(arrayText), q = Number(targetText); if (!n || !Number.isInteger(q)) { setMessage('Enter comma-separated integers and an integer target.'); return; } const sorted = [...n].sort((a, b) => a - b); setBinary(sorted); setTarget(q); v.reset(sorted); setMessage('Array sorted automatically before searching.'); return; }
    const g = mode === 'tree' ? tree(treeText) : edges(edgeText);
    if (!g || !g[start]) { setMessage('Enter valid data and a starting node in the structure.'); return; }
    setGraphData(g); v.reset(EMPTY); setMessage(`${mode === 'tree' ? 'Tree' : 'Graph'} applied.`);
  };

  const useExample = () => {
    if (algorithm.kind === 'sort') { setSortText(SORT.join(', ')); setSortData(SORT); v.reset(SORT); setMessage('Example array applied.'); return; }
    if (id === 'binary') { setArrayText(BINARY.join(', ')); setTargetText('43'); setBinary(BINARY); setTarget(43); v.reset(BINARY); setMessage('Example array applied.'); return; }
    if (mode === 'tree') { setTreeText(DEFAULT_TREE); setStart('1'); setGraphData(tree(DEFAULT_TREE)); v.reset(EMPTY); setMessage('Example tree applied.'); return; }
    setEdgeText(DEFAULT_EDGES); setStart('A'); setGraphData(DEFAULT_GRAPH); v.reset(EMPTY); setMessage('Example graph applied.');
  };

  const randomize = () => {
    if (algorithm.kind === 'sort') { const n = Array.from({ length: 8 }, () => Math.floor(Math.random() * 70) + 10); setSortText(n.join(', ')); setSortData(n); v.reset(n); }
    else if (id === 'binary') { const n = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 1).sort((a, b) => a - b); setArrayText(n.join(', ')); setBinary(n); v.reset(n); }
    else v.reset(EMPTY);
  };

  const change = (k, m) => {
    v.setPlaying(false); setId(k); setMessage('');
    if (m && m !== mode) {
      setMode(m);
      if (m === 'tree') { setTreeText(DEFAULT_TREE); setStart('1'); setGraphData(tree(DEFAULT_TREE)); }
      else { setEdgeText(DEFAULT_EDGES); setStart('A'); setGraphData(DEFAULT_GRAPH); }
    }
  };

  return (
    <main className="app-shell">
      <aside>
        <div className="brand"><span className="brand-mark"><IconCubes /></span><span>AlgoLab<small>ALGORITHM VISUALIZER</small></span></div>
        <nav>
          <button className="home-btn"><IconHome /> Dashboard</button>
          <b>Sorting</b>
          {['bubble', 'merge'].map(k => (
            <button className={id === k ? 'selected' : ''} onClick={() => change(k)} key={k}><IconBars /> {algorithms[k].name}</button>
          ))}
          <b>Searching</b>
          <button className={id === 'binary' ? 'selected' : ''} onClick={() => change('binary')}><IconSearch /> Binary Search</button>
          <b>Graphs</b>
          <button className={id === 'bfs' && mode === 'graph' ? 'selected' : ''} onClick={() => change('bfs', 'graph')}><IconShare /> BFS</button>
          <button className={id === 'dfs' && mode === 'graph' ? 'selected' : ''} onClick={() => change('dfs', 'graph')}><IconShare /> DFS</button>
          <b>Trees</b>
          <button className={id === 'bfs' && mode === 'tree' ? 'selected' : ''} onClick={() => change('bfs', 'tree')}><IconTree /> Tree BFS</button>
          <button className={id === 'dfs' && mode === 'tree' ? 'selected' : ''} onClick={() => change('dfs', 'tree')}><IconTree /> Tree DFS</button>
        </nav>
        <footer>Visualize<br />Learn<br />Master<br /><b>Algorithms</b></footer>
      </aside>

      <section className="workspace">
        <div className="title-row">
          <div className="title-text">
            <h1>{algorithm.name}</h1>
            <p className="sub">{algorithm.desc}</p>
          </div>
          <ComplexityPanel complexity={algorithm.complexity} stable={algorithm.stable} />
        </div>

        <div className="main-grid">
          <div className="col-main">
            <Visualizer kind={algorithm.kind} values={v.values} step={current} algorithm={algorithm} target={target} graph={graphData} tree={isGraph && mode === 'tree'} />
            <Controls playing={v.playing} onPlay={() => v.setPlaying(true)} onPause={() => v.setPlaying(false)} onStep={v.step} onReset={() => v.reset(initial)} onRandomize={randomize} speed={v.speed} setSpeed={v.setSpeed} />
          </div>
          <div className="col-side">
            <section className="panel input-card">
              <h2><span className="panel-icon"><IconPencil /></span>{isGraph ? (mode === 'tree' ? 'Input Tree' : 'Input Graph') : id === 'binary' ? 'Input Array' : 'Input Array'}</h2>
              {isGraph ? (
                <>
                  <label>{mode === 'tree' ? 'Level-order tree' : 'Edges'}
                    <input value={mode === 'tree' ? treeText : edgeText} onChange={e => mode === 'tree' ? setTreeText(e.target.value) : setEdgeText(e.target.value)} />
                  </label>
                  <label>Starting node<input value={start} onChange={e => setStart(e.target.value.trim())} /></label>
                </>
              ) : id === 'binary' ? (
                <>
                  <label>Array<input value={arrayText} onChange={e => setArrayText(e.target.value)} /></label>
                  <label>Target<input value={targetText} onChange={e => setTargetText(e.target.value)} /></label>
                </>
              ) : (
                <label>Array<input value={sortText} onChange={e => setSortText(e.target.value)} /></label>
              )}
              <div className="input-actions">
                <button onClick={useExample}>Use Example</button>
                <button className="apply" onClick={apply}>Apply</button>
              </div>
              {(algorithm.kind === 'sort' || id === 'binary') && (
                <div className="size-row">
                  <span>Array Size: <b>{(algorithm.kind === 'sort' ? sortData : binary).length}</b></span>
                  <button onClick={randomize}><IconShuffle /> Randomize</button>
                </div>
              )}
              {message && <small className="hint">{message}</small>}
            </section>
            <Legend kind={isGraph ? 'graph' : 'array'} />
          </div>
        </div>

        <div className="lower">
          <Pseudocode code={algorithm.code} line={current?.line} />
          <StatusPanel step={current} index={v.stepIndex} total={v.steps.length} />
        </div>
      </section>
    </main>
  );
}
