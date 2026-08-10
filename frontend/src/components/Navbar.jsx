import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About us' },
  { id: 'services', label: 'Services' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.2 }}
    >
      <div className="navbar__inner container">
        <motion.a
          href="#home"
          className="navbar__logo"
          onClick={(e) => handleClick(e, 'home')}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="navbar__logo-text">
            <span className="navbar__logo-accent">Jagga</span> & Co.
          </span>
        </motion.a>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`navbar__link ${activeSection === id ? 'navbar__link--active' : ''}`}
              onClick={(e) => handleClick(e, id)}
            >
              {label}
              {activeSection === id && (
                <motion.span
                  className="navbar__link-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="navbar__right">
          <motion.a
            href="#contact"
            className="btn btn-outline navbar__cta"
            onClick={(e) => handleClick(e, 'contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            Contact
          </motion.a>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          id="nav-hamburger"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
