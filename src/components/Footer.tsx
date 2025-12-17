export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copyright">© {currentYear} typodot.app</p>

        <nav className="footer-links" aria-label="フッターリンク">
          <a
            href="https://github.com/koukibuu3"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://x.com/koukibuu3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter(X)
          </a>
          <a
            href="https://koukibuu3.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
          <a href="/terms.html">利用規約</a>
          <a href="/privacy.html">プライバシーポリシー</a>
        </nav>
      </div>
    </footer>
  );
}
