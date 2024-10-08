import Image from "next/image";

import { Link, IconLink, NavbarProps, FooterProps } from "@/src/shared/types";

export const pageLinks: Link[] = [];

export const socialsLinks: IconLink[] = [];

export const navbarData: NavbarProps = {
  logo: (
    <Image
      src="/images/logo.svg"
      height={24}
      width={24}
      className="h-8 w-auto"
      alt="Williford Carpentry Collective Logo"
    />
  ),
  links: [],
};

export const footerData: FooterProps = {};
