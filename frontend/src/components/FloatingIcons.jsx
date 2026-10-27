import BrandIcon from './BrandIcon.jsx';
import { Icon, iconLink } from './common.jsx';
import './FloatingIcons.css';

const LOOK = {
  whatsapp: { brand: 'whatsapp', name: 'Chat on WhatsApp' },
  call: { icon: 'call', name: 'Call us' },
  email: { icon: 'mail', name: 'Email us' },
  facebook: { brand: 'facebook', name: 'Facebook' },
  instagram: { brand: 'instagram', name: 'Instagram' },
  youtube: { brand: 'youtube', name: 'YouTube' },
  location: { icon: 'location_on', name: 'Find us on the map' },
};

export default function FloatingIcons({ icons }) {
  if (!icons.length) return null;

  return (
    <div className="floating-icons">
      {icons.map((item) => {
        const look = LOOK[item.platform];
        if (!look) return null;
        const title = item.label || look.name;
        return (
          <a key={item.id} {...iconLink(item)} className={`float-btn ${item.platform}`} title={title} aria-label={title}>
            {look.brand ? <BrandIcon name={look.brand} size={26} /> : <Icon name={look.icon} filled />}
          </a>
        );
      })}
    </div>
  );
}
