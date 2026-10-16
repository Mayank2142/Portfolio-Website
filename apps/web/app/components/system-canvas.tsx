import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Layers3, Workflow, Database, Sparkles, ArrowUpRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router';
import { useQuietMotion } from './experience-motion';
const layers = [
  {
    label: 'Interface',
    sub: 'Designed for people',
    icon: Layers3,
    to: 'cinebook',
    detail: 'Clear states, thoughtful interactions, and interfaces that respect the reader.',
  },
  {
    label: 'API',
    sub: 'Connected with intent',
    icon: Workflow,
    to: 'cinebook',
    detail: 'Validation, ownership, and recovery at the boundary between interface and data.',
  },
  {
    label: 'Data',
    sub: 'Evidence, not guesses',
    icon: Database,
    to: 'sentinel-aml',
    detail: 'Analytical queries and traceable source data behind every investigation.',
  },
  {
    label: 'Intelligence',
    sub: 'Grounded in reality',
    icon: Sparkles,
    to: 'sentinel-aml',
    detail: 'AI workflows that choose tools, expose evidence, and keep people in control.',
  },
];
export function SystemCanvas() {
  const [active, setActive] = useState(0);
  const systemReduced = useReducedMotion();
  const quiet = useQuietMotion();
  const reduce = quiet || systemReduced;
  const container = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  return (
    <div
      className="canvas-surround"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const box = container.current?.getBoundingClientRect();
        if (box)
          setPointer({
            x: (e.clientX - box.left) / box.width - 0.5,
            y: (e.clientY - box.top) / box.height - 0.5,
          });
      }}
      onPointerLeave={() => setPointer({ x: 0, y: 0 })}
    >
      <div className="canvas-orbits" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <motion.div
        ref={container}
        className="system-canvas"
        animate={{ rotateY: reduce ? 0 : pointer.x * 5, rotateX: reduce ? 0 : -pointer.y * 5 }}
        transition={{ type: 'spring', stiffness: 100, damping: 25 }}
      >
        <div className="canvas-top mono">
          <span>SYSTEM OVERVIEW</span>
        </div>
        <div
          className="canvas-stack"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Explore my engineering layers"
        >
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <div key={layer.label}>
                <button
                  role="tab"
                  aria-selected={active === i}
                  aria-controls="canvas-panel"
                  id={`layer-${i}`}
                  tabIndex={active === i ? 0 : -1}
                  className={`layer-node ${active === i ? 'selected' : ''}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (
                      e.key === 'ArrowDown' ||
                      e.key === 'ArrowUp' ||
                      e.key === 'Home' ||
                      e.key === 'End'
                    ) {
                      e.preventDefault();
                      const next =
                        e.key === 'Home'
                          ? 0
                          : e.key === 'End'
                            ? 3
                            : (i + (e.key === 'ArrowDown' ? 1 : 3)) % 4;
                      setActive(next);
                      document.getElementById(`layer-${next}`)?.focus();
                    }
                  }}
                >
                  <span className="node-icon">
                    <Icon size={20} />
                  </span>
                  <span>
                    <strong>{layer.label}</strong>
                    <small>{layer.sub}</small>
                  </span>
                  <span className="node-number mono">0{i + 1}</span>
                </button>
                {i < 3 && (
                  <div className="node-connector">
                    <ArrowDown size={13} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div
          className="canvas-bottom"
          id="canvas-panel"
          role="tabpanel"
          aria-labelledby={`layer-${active}`}
        >
          <motion.p
            key={active}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {layers[active].detail}
          </motion.p>
          <Link to={`/projects/${layers[active].to}`} className="text-link">
            See it in a project <ArrowUpRight size={13} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
