import { useState } from "react";
import { NAV_LINKS, SITE } from "../data/site.js";
import { useActiveSection, useScrolled } from "../hooks/index.js";
import { IconClose, IconMenu, IconMoon, IconSun } from "./Icons.jsx";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export default function Nav({ theme, onToggleTheme }) {
  const scrolled = useScrolled(12);
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="nav" data-scrolled={scrolled}>
        <div className="container nav__inner">
          <a href="#top" className="nav__mark" aria-label={`${SITE.name} — home`}>
            HN<span className="nav__mark-dot">.</span>
          </a>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <a href={link.href} aria-current={active === id ? "true" : undefined}>
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="nav__right">
            <button
              type="button"
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
            >
              {theme === "light" ? <IconMoon /> : <IconSun />}
            </button>
            <button
              type="button"
              className="nav__menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
