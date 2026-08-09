import SectionWrapper from './SectionWrapper';

const team = [
  {
    id: 1,
    name: 'Arjun Mehta',
    role: 'Founder & Creative Director',
    bio: 'Visionary designer with 10+ years shaping digital brands. Obsessed with the intersection of aesthetics and conversion.',
    avatar: 'AM',
    color: '#EE4D38',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Lead Developer',
    bio: 'Full-stack engineer who turns complex ideas into elegant, performant code. React, Node, and everything in between.',
    avatar: 'PS',
    color: '#3B82F6',
  },
  {
    id: 3,
    name: 'Rohan Kapoor',
    role: 'Product Strategist',
    bio: 'Data-driven strategist who connects business goals with user needs. Expert in conversion optimization and growth.',
    avatar: 'RK',
    color: '#10B981',
  },
  {
    id: 4,
    name: 'Neha Gupta',
    role: 'UI/UX Designer',
    bio: 'Crafts stunning interfaces that users love. Specializes in design systems, micro-interactions, and accessibility.',
    avatar: 'NG',
    color: '#F59E0B',
  },
];

export default function About() {
  return (
    <SectionWrapper id="about" className="section-light">
      <div className="about__layout">
        <div className="about__story animate-on-scroll">
          <span className="section-label">About Us</span>
          <h2 className="section-title">
            We're <span className="accent-text">Jagga & Co.</span>
          </h2>
          <p className="about__description">
            We're a tight-knit team of designers, developers, and strategists who believe 
            every pixel should earn its place. We don't do cookie-cutter — we diagnose, 
            strategize, and build digital experiences that actually move the needle.
          </p>
          <p className="about__description">
            Every project starts with a discovery call where we dig deep into your 
            business, your users, and your competition. Then we wireframe, prototype, 
            test, and iterate until the result is undeniably excellent.
          </p>
          <div className="about__values">
            <div className="about__value">
              <div className="about__value-icon">🎯</div>
              <div>
                <h4 className="about__value-title">Strategy First</h4>
                <p className="about__value-desc">Research and data drive every decision.</p>
              </div>
            </div>
            <div className="about__value">
              <div className="about__value-icon">⚡</div>
              <div>
                <h4 className="about__value-title">Built for Speed</h4>
                <p className="about__value-desc">Sub-second load times, always.</p>
              </div>
            </div>
            <div className="about__value">
              <div className="about__value-icon">💎</div>
              <div>
                <h4 className="about__value-title">Pixel Perfect</h4>
                <p className="about__value-desc">Every detail is intentional and polished.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about__team">
          <h3 className="about__team-heading animate-on-scroll">Meet the Team</h3>
          <div className="about__team-grid">
            {team.map((member, index) => (
              <div
                key={member.id}
                className={`about__member card-light animate-on-scroll stagger-${index + 1}`}
                id={`team-member-${member.id}`}
              >
                <div
                  className="about__member-avatar"
                  style={{ background: member.color }}
                >
                  {member.avatar}
                </div>
                <h4 className="about__member-name">{member.name}</h4>
                <span className="about__member-role">{member.role}</span>
                <p className="about__member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
