import { ArrowUpRight } from '@phosphor-icons/react';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>ADVIO</div>
            <p>Freelance Web &amp; Software Development Studio.<br />Chennai, India.</p>
            <a
              href="https://instagram.com/_advio_"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instaLink}
            >
              @_advio_
            </a>
          </div>

          <div>
            <h4 className={styles.colHead}>Services</h4>
            <nav>
              <a href="#pricing">Websites</a>
              <a href="#pricing">E-commerce</a>
              <a href="#pricing">CRM &amp; Automation</a>
              <a href="#pricing">Applications</a>
            </nav>
          </div>

          <div>
            <h4 className={styles.colHead}>Studio</h4>
            <nav>
              <a href="#work">Work</a>
              <a href="#process">Process</a>
              <a href="#pricing">Pricing</a>
            </nav>
          </div>

          <div>
            <h4 className={styles.colHead}>Connect</h4>
            <nav>
              <a href="#contact">Contact</a>
              <a href="https://wa.me/?text=Hello%20ADVIO" target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight weight="bold" className="ico" aria-hidden="true" /></a>
              <a href="https://instagram.com/_advio_" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight weight="bold" className="ico" aria-hidden="true" /></a>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {year} ADVIO. All rights reserved.</span>
          <span>Built with intention.</span>
        </div>
      </div>
    </footer>
  );
}
