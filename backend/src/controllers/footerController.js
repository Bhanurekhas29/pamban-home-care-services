const { FooterSection } = require('../models');
const singleton = require('./singleton');
const validator = require('./validators');

const PLATFORMS = ['facebook', 'instagram', 'youtube', 'x', 'linkedin'];
const checkRequired = validator({
  required: [
    ['quickLinksHeading', 'Quick links heading'], ['servicesHeading', 'Services heading'],
    ['physioHeading', 'Physiotherapy heading'], ['contactHeading', 'Contact heading'],
  ],
});

module.exports = singleton(FooterSection, {
  aboutText: 'Professional home care services and physiotherapy at home — delivered with compassion, skill and respect.',
  socialLinks: [
    { platform: 'facebook', url: '' },
    { platform: 'instagram', url: '' },
    { platform: 'youtube', url: '' },
  ], // an icon shows on the website once its link is filled in
  quickLinksHeading: 'QUICK LINKS',
  quickLinks: [
    { label: 'Home', link: '#home' },
    { label: 'About Us', link: '#about' },
    { label: 'Why Choose Us', link: '#why-choose-us' },
    { label: 'How It Works', link: '#how-it-works' },
    { label: 'Our Promises', link: '#promises' },
    { label: 'Contact Us', link: '#contact' },
  ],
  servicesHeading: 'HOME CARE SERVICES',
  physioHeading: 'PHYSIOTHERAPY',
  contactHeading: 'CONTACT',
  copyrightText: 'Pamban Swami Home Care. All rights reserved.',
}, (values) => {
  const problem = checkRequired(values);
  if (problem) return problem;
  const links = values.quickLinks || [];
  const bad = links.findIndex((l) => validator.blank(l.label) || validator.blank(l.link));
  if (bad >= 0) return `Quick link ${bad + 1} needs both a name and a link`;
  for (const [i, s] of (values.socialLinks || []).entries()) {
    if (!PLATFORMS.includes(s.platform)) return `Social link ${i + 1}: choose a platform`;
    if (!validator.blank(s.url) && !/^https?:\/\//i.test(s.url.trim())) {
      return `Social link ${i + 1}: the link must start with http:// or https://`;
    }
  }
  return undefined;
});
