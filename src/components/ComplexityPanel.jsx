import { IconClock, IconDb, IconGear } from './icons';

export default function ComplexityPanel({ complexity, stable }) {
  const [time, space] = complexity;
  return (
    <div className="complexity-top">
      <div className="stat-card lime">
        <span className="stat-icon"><IconClock /></span>
        <div><small>Time Complexity</small><b>{time}</b></div>
      </div>
      <div className="stat-card violet">
        <span className="stat-icon"><IconDb /></span>
        <div><small>Space Complexity</small><b>{space}</b></div>
      </div>
      <div className="stat-card lime">
        <span className="stat-icon"><IconGear /></span>
        <div><small>Stable</small><b>{stable}</b></div>
      </div>
    </div>
  );
}
