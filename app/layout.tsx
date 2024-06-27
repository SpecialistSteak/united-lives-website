import "../styles/globals.css";
import "../styles/Fork-Awesome-1.2.0/css/fork-awesome.min.css";
import "../styles/bootstrap.min.css";
import "../styles/keep-footer-down-and-header-up.css";
import { Inter } from "next/font/google";
import "./window.d.ts";
import Footer from "@/components/footer";
import Header from "@/components/header";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  metadataBase: new URL("https://postgres-starter.vercel.app"),
  title: "UnitedLives",
  description: "The UnitedLives NGOs website.",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Header />
        {children}
        <Analytics />
        <SpeedInsights />
        <Footer />
      </body>
    </html>
  );
}
