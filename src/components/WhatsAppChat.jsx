import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { X, PaperPlaneTilt } from '@phosphor-icons/react';
import { SITE } from '../config';
import styles from './WhatsAppChat.module.css';

const INTERESTS = ['A website', 'Custom software', 'Automation', 'Not sure yet'];

function buildMessage({ interest, name, details }) {
  const lines = [
    interest && interest !== 'Not sure yet'
      ? `Hello ADVIO, I'm interested in ${interest.toLowerCase()}.`
      : 'Hello ADVIO, I would like to discuss a project.',
  ];
  if (details.trim()) lines.push('', details.trim());
  if (name.trim()) lines.push('', `- ${name.trim()}`);
  return lines.join('\n');
}

/** Floating WhatsApp enquiry: a button plus a small chat card. Hidden if no number is configured. */
export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState('');
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const rootRef = useRef(null);

  // Close on Escape or when clicking outside the card
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  if (!SITE.whatsapp) return null;

  const href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(buildMessage({ interest, name, details }))}`;

  return (
    <div ref={rootRef} className={styles.root}>
      <div
        id="wa-panel"
        className={`${styles.panel} ${open ? styles.open : ''}`}
        role="dialog"
        aria-label="Start a WhatsApp enquiry"
        aria-hidden={!open}
      >
        <div className={styles.head}>
          <span className={styles.avatar}><FaWhatsapp aria-hidden="true" /></span>
          <div className={styles.headText}>
            <strong>Chat with ADVIO</strong>
            <span>on WhatsApp</span>
          </div>
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close chat" tabIndex={open ? 0 : -1}>
            <X weight="bold" aria-hidden="true" />
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.hello}>Hi! What would you like to build? Pick one and send us a message.</p>

          <div className={styles.chips} role="group" aria-label="What do you need?">
            {INTERESTS.map((i) => (
              <button
                key={i}
                type="button"
                className={`${styles.chip} ${interest === i ? styles.chipOn : ''}`}
                aria-pressed={interest === i}
                onClick={() => setInterest(interest === i ? '' : i)}
                tabIndex={open ? 0 : -1}
              >
                {i}
              </button>
            ))}
          </div>

          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            autoComplete="name"
            tabIndex={open ? 0 : -1}
          />
          <textarea
            className={styles.input}
            rows="3"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Tell us a little about your project (optional)"
            tabIndex={open ? 0 : -1}
          />

          <a
            className={styles.send}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            <PaperPlaneTilt weight="fill" aria-hidden="true" /> Start chat on WhatsApp
          </a>
          <p className={styles.note}>Opens WhatsApp with your message ready to send.</p>
        </div>
      </div>

      <button
        type="button"
        className={styles.fab}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="wa-panel"
        aria-label={open ? 'Close WhatsApp chat' : 'Enquire on WhatsApp'}
      >
        <span className={styles.pulse} aria-hidden="true" />
        {open ? <X weight="bold" aria-hidden="true" /> : <FaWhatsapp aria-hidden="true" />}
      </button>
    </div>
  );
}
