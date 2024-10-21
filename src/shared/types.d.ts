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
  fill?: string;
  stroke?: string;
};

export type IconLink = Link & SVG;

export type ButtonType = "submit" | "reset" | "button" | undefined;

export type Button = {
  label: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: (...args: any[]) => any;
  className?: string;
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

export type Product = {
  id: string;
  name: string;
  description: string;
  stripeId: string;
  price: number;
  priceId: string;
  stockQuantity: number;
  cartQuantity: number;
  imageUrl?: string;
  active: boolean;
};

export type Metadata = {
  [k: string]: string;
};

export type AlignmentType = "left" | "center" | "right";

export type InputField = {
  name: string;
  placeholder: string;
  type: string;
  label: string;
  icon?: Icon;
  onChange: any;
  onBlur: any;
  forwardRef: React.MutableRefObject;
  value?: any;
};

export type ContactFormFieldNamesType = "name" | "email" | "message";

// component and block level data types

export type ContactFormType = {
  name: string;
  email: string;
  message: string;
  // file: File;
};

export type CreateProductFormType = {
  name: string;
  description: string;
  price: number;
  image: FileList;
  stockQuantity: number;
  active: boolean;
};

export type SignInFormType = {
  email: string;
  password: string;
};

export type ContactProps = {
  title: string;
  addressLine1: string;
  addressLine2: string;
  phoneNumber: Link;
  email: Link;
  socials: Link[];
};

export type ContactFormProps = ContactBlockProps;

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

export type ProductCardProps = Product & {};

export type SearchBarProps = {
  onSearch: (...args: any[]) => any;
  value: string;
};

export type ContactBlockProps = {
  title?: string;
  submitLabel: string;
  fields: InputField[];
  alignment?: AlignmentType;
};
