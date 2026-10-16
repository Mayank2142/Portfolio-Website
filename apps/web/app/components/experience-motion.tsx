import { createContext, useContext, useEffect, useState } from 'react';
import { motion, MotionConfig, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { motionTokens } from './motion-system';

const MotionPreference = createContext(false);
const CompactMotion = createContext(true);
export function ExperienceMotion({ children }: { children: React.ReactNode }) {
  const systemReduced = useReducedMotion();
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px), (pointer: coarse)');
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = systemReduced ? 'paused' : 'full';
  }, [systemReduced]);
  return (
    <MotionPreference.Provider value={!!systemReduced}>
      <CompactMotion.Provider value={compact}>
        <MotionConfig reducedMotion="user" transition={{ duration: motionTokens.duration.card, ease: motionTokens.ease }}>{children}</MotionConfig>
      </CompactMotion.Provider>
    </MotionPreference.Provider>
  );
}
export function useQuietMotion() {
  return useContext(MotionPreference);
}
export function useCompactMotion() {
  return useContext(CompactMotion);
}
export function PageSurface({ children }: { children: React.ReactNode }) {
  const quiet = useQuietMotion();
  return (
    <motion.main
      id="main"
      tabIndex={-1}
      className="page-enter"
      initial={quiet ? false : { y: 18 }}
      animate={{ y: 0 }}
      transition={{ duration: motionTokens.duration.page, ease: motionTokens.ease }}
    >
      {children}
    </motion.main>
  );
}
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const quiet = useQuietMotion();
  return (
    <motion.div
      className="reading-progress"
      aria-hidden="true"
      style={{ scaleX: quiet ? scrollYProgress : smooth }}
    />
  );
}
export function SkillsExplorer() {
  const [active, setActive] = useState(0);
  const quiet = useQuietMotion();
  const groups = [
    {
      name: 'Frontend',
      title: 'Interfaces people can understand.',
      text: 'Reusable components, responsive layouts, clear feedback, and careful state management.',
      tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      project: 'cinebook',
      work: 'CineBook',
      symbol: '</>',
    },
    {
      name: 'Backend',
      title: 'The systems behind the experience.',
      text: 'API boundaries, relational data, booking workflows, and recovery when something goes wrong.',
      tools: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs'],
      project: 'cinebook',
      work: 'CineBook',
      symbol: '{ }',
    },
    {
      name: 'AI & data',
      title: 'Intelligence with a paper trail.',
      text: 'Investigation workflows that connect analytical queries, tools, and evidence for human review.',
      tools: ['Python', 'FastAPI', 'DuckDB', 'AI workflows'],
      project: 'sentinel-aml',
      work: 'Sentinel AML',
      symbol: '∴',
    },
    {
      name: 'Mobile & IoT',
      title: 'Software beyond the browser.',
      text: 'Campus navigation and connected hardware experiments that bring software into everyday environments.',
      tools: ['Flutter', 'Google Maps', 'ESP32', 'Firebase'],
      project: 'campusmate',
      work: 'CampusMate',
      symbol: '↗',
    },
  ];
  const group = groups[active];
  return (
    <div className="skills-explorer">
      <div className="skills-tabs" role="tablist" aria-label="Engineering skills">
        {groups.map((item, i) => (
          <button
            key={item.name}
            id={`skill-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls="skill-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(event) => {
              if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
              event.preventDefault();
              const next =
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? 3
                    : (i + (event.key === 'ArrowRight' ? 1 : 3)) % 4;
              setActive(next);
              document.getElementById(`skill-tab-${next}`)?.focus();
            }}
          >
            {active === i && (
              <motion.i
                className="skill-selection"
                layoutId={quiet ? undefined : 'skill-selection'}
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                aria-hidden="true"
              />
            )}
            <span className="mono">0{i + 1}</span>
            {item.name}
          </button>
        ))}
      </div>
      <div id="skill-panel" role="tabpanel" aria-labelledby={`skill-tab-${active}`} tabIndex={0}>
        <motion.div
          key={active}
          className="skill-content"
          initial={quiet ? false : { opacity: 1, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <p className="eyebrow">THE TOOLKIT / IN PRACTICE</p>
            <h3>{group.title}</h3>
            <p>{group.text}</p>
            <div className="tags">
              {group.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
            <Link className="text-link" to={`/projects/${group.project}`}>
              Explore {group.work}
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="skill-symbol" aria-hidden="true">
            {group.symbol}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
