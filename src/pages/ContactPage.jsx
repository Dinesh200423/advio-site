import PageHero, { Mark } from '../components/PageHero';
import ContactForm from '../components/ContactForm';
import { useReveal } from '../components/fx';
import { SITE } from '../config';
import styles from './Pages.module.css';

export default function ContactPage() {
  const ref = useReveal();
  const wa = SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}` : '';
  return (
    <div ref={ref}>
      <PageHero
        eyebrow="Contact"
        title={<>Let’s talk about <Mark>your project.</Mark></>}
        text="Tell us a little about your requirements. We’ll review your enquiry and get back to you to discuss the next steps."
      />

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <div className={styles.contactGrid}>
            <aside className={`${styles.contactSide} rv`}>
              <h3>Other ways to reach us</h3>
              <ul>
                {SITE.email && (
                  <li><span>Email</span><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                )}
                {wa && (
                  <li><span>WhatsApp</span><a href={wa} target="_blank" rel="noopener noreferrer">Message us</a></li>
                )}
                {SITE.instagram && (
                  <li><span>Instagram</span><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">@_advio_</a></li>
                )}
                <li><span>Based in</span><b>{SITE.location}</b></li>
              </ul>
            </aside>

            <div className="rv">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
