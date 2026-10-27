import { Icon, Lines, assetUrl, isBlank } from './common.jsx';
import './Promises.css';

export default function Promises({ data }) {
  if (!data.isVisible) return null;
  const items = (data.items || []).filter((c) => !isBlank(c.title));

  return (
    <section
      id="promises"
      className={`section promises ${data.backgroundImageUrl ? 'has-bg' : ''} ${data.backgroundImageUrl && data.backgroundOverlay ? 'soft-layer' : ''}`}
      style={data.backgroundImageUrl ? { backgroundImage: `url(${assetUrl(data.backgroundImageUrl)})` } : undefined}
    >
      <div className="container promises-grid">
        <div className="promises-copy">
          {!isBlank(data.eyebrow) && <p className="eyebrow promises-eyebrow">{data.eyebrow}</p>}
          <h2 className="section-title"><Lines text={data.heading} /></h2>
          {!isBlank(data.description) && <p className="promises-text">{data.description}</p>}
        </div>

        <div className="promise-cards">
          {items.map((c, i) => (
            <article key={i} className="promise-card">
              <span className="promise-icon"><Icon name={c.icon} /></span>
              <div>
                <h3>{c.title}</h3>
                {!isBlank(c.text) && <p>{c.text}</p>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
