import { useEffect, useRef } from 'react'
import './Skills.css'

const categories = [
  {
    name: 'Languages',
    icon: '💻',
    color: '#6c63ff',
    skills: [
      { name: 'Java', level: 'Proficient' },
      { name: 'Python', level: 'Proficient' },
      { name: 'JavaScript', level: 'Proficient' },
      { name: 'SQL', level: 'Proficient' },
      { name: 'TypeScript', level: 'Familiar' },
      { name: 'HTML & CSS', level: 'Proficient' },
      { name: 'C++', level: 'Familiar' },
      { name: 'Kotlin', level: 'Familiar' },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    icon: '⚡',
    color: '#00d4ff',
    skills: [
      { name: 'Spring Boot', level: 'Proficient' },
      { name: 'React.js', level: 'Proficient' },
      { name: 'FastAPI', level: 'Proficient' },
      { name: 'Node.js', level: 'Proficient' },
      { name: 'scikit-learn', level: 'Proficient' },
      { name: 'Express', level: 'Familiar' },
      { name: 'React Native', level: 'Familiar' },
      { name: 'PyTorch / TensorFlow', level: 'Familiar' },
    ],
  },
  {
    name: 'Tools & Platforms',
    icon: '🛠️',
    color: '#8b5cf6',
    skills: [
      { name: 'Git & GitHub', level: 'Proficient' },
      { name: 'PostgreSQL', level: 'Proficient' },
      { name: 'Redis', level: 'Proficient' },
      { name: 'Docker', level: 'Familiar' },
      { name: 'AWS', level: 'Familiar' },
      { name: 'MongoDB', level: 'Familiar' },
      { name: 'Azure', level: 'Familiar' },
      { name: 'Kubernetes', level: 'Familiar' },
    ],
  },
  {
    name: 'Methodologies',
    icon: '🔄',
    color: '#10b981',
    skills: [
      { name: 'REST API Design', level: 'Proficient' },
      { name: 'Agile / SCRUM', level: 'Proficient' },
      { name: 'Unit & Integration Testing', level: 'Proficient' },
      { name: 'CI/CD Pipelines', level: 'Familiar' },
      { name: 'System Design', level: 'Familiar' },
    ],
  },
]

const allTech = [
  'Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'Kotlin', 'HTML', 'CSS', 'SQL',
  'Spring Boot', 'React.js', 'React Native', 'Node.js', 'Express', 'FastAPI',
  'TensorFlow', 'scikit-learn', 'PyTorch',
  'Git', 'Docker', 'AWS', 'Azure', 'Kubernetes', 'Redis',
  'PostgreSQL', 'MongoDB', 'Supabase', 'SQLite',
  'Jira', 'Claude API', 'OpenCV', 'Celery',
]

const LEVEL_COLORS = {
  Proficient: { color: '#6c63ff', bg: 'rgba(108,99,255,0.12)', border: 'rgba(108,99,255,0.3)' },
  Familiar:   { color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.2)' },
}

export default function Skills() {
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
    <section id="skills" className="section skills-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">/ skills</span>
          <h2 className="section-title">
            My <span>Tech Stack</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div className="skills-grid reveal delay-1">
          {categories.map((cat) => (
            <div key={cat.name} className="skill-category">
              <div className="skill-cat-header">
                <span className="skill-cat-icon">{cat.icon}</span>
                <h3 className="skill-cat-name" style={{ color: cat.color }}>{cat.name}</h3>
              </div>
              <div className="skill-pills">
                {cat.skills.map((skill) => {
                  const style = LEVEL_COLORS[skill.level]
                  return (
                    <div key={skill.name} className="skill-pill-row">
                      <span className="skill-pill-name">{skill.name}</span>
                      <span
                        className="skill-level-badge"
                        style={{ color: style.color, background: style.bg, border: `1px solid ${style.border}` }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* All tech pill cloud */}
        <div className="tech-cloud-wrapper reveal delay-3">
          <h3 className="tech-cloud-title">All Technologies</h3>
          <div className="tech-cloud">
            {allTech.map((tech, i) => (
              <span key={tech} className="tech-pill" style={{ animationDelay: `${i * 0.05}s` }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
