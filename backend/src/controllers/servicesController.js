const { ServicesSection } = require('../models');
const singleton = require('./singleton');
const validator = require('./validators');

const blank = (value) => !value || !String(value).trim();

// heading/intro of the Services section on the website
exports.section = singleton(ServicesSection, {
  isVisible: true,
  eyebrow: 'OUR HOME CARE SERVICES',
  heading: 'Complete Care for Every Need.',
  description: 'Compassionate and professional healthcare services tailored to your family’s needs.',
  ctaText: 'Not sure which service fits your family?',
  ctaButtonLabel: 'Talk to Our care team',
  ctaButtonLink: '#contact',
}, validator({
  required: [['heading', 'Main heading']],
  pairs: [['ctaButtonLabel', 'ctaButtonLink', 'Button']],
}));

// one service card
const checkTitle = validator({ required: [['title', 'Title']] });
exports.validateService = (values) =>
  checkTitle(values) || (values.isWide && blank(values.description) ? 'Description is required for a wide card' : undefined);
