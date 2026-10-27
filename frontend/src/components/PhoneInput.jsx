import { useState } from 'react';
import { mobileError, sanitizeMobile, MOBILE_LENGTH } from '../utils/mobile.js';
import './PhoneInput.css';

// Mobile number field: only digits can be entered, at most 10 of them.
// Typing, pasting and dropping text are all cleaned. `value` holds just the digits.
export default function PhoneInput({
  id = 'phone', label = 'Phone Number', value, onChange, required = true, placeholder = 'Enter your phone number', externalError,
}) {
  const [touched, setTouched] = useState(false);
  // shows the error after the visitor leaves the field, or straight away when the form reports one on submit
  const error = externalError || (touched ? (value || required ? mobileError(value) : '') : '');

  return (
    <div className={`phone-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}{required && <span className="req">*</span>}</label>
      <input
        id={id}
        name={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        maxLength={MOBILE_LENGTH}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(sanitizeMobile(e.target.value))}
        onBlur={() => setTouched(true)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <span id={`${id}-error`} className="phone-error" role="alert">{error}</span>}
    </div>
  );
}
