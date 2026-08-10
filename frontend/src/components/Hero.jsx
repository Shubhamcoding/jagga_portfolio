import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'motion/react';
import MagneticButton from './MagneticButton';
import heroBg from '../assets/images/hero-bg.png';

/* Animated counter that counts up from 0 to the target value */
function CountUp({ target, suffix = '' }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const numericTarget = parseFloat(target);
    const controls = animate(0, numericTarget, {
      duration: 2,
      ease: [0.32, 0.72, 0, 1],
      onUpdate(value) {
        node.textContent = (Number.isInteger(numericTarget)
          ? Math.round(value)
          : value.toFixed(0)) + suffix;
      },
    });

    return () => controls.stop();
  }, [target, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

const heroTitleLine1 = "It's time to";
const heroTitleLine2 = "Outcreate";

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax for particles — drift at different speeds
  const particle1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const particle2Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const particle3Y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Track whether stats are in view for count-up trigger
  const [statsVisible, setStatsVisible] = useState(false);

  const handleScroll = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={sectionRef}>
      {/* Coral particle wave background with parallax */}
      <div className="hero__particles">
        <motion.div className="hero__particle hero__particle--1" style={{ y: particle1Y }} />
        <motion.div className="hero__particle hero__particle--2" style={{ y: particle2Y }} />
        <motion.div className="hero__particle hero__particle--3" style={{ y: particle3Y }} />
      </div>

      <div className="hero__content container">
        {/* Main hero card */}
        <motion.div
          className="hero__card"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.3 }}
        >
          <div className="hero__card-bg">
            <img src={heroBg} alt="" className="hero__card-img" />
            <div className="hero__card-overlay" />
          </div>
          <div className="hero__card-content">
            <h1 className="hero__title">
              <motion.span
                className="hero__title-line"
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.6 }}
              >
                {heroTitleLine1}
              </motion.span>
              <br />
              <motion.span
                className="accent-text hero__title-line"
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.85 }}
              >
                {heroTitleLine2}
              </motion.span>
            </h1>
            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 1.1 }}
            >
              We bring human insights and intelligent systems together.
              So that you don't simply outperform the market, you Outcreate it.
            </motion.p>
            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 1.35 }}
            >
              <MagneticButton
                href="#work"
                className="btn btn-primary"
                onClick={(e) => handleScroll(e, 'work')}
              >
                Learn More
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="btn btn-outline"
                onClick={(e) => handleScroll(e, 'contact')}
              >
                Watch Now
                <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats row with count-up animation */}
        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 1.6 }}
          onViewportEnter={() => setStatsVisible(true)}
          viewport={{ once: true }}
        >
          <div className="hero__stat">
            <span className="hero__stat-number">
              {statsVisible ? <CountUp target={50} suffix="+" /> : '0+'}
            </span>
            <span className="hero__stat-label">Projects Delivered</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">
              {statsVisible ? <CountUp target={98} suffix="%" /> : '0%'}
            </span>
            <span className="hero__stat-label">Client Satisfaction</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">
              {statsVisible ? <CountUp target={3} suffix="x" /> : '0x'}
            </span>
            <span className="hero__stat-label">Avg. ROI Increase</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
