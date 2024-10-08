import { Poppins } from "next/font/google";
import localFont from "next/font/local";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
  variable: "--font-body",
});

const scenarie = localFont({
  weight: "400",
  display: "swap",
  src: "fonts/Scenarie.otf",
  variable: "--font-header",
});

export { poppins, scenarie };
