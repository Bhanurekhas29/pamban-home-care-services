import { Icon, Lines, assetUrl, isBlank, linkProps } from './common.jsx';
import './Hero.css';

export default function Hero({ data }) {
  const features = (data.features || []).filter((f) => !isBlank(f.text));
  const options = (data.options || []).filter((o) => !isBlank(o.title));
  const bg = data.backgroundImageUrl ? { backgroundImage: `url(${assetUrl(data.backgroundImageUrl)})` } : undefined;
  const showCard = !isBlank(data.cardHeading) || options.length > 0;

  return (
    <section id="home" className="hero" style={bg}>
      <div className="hero-shade" />
      <div className="container hero-inner">
        <div className="hero-copy">
          {!isBlank(data.eyebrow) && <p className="eyebrow hero-eyebrow">{data.eyebrow}</p>}
          <h1><Lines text={data.heading} /></h1>
          {!isBlank(data.description) && <p className="hero-text">{data.description}</p>}

          <div className="hero-buttons">
            {!isBlank(data.primaryBtnLabel) && (
              <a {...linkProps(data.primaryBtnLink)} className="btn btn-primary">
                {data.primaryBtnLabel} <Icon name="arrow_forward" />
              </a>
            )}
            {!isBlank(data.secondaryBtnLabel) && (
              <a {...linkProps(data.secondaryBtnLink)} className="btn btn-outline">{data.secondaryBtnLabel}</a>
            )}
          </div>

          {features.length > 0 && (
            <ul className="hero-features">
              {features.map((f, i) => (
                <li key={i}><span className="chip"><Icon name={f.icon} /></span>{f.text}</li>
              ))}
            </ul>
          )}
        </div>

        {showCard && (
          <aside className="hero-card">
            <div className="hero-card-head">
              <span className="hero-card-icon"><Icon name={data.cardIcon} /></span>
              <div>
                {!isBlank(data.cardTagline) && <p className="tagline">{data.cardTagline}</p>}
                {!isBlank(data.cardHeading) && <p className="heading">{data.cardHeading}</p>}
                {!isBlank(data.cardHighlight) && <p className="highlight">{data.cardHighlight}</p>}
              </div>
            </div>
            {!isBlank(data.cardDescription) && <p className="hero-card-text">{data.cardDescription}</p>}

            <div className="hero-options">
              {options.map((o, i) => (
                <a key={i} {...linkProps(o.link)} className="hero-option">
                  <span className="opt-icon"><Icon name={o.icon} /></span>
                  <span className="opt-body">
                    <strong>{o.title}</strong>
                    {!isBlank(o.description) && <small>{o.description}</small>}
                  </span>
                  <span className="opt-go"><Icon name="chevron_right" /></span>
                </a>
              ))}
            </div>

            {!isBlank(data.cardFooter) && (
              <p className="hero-card-footer"><Icon name="favorite" filled /> {data.cardFooter}</p>
            )}
          </aside>
        )}
      </div>
    </section>
  );
}
