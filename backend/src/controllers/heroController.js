const { HeroSection } = require('../models');
const singleton = require('./singleton');
const validator = require('./validators');

const defaults = {
  eyebrow: 'PAMBAN SWAMI HOME CARE',
  heading: 'Professional Care.\nRight at Your Home.',
  description:
    'From nursing and elderly care to physiotherapy and rehabilitation, receive compassionate, professional care in the comfort of your home.',
  primaryBtnLabel: 'Explore Our Services',
  primaryBtnLink: '#services',
  secondaryBtnLabel: 'Contact Us',
  secondaryBtnLink: '#contact',
  features: [
    { icon: 'task_alt', text: 'Trained Caregivers' },
    { icon: 'shield', text: 'Safe & Reliable Service' },
    { icon: 'favorite', text: 'Personalized Care' },
  ],
  cardIcon: 'schedule',
  cardTagline: 'Your Care,',
  cardHeading: 'Your Time,',
  cardHighlight: 'Our Priority.',
  cardDescription: 'Flexible care options to suit your needs, available 12 hours or 24 hours a day.',
  options: [
    { icon: 'light_mode', title: '12-Hour Care', description: 'Daytime support for your loved ones.', link: '#contact' },
    { icon: 'dark_mode', title: '24-Hour Care', description: 'Round-the-clock care and support.', link: '#contact' },
  ],
  cardFooter: 'Trusted Care. Every Hour. Every Day.',
};

module.exports = singleton(HeroSection, defaults, validator({
  required: [['heading', 'Main heading'], ['description', 'Description']],
  pairs: [
    ['primaryBtnLabel', 'primaryBtnLink', 'Primary button'],
    ['secondaryBtnLabel', 'secondaryBtnLink', 'Secondary button'],
  ],
}));
