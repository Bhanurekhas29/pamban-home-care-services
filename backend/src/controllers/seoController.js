const { SeoSetting } = require('../models');
const singleton = require('./singleton');
const validator = require('./validators');

const checkTitle = validator({ required: [['metaTitle', 'Meta title']] });

module.exports = singleton(SeoSetting, {
  metaTitle: 'Pamban Swami Home Care | Home Care & Physiotherapy at Home',
  metaDescription:
    'Professional home care and physiotherapy at home, delivered with compassion, skill and respect. Elderly care, nursing, patient care and more.',
}, (values) => {
  const problem = checkTitle(values);
  if (problem) return problem;
  // generous hard limits; the admin page shows the recommended lengths (about 60 and 160 characters)
  if (String(values.metaTitle).length > 120) return 'Meta title is too long (120 characters at most)';
  if (values.metaDescription && String(values.metaDescription).length > 320) {
    return 'Meta description is too long (320 characters at most)';
  }
  return undefined;
});
