import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import Navbar from "@/src/components/ui/Navbar";
import ProviderWrapper from "@/src/components/ProviderWrapper";
import { poppins, scenarie } from "@/app/fonts";
import { navbarData } from "@/src/shared/data/global.data";
import Footer from "@/src/components/ui/Footer/Footer";

export const metadata: Metadata = {
  title: "Williford Carpentry Collective",
  description: "Built with love by Piggyback Studios LLC 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.className} ${scenarie.variable} ${poppins.variable}`}
    >
      <body>
        <ProviderWrapper>
          <Navbar {...navbarData} />
          {children}
          <Analytics />
          <Footer />
        </ProviderWrapper>
      </body>
    </html>
  );
}
