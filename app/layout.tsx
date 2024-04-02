import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
