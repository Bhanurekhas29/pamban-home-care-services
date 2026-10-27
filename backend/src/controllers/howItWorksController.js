const { HowItWorksSection } = require('../models');
const singleton = require('./singleton');
const validator = require('./validators');

const checkHeading = validator({ required: [['heading', 'Main heading']] });

module.exports = singleton(HowItWorksSection, {
  isVisible: true,
  eyebrow: 'HOW IT WORKS',
  heading: 'Quality Care in 3 Simple Steps.',
  description: 'Getting started is simple — we guide you through every step.',
  items: [
    { icon: 'call', title: 'Contact Us', text: 'Share your home care or physiotherapy requirements.' },
    { icon: 'checklist', title: 'Choose Your Care', text: 'Identify the appropriate service for your needs.' },
    { icon: 'home', title: 'Receive Care at Home', text: 'Get professional support in the comfort of your home.' },
  ],
}, (values) => checkHeading(values) || validator.itemProblem(values.items, 'title', 'Step', 'a title'));
