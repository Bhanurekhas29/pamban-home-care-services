import BrandIcon from './BrandIcon.jsx';
import { Icon, assetUrl, isBlank, linkProps } from './common.jsx';
import './Footer.css';

export default function Footer({ data, settings, services, treatments, contact }) {
  const social = (data.socialLinks || []).filter((s) => !isBlank(s.url));
  const quick = (data.quickLinks || []).filter((l) => !isBlank(l.label) && !isBlank(l.link));
  const details = (contact.items || []).filter((i) => i.showInFooter && !isBlank(i.value));

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            {settings.footerLogoUrl && <span className="logo-box"><img src={assetUrl(settings.footerLogoUrl)} alt="" /></span>}
            <span className="logo-text">
              <strong>{settings.siteName}</strong>
              {!isBlank(settings.tagline) && <small>{settings.tagline}</small>}
            </span>
          </a>
          {!isBlank(data.aboutText) && <p>{data.aboutText}</p>}
          {social.length > 0 && (
            <div className="footer-social">
              {social.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" aria-label={s.platform}><BrandIcon name={s.platform} size={16} /></a>
              ))}
            </div>
          )}
        </div>

        <nav className="footer-col" aria-label="Quick links">
          <h4>{data.quickLinksHeading}</h4>
          <ul>{quick.map((l, i) => <li key={i}><a {...linkProps(l.link)}>{l.label}</a></li>)}</ul>
        </nav>

        <div className="footer-col">
          <h4>{data.servicesHeading}</h4>
          <ul>{services.map((s) => <li key={s.id}><a href="#services">{s.title}</a></li>)}</ul>
        </div>

        <div className="footer-col">
          <h4>{data.physioHeading}</h4>
          <ul>{treatments.map((t) => <li key={t.id}><a href="#physiotherapy">{t.title}</a></li>)}</ul>
        </div>

        <div className="footer-col footer-contact">
          <h4>{data.contactHeading}</h4>
          <ul>
            {details.map((d, i) => (
              <li key={i}><Icon name={d.icon} /><span>{d.value}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        {!isBlank(data.copyrightText) && <p className="copyright">© {new Date().getFullYear()} {data.copyrightText}</p>}
        {settings.showCredit && !isBlank(settings.creditText) && (
          <p className="credit">
            {settings.creditUrl ? <a href={settings.creditUrl} target="_blank" rel="noreferrer">{settings.creditText}</a> : settings.creditText}
          </p>
        )}
      </div>
    </footer>
  );
}
