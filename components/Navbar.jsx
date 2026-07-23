"use client";

import { useState, useEffect } from "react";
import { Phone, Shield, Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0E1A]/90 backdrop-blur-xl border-b border-white/15 shadow-2xl py-4.5 lg:py-5"
          : "bg-gradient-to-b from-[#0A0E1A]/95 via-[#0A0E1A]/60 to-transparent backdrop-blur-md py-6 lg:py-7"
      }`}
    >
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex items-center justify-between">
          {/* Scaled Logo */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/35 group-hover:scale-105 transition-transform duration-300 border border-amber-200/40 shrink-0">
              <Shield className="w-6 h-6 lg:w-7 lg:h-7 text-[#0A0E1A]" strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-xl lg:text-2xl font-black text-white tracking-tight leading-tight block">
                Modi Auto Glass
              </span>
              <span className="text-xs lg:text-sm font-bold text-primary-light tracking-widest uppercase leading-tight block">
                Sacramento • Mobile Service
              </span>
            </div>
          </a>

          {/* Scaled Nav Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            <a
              href="#services"
              className="text-base lg:text-lg font-semibold text-slate-200 hover:text-primary transition-colors relative py-1 group"
            >
              <span>Services</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#trust"
              className="text-base lg:text-lg font-semibold text-slate-200 hover:text-primary transition-colors relative py-1 group"
            >
              <span>Why Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#mobile-booking"
              className="text-base lg:text-lg font-semibold text-slate-200 hover:text-primary transition-colors relative py-1 group"
            >
              <span>Mobile Booking</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#quote"
              className="text-base lg:text-lg font-semibold text-slate-200 hover:text-primary transition-colors relative py-1 group"
            >
              <span>Get a Quote</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Scaled Magnetic Emergency Call CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <MagneticButton
              href="tel:+15551234567"
              className="inline-flex items-center gap-3 px-6 py-3.5 lg:px-8 lg:py-4 bg-primary hover:bg-primary-hover text-[#0A0E1A] text-base lg:text-lg font-extrabold rounded-2xl shadow-xl shadow-primary/35 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 border border-amber-200/50 cursor-pointer"
            >
              <Phone className="w-5 h-5 lg:w-6 lg:h-6 text-[#0A0E1A]" />
              <span>Call for Emergencies</span>
            </MagneticButton>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0E1A]/95 backdrop-blur-2xl border-t border-white/10 px-6 py-6 mt-4 mx-4 rounded-2xl shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-4 text-left">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-white hover:text-primary transition-colors py-1.5"
            >
              Services
            </a>
            <a
              href="#trust"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-white hover:text-primary transition-colors py-1.5"
            >
              Why Us
            </a>
            <a
              href="#mobile-booking"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-white hover:text-primary transition-colors py-1.5"
            >
              Mobile Booking
            </a>
            <a
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-white hover:text-primary transition-colors py-1.5"
            >
              Get a Quote
            </a>
            <a
              href="tel:+15551234567"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2.5 w-full py-4 mt-2 bg-primary text-[#0A0E1A] text-base font-extrabold rounded-2xl shadow-lg"
            >
              <Phone className="w-5 h-5 text-[#0A0E1A]" />
              <span>Call for Emergencies</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
