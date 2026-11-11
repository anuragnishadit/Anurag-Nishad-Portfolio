import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX, FiArrowUp, FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { profile } from "../data.js";
import { Hero, About, Skills, Experience, Projects, Education, Resume, Contact } from "../sections/Sections.jsx";

const links = ["about", "skills", "experience", "projects", "education", "resume", "contact"];

export default function Home() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem("theme", theme); }, [theme]);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <header className="nav">
        <a href="#home" className="logo" aria-label="Anurag Nishad Home">
          <img src="/logo.png" alt="Anurag Nishad Logo" />
        </a>
        <nav className={open ? "links open" : "links"}>
          {links.map((l) => <a key={l} href={"#" + l} onClick={() => setOpen(false)}>{l}</a>)}
        </nav>
        <div className="nav-actions">
          <button aria-label="Toggle theme" className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <FiSun /> : <FiMoon />}</button>
          <button aria-label="Menu" className="icon-btn burger" onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
        </div>
      </header>
      <main>
        <Hero /><About /><Skills /><Experience /><Projects /><Education /><Resume /><Contact />
        
      </main>
      
<footer className="premium-footer">
  <div className="footer-container">

    {/* Top CTA */}
    <div className="footer-top">
      <div className="footer-top-content">
        <span className="footer-eyebrow">HAVE AN IDEA?</span>
        <h2>Let's build something <span>awesome.</span></h2>
        <p>Got a project in mind? Let's discuss and create something amazing.</p>
      </div>

      <a href="#contact" className="footer-contact-btn">
        Let's Talk <FiSend />
      </a>
    </div>

    {/* Main Footer */}
    <div className="footer-content">

      {/* Logo and About */}
      <div className="footer-about">
        <div className="footer-brand">
          <div className="footer-logo-icon">AN</div>
          <div>
            <h2>Anurag Nishad</h2>
            <small>MERN STACK DEVELOPER</small>
          </div>
        </div>

        <p>
          I create modern, responsive and user-friendly
          web applications with clean code and creative ideas.
        </p>

        <div className="footer-social">
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank"
              rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          )}

          {profile.github && (
            <a href={profile.github} target="_blank"
              rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          )}

          <a href={"mailto:" + profile.email} aria-label="Email">
            <FiMail />
          </a>

          <a href={"tel:" + profile.phone.replace(/\s/g, "")}
            aria-label="Phone">
            <FiPhone />
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="footer-navigation">
        <h3>Explore</h3>
        <div className="footer-nav-list">
          {links.map((l) => (
            <a key={l} href={"#" + l}>
              <span>↗</span> {l}
            </a>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="footer-contact-info">
        <h3>Get In Touch</h3>

        <a href={"mailto:" + profile.email}>
          <FiMail />
          <span>{profile.email}</span>
        </a>

        <a href={"tel:" + profile.phone.replace(/\s/g, "")}>
          <FiPhone />
          <span>{profile.phone}</span>
        </a>

        <div className="footer-location">
          <FiMapPin />
          <span>{profile.location}</span>
        </div>
      </div>

    </div>

    {/* Bottom */}
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} Anurag Nishad. All rights reserved.</p>

      <p>Designed & Developed by Anurag Nishad.</p>

      <a href="/admin">Admin Login ↗</a>
    </div>

  </div>
</footer>

      {showTop && <button aria-label="Back to top" className="top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><FiArrowUp /></button>}
    </>
  );
}
