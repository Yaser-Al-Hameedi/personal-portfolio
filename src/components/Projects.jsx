import { useEffect, useRef, useState } from 'react'
import './Projects.css'

const projects = [
  {
    id: 'snapvault',
    title: 'SnapVault',
    subtitle: 'AI Document Management Platform',
    period: 'Sep 2025 – Dec 2025',
    status: 'Completed',
    statusColor: '#10b981',
    description:
      'A full-stack AI-powered document management platform that processes business documents in 7–10 seconds per upload using an OCR-driven ingestion pipeline with GPT-based extraction.',
    highlights: [
      '100+ real business documents processed in production',
      'Improved OCR accuracy from ~30% to 70–80% on phone photos via multi-stage OpenCV preprocessing (CLAHE, denoising, adaptive thresholding)',
      '10-file batch uploads in under 20 seconds with parallel processing via Redis + Celery workers',
      'Extended into a multi-store bookkeeping system, replacing weekly manual data entry with a 30-second daily photo upload',
    ],
    tags: ['React', 'JavaScript', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'Google Cloud Vision', 'OpenCV', 'GPT', 'Tailwind CSS'],
    gradient: 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
    icon: '📄',
    image: '/snapvault.png',
    links: {
      github: 'https://github.com/Yaser-Al-Hameedi',
    },
  },
  {
    id: 'cloudcrop',
    title: 'CloudCrop',
    subtitle: 'Autonomous Irrigation System — Senior Project',
    period: 'Jan 2026 – Present',
    status: 'In Progress',
    statusColor: '#f59e0b',
    description:
      'An autonomous garden irrigation system running on a Raspberry Pi 3B+ that uses a Random Forest regression model to predict optimal water amounts and trigger a GPIO-controlled pump.',
    highlights: [
      'Integrates soil moisture, temperature, and light sensors with ML-driven irrigation decisions',
      'Platform abstraction layer with mock sensor classes enables full pipeline testing on Mac before Pi deployment',
      'REST API with FastAPI exposing sensor readings, weather forecasts, and watering history via CORS-enabled endpoints',
      'Automated sensor reads every 15 min & OpenWeatherMap forecasts every hour via APScheduler, with safety cooldown limits',
    ],
    tags: ['Python', 'FastAPI', 'SQLite', 'scikit-learn', 'Random Forest', 'Raspberry Pi', 'RPi.GPIO', 'APScheduler', 'OpenWeatherMap API'],
    gradient: 'linear-gradient(135deg, #00d4ff, #10b981)',
    icon: '🌱',
    links: {
      github: 'https://github.com/Yaser-Al-Hameedi',
    },
  },
]

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`project-card reveal delay-${index + 1}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow effect */}
      <div className="card-glow" style={{ background: project.gradient, opacity: hovered ? 0.08 : 0 }} />

      {/* Thumbnail */}
      {project.image && (
        <div className="card-thumbnail">
          <img src={project.image} alt={project.title} />
        </div>
      )}

      {/* Top bar */}
      <div className="card-top">
        <div className="card-icon" style={{ background: `${project.gradient}`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2rem' }}>
          {project.icon}
        </div>
        <div className="card-header-right">
          <span
            className="project-status"
            style={{ color: project.statusColor, borderColor: `${project.statusColor}44`, background: `${project.statusColor}12` }}
          >
            <span className="status-dot" style={{ background: project.statusColor }} />
            {project.status}
          </span>
          <span className="project-period">{project.period}</span>
        </div>
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-desc">{project.description}</p>

      {/* Highlights */}
      <ul className="project-highlights">
        {project.highlights.map((h, i) => (
          <li key={i} className="project-highlight">
            <span className="highlight-dot" style={{ background: project.gradient }} />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="project-tags">
        {project.tags.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* Links */}
      <div className="project-links">
        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View on GitHub
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
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
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="section projects-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">/ projects</span>
          <h2 className="section-title">
            Things I've <span>Built</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="projects-more reveal delay-3">
          <p>More projects on GitHub →</p>
          <a href="https://github.com/Yaser-Al-Hameedi" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  )
}
