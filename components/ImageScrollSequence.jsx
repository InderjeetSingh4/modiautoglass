"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 300;

function getFrameUrl(index) {
  const frameNum = String(index).padStart(3, "0");
  return `/ezgif-307fae39435b39b4-jpg/ezgif-frame-${frameNum}.jpg`;
}

export default function ImageScrollSequence() {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Map());
  const lastDrawnImageRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let count = 0;

    const loadFrame = (i) => {
      if (!isMounted) return;
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current.set(i, img);
        count++;
        setLoadedCount(count);
      };
      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
      };
    };

    for (let i = 1; i <= Math.min(40, TOTAL_FRAMES); i++) {
      loadFrame(i);
    }

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let currentFrame = 1;
    let targetFrame = 1;
    let animFrameId;

    const render = () => {
      currentFrame += (targetFrame - currentFrame) * 0.15;
      const targetIdx = Math.min(
        Math.max(Math.round(currentFrame), 1),
        TOTAL_FRAMES
      );

      let imgToDraw = imagesRef.current.get(targetIdx);

      if (!imgToDraw) {
        for (let offset = 1; offset < 40; offset++) {
          const prev = targetIdx - offset;
          const next = targetIdx + offset;
          if (prev >= 1 && imagesRef.current.has(prev)) {
            imgToDraw = imagesRef.current.get(prev);
            break;
          }
          if (next <= TOTAL_FRAMES && imagesRef.current.has(next)) {
            imgToDraw = imagesRef.current.get(next);
            break;
          }
        }
      }

      if (!imgToDraw) {
        imgToDraw = lastDrawnImageRef.current;
      }

      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        lastDrawnImageRef.current = imgToDraw;

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
    <div className="relative w-full bg-[#000000]" style={{ height: "450vh" }}>
      <div className="fixed inset-0 w-screen h-screen overflow-hidden flex items-center justify-center bg-[#000000] z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {loadedCount < TOTAL_FRAMES && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white/70 text-xs font-mono tracking-widest shadow-xl pointer-events-none transition-opacity duration-300">
          LOADING {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
        </div>
      )}
    </div>
  );
}
