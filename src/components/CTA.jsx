import { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react';
import { Scramble, SplitText } from './fx';
import styles from './CTA.module.css';

export default function CTA() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.rv');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    els?.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.wrap} ref={ref}>
      <div className="wrap">
        <div className={`${styles.card} rv`}>
          {/* Decorative orbs */}
          <div className={styles.orb1} aria-hidden="true" />
          <div className={styles.orb2} aria-hidden="true" />

          <div className={styles.content}>
            <p className={styles.eyebrow}>Ready to build?</p>
            <SplitText as="h2" className={styles.headline}>Have a web or software<br />project in mind?</SplitText>
            <SplitText as="p" mode="stagger" className={styles.sub}>
              Tell me about your product vision. I’ll map out the technical architecture, provide a written milestone roadmap, and deliver a guaranteed fixed quote within 24 hours.
            </SplitText>
            <div className={styles.actions}>
              <a href="#contact" className={`btn ${styles.btnWhite}`}>
                <Scramble>Start your project</Scramble>{' '}<ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
              </a>
              <a href="#pricing" className={styles.link}>
                View pricing packages{' '}<ArrowRight weight="bold" className="ico" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
