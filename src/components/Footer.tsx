export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">typo.</div>
        <p className="footer-copyright">© {currentYear} typodot.app</p>

        <nav className="footer-links" aria-label="フッターリンク">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a href="mailto:contact@typodot.app">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
