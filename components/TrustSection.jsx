"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Clock, Star, UserCheck, Sparkles } from "lucide-react";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    desc: "100% guarantee against leaks, stress cracks, and installation defects for as long as you own your car.",
  },
  {
    icon: Award,
    title: "OEM Factory Quality",
    desc: "Factory-grade glass & urethane adhesives matching exact vehicle manufacturer specifications.",
  },
  {
    icon: Clock,
    title: "Same-Day Mobile Dispatch",
    desc: "Mobile technicians travel directly to your home, workplace, or preferred location across Sacramento.",
  },
];

export default function TrustSection() {
  return (
    <section id="trust" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Trust Points & Rating */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="glass-panel-master rounded-[2.5rem] p-8 sm:p-12 lg:p-14 xl:p-16">
              {/* Star Rating Header */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm lg:text-base font-bold text-white ml-2">4.9 / 5.0 Rating</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight mb-6">
                Why Sacramento Drivers Choose Modi Auto Glass
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed mb-10">
                We combine certified master technicians, OEM materials, and mobile convenience to deliver Sacramento’s most trusted auto glass repair experience.
              </p>

              {/* 3 Trust Points */}
              <div className="space-y-5">
                {trustPoints.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all duration-300 flex items-start gap-5 group"
                  >
                    <div className="p-3.5 rounded-xl bg-primary/20 text-primary-light border border-primary/30 shrink-0 group-hover:scale-105 transition-transform">
                      <item.icon className="w-6 h-6 lg:w-7 lg:h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white mb-1.5">{item.title}</h4>
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Res Master Technician Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[500px] sm:h-[580px] lg:h-[640px] w-full rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl bg-slate-900 group">
              <Image
                src="/images/windshield_replacement.png"
                alt="Modi Auto Glass Master Technician"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-black/20" />

              {/* Floating Stat Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="glass-panel-master absolute top-8 left-8 p-5 rounded-2xl flex items-center gap-4 max-w-sm"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl lg:text-2xl font-extrabold text-white">10,000+</div>
                  <div className="text-xs lg:text-sm text-slate-300 font-medium">Successful Glass Installs</div>
                </div>
              </motion.div>

              {/* Floating Stat Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="glass-panel-master absolute bottom-8 right-8 p-6 rounded-2xl max-w-sm text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-amber-400" />
                  <span className="text-xs lg:text-sm font-bold text-white">Master Certified</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-normal">
                  AGRSS & DOW certified adhesive safety standards enforced on every job.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
