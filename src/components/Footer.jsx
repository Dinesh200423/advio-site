import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, MapPin, EnvelopeSimple } from '@phosphor-icons/react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { SITE } from '../config';
import styles from './Footer.module.css';

const SERVICES = [
  ['/services#websites', 'Websites & Landing Pages'],
  ['/services#software', 'Custom Software & Web Apps'],
  ['/services#automation', 'Business Automation'],
];
const EXPLORE = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/work', 'Work'],
  ['/contact', 'Contact'],
];

const YEAR = new Date().getFullYear();
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function Footer() {
  const wa = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}` : '';

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.panel}>
          <div className={styles.top}>
            <p className={styles.tag}>
              Founder-led web &amp;<br />software studio.
            </p>
            <Link to="/contact" className={styles.contactBtn}>
              Contact <ArrowUpRight weight="bold" aria-hidden="true" />
            </Link>
          </div>

          <hr className={styles.rule} />

          <div className={styles.cols}>
            <nav aria-label="Services">
              <h4>Services</h4>
              {SERVICES.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
            </nav>

            <nav aria-label="Explore">
              <h4>Explore</h4>
              {EXPLORE.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
            </nav>

            <div className={styles.hello}>
              <h4>Say hello!</h4>
              <div className={styles.chips}>
                {SITE.email && (
                  <a href={`mailto:${SITE.email}`} className={styles.chip}>
                    <EnvelopeSimple weight="bold" aria-hidden="true" /> {SITE.email}
                  </a>
                )}
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={styles.chip}>
                    <FaWhatsapp aria-hidden="true" /> WhatsApp
                  </a>
                )}
                {SITE.instagram && (
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={styles.chip}>
                    <FaInstagram aria-hidden="true" /> @{SITE.instagramHandle}
                  </a>
                )}
                <span className={styles.chip}>
                  <MapPin weight="bold" aria-hidden="true" /> {SITE.location}
                </span>
              </div>
            </div>

            <div className={styles.topCol}>
              <h4>Back to top</h4>
              <button type="button" className={styles.topBtn} onClick={toTop} aria-label="Back to top">
                <ArrowUp weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className={styles.legal}>
            <span>© {YEAR} ADVIO. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
