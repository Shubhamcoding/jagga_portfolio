import { motion } from 'motion/react';

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      mass: 0.8,
    },
  },
};

/**
 * AnimatedSection — replaces SectionWrapper with motion-powered viewport reveals.
 * Children wrapped in <AnimatedItem> will stagger in automatically.
 */
export default function AnimatedSection({ children, id, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`section-padding ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="container">
        {children}
      </div>
    </motion.section>
  );
}

/**
 * AnimatedItem — a child wrapper that participates in the parent's stagger.
 * Use inside AnimatedSection for automatic orchestration.
 */
export function AnimatedItem({ children, className = '', as = 'div' }) {
  const Component = motion[as] || motion.div;
  return (
    <Component className={className} variants={childVariants}>
      {children}
    </Component>
  );
}
