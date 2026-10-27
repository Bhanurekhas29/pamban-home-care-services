const { GoogleSection } = require('../models');
const singleton = require('./singleton');
const validator = require('./validators');

const checkRequired = validator({
  required: [['heading', 'Main heading'], ['businessName', 'Business name']],
});

module.exports = singleton(GoogleSection, {
  isVisible: true,
  heading: 'Find Us on Google',
  description: 'Explore our business profile, reviews, and service details.',
  businessName: 'Pamban Swami Homecare Services',
  rating: 5,
  reviewsLabel: 'Google Reviews',
  address: '4th Street, Saraswathi Nagar, Neelankarai, Chennai, Tamil Nadu 600115',
  buttonLabel: 'View Google Business Profile',
  buttonLink: '', // the button appears on the website once a link is added
}, (values) => {
  const problem = checkRequired(values);
  if (problem) return problem;
  const rating = values.rating === null || values.rating === '' || values.rating === undefined ? null : Number(values.rating);
  if (rating !== null && !(rating >= 0 && rating <= 5)) return 'Rating must be a number from 0 to 5';
  if (!validator.blank(values.buttonLink) && !/^https?:\/\//i.test(values.buttonLink.trim())) {
    return 'Button link must start with http:// or https://';
  }
  return undefined;
});
