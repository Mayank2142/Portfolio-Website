import { useEffect, useState } from 'react';

const chapters = [
  ['problem', 'The problem'],
  ['architecture', 'The architecture'],
  ['decisions', 'The decisions'],
  ['evidence', 'The evidence'],
  ['takeaway', 'The takeaway'],
];

export function CaseNavigation() {
  const [active, setActive] = useState('problem');
  useEffect(() => {
    // One observer per case study; no React updates on every scroll frame.
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    chapters.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav className="chapter-nav" aria-label="Case study sections">
      {chapters.map(([id, label], index) => (
        <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>
          <span className="mono" aria-hidden="true">0{index + 1}</span>{label}
        </a>
      ))}
    </nav>
  );
}
