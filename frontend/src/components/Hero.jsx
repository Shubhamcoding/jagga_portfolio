import heroBg from '../assets/images/hero-bg.png';

export default function Hero() {
  const handleScroll = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      {/* Coral particle wave background */}
      <div className="hero__particles">
        <div className="hero__particle hero__particle--1" />
        <div className="hero__particle hero__particle--2" />
        <div className="hero__particle hero__particle--3" />
      </div>

      <div className="hero__content container">
        {/* Main hero card — LTM style large rounded container */}
        <div className="hero__card">
          <div className="hero__card-bg">
            <img src={heroBg} alt="" className="hero__card-img" />
            <div className="hero__card-overlay" />
          </div>
          <div className="hero__card-content">
            <h1 className="hero__title">
              It's time to<br />
              <span className="accent-text">Outcreate</span>
            </h1>
            <p className="hero__subtitle">
              We bring human insights and intelligent systems together.
              So that you don't simply outperform the market, you Outcreate it.
            </p>
            <div className="hero__actions">
              <a href="#work" className="btn btn-primary" onClick={(e) => handleScroll(e, 'work')}>
                Learn More
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-outline" onClick={(e) => handleScroll(e, 'contact')}>
                Watch Now
                <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">50+</span>
            <span className="hero__stat-label">Projects Delivered</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">98%</span>
            <span className="hero__stat-label">Client Satisfaction</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">3x</span>
            <span className="hero__stat-label">Avg. ROI Increase</span>
          </div>
        </div>
      </div>
    </section>
  );
}
