import { SITE } from "../data/site.js";
import { CopyEmailButton } from "../components/UI.jsx";
import { IconFileText, IconGithub, IconLeetcode, IconLinkedIn, IconMail, IconOrcid } from "../components/Icons.jsx";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container contact">
        <p className="numhead__index" data-centered="true">
          CONTACT
        </p>
        <h2 className="contact__title">Contact</h2>
        <p className="contact__dek">For engineering, systems, research or collaboration.</p>

        <div className="contact__actions">
          <a className="btn btn--primary" href={`mailto:${SITE.email}`}>
            <IconMail /> Email me
          </a>
          <a className="btn" href={SITE.github} target="_blank" rel="noopener noreferrer">
            <IconGithub /> GitHub
          </a>
          <a className="btn" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            <IconLinkedIn /> LinkedIn
          </a>
          <a className="btn" href={SITE.leetcode} target="_blank" rel="noopener noreferrer">
            <IconLeetcode /> LeetCode
          </a>
          <a className="btn" href={SITE.orcid} target="_blank" rel="noopener noreferrer">
            <IconOrcid /> ORCID
          </a>
          <a className="btn" href={SITE.resumeUrl} target="_blank" rel="noopener noreferrer">
            <IconFileText /> Resume
          </a>
        </div>

        <div className="contact__email-row">
          {SITE.email}
          <CopyEmailButton email={SITE.email} />
        </div>
      </div>
    </section>
  );
}
