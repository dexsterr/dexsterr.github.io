import { useEffect } from 'react';
import Hero from './Index';
import Portfolio from './Portfolio';
import About from './About';
import ContactSection from '../sections/ContactSection';

/**
 * Single-page scroll experience. All content lives in one document; the fixed
 * header scrolls between the #home / #portfolio / #about / #contact sections,
 * while the background, nav and social rail stay mounted (in RootLayout).
 */
const Home = () => {
  useEffect(() => {
    document.title = 'Oskar Chudoba - Cybersecurity';
  }, []);

  return (
    <>
      <Hero />
      <div className="divider-glow max-w-5xl mx-auto opacity-60" />
      <Portfolio />
      <div className="divider-glow max-w-5xl mx-auto opacity-60" />
      <About />
      <div className="divider-glow max-w-5xl mx-auto opacity-60" />
      <ContactSection />
    </>
  );
};

export default Home;
