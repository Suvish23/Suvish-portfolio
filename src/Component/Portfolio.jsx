import { useState, useEffect, useRef } from "react";

const NAV = ["About", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    title: "Digital Twin Platform",
    tag: "Master's Research Project",
    tagColor: "#00f5c4",
    desc: "Real-time 3D digital twin integrating live IoT sensor data with an interactive Three.js/WebGL visualisation, backed by a Python data pipeline. Built at Bauhaus-Universität Weimar.",
    tech: ["React", "Three.js", "WebGL", "Python", "IoT"],
    github: "https://github.com/Suvish23/Digital-Twin",
    highlight: true,
  },
  {
    title: "Juice Shop Expense Calculator",
    tag: "Live Business Tool",
    tagColor: "#f5a623",
    desc: "Built for my family's juice shop to replace manual daily bookkeeping. A real non-technical user tracks expenses and manages inventory with this app every day.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Material UI"],
    github: "https://github.com/Suvish23/jucie_shop",
    highlight: false,
  },
  {
    title: "Mobile Store Ecommerce",
    tag: "Personal Project",
    tagColor: "#7b8cde",
    desc: "Full-stack ecommerce site with product catalogue, cart management, checkout flow, and order tracking. Independently designed and built during undergraduate studies.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "Material UI"],
    github: "https://github.com/Suvish23/Mobile_Ecommerce_Website",
    highlight: false,
  },
  {
    title: "Asset Tracker",
    tag: "Team Project",
    tagColor: "#7b8cde",
    desc: "Full-stack asset management app built in a team of 3 under mentorship. Contributed the REST API, filtering logic, and Redux state management on the frontend.",
    tech: ["React", "Redux", "Node.js", "Express", "PostgreSQL"],
    github: "https://github.com/RakeshKumarA/assetztracker",
    highlight: false,
  },
];

