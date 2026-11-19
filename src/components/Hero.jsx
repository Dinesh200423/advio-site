import { useEffect, useRef, useState } from 'react';
import { Scramble, SplitText, CountUp } from './fx';
import { ArrowUpRight, ArrowDown, Lightning, Handshake, Package, LockKey, Browser, ShoppingBag, GearSix, DeviceMobile, Tag } from '@phosphor-icons/react';
import styles from './Hero.module.css';

const TECH_STACK = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Tailwind CSS',
  'Supabase',
  'Python',
  'REST & GraphQL',
  'Docker',
  'AWS',
  'Razorpay / Stripe',
];

const LETTERS = ['A', 'D', 'V', 'I', 'O'];

// Services that orbit around the ADVIO wordmark
const FLOATERS = [
  { Icon: Browser,      title: 'Websites',          sub: 'Fast, SEO-ready sites' },
  { Icon: ShoppingBag,  title: 'E-commerce',        sub: 'Stores that sell', accent: true },
  { Icon: GearSix,      title: 'CRM & Automation',  sub: 'Leads on autopilot' },
  { Icon: DeviceMobile, title: 'Web & Mobile Apps', sub: 'MVPs, shipped' },
  { Icon: Tag,          title: 'Fixed pricing',     sub: 'From ₹12,000', hideSm: true },
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
      const ry = Math.max(60, wm.offsetHeight * 0.72);
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
      {/* ── 1. Full-Screen Deep Blue Landing: blur-in ADVIO wordmark ── */}
      <section ref={landRef} className={`${styles.fullLanding} ${styles.glass}`} id="top" aria-label="ADVIO — Digital Experiences & Creative Studio">
        <div className={styles.ambientGlow} />

        <div className={styles.stage}>
          <div className={`${styles.metaRow} ${styles.fadeLate}`}>
            <p className={styles.metaList}>
              websites / software / automation
            </p>
            <p className={styles.metaRight}>Chennai, India</p>
          </div>

          <div className={styles.heading}>
            <h1 className={styles.srOnly}>ADVIO — Digital experiences &amp; creative studio</h1>
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
              {FLOATERS.map(({ Icon, title, sub, accent, hideSm }) => (
                <a
                  key={title}
                  href="#services"
                  className={`${styles.floater} ${hideSm ? styles.hideSm : ''}`}
                >
                  <span className={`${styles.floaterIcon} ${accent ? styles.floaterAccent : ''}`}>
                    <Icon weight="bold" aria-hidden="true" />
                  </span>
                  <span className={styles.floaterText}>
                    <strong>{title}</strong>
                    <small>{sub}</small>
                  </span>
                </a>
              ))}
            </div>
            <span className={`${styles.tagline} ${styles.fadeLate}`} aria-hidden="true">
              Digital experiences &amp; creative studio
            </span>
          </div>
        </div>

        {/* Scroll indicator prompt */}
        <button
          type="button"
          className={styles.scrollPrompt}
          onClick={scrollToContent}
          aria-label="Scroll to overview section"
        >
          <span className={styles.promptDot} />
          <span>Explore Developer Studio</span>
          <ArrowDown weight="bold" className={styles.arrowIcon} aria-hidden="true" />
        </button>
      </section>

      {/* ── 2. Signature Overview Section (Freelance Web & Software Studio) ── */}
      <section className={styles.overviewSection} id="overview">
        <div className="wrap">

          {/* Freelance Studio Pill Badge */}
          <div className={styles.eyebrowWrap}>
            <span className={styles.eyebrow}>
              <span className={styles.statusDot} />
              <span className={styles.badgeText}>Freelance Web &amp; Software Studio · Chennai</span>
              <span className={styles.availability}>• Open for New Projects</span>
            </span>
          </div>

          <div className={styles.mainRow}>
            {/* Primary Headline with Brand Serif & Signature Curved Arc */}
            <div className={styles.titleCol}>
              <SplitText
                as="h2"
                className={`${styles.headline} ${markOn ? styles.markOn : ''}`}
                onIn={() => setMarkOn(true)}
              >
                We build{' '}
                <mark className={styles.mark} style={{ '--d': '0.5s' }}>websites</mark>,{' '}
                <mark className={styles.mark} style={{ '--d': '1s' }}>software</mark>{' '}
                &amp; systems that{' '}
                <mark className={styles.mark} style={{ '--d': '1.5s' }}>grow</mark>{' '}
                your business.
              </SplitText>
            </div>

            {/* Description & Action Buttons */}
            <div className={styles.descCol}>
              <SplitText as="p" mode="stagger" className={styles.lede}>
                One developer, one clear plan, one fixed price. I design, build and launch your{' '}
                <strong>website</strong>, <strong>web app</strong> or <strong>automation</strong>.
                You talk to the person writing the code, not an account manager, and you own
                everything we ship.
              </SplitText>

              <div className={styles.ctaRow}>
                <a href="#contact" className="btn">
                  <Scramble>Start your project</Scramble>{' '}<ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
                </a>
                <a href="#work" className="btn outline">
                  View recent work
                </a>
                <a href="#pricing" className={styles.linkText}>
                  Explore fixed pricing
                </a>
              </div>

              {/* Freelance Value Pillars */}
              <div className={styles.pillarTags}>
                <span className={styles.pillar}><Lightning weight="bold" className="ico" aria-hidden="true" /> 1-3 Week Delivery</span>
                <span className={styles.pillar}><Handshake weight="bold" className="ico" aria-hidden="true" /> Direct 1:1 Engineering</span>
                <span className={styles.pillar}><Package weight="bold" className="ico" aria-hidden="true" /> 100% Code Ownership</span>
                <span className={styles.pillar}><LockKey weight="bold" className="ico" aria-hidden="true" /> Fixed-Price Milestone Scope</span>
              </div>
            </div>
          </div>

          {/* ── Modern Tech Stack Ribbon ── */}
          <div className={styles.techRibbon}>
            <span className={styles.techRibbonTitle}>Core Tech Stack:</span>
            <div className={styles.techTags}>
              {TECH_STACK.map((tech) => (
                <span key={tech} className={styles.techPill}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ── Enhanced Interactive Stats Strip ── */}
          <div className={styles.statsStrip}>
            {[
              {
                num: '50+',
                label: 'Products Delivered',
                sub: 'Websites, SaaS dashboards & custom apps shipped',
              },
              {
                num: '100%',
                label: 'Direct Collaboration',
                sub: 'Talk directly to the developer, zero middlemen',
              },
              {
                num: '99+',
                label: 'Performance Score',
                sub: 'SEO-tuned, ultra-fast Lighthouse metrics',
              },
              {
                num: '5/5',
                label: 'Client Satisfaction',
                sub: 'Proven track record of on-time delivery',
              },
            ].map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <div className={styles.statTop}>
                  <span className={styles.statNum}><CountUp value={stat.num} /></span>
                  <span className={styles.statGlow} />
                </div>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statSub}>{stat.sub}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
