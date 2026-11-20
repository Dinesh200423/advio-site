import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Scramble, SplitText } from './fx';
import { ArrowUpRight, ArrowDown, Browser, ShoppingBag, GearSix, DeviceMobile, Lightning } from '@phosphor-icons/react';
import styles from './Hero.module.css';

const LETTERS = ['A', 'D', 'V', 'I', 'O'];

// Services that orbit around the ADVIO wordmark
const FLOATERS = [
  { Icon: Browser,      title: 'Websites',         sub: 'Fast, responsive sites', to: '/services#websites' },
  { Icon: ShoppingBag,  title: 'E-commerce',       sub: 'Online stores',          to: '/services#websites' },
  { Icon: GearSix,      title: 'CRM & Dashboards', sub: 'Track leads and work',   to: '/services#software' },
  { Icon: DeviceMobile, title: 'Web Applications', sub: 'Portals & SaaS MVPs',    to: '/services#software' },
  { Icon: Lightning,    title: 'Automation',       sub: 'Workflows & WhatsApp',   to: '/services#automation' },
];

export default function Hero() {
  const landRef = useRef(null);
  const [markOn, setMarkOn] = useState(false);

  // Curtain effect: the landing recedes while the next page slides over it
  useEffect(() => {
    const el = landRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      el.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const wmRef = useRef(null);
  const ringRef = useRef(null);

  // Orbit: cards travel round an ellipse; lower half passes in front of ADVIO, upper half behind it
  useEffect(() => {
    const ring = ringRef.current;
    const wm = wmRef.current;
    if (!ring || !wm) return;
    const cards = Array.from(ring.children);
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let angle = -Math.PI / 2 + 0.35;
    let speed = still ? 0 : 0.16; // radians per second
    let target = speed;
    let last = performance.now();
    const t0 = last;
    const onEnter = () => { target = 0; };
    const onLeave = () => { target = still ? 0 : 0.16; };
    ring.addEventListener('mouseover', onEnter);
    ring.addEventListener('mouseout', onLeave);

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      speed += (target - speed) * Math.min(1, dt * 4);
      angle += speed * dt;

      const W = ring.offsetWidth;
      const cx = wm.offsetLeft + wm.offsetWidth / 2;
      const cy = wm.offsetTop + wm.offsetHeight / 2 - 34;
      const vis = cards.filter((c) => c.offsetParent !== null);
      const n = vis.length || 1;
      const cw = vis[0] ? vis[0].offsetWidth : 200;
      const rx = Math.min(wm.offsetWidth * 0.6 + 40, W / 2 - cw / 2 - 6);
      const ry = Math.max(wm.offsetHeight * 0.72, W < 560 ? 150 : 60);
      const intro = Math.min(1, Math.max(0, (now - t0 - 1200) / 900));

      vis.forEach((c, i) => {
        const th = angle + (i * 2 * Math.PI) / n;
        const d = Math.sin(th);            // -1 back … +1 front
        const x = cx + rx * Math.cos(th);
        const y = cy + ry * d;
        const sc = 0.86 + 0.16 * ((d + 1) / 2);
        c.style.transform =
          `translate(${x - cw / 2}px, ${y - c.offsetHeight / 2}px) perspective(900px) rotateY(${(-Math.cos(th) * 18).toFixed(1)}deg) rotateZ(${(Math.cos(th) * 4).toFixed(1)}deg) scale(${sc.toFixed(3)})`;
        c.style.opacity = (intro * (0.5 + 0.5 * ((d + 1) / 2))).toFixed(3);
        c.style.zIndex = d > 0 ? 8 : 1;
        c.style.pointerEvents = intro > 0.6 ? 'auto' : 'none';
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ring.removeEventListener('mouseover', onEnter);
      ring.removeEventListener('mouseout', onLeave);
    };
  }, []);

  const scrollToContent = () => {
    document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── 1. Landing: transparent ADVIO wordmark with orbiting services ── */}
      <section ref={landRef} className={`${styles.fullLanding} ${styles.glass}`} id="top" aria-label="ADVIO — Founder-led web and software studio">
        <div className={styles.ambientGlow} />

        <div className={styles.stage}>
          <div className={`${styles.metaRow} ${styles.fadeLate}`}>
            <p className={styles.metaList}>
              websites / software / automation
            </p>
            <p className={styles.metaRight}>Chennai, India</p>
          </div>

          <div className={styles.heading}>
            <h1 className={styles.srOnly}>ADVIO — Founder-led web and software development studio</h1>
            <span ref={wmRef} className={styles.wordmark} aria-hidden="true">
              {LETTERS.map((ch, i) => (
                <span
                  key={ch}
                  className={styles.letter}
                  style={{ animationDelay: `${0.15 + i * 0.16}s` }}
                >
                  {ch}
                </span>
              ))}
            </span>
            <div ref={ringRef} className={styles.floaters}>
              {FLOATERS.map(({ Icon, title, sub, to, hideSm }) => (
                <Link
                  key={title}
                  to={to}
                  className={`${styles.floater} ${hideSm ? styles.hideSm : ''}`}
                >
                  <span className={styles.floaterIcon}>
                    <Icon weight="bold" aria-hidden="true" />
                  </span>
                  <span className={styles.floaterText}>
                    <strong>{title}</strong>
                    <small>{sub}</small>
                  </span>
                </Link>
              ))}
            </div>
            <span className={`${styles.tagline} ${styles.fadeLate}`} aria-hidden="true">
              Founder-led web &amp; software studio
            </span>
          </div>
        </div>

        <button
          type="button"
          className={styles.scrollPrompt}
          onClick={scrollToContent}
          aria-label="Scroll to the introduction"
        >
          <span className={styles.promptDot} />
          <span>Scroll to explore</span>
          <ArrowDown weight="bold" className={styles.arrowIcon} aria-hidden="true" />
        </button>
      </section>

      {/* ── 2. Hero message ── */}
      <section className={styles.overviewSection} id="overview">
        <div className="wrap">
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrow}>
              <span className={styles.statusDot} />
              <span className={styles.badgeText}>Founder-led web &amp; software studio · Chennai, India</span>
            </span>
          </div>

          <div className={styles.mainRow}>
            <div className={styles.titleCol}>
              <SplitText
                as="h2"
                className={`${styles.headline} ${markOn ? styles.markOn : ''}`}
                onIn={() => setMarkOn(true)}
              >
                We build{' '}
                <mark className={styles.mark} style={{ '--d': '0.5s' }}>websites</mark>,{' '}
                <mark className={styles.mark} style={{ '--d': '1s' }}>software</mark>{' '}
                &amp;{' '}
                <mark className={styles.mark} style={{ '--d': '1.5s' }}>automations</mark>{' '}
                that move your business forward.
              </SplitText>
            </div>

            <div className={styles.descCol}>
              <SplitText as="p" mode="stagger" className={styles.lede}>
                ADVIO designs and develops business websites, custom web applications and practical
                automations. From the first conversation to deployment, you work directly with the
                developer building your solution.
              </SplitText>

              <div className={styles.ctaRow}>
                <Link to="/contact" className="btn">
                  <Scramble>Start a Project</Scramble>{' '}
                  <ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
                </Link>
                <Link to="/work" className="btn outline">
                  Explore Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