const SKILLS = [
  { cat: "Frontend", items: ["React", "Angular", "JavaScript", "Redux", "Material UI", "HTML/CSS"] },
  { cat: "Backend", items: ["Node.js", "Express.js", "FastAPI", "ASP.NET MVC", "Python","#C"] },
  { cat: "Database", items: ["PostgreSQL", "SQL", "REST APIs"] },
  { cat: "Tools", items: ["Git", "GitHub", "Postman", "Docker", "Agile/Scrum","JIRA","Jenkins","VS Code"] },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("suvish@email.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: "#080c10",
      color: "#c8d6e5",
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <style>{`

        /* base reset — just making sure spacing is consistent across browsers */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* teal highlight when selecting text, matches the site accent */
        ::selection {
          background: #00f5c420;
          color: #00f5c4;
        }

        /* thin custom scrollbar so it doesn't break the dark theme */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c10; }
        ::-webkit-scrollbar-thumb {
          background: #00f5c430;
          border-radius: 2px;
        }

        /* background grid overlay — fixed so it stays while scrolling */
        .grid-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(#1e2d3d18 1px, transparent 1px),
            linear-gradient(90deg, #1e2d3d18 1px, transparent 1px);
          background-size: 48px 48px;
          z-index: 0;
        }

        /* soft teal glow in the top-right corner, purely decorative */
        .glow {
          position: fixed;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, #00f5c408 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* all actual content sits above the grid and glow layers */
        .content {
          position: relative;
          z-index: 1;
        }

        /* nav buttons */
        .nav-link {
          background: none;
          border: none;
          color: #7a8fa0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          cursor: pointer;
          padding: 6px 14px;
          border-radius: 4px;
          letter-spacing: 0.03em;
          transition: color 0.2s, background 0.2s;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #00f5c4;
          background: #00f5c408;
        }

        /* hero typography */
        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(42px, 7vw, 82px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #eaf2fb;
        }

        .hero-accent {
          color: #00f5c4;
        }

        /* small uppercase label above section headings */
        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: #00f5c4;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          color: #eaf2fb;
          line-height: 1.15;
        }

        /* project and skill cards */
        .card {
          background: #0d1318;
          border: 0.5px solid #1e2d3d;
          border-radius: 12px;
          padding: 28px;
          transition: border-color 0.25s, transform 0.25s;
          cursor: default;
        }

        .card:hover {
          border-color: #00f5c430;
          transform: translateY(-3px);
        }

        /* the Digital Twin card gets a subtle green tint to make it stand out */
        .card.highlight {
          border-color: #00f5c440;
          background: #0a1a14;
        }

        /* small tag badges on project cards showing the tech stack */
        .tech-pill {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 20px;
          background: #131e28;
          border: 0.5px solid #1e2d3d;
          color: #7a8fa0;
          margin: 3px 3px 3px 0;
        }

        /* each skill row in the skills section */
        .skill-item {
          font-size: 13px;
          color: #8fa5ba;
          padding: 6px 0;
          border-bottom: 0.5px solid #0f1923;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* small teal dot before each skill name */
        .skill-item::before {
          content: '';
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #00f5c4;
          flex-shrink: 0;
        }

        /* solid teal CTA button */
        .btn-primary {
          background: #00f5c4;
          color: #080c10;
          border: none;
          padding: 12px 28px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: opacity 0.2s, transform 0.2s;
        }

        .btn-primary:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        /* outlined secondary button */
        .btn-ghost {
          background: transparent;
          color: #00f5c4;
          border: 0.5px solid #00f5c440;
          padding: 11px 24px;
          border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: background 0.2s, transform 0.2s;
        }

        .btn-ghost:hover {
          background: #00f5c408;
          transform: translateY(-1px);
        }

        /* contact section links */
        .contact-link {
          color: #7a8fa0;
          font-size: 13px;
          font-family: 'JetBrains Mono', monospace;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 0;
          border-bottom: 0.5px solid #0f1923;
          transition: color 0.2s;
        }

        .contact-link:hover {
          color: #00f5c4;
        }

        /* blinking cursor after the name in the hero */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .cursor {
          display: inline-block;
          width: 3px;
          height: 0.85em;
          background: #00f5c4;
          margin-left: 4px;
          vertical-align: middle;
          animation: blink 1.1s step-end infinite;
        }

        /* hero entrance — each line fades up with a slight delay between them */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-line1 { animation: fadeUp 0.7s ease 0.1s both; }
        .hero-line2 { animation: fadeUp 0.7s ease 0.25s both; }
        .hero-sub   { animation: fadeUp 0.7s ease 0.4s both; }
        .hero-btns  { animation: fadeUp 0.7s ease 0.55s both; }
        .hero-meta  { animation: fadeUp 0.7s ease 0.7s both; }

      `}</style>

      <div className="grid-bg" />
      <div className="glow" />

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "#080c10ee" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "0.5px solid #1e2d3d" : "none",
        transition: "all 0.3s",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 6vw",
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#00f5c4", letterSpacing: "0.08em" }}>
          SSJ<span style={{ color: "#1e2d3d" }}>.dev</span>
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {NAV.map(n => (
            <button key={n} className={`nav-link ${active === n ? "active" : ""}`} onClick={() => scrollTo(n)}>
              {n}
            </button>
          ))}
        </div>
      </nav>

      <section className="content" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 6vw 80px" }}>
        <div style={{ maxWidth: 800 }}>
          <div className="hero-line1">
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#00f5c4", letterSpacing: "0.15em" }}>
              ↳ SOFTWARE DEVELOPER
            </span>
          </div>
          <div className="hero-line2" style={{ marginTop: 20 }}>
            <h1 className="hero-title">
              Suvish<br />
              <span className="hero-accent">Sunilkumar</span><br />
              Jain<span className="cursor" />
            </h1>
          </div>
          <p className="hero-sub" style={{ marginTop: 28, fontSize: 16, lineHeight: 1.75, color: "#7a8fa0", maxWidth: 520 }}>
            Building full-stack web applications with React,Angular and FastAPI, .NET.
            MSc Computer Science @ Bauhaus-Universität Weimar.
            2 years at Siemens Gamesa. Open to software engineering roles in Europe.
          </p>
          <div className="hero-btns" style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("Projects")}>View Projects</button>
            <button className="btn-ghost" onClick={() => scrollTo("Contact")}>Get in touch</button>
          </div>
          <div className="hero-meta" style={{ marginTop: 52, display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[["2+", "Years at Siemens Gamesa"], ["4", "Projects shipped"], ["3", "Tech stacks"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: "#eaf2fb" }}>{num}</div>
                <div style={{ fontSize: 12, color: "#4a5f73", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="content" style={{ padding: "70px 6vw" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <FadeIn>
            <h2 className="section-title" style={{ marginBottom: 24 }}>Code that solves real problems</h2>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#7a8fa0", marginBottom: 16 }}>
              I'm a full-stack developer with 2 years of professional experience at Siemens Gamesa, where I built and shipped internal web tools used daily by engineering teams across departments.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#7a8fa0", marginBottom: 16 }}>
              Currently completing my Master's in Computer Science for Digital Media at Bauhaus-Universität Weimar, where I built a real-time 3D digital twin platform as my thesis project.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#7a8fa0" }}>
              One of my most meaningful projects is a business tool I built for my family's juice shop — replacing their manual daily bookkeeping with a proper full-stack app. A real user, real data, used every day.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{ background: "#0d1318", border: "0.5px solid #1e2d3d", borderRadius: 12, padding: 28 }}>
              {[
                ["Location", "Weimar, Germany"],
                ["Education", "MSc CS, Bauhaus-Uni Weimar"],
                ["Experience", "2 yrs · Siemens Gamesa"],
                ["Status", "Open to work in Europe"],
                ["Languages", "English, Hindi, Malayalam"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "0.5px solid #0f1923" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#4a5f73" }}>{k}</span>
                  <span style={{ fontSize: 13, color: "#8fa5ba" }}>{v}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="projects" className="content" style={{ padding: "70px 6vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 className="section-title" style={{ marginBottom: 48 }}>Things I've built</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div className={`card ${p.highlight ? "highlight" : ""}`} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "3px 10px",
                      borderRadius: 20, background: `${p.tagColor}15`, color: p.tagColor,
                      border: `0.5px solid ${p.tagColor}30`, letterSpacing: "0.06em"
                    }}>{p.tag}</span>
                    <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ color: "#4a5f73", fontSize: 18, textDecoration: "none", transition: "color 0.2s" }}
                      onMouseOver={e => e.target.style.color = "#00f5c4"}
                      onMouseOut={e => e.target.style.color = "#4a5f73"}>↗</a>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: "#eaf2fb", marginBottom: 12 }}>{p.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: "#5a7080", flex: 1, marginBottom: 20 }}>{p.desc}</p>
                  <div>{p.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <a href="https://github.com/Suvish23" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-ghost">View all on GitHub ↗</button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
      <section id="skills" className="content" style={{ padding: "70px 6vw" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 className="section-title" style={{ marginBottom: 48 }}>Tech I work with</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {SKILLS.map((s, i) => (
              <FadeIn key={s.cat} delay={i * 0.08}>
                <div className="card">
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#00f5c4", letterSpacing: "0.1em", marginBottom: 16 }}>{s.cat.toUpperCase()}</div>
                  {s.items.map(item => (
                    <div key={item} className="skill-item">{item}</div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="content" style={{ padding: "30px 6vw" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Let's work together</h2>
            <p style={{ fontSize: 15, color: "#5a7080", lineHeight: 1.75, marginBottom: 40 }}>
              Currently open to full-stack and software engineering roles in Germany or remote across Europe. I respond within 24 hours.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ background: "#0d1318", border: "0.5px solid #1e2d3d", borderRadius: 12, padding: "8px 0", marginBottom: 28 }}>
              <a href="https://www.linkedin.com/in/suvish-sunilkumar-jain-702766168" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ padding: "14px 24px" }}>
                <span style={{ color: "#00f5c4" }}>in</span> LinkedIn ↗
              </a>
              <a href="https://github.com/Suvish23" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ padding: "14px 24px" }}>
                <span style={{ color: "#00f5c4" }}>gh</span> GitHub ↗
              </a>
              <div className="contact-link" style={{ padding: "14px 24px", cursor: "pointer", borderBottom: "none" }} onClick={copyEmail}>
                <span style={{ color: "#00f5c4" }}>@</span>
                suvishjain@gmail.com
                <span style={{ marginLeft: "auto", fontSize: 11, color: copied ? "#00f5c4" : "#4a5f73" }}>
                  {copied ? "copied!" : "copy"}
                </span>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <button className="btn-primary" onClick={copyEmail}>
              {copied ? "Email copied!" : "Copy email address"}
            </button>
          </FadeIn>
        </div>
      </section>
      <footer className="content" style={{ padding: "32px 6vw", borderTop: "0.5px solid #0f1923", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#2a3f52" }}>
          © 2025 Suvish Sunilkumar Jain
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#2a3f52" }}>
          Built with React
        </span>
      </footer>
    </div>
  );
}