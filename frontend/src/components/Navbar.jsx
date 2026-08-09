import { useState, useEffect, useCallback } from 'react';

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
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <a href="#home" className="navbar__logo" onClick={(e) => handleClick(e, 'home')}>
          <span className="navbar__logo-text">
            <span className="navbar__logo-accent">Jagga</span> & Co.
          </span>
        </a>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`navbar__link ${activeSection === id ? 'navbar__link--active' : ''}`}
              onClick={(e) => handleClick(e, id)}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="navbar__right">
          <a
            href="#contact"
            className="btn btn-outline navbar__cta"
            onClick={(e) => handleClick(e, 'contact')}
          >
            Contact
          </a>
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

      {menuOpen && <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
}
