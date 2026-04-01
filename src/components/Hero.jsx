import { useEffect, useRef, useState } from 'react'
import './Hero.css'

const ROLES = [
  'Software Engineer',
  'Full Stack Developer',
  'Backend Engineer',
  'CS Student @ UBridgeport',
]

function useTypewriter(words, speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState('typing') // typing | pausing | erasing

  useEffect(() => {
    const word = words[wordIndex % words.length]
    let timeout

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), speed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pause)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('erasing'), 200)
    } else if (phase === 'erasing') {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2)
      } else {
        setWordIndex(i => i + 1)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, phase, wordIndex, words, speed, pause])

  return displayed
}

export default function Hero() {
  const canvasRef = useRef(null)
  const role = useTypewriter(ROLES)

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrame
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.3
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.opacity = Math.random() * 0.5 + 0.1
        this.color = Math.random() > 0.5 ? '108,99,255' : '0,212,255'
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height)
          this.reset()
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color},${this.opacity})`
        ctx.fill()
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle())

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      drawConnections()
      animFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="hero-content">
        <div className="hero-greeting reveal visible">
          <span className="greeting-line" />
          <span className="greeting-text">Hi, my name is</span>
          <span className="greeting-line" />
        </div>

        <h1 className="hero-name reveal visible delay-1">
          Yaser Al-Hameedi
        </h1>

        <div className="hero-role reveal visible delay-2">
          <span className="role-text">{role}</span>
          <span className="cursor">|</span>
        </div>

        <p className="hero-bio reveal visible delay-3">
          CS student at University of Bridgeport building scalable software —
          from high-throughput banking APIs to AI-powered document platforms.
          I love turning complex problems into clean, reliable systems.
        </p>

        <div className="hero-actions reveal visible delay-4">
          <a href="#projects" className="btn btn-primary">
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#contact" className="btn btn-outline">
            Get In Touch
          </a>
        </div>

        <div className="hero-socials reveal visible delay-5">
          <a href="https://github.com/Yaser-Al-Hameedi" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/yaser-al-hameedi/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="mailto:yaseralhameedi@gmail.com" className="social-link" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>

      <a href="#about" className="hero-scroll-indicator" aria-label="Scroll down">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll</span>
      </a>
    </section>
  )
}
