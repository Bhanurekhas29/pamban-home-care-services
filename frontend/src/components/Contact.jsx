import { useState } from 'react';
import { api } from '../api/client';
import { Icon, Lines, assetUrl, isBlank } from './common.jsx';
import PhoneInput from './PhoneInput.jsx';
import { mobileError } from '../utils/mobile.js';
import './Contact.css';

const EMPTY = { name: '', phone: '', age: '', gender: '', serviceName: '', message: '' };

// defined outside Contact so inputs keep their focus while the visitor types
function Field({ name, label, required, error, children }) {
  return (
    <div className={`cf-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={name}>{label}{required && <span className="req">*</span>}</label>
      {children}
      {error && <span className="cf-error" role="alert">{error}</span>}
    </div>
  );
}

export default function Contact({ data, services, treatments }) {
  const [type, setType] = useState('home_care'); // home_care | physiotherapy
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null); // { ok, message }

  if (!data.isVisible) return null;

  const options = (type === 'home_care' ? services : treatments).map((s) => s.title);
  const details = (data.items || []).filter((i) => !isBlank(i.value));
  const set = (name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const switchTab = (next) => {
    setType(next);
    setForm((f) => ({ ...f, serviceName: '' })); // each tab has its own list of services
  };

  const validate = () => {
    const e = {};
    if (isBlank(form.name)) e.name = 'Full name is required';
    const phone = mobileError(form.phone);
    if (phone) e.phone = phone;
    const age = Number(form.age);
    if (!form.age) e.age = 'Age is required';
    else if (!Number.isInteger(age) || age < 1 || age > 120) e.age = 'Enter a valid age';
    if (!form.gender) e.gender = 'Please select a gender';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setResult(null);
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    try {
      const res = await api.post('/enquiries', { ...form, name: form.name.trim(), age: Number(form.age), enquiryType: type });
      setResult({ ok: true, message: res.message });
      setForm(EMPTY);
    } catch (err) {
      setResult({ ok: false, message: err.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      id="contact"
      className={`contact ${data.backgroundImageUrl ? 'has-bg' : ''} ${data.backgroundImageUrl && data.backgroundOverlay ? 'soft-layer' : ''}`}
      style={data.backgroundImageUrl ? { backgroundImage: `url(${assetUrl(data.backgroundImageUrl)})` } : undefined}
    >
      <div className="container">
        <header className="contact-head">
          {!isBlank(data.eyebrow) && <p className="eyebrow contact-eyebrow">{data.eyebrow}</p>}
          <h2 className="section-title"><Lines text={data.heading} /></h2>
          {!isBlank(data.description) && <p>{data.description}</p>}
        </header>

        <div className="contact-grid">
          <div className="contact-photo">
            {data.imageUrl && <img src={assetUrl(data.imageUrl)} alt="" loading="lazy" />}
          </div>

          <aside
            className={`contact-info ${data.infoBackgroundUrl ? 'has-art' : ''}`}
            style={data.infoBackgroundUrl ? { backgroundImage: `url(${assetUrl(data.infoBackgroundUrl)})` } : undefined}
          >
            {!isBlank(data.infoTitle) && <h3>{data.infoTitle}</h3>}
            {!isBlank(data.infoText) && <p className="info-text">{data.infoText}</p>}
            <ul>
              {details.map((d, i) => (
                <li key={i}>
                  <span className="info-icon"><Icon name={d.icon} /></span>
                  <span>
                    {!isBlank(d.label) && <small>{d.label}</small>}
                    <strong>{d.value}</strong>
                  </span>
                </li>
              ))}
            </ul>
          </aside>

          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="cf-tabs" role="tablist">
              <button type="button" role="tab" aria-selected={type === 'home_care'} className={type === 'home_care' ? 'active' : ''} onClick={() => switchTab('home_care')}>
                {data.tabHomeCareLabel}
              </button>
              <button type="button" role="tab" aria-selected={type === 'physiotherapy'} className={type === 'physiotherapy' ? 'active' : ''} onClick={() => switchTab('physiotherapy')}>
                {data.tabPhysioLabel}
              </button>
            </div>

            <div className="cf-grid">
              <Field name="name" label="Full Name" required error={errors.name}>
                <input id="name" type="text" autoComplete="name" maxLength={100} placeholder="Enter your full name" value={form.name} onChange={(e) => set('name', e.target.value)} />
              </Field>
              <PhoneInput id="phone" label="Phone Number" value={form.phone} onChange={(v) => set('phone', v)} externalError={errors.phone} />
              <Field name="age" label="Age" required error={errors.age}>
                <input
                  id="age" type="text" inputMode="numeric" maxLength={3} placeholder="Enter your age" value={form.age}
                  onChange={(e) => set('age', e.target.value.replace(/\D/g, '').slice(0, 3))}
                />
              </Field>
              <Field name="gender" label="Gender" required error={errors.gender}>
                <select id="gender" value={form.gender} onChange={(e) => set('gender', e.target.value)}>
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </Field>
            </div>

            <Field name="serviceName" label="Service Required">
              <select id="serviceName" value={form.serviceName} onChange={(e) => set('serviceName', e.target.value)}>
                <option value="">Select a service</option>
                {options.map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>

            <Field name="message" label="Message">
              <textarea id="message" rows={3} maxLength={2000} placeholder="Tell us briefly about your requirements (optional)" value={form.message} onChange={(e) => set('message', e.target.value)} />
            </Field>

            {result && <p className={`cf-result ${result.ok ? 'ok' : 'bad'}`} role="status">{result.message}</p>}

            <button className="btn btn-primary cf-submit" disabled={busy}>{busy ? 'Sending...' : data.submitLabel}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
