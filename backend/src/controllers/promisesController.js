const { PromisesSection } = require('../models');
const singleton = require('./singleton');
const validator = require('./validators');

const checkHeading = validator({ required: [['heading', 'Main heading']] });

module.exports = singleton(PromisesSection, {
  isVisible: true,
  eyebrow: 'OUR PROMISES',
  heading: 'Our Promises to Your Family.',
  description: 'What every family can expect from us — on every visit, without exception.',
  items: [
    { icon: 'task_alt', title: 'Trained & Verified Staff', text: 'Every caregiver is screened and trained before entering your home.' },
    { icon: 'task_alt', title: 'Safe & Reliable Service', text: 'Consistent, trustworthy support — on time, every single visit.' },
    { icon: 'task_alt', title: 'Affordable & Accessible Care', text: 'Fair, transparent pricing so quality care stays within reach.' },
    { icon: 'task_alt', title: 'Care in the Comfort of Your Home', text: 'Professional support where your loved ones feel most at ease.' },
  ],
}, (values) => {
  const problem = checkHeading(values);
  if (problem) return problem;
  const missing = (values.items || []).findIndex((item) => !item.title || !String(item.title).trim());
  return missing >= 0 ? `Card ${missing + 1} needs a title` : undefined;
});
