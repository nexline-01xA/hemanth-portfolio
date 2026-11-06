import { SITE } from "../data/site.js";
import { IconGithub, IconLeetcode, IconLinkedIn, IconMail, IconOrcid } from "./Icons.jsx";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__row">
        <p className="site-footer__meta">
          © {new Date().getFullYear()} {SITE.name} · Built with React &amp; Vite
        </p>
        <div className="site-footer__links">
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <IconGithub size={16} />
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <IconLinkedIn size={16} />
          </a>
          <a href={SITE.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
            <IconLeetcode size={16} />
          </a>
          <a href={SITE.orcid} target="_blank" rel="noopener noreferrer" aria-label="ORCID">
            <IconOrcid size={16} />
          </a>
          <a href={`mailto:${SITE.email}`} aria-label="Email">
            <IconMail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
