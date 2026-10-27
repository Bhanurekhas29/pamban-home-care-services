const { ContactSection } = require('../models');
const singleton = require('./singleton');
const validator = require('./validators');

const checkRequired = validator({
  required: [
    ['heading', 'Main heading'],
    ['tabHomeCareLabel', 'First form tab name'],
    ['tabPhysioLabel', 'Second form tab name'],
    ['submitLabel', 'Form button text'],
    ['successMessage', 'Thank-you message'],
  ],
});

module.exports = singleton(ContactSection, {
  isVisible: true,
  eyebrow: 'CONTACT US',
  heading: 'Your Loved Ones Deserve the Best Care.',
  description: 'Let us help you find compassionate, professional care for your family.',
  infoTitle: 'Get in touch',
  infoText: 'Call us or request a callback — our care team will help you choose the right support for your family.',
  items: [
    { icon: 'call', label: 'PHONE', value: '+91 XXXXX XXXXX', showInFooter: true },
    { icon: 'mail', label: 'EMAIL', value: 'hello@example.com', showInFooter: true },
    { icon: 'location_on', label: 'SERVICE LOCATION', value: 'Your city & nearby areas', showInFooter: true },
    { icon: 'schedule', label: 'WORKING HOURS', value: 'Everyday · 8:00 am – 8:00 pm', showInFooter: false },
  ],
  tabHomeCareLabel: 'Home Care Service',
  tabPhysioLabel: 'Physiotherapy',
  submitLabel: 'Request a Callback',
  successMessage: 'Thank you! Our care team will call you back shortly.',
}, (values) => checkRequired(values) || validator.itemProblem(values.items, 'value', 'Contact detail', 'a value'));
