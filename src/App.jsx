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
import { useTheme } from "./hooks/index.js";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <SignalStrip />
        <About />
        <FeaturedWork />
        <Research />
        <MoreProjects />
        <Experience />
        <Skills />
        <CredentialsEducation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
