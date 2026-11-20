import { useState } from 'react';
import { UsersThree, Target, Code, Stack } from '@phosphor-icons/react';
import { SplitText, useInView } from './fx';
import hero from './Sections.module.css';
import styles from './WhyAdvio.module.css';

const POINTS = [
  { Icon: UsersThree, title: 'Direct Communication', text: 'Work directly with the developer building your project.' },
  { Icon: Target, title: 'Clear Scope', text: 'Know what is included before development begins.' },
  { Icon: Code, title: 'Practical Engineering', text: 'Build solutions around real business requirements.' },
  { Icon: Stack, title: 'Clean Handover', text: 'Receive the agreed project deliverables and access.' },
];

const DEFAULT_ACTIVE = 1;

export default function WhyAdvio() {
  // Reveal is React state (not a class added from outside), so hover re-renders can't undo it.
  const [ref, seen] = useInView(0.12);
  const reveal = seen ? 'in' : '';
  const [on, setOn] = useState(false);
  const [active, setActive] = useState(DEFAULT_ACTIVE);

  return (
    <section className={styles.section} ref={ref}>
      <span className={styles.glow} aria-hidden="true" />
      <span className={styles.dots} aria-hidden="true" />
      <span className={styles.curve} aria-hidden="true" />

      <div className="wrap">
        <p className={styles.eyebrow}>Why ADVIO</p>

        <div className={styles.head}>
          <SplitText
            as="h2"
            className={`${styles.title} ${on ? hero.markOn : ''}`}
            onIn={() => setOn(true)}
          >
            A more direct, simpler way to{' '}
            <mark className={hero.mark} style={{ '--d': '0.6s' }}>build.</mark>
          </SplitText>

          <p className={`${styles.lede} rv ${reveal}`}>
            A focused, founder-led approach to building websites, software and automations for real
            business needs.
          </p>
        </div>

        <div className={styles.grid} onMouseLeave={() => setActive(DEFAULT_ACTIVE)}>
          {POINTS.map(({ Icon, title, text }, i) => (
            <article
              key={title}
              className={`${styles.card} ${active === i ? styles.dark : ''} rv ${reveal}`}
              style={{ transitionDelay: `${i * 0.07}s` }}
              onMouseEnter={() => setActive(i)}
            >
              <span className={styles.icon}>
                <Icon weight="regular" aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
