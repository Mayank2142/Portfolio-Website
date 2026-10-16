import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useQuietMotion } from './experience-motion';

/** Native scrolling drives decoration without intercepting wheel or touch input. */
export function ScrollRibbon() {
  const container = useRef<HTMLDivElement>(null);
  const quiet = useQuietMotion();
  const { scrollYProgress } = useScroll({ target: container, offset: ['start end', 'end start'] });
  const forward = useTransform(scrollYProgress, [0, 1], ['-12%', '0%']);
  const backward = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  return (
    <div className="scroll-ribbon" ref={container} aria-hidden="true">
      {['Thoughtful interfaces', 'Intelligent systems'].map((text, row) => (
        <motion.div className="scroll-ribbon-track" key={text}
          style={{ x: quiet ? 0 : row === 0 ? forward : backward }}>
          {[0, 1, 2, 3].map((copy) => (
            <span key={copy}>{text}<i>✳</i></span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
