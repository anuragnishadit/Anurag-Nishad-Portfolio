
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";

import {
  FiDownload,
  FiEye,
  FiPhone,
  FiMail,
  FiMapPin,
  FiX,
  FiGithub,
  FiExternalLink,
  FiCopy,
  FiCheck
} from "react-icons/fi";

import {
  FaLinkedin,
  FaGithub,
  FaGraduationCap,
  FaBookOpen,
  FaSchool,
  FaBriefcase,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs
} from "react-icons/fa";

import { SiMongodb, SiExpress } from "react-icons/si";

import {
  profile,
  skills,
  education,
  experience,
  defaultProjects
} from "../data.js";

import { api } from "../api.js";


// Reusable fade-up animation wrapper
const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const Title = ({ children }) => (
  <Reveal>
    <h2 className="title">{children}</h2>
  </Reveal>
);


// Typewriter effect
function useTyping(words) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (!words?.length) return;

    const word = words[i % words.length];

    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));

        if (text.length + 1 === word.length) {
          setTimeout(() => setDel(true), 900);
        }
      } else {
        setText(word.slice(0, text.length - 1));

        if (text.length - 1 === 0) {
          setDel(false);
          setI(i + 1);
        }
      }
    }, del ? 40 : 90);

    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return text;
}


// Animated profile photo
function TiltPhoto() {
  const techs = [
    { n: "HTML5", i: <FaHtml5 />, c: "#e34f26" },
    { n: "CSS3", i: <FaCss3Alt />, c: "#1572b6" },
    { n: "JavaScript", i: <FaJs />, c: "#f7df1e" },
    { n: "React.js", i: <FaReact />, c: "#61dafb" },
    { n: "Node.js", i: <FaNodeJs />, c: "#5fa04e" },
    { n: "Express.js", i: <SiExpress />, c: "#9aa4c7" },
    { n: "MongoDB", i: <SiMongodb />, c: "#47a248" }
  ];

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rx = useSpring(
    useTransform(y, [-0.5, 0.5], [14, -14]),
    { stiffness: 150, damping: 15 }
  );

  const ry = useSpring(
    useTransform(x, [-0.5, 0.5], [-14, 14]),
    { stiffness: 150, damping: 15 }
  );

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();

    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="photo-wrap"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      <div
        className="photo-float"
        style={{ animation: "none", transform: "none" }}
      >
        <div className="photo-glow" />

        <div className="orbit">
          {techs.map((t, k) => (
            <span
              key={t.n}
              className="orb"
              style={{
                "--a": (k * 360 / techs.length) + "deg"
              }}
              title={t.n}
            >
              <span
                className="orb-icon"
                style={{ color: t.c }}
              >
                {t.i}
              </span>
            </span>
          ))}
        </div>

        <motion.div
          className="tilt"
          style={{
            rotateX: rx,
            rotateY: ry,
            transformPerspective: 800
          }}
        >
          <img
            className="photo"
            src={profile.photo}
            alt="Anurag Nishad"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}


// HERO SECTION
export function Hero() {
  const typed = useTyping(profile.titles);

  return (
    <section id="home" className="hero">
      <div className="hero-text">

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grad"
        >
          {profile.name}
        </motion.h1>

        <h3 className="typed">
          {typed}
          <span className="caret">|</span>
        </h3>

        <p className="muted">
          MERN Stack Developer building responsive, user-friendly
          web applications with React.js, Node.js, Express.js and MongoDB.
        </p>

        <div className="row">
          <a className="btn ghost" href="#projects">
            View My Work
          </a>

          <a className="btn ghost" href="#contact">
            Contact Us
          </a>
        </div>

        <div className="row social">
          {profile.linkedin && (
            <a
              aria-label="LinkedIn"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>
          )}

          {profile.github && (
            <a
              aria-label="GitHub"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>
          )}

          <a aria-label="Email" href={"mailto:" + profile.email}>
            <FiMail />
          </a>

          <a
            aria-label="Phone"
            href={"tel:" + profile.phone.replace(/\s/g, "")}
          >
            <FiPhone />
          </a>
        </div>
      </div>

      <TiltPhoto />
    </section>
  );
}


