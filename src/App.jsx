import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import SignalStrip from "./components/SignalStrip.jsx";
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

export default function App() {
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = (event) => setPaused(event.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "active";
  }, [paused]);

  return (
    <MotionContext.Provider value={{ paused }}>
      <div className="ambient-field" aria-hidden="true" />
      <Nav paused={paused} onToggleMotion={() => setPaused((value) => !value)} />
      <main id="main">
        <Hero />
        <SignalStrip />
        <FeaturedWork />
        <About />
        <Research />
        <Skills />
        <MoreProjects />
        <Experience />
        <CredentialsEducation />
        <Contact />
      </main>
      <Footer />
    </MotionContext.Provider>
  );
}
