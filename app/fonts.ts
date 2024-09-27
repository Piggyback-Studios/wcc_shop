import { Poppins } from "next/font/google";
import localFont from "next/font/local";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
  variable: "--font-body",
});

const hostgard = localFont({
  weight: "400",
  display: "swap",
  src: "fonts/Hostgard.ttf",
  variable: "--font-header",
});

export { poppins, hostgard };
