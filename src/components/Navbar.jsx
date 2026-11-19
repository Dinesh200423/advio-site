import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Scramble } from './fx';
import styles from './Navbar.module.css';

const LINKS = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/work', 'Work'],
  ['/contact', 'Contact'],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  // Over the Home landing the bar is transparent; everywhere else it is solid.
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const linkClass = ({ isActive }) => (isActive ? styles.active : undefined);

  return (
    <header className={[styles.nav, solid ? styles.scrolled : styles.transparent].join(' ')}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logoWrap} aria-label="ADVIO home">
          <span className={styles.logo}>ADVIO</span>
        </Link>

        <nav className={styles.links} aria-label="Main navigation">
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkClass}>{label}</NavLink>
          ))}
        </nav>

        <div className={styles.rightActions}>
          <Link
            to="/contact"
            className={`btn sm ${solid ? styles.ctaScrolled : styles.ctaTransparent}`}
          >
            <Scramble>Get in touch</Scramble>{' '}
            <ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
          </Link>
        </div>

        <button
          className={`${styles.hamburger} ${!solid ? styles.hamburgerWhite : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={menuOpen ? styles.bar1Open : styles.bar1} />
          <span className={menuOpen ? styles.bar2Open : styles.bar2} />
          <span className={menuOpen ? styles.bar3Open : styles.bar3} />
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className={styles.mobileMenu} aria-label="Mobile navigation">
          {LINKS.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkClass}>{label}</NavLink>
          ))}
          <Link to="/contact" className={`btn ${styles.mobileBtn}`}>
            Get in touch <ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
}
