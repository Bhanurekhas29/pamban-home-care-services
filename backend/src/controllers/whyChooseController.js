const { WhyChooseSection } = require('../models');
const singleton = require('./singleton');
const validator = require('./validators');

const checkHeading = validator({ required: [['heading', 'Main heading']] });

module.exports = singleton(WhyChooseSection, {
  isVisible: true,
  eyebrow: 'WHY CHOOSE US',
  heading: 'Care You Can Trust, Comfort You Deserve.',
  description: 'Families choose us for care that is professional, dependable and genuinely personal.',
  items: [
    {
      icon: 'verified_user', title: 'Trained & Verified Staff',
      text: 'Caregivers who are carefully screened and trained to deliver care with skill and warmth.',
    },
    {
      icon: 'monitor_heart', title: 'Safe & Reliable Service',
      text: 'Consistent, dependable support that you and your family can always count on.',
    },
    {
      icon: 'currency_rupee', title: 'Affordable & Accessible Care',
      text: 'Quality home care designed to fit your family’s needs and budget.',
    },
    {
      icon: 'home', title: 'Care in the Comfort of Your Home',
      text: 'Professional support in the familiar, comfortable surroundings of your own home.',
    },
  ],
}, (values) => {
  const problem = checkHeading(values);
  if (problem) return problem;
  const missing = (values.items || []).findIndex((item) => !item.title || !String(item.title).trim());
  return missing >= 0 ? `Card ${missing + 1} needs a title` : undefined;
});
