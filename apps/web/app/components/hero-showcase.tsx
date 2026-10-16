import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { projects } from '@portfolio/core';
import { useQuietMotion, useCompactMotion } from './experience-motion';
import { HelmetArtwork } from './helmet-artwork';

const selection = projects.filter((project) => project.featured);
const labels = ['Sentinel', 'CineBook', 'Helmet', 'CampusMate'];

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const quiet = useQuietMotion();
  const compact = useCompactMotion();
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { amount: 0.15 });
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start start', 'end start'] });
  const scrollLift = useTransform(scrollYProgress, [0, 1], [0, -38]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const pitch = useMotionValue(0);
  const roll = useMotionValue(0);
  const rotateX = useSpring(pitch, { stiffness: 110, damping: 24 });
  const rotateY = useSpring(roll, { stiffness: 110, damping: 24 });
  const project = selection[active];

  return (
    <div className="hero-showcase" ref={stage} data-moving={!quiet && inView ? 'true' : 'false'}>
      <div className="showcase-kicker mono">
        <span>A FEW THINGS I’VE BUILT</span>
        <span>{project.number} / 04</span>
      </div>
      <motion.div
        className="showcase-stage"
        style={{ y: quiet || compact ? 0 : scrollLift, scale: quiet || compact ? 1 : scrollScale, rotateX: quiet || compact ? 0 : rotateX, rotateY: quiet || compact ? 0 : rotateY, transformPerspective: 1400 }}
        onPointerMove={(event) => {
          if (quiet || event.pointerType !== 'mouse') return;
          const bounds = event.currentTarget.getBoundingClientRect();
          pitch.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 5);
          roll.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 5);
        }}
        onPointerLeave={() => { pitch.set(0); roll.set(0); }}
      >
        <span className="showcase-backplate backplate-one" aria-hidden="true" />
        <span className="showcase-backplate backplate-two" aria-hidden="true" />
        <div id="showcase-panel" role="tabpanel" aria-labelledby={`showcase-tab-${active}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              className={`showcase-face accent-${project.accent}`}
              key={project.slug}
              initial={quiet ? false : { y: 15, opacity: 0.65, rotate: 1 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={quiet ? undefined : { y: -10, opacity: 0 }}
              transition={{ duration: quiet ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/projects/${project.slug}`} className="showcase-preview" aria-label={`Preview ${project.name}`}>
                {project.slug === 'smart-helmet' ? <HelmetArtwork /> : (
                  <img src={project.image} alt={project.imageAlt || project.name} width={1200} height={800}
                    className={project.slug === 'campusmate' ? 'showcase-phone' : ''}
                    loading="eager" fetchPriority={active === 0 ? 'high' : 'auto'} />
                )}
                <span className="showcase-preview-hint">Open case study <ArrowUpRight size={16} /></span>
              </Link>
              <div className="showcase-caption">
                <div>
                  <p className="mono">{project.categories.join(' / ')}</p>
                  <h2>{project.name}</h2>
                  <p>{project.kicker}</p>
                </div>
                <Link className="showcase-open" to={`/projects/${project.slug}`} aria-label={`Read ${project.name} case study`}>
                  <ArrowUpRight size={25} />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="showcase-spark" aria-hidden="true">✳</span>
      </motion.div>
      <div className="showcase-tabs" role="tablist" aria-label="Featured project previews">
        {selection.map((item, index) => (
          <button key={item.slug} id={`showcase-tab-${index}`} type="button" role="tab"
            aria-label={item.name} aria-selected={active === index} aria-controls="showcase-panel"
            tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
              event.preventDefault();
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? selection.length - 1 :
                (index + (event.key === 'ArrowRight' ? 1 : selection.length - 1)) % selection.length;
              setActive(next);
              document.getElementById(`showcase-tab-${next}`)?.focus();
            }}>
            <span className="mono">0{index + 1}</span>{labels[index]}
          </button>
        ))}
      </div>
    </div>
  );
}
