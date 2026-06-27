import { useState } from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const contactInfo = {
    email: "hemanthnomula98@gmail.com",
    email2: "nomulah676@gmail.com",
    phone: "+91 8143576983",
    github: "https://github.com/nexline-01xA?tab=achievements",
    linkedin: "https://www.linkedin.com/in/hemanth-n-854969363/",
    twitter: "https://x.com/nomulahemanth?s=11",
    substack: "https://substack.com/hemanthnomula",
    resume: "https://docs.google.com/document/d/1MUvdO5PqnrFXTTcFSwL2sHELY-5yk6Mw/edit?usp=drivesdk&ouid=111003947983838192541&rtpof=true&sd=true"
  };

  const skills = ["Java", "Python", "C/C++", "React.js", "Node.js", "MongoDB", "Machine Learning", "Data Structures"];

  const experiences = [
    {
      title: "AI/ML Engineering Intern",
      company: "IIT Affiliated Research Lab",
      period: "2024 - Present",
      description: "Developing machine learning models for real-world applications"
    },
    {
      title: "Full-Stack Developer Intern",
      company: "E-Cell",
      period: "2023 - 2024",
      description: "Built web applications using MERN stack"
    },
    {
      title: "Software Development Intern",
      company: "Tech Startup",
      period: "2023",
      description: "Java and Python development for enterprise solutions"
    }
  ];

  const projects = [
    {
      title: "MERN Task Manager Pro",
      description: "Full-stack task management with real-time updates",
      tech: ["MongoDB", "Express", "React", "Node"]
    },
    {
      title: "BookMyStay - Hotel Booking",
      description: "Booking platform with secure payments and reviews",
      tech: ["React", "Node", "Stripe", "MongoDB"]
    },
    {
      title: "Train Consistency Monitor",
      description: "Real-time train schedule and consistency analysis",
      tech: ["Python", "Flask", "React", "WebSocket"]
    }
  ];

  const certifications = [
    "Machine Learning Specialization - Stanford",
    "Full Stack Web Development - Coursera",
    "Data Science Professional Certificate - IBM"
  ];

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#0a0a0f", 
      color: "#e5e5e5",
      fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* NAVIGATION */}
      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        background: "rgba(10, 10, 15, 0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #1f1f2a",
        padding: "0 20px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px"
        }}>
          <span style={{
            fontSize: "24px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            HN
          </span>
          
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <a href="#home" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Home</a>
            <a href="#about" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>About</a>
            <a href="#skills" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Skills</a>
            <a href="#experience" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Experience</a>
            <a href="#projects" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Projects</a>
            <a href="#contact" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px" }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "64px",
        padding: "80px 20px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%"
        }}>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span style={{
              padding: "8px 16px",
              background: "rgba(59, 130, 246, 0.2)",
              borderRadius: "9999px",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              color: "#60a5fa",
              fontSize: "14px"
            }}>
              🎓 AI & ML Student
            </span>
            <span style={{
              padding: "8px 16px",
              background: "rgba(139, 92, 246, 0.2)",
              borderRadius: "9999px",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#a78bfa",
              fontSize: "14px"
            }}>
              💻 Full-Stack Dev
            </span>
          </div>
          
          <h1 style={{
            fontSize: "56px",
            fontWeight: "bold",
            lineHeight: "1.2",
            marginBottom: "8px"
          }}>
            Hemanth <br />
            <span style={{
              background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Nomula
            </span>
          </h1>
          
          <p style={{
            fontSize: "20px",
            color: "#9ca3af",
            marginBottom: "24px"
          }}>
            AI/ML Undergraduate | Software Developer
          </p>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af", marginBottom: "6px" }}>
              <span>📧</span>
              <a href={`mailto:${contactInfo.email}`} style={{ color: "#60a5fa", textDecoration: "none" }}>
                {contactInfo.email}
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af", marginBottom: "6px" }}>
              <span>📧</span>
              <span style={{ color: "#9ca3af" }}>{contactInfo.email2}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af" }}>
              <span>📱</span>
              <span>{contactInfo.phone}</span>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "20px" }}>
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" 
               style={{
                 padding: "10px 20px",
                 background: "rgba(255,255,255,0.05)",
                 borderRadius: "12px",
                 border: "1px solid #1f1f2a",
                 color: "#9ca3af",
                 textDecoration: "none"
               }}>
              🐙 GitHub
            </a>
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" 
               style={{
                 padding: "10px 20px",
                 background: "rgba(255,255,255,0.05)",
                 borderRadius: "12px",
                 border: "1px solid #1f1f2a",
                 color: "#9ca3af",
                 textDecoration: "none"
               }}>
              🔗 LinkedIn
            </a>
            <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer" 
               style={{
                 padding: "10px 20px",
                 background: "rgba(255,255,255,0.05)",
                 borderRadius: "12px",
                 border: "1px solid #1f1f2a",
                 color: "#9ca3af",
                 textDecoration: "none"
               }}>
              🐦 X
            </a>
            <a href={contactInfo.substack} target="_blank" rel="noopener noreferrer" 
               style={{
                 padding: "10px 20px",
                 background: "rgba(255,255,255,0.05)",
                 borderRadius: "12px",
                 border: "1px solid #1f1f2a",
                 color: "#9ca3af",
                 textDecoration: "none"
               }}>
              📚 Substack
            </a>
            <a href={contactInfo.resume} target="_blank" rel="noopener noreferrer" 
               style={{
                 padding: "10px 24px",
                 background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                 borderRadius: "12px",
                 color: "white",
                 textDecoration: "none",
                 fontWeight: "500"
               }}>
              📄 Resume
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={{ padding: "80px 20px", background: "rgba(255,255,255,0.03)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "white", marginBottom: "16px" }}>About Me</h2>
          <div style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            margin: "0 auto 32px",
            borderRadius: "9999px"
          }}></div>
          <p style={{ fontSize: "18px", color: "#d1d5db", lineHeight: "1.8", maxWidth: "768px", margin: "0 auto" }}>
            Computer Science (AI & ML) undergraduate at SRM Institute of Science and Technology. 
            Skilled in Java, Python, C, and C++, with practical exposure through IIT-affiliated 
            internships and self-driven projects. Passionate about applying technical skills 
            to real-world problems in tech and AI.
          </p>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "white", marginBottom: "16px" }}>Technical Skills</h2>
          <div style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            margin: "0 auto 32px",
            borderRadius: "9999px"
          }}></div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "16px",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            {skills.map((skill, index) => (
              <div key={index} style={{
                padding: "16px 24px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                border: "1px solid #1f1f2a",
                color: "#d1d5db",
                fontWeight: "500"
              }}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" style={{ padding: "80px 20px", background: "rgba(255,255,255,0.03)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "white", marginBottom: "16px" }}>Experience</h2>
          <div style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            margin: "0 auto 32px",
            borderRadius: "9999px"
          }}></div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
            maxWidth: "900px",
            margin: "0 auto"
          }}>
            {experiences.map((exp, index) => (
              <div key={index} style={{
                padding: "24px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                border: "1px solid #1f1f2a",
                textAlign: "left"
              }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: "white" }}>{exp.title}</h3>
                <p style={{ color: "#60a5fa", fontWeight: "500" }}>{exp.company}</p>
                <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "12px" }}>{exp.period}</p>
                <p style={{ color: "#d1d5db", fontSize: "14px" }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "white", marginBottom: "16px" }}>Projects</h2>
          <div style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            margin: "0 auto 32px",
            borderRadius: "9999px"
          }}></div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px",
            maxWidth: "900px",
            margin: "0 auto"
          }}>
            {projects.map((project, index) => (
              <div key={index} style={{
                padding: "24px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                border: "1px solid #1f1f2a",
                textAlign: "left"
              }}>
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: "white", marginBottom: "8px" }}>
                  {project.title}
                </h3>
                <p style={{ color: "#d1d5db", fontSize: "14px", marginBottom: "12px" }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.tech.map((tech, i) => (
                    <span key={i} style={{
                      padding: "4px 12px",
                      background: "#1f1f2a",
                      borderRadius: "9999px",
                      fontSize: "12px",
                      color: "#9ca3af"
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" style={{ padding: "80px 20px", background: "rgba(255,255,255,0.03)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "white", marginBottom: "16px" }}>Certifications</h2>
          <div style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            margin: "0 auto 32px",
            borderRadius: "9999px"
          }}></div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "16px",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            {certifications.map((cert, index) => (
              <div key={index} style={{
                padding: "20px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                border: "1px solid #1f1f2a"
              }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🏆</div>
                <p style={{ color: "#d1d5db", fontSize: "14px" }}>{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", color: "white", marginBottom: "16px" }}>Contact Me</h2>
          <div style={{
            width: "80px",
            height: "4px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            margin: "0 auto 32px",
            borderRadius: "9999px"
          }}></div>
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <div style={{
              padding: "20px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              border: "1px solid #1f1f2a",
              marginBottom: "12px"
            }}>
              <div style={{ fontSize: "24px", marginBottom: "4px" }}>📧</div>
              <a href={`mailto:${contactInfo.email}`} style={{ color: "#60a5fa", textDecoration: "none" }}>
                {contactInfo.email}
              </a>
              <br />
              <a href={`mailto:${contactInfo.email2}`} style={{ color: "#60a5fa", textDecoration: "none", fontSize: "14px" }}>
                {contactInfo.email2}
              </a>
            </div>
            <div style={{
              padding: "20px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: "12px",
              border: "1px solid #1f1f2a"
            }}>
              <div style={{ fontSize: "24px", marginBottom: "4px" }}>📱</div>
              <span style={{ color: "#d1d5db" }}>{contactInfo.phone}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "32px 20px",
        borderTop: "1px solid #1f1f2a",
        textAlign: "center"
      }}>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          © 2024 Hemanth Nomula | Built with ❤️ | hemanthn.in
        </p>
        <p style={{ color: "#4b5563", fontSize: "12px", marginTop: "8px" }}>
          {contactInfo.email} | {contactInfo.phone}
        </p>
      </footer>
    </div>
  );
}