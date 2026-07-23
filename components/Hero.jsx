"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, FileText, ChevronRight, Sparkles, ShieldCheck, Clock, CheckCircle2, MapPin } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const containerRef = useRef(null);

  // Scroll-linked parallax velocity
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rightCardY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[95vh] flex items-center pt-32 lg:pt-36 pb-20 overflow-hidden">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          {/* Left Column: Scaled Hero Panel with Scroll Parallax */}
          <motion.div
            style={{ y: cardY, opacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-8 xl:col-span-7 text-left"
          >
            <div className="glass-panel-master rounded-[2.5rem] p-8 sm:p-12 lg:p-16 xl:p-20 relative overflow-hidden">
              {/* Soft Ambient Radial Glow */}
              <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 shadow-[0_0_25px_rgba(212,162,76,0.35)] mb-8">
                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400 shrink-0" />
                <span className="text-xs sm:text-sm lg:text-base font-bold text-white tracking-wide uppercase">
                  Trusted by 10,000+ Sacramento Drivers
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-8">
                Fast, Reliable{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
                  Auto Glass Repair
                </span>{" "}
                at Your Doorstep
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-200 leading-relaxed mb-10 max-w-3xl font-normal">
                Expert windshield replacement, rock chip repair, and ADAS camera recalibration delivered directly to your home or office with a 100% lifetime warranty.
              </p>

              {/* Dual Magnetic CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 mb-10">
                <MagneticButton
                  href="#mobile-booking"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4.5 lg:px-10 lg:py-5 bg-primary hover:bg-primary-hover text-[#0A0E1A] text-base lg:text-xl font-extrabold rounded-2xl shadow-xl shadow-primary/35 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 border border-amber-200/40 cursor-pointer"
                >
                  <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-[#0A0E1A]" />
                  <span>Book Mobile Service</span>
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-[#0A0E1A] transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton
                  href="tel:+15551234567"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4.5 lg:px-10 lg:py-5 bg-white/10 hover:bg-white/20 text-white text-base lg:text-xl font-bold rounded-2xl border border-white/25 shadow-lg backdrop-blur-md hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 cursor-pointer"
                >
                  <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-primary-light" />
                  <span>Call (555) 123-4567</span>
                </MagneticButton>
              </div>

              {/* Trust Badges */}
              <div className="pt-8 border-t border-white/15 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs sm:text-sm lg:text-base font-semibold text-slate-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Same-Day Mobile</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-primary-light shrink-0" />
                  <span>Insurance Approved</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Lifetime Guarantee</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Scaled Info Card with Parallax */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-5 relative pointer-events-none">
            <motion.div
              style={{ y: rightCardY, opacity }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-panel-master p-8 lg:p-10 rounded-3xl text-left max-w-sm xl:max-w-md ml-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-xs lg:text-sm font-extrabold text-white uppercase tracking-wider">Technicians Active</span>
              </div>
              <h3 className="text-lg lg:text-2xl font-extrabold text-white mb-2 tracking-tight">
                Sacramento Metro Mobile Unit
              </h3>
              <p className="text-sm lg:text-base text-slate-300 leading-relaxed mb-4">
                Units currently servicing Sacramento, Roseville, Elk Grove & 35-mile radius with 1-hour drive-away adhesives.
              </p>
              <div className="inline-flex items-center gap-2 text-xs lg:text-sm font-semibold text-primary-light">
                <MapPin className="w-4 h-4" />
                <span>On Call • 24/7 Dispatch</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
