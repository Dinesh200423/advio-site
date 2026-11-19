import { useEffect, useRef, useState } from 'react';
import { Scramble, SplitText, CountUp } from './fx';
import { ArrowUpRight, ArrowDown, Lightning, Handshake, Package, LockKey } from '@phosphor-icons/react';
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

          <h1 className={styles.heading}>
            <span className={styles.srOnly}>ADVIO — Digital experiences &amp; creative studio</span>
            <span className={styles.wordmark} aria-hidden="true">
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
            <span className={`${styles.tagline} ${styles.fadeLate}`} aria-hidden="true">
              Digital experiences &amp; creative studio
            </span>
          </h1>
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
