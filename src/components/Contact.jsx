import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

// ─── EmailJS config ───────────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (Gmail) → copy the Service ID
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
//    Set "To Email" to yaseralhameedi@gmail.com
// 4. Copy your Public Key from Account → API Keys
// Then replace the three placeholders below (or use a .env file):
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY'
// ─────────────────────────────────────────────────────────────────────────────

const socials = [
  {
    name: 'Email',
    value: 'yaseralhameedi@gmail.com',
    href: 'mailto:yaseralhameedi@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: '#6c63ff',
  },
  {
    name: 'LinkedIn',
    value: 'linkedin.com/in/yaser-al-hameedi',
    href: 'https://www.linkedin.com/in/yaser-al-hameedi/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: '#0077b5',
  },
  {
    name: 'GitHub',
    value: 'github.com/Yaser-Al-Hameedi',
    href: 'https://github.com/Yaser-Al-Hameedi',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    color: '#6e5494',
  },
  {
    name: 'Phone',
    value: '203-544-3844',
    href: 'tel:2035443844',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
    color: '#10b981',
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [formState, setFormState] = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

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

  const handleChange = e => setFormState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('SERVICE:', EMAILJS_SERVICE_ID)
    console.log('TEMPLATE:', EMAILJS_TEMPLATE_ID)
    console.log('KEY:', EMAILJS_PUBLIC_KEY)
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formState.from_name,
          from_email: formState.from_email,
          message: formState.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )
      setStatus('success')
      setFormState({ from_name: '', from_email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="section contact-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal" style={{ textAlign: 'center' }}>
          <span className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>/ contact</span>
          <h2 className="section-title">
            Let's <span>Work Together</span>
          </h2>
          <p className="contact-intro">
            I'm actively looking for new opportunities — whether it's a full-time role,
            internship, or interesting project. My inbox is always open.
          </p>
          <div className="section-divider" style={{ margin: '0 auto 60px' }} />
        </div>

        <div className="contact-grid">
          {/* Left: Form */}
          <div className="contact-form-wrapper reveal-left delay-1">
            <h3 className="contact-form-title">Send a Message</h3>
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="from_name">Name</label>
                  <input
                    id="from_name"
                    name="from_name"
                    type="text"
                    placeholder="Your name"
                    value={formState.from_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="from_email">Email</label>
                  <input
                    id="from_email"
                    name="from_email"
                    type="email"
                    placeholder="your@email.com"
                    value={formState.from_email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about the opportunity, project, or just say hi..."
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className={`btn btn-primary form-submit ${status}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' && (
                  <>
                    <svg className="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="17" height="17">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Sending...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Message Sent!
                  </>
                )}
                {status === 'error' && (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    Failed — try again
                  </>
                )}
                {status === 'idle' && (
                  <>
                    Send Message
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Contact cards */}
          <div className="contact-info reveal-right delay-2">
            <h3 className="contact-form-title">Or Reach Me Directly</h3>
            <div className="social-cards">
              {socials.map(({ name, value, href, icon, color }) => (
                <a key={name} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="social-card">
                  <div className="social-card-icon" style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}>
                    {icon}
                  </div>
                  <div className="social-card-text">
                    <span className="social-card-name">{name}</span>
                    <span className="social-card-value">{value}</span>
                  </div>
                  <svg className="social-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>

            <div className="availability-card">
              <div className="avail-dot" />
              <div>
                <div className="avail-title">Available for opportunities</div>
                <div className="avail-sub">Open to full-time roles & internships</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
