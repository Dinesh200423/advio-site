import styles from './Sections.module.css';

const STEPS = [
  ['01', 'Discover', 'Understand your goals and requirements.'],
  ['02', 'Plan', 'Define scope, deliverables and timeline.'],
  ['03', 'Build', 'Design, develop and review the solution.'],
  ['04', 'Launch', 'Test, deploy and hand over the project.'],
];

export default function ProcessSteps() {
  return (
    <ol className={styles.steps}>
      {STEPS.map(([n, t, d]) => (
        <li key={n} className={`${styles.step} rv`}>
          <span className={styles.stepNo}>{n}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </li>
      ))}
    </ol>
  );
}
