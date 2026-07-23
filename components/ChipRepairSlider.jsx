"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";

export default function ChipRepairSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - left) / width) * 100;
    setSliderPos(Math.min(Math.max(pos, 0), 100));
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative h-64 lg:h-72 w-full rounded-2xl overflow-hidden select-none cursor-ew-resize bg-slate-900 border border-white/15"
    >
      {/* Before Image (Damaged Glass) */}
      <Image
        src="/images/rock_chip_repair.png"
        alt="Before Chip Repair"
        fill
        className="object-cover filter contrast-125 brightness-90"
      />
      <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-red-950/80 backdrop-blur-md border border-red-500/30 text-[10px] lg:text-xs font-bold text-red-300 uppercase tracking-wider">
        Before: Damaged Chip
      </div>

      {/* After Image (Repaired Glass - Cropped by sliderPos) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <Image
          src="/images/windshield_replacement.png"
          alt="After Chip Repair"
          fill
          className="object-cover filter brightness-105"
        />
        <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-[10px] lg:text-xs font-bold text-emerald-300 uppercase tracking-wider whitespace-nowrap">
          After: Resinous Repair
        </div>
      </div>

      {/* Divider Bar & Drag Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_12px_rgba(212,162,76,0.8)] cursor-ew-resize"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-primary text-[#0A0E1A] border-2 border-white flex items-center justify-center shadow-xl">
          <SlidersHorizontal className="w-4 h-4 text-[#0A0E1A]" />
        </div>
      </div>
    </div>
  );
}
