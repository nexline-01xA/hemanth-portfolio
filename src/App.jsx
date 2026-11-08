import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import { FLAGSHIP_PROJECTS } from "./data/projects.js";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import FeaturedWork from "./sections/FeaturedWork.jsx";
import Research from "./sections/Research.jsx";
import MoreProjects from "./sections/MoreProjects.jsx";
import Experience from "./sections/Experience.jsx";
import Skills from "./sections/Skills.jsx";
import CredentialsEducation from "./sections/CredentialsEducation.jsx";
import Contact from "./sections/Contact.jsx";
import { useEffect, useState } from "react";
import { MotionContext } from "./motion.js";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const project = FLAGSHIP_PROJECTS.find(p => path === `/work/${p.id}`);
const labels = { "/work": "Work", "/research": "Research", "/about": "About", "/contact": "Contact" };
const pageTitle = project?.title || labels[path];

export default function App() {
  const [paused, setPaused] = useState(() => {
    try { const saved = sessionStorage.getItem("portfolio-motion"); if (saved !== null) return saved === "paused"; } catch { /* Storage may be disabled. */ }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    document.title = pageTitle ? `${pageTitle} — Hemanth Nomula` : "Hemanth Nomula — Portfolio";
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event) => setPaused(event.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "active";
    try { sessionStorage.setItem("portfolio-motion", paused ? "paused" : "active"); } catch { /* Motion still works without storage. */ }
  }, [paused]);

  return (
    <MotionContext.Provider value={{ paused }}>
      <div className="ambient-field" aria-hidden="true" />
      <Nav paused={paused} onToggleMotion={() => setPaused((value) => !value)} />
      <main id="main">
        {path === "/" ? <Hero /> : <div className="inner-page">
          <div className="container page-breadcrumb"><a href="/">Home</a><span>/</span>{project ? <><a href="/work/">Work</a><span>/</span><span>{project.title}</span></> : <h1>{pageTitle || "Page not found"}</h1>}</div>
          {project ? <ProjectModal project={project} standalone /> : path === "/work" ? <><FeaturedWork /><MoreProjects /></> : path === "/research" ? <Research /> : path === "/about" ? <><About /><Experience /><Skills /><CredentialsEducation /></> : path === "/contact" ? <Contact /> : <div className="container"><p>This page does not exist.</p><a href="/">Return home</a></div>}
        </div>}
      </main>
      <Footer />
    </MotionContext.Provider>
  );
}
