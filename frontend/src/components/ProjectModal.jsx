import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ProjectModal({ project, onClose }) {
  // Close on Escape key + lock body scroll only while open
  useEffect(() => {
    if (!project) return; // do nothing when modal is closed

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="project-modal__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            className="project-modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Preview: ${project.title}`}
          >
            {/* Header bar */}
            <div className="project-modal__header">
              <div className="project-modal__meta">
                <span className="project-modal__tag">{project.category}</span>
                <h3 className="project-modal__title">{project.title}</h3>
              </div>
              <div className="project-modal__actions">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-modal__open-btn"
                  title="Open in new tab"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Open site
                </a>
                <button
                  className="project-modal__close"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* iFrame */}
            <div className="project-modal__frame-wrap">
              <iframe
                src={project.url}
                title={project.title}
                className="project-modal__iframe"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
