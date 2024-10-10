import Image from "next/image";

import { Link, IconLink, NavbarProps, FooterProps } from "@/src/shared/types";

export const pageLinks: Link[] = [
  { href: "/contact", label: "contact" },
  { href: "/search", label: "search" },
  { href: "/cart", label: "cart" },
];

export const socialsLinks: IconLink[] = [
  { href: "/contact", label: "contact", width: 25, height: 25 },
  { href: "/search", label: "search", width: 25, height: 25 },
  { href: "/cart", label: "cart", width: 25, height: 25 },
];

export const navbarData: NavbarProps = {
  logo: (
    <Image
      src="/svg/logo.svg"
      height={24}
      width={24}
      className="h-8 w-auto"
      alt="Williford Carpentry Collective Logo"
    />
  ),
  links: pageLinks,
};

export const footerData: FooterProps = {};
