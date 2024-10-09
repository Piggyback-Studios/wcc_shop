import { ReactElement } from "react";

// generic data types
export type SpacerSize = "sm" | "md" | "lg";

export type Link = {
  href: string;
  label: string;
};

export type SVG = {
  width: number;
  height: number;
  fill: string;
  stroke: string;
};

export type IconLink = Link & SVG;

export type ButtonType = "submit" | "reset" | "button" | undefined;

export type Button = {
  label: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: (...args: any[]) => any;
};

export type Video = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type AdminUser = User & {
  adminLevel: "owner" | "editor" | "basic";
};

export type CustomerUser = User & {
  id: string;
  addressLineOne: string;
  addressLineTwo: string;
  stripeId: string;
};

export type Product = {};

// compontent and block level data types
export type SpacerProps = {
  size: SpacerSize;
};

export type NavbarProps = {
  logo: string | ReactElement;
  links: Array<Link | IconLink>;
};

export type FooterProps = {};

export type LandingHeroProps = {
  tagline: string;
  headline: string | ReactElement;
  description: string | ReactElement;
  cta: ReactElement;
  videos: Video[];
};
