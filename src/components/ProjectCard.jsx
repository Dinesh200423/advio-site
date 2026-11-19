import { Link } from 'react-router-dom';
import { ArrowUpRight, ShoppingCart, WhatsappLogo, Table, Bell, CalendarCheck } from '@phosphor-icons/react';
import styles from './Work.module.css';

function Mockup({ p }) {
  switch (p.mock) {
    case 'dashboard':
      return (
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
              <div className={styles.kpiBox}><span className={styles.kpiLabel}>Open leads</span><span className={styles.kpiValue}>42</span></div>
              <div className={styles.kpiBox}><span className={styles.kpiLabel}>Follow-ups</span><span className={styles.kpiValue}>9</span></div>
            </div>
            <div className={styles.dashChart}>
              {[40, 65, 50, 85, 70, 95].map((h, i) => (
                <div key={i} className={styles.chartBar} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      );
    case 'website':
      return (
        <div className={styles.webUI}>
          <div className={styles.webNav}>
            <span className={styles.webBrand}>{p.brand}</span>
            <div className={styles.webLinks}><span /><span /><span /></div>
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
      );
    case 'store':
      return (
        <div className={styles.ecomUI}>
          <div className={styles.ecomHeader}>
            <span className={styles.ecomLogo}>{p.brand}</span>
            <span className={styles.ecomCart}><ShoppingCart weight="bold" className="ico" aria-hidden="true" /> Cart</span>
          </div>
          <div className={styles.ecomProductRow}>
            <div className={styles.ecomCard}><div className={styles.ecomImg} /><span className={styles.ecomTitle}>Ceramic jug</span></div>
            <div className={styles.ecomCard}><div className={styles.ecomImg} /><span className={styles.ecomTitle}>Clay vase</span></div>
          </div>
        </div>
      );
    case 'booking':
      return (
        <div className={styles.bookUI}>
          <div className={styles.bookHead}>
            <span className={styles.bookBrand}>{p.brand}</span>
            <CalendarCheck weight="bold" aria-hidden="true" />
          </div>
          <div className={styles.bookGrid}>
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className={[3, 7, 11].includes(i) ? styles.slotOn : [5, 9].includes(i) ? styles.slotTaken : styles.slot} />
            ))}
          </div>
          <div className={styles.bookBtn}>Confirm slot</div>
        </div>
      );
    case 'automation':
    default:
      return (
        <div className={styles.flowUI}>
          <div className={styles.flowNode}><Table weight="bold" aria-hidden="true" /><span>New enquiry</span></div>
          <span className={styles.flowLine} />
          <div className={styles.flowNode}><Bell weight="bold" aria-hidden="true" /><span>Team alert</span></div>
          <span className={styles.flowLine} />
          <div className={`${styles.flowNode} ${styles.flowNodeOn}`}><WhatsappLogo weight="bold" aria-hidden="true" /><span>Follow-up</span></div>
        </div>
      );
  }
}

export default function ProjectCard({ p }) {
  return (
    <article className={`${styles.card} rv`}>
      <div className={styles.mockupFrame} style={{ backgroundColor: p.bg }}>
        <div className={styles.browserBar}>
          <div className={styles.trafficLights} aria-hidden="true">
            <span className={styles.tlRed} />
            <span className={styles.tlYellow} />
            <span className={styles.tlGreen} />
          </div>
          <div className={styles.urlBar}>{p.domain}</div>
        </div>
        <div className={styles.uiCanvas}><Mockup p={p} /></div>
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
