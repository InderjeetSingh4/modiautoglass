import { Phone, Mail, MapPin, Clock, Shield } from "lucide-react";

const serviceAreas = [
  "Alwar",
  "Elk Grove",
  "Roseville",
  "Folsom",
  "Rancho Cordova",
  "Citrus Heights",
  "Davis",
  "Woodland",
  "Rocklin",
  "Natomas",
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0E1A]/95 backdrop-blur-2xl text-white border-t border-white/10">
      <div className="max-w-7xl lg:max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 text-left">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 border border-amber-200/40 shrink-0">
                <Shield className="w-6 h-6 text-[#0A0E1A]" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight leading-tight block text-white">
                  Modi Auto Glass
                </span>
                <span className="text-xs font-bold text-primary-light tracking-widest uppercase leading-tight block">
                  Alwar • Mobile Service
                </span>
              </div>
            </div>
            <p className="text-sm lg:text-base text-slate-300 leading-relaxed max-w-xs">
              Professional auto glass repair and replacement services delivered
              directly to your doorstep with a 100% lifetime warranty.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs lg:text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Direct Contact
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-sm lg:text-base text-slate-300 hover:text-primary-light transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary-light shrink-0" />
                  <span>(555) 123-4567</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@modiautoglass.com"
                  className="flex items-center gap-3 text-sm lg:text-base text-slate-300 hover:text-primary-light transition-colors"
                >
                  <Mail className="w-4 h-4 text-primary-light shrink-0" />
                  <span>info@modiautoglass.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm lg:text-base text-slate-300">
                <MapPin className="w-4 h-4 text-primary-light mt-1 shrink-0" />
                <span>Alwar & Surrounding Metro Area</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xs lg:text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Service Hours
            </h4>
            <ul className="space-y-3 text-sm lg:text-base text-slate-300">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary-light shrink-0" />
                <span>Mon – Fri: 7:00 AM – 6:00 PM</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Sat: 8:00 AM – 4:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-xs lg:text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Service Coverage
            </h4>
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="px-3.5 py-1.5 text-xs lg:text-sm font-semibold text-slate-300 bg-white/5 rounded-xl border border-white/10 hover:bg-primary/20 hover:border-primary/40 hover:text-primary-light transition-all cursor-default"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs lg:text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Modi Auto Glass. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary-light transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-light transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
