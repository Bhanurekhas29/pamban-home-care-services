// Indian mobile number: 10 digits starting 6-9. Accepts spaces/dashes and a +91, 91 or 0 prefix.
// Returns the clean 10 digits, or null when the number is not valid.
exports.normalizeMobile = (value) => {
  let digits = String(value || '').replace(/[\s-]/g, '');
  if (digits.startsWith('+')) digits = digits.slice(1);
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
};

exports.isEmail = (value) =>
  typeof value === 'string' && value.length <= 120 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
