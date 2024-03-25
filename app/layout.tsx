import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      {/* nav here */}
      <body className={inter.className}>{children}</body>
      {/* footer here */}
    </html>
  );
}
