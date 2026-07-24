"use client";

const cities = [
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
  "Carmichael",
  "Fair Oaks",
];

export default function CityMarquee() {
  return (
    <div className="w-full overflow-hidden py-4 bg-[#0A0E1A]/90 border-y border-white/10 backdrop-blur-md">
      <div className="flex w-max animate-marquee whitespace-nowrap gap-12 items-center text-xs sm:text-sm font-extrabold tracking-widest uppercase text-slate-300">
        {[...cities, ...cities, ...cities].map((city, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="hover:text-primary transition-colors cursor-default">{city}</span>
            <span className="w-2 h-2 rounded-full bg-amber-400/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
