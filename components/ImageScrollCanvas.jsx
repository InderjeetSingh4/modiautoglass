"use client";

import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 300;

function getFrameUrl(index) {
  const frameNum = String(index).padStart(3, "0");
  return `/ezgif-307fae39435b39b4-jpg/ezgif-frame-${frameNum}.jpg`;
}

/**
 * ImageScrollCanvas — Fixed full-screen background canvas.
 * Plays the 300-frame car sequence in sync with page scrolling.
 */
export default function ImageScrollCanvas() {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Map());
  const lastDrawnRef = useRef(null);

  // Preload frames progressively
  useEffect(() => {
    let isMounted = true;

    const loadFrame = (i) => {
      if (!isMounted) return;
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isMounted) imagesRef.current.set(i, img);
      };
      img.onerror = () => {
        if (isMounted) imagesRef.current.set(i, null);
      };
    };

    // Load initial 40 frames immediately
    for (let i = 1; i <= Math.min(40, TOTAL_FRAMES); i++) {
      loadFrame(i);
    }

    // Load remaining frames
    const timer = setTimeout(() => {
      for (let i = 41; i <= TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    }, 50);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Smooth RAF scroll renderer with lerp interpolation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let currentFrame = 1;
    let targetFrame = 1;
    let animFrameId;

    const render = () => {
      // Smooth linear interpolation (lerp)
      currentFrame += (targetFrame - currentFrame) * 0.14;
      const targetIdx = Math.min(
        Math.max(Math.round(currentFrame), 1),
        TOTAL_FRAMES
      );

      // Find target frame or fallback to nearest loaded frame
      let imgToDraw = imagesRef.current.get(targetIdx);

      if (!imgToDraw) {
        for (let offset = 1; offset < 40; offset++) {
          const prev = targetIdx - offset;
          const next = targetIdx + offset;
          if (prev >= 1 && imagesRef.current.get(prev)) {
            imgToDraw = imagesRef.current.get(prev);
            break;
          }
          if (next <= TOTAL_FRAMES && imagesRef.current.get(next)) {
            imgToDraw = imagesRef.current.get(next);
            break;
          }
        }
      }

      if (!imgToDraw) {
        imgToDraw = lastDrawnRef.current;
      }

      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        lastDrawnRef.current = imgToDraw;

        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
          canvas.width = width * dpr;
          canvas.height = height * dpr;
        }

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        // Aspect ratio cover calculation
        const imgRatio = imgToDraw.naturalWidth / imgToDraw.naturalHeight;
        const canvasRatio = width / height;

        let drawW, drawH, drawX, drawY;

        if (canvasRatio > imgRatio) {
          drawW = width;
          drawH = width / imgRatio;
          drawX = 0;
          drawY = (height - drawH) / 2;
        } else {
          drawH = height;
          drawW = height * imgRatio;
          drawX = (width - drawW) / 2;
          drawY = 0;
        }

        ctx.drawImage(imgToDraw, drawX, drawY, drawW, drawH);
        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        targetFrame = 1 + progress * (TOTAL_FRAMES - 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    render();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden pointer-events-none">
      {/* 300 Frame Scroll Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block object-cover" />

      {/* Subtle ambient gradient overlay for optimal text contrast while keeping car 100% visible */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </div>
  );
}
