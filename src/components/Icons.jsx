// A small, dependency-free icon set. The previous build pulled these from
// lucide-react; this rebuild draws its own minimal 24x24 line glyphs so the
// whole site has zero runtime dependencies beyond React. See
// PORTFOLIO_AUDIT.md for the reasoning.
//
// Every icon accepts the same {size, strokeWidth, className} props and
// renders a stroke-based SVG so they inherit color via `currentColor`.

const base = (size, strokeWidth) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
});

export function IconGithub({ size = 18, strokeWidth = 1.7, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="M9 19c-4.2 1.4-4.2-2.1-6-2.5m12 4.5v-3.3c0-.9.3-1.5.7-1.9-2.6-.3-5.2-1.3-5.2-5.6 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 1.1a10 10 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.6.2 2.8.1 3.1a4.4 4.4 0 0 1 1.1 3c0 4.3-2.6 5.3-5.2 5.6.4.4.8 1.1.8 2.2V21" />
    </svg>
  );
}

export function IconLinkedIn({ size = 18, strokeWidth = 1.7, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-4.2c0-1.5 1-2.5 2.4-2.5s2.1 1 2.1 2.5V17" />
      <line x1="11.5" y1="10" x2="11.5" y2="17" />
    </svg>
  );
}

export function IconMail({ size = 18, strokeWidth = 1.7, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 6.5 8 6 8-6" />
    </svg>
  );
}

export function IconFileText({ size = 18, strokeWidth = 1.7, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M14 3.5V8h4" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="16.5" x2="15" y2="16.5" />
    </svg>
  );
}

export function IconOrcid({ size = 18, strokeWidth = 1.6, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <line x1="8.4" y1="8.1" x2="8.4" y2="15.9" />
      <circle cx="8.4" cy="6" r="0.75" fill="currentColor" stroke="none" />
      <path d="M11.4 8.1h2.3a3.9 3.9 0 0 1 0 7.8h-2.3z" />
    </svg>
  );
}

export function IconExternal({ size = 16, strokeWidth = 1.7, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="M8 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
      <path d="M14 4h6v6" />
      <line x1="10" y1="14" x2="20" y2="4" />
    </svg>
  );
}

export function IconArrowRight({ size = 16, strokeWidth = 1.8, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

export function IconChevronRight({ size = 16, strokeWidth = 1.8, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function IconDownload({ size = 16, strokeWidth = 1.7, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="M12 4v11" />
      <path d="m7.5 11 4.5 4.5L16.5 11" />
      <path d="M5 19.5h14" />
    </svg>
  );
}

export function IconSun({ size = 17, strokeWidth = 1.7, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.3M12 19.2v2.3M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
    </svg>
  );
}

export function IconMoon({ size = 17, strokeWidth = 1.7, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

export function IconMenu({ size = 20, strokeWidth = 1.8, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function IconClose({ size = 20, strokeWidth = 1.8, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function IconCopy({ size = 14, strokeWidth = 1.7, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M5.5 15.5h-1a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function IconCheck({ size = 14, strokeWidth = 2, className }) {
  return (
    <svg {...base(size, strokeWidth)} className={className}>
      <path d="m4 12.5 5.5 5.5L20 6.5" />
    </svg>
  );
}
