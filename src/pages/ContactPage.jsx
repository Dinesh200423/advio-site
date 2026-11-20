import { useState } from 'react';
import { InstagramLogo, MapPin, EnvelopeSimple, Lightning } from '@phosphor-icons/react';
import { FaWhatsapp } from 'react-icons/fa6';
import ContactForm from '../components/ContactForm';
import { SplitText, useReveal } from '../components/fx';
import { SITE } from '../config';
import hero from '../components/Sections.module.css';
import styles from './Contact.module.css';

function Row({ icon, label, children, accent }) {
  return (
    <li className={`${styles.row} rv`}>
      <span className={`${styles.icon} ${accent ? styles.iconAccent : ''}`}>{icon}</span>
      <span className={styles.divider} aria-hidden="true" />
      <span className={styles.rowText}>
        {label && <small>{label}</small>}
        <strong>{children}</strong>
      </span>
    </li>
  );
}

export default function ContactPage() {
  const ref = useReveal();
  const [on, setOn] = useState(false);
  const wa = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}` : '';

  return (
    <div ref={ref} className={styles.page}>
      <span className={styles.curve} aria-hidden="true" />

      <section className={styles.section}>
        <div className="wrap">
          <div className={styles.grid}>
            <div className={styles.left}>
              <p className={styles.eyebrow}>Contact</p>

              <SplitText
                as="h1"
                className={`${styles.title} ${on ? hero.markOn : ''}`}
                onIn={() => setOn(true)}
              >
                Let’s build something that moves your{' '}
                <mark className={hero.mark} style={{ '--d': '0.5s' }}>business forward.</mark>
              </SplitText>

              <SplitText as="p" mode="stagger" className={styles.lede} delay={0.3}>
                Have an idea, a business challenge or a project in mind? Tell us what you want to
                build. We’ll review your requirements and get back to you.
              </SplitText>

              <ul className={styles.rows}>
                {SITE.instagram && (
                  <Row icon={<InstagramLogo weight="bold" aria-hidden="true" />} label="Instagram">
                    <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">@{SITE.instagramHandle}</a>
                  </Row>
                )}
                {wa && (
                  <Row icon={<FaWhatsapp aria-hidden="true" />} label="WhatsApp">
                    <a href={wa} target="_blank" rel="noopener noreferrer">{SITE.whatsappDisplay || `+${SITE.whatsapp}`}</a>
                  </Row>
                )}
                {SITE.email && (
                  <Row icon={<EnvelopeSimple weight="bold" aria-hidden="true" />} label="Email">
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </Row>
                )}
                <Row icon={<MapPin weight="bold" aria-hidden="true" />} label="Based in">{SITE.location}</Row>
                {SITE.replyNote && (
                  <Row icon={<Lightning weight="bold" aria-hidden="true" />} accent>{SITE.replyNote}</Row>
                )}
              </ul>
            </div>

            <div className={`${styles.right} rv`}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
