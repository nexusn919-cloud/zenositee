// Zeno — shared chrome

const ZenoLogo = ({ size = 26 }) => (
  <img src="assets/zeno-logo.png" width={size} height={size} alt="Zeno" />
);

const Nav = ({ active }) => {
  const links = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "features.html", label: "Features", key: "features" },
    { href: "downloads.html", label: "Download", key: "downloads" },
    { href: "credits.html", label: "Credits", key: "credits" },
  ];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="home.html" className="brand">
          <span className="brand-mark"><ZenoLogo /></span>
          <span>Zeno</span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.key} href={l.href} className={active === l.key ? "active" : ""}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <a href="https://github.com/4dammmm/Zeno-Client" target="_blank" rel="noopener" className="nav-icon-btn" title="GitHub" aria-label="GitHub">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91c.58.11.79-.25.79-.56v-1.97c-3.2.7-3.87-1.54-3.87-1.54c-.52-1.33-1.27-1.68-1.27-1.68c-1.04-.71.08-.7.08-.7c1.15.08 1.76 1.18 1.76 1.18c1.02 1.75 2.68 1.24 3.34.95c.1-.74.4-1.24.72-1.53c-2.55-.29-5.24-1.28-5.24-5.69c0-1.26.45-2.29 1.18-3.09c-.12-.29-.51-1.46.11-3.05c0 0 .96-.31 3.15 1.18c.91-.25 1.89-.38 2.86-.38c.97 0 1.95.13 2.86.38c2.19-1.49 3.15-1.18 3.15-1.18c.62 1.59.23 2.76.11 3.05c.74.8 1.18 1.83 1.18 3.09c0 4.42-2.69 5.4-5.25 5.68c.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56c4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z"/></svg>
          </a>
          <a href="https://discord.gg/DEay3QEt5y" target="_blank" rel="noopener" className="nav-icon-btn" title="Discord" aria-label="Discord">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25a.08.08 0 0 1 .08-.01c3.44 1.57 7.15 1.57 10.55 0a.08.08 0 0 1 .08.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95z"/></svg>
          </a>
          <a href="downloads.html" className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 13 }}>Download</a>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-inner">
        <span></span>
        <span></span>
      </div>
    </div>
  </footer>
);

Object.assign(window, { ZenoLogo, Nav, Footer });
