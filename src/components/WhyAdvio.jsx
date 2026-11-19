import styles from './Sections.module.css';

const POINTS = [
  ['Direct Communication', 'Work directly with the developer.'],
  ['Clear Scope', 'Know what is included before development begins.'],
  ['Practical Engineering', 'Build solutions around real business requirements.'],
  ['Clean Handover', 'Receive the agreed project deliverables and access.'],
];

export default function WhyAdvio() {
  return (
    <div className={styles.why}>
      {POINTS.map(([t, d]) => (
        <div key={t} className={`${styles.whyItem} rv`}>
          <h3>{t}</h3>
          <p>{d}</p>
        </div>
      ))}
    </div>
  );
}
