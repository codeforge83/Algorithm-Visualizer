import { IconPlay, IconPause, IconStepForward, IconReset, IconShuffle } from './icons';

export default function Controls({ playing, onPlay, onPause, onStep, onReset, onRandomize, speed, setSpeed }) {
  return (
    <div className="controls">
      <button className="primary" onClick={onPlay} disabled={playing}><IconPlay /> Play</button>
      <button onClick={onPause} disabled={!playing}><IconPause /> Pause</button>
      <button onClick={onStep}><IconStepForward /> Step Forward</button>
      <button onClick={onReset}><IconReset /> Reset</button>
      <button onClick={onRandomize}><IconShuffle /> Randomize</button>
      <label>Speed
        <input aria-label="Animation speed" type="range" min="150" max="1000" step="50" value={1150 - speed} onChange={e => setSpeed(1150 - Number(e.target.value))} />
        <small>{(500 / speed).toFixed(1)}x</small>
      </label>
    </div>
  );
}
