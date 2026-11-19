import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { Scramble, SplitText, useReveal } from './fx';
import styles from './CTA.module.css';

export default function CTA({
  heading = 'Have something in mind?',
  text = 'Let’s discuss what you want to build and find the right way to make it happen.',
  button = 'Start Your Project',
  to = '/contact',
}) {
  const ref = useReveal();
  return (
    <section className={styles.wrap} ref={ref}>
      <div className="wrap">
        <div className={`${styles.card} rv`}>
          <div className={styles.orb1} aria-hidden="true" />
          <div className={styles.orb2} aria-hidden="true" />
          <div className={styles.content}>
            <SplitText as="h2" className={styles.headline}>{heading}</SplitText>
            <SplitText as="p" mode="stagger" className={styles.sub}>{text}</SplitText>
            <div className={styles.actions}>
              <Link to={to} className={`btn ${styles.btnWhite}`}>
                <Scramble>{button}</Scramble>{' '}
                <ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
