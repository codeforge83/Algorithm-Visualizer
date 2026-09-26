import { IconCode } from './icons';

const SPLIT_RE = /\b(for|to|down|while|if|else|return|do)\b/g;
const WORD_RE = /^(for|to|down|while|if|else|return|do)$/;

function highlight(text) {
  if (!text) return ' ';
  const parts = text.split(SPLIT_RE);
  return parts.map((part, i) => WORD_RE.test(part)
    ? <span className="kw" key={i}>{part}</span>
    : <span key={i}>{part}</span>);
}

export default function Pseudocode({ code, line }) {
  return (
    <section className="panel code-card">
      <h2><span className="panel-icon"><IconCode /></span>Pseudocode</h2>
      <pre>
        {code.map((t, i) => (
          <div className={line === i + 1 ? 'highlight' : ''} key={i}>
            {line === i + 1 && <em className="arrow">→</em>}
            <span className="ln">{i + 1}</span>
            {highlight(t)}
          </div>
        ))}
      </pre>
    </section>
  );
}
