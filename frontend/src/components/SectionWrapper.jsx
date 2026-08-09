import { useEffect, useRef } from 'react';

export default function SectionWrapper({ children, id, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animateElements = entry.target.querySelectorAll('.animate-on-scroll');
            animateElements.forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`section-padding ${className}`}>
      <div className="container">
        {children}
      </div>
    </section>
  );
}
