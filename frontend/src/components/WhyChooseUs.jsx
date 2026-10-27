import { Icon, Lines, assetUrl, isBlank } from './common.jsx';
import './WhyChooseUs.css';

export default function WhyChooseUs({ data }) {
  if (!data.isVisible) return null;
  const items = (data.items || []).filter((c) => !isBlank(c.title));

  return (
    <section
      id="why-choose-us"
      className={`section why ${data.backgroundImageUrl ? 'has-bg' : ''} ${data.backgroundImageUrl && data.backgroundOverlay ? 'dark-layer' : ''}`}
      style={data.backgroundImageUrl ? { backgroundImage: `url(${assetUrl(data.backgroundImageUrl)})` } : undefined}
    >
      <div className="container why-wrap">
        <header className="why-head">
          {!isBlank(data.eyebrow) && <p className="eyebrow">{data.eyebrow}</p>}
          <h2 className="section-title"><Lines text={data.heading} /></h2>
          {!isBlank(data.description) && <p className="why-sub">{data.description}</p>}
        </header>

        <div className="why-grid">
          {items.map((c, i) => (
            <article key={i} className="why-card">
              <span className="why-icon"><Icon name={c.icon} /></span>
              <h3>{c.title}</h3>
              {!isBlank(c.text) && <p>{c.text}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
