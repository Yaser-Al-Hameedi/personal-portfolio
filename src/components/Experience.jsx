import { useEffect, useRef, useState } from 'react'
import './Experience.css'

const experiences = [
  {
    id: 'mtbank',
    role: 'Software Engineering Intern',
    company: 'M&T Bank',
    period: 'Jun 2025 – Aug 2025',
    location: 'New York, NY',
    type: 'Internship',
    color: '#00aaff',
    logo: 'M&T',
    tags: ['Java', 'Spring Boot', 'REST APIs', 'JUnit', 'Mockito', 'CI/CD'],
    bullets: [
      'Delivered a customer-facing credit card expiration tracking feature serving 180,000+ requests/hour by designing RESTful APIs in Java & Spring Boot integrated with downstream credit card data services.',
      'Reduced network overhead and eliminated redundant external API calls by refactoring data retrieval logic to fetch expiration data once from the primary account and map it across linked authorized users.',
      'Maintained zero production defects post-deployment by implementing comprehensive unit and integration tests with JUnit and Mockito covering external API integrations and edge cases.',
      'Collaborated with engineers and stakeholders across pull request reviews, API design iterations, and platform alignment.',
    ],
  },
  {
    id: 'gekko',
    role: 'Software Engineering Intern',
    company: 'Gekko Corporation',
    period: 'Sep 2024 – Apr 2025',
    location: 'Remote',
    type: 'Internship',
    color: '#6c63ff',
    logo: 'GK',
    tags: ['Python', 'AI/ML', 'Vector DB', 'IBM Granite', 'InstructLab', 'LLM'],
    bullets: [
      'Enabled AI-powered personalized health recommendations by building a Python-based parsing, chunking, and embedding pipeline for structured Apple Watch health metrics, with successful vector database ingestion.',
      'Expanded an internal AI model\'s domain knowledge by training IBM Granite LLM using the InstructLab framework with company-specific synthetic data, enabling more accurate internal workflow responses.',
    ],
  },
  {
    id: 'ibm',
    role: 'Software Fellowship',
    company: 'IBM',
    period: 'Jun 2024 – Aug 2024',
    location: 'Remote',
    type: 'Fellowship',
    color: '#00d4ff',
    logo: 'IBM',
    tags: ['React', 'Node.js', 'Full Stack', 'CRUD', 'Cloud Native'],
    bullets: [
      'Built and shipped a full-stack task management application with working CRUD functionality and secure data handling as part of an 8-week cloud-native engineering fellowship.',
      'Developed a React frontend and Node.js backend, collaborating with a cohort of engineers on modern cloud architecture patterns.',
    ],
  },
]

export default function Experience() {
  const [active, setActive] = useState('mtbank')
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

  const current = experiences.find(e => e.id === active)

  return (
    <section id="experience" className="section experience-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">/ experience</span>
          <h2 className="section-title">
            Where I've <span>Worked</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="exp-layout">
          {/* Tab list */}
          <div className="exp-tabs reveal-left delay-1">
            {experiences.map(exp => (
              <button
                key={exp.id}
                className={`exp-tab ${active === exp.id ? 'active' : ''}`}
                onClick={() => setActive(exp.id)}
                style={{ '--tab-color': exp.color }}
              >
                <span className="tab-logo" style={{ background: `${exp.color}18`, color: exp.color }}>
                  {exp.logo}
                </span>
                <div className="tab-info">
                  <span className="tab-company">{exp.company}</span>
                  <span className="tab-period">{exp.period}</span>
                </div>
                <div className="tab-indicator" />
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="exp-panel" key={active}>
            <div className="exp-panel-header">
              <div>
                <h3 className="exp-role">{current.role}</h3>
                <div className="exp-company-row">
                  <span className="exp-company-name" style={{ color: current.color }}>
                    @ {current.company}
                  </span>
                  <span className="exp-location">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {current.location}
                  </span>
                </div>
              </div>
              <div className="exp-meta">
                <span className="exp-period-badge">{current.period}</span>
                <span className="exp-type-badge" style={{ color: current.color, borderColor: `${current.color}44`, background: `${current.color}12` }}>
                  {current.type}
                </span>
              </div>
            </div>

            <ul className="exp-bullets">
              {current.bullets.map((bullet, i) => (
                <li key={i} className="exp-bullet">
                  <span className="bullet-arrow" style={{ color: current.color }}>▸</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="exp-tags">
              {current.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
