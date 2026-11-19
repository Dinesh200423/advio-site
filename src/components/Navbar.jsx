import { useState, useEffect } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Scramble } from './fx';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={[
        styles.nav,
        scrolled ? styles.scrolled : styles.transparent,
      ].join(' ')}
    >
      <div className={styles.inner}>

        {/* Top-left text wordmark */}
        <a href="#top" className={styles.logoWrap} aria-label="ADVIO home">
          <span className={styles.logo}>ADVIO</span>
        </a>

        {/* Center Nav Links (Services, Work, Process, Pricing, Contact) */}
        <nav className={styles.links} aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Top-right CTA button */}
        <div className={styles.rightActions}>
          <a
            href="#contact"
            className={`btn sm ${scrolled ? styles.ctaScrolled : styles.ctaTransparent}`}
          >
            <Scramble>Get in touch</Scramble>{' '}<ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={`${styles.hamburger} ${!scrolled ? styles.hamburgerWhite : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={menuOpen ? styles.bar1Open : styles.bar1} />
          <span className={menuOpen ? styles.bar2Open : styles.bar2} />
          <span className={menuOpen ? styles.bar3Open : styles.bar3} />
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav id="mobile-menu" className={styles.mobileMenu} aria-label="Mobile navigation">
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#process" onClick={closeMenu}>Process</a>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a href="#contact" onClick={closeMenu} className={`btn ${styles.mobileBtn}`}>
            Get in touch{' '}<ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}
