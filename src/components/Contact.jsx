import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Envelope, CheckCircle, LockKey } from '@phosphor-icons/react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import { SplitText } from './fx';
import styles from './Contact.module.css';

const PROJECT_TYPES = [
  'Custom Website / Landing Page',
  'Full-Stack Web App / SaaS MVP',
  'E-Commerce Store',
  'Business Automation / Bot',
  'Custom Software Architecture',
];

export default function Contact() {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') || '';
    const business = data.get('business') || '';
    const email = data.get('email') || '';
    const budget = data.get('budget') || '';
    const message = data.get('message') || '';

    // WhatsApp pre-formatted message
    const waText = encodeURIComponent(
      `Hello ADVIO,\n\nI want to discuss a project:\n• Name: ${name}\n• Business: ${business || 'N/A'}\n• Email: ${email}\n• Service: ${selectedType}\n• Budget: ${budget}\n• Details: ${message}`
    );

    // Open WhatsApp with pre-filled enquiry
    window.open(`https://wa.me/?text=${waText}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section className={`${styles.section} sec`} id="contact" ref={ref}>
      <div className="wrap">
        <div className={styles.grid}>

          {/* Left Column: Direct Freelance Channels */}
          <div className={`${styles.left} rv`}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Start a Project</p>
            <SplitText as="h2" className={styles.headline}>Let’s Build Something<br />Great Together.</SplitText>
            <SplitText as="p" mode="stagger" className={styles.sub}>
              Tell me about your idea, timeline, and requirements. I personally review every enquiry
              and reply within 24 hours with a written proposal and fixed quote.
            </SplitText>

            <div className={styles.contacts}>
              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/?text=Hello%20ADVIO,%20I%20would%20like%20to%20discuss%20a%20website%20or%20software%20project."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <div className={styles.contactIcon}><FaWhatsapp aria-hidden="true" /></div>
                <div>
                  <span className={styles.contactLabel}>WhatsApp (Direct &amp; Fast)</span>
                  <span className={styles.contactValue}>Message on WhatsApp</span>
                </div>
                <span className={styles.contactArrow}><ArrowUpRight weight="bold" aria-hidden="true" /></span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/_advio_"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <div className={styles.contactIcon}><FaInstagram aria-hidden="true" /></div>
                <div>
                  <span className={styles.contactLabel}>Instagram Studio</span>
                  <span className={styles.contactValue}>@_advio_</span>
                </div>
                <span className={styles.contactArrow}><ArrowUpRight weight="bold" aria-hidden="true" /></span>
              </a>

              {/* Direct Email */}
              <div className={styles.contactLink}>
                <div className={styles.contactIcon}><Envelope weight="bold" aria-hidden="true" /></div>
                <div>
                  <span className={styles.contactLabel}>Direct Email</span>
                  <span className={styles.contactValue}>contact@advio.studio</span>
                </div>
              </div>
            </div>

            {/* Availability Box */}
            <div className={styles.availBox}>
              <span className={styles.availDot} />
              <div>
                <strong>Current Capacity: Available for 2 new projects</strong>
                <p>Accepting new website &amp; software builds for this month.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className={`${styles.right} rv`}>
            {submitted ? (
              <div className={styles.successCard}>
                <span className={styles.successIcon}><CheckCircle weight="fill" aria-hidden="true" /></span>
                <h3>Enquiry Generated!</h3>
                <p>
                  Thank you! Your project details have been prepared. If WhatsApp didn’t open automatically,
                  feel free to message directly on Instagram <strong>@_advio_</strong>.
                </p>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => setSubmitted(false)}
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Project Type Pills */}
                <div className={styles.typeSelector}>
                  <label className={styles.fieldLabel}>What are you looking to build?</label>
                  <div className={styles.pills}>
                    {PROJECT_TYPES.map((t) => (
                      <button
                        type="button"
                        key={t}
                        className={`${styles.typePill} ${selectedType === t ? styles.typePillActive : ''}`}
                        onClick={() => setSelectedType(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.rowTwo}>
                  <label>
                    Your Name *
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                    />
                  </label>
                  <label>
                    Business / Brand
                    <input
                      name="business"
                      type="text"
                      placeholder="e.g. Acme Studio"
                    />
                  </label>
                </div>

                <div className={styles.rowTwo}>
                  <label>
                    Email Address *
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                    />
                  </label>
                  <label>
                    Estimated Budget (INR)
                    <select name="budget" defaultValue="">
                      <option value="" disabled>Select a range</option>
                      <option value="₹12,000 – ₹25,000">₹12,000 – ₹25,000</option>
                      <option value="₹25,000 – ₹60,000">₹25,000 – ₹60,000</option>
                      <option value="₹60,000 – ₹1,50,000">₹60,000 – ₹1,50,000</option>
                      <option value="₹1,50,000+">₹1,50,000+</option>
                      <option value="Need advice on scoping">Need advice on scoping</option>
                    </select>
                  </label>
                </div>

                <label>
                  Project Details &amp; Requirements *
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Tell me about what you want to build, any reference sites you like, and your target launch date..."
                  />
                </label>

                <button type="submit" className={`btn ${styles.submitBtn}`}>
                  Send Project Enquiry{' '}<ArrowUpRight weight="bold" className="ico" aria-hidden="true" />
                </button>

                <p className={styles.disclaimer}>
                  <LockKey weight="bold" className="ico" aria-hidden="true" /> Zero spam. Direct engineer response within 24 hours with written timeline &amp; fixed quote.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
