import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Plus_Jakarta_Sans, Raleway } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-plusjakarta",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-raleway",
});

/* ✅ METADATA (NO viewport here) */
export const metadata = {
  title: "Pehnawa App",
  description: "Men-first fashion platform",
};

/* ✅ VIEWPORT GOES HERE */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${inter.variable}
          ${plusJakarta.variable}
          ${raleway.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}
