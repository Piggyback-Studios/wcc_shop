import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/ui/Navbar";
import ProviderWrapper from "@/src/components/ProviderWrapper";
import { poppins, hostgard } from "@/app/fonts";

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
    <html
      lang="en"
      className={`${poppins.className} ${hostgard.variable} ${poppins.variable}`}
    >
      <body>
        <ProviderWrapper>
          <Navbar />
          {children}
        </ProviderWrapper>
      </body>
    </html>
  );
}
