import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Modi Auto Glass | Fast, Reliable Auto Glass Repair & Replacement",
  description:
    "Professional auto glass repair and replacement at your doorstep. Windshield replacement, rock chip repair, window tinting, and ADAS calibration. Free quotes & insurance accepted.",
  keywords:
    "auto glass repair, windshield replacement, rock chip repair, window tinting, ADAS calibration, mobile auto glass",
  openGraph: {
    title: "Modi Auto Glass | Fast, Reliable Auto Glass Repair & Replacement",
    description:
      "Professional auto glass repair and replacement at your doorstep. Free quotes & insurance accepted.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-bg-main font-sans">
        {children}
      </body>
    </html>
  );
}
