import PageHero, { Mark } from '../components/PageHero';
import SectionHead from '../components/SectionHead';
import ProcessSteps from '../components/ProcessSteps';
import CTA from '../components/CTA';
import { useReveal } from '../components/fx';
import styles from './Pages.module.css';

const PRINCIPLES = [
  'Understand the business problem before choosing the technology.',
  'Keep project scope and expectations clear.',
  'Build for usability, maintainability and real-world requirements.',
  'Communicate directly throughout the project.',
  'Provide a proper handover after launch.',
];

const CAPABILITIES = [
  'Frontend and backend development',
  'Responsive website development',
  'Database and API integration',
  'CRM and business applications',
  'Workflow automation',
  'Deployment and technical support',
];

export default function About() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="About"
        title={<>Small studio. <Mark>Direct communication.</Mark> Thoughtful engineering.</>}
        text="ADVIO is a founder-led web and software development studio based in Chennai, India. We work with businesses and founders to turn ideas, operational challenges and digital requirements into practical technology solutions."
      />

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="Our approach" title="How we work" />
          <ol className={styles.principles}>
            {PRINCIPLES.map((t, i) => (
              <li key={t} className="rv">
                <span>0{i + 1}</span>
                <p>{t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="Capabilities" title="What we can do" />
          <ul className={styles.caps}>
            {CAPABILITIES.map((c) => (
              <li key={c} className="rv">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow="Process" title="From first call to launch" />
          <ProcessSteps />
        </div>
      </section>

      <CTA heading="Let’s build something useful." button="Discuss Your Project" />
    </div>
  );
}
