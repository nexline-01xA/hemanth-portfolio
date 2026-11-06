import { useState } from "react";
import { IconCheck, IconCopy } from "./Icons.jsx";

export function SectionHeading({ index, kicker, title, dek, id }) {
  return (
    <div className="numhead">
      {(index || kicker) && (
        <p className="numhead__index">
          {index} {kicker && `/ ${kicker}`}
        </p>
      )}
      <h2 className="numhead__title" id={id ? `${id}-heading` : undefined}>
        {title}
      </h2>
      {dek && <p className="numhead__dek">{dek}</p>}
    </div>
  );
}

const STATUS_TONE = {
  "Under Review": "review",
  Submitted: "review",
  "In Development": "progress",
  "Research Proposal": "progress",
  Prototype: "progress",
  "Competition Submission": "progress",
  Completed: "live",
  "Open Source": "live",
};

export function StatusBadge({ status }) {
  const tone = STATUS_TONE[status] || "neutral";
  return <span className={`badge badge--${tone}`}>{status}</span>;
}

export function TagRow({ items }) {
  if (!items?.length) return null;
  return (
    <div className="tag-row">
      {items.map((item) => (
        <span className="tag" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

export function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can be unavailable (older browsers, insecure
      // context); the email is still visible and selectable as text.
    }
  };

  return (
    <button type="button" className="copy-btn" onClick={handleCopy} aria-live="polite">
      {copied ? (
        <>
          <IconCheck /> Copied
        </>
      ) : (
        <>
          <IconCopy /> Copy email
        </>
      )}
    </button>
  );
}
