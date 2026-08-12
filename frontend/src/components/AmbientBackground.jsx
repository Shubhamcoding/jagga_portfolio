import { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const orbs = [
  {
    id: 1,
    color: 'radial-gradient(circle, rgba(238, 77, 56, 0.22) 0%, rgba(238, 77, 56, 0.05) 45%, transparent 70%)',
    size: 750,
    initialX: '15%',
    initialY: '18%',
    duration: 20,
    xRange: [-60, 80, -30, 50, -60],
    yRange: [-40, 70, -60, 30, -40],
    scaleRange: [1, 1.15, 0.95, 1.1, 1],
  },
  {
    id: 2,
    color: 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(59, 130, 246, 0.04) 45%, transparent 70%)',
    size: 680,
    initialX: '70%',
    initialY: '12%',
    duration: 26,
    xRange: [40, -70, 50, -40, 40],
    yRange: [60, -50, 70, -30, 60],
    scaleRange: [1.1, 0.9, 1.15, 1, 1.1],
  },
  {
    id: 3,
    color: 'radial-gradient(circle, rgba(238, 77, 56, 0.14) 0%, rgba(238, 77, 56, 0.03) 50%, transparent 70%)',
    size: 580,
    initialX: '85%',
    initialY: '60%',
    duration: 22,
    xRange: [-80, 50, -60, 70, -80],
    yRange: [40, -70, 30, -50, 40],
    scaleRange: [0.95, 1.12, 1, 1.18, 0.95],
  },
  {
    id: 4,
    color: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.02) 45%, transparent 70%)',
    size: 620,
    initialX: '25%',
    initialY: '75%',
    duration: 30,
    xRange: [70, -50, 80, -40, 70],
    yRange: [-60, 50, -40, 70, -60],
    scaleRange: [1, 1.2, 0.92, 1.08, 1],
  },
  {
    id: 5,
    color: 'radial-gradient(circle, rgba(230, 255, 148, 0.08) 0%, transparent 65%)',
    size: 500,
    initialX: '50%',
    initialY: '45%',
    duration: 28,
    xRange: [-40, 60, -80, 40, -40],
    yRange: [50, -40, 60, -70, 50],
    scaleRange: [1.05, 0.95, 1.15, 0.9, 1.05],
  },
];

function FloatingOrb({ orb, isMobile }) {
  const orbSize = isMobile ? Math.round(orb.size * 0.6) : orb.size;
  return (
    <motion.div
      style={{
        position: 'fixed',
        width: orbSize,
        height: orbSize,
        borderRadius: '50%',
        background: orb.color,
        left: orb.initialX,
        top: orb.initialY,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
        filter: 'blur(30px)',
      }}
      animate={{
        x: orb.xRange,
        y: orb.yRange,
        scale: orb.scaleRange,
      }}
      transition={{
        duration: orb.duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function AmbientBackground() {
  const [hasMouse, setHasMouse] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Ultra-smooth spring cursor follower
  const springConfig = { damping: 28, stiffness: 90, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect mobile/tablet on mount and on resize
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!hasMouse) setHasMouse(true);
    };

    const handleMouseLeave = () => {
      mouseX.set(-500);
      mouseY.set(-500);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasMouse, mouseX, mouseY]);

  /* On mobile: show only the 2 most impactful orbs (coral + blue) and scale them down.
     On desktop: show all 5 for the full ambient experience. */
  const visibleOrbs = useMemo(
    () => (isMobile ? orbs.slice(0, 2) : orbs),
    [isMobile]
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Drifting Ambient Gradient Orbs */}
      {visibleOrbs.map((orb) => (
        <FloatingOrb key={orb.id} orb={orb} isMobile={isMobile} />
      ))}

      {/* Interactive Cursor Spotlight Glow — desktop only */}
      {hasMouse && !isMobile && (
        <motion.div
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: 600,
            height: 600,
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(238, 77, 56, 0.08) 0%, rgba(238, 77, 56, 0.02) 40%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'blur(20px)',
          }}
        />
      )}

      {/* Subtle Noise / Grid Texture layer for depth */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `radial-gradient(var(--color-dot-grid, rgba(255, 255, 255, 0.04)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.8,
          pointerEvents: 'none',
          zIndex: 0,
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
        }}
      />
    </div>
  );
}

