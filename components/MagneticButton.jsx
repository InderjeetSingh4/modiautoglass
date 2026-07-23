"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MagneticButton({ children, className = "", ...props }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchOrReducedMotion, setIsTouchOrReducedMotion] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || isReduced) {
      setIsTouchOrReducedMotion(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchOrReducedMotion || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 14, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}
