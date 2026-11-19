import { useEffect, useRef } from 'react';
import { SplitText } from './fx';
import styles from './Process.module.css';

const steps = [
  {
    n: '01',
    title: 'Discovery & Scope',
    timing: 'Day 1–2',
    desc: 'We discuss your project goals, audience, and features. I provide a written scope document, exact deliverables list, fixed quote, and guaranteed launch date.',
    items: ['1:1 discovery call', 'Feature specification doc', 'Guaranteed fixed quote', '50% kick-off milestone'],
  },
  {
    n: '02',
    title: 'Design & Prototyping',
    timing: 'Day 3–6',
    desc: 'You review high-fidelity Figma mockups and interactive wireframes before any code is written, ensuring the design matches your exact brand vision.',
    items: ['Custom Figma UI/UX designs', 'Mobile-first responsive flows', 'Brand typography & palette', 'Client review & approval'],
  },
  {
    n: '03',
    title: 'Full-Stack Development',
    timing: 'Week 2–3',
    desc: 'I engineer your product using modern tech (React, Next.js, Node, Supabase). You get private staging links to test real progress in real time.',
    items: ['Clean, modular source code', 'Database & API integrations', 'Live staging preview links', 'Direct WhatsApp updates'],
  },
  {
    n: '04',
    title: 'Testing, SEO & Launch',
    timing: 'Final Week',
    desc: 'Rigorous cross-browser QA, mobile testing, 95+ speed optimization, on-page SEO schema, DNS domain mapping, and zero-downtime deployment.',
    items: ['Cross-device responsiveness', 'Lighthouse 95+ speed audit', 'DNS & custom domain setup', 'Production deployment'],
  },
  {
    n: '05',
    title: 'Handover & 30-Day Support',
    timing: 'Post-Launch',
    desc: 'You receive 100% of the GitHub repositories, CMS admin credentials, a personalized Loom video tutorial, and 30 days of complimentary bug-fix warranty.',
    items: ['100% GitHub repo ownership', 'Video walkthrough training', '30-day bug warranty included', 'Optional monthly retainer'],
  },
];

export default function Process() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.rv');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els?.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="sec" id="process" ref={ref}>
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <p className="eyebrow" style={{ marginBottom: 16 }}>The Development Workflow</p>
            <SplitText as="h2">A Proven, Friction-Free<br />Freelance Process.</SplitText>
          </div>
          <SplitText as="p" mode="stagger">
            Every project follows a transparent 5-step roadmap. You always know what is being built,
            when milestones are delivered, and what comes next.
          </SplitText>
        </div>

        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={s.n} className={`${styles.step} rv`} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className={styles.stepHeader}>
                <span className={styles.num}>{s.n}</span>
                <span className={styles.timingPill}>{s.timing}</span>
              </div>

              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>

              <ul className={styles.stepItems}>
                {s.items.map((item, j) => (
                  <li key={j}>
                    <span className={styles.itemDot} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
