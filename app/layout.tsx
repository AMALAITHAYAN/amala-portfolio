import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amala Ithayan | Full-Stack Developer",
  description:
    "Portfolio of Amala Ithayan, a full-stack developer building secure, scalable products with Java, Spring Boot, React, MySQL, and AWS.",
  keywords: [
    "Amala Ithayan",
    "Full-Stack Developer",
    "Spring Boot Developer",
    "Java Developer",
    "React Developer",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-[#05070b] font-sans text-white">{children}</body>
    </html>
  );
}
