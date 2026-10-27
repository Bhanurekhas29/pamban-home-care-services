const { ProfessionalCareSection } = require('../models');
const singleton = require('./singleton');
const validator = require('./validators');

module.exports = singleton(ProfessionalCareSection, {
  isVisible: true,
  eyebrow: 'PROFESSIONAL CARE',
  heading: 'Professional care and support\nin the comfort of your home.',
  description:
    'From everyday assistance to skilled nursing and physiotherapy, our team brings dependable, compassionate care to your doorstep — so your loved ones can stay where they feel happiest.',
  buttonLabel: 'Contact Us',
  buttonLink: '#contact',
}, validator({
  required: [['heading', 'Main heading']],
  pairs: [['buttonLabel', 'buttonLink', 'Button']],
}));
