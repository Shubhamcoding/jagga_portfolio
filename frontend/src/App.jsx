import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  useEffect(() => {
    // Initialize scroll reveal for elements already in viewport on load
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
