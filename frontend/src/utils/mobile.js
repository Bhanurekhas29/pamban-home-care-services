// Indian mobile number rules for the website forms (the server checks the same rules again).

export const MOBILE_LENGTH = 10;

// Keeps digits only and caps the length at 10.
// A pasted "+91 98765 43210" or "098765 43210" has its country/trunk prefix removed first.
export function sanitizeMobile(raw) {
  let digits = String(raw ?? '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return digits.slice(0, MOBILE_LENGTH);
}

// Returns an error message, or '' when the number is fine.
export function mobileError(value) {
  if (!value) return 'Mobile number is required';
  if (!/^[6-9]\d{9}$/.test(value)) return 'Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9';
  return '';
}
