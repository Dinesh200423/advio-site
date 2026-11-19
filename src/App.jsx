import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Process from './components/Process';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="layer">
        <Services />
        <Work />
        <Process />
        <Pricing />
        <CTA />
        <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
