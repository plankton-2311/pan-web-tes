import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValueEvent } from 'motion/react';

export const TextReveal = ({ text, className = "" }: { text: string, className?: string }) => {
  if (!text) return null;
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.215, 0.61, 0.355, 1],
              delay: i * 0.05,
            }}
            viewport={{ once: true }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export const MagneticButton = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export const NumberTicker = ({ value }: { value: number }) => {
  if (typeof value !== 'number') return null;
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useMotionValueEvent(motionValue, "change", (latest) => {
    if (ref.current) {
      ref.current.textContent = Math.round(latest).toString();
    }
  });

  return <span ref={ref}>0</span>;
};
