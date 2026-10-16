import { useRef, type CSSProperties, type ReactNode } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useQuietMotion } from './experience-motion';
import { Reveal } from './ui';

export function MilestoneCard({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className: string;
  index?: number;
}) {
  const card = useRef<HTMLDivElement>(null);
  const visible = useInView(card, { amount: 0.15 });
  const quiet = useQuietMotion();
  const pitch = useMotionValue(0);
  const roll = useMotionValue(0);
  const rotateX = useSpring(pitch, { stiffness: 130, damping: 22 });
  const rotateY = useSpring(roll, { stiffness: 130, damping: 22 });
  return (
    <Reveal className="milestone-reveal">
      <motion.div
        ref={card}
        className={`${className} milestone-card`}
        data-moving={visible && !quiet ? 'true' : 'false'}
        style={{
          ...({ '--milestone-delay': `${index * -1.8}s` } as CSSProperties),
          rotateX: quiet ? 0 : rotateX,
          rotateY: quiet ? 0 : rotateY,
          transformPerspective: 1000,
        }}
        onPointerMove={(event) => {
          if (quiet || event.pointerType !== 'mouse') return;
          const bounds = event.currentTarget.getBoundingClientRect();
          pitch.set(-((event.clientY - bounds.top) / bounds.height - 0.5) * 5);
          roll.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 5);
        }}
        onPointerLeave={() => {
          pitch.set(0);
          roll.set(0);
        }}
      >
        {children}
      </motion.div>
    </Reveal>
  );
}
