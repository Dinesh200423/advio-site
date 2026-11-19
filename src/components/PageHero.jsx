import { useState } from 'react';
import { SplitText } from './fx';
import styles from './Sections.module.css';

/** Lime marker highlight. Place inside a <PageHero> title. */
export function Mark({ d = 0.4, children }) {
  return <mark className={styles.mark} style={{ '--d': `${d}s` }}>{children}</mark>;
}

export default function PageHero({ eyebrow, title, text }) {
  const [on, setOn] = useState(false);
  return (
    <section className={styles.pageHero}>
      <div className="wrap">
        {eyebrow && <p className="eyebrow" style={{ marginBottom: 22 }}>{eyebrow}</p>}
        <SplitText
          as="h1"
          className={`${styles.pageTitle} ${on ? styles.markOn : ''}`}
          onIn={() => setOn(true)}
        >
          {title}
        </SplitText>
        {text && (
          <SplitText as="p" mode="stagger" className={styles.pageLede} delay={0.3}>
            {text}
          </SplitText>
        )}
      </div>
    </section>
  );
}
