import { useState } from "react";
import { NAV_LINKS, SITE } from "../data/site.js";
import { useScrolled } from "../hooks/index.js";
import { IconClose, IconMenu, IconArrowRight } from "./Icons.jsx";



export default function Nav({ paused, onToggleMotion }) {
  const scrolled = useScrolled(12);
  const active = window.location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="nav" data-scrolled={scrolled}>
        <div className="container nav__inner">
          <a href="/" className="nav__mark" aria-label={`${SITE.name} — home`}>
            <span className="nav__monogram">h<span>n</span><i>.</i></span>
            <span className="nav__name">Hemanth Nomula</span>
          </a>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {NAV_LINKS.map((link) => {
                const id = link.href;
                return (
                  <li key={link.href}>
                    <a href={link.href} aria-current={active.startsWith(id) ? "page" : undefined}>
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
              className="motion-toggle"
              onClick={onToggleMotion}
              aria-label={paused ? "Play animations" : "Pause animations"}
              aria-pressed={paused}
            >
              <span className="motion-bars" data-paused={paused} aria-hidden="true"><i /><i /><i /></span>
              <span>{paused ? "Motion off" : "Motion on"}</span>
            </button>
            <a className="nav__contact" href={SITE.resumeUrl}>Résumé <IconArrowRight /></a>
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
