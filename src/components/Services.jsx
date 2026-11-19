import { useEffect, useRef } from 'react';
import { ArrowUpRight, Check, Clock, ChatTeardropText, Lightning, FolderOpen, Tag } from '@phosphor-icons/react';
import { SplitText, CountUp } from './fx';
import styles from './Services.module.css';

const services = [
  {
    id: 'web',
    num: '01',
    title: 'Custom Websites & Landing Pages',
    tagline: 'High-converting, SEO-optimized & blazing fast',
    desc: 'Bespoke business websites and landing pages engineered to captivate visitors, rank on Google, and convert prospects into high-paying clients.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Figma', 'SEO'],
    deliverables: [
      'Custom UI/UX designed in Figma',
      'Ultra-fast Next.js / React build',
      'Full on-page SEO & Schema markup',
      'Interactive enquiry & lead forms',
      '95+ Google Lighthouse speed score',
    ],
    timeline: '1–2 Weeks',
    from: '₹12,000',
    color: '#3D3D3D',
  },
  {
    id: 'software',
    num: '02',
    title: 'Full-Stack Web Apps & SaaS MVPs',
    tagline: 'Scalable software architectures for founders',
    desc: 'End-to-end custom web applications, client portals, and SaaS minimum viable products (MVPs) built to test ideas, acquire users, and scale efficiently.',
    tech: ['Node.js', 'PostgreSQL', 'Supabase', 'TypeScript', 'Prisma'],
    deliverables: [
      'Secure user authentication & roles',
      'Relational database architecture',
      'Custom admin dashboard & analytics',
      'REST & GraphQL API integrations',
      'Subscription & payment handling',
    ],
    timeline: '3–6 Weeks',
    from: '₹65,000',
    color: '#4A4A4A',
  },
  {
    id: 'store',
    num: '03',
    title: 'E-Commerce & Payment Stores',
    tagline: 'Seamless shopping experiences that drive sales',
    desc: 'Modern online storefronts with friction-free checkout, automated inventory tracking, and direct payment gateway integrations.',
    tech: ['Shopify', 'Next Commerce', 'Razorpay', 'Stripe'],
    deliverables: [
      'Product catalog & inventory sync',
      'Razorpay, Stripe & UPI gateway setup',
      'Automated WhatsApp order updates',
      'Discount coupon & cart recovery',
      'Mobile-first responsive checkout',
    ],
    timeline: '2–4 Weeks',
    from: '₹35,000',
    color: '#2F2F2F',
  },
  {
    id: 'automation',
    num: '04',
    title: 'Business Automation & Custom Tools',
    tagline: 'Automate repetitive workflows and save 20+ hrs/wk',
    desc: 'Connect your disparate software, automate customer messaging, and build custom internal tools to supercharge your business efficiency.',
    tech: ['Python', 'WhatsApp API', 'Webhooks', 'Make / Zapier'],
    deliverables: [
      'Automated WhatsApp enquiry bots',
      'CRM lead routing & follow-ups',
      'Automated invoicing & payment receipts',
      'Custom API webhooks & integrations',
      'Full setup documentation & walkthrough',
    ],
    timeline: '1–2 Weeks',
    from: '₹18,000',
    color: '#3A3A3A',
  },
];

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.rv');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els?.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="sec" id="services" ref={ref}>
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Services &amp; Capabilities</p>
            <SplitText as="h2">Tailored Development.<br />Fixed Scope &amp; Zero Bloat.</SplitText>
          </div>
          <SplitText as="p" mode="stagger">
            I deliver end-to-end web and software solutions with direct developer communication,
            transparent milestone pricing, and 100% code ownership.
          </SplitText>
        </div>

        <div className={styles.grid}>
          {services.map((svc) => (
            <article
              key={svc.id}
              className={`${styles.card} rv`}
              style={{ '--card-color': svc.color }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.numBadge}>{svc.num}</div>
                <div className={styles.timelineBadge}><Clock weight="bold" className="ico" aria-hidden="true" /> {svc.timeline}</div>
              </div>

              <h3 className={styles.title}>{svc.title}</h3>
              <p className={styles.tagline}>{svc.tagline}</p>
              <p className={styles.desc}>{svc.desc}</p>

              {/* Tech Stack Pills */}
              <div className={styles.techList}>
                {svc.tech.map((t) => (
                  <span key={t} className={styles.techItem}>{t}</span>
                ))}
              </div>

              {/* Deliverables Checklist */}
              <div className={styles.deliverables}>
                <span className={styles.delivTitle}>What’s included:</span>
                <ul>
                  {svc.deliverables.map((item, i) => (
                    <li key={i}>
                      <span className={styles.checkIcon}><Check weight="bold" aria-hidden="true" /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer with Price & Action */}
              <div className={styles.cardFooter}>
                <div className={styles.priceWrap}>
                  <span className={styles.fromLabel}>Starting from</span>
                  <span className={styles.priceVal}><CountUp value={svc.from} /></span>
                </div>

                <a href="#contact" className={styles.discussBtn}>
                  Discuss Project{' '}<ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Why Freelance vs Agency Comparison Box */}
        <div className={`${styles.comparisonBox} rv`}>
          <div className={styles.compLeft}>
            <span className={styles.compEyebrow}>The Freelance Advantage</span>
            <h3>Why work with an independent developer vs. a traditional agency?</h3>
            <p>
              Traditional agencies charge inflated rates to cover office rent and project managers.
              Working directly with me gives you elite engineering velocity, complete transparency, and personal accountability.
            </p>
          </div>

          <div className={styles.compGrid}>
            <div className={styles.compItem}>
              <span className={styles.compIcon}><ChatTeardropText weight="duotone" aria-hidden="true" /></span>
              <h4>Direct Developer Communication</h4>
              <p>No account managers playing telephone. You discuss ideas and specs directly with the engineer writing your code.</p>
            </div>
            <div className={styles.compItem}>
              <span className={styles.compIcon}><Lightning weight="duotone" aria-hidden="true" /></span>
              <h4>2x Faster Turnarounds</h4>
              <p>Projects launch in 1 to 4 weeks. No bureaucratic red tape or endless stakeholder approvals.</p>
            </div>
            <div className={styles.compItem}>
              <span className={styles.compIcon}><FolderOpen weight="duotone" aria-hidden="true" /></span>
              <h4>100% Code &amp; Asset Ownership</h4>
              <p>Clean GitHub repositories, fully commented code, and hosting in your own accounts. No vendor lock-in.</p>
            </div>
            <div className={styles.compItem}>
              <span className={styles.compIcon}><Tag weight="duotone" aria-hidden="true" /></span>
              <h4>Transparent Fixed Pricing</h4>
              <p>Every project has a clear scope and a guaranteed fixed price. 50% milestone payments with zero surprise charges.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
