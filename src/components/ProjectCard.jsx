import { Link } from 'react-router-dom';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useInView } from './fx';
import styles from './Work.module.css';

export default function ProjectCard({ p }) {
  // Each card reveals itself, so cards created later (e.g. by a filter) are never left hidden.
  const [ref, seen] = useInView(0.05);
  return (
    <article ref={ref} className={`${styles.card} rv ${seen ? 'in' : ''}`}>
      <div className={styles.shot}>
        <img src={p.image} alt={p.alt} width="1200" height="689" loading="lazy" decoding="async" />
      </div>

      <div className={styles.meta}>
        <div className={styles.metaTop}>
          <span className={styles.categoryBadge}>{p.category}</span>
          <span className={styles.typeLabel}>{p.type}</span>
        </div>
        <h3 className={styles.projectTitle}>{p.title}</h3>
        <p className={styles.projectDesc}>{p.desc}</p>
        <Link to="/contact" className={styles.actionLink}>
          Discuss a similar project <ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
