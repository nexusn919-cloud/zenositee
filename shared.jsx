// Zeno — shared chrome

const ZenoLogo = ({ size = 26 }) => (
  <img src="assets/zeno-logo.png" width={size} height={size} alt="Zeno" />
);

const Nav = ({ active }) => {
  const links = [
    { href: "/", label: "Home", key: "home" },
    { href: "features.html", label: "Features", key: "features" },
    { href: "downloads.html", label: "Download", key: "downloads" },
    { href: "credits.html", label: "Credits", key: "credits" },
  ];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="/" className="brand">
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
          <a href="https://github.com" target="_blank" rel="noopener" className="nav-icon-btn" title="GitHub" aria-label="GitHub">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91c.58.11.79-.25.79-.56v-1.97c-3.2.7-3.87-1.54-3.87-1.54c-.52-1.33-1.27-1.68-1.27-1.68c-1.04-.71.08-.7.08-.7c1.15.08 1.76 1.18 1.76 1.18c1.02 1.75 2.68 1.24 3.34.95c.1-.74.4-1.24.72-1.53c-2.55-.29-5.24-1.28-5.24-5.69c0-1.26.45-2.29 1.18-3.09c-.12-.29-.51-1.46.11-3.05c0 0 .96-.31 3.15 1.18c.91-.25 1.89-.38 2.86-.38c.97 0 1.95.13 2.86.38c2.19-1.49 3.15-1.18 3.15-1.18c.62 1.59.23 2.76.11 3.05c.74.8 1.18 1.83 1.18 3.09c0 4.42-2.69 5.4-5.25 5.68c.41.36.78 1.06.78 2.13v3.16c0 .31.21.67.8.56c4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.65 18.35.5 12 .5z"/></svg>
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener" className="nav-icon-btn" title="Discord" aria-label="Discord">
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
        <span>© 2026 Zeno · Minecraft 1.21.11</span>
        <span>Not affiliated with Mojang or Microsoft</span>
      </div>
    </div>
  </footer>
);

// Particle network background — connected dots that react to mouse.
// Reads window.__zenoTweaks for { density, energy, dotColor, lineColor, mouseColor }
const ParticleBG = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -9999, y: -9999, active: false };
    let particles = [];
    const cfg = () => window.__zenoTweaks || {};

    const resize = () => {
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      const density = (cfg().density ?? 50) / 50; // 0..2
      const count = Math.min(180, Math.floor((w * h) / 18000 * density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.6,
      }));
    };
    // Re-spawn particles when tweaks change
    window.__zenoParticleResize = resize;
    resize();
    addEventListener("resize", resize);

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999; };
    addEventListener("mousemove", onMove);
    addEventListener("mouseout", onLeave);

    const tick = () => {
      const c = cfg();
      const energy = (c.energy ?? 50) / 50; // 0..2
      const linkDist = 130;
      const mouseDist = 160;
      const dotColor = c.dotColor || "rgba(150, 190, 255, 0.85)";
      const lineColor = c.lineColor || "91, 155, 255";
      const mouseColor = c.mouseColor || "184, 212, 255";
      ctx.clearRect(0, 0, w, h);
      // mouse repel + draw
      for (const p of particles) {
        if (mouse.active) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < mouseDist * mouseDist && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (mouseDist - d) / mouseDist * 0.6;
            p.vx += (dx / d) * f * 0.4 * energy;
            p.vy += (dy / d) * f * 0.4 * energy;
          }
        }
        p.vx *= 0.985; p.vy *= 0.985;
        p.x += p.vx * energy; p.y += p.vy * energy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > w) { p.x = w; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > h) { p.y = h; p.vy *= -1; }
        // base drift
        p.vx += (Math.random() - 0.5) * 0.01 * energy;
        p.vy += (Math.random() - 0.5) * 0.01 * energy;

        ctx.beginPath();
        ctx.fillStyle = dotColor;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / linkDist) * 0.35;
            ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // mouse links
        if (mouse.active) {
          const a = particles[i];
          const dx = a.x - mouse.x, dy = a.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < mouseDist * mouseDist) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / mouseDist) * 0.5;
            ctx.strokeStyle = `rgba(${mouseColor}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseout", onLeave);
    };
  }, []);
  return <canvas ref={ref} className="particle-bg"></canvas>;
};

// Reveal-on-scroll wrapper
const Reveal = ({ children, delay = 0, as = "div", ...rest }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add("visible"), delay); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  const Tag = as;
  return <Tag ref={ref} {...rest} className={"reveal " + (rest.className || "")}>{children}</Tag>;
};

Object.assign(window, { ZenoLogo, Nav, Footer, ParticleBG, Reveal });

// --- removed legacy code below ---
const _removed = () => {
  const starRef = React.useRef(null);
  const coreRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const star = starRef.current, core = coreRef.current, canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = innerWidth / 2, my = innerHeight / 2;
    let cx = mx, cy = my;
    const particles = [];
    const isInteractive = (el) => !!el?.closest?.("a, button, .filter-chip, .feat-item, .person, .nav-icon-btn, input, textarea, [role='button']");

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      const interactive = isInteractive(e.target);
      star.classList.toggle("hover", interactive);
      core.classList.toggle("hover", interactive);
      star.classList.remove("hidden"); core.classList.remove("hidden");
      // emit stardust
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 6,
          y: my + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3 + 0.2,
          life: 1,
          size: 0.8 + Math.random() * 1.6,
          hue: 200 + Math.random() * 40,
        });
      }
      if (particles.length > 220) particles.splice(0, particles.length - 220);
    };
    const onLeave = () => { star.classList.add("hidden"); core.classList.add("hidden"); };

    const onDown = (e) => {
      // cosmic ring burst
      for (let i = 0; i < 2; i++) {
        const burst = document.createElement("div");
        burst.className = "click-burst" + (i === 1 ? " b2" : "");
        burst.style.left = e.clientX + "px";
        burst.style.top = e.clientY + "px";
        document.body.appendChild(burst);
        setTimeout(() => burst.remove(), 950);
      }
      // particle explosion
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2;
        const s = 1 + Math.random() * 2.5;
        particles.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(a) * s, vy: Math.sin(a) * s,
          life: 1, size: 1.2 + Math.random() * 1.5,
          hue: 200 + Math.random() * 50,
        });
      }
    };

    let raf = 0;
    const tick = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      star.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      core.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.97; p.vy *= 0.97;
        p.life -= 0.018;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        const alpha = p.life;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 78%, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 70%, ${alpha})`;
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Page transition: intercept internal link clicks
  React.useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!href || href.startsWith("#") || a.target === "_blank") return;
      // only same-origin internal pages
      if (!/^[\w\-/.]+\.html(\?.*)?$/.test(href) && href !== ".") return;
      e.preventDefault();
      const curtain = document.createElement("div");
      curtain.className = "page-curtain in";
      // sprinkle stars
      for (let i = 0; i < 24; i++) {
        const s = document.createElement("div");
        s.className = "page-curtain-star";
        s.style.left = Math.random() * 100 + "%";
        s.style.top = Math.random() * 100 + "%";
        s.style.animationDelay = (Math.random() * 0.4) + "s";
        curtain.appendChild(s);
      }
      document.body.appendChild(curtain);
      setTimeout(() => { window.location.href = href; }, 480);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
};
