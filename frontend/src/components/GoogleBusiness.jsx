import { GoogleG } from './BrandIcon.jsx';
import { Icon, assetUrl, isBlank } from './common.jsx';
import './GoogleBusiness.css';

function Stars({ value }) {
  return (
    <span className="stars" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon key={n} filled name={value >= n ? 'star' : value >= n - 0.5 ? 'star_half' : 'star'} className={value >= n - 0.5 ? '' : 'dim'} />
      ))}
    </span>
  );
}

export default function GoogleBusiness({ data }) {
  if (!data.isVisible) return null;
  const rating = data.rating === null || data.rating === undefined || data.rating === '' ? null : Number(data.rating);
  const canLink = !isBlank(data.buttonLabel) && !isBlank(data.buttonLink);

  return (
    <section id="reviews" className="google">
      <div className="container">
        <div className="google-box">
          <div className="google-intro">
            <GoogleG size={52} />
            <h2>{data.heading}</h2>
            {!isBlank(data.description) && <p>{data.description}</p>}
          </div>

          <div className="google-card">
            <div className="google-top">
              <span className="google-avatar">
                {data.imageUrl ? <img src={assetUrl(data.imageUrl)} alt="" /> : <Icon name="storefront" />}
              </span>
              <div>
                <h3>{data.businessName}</h3>
                {rating !== null && (
                  <p className="google-rating">
                    <b>{rating.toFixed(1)}</b> <Stars value={rating} />
                    {!isBlank(data.reviewsLabel) && <span>{data.reviewsLabel}</span>}
                  </p>
                )}
                {!isBlank(data.address) && <p className="google-address"><Icon name="location_on" filled /> {data.address}</p>}
              </div>
            </div>
            {canLink && (
              <a href={data.buttonLink} target="_blank" rel="noreferrer" className="btn btn-outline-pink google-btn">
                {data.buttonLabel} <Icon name="open_in_new" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
