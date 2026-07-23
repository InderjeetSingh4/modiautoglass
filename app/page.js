import ImageScrollCanvas from "@/components/ImageScrollCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MobileBookingForm from "@/components/MobileBookingForm";
import TrustSection from "@/components/TrustSection";
import QuoteForm from "@/components/QuoteForm";
import Footer from "@/components/Footer";
import WatermarkCoverButton from "@/components/WatermarkCoverButton";

export const metadata = {
  title: "Modi Auto Glass | Fast, Reliable Auto Glass Repair & Replacement",
  description:
    "Expert windshield replacement, rock chip repair, and ADAS calibration delivered directly to your doorstep with a lifetime warranty.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0C]">
      {/* 1. Pinned Full-Screen Background Car Frame Sequence */}
      <ImageScrollCanvas />

      {/* 2. Scrolling Foreground UI Elements */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <MobileBookingForm />
          <TrustSection />
          <QuoteForm />
        </main>
        <Footer />
      </div>

      {/* 3. Floating Button to Cover Watermark */}
      <WatermarkCoverButton />
    </div>
  );
}
