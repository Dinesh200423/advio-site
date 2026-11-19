import { useState } from 'react';
import PageHero, { Mark } from '../components/PageHero';
import ProjectCard from '../components/ProjectCard';
import CTA from '../components/CTA';
import { useReveal } from '../components/fx';
import { PROJECTS, CATEGORIES } from '../data/projects';
import styles from './Pages.module.css';

export default function WorkPage() {
  const ref = useReveal();
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Work"
        title={<>Selected work &amp; <Mark>digital concepts.</Mark></>}
        text="The projects below are original concepts created by ADVIO to show how we approach design and development. They are not client projects, and each one is labelled."
      />

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className={styles.filters} role="tablist" aria-label="Filter projects by category">
            {['All', ...CATEGORIES].map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filter === c}
                className={`${styles.filter} ${filter === c ? styles.filterOn : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid3" key={filter}>
            {shown.map((p) => <ProjectCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <CTA heading="Want something like this?" text="Tell us what you need and we will suggest a practical way to build it." button="Start a Project" />
    </div>
  );
}
