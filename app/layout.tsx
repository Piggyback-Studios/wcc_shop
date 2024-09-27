import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/ui/Navbar";
import ProviderWrapper from "@/src/components/ProviderWrapper";

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
      <body>
        <ProviderWrapper>
          <Navbar />
          <main className="main-page-container">{children}</main>
        </ProviderWrapper>
      </body>
    </html>
  );
}
