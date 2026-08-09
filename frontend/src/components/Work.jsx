import { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import BeforeAfter from './BeforeAfter';
import caseStudy1 from '../assets/images/case-study-1.png';
import caseStudy2 from '../assets/images/case-study-2.png';
import caseStudy3 from '../assets/images/case-study-3.png';

const categories = ['All', 'Web Projects', 'Product Strategy'];

const projects = [
  {
    id: 1,
    title: 'Nova E-Commerce Redesign',
    category: 'Web Projects',
    image: caseStudy1,
    result: '+180% Conversions',
    description: 'Complete redesign of Nova\'s e-commerce platform. We restructured navigation to reduce checkout clicks by 60%.',
    approach: 'User research revealed 73% abandoned at the product page. We redesigned the entire purchase flow.',
  },
  {
    id: 2,
    title: 'FinTrack Dashboard App',
    category: 'Product Strategy',
    image: caseStudy2,
    result: '+220% User Engagement',
    description: 'Comprehensive mobile analytics dashboard. 30+ user interviews defined optimal data visualization.',
    approach: 'Discovery calls revealed users needed real-time insights on mobile. We designed a gesture-first interface.',
  },
  {
    id: 3,
    title: 'SyncFlow SaaS Platform',
    category: 'Web Projects',
    image: caseStudy3,
    result: '+340% Sign-ups',
    description: 'Redesigned SyncFlow\'s pricing page with gradient-driven design that increased free trial sign-ups by 340%.',
    approach: 'A/B testing across 12 variations revealed simplified pricing with visual hierarchy drove conversions.',
  },
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <SectionWrapper id="work">
      <div className="section-header animate-on-scroll">
        <span className="section-label">Our Work</span>
        <h2 className="section-title">
          Built for the <span className="accent-text">Future</span>
        </h2>
        <p className="section-subtitle">
          Our technology and domain expertise converge to deliver
          experiences that redefine what's possible.
        </p>
      </div>

      <div className="work__filters animate-on-scroll stagger-1">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`work__filter ${activeFilter === cat ? 'work__filter--active' : ''}`}
            onClick={() => setActiveFilter(cat)}
            id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LTM-style asymmetric card grid */}
      <div className="work__grid">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`work__card card-dark animate-on-scroll stagger-${index + 1}`}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            id={`project-card-${project.id}`}
          >
            <div className="work__card-image">
              <img src={project.image} alt={project.title} />
              <div className={`work__card-overlay ${hoveredProject === project.id ? 'work__card-overlay--visible' : ''}`}>
                <p className="work__card-approach">
                  <strong>The Approach:</strong> {project.approach}
                </p>
              </div>
            </div>
            <div className="work__card-content">
              <h3 className="work__card-title">{project.title}</h3>
              <p className="work__card-description">{project.description}</p>
              <div className="work__card-footer">
                <span className="work__card-result">{project.result}</span>
                <a href="#contact" className="work__card-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                  Read more
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Before / After */}
      <div className="work__before-after animate-on-scroll">
        <div className="work__before-after-header">
          <span className="section-label">Transformation</span>
          <h3 className="work__before-after-title">
            See the <span className="accent-text">Difference</span>
          </h3>
          <p className="work__before-after-subtitle">
            Drag the slider to compare the before and after of our Global Solutions Inc. redesign.
          </p>
        </div>
        <BeforeAfter />
      </div>
    </SectionWrapper>
  );
}
