import { assetUrl } from '../api/client';
import { sanitizeMobile } from '../utils/mobile.js';

// Material Symbols icon by name (the same names the admin's icon picker uses)
export const Icon = ({ name, filled = false, className = '', ...rest }) => (
  <span className={`material-symbols-outlined ${filled ? 'icon-filled' : ''} ${className}`} aria-hidden="true" {...rest}>
    {name || 'circle'}
  </span>
);

// Text with new lines kept as line breaks (headings typed with Enter in the admin)
export const Lines = ({ text }) =>
  String(text || '').split('\n').map((line, i, all) => (
    <span key={i}>{line}{i < all.length - 1 && <br />}</span>
  ));

export const isBlank = (value) => !value || !String(value).trim();

// Plain page links stay in the same tab; full web addresses open in a new one
export const linkProps = (href) =>
  /^https?:\/\//i.test(href || '') ? { href, target: '_blank', rel: 'noreferrer' } : { href: href || '#' };

export { assetUrl };

// Real link for a floating icon / contact value
export function iconLink({ platform, value, message }) {
  if (platform === 'call') return { href: `tel:+91${sanitizeMobile(value)}` };
  if (platform === 'email') return { href: `mailto:${value}` };
  if (platform === 'whatsapp') {
    const text = message ? `?text=${encodeURIComponent(message)}` : '';
    return { href: `https://wa.me/91${sanitizeMobile(value)}${text}`, target: '_blank', rel: 'noreferrer' };
  }
  return { href: value, target: '_blank', rel: 'noreferrer' };
}
