"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * useScrollProgress — Custom hook that tracks normalized scroll progress (0→1).
 * Uses a requestAnimationFrame-throttled scroll listener for smooth performance.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setProgress(Math.min(Math.max(scrollTop / docHeight, 0), 1));
    }
  }, []);

  useEffect(() => {
    let rafId;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // initial

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  return progress;
}
