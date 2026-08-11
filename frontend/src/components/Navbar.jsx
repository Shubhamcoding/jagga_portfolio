import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const navLinks = [
  { id: '', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About us' },
  { id: 'services', label: 'Services' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || '';
  
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const linksRef = useRef([]);

  useEffect(() => {
    const activeIndex = navLinks.findIndex(link => link.id === currentPath);
    const activeEl = linksRef.current[activeIndex];
    
    // We use a small timeout to ensure layout is calculated, though usually immediate is fine.
    const updateIndicator = () => {
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1
        });
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };
    
    // Update immediately and also after a tiny delay for font-loads if any
    updateIndicator();
    const timeout = setTimeout(updateIndicator, 50);
    return () => clearTimeout(timeout);
  }, [currentPath]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also handle window resize for the indicator
    const handleResize = () => {
      const activeIndex = navLinks.findIndex(link => link.id === currentPath);
      const activeEl = linksRef.current[activeIndex];
      if (activeEl) {
        setIndicatorStyle(prev => ({
          ...prev,
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        }));
      }
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentPath]);

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.2 }}
    >
      <div className="navbar__inner container">
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
            <span className="navbar__logo-text">
              <span className="navbar__logo-accent">Jagga</span> & Co. Digital
            </span>
          </Link>
        </motion.div>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(({ id, label }, index) => {
            const isActive = currentPath === id;
            return (
              <NavLink
                key={id}
                to={`/${id}`}
                ref={el => linksRef.current[index] = el}
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            );
          })}
          <motion.span
            className="navbar__link-indicator"
            initial={false}
            animate={indicatorStyle}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        <div className="navbar__right">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              to="/contact"
              className="btn btn-outline navbar__cta"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </motion.div>
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

