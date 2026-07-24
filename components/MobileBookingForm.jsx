"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Wrench,
  Clock,
  Sparkles,
} from "lucide-react";
import { submitMobileBooking } from "@/lib/supabase";

const GLASS_OPTIONS = [
  {
    id: "Front Windshield",
    label: "Front Windshield",
    desc: "Main front windshield repair or replacement",
    icon: ShieldCheck,
  },
  {
    id: "Rear Glass",
    label: "Rear Glass",
    desc: "Rear defroster / back window replacement",
    icon: Wrench,
  },
  {
    id: "Driver Side Window",
    label: "Driver Side Window",
    desc: "Front left / rear left side door glass",
    icon: Car,
  },
  {
    id: "Passenger Side Window",
    label: "Passenger Side Window",
    desc: "Front right / rear right side door glass",
    icon: Car,
  },
];

export default function MobileBookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    car_make: "",
    car_model: "",
    glass_type: "Front Windshield",
    phone_number: "",
    service_address: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStep1Valid = formData.car_make.trim() !== "" && formData.car_model.trim() !== "";
  const isStep2Valid = formData.glass_type !== "";
  const isStep3Valid = formData.phone_number.trim() !== "" && formData.service_address.trim() !== "";

  const goToStep2 = (e) => {
    if (e) e.preventDefault();
    if (isStep1Valid) setStep(2);
  };

  const goToStep3 = (e) => {
    if (e) e.preventDefault();
    if (isStep2Valid) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStep3Valid) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const payload = {
        car_make: formData.car_make,
        car_model: formData.car_model,
        glass_type: formData.glass_type,
        phone_number: formData.phone_number,
        service_address: formData.service_address,
        status: "pending",
      };

      const result = await submitMobileBooking(payload);

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error?.message || "Failed to book service. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      car_make: "",
      car_model: "",
      glass_type: "Front Windshield",
      phone_number: "",
      service_address: "",
    });
    setStep(1);
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section id="mobile-booking" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Glass Multi-Step Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 xl:col-span-7"
          >
            <div className="glass-panel-master rounded-[2.5rem] p-8 sm:p-12 lg:p-14 xl:p-16 text-white relative overflow-hidden text-left">
              {/* Header Badge */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>We Come To You</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  Book Mobile Service
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-slate-200 mt-2">
                  Our certified mobile technician comes directly to your home or office location.
                </p>
              </div>

              {status === "success" ? (
                /* Success Message */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 px-6 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Booking Request Sent!
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
                    We will call you shortly at <span className="text-white font-semibold">{formData.phone_number}</span> to confirm your appointment and dispatch technician to <span className="text-white font-semibold">{formData.service_address}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-primary/30"
                  >
                    Book Another Vehicle
                  </button>
                </motion.div>
              ) : (
                /* Multi-Step Form */
                <div>
                  {/* Step Indicator Progress Bar */}
                  <div className="relative mb-8 pb-4">
                    <div className="flex items-center justify-between text-xs z-10 relative">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className={`flex items-center gap-2 font-semibold cursor-pointer ${step >= 1 ? "text-primary-light" : "text-slate-400"}`}
                      >
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${step >= 1 ? "bg-primary text-[#0A0E1A] shadow-lg shadow-primary/40" : "bg-white/10 text-slate-400"}`}>
                          1
                        </span>
                        <span>Vehicle</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => isStep1Valid && setStep(2)}
                        className={`flex items-center gap-2 font-semibold ${isStep1Valid ? "cursor-pointer" : "cursor-not-allowed"} ${step >= 2 ? "text-primary-light" : "text-slate-400"}`}
                      >
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${step >= 2 ? "bg-primary text-[#0A0E1A] shadow-lg shadow-primary/40" : "bg-white/10 text-slate-400"}`}>
                          2
                        </span>
                        <span>Glass Service</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => isStep1Valid && isStep2Valid && setStep(3)}
                        className={`flex items-center gap-2 font-semibold ${isStep1Valid && isStep2Valid ? "cursor-pointer" : "cursor-not-allowed"} ${step >= 3 ? "text-primary-light" : "text-slate-400"}`}
                      >
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold transition-all ${step >= 3 ? "bg-primary text-[#0A0E1A] shadow-lg shadow-primary/40" : "bg-white/10 text-slate-400"}`}>
                          3
                        </span>
                        <span>Location</span>
                      </button>
                    </div>

                    {/* Animated Progress Line */}
                    <div className="absolute top-3.5 left-8 right-8 h-1 bg-white/10 rounded-full -z-0">
                      <motion.div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                        animate={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-5"
                      >
                        <h4 className="text-sm font-semibold text-white/90">
                          Step 1: Vehicle Information
                        </h4>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Car Make *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Mahindra, Toyota, Honda, Ford"
                            value={formData.car_make}
                            onChange={(e) => updateField("car_make", e.target.value)}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            Car Model *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. XUV700, Camry, Civic, F-150"
                            value={formData.car_model}
                            onChange={(e) => updateField("car_model", e.target.value)}
                            className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                          />
                        </div>

                        <div className="pt-4 flex justify-end">
                          <button
                            type="button"
                            onClick={goToStep2}
                            disabled={!isStep1Valid}
                            className="px-7 py-3.5 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary/30 hover:scale-[1.02] active:scale-[0.97] transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <span>Next: Glass Service</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-4"
                      >
                        <h4 className="text-sm font-semibold text-white/90 mb-3">
                          Step 2: Which Glass Needs Service? *
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {GLASS_OPTIONS.map((opt) => {
                            const isSelected = formData.glass_type === opt.id;
                            const IconComp = opt.icon;
                            return (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => updateField("glass_type", opt.id)}
                                className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                                  isSelected
                                    ? "bg-primary/30 border-primary ring-2 ring-primary/60 text-white shadow-lg"
                                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`p-2 rounded-lg ${isSelected ? "bg-primary text-white" : "bg-white/10 text-white/70"}`}>
                                    <IconComp className="w-4 h-4" />
                                  </span>
                                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? "border-primary bg-primary" : "border-white/30"}`}>
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-white mb-0.5">{opt.label}</p>
                                  <p className="text-xs text-slate-400 leading-tight">{opt.desc}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        <div className="pt-4 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back</span>
                          </button>
                          <button
                            type="button"
                            onClick={goToStep3}
                            disabled={!isStep2Valid}
                            className="px-7 py-3.5 bg-primary hover:bg-primary-hover disabled:opacity-50 text-[#0A0E1A] font-extrabold text-sm rounded-xl shadow-lg shadow-primary/35 hover:scale-[1.02] active:scale-[0.97] transition-all flex items-center gap-2 cursor-pointer border border-amber-300/40"
                          >
                            <span>Next: Location</span>
                            <ArrowRight className="w-4 h-4 text-[#0A0E1A]" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                      >
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <h4 className="text-sm font-semibold text-white/90">
                            Step 3: Contact & Service Location
                          </h4>

                          <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                              Phone Number *
                            </label>
                            <div className="relative">
                              <Phone className="w-4 h-4 absolute left-3.5 top-4 text-white/40" />
                              <input
                                type="tel"
                                required
                                placeholder="(555) 000-0000"
                                value={formData.phone_number}
                                onChange={(e) => updateField("phone_number", e.target.value)}
                                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">
                              Service Address (Where technician should go) *
                            </label>
                            <div className="relative">
                              <MapPin className="w-4 h-4 absolute left-3.5 top-4 text-white/40" />
                              <input
                                type="text"
                                required
                                placeholder="Street Address, City, Zip Code"
                                value={formData.service_address}
                                onChange={(e) => updateField("service_address", e.target.value)}
                                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                              />
                            </div>
                          </div>

                          {/* Booking Summary Box */}
                          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-1">
                            <p><span className="text-white font-medium">Vehicle:</span> {formData.car_make} {formData.car_model}</p>
                            <p><span className="text-white font-medium">Service:</span> {formData.glass_type}</p>
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={handleBack}
                              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                              <span>Back</span>
                            </button>
                            <button
                              type="submit"
                              disabled={status === "loading" || !isStep3Valid}
                              className="px-7 py-4 bg-primary hover:bg-primary-hover disabled:opacity-50 text-[#0A0E1A] font-extrabold text-sm rounded-xl shadow-lg shadow-primary/35 hover:scale-[1.02] active:scale-[0.97] transition-all flex items-center gap-2 cursor-pointer border border-amber-300/40"
                            >
                              {status === "loading" ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin text-[#0A0E1A]" />
                                  <span>Processing Request...</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-[#0A0E1A]" />
                                  <span>Request Mobile Service</span>
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Visual Trust & Photography Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[480px] sm:h-[540px] w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900 group">
              <Image
                src="/images/windshield_replacement.png"
                alt="Mobile Service Vehicle"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-transparent to-black/30" />

              {/* Floating Pill Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl backdrop-blur-xl bg-slate-950/80 border border-white/20 text-left">
                <div className="flex items-center gap-2.5 mb-2 text-emerald-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Fast Dispatch</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  Alwar Metro Mobile Unit
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Equipped with OEM glass, suction lifts, and fast-curing DOW adhesive for 1-hour drive-away time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
