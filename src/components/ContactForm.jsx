import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, CheckCircle, WarningCircle, ShieldCheck } from '@phosphor-icons/react';
import { SITE } from '../config';
import styles from './ContactForm.module.css';

const SERVICES = [
  'Website Development',
  'Custom Software / Web Application',
  'Business Automation',
  'Other',
];
const FROM_PARAM = {
  website: SERVICES[0],
  software: SERVICES[1],
  automation: SERVICES[2],
};
const BUDGETS = ['Under ₹25,000', '₹25,000 – ₹60,000', '₹60,000 – ₹1,50,000', '₹1,50,000+', 'Not sure yet'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (!v.service) e.service = 'Please choose the service you need.';
  if (v.message.trim().length < 10) e.message = 'Please describe your project in a few words (at least 10 characters).';
  return e;
}

function summary(v) {
  return [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Company: ${v.company || 'Not specified'}`,
    `Service: ${v.service}`,
    `Budget: ${v.budget || 'Not specified'}`,
    '',
    v.message,
  ].join('\n');
}

/** Delivers the enquiry. Returns { ok, note } or throws. Uses whatever is configured in src/config.js. */
async function deliver(v) {
  if (SITE.formEndpoint) {
    const res = await fetch(SITE.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: v.name,
        email: v.email,
        company: v.company,
        service: v.service,
        budget: v.budget,
        message: v.message,
        _subject: `New ADVIO enquiry — ${v.service}`,
      }),
    });
    if (!res.ok) throw new Error('send-failed');
    return { note: 'Your enquiry has been sent.' };
  }
  if (SITE.whatsapp) {
    const text = `Hello ADVIO, I would like to discuss a project.\n\n${summary(v)}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    return { note: 'WhatsApp has opened with your enquiry. Please press send there to complete it.' };
  }
  if (SITE.email) {
    window.location.href =
      `mailto:${SITE.email}?subject=${encodeURIComponent('Project enquiry — ' + v.service)}&body=${encodeURIComponent(summary(v))}`;
    return { note: 'Your email app should have opened with your enquiry. Please send it to complete the process.' };
  }
  throw new Error('not-configured');
}

export default function ContactForm() {
  const [params] = useSearchParams();
  const [values, setValues] = useState({
    name: '', email: '', company: '',
    service: FROM_PARAM[params.get('service')] || '',
    budget: '', message: '', website: '', // `website` is a honeypot
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [feedback, setFeedback] = useState('');

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    if (values.website) { setStatus('success'); setFeedback('Thank you.'); return; } // bot trap
    setStatus('sending');
    try {
      const { note } = await deliver(values);
      setFeedback(note);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setFeedback(
        err.message === 'not-configured'
          ? 'This form is not connected to an inbox yet, so your enquiry was not sent.'
          : 'Something went wrong while sending your enquiry. Please try again in a moment.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className={`${styles.card} ${styles.result}`} role="status">
        <CheckCircle weight="fill" aria-hidden="true" />
        <h3>Thank you.</h3>
        <p>{feedback}</p>
        <button
          type="button"
          className="btn outline sm"
          onClick={() => {
            setStatus('idle');
            setValues((v) => ({ ...v, name: '', email: '', company: '', budget: '', message: '' }));
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const field = (id, label, input, optional) => (
    <div className={styles.field}>
      <label htmlFor={`f-${id}`}>
        {label}
        {optional ? <em> (optional)</em> : <b className={styles.req} aria-hidden="true"> *</b>}
      </label>
      {input}
      {errors[id] && <p id={`e-${id}`} className={styles.err}>{errors[id]}</p>}
    </div>
  );
  const aria = (id) => ({ 'aria-invalid': errors[id] ? 'true' : undefined, 'aria-describedby': errors[id] ? `e-${id}` : undefined });

  return (
    <div className={styles.card}>
    <h2 className={styles.cardTitle}>Tell us about your project</h2>
    <p className={styles.cardSub}>Share a few details about your requirements and we’ll get back to you.</p>
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {/* honeypot: hidden from people */}
      <div className={styles.hp} aria-hidden="true">
        <label>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} /></label>
      </div>

      <div className={styles.two}>
        {field('name', 'Full name', <input id="f-name" name="name" placeholder="Enter your full name" autoComplete="name" value={values.name} onChange={set('name')} required {...aria('name')} />)}
        {field('email', 'Email address', <input id="f-email" name="email" type="email" placeholder="Enter your email address" autoComplete="email" value={values.email} onChange={set('email')} required {...aria('email')} />)}
      </div>

      <div className={styles.two}>
        {field('company', 'Company or business name', <input id="f-company" name="company" placeholder="e.g. Your Company Pvt. Ltd." autoComplete="organization" value={values.company} onChange={set('company')} />, true)}
        {field('service', 'Service required',
          <select id="f-service" name="service" value={values.service} onChange={set('service')} required {...aria('service')}>
            <option value="">Choose a service</option>
            {SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
        )}
      </div>

      {field('budget', 'Estimated budget',
        <select id="f-budget" name="budget" value={values.budget} onChange={set('budget')}>
          <option value="">Select a range</option>
          {BUDGETS.map((b) => <option key={b}>{b}</option>)}
        </select>, true)}

      {field('message', 'Project overview',
        <textarea id="f-message" name="message" rows="5" placeholder="Tell us about your project, goals, and any key requirements…" value={values.message} onChange={set('message')} required {...aria('message')} />)}

      {status === 'error' && (
        <div className={styles.error} role="alert">
          <WarningCircle weight="fill" aria-hidden="true" />
          <div>
            <p>{feedback}</p>
            {SITE.instagram && (
              <p>You can also message us on{' '}
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>.
              </p>
            )}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}{' '}
          <ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
        </button>
        <span className={styles.vr} aria-hidden="true" />
        <p className={styles.privacy}>
          <ShieldCheck weight="regular" aria-hidden="true" />
          <span>Your information is used only to respond to your enquiry.</span>
        </p>
      </div>
    </form>
    </div>
  );
}
