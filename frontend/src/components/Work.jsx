import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import AnimatedSection, { AnimatedItem } from './AnimatedSection';
import AnimatedCard from './AnimatedCard';
import BeforeAfter from './BeforeAfter';
import caseStudy1 from '../assets/images/case-study-1.png';
import caseStudy2 from '../assets/images/case-study-2.png';
import caseStudy3 from '../assets/images/case-study-3.png';

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
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <AnimatedSection id="work">
      <AnimatedItem>
        <div className="section-header">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">
            Built for the <span className="accent-text">Future</span>
          </h2>
          <p className="section-subtitle">
            Our technology and domain expertise converge to deliver
            experiences that redefine what's possible.
          </p>
        </div>
      </AnimatedItem>



      {/* LTM-style asymmetric card grid with AnimatePresence */}
      <div className="work__grid">
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 25,
                delay: index * 0.08,
              }}
            >
              <AnimatedCard
                className={`work__card card-dark`}
                id={`project-card-${project.id}`}
              >
                <div
                  className="work__card-image"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <img src={project.image} alt={project.title} />
                  <motion.div
                    className="work__card-overlay"
                    initial={false}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="work__card-approach">
                      <strong>The Approach:</strong> {project.approach}
                    </p>
                  </motion.div>
                </div>
                <div className="work__card-content">
                  <h3 className="work__card-title">{project.title}</h3>
                  <p className="work__card-description">{project.description}</p>
                  <div className="work__card-footer">
                    <span className="work__card-result">{project.result}</span>
                    <Link to="/contact" className="work__card-link">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                      Read more
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Before / After */}
      <AnimatedItem>
        <div className="work__before-after">
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
      </AnimatedItem>
    </AnimatedSection>
  );
}
