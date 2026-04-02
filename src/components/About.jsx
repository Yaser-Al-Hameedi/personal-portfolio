import { useEffect, useRef } from 'react'
import './About.css'

const highlights = [
  { icon: '🎓', label: 'University of Bridgeport', sub: 'B.S. Computer Science · Minor in Mathematics' },
  { icon: '🏢', label: 'NSBE Member', sub: 'National Society of Black Engineers' },
  { icon: '📧', label: 'yaseralhameedi@gmail.com', sub: 'Available for opportunities' },
]

const stats = [
  { value: '2', label: 'Internships' },
  { value: '180K+', label: 'Requests/hr served' },
  { value: '2', label: 'Production projects' },
  { value: '15+', label: 'Technologies' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
              el.classList.add('visible')
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="section about-section" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          {/* Left: Text */}
          <div className="about-text">
            <span className="section-label reveal">/ about me</span>
            <h2 className="section-title reveal delay-1">
              Passionate about building<br />
              <span>things that matter</span>
            </h2>
            <div className="section-divider reveal delay-2" />

            <p className="about-para reveal delay-2">
              I'm a Computer Science student at the University of Bridgeport. I've had the
              opportunity to work at industry leaders like <strong>M&T Bank</strong> and <strong>IBM</strong>,
              where I shipped production code serving hundreds of thousands of requests per hour
              and participated in a cloud-native engineering fellowship.
            </p>
            <p className="about-para reveal delay-3">
              I thrive at the intersection of backend engineering and AI — whether
              that's designing RESTful APIs in Java & Spring Boot or Python & FastAPI,
              building ML pipelines, or architecting full-stack products from scratch.
              I care deeply about writing clean, tested, maintainable code.
            </p>
            <p className="about-para reveal delay-4">
              Outside of coursework, I built{' '}
              <span className="highlight-text">SnapVault</span> — an AI document management
              platform that automated document organization and replaced hours of weekly manual
              data entry with a 30-second daily photo upload, streamlining bookkeeping across
              multiple store locations.
            </p>

            <div className="about-cta reveal delay-5">
              <a href="#experience" className="btn btn-primary">
                My Experience
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Cards */}
          <div className="about-right">
            {/* Avatar / Photo placeholder */}
            <div className="avatar-wrapper reveal-right delay-1">
              <div className="avatar-frame">
                <div className="avatar-inner">
                  <img src="/headshot.JPG" alt="Yaser Al-Hameedi" className="avatar-photo" />
                  <div className="avatar-ring" />
                </div>
              </div>
              <div className="avatar-badge">
                <span className="badge-dot" />
                <span>Open to opportunities</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="about-highlights reveal-right delay-2">
              {highlights.map(({ icon, label, sub }) => (
                <div key={label} className="highlight-card">
                  <span className="highlight-icon">{icon}</span>
                  <div>
                    <div className="highlight-label">{label}</div>
                    <div className="highlight-sub">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="stats-bar reveal delay-3">
          {stats.map(({ value, label }) => (
            <div key={label} className="stat-item">
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
