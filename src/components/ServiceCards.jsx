import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import { SERVICES } from '../data/services';
import styles from './Sections.module.css';

function Visual({ kind }) {
  if (kind === 'web') {
    return (
      <div className={styles.vWeb}>
        <div className={styles.vBar}><i /><i /><i /></div>
        <div className={styles.vHeading} />
        <div className={styles.vLine} />
        <div className={styles.vLineShort} />
        <div className={styles.vBtn} />
      </div>
    );
  }
  if (kind === 'software') {
    return (
      <div className={styles.vApp}>
        <div className={styles.vSide}><i /><i /><i /></div>
        <div className={styles.vMain}>
          <div className={styles.vKpis}><i /><i /></div>
          <div className={styles.vChart}>
            {[40, 62, 48, 80, 66, 92].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.vFlow}>
      <i className={styles.vNode} />
      <b />
      <i className={`${styles.vNode} ${styles.vNodeOn}`} />
      <b />
      <i className={styles.vNode} />
    </div>
  );
}

export default function ServiceCards() {
  return (
    <div className={styles.serviceGrid}>
      {SERVICES.map((s) => (
        <Link key={s.id} to={`/services#${s.id}`} className={`${styles.serviceCard} rv`}>
          <div className={styles.serviceVisual}><Visual kind={s.visual} /></div>
          <span className={styles.serviceNo}>{s.no}</span>
          <h3>{s.title}</h3>
          <p>{s.overview}</p>
          <span className={styles.serviceLink}>
            Learn more <ArrowRight weight="bold" className="ico" aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}
