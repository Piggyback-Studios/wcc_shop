import Image from "next/image";

import {
  Link,
  IconLink,
  NavbarProps,
  FooterProps,
  ContactBlockProps,
  InputField,
} from "@/src/shared/types";

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

export const globalContactFormData: ContactBlockProps = {
  submitLabel: "submit",
  fields: [
    {
      name: "name",
      placeholder: "name",
      type: "text",
      label: "name",
    },
    {
      name: "email",
      placeholder: "email",
      type: "email",
      label: "email",
    },
    {
      name: "message",
      placeholder: "message",
      type: "textarea",
      label: "message",
    },
  ] as InputField[],
};

export const SITE_INFO = {
  BRAND_NAME: "Williford Carpentry Collective",
  ADDRESS_LINE_1: "",
  ADDRESS_LINE_2: "",
  PHONE_NUMBER: "",
  PHONE_NUMBER_LINK: "",
  EMAIL_ADDRESS: process.env.SENDING_EMAIL!,
  EMAIL_ADDRESS_LINK: "",
};

export const footerData: FooterProps = {};
