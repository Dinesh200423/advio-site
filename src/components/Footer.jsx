import { Link } from 'react-router-dom';
import { SITE } from '../config';
import styles from './Footer.module.css';

const LINKS = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/work', 'Work'],
  ['/contact', 'Contact'],
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>ADVIO</div>
            <p>Founder-led web and software development studio.</p>
          </div>

          <nav className={styles.links} aria-label="Footer">
            {LINKS.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
          </nav>

          <div className={styles.meta}>
            {SITE.instagram && (
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            )}
            <span>{SITE.location}</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} ADVIO. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
