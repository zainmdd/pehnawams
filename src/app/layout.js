import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter, Plus_Jakarta_Sans, Raleway } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"], // regular
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"], // bold
  variable: "--font-plusjakarta",
});

const raleway = Raleway({
  weight: "700",
  subsets: ["latin"],
});

// ✅ Include viewport meta correctly here:
export const metadata = {
  title: "Pehnawa App",
  description: "Men-first fashion platform",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0", // ✅ correct syntax
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${plusJakarta.variable} ${raleway.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
