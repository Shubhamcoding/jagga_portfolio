import { useState } from 'react';
import SectionWrapper from './SectionWrapper';

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
    <SectionWrapper id="contact" className="section-light">
      <div className="contact__layout">
        <div className="contact__info animate-on-scroll">
          <h2 className="contact__heading">
            Are you <span className="accent-text">ready?</span>
          </h2>
          <p className="contact__description">
            The most forward-thinking leaders aren't just adopting new tools. 
            They are taking Business Creativity to the next level. To not 
            simply outperform the market, but to Outcreate it.
          </p>
        </div>

        <form className="contact__form animate-on-scroll stagger-2" onSubmit={handleSubmit} id="contact-form">
          <div className="contact__form-row">
            <div className="contact__form-group">
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
            </div>
            <div className="contact__form-group">
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
            </div>
          </div>

          <div className="contact__form-group">
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
          </div>

          <button
            type="submit"
            className="btn btn-primary contact__submit"
            disabled={status === 'sending'}
            id="contact-submit"
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
          </button>

          {status === 'success' && (
            <div className="contact__status contact__status--success">
              ✓ Message sent successfully! We'll get back to you within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div className="contact__status contact__status--error">
              ✕ {errorMessage || 'Failed to send. Please try again.'}
            </div>
          )}
        </form>
      </div>
    </SectionWrapper>
  );
}
