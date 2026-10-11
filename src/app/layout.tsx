import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import "@fontsource/noto-sans-bengali/400.css";
import "@fontsource/noto-sans-bengali/500.css";
import "@fontsource/noto-sans-bengali/600.css";
import "@fontsource/noto-sans-bengali/700.css";
import "./globals.css";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Shondhan | আপনার স্বাস্থ্যসেবার ঠিকানা",
  description: "কাছাকাছি ডাক্তার ও স্বাস্থ্যসেবা সহজেই খুঁজে নিন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
