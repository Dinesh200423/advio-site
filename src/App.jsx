import { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/ServicesPage';
import WorkPage from './pages/WorkPage';
import ContactPage from './pages/ContactPage';

const TITLES = {
  '/': 'ADVIO — Websites, Software & Automation for Growing Businesses',
  '/about': 'About — ADVIO',
  '/services': 'Services — ADVIO',
  '/work': 'Work — ADVIO',
  '/contact': 'Contact — ADVIO',
};

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] || 'Page not found — ADVIO';
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  return (
    <section className="wrap" style={{ padding: '200px 0 120px' }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontSize: 'clamp(28px, 5vw, 64px)', margin: '16px 0 28px' }}>This page doesn’t exist.</h1>
      <Link to="/" className="btn">Back to Home</Link>
    </section>
  );
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
