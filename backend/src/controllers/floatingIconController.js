const validator = require('./validators');
const { normalizeMobile, isEmail } = require('../utils/contactFormat');

// platform -> what `value` must be. The website builds the real link from it
// (call -> tel:, whatsapp -> wa.me/91..., email -> mailto:, others -> the link itself).
const PHONE_PLATFORMS = ['call', 'whatsapp'];
const LINK_PLATFORMS = ['facebook', 'instagram', 'youtube', 'location'];
exports.PLATFORMS = [...PHONE_PLATFORMS, 'email', ...LINK_PLATFORMS];

const checkBasics = validator({ required: [['platform', 'Icon type'], ['value', 'Number, email or link']] });

exports.validate = (values) => {
  const problem = checkBasics(values);
  if (problem) return problem;
  const value = String(values.value).trim();

  if (!exports.PLATFORMS.includes(values.platform)) return 'Choose an icon type from the list';
  if (PHONE_PLATFORMS.includes(values.platform) && !normalizeMobile(value)) {
    return 'Enter a valid 10-digit mobile number (starting with 6, 7, 8 or 9)';
  }
  if (values.platform === 'email' && !isEmail(value)) return 'Enter a valid email address';
  if (LINK_PLATFORMS.includes(values.platform) && !/^https?:\/\/\S+$/i.test(value)) {
    return 'The link must start with http:// or https://';
  }
  if (values.message && String(values.message).length > 300) return 'The message can be at most 300 characters';
  return undefined;
};
