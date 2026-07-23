"use client";

import { useState, useEffect } from "react";
import { Shield } from "lucide-react";

export default function WatermarkCoverButton() {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    const computePos = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const imgRatio = 1920 / 1080;
      const canvasRatio = w / h;

      let drawW, drawH, drawX, drawY;

      if (canvasRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgRatio;
        drawX = (w - drawW) / 2;
        drawY = 0;
      }

      // Watermark center on 1920x1080 frame: X=1745, Y=905
      const targetX = drawX + drawW * 0.9088;
      const targetY = drawY + drawH * 0.838;

      setCoords({ x: targetX, y: targetY });
    };

    computePos();
    window.addEventListener("resize", computePos);
    return () => window.removeEventListener("resize", computePos);
  }, []);

  return (
    <a
      href="tel:+15551234567"
      aria-label="Call Modi Auto Glass"
      style={
        coords
          ? {
              position: "fixed",
              left: `${coords.x}px`,
              top: `${coords.y}px`,
              transform: "translate(-50%, -50%)",
            }
          : {
              position: "fixed",
              bottom: "5vh",
              right: "4vw",
            }
      }
      className="z-[100] group w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary hover:bg-primary-hover text-[#0A0E1A] flex items-center justify-center shadow-2xl shadow-primary/70 hover:shadow-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 border-4 border-amber-200/50 cursor-pointer shrink-0"
    >
      {/* Desktop Hover Tooltip */}
      <div className="hidden sm:block pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 absolute right-full mr-5 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-[#0A0E1A]/95 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold shadow-2xl whitespace-nowrap">
        24/7 Mobile Service • (555) 123-4567
      </div>

      <Shield className="w-12 h-12 sm:w-14 sm:h-14 text-[#0A0E1A]" strokeWidth={2.5} />
      {/* Glowing Pulsing Ring */}
      <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping pointer-events-none opacity-60" />
    </a>
  );
}
