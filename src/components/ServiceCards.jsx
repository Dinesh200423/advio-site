import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { SERVICES } from '../data/services';
import websiteImg from '../assets/services/website.webp';
import softwareImg from '../assets/services/software.webp';
import automationImg from '../assets/services/automation.webp';
import styles from './Sections.module.css';

// One preview per service card, in the same order as SERVICES.
const PREVIEWS = {
  web: {
    src: websiteImg,
    alt: 'Concept website for a furniture brand, shown in a browser window.',
  },
  software: {
    src: softwareImg,
    alt: 'Concept CRM dashboard showing new leads, bookings and a leads chart.',
  },
  automation: {
    src: automationImg,
    alt: 'Concept automation workflow connecting new leads, a WhatsApp welcome message and CRM updates.',
  },
};

export default function ServiceCards() {
  return (
    <div className={styles.serviceGrid}>
      {SERVICES.map((s) => {
        const img = PREVIEWS[s.visual];
        return (
          <Link key={s.id} to={`/services#${s.id}`} className={`${styles.serviceCard} rv`}>
            <div className={styles.serviceVisual}>
              <img
                src={img.src}
                alt={img.alt}
                width="1200"
                height="689"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={styles.serviceMeta}>
              <span className={styles.serviceNo}>{s.no}</span>
              <span className={styles.previewTag}>Concept preview</span>
            </div>
            <h3>{s.title}</h3>
            <p>{s.overview}</p>
            <span className={styles.serviceLink}>
              Learn more <ArrowRight weight="bold" className="ico" aria-hidden="true" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
