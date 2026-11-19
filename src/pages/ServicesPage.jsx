import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from '@phosphor-icons/react';
import PageHero, { Mark } from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import ProcessSteps from '../components/ProcessSteps';
import CTA from '../components/CTA';
import { useReveal, SplitText } from '../components/fx';
import { SERVICES } from '../data/services';
import styles from './Pages.module.css';

const SERVICE_PARAM = { websites: 'website', software: 'software', automation: 'automation' };

export default function ServicesPage() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Services"
        title={<>Websites, software and automation, <Mark>built around</Mark> your business.</>}
        text="Three focused services. Each project starts with a clear scope, so you know what is included before development begins."
      />

      {SERVICES.map((s) => (
        <section key={s.id} id={s.id} className={`sec ${styles.service}`}>
          <div className="wrap">
            <div className={styles.serviceRow}>
              <div className={styles.serviceIntro}>
                <span className={styles.serviceNo}>{s.no}</span>
                <SplitText as="h2">{s.pageTitle}</SplitText>
                <p className="rv">{s.description}</p>
                {s.note && <p className={`${styles.note} rv`}>{s.note}</p>}
                <Link to={`/contact?service=${SERVICE_PARAM[s.id]}`} className="btn rv">
                  {s.cta} <ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
                </Link>
              </div>
              <ul className={styles.includes}>
                {s.include.map((item) => (
                  <li key={item} className="rv">
                    <Check weight="bold" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="Pricing & ownership" title="Clear scope. Milestone-based pricing." />
          <div className={styles.twoCol}>
            <div className="rv">
              <h3>Pricing</h3>
              <p>
                Every project is quoted after a short discovery conversation. You receive a written
                scope, deliverables, timeline and milestone-based payments before development begins.
                Timelines depend on the agreed scope and complexity.
              </p>
            </div>
            <div className="rv">
              <h3>Ownership &amp; handover</h3>
              <p>
                You receive ownership of the agreed custom deliverables, subject to third-party
                licences and the project agreement. Domains, hosting and accounts are set up with you
                and handed over properly at launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="Process" title="How a project works" />
          <ProcessSteps />
        </div>
      </section>

      <CTA heading="Not sure which service you need?" text="Tell us what you are trying to achieve and we will suggest the simplest way to get there." button="Start a Conversation" />
    </div>
  );
}
