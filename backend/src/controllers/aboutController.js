const { AboutSection } = require('../models');
const singleton = require('./singleton');
const validator = require('./validators');

module.exports = singleton(AboutSection, {
  isVisible: true,
  eyebrow: 'ABOUT US',
  heading: 'Caring Hands,\nTrusted Services.',
  description: 'Professional care and support for seniors, patients and families — right in the comfort of your home.',
  features: [
    { icon: 'task_alt', text: 'Trained & verified caregivers' },
    { icon: 'shield', text: 'Personalised care for every family' },
    { icon: 'task_alt', text: 'Support for seniors, patients & loved ones' },
  ],
  badgeIcon: 'favorite',
  badgeText: 'Care that feels like family',
  buttonLabel: 'Explore Our Services',
  buttonLink: '#services',
}, validator({
  required: [['heading', 'Main heading'], ['description', 'Description']],
  pairs: [['buttonLabel', 'buttonLink', 'Button']],
}));
