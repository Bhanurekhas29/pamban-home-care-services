import { useEffect, useState } from 'react';
import { Icon, assetUrl, isBlank, linkProps } from './common.jsx';
import './Header.css';

export default function Header({ settings, menu }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(''); // id of the section the visitor is reading, when it has a menu link

  useEffect(() => {
    const menuIds = menu.filter((m) => m.link?.startsWith('#')).map((m) => m.link.slice(1));
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);

      // the section that crosses a line just below the header is the one being read
      const sections = [...document.querySelectorAll('main section[id]')];
      const line = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 76) + 60;
      let current = sections[0]?.id || '';
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= line) current = s.id; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = sections.at(-1)?.id || current;
      setActive(menuIds.includes(current) ? current : '');
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [menu]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled || open ? 'is-solid' : ''}`}>
      <div className="container header-inner">
        <a href="#home" className="brand" onClick={close}>
          {settings.headerLogoUrl && (
            <span className="brand-logo"><img src={assetUrl(settings.headerLogoUrl)} alt="" /></span>
          )}
          <span className="brand-text">
            <strong>{settings.siteName}</strong>
            {!isBlank(settings.tagline) && <small>{settings.tagline}</small>}
          </span>
        </a>

        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Main menu">
          {menu.map((item) => {
            const isActive = item.link?.startsWith('#') && item.link.slice(1) === active;
            return (
              <a
                key={item.id} {...linkProps(item.link)} className={isActive ? 'active' : undefined}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => { close(); if (item.link?.startsWith('#')) setActive(item.link.slice(1)); }}
              >
                {item.label}
              </a>
            );
          })}
          {!isBlank(settings.ctaLabel) && !isBlank(settings.ctaLink) && (
            <a {...linkProps(settings.ctaLink)} className="btn btn-primary nav-cta" onClick={close}>{settings.ctaLabel}</a>
          )}
        </nav>

        <button
          type="button" className="nav-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  );
}
