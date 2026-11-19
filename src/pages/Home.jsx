import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';
import Hero from '../components/Hero';
import SectionHead from '../components/SectionHead';
import ServiceCards from '../components/ServiceCards';
import ProjectCard from '../components/ProjectCard';
import WhyAdvio from '../components/WhyAdvio';
import ProcessSteps from '../components/ProcessSteps';
import CTA from '../components/CTA';
import { useReveal } from '../components/fx';
import { PROJECTS } from '../data/projects';

const FEATURED = ['marlowe', 'northline', 'relay'];

export default function Home() {
  const ref = useReveal();
  return (
    <>
      <Hero />
      <div className="layer" ref={ref}>
        <section className="sec">
          <div className="wrap">
            <SectionHead eyebrow="Services" title="What we build" />
            <ServiceCards />
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <SectionHead
              eyebrow="Selected work"
              title="A look at what we can build."
              text="Original concept projects that show our approach to design and development."
            />
            <div className="grid3">
              {FEATURED.map((id) => (
                <ProjectCard key={id} p={PROJECTS.find((p) => p.id === id)} />
              ))}
            </div>
            <div className="center-row rv">
              <Link to="/work" className="btn outline">
                View All Work <ArrowRight weight="bold" className="ico" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <SectionHead eyebrow="Why ADVIO" title="A more direct, simpler way to build." />
            <WhyAdvio />
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <SectionHead eyebrow="Process" title="How a project works" />
            <ProcessSteps />
          </div>
        </section>

        <CTA />
      </div>
    </>
  );
}
