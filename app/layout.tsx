import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/Navbar";
import ProviderWrapper from "./components/ProviderWrapper";

export const metadata: Metadata = {
  title: "Williford Carpentry Collective",
  description: "Built with love by Louie Williford U+00A9 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProviderWrapper>
        <Navbar />
        <body>{children}</body>
        {/* footer here */}
      </ProviderWrapper>
    </html>
  );
}
