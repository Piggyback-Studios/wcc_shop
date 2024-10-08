"use client";

import React from "react";
import Link from "next/link";

import { useCartContext } from "@/src/context/Cart";
import ContentContainer from "@/src/components/common/ContentContainer";
import { NavbarProps } from "@/src/shared/types";

const Navbar = ({ logo, links }: NavbarProps) => {
  return (
    <nav className="fixed top-0 w-full flex items-center justify-center bg-primary-500 h-24 z-50">
      <ContentContainer>
        <div className="flex justify-between items-center">
          <Link href="/">{logo}</Link>
          <ul className="flex flex-row gap-6">
            {links.map((link, idx) => (
              <li key={idx}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </ContentContainer>
    </nav>
  );
};

export default Navbar;
