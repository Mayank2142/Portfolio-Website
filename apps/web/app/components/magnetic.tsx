import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useQuietMotion } from './experience-motion';
import { motionTokens } from './motion-system';

export function Magnetic({ children }: { children: React.ReactNode }) {
  const quiet = useQuietMotion();
  const targetX = useMotionValue(0),
    targetY = useMotionValue(0);
  const x = useSpring(targetX, motionTokens.spring);
  const y = useSpring(targetY, motionTokens.spring);
  useEffect(() => {
    if (quiet) {
      targetX.set(0);
      targetY.set(0);
    }
  }, [quiet, targetX, targetY]);
  return (
    <motion.span
      className="magnetic-control"
      style={{ x: quiet ? 0 : x, y: quiet ? 0 : y }}
      onPointerMove={(event) => {
        if (quiet || event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        targetX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
        targetY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 10);
      }}
      onPointerLeave={() => {
        targetX.set(0);
        targetY.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
