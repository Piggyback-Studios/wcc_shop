import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Williford Carpentry Collective",
};

export default function CheckoutLayout({
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
