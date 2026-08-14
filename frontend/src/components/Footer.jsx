import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="container">
        <div className="footer__top">
          <motion.div
            className="footer__brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          >
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--color-text)' }}>
              Let's build something <span className="accent-text">great.</span>
            </h3>
            <p className="footer__tagline">
              Crafting digital experiences that convert. Strategy. Design. Code.
            </p>
          </motion.div>




          <motion.div
            className="footer__links-group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.3 }}
          >
            <h4 className="footer__heading">Connect</h4>
            <div className="footer__socials">
              {[
                {
                  href: 'https://twitter.com',
                  label: 'Twitter',
                  id: 'social-twitter',
                  icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
                },
                {
                  href: 'https://linkedin.com',
                  label: 'LinkedIn',
                  id: 'social-linkedin',
                  icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
                },
                {
                  href: 'https://dribbble.com',
                  label: 'Dribbble',
                  id: 'social-dribbble',
                  icon: <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm7.938 5.563a10.18 10.18 0 012.25 6.375c-.328-.063-3.625-.75-6.938-.313-.063-.156-.125-.281-.188-.438-.188-.438-.375-.875-.594-1.313 3.688-1.5 5.344-3.688 5.469-3.813v-.5zM12 1.813c2.813 0 5.375 1.188 7.188 3.063-.094.125-1.594 2.156-5.156 3.5-1.625-2.969-3.406-5.406-3.688-5.781A10.28 10.28 0 0112 1.812zM8.438 3.313c.25.344 2 2.781 3.656 5.688-4.625 1.219-8.688 1.188-9.125 1.188a10.24 10.24 0 015.469-6.876zM1.813 12v-.313c.438.013 5.156.094 10.094-1.406.281.563.563 1.125.813 1.688-.125.031-.25.094-.375.125-5.156 1.656-7.875 6.188-8.031 6.438A10.15 10.15 0 011.812 12zm4.062 7.563s1.906-4.063 7.438-5.969c1.313 3.438 1.875 6.313 2 7.063a10.2 10.2 0 01-9.438-1.094zm11.313.188c-.094-.5-.594-3.25-1.813-6.625 3.094-.5 5.813.313 6.156.438a10.22 10.22 0 01-4.344 6.188z" />,
                },
                {
                  href: 'https://github.com',
                  label: 'GitHub',
                  id: 'social-github',
                  icon: <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />,
                },
              ].map((social) => (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social"
                  aria-label={social.label}
                  id={social.id}
                  whileHover={{
                    scale: 1.25,
                    y: -3,
                    transition: { type: 'spring', stiffness: 400, damping: 15 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    {social.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} All rights reserved.
          </p>
          <motion.button
            className="footer__back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            id="back-to-top"
            whileHover={{
              scale: 1.1,
              y: -3,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            whileTap={{ scale: 0.92 }}
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
}
