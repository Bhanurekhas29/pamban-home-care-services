import { Icon, Lines, assetUrl, isBlank, linkProps } from './common.jsx';
import './ProfessionalCare.css';

export default function ProfessionalCare({ data }) {
  if (!data.isVisible) return null;

  return (
    <section id="professional-care" className="section pro">
      <div className="container pro-grid">
        <div className="pro-copy">
          {!isBlank(data.eyebrow) && <p className="eyebrow pro-eyebrow">{data.eyebrow}</p>}
          <Icon name="format_quote" filled className="pro-quote" />
          <h2 className="section-title"><Lines text={data.heading} /></h2>
          {!isBlank(data.description) && <p className="pro-text">{data.description}</p>}
          {!isBlank(data.buttonLabel) && !isBlank(data.buttonLink) && (
            <a {...linkProps(data.buttonLink)} className="btn btn-primary">{data.buttonLabel} <Icon name="arrow_forward" /></a>
          )}
        </div>

        <div className="pro-photo-wrap">
          <div className="pro-photo">
            {data.imageUrl ? <img src={assetUrl(data.imageUrl)} alt="" loading="lazy" /> : <div className="pro-fallback"><Icon name="image" /></div>}
          </div>
        </div>
      </div>
    </section>
  );
}
