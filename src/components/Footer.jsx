import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="#hero" className="footer-logo">
          <span className="logo-bracket">&lt;</span>YAH<span className="logo-bracket">/&gt;</span>
        </a>
        <p className="footer-copy">
          Designed & built by <span>Yaser Al-Hameedi</span> · {new Date().getFullYear()}
        </p>
        <div className="footer-links">
          <a href="https://github.com/Yaser-Al-Hameedi" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/yaser-al-hameedi/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:yaseralhameedi@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  )
}
