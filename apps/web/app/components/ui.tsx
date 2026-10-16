import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import type { Project } from '@portfolio/core';
import { useQuietMotion, useCompactMotion } from './experience-motion';
import { motionTokens } from './motion-system';
import { HelmetArtwork } from './helmet-artwork';
import { HoverWord } from './hover-word';
const MotionLink = motion.create(Link);
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const quiet = useQuietMotion();
  const compact = useCompactMotion();
  return (
    <motion.div
      className={className}
      initial={quiet ? false : { opacity: 1, y: compact ? 12 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: quiet ? 0 : motionTokens.duration.reveal, delay: quiet ? 0 : delay, ease: motionTokens.ease }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({
  index,
  label,
  title,
  subtitle,
  children,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{index}</span> / {label}
        </p>
        <h2 className="section-title-sweep">{title}</h2>
        {subtitle && <p className="section-description">{subtitle}</p>}
      </div>
      {children}
    </Reveal>
  );
}
export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const quiet = useQuietMotion();
  const lightMotion = useCompactMotion();
  const visual = useRef<HTMLAnchorElement>(null);
  const pitch = useMotionValue(0),
    roll = useMotionValue(0);
  const rotateX = useSpring(pitch, { stiffness: 140, damping: 24 });
  const rotateY = useSpring(roll, { stiffness: 140, damping: 24 });
  const { scrollYProgress } = useScroll({ target: visual, offset: ['start end', 'end start'] });
  const depth = useTransform(scrollYProgress, [0, 1], [12, -12]);
  const imageY = useSpring(depth, { stiffness: 100, damping: 28 });
  const cursorX = useMotionValue(0),
    cursorY = useMotionValue(0);
  const followX = useSpring(cursorX, { stiffness: 200, damping: 26 });
  const followY = useSpring(cursorY, { stiffness: 200, damping: 26 });
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (quiet) {
      pitch.set(0);
      roll.set(0);
    }
  }, [quiet, pitch, roll]);
  return (
    <motion.article
      layout={quiet ? false : 'position'}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`project-card accent-${project.accent} ${compact ? 'compact' : ''}`}
    >
      <MotionLink
        ref={visual}
        to={`/projects/${project.slug}`}
        className="project-visual"
        aria-label={`Explore ${project.name}`}
        style={{
          rotateX: quiet ? 0 : rotateX,
          rotateY: quiet ? 0 : rotateY,
          transformPerspective: 1000,
        }}
        whileHover={quiet ? undefined : { scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 140, damping: 24 }}
        onPointerMove={(event) => {
          if (quiet || event.pointerType !== 'mouse') return;
          const bounds = event.currentTarget.getBoundingClientRect();
          setHovered(true);
          cursorX.set(event.clientX - bounds.left);
          cursorY.set(event.clientY - bounds.top);
          pitch.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 4);
          roll.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 4);
        }}
        onPointerLeave={() => {
          setHovered(false);
          pitch.set(0);
          roll.set(0);
        }}
      >
        {project.slug === 'smart-helmet' ? (
          <HelmetArtwork />
        ) : project.image ? (
          <motion.img
            src={project.image}
            alt={project.imageAlt || project.name}
            loading="lazy"
            width={1200}
            height={800}
            className={project.slug === 'campusmate' ? 'phone-preview' : ''}
            style={{ y: quiet || lightMotion ? 0 : imageY }}
          />
        ) : (
          <div className="project-generated" aria-hidden="true">
            <span className="mono">{project.categories[0]} / EXPLORATIONS</span>
            <strong>{project.name}</strong>
            <div className="diagram-lines">
              <i />
              <i />
              <i />
            </div>
          </div>
        )}
        <div className="project-overlay">
          <span className="round-arrow">
            <ArrowUpRight size={21} />
          </span>
        </div>
        <motion.span
          className="project-follow-cursor"
          aria-hidden="true"
          style={{ x: followX, y: followY }}
          animate={{ opacity: hovered && !quiet ? 1 : 0, scale: hovered && !quiet ? 1 : 0.6 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpRight size={20} />
          <span>Explore</span>
        </motion.span>
      </MotionLink>
      <div className="project-info">
        <div className="project-title-row">
          <p className="mono project-index">
            {project.number} / {project.categories.join(' + ')}
          </p>
          <Link to={`/projects/${project.slug}`} aria-label={`${project.name} case study`}>
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <h3>
          <Link to={`/projects/${project.slug}`}>
            <HoverWord text={project.name} />
          </Link>
        </h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.stack.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
export function External({
  href,
  children,
  className = 'text-link',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}
export function PageMeta(title: string, description: string, image = 'portfolio') {
  return [
    { title: `${title} | Mayank Gupta` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} | Mayank Gupta` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: `/social/${image}.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
  ];
}
export function AllWorkLink() {
  return (
    <Link className="text-link" to="/projects">
      All projects <ArrowRight size={17} />
    </Link>
  );
}
