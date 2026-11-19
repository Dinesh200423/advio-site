import { useEffect, useRef } from 'react';
import { ArrowUpRight, ShoppingCart, CheckCircle } from '@phosphor-icons/react';
import { SplitText } from './fx';
import styles from './Work.module.css';

const projects = [
  {
    id: 'saas',
    category: 'Full-Stack Software / SaaS',
    title: 'PulseMetrics — Analytics & Billing Platform',
    desc: 'A full-stack SaaS platform featuring live revenue analytics, subscription tiers, customer access management, and automated Stripe billing webhooks.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'Stripe'],
    metric: '12k+ Active Users',
    metricSub: 'Sub-second real-time queries',
    bg: '#1C1C1C',
    type: 'dashboard',
  },
  {
    id: 'website',
    category: 'Custom Website / Portfolio',
    title: 'Lumina Studio — Architectural Firm Website',
    desc: 'An ultra-fast luxury portfolio engineered for a leading design studio. Features custom typography, interactive galleries, and high-converting client enquiry flows.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'SEO'],
    metric: '99 Lighthouse Score',
    metricSub: '+140% Qualified client enquiries',
    bg: '#EFEFEF',
    type: 'website',
  },
  {
    id: 'ecommerce',
    category: 'E-Commerce & Automation',
    title: 'KalaCraft — Artisan D2C Online Store',
    desc: 'Modern e-commerce platform with 1-click Razorpay checkout, real-time inventory synchronization, and automated WhatsApp order dispatch notifications.',
    tags: ['Next.js Commerce', 'Razorpay', 'WhatsApp Bot', 'PostgreSQL'],
    metric: '3.4% Conversion Rate',
    metricSub: 'Automated order delivery updates',
    bg: '#3D3D3D',
    type: 'ecommerce',
  },
];

export default function Work() {
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
    <section className="sec" id="work" ref={ref}>
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Selected Work</p>
            <SplitText as="h2">Proven Software &amp;<br />Websites Built to Deliver.</SplitText>
          </div>
          <SplitText as="p" mode="stagger">
            A sample of web applications, custom platforms, and high-converting business websites
            designed, coded, and deployed end-to-end.
          </SplitText>
        </div>

        <div className={styles.grid}>
          {projects.map((p) => (
            <article key={p.id} className={`${styles.card} rv`}>
              {/* Mockup Preview Window */}
              <div className={styles.mockupFrame} style={{ backgroundColor: p.bg }}>
                {/* Browser Top Bar */}
                <div className={styles.browserBar}>
                  <div className={styles.trafficLights}>
                    <span className={styles.tlRed} />
                    <span className={styles.tlYellow} />
                    <span className={styles.tlGreen} />
                  </div>
                  <div className={styles.urlBar}>{p.title.toLowerCase().replace(/[^a-z0-9]/g, '')}.app</div>
                </div>

                {/* Interactive Simulated UI */}
                <div className={styles.uiCanvas}>
                  {p.type === 'dashboard' && (
                    <div className={styles.dashUI}>
                      <div className={styles.dashSidebar}>
                        <div className={styles.dashLogo} />
                        <div className={styles.dashNavItemActive} />
                        <div className={styles.dashNavItem} />
                        <div className={styles.dashNavItem} />
                      </div>
                      <div className={styles.dashMain}>
                        <div className={styles.dashHeader}>
                          <div className={styles.dashTitleBar} />
                          <div className={styles.dashProfile} />
                        </div>
                        <div className={styles.dashKpiRow}>
                          <div className={styles.kpiBox}>
                            <span className={styles.kpiLabel}>Total Revenue</span>
                            <span className={styles.kpiValue}>₹4,82,500</span>
                          </div>
                          <div className={styles.kpiBox}>
                            <span className={styles.kpiLabel}>Active Users</span>
                            <span className={styles.kpiValue}>1,248</span>
                          </div>
                        </div>
                        <div className={styles.dashChart}>
                          <div className={styles.chartBar} style={{ height: '40%' }} />
                          <div className={styles.chartBar} style={{ height: '65%' }} />
                          <div className={styles.chartBar} style={{ height: '50%' }} />
                          <div className={styles.chartBar} style={{ height: '85%' }} />
                          <div className={styles.chartBar} style={{ height: '70%' }} />
                          <div className={styles.chartBar} style={{ height: '95%' }} />
                        </div>
                      </div>
                    </div>
                  )}

                  {p.type === 'website' && (
                    <div className={styles.webUI}>
                      <div className={styles.webNav}>
                        <span className={styles.webBrand}>LUMINA</span>
                        <div className={styles.webLinks}>
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                      <div className={styles.webHero}>
                        <div className={styles.webHeading} />
                        <div className={styles.webSub} />
                        <div className={styles.webBtn} />
                      </div>
                      <div className={styles.webGrid}>
                        <div className={styles.webImage1} />
                        <div className={styles.webImage2} />
                      </div>
                    </div>
                  )}

                  {p.type === 'ecommerce' && (
                    <div className={styles.ecomUI}>
                      <div className={styles.ecomHeader}>
                        <span className={styles.ecomLogo}>KALACRAFT</span>
                        <span className={styles.ecomCart}><ShoppingCart weight="bold" className="ico" aria-hidden="true" /> Cart (2)</span>
                      </div>
                      <div className={styles.ecomProductRow}>
                        <div className={styles.ecomCard}>
                          <div className={styles.ecomImg} />
                          <span className={styles.ecomTitle}>Ceramic Pitcher</span>
                          <span className={styles.ecomPrice}>₹1,850</span>
                        </div>
                        <div className={styles.ecomCard}>
                          <div className={styles.ecomImg} />
                          <span className={styles.ecomTitle}>Clay Vase</span>
                          <span className={styles.ecomPrice}>₹2,400</span>
                        </div>
                      </div>
                      <div className={styles.ecomAlert}><CheckCircle weight="fill" className="ico" aria-hidden="true" /> WhatsApp Order Notification Dispatched</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Meta Details */}
              <div className={styles.meta}>
                <div className={styles.categoryBadge}>{p.category}</div>
                <h3 className={styles.projectTitle}>{p.title}</h3>
                <p className={styles.projectDesc}>{p.desc}</p>

                {/* Tech Badges */}
                <div className={styles.tagList}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>

                {/* Metric Highlight */}
                <div className={styles.metricRow}>
                  <div>
                    <span className={styles.metricVal}>{p.metric}</span>
                    <span className={styles.metricSub}>{p.metricSub}</span>
                  </div>
                  <a href="#contact" className={styles.inquireLink}>
                    Request Similar Build{' '}<ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
