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
};

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
};