// ABOUT SECTION
export function About() {
  return (
    <section id="about">
      <Title>About Me</Title>

      <div className="grid">

        <Reveal className="card summary-card">
          <div className="summary-heading">
            <div className="summary-icon">👨‍💻</div>

            <div>
              <h4>Professional Summary</h4>
              <span className="summary-subtitle">
                MERN Stack Developer
              </span>
            </div>
          </div>

          <p className="summary-description">
            I am an enthusiastic MERN Stack Developer with a strong interest
            in building modern, responsive and user-friendly web applications.
            I have knowledge of React.js, Node.js, Express.js and MongoDB.
          </p>

          <div className="summary-footer">
            <span className="status-dot"></span>
            Passionate about learning & building projects
          </div>
        </Reveal>

        <Reveal delay={0.1} className="card">
          <h4>Education</h4>

          <div className="edu-list">
            {education.map((e) => (
              <div className="edu-row" key={e.title}>
                <b>{e.title}</b>
                <small>{e.place}, {e.loc}</small>
                <small>{e.year}</small>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="card focus-card">
          <h4>Professional Focus</h4>

          <div className="focus-list">
            <div className="focus-item">
              <span>⚛️</span>
              <p>Frontend Development - React.js</p>
            </div>

            <div className="focus-item">
              <span>🟢</span>
              <p>Backend Development - Node.js & Express.js</p>
            </div>

            <div className="focus-item">
              <span>🍃</span>
              <p>Database Management - MongoDB</p>
            </div>

            <div className="focus-item">
              <span>💻</span>
              <p>CRUD Operations & Authentication</p>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}


// SKILLS SECTION
export function Skills() {
  return (
    <section id="skills">
      <Title>Technical Skills</Title>

      <div className="grid">
        {skills.map((s, i) => (
          <Reveal
            key={s.group}
            delay={i * 0.08}
            className="card"
          >
            <h4>{s.group}</h4>

            <div className="badges">
              {s.items.map((it) => (
                <span key={it} className="badge">
                  {it}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


// PROJECTS SECTION
export function Projects() {
  const [list, setList] = useState(defaultProjects);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    api("/projects")
      .then((d) => d.length && setList(d))
      .catch(() => { });
  }, []);

  const Btn = ({ href, icon, label }) =>
    href ? (
      <a
        className="btn small"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {icon} {label}
      </a>
    ) : (
      <span className="btn small disabled">
        {label}: coming soon
      </span>
    );

  return (
    <section id="projects">
      <Title>Projects</Title>

      <div className="grid">
        {list.map((p, i) => (
          <Reveal
            key={p._id || p.title}
            delay={i * 0.1}
            className="card project"
          >
            <h4>{p.title}</h4>

            <p className="muted">{p.description}</p>

            <div className="badges">
              {p.tech?.map((t) => (
                <span key={t} className="badge">
                  {t}
                </span>
              ))}
            </div>

            <div className="row">
              <Btn
                href={p.liveUrl}
                icon={<FiExternalLink />}
                label="Live Demo"
              />

              <Btn
                href={p.githubUrl}
                icon={<FiGithub />}
                label="GitHub"
              />

              <button
                className="btn small ghost"
                onClick={() => setDetail(p)}
              >
                View Details
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      {detail && (
        <div
          className="modal"
          onClick={() => setDetail(null)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="icon-btn close"
              aria-label="Close"
              onClick={() => setDetail(null)}
            >
              <FiX />
            </button>

            <h3>{detail.title}</h3>

            <p className="muted">{detail.description}</p>

            <div className="badges">
              {detail.tech?.map((t) => (
                <span key={t} className="badge">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


// EXPERIENCE SECTION
const eduIcons = {
  grad: <FaGraduationCap />,
  book: <FaBookOpen />,
  school: <FaSchool />
};

export function Experience() {
  return (
    <section id="experience">
      <Title>Work Experience</Title>

      <div className="grid two">
        {experience.map((x, i) => (
          <Reveal
            key={x.role}
            delay={i * 0.1}
            className="card"
          >
            <div className="exp-head">
              <span className="exp-icon">
                <FaBriefcase />
              </span>

              <div>
                <h4>{x.role}</h4>
                <p className="muted">{x.company}</p>
              </div>
            </div>

            <span className="pill">{x.period}</span>

            <ul className="list">
              {x.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}


// EDUCATION SECTION
export function Education() {
  return (
    <section id="education">
      <Title>Education</Title>

      <div className="edu">
        {education.map((e, i) => (
          <motion.div
            key={e.title}
            className="edu-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <span className="edu-icon">
              {eduIcons[e.icon]}
            </span>

            <div className="card">
              <span className="pill">{e.year}</span>
              <span className="pill alt">{e.level}</span>

              <h4>{e.title}</h4>
              <p>{e.place}</p>
              <p className="muted">{e.loc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


// RESUME SECTION
export function Resume() {
  const [show, setShow] = useState(false);

  return (
    <section id="resume">
      <Title>Resume</Title>

      <Reveal className="card center-card">
        <p className="muted">
          Download my resume or preview it right here.
        </p>

        <div className="row">
          <a
            className="btn"
            href={profile.resume}
            download="Anurag_Nishad_Resume.pdf"
          >
            <FiDownload /> Download CV
          </a>

          <button
            className="btn ghost"
            onClick={() => setShow(true)}
          >
            <FiEye /> Preview
          </button>
        </div>
      </Reveal>

      {show && (
        <div
          className="modal"
          onClick={() => setShow(false)}
        >
          <div
            className="modal-box wide"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="icon-btn close"
              aria-label="Close"
              onClick={() => setShow(false)}
            >
              <FiX />
            </button>

            <iframe
              title="Resume preview"
              src={profile.resume}
              className="pdf"
            />
          </div>
        </div>
      )}
    </section>
  );
}


// COPY BUTTON
function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      setTimeout(() => setOk(false), 1500);
    } catch {
      // Copy failed
    }
  };

  return (
    <button
      type="button"
      className="icon-btn sm"
      aria-label={"Copy " + text}
      onClick={copy}
    >
      {ok ? <FiCheck /> : <FiCopy />}
    </button>
  );
}


// CONTACT SECTION - UPDATED
export function Contact() {

  // Subject removed and Phone added
  const empty = {
    name: "",
    email: "",
    phone: "",
    message: ""
  };

  const [f, setF] = useState(empty);

  const [state, setState] = useState({
    status: "idle",
    msg: ""
  });

  // FORM SUBMIT
  const submit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !f.name.trim() ||
      !/^\S+@\S+\.\S+$/.test(f.email) ||
      !/^\+?[0-9\s()-]{10,15}$/.test(f.phone.trim()) ||
      f.message.trim().length < 10
    ) {
      return setState({
        status: "error",
        msg: "Please enter your name, valid email, valid phone number and a message of at least 10 characters."
      });
    }

    setState({
      status: "loading",
      msg: ""
    });

    try {
      await api("/contact", {
        method: "POST",
        body: {
          name: f.name.trim(),
          email: f.email.trim(),
          phone: f.phone.trim(),
          message: f.message.trim()
        }
      });

      setF(empty);

      setState({
        status: "ok",
        msg: "Message sent successfully. Thank you!"
      });

    } catch (err) {
      setState({
        status: "error",
        msg: err.message || "Something went wrong. Please try again."
      });
    }
  };


  // INPUT HANDLER
  const set = (k) => (e) => {
    setF((prev) => ({
      ...prev,
      [k]: e.target.value
    }));
  };


  // CONTACT INFORMATION
  const info = [
    {
      label: "Phone",
      icon: <FiPhone />,
      value: profile.phone,
      href: "tel:" + profile.phone.replace(/\s/g, ""),
      action: "Call now",
      copy: true
    },
    {
      label: "Email",
      icon: <FiMail />,
      value: profile.email,
      href: "mailto:" + profile.email,
      action: "Send email",
      copy: true
    },
    {
      label: "Location",
      icon: <FiMapPin />,
      value: profile.location,
      href: "https://www.google.com/maps?q=Sultanpur,+Uttar+Pradesh",
      action: "Open map",
      copy: false
    }
  ];


  return (
    <section id="contact">

      <Title>Contact</Title>

      <div className="grid two">

        {/* LEFT SIDE */}
        <div className="contact-side">

          <Reveal className="contact-intro">
            <h3>Let's build something together</h3>

            <p className="muted">
              Have a project, an opportunity or a question?
              Send a message, or reach me directly using the
              details below.
            </p>
          </Reveal>


          {/* CONTACT DETAILS */}
          {info.map((it, k) => (
            <Reveal
              key={it.label}
              delay={k * 0.1}
              className="info-card"
            >
              <span className="info-icon">
                {it.icon}
              </span>

              <div className="info-text">
                <small>{it.label}</small>
                <b>{it.value}</b>
              </div>

              <div className="info-actions">

                {it.copy && (
                  <CopyBtn text={it.value} />
                )}

                <a
                  className="btn small"
                  href={it.href}
                  target={it.copy ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  {it.action}
                </a>

              </div>
            </Reveal>
          ))}

        </div>


        {/* RIGHT SIDE - CONTACT FORM */}
        <Reveal className="card">

          <form onSubmit={submit} noValidate>

            <input
              type="text"
              placeholder="Full Name"
              value={f.name}
              onChange={set("name")}
              aria-label="Full name"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={f.email}
              onChange={set("email")}
              aria-label="Email"
              required
            />

            {/* PHONE FIELD - SUBJECT REMOVED */}
            <input
              type="tel"
              placeholder="Phone Number"
              value={f.phone}
              onChange={set("phone")}
              aria-label="Phone number"
              required
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              value={f.message}
              onChange={set("message")}
              aria-label="Message"
              required
            />

            <button
              type="submit"
              className="btn"
              disabled={state.status === "loading"}
            >
              {state.status === "loading"
                ? "Sending..."
                : "Send Message"}
            </button>

            {state.msg && (
              <p
                className={state.status === "ok" ? "ok" : "err"}
                role="status"
              >
                {state.msg}
              </p>
            )}

          </form>

        </Reveal>

      </div>


      {/* GOOGLE MAP */}
      <Reveal className="card map-card">

        <h4>
          <FiMapPin /> Sultanpur, Uttar Pradesh
        </h4>

        <iframe
          title="Map of Sultanpur, Uttar Pradesh"
          className="map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Sultanpur,+Uttar+Pradesh&output=embed"
        />

      </Reveal>

    </section>
  );
}
