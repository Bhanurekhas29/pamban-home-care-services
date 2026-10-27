import { Icon, Lines, isBlank } from './common.jsx';
import './HowItWorks.css';

export default function HowItWorks({ data }) {
  if (!data.isVisible) return null;
  const steps = (data.items || []).filter((s) => !isBlank(s.title));

  return (
    <section id="how-it-works" className="section how">
      <div className="container">
        <header className="how-head">
          {!isBlank(data.eyebrow) && <p className="eyebrow">{data.eyebrow}</p>}
          <h2 className="section-title"><Lines text={data.heading} /></h2>
          {!isBlank(data.description) && <p className="how-sub">{data.description}</p>}
        </header>

        <ol className="how-steps" style={{ '--steps': steps.length }}>
          {steps.map((s, i) => (
            <li key={i} className="how-step">
              <span className="how-circle">
                <Icon name={s.icon} />
                <b>{i + 1}</b>
              </span>
              <h3>{s.title}</h3>
              {!isBlank(s.text) && <p>{s.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
