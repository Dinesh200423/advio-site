import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Check, Clock, CreditCard, ShieldCheck, CloudCheck } from '@phosphor-icons/react';
import { SplitText, CountUp } from './fx';
import styles from './Pricing.module.css';

const DATA = {
  web: {
    n: 'Websites & Landing Pages',
    rows: [
      {
        name: 'Starter Landing Page',
        desc: 'Single high-converting page for a product, campaign, or portfolio with fast load speeds and mobile optimization.',
        time: '5–7 Days',
        price: '₹12,000',
        features: ['1 Responsive page', 'Lead capture form', 'On-page SEO', 'Domain setup'],
      },
      {
        name: 'Business Website',
        desc: 'Up to 5 custom-designed pages built to establish instant credibility and generate inbound client inquiries.',
        time: '10–14 Days',
        price: '₹24,000',
        popular: true,
        features: ['Up to 5 pages', 'Custom Figma design', '95+ Lighthouse speed', 'Analytics & SEO markup', '30-day warranty'],
      },
      {
        name: 'Growth & CMS Portal',
        desc: 'Up to 10 pages with a dynamic Headless CMS or blog, built for brands looking to scale content and search rankings.',
        time: '3–4 Weeks',
        price: '₹38,000',
        features: ['Up to 10 pages + Blog', 'Headless CMS dashboard', 'Advanced SEO & Schema', 'Custom animations', 'Walkthrough tutorial'],
      },
    ],
  },
  software: {
    n: 'Web Apps & Custom Software',
    rows: [
      {
        name: 'Frontend Web App MVP',
        desc: 'Interactive UI dashboard with simulated or existing REST API integration, built with React and Tailwind.',
        time: '2–3 Weeks',
        price: '₹45,000',
        features: ['React / Next.js architecture', 'Responsive UI components', 'REST API connections', 'Clean GitHub repository'],
      },
      {
        name: 'Full-Stack SaaS MVP',
        desc: 'Complete software MVP with user auth, relational database, client dashboard, and payment/subscription integration.',
        time: '4–6 Weeks',
        price: '₹85,000',
        popular: true,
        features: ['Auth & Role-based access', 'PostgreSQL / Supabase DB', 'Stripe or Razorpay billing', 'Admin analytics portal', 'Docker & Cloud deploy'],
      },
      {
        name: 'Custom Enterprise Platform',
        desc: 'Tailored multi-role business software, client portal, or custom automation backend scoped to your exact business operations.',
        time: '6–10 Weeks',
        price: '₹1,60,000+',
        features: ['Multi-tenant architecture', 'Custom workflow engines', 'Comprehensive API suite', 'Extended 60-day support'],
      },
    ],
  },
  store: {
    n: 'E-Commerce Stores',
    rows: [
      {
        name: 'Shopify Store Setup',
        desc: 'Customized Shopify storefront with branded theme, payment gateway, shipping rates, and product catalog setup.',
        time: '1–2 Weeks',
        price: '₹28,000',
        features: ['Up to 30 products', 'Razorpay & UPI gateway', 'Mobile-first cart flow', 'Shipping integration'],
      },
      {
        name: 'Custom Next.js Storefront',
        desc: 'Ultra-fast custom headless online store with 1-click checkout and automated WhatsApp order notifications.',
        time: '3–4 Weeks',
        price: '₹48,000',
        popular: true,
        features: ['Custom headless storefront', 'Automated WhatsApp alerts', 'Coupon & discount engine', 'Inventory tracking', 'Instant page loads'],
      },
    ],
  },
  automation: {
    n: 'Automation & Integrations',
    rows: [
      {
        name: 'Workflow Automation Pack',
        desc: 'Three automated workflows connecting your forms, CRM, Google Sheets, and email alerts without manual data entry.',
        time: '3–5 Days',
        price: '₹14,000',
        features: ['3 Integrated workflows', 'Webhook data routing', 'Error alerting system', 'Documentation walkthrough'],
      },
      {
        name: 'WhatsApp Bot & CRM Pipeline',
        desc: 'Official WhatsApp Business API integration that automatically responds to leads, qualifies them, and creates CRM deals.',
        time: '1–2 Weeks',
        price: '₹28,000',
        popular: true,
        features: ['WhatsApp Cloud API setup', 'Automated lead qualification', 'Instant notification to team', 'CRM deal pipeline sync'],
      },
    ],
  },
};

export default function Pricing() {
  const [active, setActive] = useState('web');
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.rv');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els?.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const rows = DATA[active].rows;

  return (
    <section className="sec" id="pricing" ref={ref}>
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Transparent Rates</p>
            <SplitText as="h2">Fixed-Price Packages.<br />Zero Surprise Bills.</SplitText>
          </div>
          <SplitText as="p" mode="stagger">
            Clear development estimates in INR. Every project includes written milestone scopes,
            staged 50/50 payments, and post-launch bug warranty.
          </SplitText>
        </div>

        {/* Category Tabs */}
        <div className={`${styles.tabs} rv`} role="tablist">
          {Object.entries(DATA).map(([key, item]) => (
            <button
              key={key}
              role="tab"
              aria-selected={active === key}
              className={`${styles.tab} ${active === key ? styles.tabActive : ''}`}
              onClick={() => setActive(key)}
            >
              {item.n}
            </button>
          ))}
        </div>

        {/* Pricing Rows */}
        <div className={styles.rows}>
          {rows.map((row) => (
            <div key={row.name} className={`${styles.row} rv`}>
              <div className={styles.rowMain}>
                <div className={styles.rowTitleWrap}>
                  <h3 className={styles.rowName}>{row.name}</h3>
                  {row.popular && <span className={styles.badge}>Most Popular</span>}
                </div>
                <p className={styles.rowDesc}>{row.desc}</p>
                <div className={styles.featurePills}>
                  {row.features.map((f) => (
                    <span key={f} className={styles.featurePill}><Check weight="bold" className="ico" aria-hidden="true" /> {f}</span>
                  ))}
                </div>
              </div>

              <div className={styles.rowTime}>
                <span className={styles.timeLabel}>Timeline</span>
                <span className={styles.timeVal}><Clock weight="bold" className="ico" aria-hidden="true" /> {row.time}</span>
              </div>

              <div className={styles.rowPrice}>
                <span className={styles.priceAmount}><CountUp value={row.price} /></span>
                <small className={styles.priceTerms}>Fixed milestone fee</small>
              </div>

              <a href="#contact" className={styles.bookBtn} aria-label={`Enquire about ${row.name}`}>
                Enquire{' '}<ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>

        {/* Freelance Milestone Terms Note */}
        <div className={`${styles.termsBox} rv`}>
          <div className={styles.termsItem}>
            <span className={styles.termIcon}><CreditCard weight="duotone" aria-hidden="true" /></span>
            <div>
              <strong>50% / 50% Milestone Terms</strong>
              <p>50% upfront deposit to initiate development, 50% upon final sign-off and deployment to production.</p>
            </div>
          </div>
          <div className={styles.termsItem}>
            <span className={styles.termIcon}><ShieldCheck weight="duotone" aria-hidden="true" /></span>
            <div>
              <strong>30-Day Bug Warranty</strong>
              <p>All projects include 30 days of free technical support and bug fixes following live launch.</p>
            </div>
          </div>
          <div className={styles.termsItem}>
            <span className={styles.termIcon}><CloudCheck weight="duotone" aria-hidden="true" /></span>
            <div>
              <strong>Direct Cloud Ownership</strong>
              <p>Domains, Vercel/AWS servers, and payment gateways are registered in your own accounts with full credentials.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
