import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useQuietMotion } from './experience-motion';
import { SignatureWords } from './hero-signature';

const RADIUS = 75;
const keepInViewport = (position: number, size: number) => {
  const inset = Math.min(RADIUS + 4, size / 2);
  return Math.max(inset, Math.min(size - inset, position));
};

export function CursorBubble() {
  const location = useLocation();
  const quiet = useQuietMotion();
  const signature = useRef<HTMLElement | null>(null);
  const signatureBounds = useRef<DOMRect | null>(null);
  const hasPointer = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const finePointer = useRef(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [magnifying, setMagnifying] = useState(false);
  const magnifyingNow = useRef(false);
  const setLensMode = useCallback((value: boolean) => {
    if (magnifyingNow.current === value) return;
    magnifyingNow.current = value;
    setMagnifying(value);
  }, []);
  const targetX = useMotionValue(150);
  const targetY = useMotionValue(150);
  const smoothX = useSpring(targetX, { stiffness: 210, damping: 30 });
  const smoothY = useSpring(targetY, { stiffness: 210, damping: 30 });
  const viewportWidth = useMotionValue(0);
  const viewportHeight = useMotionValue(0);
  const visible = useMotionValue(0);
  const x = useTransform([smoothX, viewportWidth], ([position, size]: number[]) =>
    keepInViewport(position, size),
  );
  const y = useTransform([smoothY, viewportHeight], ([position, size]: number[]) =>
    keepInViewport(position, size),
  );
  const signatureLeft = useMotionValue(0);
  const signatureTop = useMotionValue(0);
  const signatureWidth = useMotionValue(0);
  const copyX = useTransform([x, signatureLeft], ([position, left]: number[]) =>
    RADIUS - (position - left) * 1.32,
  );
  const copyY = useTransform([y, signatureTop], ([position, top]: number[]) =>
    RADIUS - (position - top) * 1.32,
  );
  const measureSignature = useCallback(() => {
    const bounds = signature.current?.getBoundingClientRect() || null;
    signatureBounds.current = bounds;
    if (bounds) {
      signatureLeft.set(bounds.left);
      signatureTop.set(bounds.top);
      signatureWidth.set(bounds.width);
    }
    const point = lastPointer.current;
    if (hasPointer.current) {
      setLensMode(
        !!bounds && point.x >= bounds.left && point.x <= bounds.right &&
          point.y >= bounds.top && point.y <= bounds.bottom,
      );
    }
  }, [signatureLeft, signatureTop, signatureWidth, setLensMode]);

  useEffect(() => {
    signature.current = document.querySelector<HTMLElement>('.signature-stage');
    setHasSignature(!!signature.current);
    measureSignature();
    const observer = new ResizeObserver(measureSignature);
    if (signature.current) observer.observe(signature.current);
    return () => observer.disconnect();
  }, [location.pathname, measureSignature]);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 601px)');
    const hide = () => {
      visible.set(0);
      setLensMode(false);
    };
    const resize = () => {
      finePointer.current = media.matches;
      viewportWidth.set(window.innerWidth);
      viewportHeight.set(window.innerHeight);
      measureSignature();
      if (!media.matches || quiet) hide();
    };
    const move = (event: PointerEvent) => {
      if (quiet || !media.matches || event.pointerType !== 'mouse') return;
      hasPointer.current = true;
      lastPointer.current = { x: event.clientX, y: event.clientY };
      targetX.set(keepInViewport(event.clientX, window.innerWidth));
      targetY.set(keepInViewport(event.clientY, window.innerHeight));
      measureSignature();
      visible.set(1);
    };
    const visibility = () => { if (document.hidden) hide(); };
    resize();
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', measureSignature, { passive: true });
    window.addEventListener('blur', hide);
    document.addEventListener('pointerleave', hide);
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', resize);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', measureSignature);
      window.removeEventListener('blur', hide);
      document.removeEventListener('pointerleave', hide);
      document.removeEventListener('visibilitychange', visibility);
      media.removeEventListener('change', resize);
    };
  }, [quiet, measureSignature, targetX, targetY, viewportWidth, viewportHeight, visible, setLensMode]);

  useAnimationFrame((time) => {
    if (quiet || hasPointer.current || !finePointer.current || document.hidden) return;
    measureSignature();
    const bounds = signatureBounds.current;
    if (!bounds || bounds.bottom < 0 || bounds.top > viewportHeight.get()) {
      visible.set(0);
      return;
    }
    const inset = Math.min(RADIUS + 4, bounds.width / 2);
    targetX.set(keepInViewport(bounds.left + inset +
      (bounds.width - inset * 2) * (0.5 + Math.sin(time / 3200) * 0.5), viewportWidth.get()));
    targetY.set(keepInViewport(bounds.top + bounds.height *
      (0.52 + Math.cos(time / 3900) * 0.12), viewportHeight.get()));
    setLensMode(true);
    visible.set(1);
  });

  return (
    <motion.div
      className="signature-lens cursor-bubble"
      data-magnifying={magnifying && hasSignature ? 'true' : 'false'}
      aria-hidden="true"
      style={{ x, y, opacity: quiet ? 0 : visible }}
    >
      {hasSignature && (
        <motion.div className="hero-name lens-copy" style={{
          width: signatureWidth, left: copyX, top: copyY, opacity: magnifying ? 1 : 0,
        }}>
          <SignatureWords />
        </motion.div>
      )}
      <span className="lens-sheen" />
      <span className="lens-crosshair" />
    </motion.div>
  );
}
