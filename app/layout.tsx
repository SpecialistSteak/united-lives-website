import "../styles/globals.css";
import "../styles/Fork-Awesome-1.2.0/css/fork-awesome.min.css";
import "../styles/bootstrap.min.css";
import { Inter } from "next/font/google";
import HeaderAndNavbar from "@/components/header-and-navbar";
import "./window.d.ts";
import SubNavBanner from "@/components/sub-nav-banner";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react"


export const metadata = {
  metadataBase: new URL("https://postgres-starter.vercel.app"),
  title: "Vercel Postgres Demo",
  description: "A simple Next.js app with Vercel Postgres as the database",
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
        <header>
          <HeaderAndNavbar />
        </header>
        <SubNavBanner />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
