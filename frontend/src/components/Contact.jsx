import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedSection, { AnimatedItem } from './AnimatedSection';
import MagneticButton from './MagneticButton';

const API_URL = 'http://localhost:5000/api/contact';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <AnimatedSection id="contact" className="section-light">
      <div className="contact__layout">
        <AnimatedItem className="contact__info">
          <h2 className="contact__heading">
            Are you <span className="accent-text">ready?</span>
          </h2>
          <p className="contact__description">
            The most forward-thinking leaders aren't just adopting new tools. 
            They are taking Business Creativity to the next level. To not 
            simply outperform the market, but to Outcreate it.
          </p>
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
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name*"
                required
                className="contact__input"
              />
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address*"
                required
                className="contact__input"
              />
            </motion.div>
          </div>

          <motion.div
            className="contact__form-group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.5 }}
          >
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Let us know how we can help you*"
              required
              rows="4"
              className="contact__input contact__textarea"
            />
          </motion.div>

          <MagneticButton
            type="submit"
            className="btn btn-primary contact__submit"
            disabled={status === 'sending'}
            id="contact-submit"
            strength={0.25}
          >
            {status === 'sending' ? (
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
            {status === 'success' && (
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
            {status === 'error' && (
              <motion.div
                key="error"
                className="contact__status contact__status--error"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {errorMessage || 'Failed to send. Please try again.'}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </AnimatedSection>
  );
}
