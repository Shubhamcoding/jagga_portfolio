import SectionWrapper from './SectionWrapper';

const services = [
  {
    id: 1,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 8l3 3-3 3" />
        <path d="M13 14h4" />
      </svg>
    ),
    title: 'Web Projects',
    description: 'Full-stack web development with React, Next.js, and modern frameworks. Fast, accessible, and conversion-optimized.',
    features: ['Custom Web Apps', 'E-Commerce', 'Landing Pages', 'Progressive Web Apps'],
  },
  {
    id: 2,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Product Strategy',
    description: 'Data-driven product strategy that connects business goals with user needs. From research to wireframing.',
    features: ['User Research', 'Wireframing', 'A/B Testing', 'Growth Strategy'],
  },
  {
    id: 3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Custom Development',
    description: 'Bespoke software solutions tailored to your unique needs. APIs, integrations, automation — we build it.',
    features: ['API Development', 'System Integration', 'Automation', 'Cloud Infrastructure'],
  },
  {
    id: 4,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    title: 'Interface Design',
    description: 'Stunning UI/UX that users love. Design systems, micro-interactions, and pixel-perfect interfaces.',
    features: ['UI/UX Design', 'Design Systems', 'Prototyping', 'Brand Identity'],
  },
];

export default function Services() {
  return (
    <SectionWrapper id="services">
      <div className="section-header animate-on-scroll">
        <span className="section-label">What We Do</span>
        <h2 className="section-title">
          Markets and <span className="accent-text">Capabilities</span>
        </h2>
        <p className="section-subtitle">
          End-to-end digital solutions. From strategy to design to development,
          we cover every pixel of the journey.
        </p>
      </div>

      <div className="services__grid">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`services__card card-dark animate-on-scroll stagger-${index + 1}`}
            id={`service-card-${service.id}`}
          >
            <div className="services__card-icon">
              {service.icon}
            </div>
            <h3 className="services__card-title">{service.title}</h3>
            <p className="services__card-description">{service.description}</p>
            <ul className="services__card-features">
              {service.features.map((feature) => (
                <li key={feature} className="services__card-feature">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <a href="#contact" className="services__card-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
              Read more
            </a>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
