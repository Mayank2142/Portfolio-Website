import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  ArrowUpRight,
  Sun,
  Moon,
  Menu,
  X,
  Github,
  Linkedin,
  Command,
  Search,
  ArrowRight,
} from 'lucide-react';
import { profile, projects } from '@portfolio/core';
import { HoverWord } from './hover-word';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { motionTokens } from './motion-system';
import { assetPath } from './asset-path';
import { useQuietMotion } from './experience-motion';

export function Header() {
  const quiet = useQuietMotion();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 40));
  const [open, setOpen] = useState(false),
    [light, setLight] = useState(false),
    [search, setSearch] = useState(false);
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setLight(document.documentElement.dataset.theme === 'light');
  }, []);
  useEffect(() => {
    setOpen(false);
    setSearch(false);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearch((v) => !v);
      }
      if (event.key === 'Escape') {
        setSearch(false);
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  function toggleTheme() {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.themeChanging = 'true';
    document.documentElement.dataset.theme = next ? 'light' : 'dark';
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        delete document.documentElement.dataset.themeChanging;
      }),
    );
    try {
      localStorage.setItem('portfolio-theme', next ? 'light' : 'dark');
    } catch {}
  }
  return (
    <>
      <header className="site-header" data-scrolled={scrolled}>
        <div className="header-inner shell">
          <Link to="/" className="wordmark" aria-label="Mayank Gupta home">
            <HoverWord text="mayank" />
            <span className="brand-dot">.</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link
              to="/#work"
              className={
                location.pathname.startsWith('/projects') || location.hash === '#work'
                  ? 'nav-active'
                  : ''
              }
            >
              <HoverWord text="Work" />
            </Link>
            <Link to="/#experience" className={location.hash === '#experience' ? 'nav-active' : ''}>
              <HoverWord text="Experience" />
            </Link>
            <Link to="/#about" className={location.hash === '#about' ? 'nav-active' : ''}>
              <HoverWord text="About" />
            </Link>
            <Link to="/#contact" className={location.hash === '#contact' ? 'nav-active' : ''}>
              <HoverWord text="Contact" /> <ArrowUpRight size={13} />
            </Link>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button search-trigger"
              onClick={() => setSearch(true)}
              aria-label="Search portfolio (Control K)"
            >
              <Command size={16} />
              <span>K</span>
            </button>
            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}
            >
              {light ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <a href={assetPath('/resume.pdf')} target="_blank" rel="noreferrer" className="resume-link">
              Resume <ArrowUpRight size={14} />
            </a>
            <button
              ref={menuButton}
              className="icon-button mobile-toggle"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav shell"
            aria-label="Mobile navigation"
            initial={quiet ? false : { height: 0, opacity: 1 }}
            animate={{ height: 'auto' }}
            transition={{ duration: quiet ? 0 : motionTokens.duration.card, ease: motionTokens.ease }}
            style={{ overflow: 'hidden' }}
          >
            <Link to="/#work">Work</Link>
            <Link to="/#experience">Experience</Link>
            <Link to="/#about">About</Link>
            <Link to="/#contact">Contact</Link>
            <button
              className="text-button"
              onClick={() => {
                setOpen(false);
                setSearch(true);
              }}
            >
              Search portfolio
            </button>
          </motion.nav>
        )}
      </header>
      {search && <CommandPalette onClose={() => setSearch(false)} />}
    </>
  );
}
function CommandPalette({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null),
    input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const results = [
    { name: 'Selected work', to: '/#work' },
    { name: 'Experience · Valsco & KrizPay', to: '/#experience' },
    { name: 'Contact Mayank', to: '/#contact' },
    ...projects.map((p) => ({ name: p.name, to: `/projects/${p.slug}` })),
  ].filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    dialog.current?.showModal();
    input.current?.focus();
    return () => {
      dialog.current?.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="command-dialog"
      aria-label="Quick navigation"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
    >
      <div className="command-input">
        <Search size={19} />
        <input
          ref={input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Find projects and pages"
          placeholder="Find a project, page, or section…"
        />
        <button className="icon-button" onClick={onClose} aria-label="Close search">
          <X size={18} />
        </button>
      </div>
      <div className="command-results">
        <p className="eyebrow" aria-live="polite">
          {results.length} DESTINATIONS
        </p>
        {results.map((p) => (
          <button
            key={p.to}
            onClick={() => {
              onClose();
              navigate(p.to);
            }}
          >
            {p.name}
            <ArrowRight size={16} />
          </button>
        ))}
        {!results.length && <p className="muted">No matching pages. Try “work” or “contact”.</p>}
      </div>
      <div className="command-hint mono">Tab to navigate · Enter to open · Esc to close</div>
    </dialog>
  );
}
export function Footer() {
  return (
    <footer className="site-footer shell">
      <Link className="wordmark" to="/">
        mayank<span className="brand-dot">.</span>
      </Link>
      <div className="footer-links">
        <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer">
          <Github size={18} />
        </a>
        <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
          <Linkedin size={18} />
        </a>
        <Link to="/#main" className="back-top">
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
