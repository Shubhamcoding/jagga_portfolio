import { motion, AnimatePresence } from 'motion/react';
import { useForm, ValidationError } from '@formspree/react';
import AnimatedSection, { AnimatedItem } from './AnimatedSection';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const [state, handleSubmit] = useForm("mnpaplwg");

  return (
    <AnimatedSection id="contact" className="section-dark">
      <div className="contact__layout">
        <AnimatedItem className="contact__info">
          <h2 className="contact__heading">
            Let's build something <span className="accent-text">great.</span>
          </h2>
          <p className="contact__description">
            Have a project in mind, need technical advice, or just want to discuss ideas? 
            Fill out the form and we'll get back to you within 24 hours.
          </p>

          <div className="contact__details">
            <div className="contact__detail-item">
              <span className="contact__detail-icon">⚡</span>
              <div>
                <strong className="contact__detail-title">Quick Response</strong>
                <p className="contact__detail-sub">Replies within 24 hours</p>
              </div>
            </div>
            <div className="contact__detail-item">
              <span className="contact__detail-icon">🌏</span>
              <div>
                <strong className="contact__detail-title">Location & Timezone</strong>
                <p className="contact__detail-sub">India (UTC+5:30) · Global Clients</p>
              </div>
            </div>
          </div>
        </AnimatedItem>

        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          id="contact-form"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.2 }}
        >
          <div className="contact__form-row">
            <motion.div
              className="contact__form-group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.3 }}
            >
              <input
                type="text"
                id="contact-name"
                name="name"
                placeholder="Full Name*"
                required
                maxLength={60}
                className="contact__input"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </motion.div>
            <motion.div
              className="contact__form-group"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.4 }}
            >
              <input
                type="email"
                id="contact-email"
                name="email"
                placeholder="Email Address*"
                required
                maxLength={100}
                className="contact__input"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </motion.div>
          </div>

          <motion.div
            className="contact__form-group contact__form-group--textarea"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.5 }}
          >
            <textarea
              id="contact-message"
              name="message"
              placeholder="Let us know how we can help you*"
              required
              rows="4"
              className="contact__input contact__textarea"
              onInput={(e) => {
                let text = e.target.value;
                
                const maxWords = 300;
                const match = text.match(new RegExp(`^(\\s*\\S+){0,${maxWords}}\\s*`));
                if (match && match[0].length < text.length) {
                  text = match[0];
                }

                const maxWordLength = 25;
                text = text.replace(new RegExp(`(\\S{${maxWordLength}})\\S+`, 'g'), '$1');

                if (text !== e.target.value) {
                  e.target.value = text;
                }

                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </motion.div>

          <MagneticButton
            type="submit"
            className="btn btn-primary contact__submit"
            disabled={state.submitting}
            id="contact-submit"
            strength={0.25}
          >
            {state.submitting ? (
              <>
                <span className="contact__spinner" />
                Sending...
              </>
            ) : (
              <>
                Submit
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </MagneticButton>

          <AnimatePresence mode="wait">
            {state.succeeded && (
              <motion.div
                key="success"
                className="contact__status contact__status--success"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                Message sent successfully! We'll get back to you within 24 hours.
              </motion.div>
            )}
            {state.errors && state.errors.length > 0 && (
              <motion.div
                key="error"
                className="contact__status contact__status--error"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                Failed to send. Please check the fields and try again.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </AnimatedSection>
  );
}
