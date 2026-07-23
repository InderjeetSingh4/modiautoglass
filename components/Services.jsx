"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Palette,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import ChipRepairSlider from "./ChipRepairSlider";
import CityMarquee from "./CityMarquee";

export default function Services() {
  return (
    <section id="services" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-5 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider mb-5">
              Our Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight mb-6">
              Expert Auto Glass Services
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-200 leading-relaxed font-normal">
              Factory-trained technicians bringing shop-grade precision directly to your driveway or office.
            </p>
          </motion.div>
        </div>

        {/* 4-Tile Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16">
          {/* Tile 1: Dominant Hero Tile (Spans 7 cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 group glass-panel-master rounded-[2.5rem] overflow-hidden hover:border-amber-400/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-72 sm:h-80 lg:h-96 w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/windshield_replacement.png"
                alt="Windshield Replacement"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/40 to-transparent" />

              <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-xs lg:text-sm font-bold text-white shadow-lg flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Primary Specialty</span>
              </div>

              <div className="absolute bottom-6 left-6 lg:left-8 w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center backdrop-blur-md shadow-xl">
                <ShieldCheck className="w-8 h-8" />
              </div>
            </div>

            <div className="p-8 sm:p-10 lg:p-12 text-left">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Windshield Replacement
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mb-8">
                OEM-quality windshield replacement with precision fitting. Factory-grade DOW urethane adhesive guaranteed for life against leaks, wind noise, and stress cracks.
              </p>

              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm sm:text-base text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Free Mobile Dispatch • 1-Hr Drive-Away Time</span>
                </div>

                <a
                  href="#quote"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-[#0A0E1A] text-sm lg:text-base font-extrabold border border-amber-300/40 shadow-md shadow-primary/20 transition-all duration-300 group-hover:translate-x-1"
                >
                  <span>Get Pricing</span>
                  <ArrowRight className="w-5 h-5 text-[#0A0E1A]" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Tile 2: Interactive Before/After Chip Repair Slider (Spans 5 cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 group glass-panel-master rounded-[2.5rem] p-8 lg:p-10 hover:border-amber-400/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center backdrop-blur-md">
                  <Zap className="w-7 h-7" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-white/10 text-xs font-bold text-slate-300 border border-white/15">
                  Interactive Preview
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                Rock Chip Repair
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Drag the slider below to reveal how resin injection restores glass clarity under 30 minutes.
              </p>
            </div>

            {/* Interactive Before / After Slider */}
            <ChipRepairSlider />

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">Stops cracks spreading</span>
              <a
                href="#quote"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-light transition-colors"
              >
                <span>Book Repair</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Tile 3: Window Tinting (Spans 6 cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 group glass-panel-master rounded-[2.5rem] overflow-hidden hover:border-amber-400/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-64 lg:h-72 w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/window_tinting.png"
                alt="Window Tinting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/30 to-transparent" />
              <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-md">
                Ceramic Pro Film
              </div>
              <div className="absolute bottom-5 left-6 w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center backdrop-blur-md">
                <Palette className="w-7 h-7" />
              </div>
            </div>

            <div className="p-8 lg:p-10 text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                Window Tinting
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Premium ceramic film tinting delivering 99% UV radiation rejection, heat reduction, and a sleek dark aesthetic.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Lifetime Warranty</span>
                <a
                  href="#quote"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-[#0A0E1A] text-xs font-extrabold border border-amber-300/40"
                >
                  <span>Select Tint</span>
                  <ArrowRight className="w-4 h-4 text-[#0A0E1A]" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Tile 4: ADAS Calibration (Spans 6 cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6 group glass-panel-master rounded-[2.5rem] overflow-hidden hover:border-amber-400/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative h-64 lg:h-72 w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/adas_calibration.png"
                alt="ADAS Calibration"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/30 to-transparent" />
              <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-md">
                Hi-Tech Safety
              </div>
              <div className="absolute bottom-5 left-6 w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center backdrop-blur-md">
                <Cpu className="w-7 h-7" />
              </div>
            </div>

            <div className="p-8 lg:p-10 text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                ADAS Camera Calibration
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Dynamic and static sensor recalibration ensuring lane assist, automatic braking, and safety cameras align to factory specs.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Factory Certified Target Setup</span>
                <a
                  href="#quote"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-[#0A0E1A] text-xs font-extrabold border border-amber-300/40"
                >
                  <span>Calibrate ADAS</span>
                  <ArrowRight className="w-4 h-4 text-[#0A0E1A]" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sacramento Metro Service Area Marquee Ticker */}
      <CityMarquee />
    </section>
  );
}
