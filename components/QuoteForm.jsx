"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { submitQuoteRequest } from "@/lib/supabase";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
    damageType: "Windshield Replacement",
    name: "",
    phone: "",
    email: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await submitQuoteRequest(formData);

      if (result.success) {
        setStatus("success");
        setFormData({
          year: "",
          make: "",
          model: "",
          damageType: "Windshield Replacement",
          name: "",
          phone: "",
          email: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(
          result.error?.message || "Failed to submit request. Please try again."
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="quote" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Instant Estimate Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 xl:col-span-7"
          >
            <div className="glass-panel-master rounded-[2.5rem] p-8 sm:p-12 lg:p-14 xl:p-16 text-left">
              <div className="mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
                  Instant Estimate
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-1">
                  Get Your Free Auto Glass Quote
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-slate-200 mt-2">
                  Fill out the quick form below for instant pricing and same-day scheduling.
                </p>
              </div>

              {status === "success" ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white mb-2">Quote Request Received!</h3>
                  <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto">
                    Thank you! Our master technician will reach out within 15 minutes with your custom quote.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-3 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition-all"
                  >
                    Submit Another Quote
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === "error" && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Vehicle Specs */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Year *
                      </label>
                      <input
                        type="text"
                        name="year"
                        required
                        placeholder="2023"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Make *
                      </label>
                      <input
                        type="text"
                        name="make"
                        required
                        placeholder="Honda"
                        value={formData.make}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Model *
                      </label>
                      <input
                        type="text"
                        name="model"
                        required
                        placeholder="Civic"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                      />
                    </div>
                  </div>

                  {/* Damage Type */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Type of Service Needed *
                    </label>
                    <select
                      name="damageType"
                      value={formData.damageType}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0A0E1A] border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                    >
                      <option value="Windshield Replacement">Windshield Replacement</option>
                      <option value="Rock Chip Repair">Rock Chip Repair</option>
                      <option value="Side Window Replacement">Side Window Replacement</option>
                      <option value="Rear Glass Replacement">Rear Glass Replacement</option>
                      <option value="ADAS Calibration">ADAS Recalibration</option>
                    </select>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="(555) 000-0000"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 px-6 bg-primary hover:bg-primary-hover text-[#0A0E1A] font-extrabold text-sm rounded-xl shadow-lg shadow-primary/35 hover:scale-[1.02] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border border-amber-300/40"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#0A0E1A]" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#0A0E1A]" />
                        <span>Get Free Estimate Now</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right Column: ADAS & Hi-Tech Photography Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[480px] sm:h-[540px] w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 group">
              <Image
                src="/images/adas_calibration.png"
                alt="ADAS Camera Calibration System"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-black/30" />

              {/* Floating Pill Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl backdrop-blur-xl bg-slate-950/80 border border-white/20 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">15-Min Response</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Precision Safety Recalibration
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lane assist and automatic braking cameras recalibrated to factory spec during windshield replacement.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
